# Ahrefs

SEO toolset for backlink analysis, keyword research, and competitive research.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API for Site Explorer, Keywords Explorer |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | - | API-only |

## Authentication

- **Type**: API Token
- **Header**: `Authorization: Bearer {api_token}`
- **Get token**: Account Settings > API in Ahrefs dashboard

## Common Agent Operations

### Domain rating

```bash
GET https://api.ahrefs.com/v3/site-explorer/domain-rating?target=example.com

Authorization: Bearer {api_token}
```

### Backlinks overview

```bash
GET https://api.ahrefs.com/v3/site-explorer/backlinks-stats?target=example.com&mode=domain

Authorization: Bearer {api_token}
```

### Referring domains

```bash
GET https://api.ahrefs.com/v3/site-explorer/refdomains?target=example.com&mode=domain&limit=100

Authorization: Bearer {api_token}
```

### Backlinks list

```bash
GET https://api.ahrefs.com/v3/site-explorer/backlinks?target=example.com&mode=domain&limit=100

Authorization: Bearer {api_token}
```

### Organic keywords

```bash
GET https://api.ahrefs.com/v3/site-explorer/organic-keywords?target=example.com&mode=domain&country=us&limit=100

Authorization: Bearer {api_token}
```

### Top pages

```bash
GET https://api.ahrefs.com/v3/site-explorer/top-pages?target=example.com&mode=domain&country=us&limit=50

Authorization: Bearer {api_token}
```

### Keyword overview

```bash
GET https://api.ahrefs.com/v3/keywords-explorer/overview?keywords=keyword1,keyword2&country=us

Authorization: Bearer {api_token}
```

### Keyword suggestions

```bash
GET https://api.ahrefs.com/v3/keywords-explorer/matching-terms?keyword=seed+keyword&country=us&limit=100

Authorization: Bearer {api_token}
```

### SERP overview

```bash
GET https://api.ahrefs.com/v3/keywords-explorer/serp-overview?keyword=target+keyword&country=us

Authorization: Bearer {api_token}
```

## Key Metrics

### Domain Metrics
- `domain_rating` - Domain Rating (DR)
- `ahrefs_rank` - Ahrefs Rank
- `referring_domains` - Referring domains count
- `backlinks` - Total backlinks
- `organic_traffic` - Estimated organic traffic

### Keyword Metrics
- `volume` - Monthly search volume
- `keyword_difficulty` - KD score (0-100)
- `cpc` - Cost per click
- `clicks` - Estimated monthly clicks
- `global_volume` - Global search volume

### Backlink Fields
- `url_from` - Source URL
- `url_to` - Target URL
- `anchor` - Anchor text
- `domain_rating_source` - Source DR
- `first_seen` - First discovery date

## Modes

- `domain` - Entire domain
- `subdomains` - Domain + subdomains
- `prefix` - URL prefix
- `exact` - Exact URL

## When to Use

- Backlink analysis
- Link building research
- Keyword research
- Competitive analysis
- Content gap analysis
- Site audits

## Rate Limits

- Varies by plan
- 500-5000 rows per request

## Relevant Skills

- seo-audit
- content-strategy
- competitor-alternatives
