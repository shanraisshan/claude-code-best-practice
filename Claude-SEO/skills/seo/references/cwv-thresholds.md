# Core Web Vitals Thresholds (February 2026)

## Current Metrics

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | ≤2.5s | 2.5s–4.0s | >4.0s |
| INP (Interaction to Next Paint) | ≤200ms | 200ms–500ms | >500ms |
| CLS (Cumulative Layout Shift) | ≤0.1 | 0.1–0.25 | >0.25 |

## Key Facts

- INP replaced FID on **March 12, 2024**. FID fully removed **September 9, 2024**. INP is the sole interactivity metric.
- Evaluation uses the **75th percentile** of real user data (field data from CrUX).
- Google assesses at the **page level** and the **origin level**.
- Core Web Vitals are a **tiebreaker** ranking signal.
- **Thresholds unchanged since original definitions.**
- December 2025 core update appeared to weight **mobile CWV more heavily**.
- As of October 2025: **57.1%** desktop sites and **49.7%** mobile sites pass all three CWV.

## LCP Subparts (February 2025 CrUX Addition)

| Subpart | What It Measures | Target |
|---------|------------------|--------|
| **TTFB** | Time to First Byte | <800ms |
| **Resource Load Delay** | TTFB to resource request start | Minimize |
| **Resource Load Time** | Time to download LCP resource | Depends on size |
| **Element Render Delay** | Resource loaded to rendered | Minimize |

**Total LCP = TTFB + Resource Load Delay + Resource Load Time + Element Render Delay**

## Common Bottlenecks

### LCP
- Unoptimized hero images (compress, use WebP/AVIF, add preload)
- Render-blocking CSS/JS (defer, async, critical CSS inlining)
- Slow server response TTFB >200ms (edge CDN, caching)
- Web font loading delay (use font-display: swap + preload)

### INP
- Long JavaScript tasks on main thread (break into <50ms chunks)
- Heavy event handlers (debounce, requestAnimationFrame)
- Excessive DOM size (>1,500 elements)
- Synchronous XHR or localStorage operations

### CLS
- Images/iframes without width/height dimensions
- Dynamically injected content above existing content
- Web fonts causing layout shift (font-display: swap + preload)
- Ads/embeds without reserved space

## Performance Tooling (2025-2026)

- **Lighthouse 13.0** (October 2025): Reorganized performance categories and updated scoring weights.
- **CrUX Vis** replaced the CrUX Dashboard (November 2025). Use [CrUX Vis](https://cruxvis.withgoogle.com) or the CrUX API directly.
- **LCP subparts** added to CrUX (February 2025).

## Tools

```bash
# PageSpeed Insights API
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=URL&key=API_KEY"

# Lighthouse CLI
npx lighthouse URL --output json --output-path report.json
```

> **Mobile-first indexing** is 100% complete as of July 5, 2024. Google now crawls ALL websites exclusively with the mobile Googlebot user-agent.
