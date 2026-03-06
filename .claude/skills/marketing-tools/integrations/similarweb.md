# Similarweb

Competitive traffic intelligence platform providing website analytics, traffic sources, keyword data, and competitor insights.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Traffic, Search, Referrals, Competitors, Geography |
| MCP | - | Not available |
| CLI | ✓ | [similarweb.js](../clis/similarweb.js) |
| SDK | - | REST API only |

## Authentication

- **Type**: API Key
- **Query param**: `?api_key={key}`
- **Get key**: Account Settings > API at https://account.similarweb.com

## Common Agent Operations

### Total Visits

```bash
GET https://api.similarweb.com/v1/website/example.com/total-traffic-and-engagement/visits?api_key={key}&start_date=2024-01&end_date=2024-03&country=us&granularity=monthly
```

### Pages Per Visit

```bash
GET https://api.similarweb.com/v1/website/example.com/total-traffic-and-engagement/pages-per-visit?api_key={key}&start_date=2024-01&end_date=2024-03
```

### Average Visit Duration

```bash
GET https://api.similarweb.com/v1/website/example.com/total-traffic-and-engagement/average-visit-duration?api_key={key}&start_date=2024-01&end_date=2024-03
```

### Bounce Rate

```bash
GET https://api.similarweb.com/v1/website/example.com/total-traffic-and-engagement/bounce-rate?api_key={key}&start_date=2024-01&end_date=2024-03
```

### Traffic Sources Breakdown

```bash
GET https://api.similarweb.com/v1/website/example.com/traffic-sources/overview?api_key={key}&start_date=2024-01&end_date=2024-03
```

### Top Referral Sites

```bash
GET https://api.similarweb.com/v1/website/example.com/traffic-sources/referrals?api_key={key}&start_date=2024-01&end_date=2024-03
```

### Organic Keywords

```bash
GET https://api.similarweb.com/v1/website/example.com/search/organic-search-keywords?api_key={key}&start_date=2024-01&end_date=2024-03
```

### Paid Keywords

```bash
GET https://api.similarweb.com/v1/website/example.com/search/paid-search-keywords?api_key={key}&start_date=2024-01&end_date=2024-03
```

### Similar Sites / Competitors

```bash
GET https://api.similarweb.com/v1/website/example.com/similar-sites/similarsites?api_key={key}
```

### Category Ranking

```bash
GET https://api.similarweb.com/v1/website/example.com/category-rank/category-rank?api_key={key}
```

### Traffic by Country

```bash
GET https://api.similarweb.com/v1/website/example.com/geo/traffic-by-country?api_key={key}&start_date=2024-01&end_date=2024-03
```

## Key Metrics

### Traffic & Engagement
- `visits` - Total visits for the period
- `pages_per_visit` - Average pages viewed per visit
- `average_visit_duration` - Average session duration in seconds
- `bounce_rate` - Percentage of single-page visits

### Traffic Sources
- `search` - Organic + paid search percentage
- `social` - Social media traffic percentage
- `direct` - Direct traffic percentage
- `referrals` - Referral traffic percentage
- `mail` - Email traffic percentage
- `display_ads` - Display advertising percentage

### Search Keywords
- `search_term` - Keyword text
- `share` - Traffic share percentage
- `volume` - Search volume
- `cpc` - Cost per click
- `position` - Average ranking position

### Geography
- `country` - Country code
- `share` - Traffic share from that country

## Parameters

### Common Parameters
- `start_date` - Start month (YYYY-MM format)
- `end_date` - End month (YYYY-MM format)
- `country` - Two-letter country code (e.g., us, gb, de)
- `granularity` - Data granularity: monthly, weekly, daily

### Search Parameters
- `limit` - Number of keywords to return
- `country` - Filter by country

## When to Use

- Analyzing competitor website traffic and engagement metrics
- Benchmarking your site against competitors
- Identifying top traffic sources for any website
- Discovering competitor organic and paid keywords
- Finding similar sites and competitive landscape
- Understanding geographic traffic distribution
- Auditing SEO performance relative to competitors
- Researching market share by traffic volume

## Rate Limits

- Rate limits vary by plan tier
- Standard: 10 requests/second
- Data availability depends on plan (3 months to 36 months historical)
- Some endpoints require Premium or Enterprise plans

## Relevant Skills

- seo-audit
- competitor-alternatives
- paid-ads
- content-strategy
