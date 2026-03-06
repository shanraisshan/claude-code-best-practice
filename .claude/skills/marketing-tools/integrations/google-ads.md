# Google Ads

Pay-per-click advertising platform for search, display, and video campaigns.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Google Ads API for campaign management |
| MCP | ✓ | Available via Google Ads MCP server |
| CLI | - | Use gcloud or API scripts |
| SDK | ✓ | Client libraries for multiple languages |

## Authentication

- **Type**: OAuth 2.0
- **Scopes**: `https://www.googleapis.com/auth/adwords`
- **Setup**: Create credentials in Google Cloud Console, link to Google Ads account
- **Headers**: `developer-token`, `login-customer-id` (for MCC)

## Common Agent Operations

### Get account info

```bash
POST https://googleads.googleapis.com/v14/customers/{customer_id}/googleAds:searchStream

{
  "query": "SELECT customer.id, customer.descriptive_name FROM customer"
}
```

### List campaigns

```bash
POST https://googleads.googleapis.com/v14/customers/{customer_id}/googleAds:searchStream

{
  "query": "SELECT campaign.id, campaign.name, campaign.status, campaign_budget.amount_micros FROM campaign ORDER BY campaign.id"
}
```

### Get campaign performance

```bash
POST https://googleads.googleapis.com/v14/customers/{customer_id}/googleAds:searchStream

{
  "query": "SELECT campaign.name, metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions FROM campaign WHERE segments.date DURING LAST_30_DAYS"
}
```

### Get ad group performance

```bash
POST https://googleads.googleapis.com/v14/customers/{customer_id}/googleAds:searchStream

{
  "query": "SELECT ad_group.name, metrics.impressions, metrics.clicks, metrics.conversions FROM ad_group WHERE segments.date DURING LAST_7_DAYS"
}
```

### Get keyword performance

```bash
POST https://googleads.googleapis.com/v14/customers/{customer_id}/googleAds:searchStream

{
  "query": "SELECT ad_group_criterion.keyword.text, metrics.impressions, metrics.clicks, metrics.average_cpc FROM keyword_view WHERE segments.date DURING LAST_30_DAYS ORDER BY metrics.clicks DESC LIMIT 50"
}
```

### Pause campaign

```bash
POST https://googleads.googleapis.com/v14/customers/{customer_id}/campaigns:mutate

{
  "operations": [{
    "update": {
      "resourceName": "customers/{customer_id}/campaigns/{campaign_id}",
      "status": "PAUSED"
    },
    "updateMask": "status"
  }]
}
```

### Update budget

```bash
POST https://googleads.googleapis.com/v14/customers/{customer_id}/campaignBudgets:mutate

{
  "operations": [{
    "update": {
      "resourceName": "customers/{customer_id}/campaignBudgets/{budget_id}",
      "amountMicros": "50000000"
    },
    "updateMask": "amountMicros"
  }]
}
```

## Key Metrics

| Metric | Description |
|--------|-------------|
| `metrics.impressions` | Ad impressions |
| `metrics.clicks` | Clicks |
| `metrics.cost_micros` | Cost in micros (divide by 1M) |
| `metrics.conversions` | Conversions |
| `metrics.conversions_value` | Conversion value |
| `metrics.average_cpc` | Average cost per click |
| `metrics.ctr` | Click-through rate |
| `metrics.conversion_rate` | Conversion rate |

## Campaign Types

- `SEARCH` - Search network text ads
- `DISPLAY` - Display network
- `SHOPPING` - Product shopping ads
- `VIDEO` - YouTube video ads
- `PERFORMANCE_MAX` - AI-optimized across channels
- `DEMAND_GEN` - Discovery/Demand Gen

## GAQL (Google Ads Query Language)

```sql
SELECT
  campaign.name,
  metrics.clicks,
  metrics.conversions
FROM campaign
WHERE
  campaign.status = 'ENABLED'
  AND segments.date DURING LAST_30_DAYS
ORDER BY metrics.conversions DESC
LIMIT 10
```

## When to Use

- Managing search advertising campaigns
- Analyzing campaign performance
- Adjusting budgets and bids
- Keyword research and management
- Conversion tracking analysis

## Rate Limits

- 15,000 operations per day (basic)
- Higher limits with developer token levels

## Relevant Skills

- paid-ads
- analytics-tracking
- page-cro
