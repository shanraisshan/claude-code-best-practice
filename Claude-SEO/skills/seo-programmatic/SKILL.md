---
name: seo-programmatic
description: >
  Programmatic SEO planning and analysis for pages generated at scale from data
  sources. Covers template engines, URL patterns, internal linking automation,
  thin content safeguards, and index bloat prevention. Use when user says
  "programmatic SEO", "pages at scale", "dynamic pages", "template pages",
  "generated pages", or "data-driven SEO".
---

# Programmatic SEO Analysis & Planning

Build and audit SEO pages generated at scale from structured data sources.
Enforces quality gates to prevent thin content penalties and index bloat.

## Data Source Assessment

- **CSV/JSON files**: Row count, column uniqueness, missing values
- **API endpoints**: Response structure, data freshness, rate limits
- **Database queries**: Record count, field completeness, update frequency
- Flag duplicate or near-duplicate records (>80% field overlap)

## Template Engine Planning

- **Variable injection points**: Title, H1, body sections, meta description, schema
- **Content blocks**: Static (shared) vs dynamic (unique per page)
- **Conditional logic**: Show/hide sections based on data availability
- Template review: each page must read as a standalone, valuable resource
- No "mad-libs" patterns (just swapping city/product names)

## URL Pattern Strategy

### Common Patterns
- `/tools/[tool-name]` — Tool/product directory pages
- `/[city]/[service]` — Location + service pages
- `/integrations/[platform]` — Integration landing pages
- `/glossary/[term]` — Definition/reference pages

### URL Rules
- Lowercase, hyphenated slugs
- No duplicate slugs — enforce uniqueness
- Keep URLs under 100 characters
- No query parameters for primary content URLs

## Quality Gates

| Metric | Threshold | Action |
|--------|-----------|--------|
| Pages without content review | 100+ | ⚠️ WARNING |
| Pages without justification | 500+ | 🛑 HARD STOP |
| Unique content per page | <40% | ❌ Flag as thin content |
| Word count per page | <300 | ⚠️ Flag for review |

### Scaled Content Abuse — Enforcement (2025-2026)

Google's Scaled Content Abuse policy (March 2024) saw major enforcement in 2025:
- June 2025: Wave of manual actions targeting AI-generated content at scale
- August 2025: SpamBrain update enhanced pattern detection
- Google reported 45% reduction in low-quality content in search results

**Enhanced quality gates:**
- ≥30-40% of content must be genuinely unique between any two pages
- Minimum 5-10% sample review before publishing
- Publish in batches of 50-100 pages, monitor 2-4 weeks before expanding
- Each page must pass: "Would this page be worth publishing alone?"

### Safe Programmatic Pages ✅
- Integration pages (with real setup docs)
- Template/tool pages (with downloadable content)
- Glossary pages (200+ word definitions)
- Product pages (unique specs, reviews)

### Penalty Risk ❌
- Location pages with only city name swapped
- "Best [tool] for [industry]" without industry-specific value
- "[Competitor] alternative" without real comparison data
- AI-generated pages without human review

## Index Bloat Prevention

- Noindex low-value pages
- Noindex paginated results beyond page 1
- For sites with >10k programmatic pages, monitor crawl stats
- Monthly review of indexed page count vs intended count

## Output

### Programmatic SEO Score: XX/100
### Assessment Summary
| Category | Status | Score |
|----------|--------|-------|
| Data Quality | ✅/⚠️/❌ | XX/100 |
| Template Uniqueness | ✅/⚠️/❌ | XX/100 |
| URL Structure | ✅/⚠️/❌ | XX/100 |
| Internal Linking | ✅/⚠️/❌ | XX/100 |
| Thin Content Risk | ✅/⚠️/❌ | XX/100 |
| Index Management | ✅/⚠️/❌ | XX/100 |
