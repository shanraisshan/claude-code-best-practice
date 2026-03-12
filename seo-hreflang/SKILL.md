---
name: seo-hreflang
description: >
  Hreflang and international SEO audit, validation, and generation. Detects
  common mistakes, validates language/region codes, and generates correct
  hreflang implementations. Use when user says "hreflang", "i18n SEO",
  "international SEO", "multi-language", "multi-region", or "language tags".
---

# Hreflang & International SEO

Validate existing hreflang implementations or generate correct hreflang tags
for multi-language and multi-region sites.

## Validation Checks

### 1. Self-Referencing Tags
- Every page must include an hreflang tag pointing to itself
- Must exactly match the page's canonical URL

### 2. Return Tags
- If page A links to page B with hreflang, page B must link back to page A
- Every hreflang relationship must be bidirectional
- Check all language versions reference each other (full mesh)

### 3. x-default Tag
- Required: designates the fallback page for unmatched languages/regions
- Only one x-default per set of alternates

### 4. Language Code Validation
- Must use ISO 639-1 two-letter codes (e.g., `en`, `fr`, `de`, `ja`)
- Common errors: `eng` instead of `en`, `jp` instead of `ja`

### 5. Region Code Validation
- ISO 3166-1 Alpha-2 (e.g., `en-US`, `en-GB`, `pt-BR`)
- Common errors: `en-uk` instead of `en-GB`, `es-LA` (not a country)

### 6. Canonical URL Alignment
- Hreflang tags must only appear on canonical URLs
- The canonical URL and hreflang URL must match exactly

### 7. Protocol Consistency
- All URLs in an hreflang set must use the same protocol (HTTPS or HTTP)

## Common Mistakes

| Issue | Severity | Fix |
|-------|----------|-----|
| Missing self-referencing tag | Critical | Add hreflang pointing to same page URL |
| Missing return tags | Critical | Add matching return tags on all alternates |
| Missing x-default | High | Add x-default pointing to fallback page |
| Invalid language code | High | Use ISO 639-1 two-letter codes |
| Invalid region code | High | Use ISO 3166-1 Alpha-2 codes |
| Hreflang on non-canonical URL | High | Move hreflang to canonical URL only |
| HTTP/HTTPS mismatch | Medium | Standardize all URLs to HTTPS |
| Trailing slash inconsistency | Medium | Match canonical URL format exactly |

## Implementation Methods

### Method 1: HTML Link Tags (< 50 variants)
```html
<link rel="alternate" hreflang="en-US" href="https://example.com/page" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/page" />
<link rel="alternate" hreflang="x-default" href="https://example.com/page" />
```

### Method 2: HTTP Headers (non-HTML files)
```
Link: <https://example.com/page>; rel="alternate"; hreflang="en-US",
      <https://example.com/fr/page>; rel="alternate"; hreflang="fr"
```

### Method 3: XML Sitemap (recommended for large sites)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/page</loc>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/page" />
    <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/page" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/page" />
  </url>
</urlset>
```

## Output

### Hreflang Validation Report
| Language | URL | Self-Ref | Return Tags | x-default | Status |
|----------|-----|----------|-------------|-----------|--------|
| en-US | ... | ✅ | ✅ | ✅ | ✅ |
| fr | ... | ❌ | ⚠️ | ✅ | ❌ |

### Generated Hreflang Tags
### Recommendations
