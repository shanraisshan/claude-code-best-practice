"""Patches for vLLM's cache configuration to add TurboQuant dtype support.

In a full upstream integration this file's content would be merged directly
into ``vllm/config/cache.py``.  It is kept separate here so the patch can be
applied at import time without modifying the installed vLLM package.

Usage in your vLLM fork / overlay::

    import vllm_turboquant.cache_patch  # noqa: F401 – registers side effects

What gets patched
-----------------
1. ``CacheDType``: new ``TURBOQUANT_2BIT``, ``TURBOQUANT_3_5BIT``,
   ``TURBOQUANT_4BIT`` enum variants.
2. ``is_quantized_kv_cache()``: returns True for TurboQuant dtypes so vLLM's
   scheduler knows to allocate compressed cache blocks.
3. ``KVCacheSpec.element_size``: routes to TurboQuantConfig.bytes_per_token()
   for accurate memory accounting.
"""

from __future__ import annotations

import enum
import importlib
from typing import Optional

# ---------------------------------------------------------------------------
# 1. Extend CacheDType with TurboQuant variants
# ---------------------------------------------------------------------------

try:
    from vllm.config.cache import CacheDType  # type: ignore[import]
    _VLLM_AVAILABLE = True
except ImportError:
    _VLLM_AVAILABLE = False
    # Provide a standalone stub for testing outside vllm
    class CacheDType(enum.Enum):  # type: ignore[no-redef]
        AUTO = "auto"
        FP8 = "fp8"
        FP8_E4M3 = "fp8_e4m3"
        FP8_E5M2 = "fp8_e5m2"
        INT8 = "int8"


# Add new variants dynamically (enum doesn't support subclassing at runtime,
# so we use the functional API to create an extended version).
_TURBOQUANT_VARIANTS = {
    "TURBOQUANT_2BIT":   "turboquant_2bit",
    "TURBOQUANT_3_5BIT": "turboquant_3.5bit",
    "TURBOQUANT_4BIT":   "turboquant_4bit",
}

# Build extended enum that includes all existing members + TurboQuant ones
_existing = {m.name: m.value for m in CacheDType}
_extended = {**_existing, **_TURBOQUANT_VARIANTS}
CacheDTypeExtended = enum.Enum("CacheDTypeExtended", _extended)  # type: ignore[misc]

# Re-export under the original name so consumers can ``from cache_patch import CacheDType``
CacheDType = CacheDTypeExtended  # type: ignore[misc]

TURBOQUANT_DTYPES: frozenset = frozenset({
    CacheDType.TURBOQUANT_2BIT,
    CacheDType.TURBOQUANT_3_5BIT,
    CacheDType.TURBOQUANT_4BIT,
})

DTYPE_TO_BITS: dict = {
    CacheDType.TURBOQUANT_2BIT:   2.0,
    CacheDType.TURBOQUANT_3_5BIT: 3.5,
    CacheDType.TURBOQUANT_4BIT:   4.0,
}


# ---------------------------------------------------------------------------
# 2. Patch is_quantized_kv_cache()
# ---------------------------------------------------------------------------

def is_quantized_kv_cache(cache_dtype) -> bool:
    """Return True for any quantised KV dtype, including TurboQuant.

    Drop-in replacement for ``vllm.config.cache.is_quantized_kv_cache``.
    """
    if cache_dtype in TURBOQUANT_DTYPES:
        return True
    # Delegate to the original implementation for other dtypes
    if _VLLM_AVAILABLE:
        try:
            from vllm.config.cache import is_quantized_kv_cache as _orig
            return _orig(cache_dtype)
        except Exception:
            pass
    # Fallback: check for any non-auto dtype
    return cache_dtype not in {None, "auto"}


# Apply monkey-patch when vllm is installed
if _VLLM_AVAILABLE:
    try:
        import vllm.config.cache as _cache_mod
        _cache_mod.is_quantized_kv_cache = is_quantized_kv_cache
    except Exception:
        pass


# ---------------------------------------------------------------------------
# 3. KVCacheSpec memory calculation helper
# ---------------------------------------------------------------------------

def turboquant_element_size(
    cache_dtype,
    num_heads: int,
    head_dim: int,
    sub_dim: int = 4,
) -> Optional[float]:
    """Return bytes per element for TurboQuant cache dtype.

    Returns None for non-TurboQuant dtypes.

    Used by KVCacheSpec to compute total cache bytes:
        total_bytes = 2 * num_heads * seq_len * element_size
                      ↑ factor of 2 for key + value
    """
    if cache_dtype not in TURBOQUANT_DTYPES:
        return None

    from vllm_turboquant.config import TurboQuantConfig, SUPPORTED_BITS
    bits = DTYPE_TO_BITS[cache_dtype]

    # bytes_per_token is for one side (K or V), for all heads
    # element_size is per head, per element (head_dim=1 normalised)
    cfg = TurboQuantConfig(bits=bits, sub_dim=sub_dim)
    bytes_per_token = cfg.bytes_per_token(num_heads=num_heads, head_dim=head_dim)
    # Normalise to per-element of the original head_dim
    return bytes_per_token / (num_heads * head_dim)
