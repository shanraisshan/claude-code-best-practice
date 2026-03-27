"""vllm_turboquant – TurboQuant KV Cache Quantisation for vLLM.

Quick start::

    from vllm_turboquant import TurboQuantConfig, TurboQuantKVCacheMethod

    config = TurboQuantConfig(bits=4.0, sub_dim=4)
    method = TurboQuantKVCacheMethod(config)

    # encode (write to cache)
    enc_k, enc_v = method.encode(key, value)

    # decode (read from cache)
    key_hat, val_hat = method.decode(enc_k, enc_v)

See the README for vLLM integration instructions.
"""

from vllm_turboquant.config import TurboQuantConfig, TurboQuantCodebook
from vllm_turboquant.kv_cache_method import TurboQuantKVCacheMethod

__all__ = [
    "TurboQuantConfig",
    "TurboQuantCodebook",
    "TurboQuantKVCacheMethod",
]
