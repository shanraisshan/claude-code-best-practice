# TikTok Ads

Advertising platform for TikTok's short-form video audience.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Marketing API for campaigns, audiences, reporting |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | ✓ | Python SDK available |

## Authentication

- **Type**: Access Token
- **Header**: `Access-Token: {access_token}`
- **Setup**: Create app in TikTok for Business, get access token

## Common Agent Operations

### Get advertiser info

```bash
GET https://business-api.tiktok.com/open_api/v1.3/advertiser/info/?advertiser_ids=["{advertiser_id}"]

Access-Token: {access_token}
```

### Get campaigns

```bash
GET https://business-api.tiktok.com/open_api/v1.3/campaign/get/?advertiser_id={advertiser_id}&page=1&page_size=20

Access-Token: {access_token}
```

### Get campaign report

```bash
POST https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/

Access-Token: {access_token}

{
  "advertiser_id": "{advertiser_id}",
  "report_type": "BASIC",
  "dimensions": ["campaign_id"],
  "metrics": ["spend", "impressions", "clicks", "conversion"],
  "data_level": "AUCTION_CAMPAIGN",
  "start_date": "2024-01-01",
  "end_date": "2024-01-31"
}
```

### Create campaign

```bash
POST https://business-api.tiktok.com/open_api/v1.3/campaign/create/

Access-Token: {access_token}

{
  "advertiser_id": "{advertiser_id}",
  "campaign_name": "Campaign Name",
  "objective_type": "CONVERSIONS",
  "budget_mode": "BUDGET_MODE_DAY",
  "budget": 100
}
```

### Update campaign status

```bash
POST https://business-api.tiktok.com/open_api/v1.3/campaign/status/update/

Access-Token: {access_token}

{
  "advertiser_id": "{advertiser_id}",
  "campaign_ids": ["{campaign_id}"],
  "opt_status": "ENABLE"
}
```

### Get ad groups

```bash
GET https://business-api.tiktok.com/open_api/v1.3/adgroup/get/?advertiser_id={advertiser_id}&campaign_ids=["{campaign_id}"]

Access-Token: {access_token}
```

### Get audiences

```bash
GET https://business-api.tiktok.com/open_api/v1.3/dmp/custom_audience/list/?advertiser_id={advertiser_id}

Access-Token: {access_token}
```

## Key Metrics

| Metric | Description |
|--------|-------------|
| `spend` | Amount spent |
| `impressions` | Ad impressions |
| `clicks` | Clicks |
| `ctr` | Click-through rate |
| `cpc` | Cost per click |
| `cpm` | Cost per 1000 impressions |
| `conversion` | Conversions |
| `cost_per_conversion` | CPA |
| `video_play_actions` | Video views |
| `video_watched_6s` | 6s views |

## Campaign Objectives

- `REACH` - Brand awareness
- `TRAFFIC` - Website traffic
- `VIDEO_VIEWS` - Video views
- `LEAD_GENERATION` - Lead forms
- `CONVERSIONS` - Website conversions
- `APP_PROMOTION` - App installs

## Targeting Options

### Demographics
- Age ranges
- Gender
- Languages
- Locations

### Interests & Behavior
- Interest categories
- Video interactions
- Creator interactions
- Hashtag interactions

### Custom Audiences
- Customer file uploads
- Website visitors (pixel)
- App activity
- Engagement audiences

## When to Use

- Reaching younger demographics (18-34)
- Video-first advertising
- Viral/creative campaigns
- App promotion

## Rate Limits

- 10 requests/second
- 100,000 requests/day

## Relevant Skills

- paid-ads
- analytics-tracking
