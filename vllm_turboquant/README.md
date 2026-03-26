# TurboQuant KV Cache Quantisation for vLLM

Implementation of [vllm-project/vllm#38171](https://github.com/vllm-project/vllm/issues/38171).

## What is TurboQuant?

TurboQuant compresses the KV cache using **vector quantisation** (not scalar
FP8), with codebooks optimised for **inner-product preservation** rather than
MSE. This is critical for attention: the softmax is driven by dot products, so
preserving their distribution matters more than minimising reconstruction error.

| Bits | Compression vs BF16 | Needle-in-haystack (Qwen2.5-7B) |
|------|--------------------|---------------------------------|
| 2    | 7.5×               | 6/6 exact match                 |
| 3.5  | 4.5×               | 6/6 exact match                 |
| 4    | 3.9×               | 6/6 exact match                 |

## Algorithm

```
encode:
  x' = x @ R^T          # orthogonal rotation (QR decomposition)
  for each sub-vector of x':
      idx = argmin_k ||x'[g] - C[k]||²   # nearest centroid
  return packed indices

decode:
  for each group g:
      x'[g] = C[idx[g]]  # gather centroid
  x = x' @ R             # inverse rotation
  return x
```

The rotation `R` decorrelates KV dimensions so the Lloyd-Max codebook can
allocate centroids more efficiently across the transformed space.

## File Structure

```
vllm_turboquant/
├── __init__.py            # Public API
├── config.py              # TurboQuantConfig + TurboQuantCodebook
├── kv_cache_method.py     # TurboQuantKVCacheMethod (vLLM interface)
├── cache_patch.py         # CacheDType extension + is_quantized_kv_cache patch
└── kernels/
    ├── __init__.py
    └── triton_kernels.py  # Fused Triton rotate+quantise / gather+derotate
```

## Integrating into vLLM

### Step 1 – Register the quantisation config

In `vllm/model_executor/layers/quantization/__init__.py`, add:

```python
from vllm_turboquant.config import TurboQuantConfig  # noqa: F401
```

### Step 2 – Extend CacheDType

Apply the monkey-patch at vLLM startup (e.g. in `vllm/__init__.py`):

```python
import vllm_turboquant.cache_patch  # registers CacheDType variants + patches
```

Or merge `cache_patch.py` content directly into `vllm/config/cache.py`.

### Step 3 – Wire into the attention backend

In each attention backend's KV write/read path, check for TurboQuant:

```python
from vllm_turboquant.cache_patch import TURBOQUANT_DTYPES

if cache_config.cache_dtype in TURBOQUANT_DTYPES:
    enc_k, enc_v = kv_cache_method.encode(key, value)
    # store enc_k, enc_v ...
```

### Step 4 – Update KVCacheSpec memory accounting

```python
from vllm_turboquant.cache_patch import turboquant_element_size

elem_sz = turboquant_element_size(cache_dtype, num_heads, head_dim)
if elem_sz is not None:
    block_size_bytes = 2 * num_heads * block_size * head_dim * elem_sz
```

### Step 5 – Run with TurboQuant

```bash
vllm serve Qwen/Qwen2.5-7B-Instruct \
    --quantization turboquant \
    --turboquant-bits 4 \
    --turboquant-sub-dim 4
```

## Codebook Training

The default codebook uses a random orthogonal rotation and normalised random
centroids. For production quality, train the codebook on a representative
corpus:

```python
from vllm_turboquant.config import TurboQuantConfig, TurboQuantCodebook
import torch

# Collect KV activations (shape: N, head_dim) from calibration data
kv_activations = ...  # torch.Tensor

# Lloyd-Max iteration
config = TurboQuantConfig(bits=4.0, sub_dim=4)
cb = config.get_or_init_codebook(head_dim=128, device=kv_activations.device)

for _ in range(100):  # EM iterations
    indices = cb.encode(kv_activations)          # E-step
    for k in range(cb.centroids.shape[0]):        # M-step
        mask = (indices == k).any(dim=-1)
        if mask.any():
            cb.centroids[k] = kv_activations[mask].mean(0)[:config.sub_dim]

# Save
torch.save({"head_dim_128": {"centroids": cb.centroids, "rotation": cb.rotation}},
           "turboquant_codebook.pt")
```

Then pass `--turboquant-codebook-path turboquant_codebook.pt` when serving.

## Requirements

- Python ≥ 3.10
- PyTorch ≥ 2.1
- Triton ≥ 2.2 (optional, falls back to pure-PyTorch if unavailable)
- CUDA compute capability ≥ 8.0 (Ampere) for Triton kernels
