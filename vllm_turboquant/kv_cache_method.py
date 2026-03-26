"""TurboQuantKVCacheMethod ─ encode/decode interface for vLLM's cache engine.

This module provides the bridge between vLLM's KV cache infrastructure and
the TurboQuant compression algorithm.  vLLM calls `encode` when writing a
new KV entry to cache and `decode` when reading it back for attention.
"""

from __future__ import annotations

from typing import TYPE_CHECKING, Optional, Tuple

import torch

if TYPE_CHECKING:
    from vllm_turboquant.config import TurboQuantConfig

try:
    from vllm.attention.backends.abstract import BaseKVCacheMethod  # type: ignore[import]
except ImportError:  # pragma: no cover
    class BaseKVCacheMethod:  # type: ignore[no-redef]
        pass

try:
    from vllm_turboquant.kernels.triton_kernels import (
        turboquant_encode_kernel,
        turboquant_decode_kernel,
    )
    _TRITON_AVAILABLE = True
except Exception:  # pragma: no cover – Triton not installed in test env
    _TRITON_AVAILABLE = False


class TurboQuantKVCacheMethod(BaseKVCacheMethod):
    """KV cache method implementing TurboQuant vector quantisation.

    Lifecycle (per token, per layer):
        write path:  raw KV (fp16/bf16) → encode() → packed int indices
        read path:   packed int indices  → decode() → reconstructed KV
    """

    def __init__(self, config: "TurboQuantConfig") -> None:
        self.config = config
        # Lazily resolved on first call (head_dim unknown at construction time)
        self._head_dim: Optional[int] = None

    # ------------------------------------------------------------------
    # Public API expected by vLLM
    # ------------------------------------------------------------------

    def encode(
        self,
        key: torch.Tensor,
        value: torch.Tensor,
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """Quantise key and value tensors for cache storage.

        Args:
            key:   (..., num_heads, head_dim) – raw key activations
            value: (..., num_heads, head_dim) – raw value activations

        Returns:
            (encoded_key, encoded_value) – packed int32 tensors of shape
            (..., num_heads, num_groups) where num_groups = head_dim // sub_dim
        """
        codebook = self._get_codebook(key)
        if _TRITON_AVAILABLE:
            enc_key = turboquant_encode_kernel(key, codebook)
            enc_val = turboquant_encode_kernel(value, codebook)
        else:
            enc_key = codebook.encode(key)
            enc_val = codebook.encode(value)
        return enc_key, enc_val

    def decode(
        self,
        encoded_key: torch.Tensor,
        encoded_value: torch.Tensor,
        dtype: torch.dtype = torch.bfloat16,
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        """Reconstruct key/value tensors from quantised cache.

        Args:
            encoded_key:   (..., num_heads, num_groups) int32
            encoded_value: (..., num_heads, num_groups) int32
            dtype: Output dtype (should match model compute dtype)

        Returns:
            (key, value) – reconstructed tensors of shape
            (..., num_heads, head_dim)
        """
        # Derive head_dim from the stored codebook's centroid shape
        codebook = self._get_codebook_by_groups(encoded_key.shape[-1])
        if _TRITON_AVAILABLE:
            key = turboquant_decode_kernel(encoded_key, codebook)
            value = turboquant_decode_kernel(encoded_value, codebook)
        else:
            key = codebook.decode(encoded_key)
            value = codebook.decode(encoded_value)
        return key.to(dtype), value.to(dtype)

    # ------------------------------------------------------------------
    # vLLM KVCacheSpec integration
    # ------------------------------------------------------------------

    def get_kv_cache_spec(self) -> dict:
        """Return cache memory spec for vLLM's block allocator.

        vLLM uses this to determine how many bytes each cached token occupies
        so it can size the paged KV cache blocks correctly.
        """
        return {
            "quantization": "turboquant",
            "bits": self.config.bits,
            "sub_dim": self.config.sub_dim,
            "compression_ratio": self._compression_ratio(),
        }

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _get_codebook(self, tensor: torch.Tensor):
        """Resolve codebook from a full KV tensor."""
        head_dim = tensor.shape[-1]
        return self.config.get_or_init_codebook(head_dim, tensor.device)

    def _get_codebook_by_groups(self, num_groups: int):
        """Resolve codebook when only num_groups is known (decode path)."""
        head_dim = num_groups * self.config.sub_dim
        # Use the first registered device; decode is always same device
        for hd, cb in self.config._codebooks.items():
            if hd == head_dim:
                return cb
        raise RuntimeError(
            f"No codebook found for head_dim={head_dim}. "
            "Call encode() before decode()."
        )

    def _compression_ratio(self) -> float:
        from vllm_turboquant.config import COMPRESSION_RATIOS
        return COMPRESSION_RATIOS.get(self.config.bits, 1.0)
