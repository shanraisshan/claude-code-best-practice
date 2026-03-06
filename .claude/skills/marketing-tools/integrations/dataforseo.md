# DataForSEO

Comprehensive SEO data API for SERP results, keyword research, backlinks, and on-page analysis.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | SERP, Keywords Data, Backlinks, On-Page, Labs |
| MCP | - | Not available |
| CLI | ✓ | [dataforseo.js](../clis/dataforseo.js) |
| SDK | ✓ | Python, TypeScript, PHP, Java, C# |

## Authentication

- **Type**: Basic Auth
- **Header**: `Authorization: Basic {base64(login:password)}`
- **Get credentials**: API Access tab at https://app.dataforseo.com/api-access
- **Note**: API password is auto-generated, different from account password

## Common Agent Operations

### SERP - Google organic (live)

```bash
POST https://api.dataforseo.com/v3/serp/google/organic/live/regular

[{
  "keyword": "marketing automation",
  "location_name": "United States",
  "language_name": "English"
}]
```

### Keywords - Search volume (live)

```bash
POST https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live

[{
  "keywords": ["email marketing", "marketing automation", "crm software"],
  "location_code": 2840,
  "language_code": "en"
}]
```

### Keywords - Keywords for site (live)

```bash
POST https://api.dataforseo.com/v3/keywords_data/google_ads/keywords_for_site/live

[{
  "target": "example.com",
  "location_code": 2840,
  "language_code": "en"
}]
```

### Backlinks - Summary

```bash
POST https://api.dataforseo.com/v3/backlinks/summary/live

[{
  "target": "example.com",
  "internal_list_limit": 10,
  "backlinks_status_type": "live"
}]
```

### Backlinks - List

```bash
POST https://api.dataforseo.com/v3/backlinks/backlinks/live

[{
  "target": "example.com",
  "mode": "as_is",
  "limit": 100,
  "backlinks_status_type": "live"
}]
```

### Backlinks - Referring domains

```bash
POST https://api.dataforseo.com/v3/backlinks/referring_domains/live

[{
  "target": "example.com",
  "limit": 100
}]
```

### Backlinks - Index (database stats)

```bash
GET https://api.dataforseo.com/v3/backlinks/index
```

### On-Page - Instant pages audit

```bash
POST https://api.dataforseo.com/v3/on_page/instant_pages

[{
  "url": "https://example.com/page",
  "enable_javascript": true
}]
```

### SERP - Locations list

```bash
GET https://api.dataforseo.com/v3/serp/google/locations
```

### SERP - Languages list

```bash
GET https://api.dataforseo.com/v3/serp/google/languages
```

## API Pattern

DataForSEO uses two methods for most endpoints:
- **Live** (`/live`) - Synchronous, results in same response
- **Task-based** (`/task_post` + `/task_get/$id`) - Async for large requests

Request bodies are always JSON arrays (even for single requests).

## Key Metrics

### Keyword Metrics
- `search_volume` - Monthly search volume
- `competition` - Competition level (0-1)
- `cpc` - Cost per click
- `monthly_searches` - Monthly breakdown array

### Backlink Metrics
- `total_backlinks` - Total backlink count
- `referring_domains` - Unique referring domains
- `domain_rank` - Domain authority score
- `backlinks_spam_score` - Spam score

## When to Use

- Programmatic SERP tracking at scale
- Keyword research with search volume data
- Backlink analysis and monitoring
- On-page SEO audits
- Competitor analysis

## Rate Limits

- Rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`
- Backlinks API: 2000 requests/minute, 30 simultaneous
- Varies by endpoint and plan

## Relevant Skills

- seo-audit
- programmatic-seo
- content-strategy
- competitor-alternatives
