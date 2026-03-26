"""Triton CUDA kernels for TurboQuant encode/decode.

Encode path (fp16/bf16 → int indices):
  1. Apply orthogonal rotation matrix R to input vector x: x' = x @ R^T
  2. Split x' into sub-vectors of length sub_dim
  3. Find nearest centroid for each sub-vector (argmin L2 distance)
  4. Return packed int32 indices

Decode path (int indices → fp16/bf16):
  1. Gather centroid vectors for each index
  2. Concatenate sub-vectors to form the full rotated vector
  3. Apply inverse rotation: x = x' @ R

The Triton kernels fuse steps 1+2 (encode) and 1+2 (decode) for efficiency,
avoiding materialising the full rotated tensor in HBM.
"""

from __future__ import annotations

import torch

try:
    import triton
    import triton.language as tl
    _TRITON_AVAILABLE = True
except ImportError:
    _TRITON_AVAILABLE = False

from vllm_turboquant.config import TurboQuantCodebook


# ---------------------------------------------------------------------------
# Triton kernel: encode (rotate + quantise)
# ---------------------------------------------------------------------------

if _TRITON_AVAILABLE:

    @triton.jit
    def _turboquant_encode_kernel(
        x_ptr,            # input  (*batch, head_dim) – bfloat16 / float16
        R_ptr,            # rotation (head_dim, head_dim) – float32
        C_ptr,            # centroids (num_centroids, sub_dim) – float32
        out_ptr,          # output (*batch, num_groups) – int32
        head_dim: tl.constexpr,
        sub_dim:  tl.constexpr,
        num_groups: tl.constexpr,
        num_centroids: tl.constexpr,
        BLOCK_GROUPS: tl.constexpr,
    ):
        """One program instance handles one token's KV vector."""
        pid = tl.program_id(0)
        x_off = pid * head_dim

        # --- Step 1: load x and apply rotation (x' = x @ R^T) ---
        x = tl.load(x_ptr + x_off + tl.arange(0, head_dim)).to(tl.float32)
        rotated = tl.zeros([head_dim], dtype=tl.float32)
        for i in tl.static_range(head_dim):
            r_row = tl.load(R_ptr + i * head_dim + tl.arange(0, head_dim))
            rotated[i] = tl.sum(x * r_row.to(tl.float32))

        # --- Step 2: per-group nearest-centroid search ---
        for g in tl.static_range(0, num_groups, BLOCK_GROUPS):
            g_off = g * sub_dim
            sv = rotated[g_off: g_off + sub_dim]       # sub-vector

            best_idx = 0
            best_dist = tl.float32(1e30)
            for k in tl.static_range(num_centroids):
                c = tl.load(C_ptr + k * sub_dim + tl.arange(0, sub_dim))
                diff = sv - c.to(tl.float32)
                dist = tl.sum(diff * diff)
                best_idx = tl.where(dist < best_dist, k, best_idx)
                best_dist = tl.minimum(dist, best_dist)

            tl.store(out_ptr + pid * num_groups + g, best_idx)

    @triton.jit
    def _turboquant_decode_kernel(
        idx_ptr,          # input  (*batch, num_groups) – int32
        C_ptr,            # centroids (num_centroids, sub_dim) – float32
        R_ptr,            # rotation (head_dim, head_dim) – float32
        out_ptr,          # output (*batch, head_dim) – bfloat16
        head_dim: tl.constexpr,
        sub_dim:  tl.constexpr,
        num_groups: tl.constexpr,
        BLOCK_GROUPS: tl.constexpr,
    ):
        """One program instance reconstructs one token's KV vector."""
        pid = tl.program_id(0)

        # --- Step 1: gather sub-vectors to form rotated vector ---
        rotated = tl.zeros([head_dim], dtype=tl.float32)
        for g in tl.static_range(0, num_groups, BLOCK_GROUPS):
            idx = tl.load(idx_ptr + pid * num_groups + g)
            c = tl.load(C_ptr + idx * sub_dim + tl.arange(0, sub_dim))
            g_off = g * sub_dim
            rotated[g_off: g_off + sub_dim] = c.to(tl.float32)

        # --- Step 2: inverse rotation (x = rotated @ R) ---
        out = tl.zeros([head_dim], dtype=tl.float32)
        for i in tl.static_range(head_dim):
            r_col = tl.load(R_ptr + tl.arange(0, head_dim) * head_dim + i)
            out[i] = tl.sum(rotated * r_col.to(tl.float32))

        tl.store(out_ptr + pid * head_dim + tl.arange(0, head_dim),
                 out.to(tl.bfloat16))


# ---------------------------------------------------------------------------
# Python-side dispatch functions
# ---------------------------------------------------------------------------

def turboquant_encode_kernel(
    x: torch.Tensor,
    codebook: TurboQuantCodebook,
) -> torch.Tensor:
    """Encode *x* using TurboQuant (Triton path).

    Falls back to pure-PyTorch if Triton is unavailable.

    Args:
        x:         (..., head_dim) fp16/bf16
        codebook:  TurboQuantCodebook

    Returns:
        indices: (..., num_groups) int32
    """
    if not _TRITON_AVAILABLE:
        return codebook.encode(x)

    *batch_dims, head_dim = x.shape
    batch_size = 1
    for d in batch_dims:
        batch_size *= d

    sub_dim = codebook.centroids.shape[-1]
    num_groups = head_dim // sub_dim
    num_centroids = codebook.centroids.shape[0]

    x_flat = x.reshape(batch_size, head_dim).contiguous()
    out = torch.empty(batch_size, num_groups, dtype=torch.int32, device=x.device)

    R = codebook.rotation.float().contiguous()
    C = codebook.centroids.float().contiguous()

    BLOCK_GROUPS = min(num_groups, 16)  # tune for occupancy

    _turboquant_encode_kernel[(batch_size,)](
        x_flat, R, C, out,
        head_dim=head_dim,
        sub_dim=sub_dim,
        num_groups=num_groups,
        num_centroids=num_centroids,
        BLOCK_GROUPS=BLOCK_GROUPS,
    )
    return out.reshape(*batch_dims, num_groups)


def turboquant_decode_kernel(
    indices: torch.Tensor,
    codebook: TurboQuantCodebook,
) -> torch.Tensor:
    """Decode *indices* back to approximate KV vectors (Triton path).

    Args:
        indices:  (..., num_groups) int32
        codebook: TurboQuantCodebook

    Returns:
        x: (..., head_dim) bfloat16
    """
    if not _TRITON_AVAILABLE:
        return codebook.decode(indices)

    *batch_dims, num_groups = indices.shape
    batch_size = 1
    for d in batch_dims:
        batch_size *= d

    sub_dim = codebook.centroids.shape[-1]
    head_dim = num_groups * sub_dim

    idx_flat = indices.reshape(batch_size, num_groups).contiguous()
    out = torch.empty(batch_size, head_dim, dtype=torch.bfloat16, device=indices.device)

    R = codebook.rotation.float().contiguous()
    C = codebook.centroids.float().contiguous()

    BLOCK_GROUPS = min(num_groups, 16)

    _turboquant_decode_kernel[(batch_size,)](
        idx_flat, C, R, out,
        head_dim=head_dim,
        sub_dim=sub_dim,
        num_groups=num_groups,
        BLOCK_GROUPS=BLOCK_GROUPS,
    )
    return out.reshape(*batch_dims, head_dim)
