# Supermetrics

Marketing data pipeline that connects 200+ marketing platforms. Pulls data from ad platforms, analytics, social, SEO, email, and more into a single query interface.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Query any connected data source, manage accounts |
| MCP | ✓ | [Claude connector](https://claude.com/connectors/supermetrics) |
| CLI | ✓ | [supermetrics.js](../clis/supermetrics.js) |
| SDK | - | REST API only |

## Authentication

- **Type**: API Key
- **Query param**: `api_key={api_key}` or **Header**: `x-api-key: {api_key}`
- **Get key**: Supermetrics Hub > API settings at https://hub.supermetrics.com

## Common Agent Operations

### Query a Data Source

```bash
POST https://api.supermetrics.com/enterprise/v2/query/data/json

{
  "ds_id": "GA4",
  "ds_accounts": "123456789",
  "date_range_type": "last_28_days",
  "fields": [
    { "name": "sessions" },
    { "name": "pageviews" },
    { "name": "date" }
  ]
}
```

### Query with Filters

```bash
POST https://api.supermetrics.com/enterprise/v2/query/data/json

{
  "ds_id": "AW",
  "ds_accounts": "123-456-7890",
  "date_range_type": "last_month",
  "fields": [
    { "name": "campaign_name" },
    { "name": "clicks" },
    { "name": "impressions" },
    { "name": "cost" }
  ],
  "max_rows": 100
}
```

### List Available Data Sources

```bash
GET https://api.supermetrics.com/enterprise/v2/datasources
```

### List Connected Accounts

```bash
GET https://api.supermetrics.com/enterprise/v2/datasources/accounts?ds_id=GA4
```

### List Teams

```bash
GET https://api.supermetrics.com/enterprise/v2/teams
```

### List Users

```bash
GET https://api.supermetrics.com/enterprise/v2/users
```

## Key Metrics

### Data Source IDs
- `GA4` - Google Analytics 4
- `GA4_PAID` - Google Analytics (paid)
- `AW` - Google Ads
- `FB` - Facebook Ads
- `LI` - LinkedIn Ads
- `TW_ADS` - Twitter Ads
- `IG_IA` - Instagram
- `FB_IA` - Facebook Pages
- `GSC` - Google Search Console
- `SE` - Semrush
- `MC` - Mailchimp
- `HubSpot` - HubSpot

### Date Range Values
- `last_28_days` - Last 28 days
- `last_month` - Previous calendar month
- `this_month` - Current month to date
- `custom` - Custom range (requires `start_date` and `end_date`)

## Parameters

### Query
- `ds_id` - Data source identifier (required)
- `ds_accounts` - Account ID for the data source (required)
- `date_range_type` - Date range preset or "custom" (required)
- `fields` - Array of field objects with `name` property (required)
- `filter` - Filter expression for narrowing results
- `max_rows` - Maximum number of rows to return
- `start_date` - Start date for custom range (YYYY-MM-DD)
- `end_date` - End date for custom range (YYYY-MM-DD)

### Common Fields by Source
- **GA4**: `sessions`, `pageviews`, `users`, `bounce_rate`, `date`, `source`, `medium`, `page_path`
- **Google Ads**: `campaign_name`, `clicks`, `impressions`, `cost`, `conversions`, `ctr`, `cpc`
- **Facebook Ads**: `campaign_name`, `impressions`, `clicks`, `spend`, `reach`, `cpm`, `cpc`
- **LinkedIn Ads**: `campaign_name`, `impressions`, `clicks`, `cost`, `conversions`
- **GSC**: `query`, `clicks`, `impressions`, `ctr`, `position`, `page`

## When to Use

- Pulling cross-platform marketing data into a single report
- Comparing performance across ad platforms (Google, Meta, LinkedIn, TikTok)
- Aggregating analytics data from multiple sources
- Automating marketing reporting workflows
- Building unified dashboards across marketing channels
- Extracting SEO data alongside paid media metrics

## Rate Limits

- Rate limits vary by plan
- Enterprise API: typically 100 requests/minute
- Query results may be paginated for large datasets
- Recommended: use `max_rows` to control response size

## Relevant Skills

- analytics-tracking
- paid-ads
- seo-audit
- content-strategy
- social-content
