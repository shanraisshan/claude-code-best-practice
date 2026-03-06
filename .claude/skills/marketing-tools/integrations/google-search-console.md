# Google Search Console

Free tool for monitoring website search performance and indexing.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Search Analytics API, URL Inspection API |
| MCP | - | Not available |
| CLI | - | Use gcloud or API scripts |
| SDK | ✓ | Google API client libraries |

## Authentication

- **Type**: OAuth 2.0 or Service Account
- **Scopes**: `https://www.googleapis.com/auth/webmasters.readonly`
- **Setup**: Create credentials in Google Cloud Console

## Common Agent Operations

### Get search analytics

```bash
POST https://searchconsole.googleapis.com/webmasters/v3/sites/{site_url}/searchAnalytics/query

{
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "dimensions": ["query"],
  "rowLimit": 100
}
```

### Get performance by page

```bash
POST https://searchconsole.googleapis.com/webmasters/v3/sites/{site_url}/searchAnalytics/query

{
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "dimensions": ["page"],
  "rowLimit": 50
}
```

### Get performance by country

```bash
POST https://searchconsole.googleapis.com/webmasters/v3/sites/{site_url}/searchAnalytics/query

{
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "dimensions": ["country", "query"],
  "rowLimit": 100
}
```

### Inspect URL

```bash
POST https://searchconsole.googleapis.com/v1/urlInspection/index:inspect

{
  "inspectionUrl": "https://example.com/page",
  "siteUrl": "https://example.com/"
}
```

### List sitemaps

```bash
GET https://searchconsole.googleapis.com/webmasters/v3/sites/{site_url}/sitemaps

Authorization: Bearer {access_token}
```

### Submit sitemap

```bash
PUT https://searchconsole.googleapis.com/webmasters/v3/sites/{site_url}/sitemaps/{sitemap_url}

Authorization: Bearer {access_token}
```

### Request indexing

```bash
POST https://indexing.googleapis.com/v3/urlNotifications:publish

{
  "url": "https://example.com/new-page",
  "type": "URL_UPDATED"
}
```

## Dimensions

- `query` - Search query
- `page` - Page URL
- `country` - Country code
- `device` - Device type (MOBILE, DESKTOP, TABLET)
- `date` - Date
- `searchAppearance` - Search result type

## Metrics

- `clicks` - Clicks from search
- `impressions` - Search impressions
- `ctr` - Click-through rate
- `position` - Average position

## Filters

```json
{
  "dimensionFilterGroups": [{
    "filters": [{
      "dimension": "query",
      "operator": "contains",
      "expression": "keyword"
    }]
  }]
}
```

## When to Use

- Analyzing search performance
- Finding keyword opportunities
- Monitoring indexing status
- Submitting new pages for indexing
- Identifying crawl issues
- Tracking position changes

## Rate Limits

- 200 queries per minute
- 1,200 requests per minute

## Relevant Skills

- seo-audit
- programmatic-seo
- analytics-tracking
