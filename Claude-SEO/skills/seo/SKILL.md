---
name: seo
description: >
  Master SEO orchestrator for Claude Code. Routes to specialized sub-skills
  for audits, page analysis, content optimization, schema markup, technical
  SEO, sitemaps, images, hreflang, programmatic SEO, competitor pages,
  GEO/AI search, and strategic planning. Use when user says "SEO", "audit",
  "analyze", "optimize", or any SEO-related request.
---

# Claude SEO — Master Orchestrator

## Quick Reference

| Command | Sub-Skill | What It Does |
|---------|-----------|--------------|
| `seo audit <url>` | seo-audit | Full site audit with parallel subagents |
| `seo page <url>` | seo-page | Deep single-page analysis |
| `seo technical <url>` | seo-technical | Technical SEO audit (crawl, index, CWV) |
| `seo content <url>` | seo-content | E-E-A-T & content quality analysis |
| `seo schema <url>` | seo-schema | Structured data detection & generation |
| `seo sitemap <url>` | seo-sitemap | Sitemap analysis or generation |
| `seo images <url>` | seo-images | Image optimization audit |
| `seo hreflang <url>` | seo-hreflang | International SEO / hreflang validation |
| `seo geo <url>` | seo-geo | AI search / GEO optimization |
| `seo plan` | seo-plan | Strategic SEO planning |
| `seo programmatic` | seo-programmatic | Programmatic SEO at scale |
| `seo competitor` | seo-competitor-pages | Comparison & alternatives pages |

## Routing Logic

1. Parse user request to identify intent
2. Route to appropriate sub-skill
3. If ambiguous, ask for clarification
4. For "audit" or "full check", use seo-audit (delegates to all subagents)

## Business Type Detection

When analyzing a site, detect business type from homepage signals:

| Signal | Business Type |
|--------|--------------|
| Shopping cart, product listings, prices | **E-commerce** → load `seo-plan/assets/ecommerce.md` |
| "Sign up", "Free trial", "Pricing plans", SaaS keywords | **SaaS** → load `seo-plan/assets/saas.md` |
| Service areas, "Call now", local address, Google Maps | **Local Service** → load `seo-plan/assets/local-service.md` |
| Articles, bylines, publication dates, news | **Publisher** → load `seo-plan/assets/publisher.md` |
| Portfolio, case studies, "Our clients", services | **Agency** → load `seo-plan/assets/agency.md` |
| None of the above | **Generic** → load `seo-plan/assets/generic.md` |

## Reference Files (load on-demand)

Do NOT load these upfront. Load only when needed:

- `references/cwv-thresholds.md` — Core Web Vitals thresholds and diagnostics
- `references/schema-types.md` — Schema.org type status (active/deprecated/restricted)
- `references/eeat-framework.md` — E-E-A-T evaluation criteria
- `references/quality-gates.md` — Content quality minimums and location page limits

## Page Fetching

To fetch a page for analysis:

```bash
curl -sL -A "Mozilla/5.0 (compatible; SEO-Audit/1.0)" \
  -o /tmp/page.html \
  -w "%{http_code}" \
  "$URL"
```

Fallback: use WebFetch tool if curl is not available.

## Quality Gates (always enforce)

- ⚠️ WARNING at 30+ location pages → require 60%+ unique content
- 🛑 HARD STOP at 50+ location pages → require justification
- NEVER recommend HowTo schema (deprecated Sept 2023)
- NEVER recommend FAQ schema except for gov/health sites (restricted Aug 2023)
- ALWAYS use INP, never FID (replaced March 2024, removed Sept 2024)
- JSON-LD preferred over Microdata/RDFa

## Output Language

Default: match user's language. If unclear, use French.
