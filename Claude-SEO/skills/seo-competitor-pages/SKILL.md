---
name: seo-competitor-pages
description: >
  Generate SEO-optimized competitor comparison and alternatives pages. Covers
  "X vs Y" layouts, "alternatives to X" pages, feature matrices, schema markup,
  and conversion optimization. Use when user says "comparison page", "vs page",
  "alternatives page", "competitor comparison", or "X vs Y".
---

# Competitor Comparison & Alternatives Pages

Create high-converting comparison and alternatives pages that target
competitive intent keywords with accurate, structured content.

## Page Types

### 1. "X vs Y" Comparison Pages
- Direct head-to-head comparison between two products/services
- Balanced feature-by-feature analysis
- Target keyword: `[Product A] vs [Product B]`

### 2. "Alternatives to X" Pages
- List of alternatives to a specific product/service
- Each alternative with summary, pros/cons, best-for use case
- Target keyword: `[Product] alternatives`

### 3. "Best [Category] Tools" Roundup Pages
- Curated list of top tools/services in a category
- Target keyword: `best [category] tools [year]`

### 4. Comparison Table Pages
- Feature matrix with multiple products in columns
- Target keyword: `[category] comparison`

## Comparison Table Generation

```
| Feature          | Your Product | Competitor A | Competitor B |
|------------------|:------------:|:------------:|:------------:|
| Feature 1        | ✅           | ✅           | ❌           |
| Feature 2        | ✅           | ⚠️ Partial   | ✅           |
| Pricing (from)   | $X/mo        | $Y/mo        | $Z/mo        |
```

## Schema Markup

### ItemList (for roundup pages)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Best [Category] Tools [Year]",
  "itemListOrder": "https://schema.org/ItemListOrderDescending",
  "numberOfItems": "[Count]",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "[Product]", "url": "[URL]" }
  ]
}
```

## Keyword Targeting

| Pattern | Example | Volume |
|---------|---------|--------|
| `[A] vs [B]` | "Slack vs Teams" | High |
| `[A] alternative` | "Figma alternatives" | High |
| `best [category] tools` | "best PM tools" | High |
| `[A] vs [B] for [use case]` | "AWS vs Azure for startups" | Medium |

### Title Tag Formulas
- X vs Y: `[A] vs [B]: [Key Differentiator] ([Year])`
- Alternatives: `[N] Best [A] Alternatives in [Year] (Free & Paid)`
- Roundup: `[N] Best [Category] Tools in [Year] — Compared & Ranked`

## Fairness Guidelines

- All competitor information must be verifiable from public sources
- Never make false or misleading claims about competitors
- Cite sources and link to competitor websites
- Clearly state which product is yours
- Acknowledge competitor strengths honestly
- Include "as of [date]" disclaimers on all pricing data

## Output

- `COMPARISON-PAGE.md` — Ready-to-implement page structure
- `comparison-schema.json` — JSON-LD markup
- Keyword strategy with primary/secondary keywords
- Conversion optimization suggestions
