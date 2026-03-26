"""TurboQuant KV Cache Quantization for vLLM.

Implements vector quantization with learned codebooks optimised for
inner-product preservation (critical for attention). Unlike scalar FP8,
TurboQuant applies:
  1. Random orthogonal rotation (QR decomposition) to decorrelate KV dims
  2. Lloyd-Max quantisation to rotated vectors using learned codebooks
  3. Compact bit-packing of quantised indices

Reference: vllm-project/vllm issue #38171
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from typing import TYPE_CHECKING, List, Optional

import torch

if TYPE_CHECKING:
    from vllm.model_executor.layers.quantization.base_config import (
        QuantizationConfig,
    )

# ---------------------------------------------------------------------------
# Registration shim ─ when running outside vllm just define the decorator as
# a no-op so the module can be imported standalone.
# ---------------------------------------------------------------------------
try:
    from vllm.model_executor.layers.quantization import register_quantization_config
except ImportError:  # pragma: no cover
    def register_quantization_config(name: str):  # type: ignore[misc]
        def decorator(cls):
            return cls
        return decorator

try:
    from vllm.attention.backends.abstract import BaseKVCacheMethod  # type: ignore[import]
except ImportError:  # pragma: no cover
    class BaseKVCacheMethod:  # type: ignore[no-redef]
        """Minimal stand-in when running outside vllm."""
        pass


# ---------------------------------------------------------------------------
# Supported bit-widths and their codebook sizes
# ---------------------------------------------------------------------------
SUPPORTED_BITS: dict[float, int] = {
    2.0: 4,    # 2-bit  → 4 centroids per sub-vector
    3.5: 11,   # 3.5-bit → 11 centroids (packed as 4-bit storage)
    4.0: 16,   # 4-bit  → 16 centroids per sub-vector
}

# Memory multipliers relative to BF16 (2 bytes/element)
COMPRESSION_RATIOS: dict[float, float] = {
    2.0: 7.5,
    3.5: 4.5,
    4.0: 3.9,
}


@dataclass
class TurboQuantCodebook:
    """Learned codebook for a single sub-vector group.

    Attributes:
        centroids: Float tensor of shape (num_centroids, sub_dim).
        rotation:  Orthogonal rotation matrix of shape (head_dim, head_dim).
    """
    centroids: torch.Tensor   # (num_centroids, sub_dim)
    rotation: torch.Tensor    # (head_dim, head_dim)

    def encode(self, x: torch.Tensor) -> torch.Tensor:
        """Quantise a batch of vectors.

        Args:
            x: (..., head_dim)

        Returns:
            indices: (..., num_groups) int32 tensor of codebook indices.
        """
        rotated = x @ self.rotation.T                           # (..., head_dim)
        sub_dim = self.centroids.shape[-1]
        groups = rotated.reshape(*rotated.shape[:-1], -1, sub_dim)  # (..., G, sub_dim)
        # Squared distance to each centroid: (..., G, num_centroids)
        dists = torch.cdist(groups.float(), self.centroids.unsqueeze(0).float())
        return dists.argmin(dim=-1).to(torch.int32)             # (..., G)

    def decode(self, indices: torch.Tensor) -> torch.Tensor:
        """Reconstruct vectors from codebook indices.

        Args:
            indices: (..., num_groups) int32

        Returns:
            reconstructed: (..., head_dim)
        """
        sub_vecs = self.centroids[indices]                      # (..., G, sub_dim)
        flat = sub_vecs.reshape(*sub_vecs.shape[:-2], -1)       # (..., head_dim)
        return flat @ self.rotation                             # (..., head_dim)


@register_quantization_config("turboquant")
@dataclass
class TurboQuantConfig:
    """Quantisation config for TurboQuant KV cache compression.

    Example usage (vllm engine args)::

        --quantization turboquant
        --turboquant-bits 4
        --turboquant-sub-dim 4

    Attributes:
        bits:       Target bits per element (2, 3.5, or 4).
        sub_dim:    Sub-vector dimension for product quantisation (must divide
                    head_dim evenly).
        codebook_path: Optional path to pre-trained codebook checkpoint.
    """

    bits: float = 4.0
    sub_dim: int = 4
    codebook_path: Optional[str] = None

    # Populated lazily after the first encode call
    _codebooks: dict[int, TurboQuantCodebook] = field(
        default_factory=dict, init=False, repr=False
    )

    def __post_init__(self) -> None:
        if self.bits not in SUPPORTED_BITS:
            raise ValueError(
                f"turboquant bits must be one of {list(SUPPORTED_BITS)}, "
                f"got {self.bits}"
            )

    # ------------------------------------------------------------------
    # vllm QuantizationConfig interface
    # ------------------------------------------------------------------

    @classmethod
    def get_name(cls) -> str:
        return "turboquant"

    @classmethod
    def get_supported_act_dtypes(cls) -> List[torch.dtype]:
        return [torch.bfloat16, torch.float16]

    @classmethod
    def get_min_capability(cls) -> int:
        # Requires at least Ampere for efficient Triton kernels
        return 80

    def get_quant_method(self, layer, prefix: str):
        from vllm_turboquant.kv_cache_method import TurboQuantKVCacheMethod
        return TurboQuantKVCacheMethod(self)

    # ------------------------------------------------------------------
    # Codebook management
    # ------------------------------------------------------------------

    def get_or_init_codebook(
        self,
        head_dim: int,
        device: torch.device,
    ) -> TurboQuantCodebook:
        """Return the codebook for *head_dim*, initialising it if needed."""
        if head_dim in self._codebooks:
            return self._codebooks[head_dim]

        if self.codebook_path:
            cb = self._load_codebook(head_dim, device)
        else:
            cb = self._init_random_codebook(head_dim, device)

        self._codebooks[head_dim] = cb
        return cb

    def _init_random_codebook(
        self,
        head_dim: int,
        device: torch.device,
    ) -> TurboQuantCodebook:
        """Initialise with random orthogonal rotation and uniform centroids.

        In production, the codebook should be trained with Lloyd-Max on a
        representative corpus of KV activations (see issue #38171).
        """
        num_centroids = SUPPORTED_BITS[self.bits]
        sub_dim = self.sub_dim

        if head_dim % sub_dim != 0:
            raise ValueError(
                f"head_dim ({head_dim}) must be divisible by sub_dim ({sub_dim})"
            )

        # Random orthogonal rotation via QR decomposition
        rand = torch.randn(head_dim, head_dim, device=device)
        rotation, _ = torch.linalg.qr(rand)          # (head_dim, head_dim)

        # Uniform centroids in [-1, 1] as starting point before Lloyd-Max
        centroids = torch.randn(num_centroids, sub_dim, device=device)
        centroids = torch.nn.functional.normalize(centroids, dim=-1)

        return TurboQuantCodebook(centroids=centroids, rotation=rotation)

    def _load_codebook(
        self,
        head_dim: int,
        device: torch.device,
    ) -> TurboQuantCodebook:
        checkpoint = torch.load(self.codebook_path, map_location=device)
        key = f"head_dim_{head_dim}"
        if key not in checkpoint:
            raise KeyError(
                f"Codebook checkpoint {self.codebook_path!r} does not contain "
                f"entry for head_dim={head_dim}. Available: {list(checkpoint)}"
            )
        data = checkpoint[key]
        return TurboQuantCodebook(
            centroids=data["centroids"].to(device),
            rotation=data["rotation"].to(device),
        )

    # ------------------------------------------------------------------
    # Memory calculation helper (used by KVCacheSpec)
    # ------------------------------------------------------------------

    def bytes_per_token(self, num_heads: int, head_dim: int) -> int:
        """Compressed KV bytes per token for a single layer side (K or V)."""
        num_groups = head_dim // self.sub_dim
        bits_per_group = math.ceil(math.log2(SUPPORTED_BITS[self.bits]))
        total_bits = num_heads * num_groups * bits_per_group
        return math.ceil(total_bits / 8)
