# LinkedIn Ads

B2B advertising platform with professional targeting.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Marketing API for campaigns, audiences, analytics |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | - | API-only (community libraries available) |

## Authentication

- **Type**: OAuth 2.0
- **Header**: `Authorization: Bearer {access_token}`
- **Scopes**: `r_ads`, `r_ads_reporting`, `rw_ads`

## Common Agent Operations

### Get ad accounts

```bash
GET https://api.linkedin.com/v2/adAccountsV2?q=search

Authorization: Bearer {access_token}
```

### Get campaigns

```bash
GET https://api.linkedin.com/v2/adCampaignsV2?q=search&search.account.values[0]=urn:li:sponsoredAccount:{account_id}

Authorization: Bearer {access_token}
```

### Get campaign analytics

```bash
GET https://api.linkedin.com/v2/adAnalyticsV2?q=analytics&pivot=CAMPAIGN&dateRange.start.year=2024&dateRange.start.month=1&dateRange.start.day=1&dateRange.end.year=2024&dateRange.end.month=1&dateRange.end.day=31&campaigns=urn:li:sponsoredCampaign:{campaign_id}&fields=impressions,clicks,costInLocalCurrency,conversions

Authorization: Bearer {access_token}
```

### Create campaign

```bash
POST https://api.linkedin.com/v2/adCampaignsV2

Authorization: Bearer {access_token}

{
  "account": "urn:li:sponsoredAccount:{account_id}",
  "name": "Campaign Name",
  "type": "SPONSORED_UPDATES",
  "costType": "CPC",
  "unitCost": {
    "amount": "5.00",
    "currencyCode": "USD"
  },
  "dailyBudget": {
    "amount": "100.00",
    "currencyCode": "USD"
  },
  "status": "PAUSED"
}
```

### Update campaign status

```bash
POST https://api.linkedin.com/v2/adCampaignsV2/{campaign_id}

Authorization: Bearer {access_token}

{
  "patch": {
    "$set": {
      "status": "ACTIVE"
    }
  }
}
```

### Get creatives

```bash
GET https://api.linkedin.com/v2/adCreativesV2?q=search&search.campaign.values[0]=urn:li:sponsoredCampaign:{campaign_id}

Authorization: Bearer {access_token}
```

### Get audience counts

```bash
POST https://api.linkedin.com/v2/audienceCountsV2

{
  "audienceCriteria": {
    "include": {
      "and": [{
        "or": {
          "urn:li:adTargetingFacet:titles": ["urn:li:title:123"]
        }
      }]
    }
  }
}
```

## Key Metrics

| Metric | Description |
|--------|-------------|
| `impressions` | Ad impressions |
| `clicks` | Total clicks |
| `costInLocalCurrency` | Spend |
| `conversions` | Conversion count |
| `leadGenerationMailContactInfoShares` | Lead form submissions |

## Campaign Types

- `SPONSORED_UPDATES` - Sponsored content
- `TEXT_AD` - Text ads
- `SPONSORED_INMAILS` - Message ads
- `DYNAMIC` - Dynamic ads

## Targeting Options

### Job-Based
- Job titles
- Job functions
- Seniority levels
- Years of experience

### Company-Based
- Company names
- Industries
- Company size
- Company followers

### Professional
- Skills
- Groups
- Schools
- Degrees

## When to Use

- B2B advertising
- Job title targeting
- Account-based marketing
- Lead generation campaigns

## Rate Limits

- 100 requests/day (basic)
- 10,000 requests/day (Marketing Developer Platform)

## Relevant Skills

- paid-ads
- analytics-tracking
