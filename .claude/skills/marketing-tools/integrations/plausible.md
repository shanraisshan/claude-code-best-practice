# Plausible Analytics

Privacy-focused, open-source web analytics with a simple API for stats queries without cookies or personal data collection.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Stats v2 Query, Sites Provisioning, Goals, Shared Links |
| MCP | - | Not available |
| CLI | ✓ | [plausible.js](../clis/plausible.js) |
| SDK | - | REST API only |

## Authentication

- **Type**: Bearer Token
- **Header**: `Authorization: Bearer {api_key}`
- **Get key**: https://plausible.io/settings > API Keys
- **Note**: Sites API requires Enterprise plan

## Common Agent Operations

### Stats Query (v2)

```bash
POST https://plausible.io/api/v2/query

{
  "site_id": "example.com",
  "metrics": ["visitors", "pageviews", "bounce_rate", "visit_duration"],
  "date_range": "30d"
}
```

### Top Pages

```bash
POST https://plausible.io/api/v2/query

{
  "site_id": "example.com",
  "metrics": ["visitors", "pageviews"],
  "date_range": "30d",
  "dimensions": ["event:page"]
}
```

### Traffic Sources

```bash
POST https://plausible.io/api/v2/query

{
  "site_id": "example.com",
  "metrics": ["visitors", "bounce_rate"],
  "date_range": "30d",
  "dimensions": ["visit:source"]
}
```

### Time Series

```bash
POST https://plausible.io/api/v2/query

{
  "site_id": "example.com",
  "metrics": ["visitors", "pageviews"],
  "date_range": "30d",
  "dimensions": ["time:day"]
}
```

### Breakdown by Country

```bash
POST https://plausible.io/api/v2/query

{
  "site_id": "example.com",
  "metrics": ["visitors", "percentage"],
  "date_range": "30d",
  "dimensions": ["visit:country"]
}
```

### Filtered Query (specific page)

```bash
POST https://plausible.io/api/v2/query

{
  "site_id": "example.com",
  "metrics": ["visitors", "pageviews", "bounce_rate"],
  "date_range": "30d",
  "filters": [["is", "event:page", ["/pricing"]]]
}
```

### Realtime Visitors (v1)

```bash
GET https://plausible.io/api/v1/stats/realtime/visitors?site_id=example.com
```

### List Sites

```bash
GET https://plausible.io/api/v1/sites
```

## Key Metrics

### Available Metrics
- `visitors` - Unique visitors
- `visits` - Total visits (sessions)
- `pageviews` - Total page views
- `views_per_visit` - Pages per session
- `bounce_rate` - Bounce rate percentage
- `visit_duration` - Average session duration (seconds)
- `events` - Total events
- `conversion_rate` - Goal conversion rate
- `time_on_page` - Average time on page
- `scroll_depth` - Average scroll depth
- `percentage` - Share of total

### Available Dimensions
- `event:page` - Page path
- `event:goal` - Goal name
- `visit:source` - Traffic source
- `visit:referrer` - Referrer URL
- `visit:channel` - Traffic channel
- `visit:utm_source`, `visit:utm_medium`, `visit:utm_campaign` - UTM params
- `visit:device` - Device type
- `visit:browser` - Browser name
- `visit:os` - Operating system
- `visit:country`, `visit:region`, `visit:city` - Location
- `visit:entry_page`, `visit:exit_page` - Entry/exit pages
- `time`, `time:day`, `time:week`, `time:month` - Time periods

## Parameters

### Stats Query (v2)
- `site_id` (required) - Domain registered in Plausible
- `metrics` (required) - Array of metrics to return
- `date_range` (required) - Time period: "day", "7d", "30d", "month", "6mo", "12mo", "year", or custom ["2024-01-01", "2024-01-31"]
- `dimensions` - Array of dimensions to group by
- `filters` - Array of filter conditions: `[operator, dimension, values]`
- `order_by` - Array of sort specs: `[[metric, "desc"]]`
- `pagination` - `{ "limit": 100, "offset": 0 }`

### Filter Operators
- `is` / `is_not` - Exact match
- `contains` / `contains_not` - Substring match
- `matches` / `matches_not` - Wildcard match

## When to Use

- Privacy-first web analytics without cookies
- Simple, lightweight traffic analysis
- UTM campaign performance tracking
- Goal and conversion tracking
- Geographic and device breakdown
- GDPR/CCPA-compliant analytics alternative to GA4

## Rate Limits

- 600 requests/hour per API key
- All requests must be over HTTPS

## Relevant Skills

- analytics-tracking
- content-strategy
- programmatic-seo
- page-cro
- utm-tracking
