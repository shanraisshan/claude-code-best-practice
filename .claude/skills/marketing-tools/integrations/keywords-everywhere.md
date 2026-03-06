# Keywords Everywhere

Keyword research API for search volume, CPC, competition, related keywords, and traffic data.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API for keyword data, related keywords, traffic |
| MCP | - | Community MCP server available |
| CLI | ✓ | [keywords-everywhere.js](../clis/keywords-everywhere.js) |
| SDK | - | API-only |

## Authentication

- **Type**: API Key (Bearer token)
- **Header**: `Authorization: Bearer {api_key}`
- **Get key**: https://keywordseverywhere.com/first-install-addon.html
- **Limit**: 100 keywords per request

## Common Agent Operations

### Get keyword data (volume, CPC, competition)

```bash
POST https://api.keywordseverywhere.com/v1/get_keyword_data

Authorization: Bearer {api_key}

{
  "country": "us",
  "currency": "USD",
  "dataSource": "gkp",
  "kw": ["email marketing", "marketing automation", "crm software"]
}
```

### Get related keywords

```bash
POST https://api.keywordseverywhere.com/v1/get_related_keywords

Authorization: Bearer {api_key}

{
  "country": "us",
  "currency": "USD",
  "dataSource": "gkp",
  "kw": ["email marketing"]
}
```

### Get "People Also Search For" keywords

```bash
POST https://api.keywordseverywhere.com/v1/get_pasf_keywords

Authorization: Bearer {api_key}

{
  "country": "us",
  "currency": "USD",
  "dataSource": "gkp",
  "kw": ["email marketing"]
}
```

### Get domain keywords (what a domain ranks for)

```bash
POST https://api.keywordseverywhere.com/v1/get_domain_keywords

Authorization: Bearer {api_key}

{
  "country": "us",
  "currency": "USD",
  "domain": "example.com"
}
```

### Get URL keywords (what a specific URL ranks for)

```bash
POST https://api.keywordseverywhere.com/v1/get_url_keywords

Authorization: Bearer {api_key}

{
  "country": "us",
  "currency": "USD",
  "url": "https://example.com/page"
}
```

### Get domain traffic

```bash
POST https://api.keywordseverywhere.com/v1/get_domain_traffic

Authorization: Bearer {api_key}

{
  "country": "us",
  "domain": "example.com"
}
```

### Get URL traffic

```bash
POST https://api.keywordseverywhere.com/v1/get_url_traffic

Authorization: Bearer {api_key}

{
  "country": "us",
  "url": "https://example.com/page"
}
```

### Get domain backlinks

```bash
POST https://api.keywordseverywhere.com/v1/get_domain_backlinks

Authorization: Bearer {api_key}

{
  "domain": "example.com"
}
```

### Get page backlinks

```bash
POST https://api.keywordseverywhere.com/v1/get_page_backlinks

Authorization: Bearer {api_key}

{
  "url": "https://example.com/page"
}
```

### Check credits

```bash
GET https://api.keywordseverywhere.com/v1/get_credits

Authorization: Bearer {api_key}
```

### Get supported countries

```bash
GET https://api.keywordseverywhere.com/v1/get_countries

Authorization: Bearer {api_key}
```

### Get supported currencies

```bash
GET https://api.keywordseverywhere.com/v1/get_currencies

Authorization: Bearer {api_key}
```

## Key Metrics

### Keyword Data
- `vol` - Monthly search volume
- `cpc.value` - Cost per click
- `competition` - Competition score
- `trend` - 12-month trend data

### Traffic Data
- `estimated_traffic` - Estimated monthly traffic
- `keywords_count` - Number of ranking keywords

## Parameters

- `country` - Country code (us, uk, de, fr, etc.)
- `currency` - Currency code (USD, GBP, EUR, etc.)
- `dataSource` - Data source, default `gkp` (Google Keyword Planner)
- `kw` - Array of keywords (max 100 per request)

## When to Use

- Quick keyword research with volume and CPC
- Finding related keywords and PASF suggestions
- Analyzing domain/URL keyword rankings
- Traffic estimation for domains and pages
- Backlink discovery

## Rate Limits

- 100 keywords per request
- Credit-based pricing (1 credit per keyword)

## Relevant Skills

- seo-audit
- content-strategy
- programmatic-seo
- competitor-alternatives
