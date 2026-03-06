# Adobe Analytics

Enterprise analytics platform for cross-channel measurement and attribution.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Reporting API 2.0, Data Insertion API |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | ✓ | AppMeasurement.js, Mobile SDKs, Launch |

## Authentication

- **Type**: OAuth 2.0 (Service Account JWT)
- **Setup**: Create integration in Adobe Developer Console
- **Header**: `Authorization: Bearer {access_token}`

## Common Agent Operations

### Get report suite info

```bash
GET https://analytics.adobe.io/api/{company_id}/reportsuites

Authorization: Bearer {access_token}
x-api-key: {client_id}
```

### Get dimensions

```bash
GET https://analytics.adobe.io/api/{company_id}/dimensions?rsid={report_suite_id}

Authorization: Bearer {access_token}
x-api-key: {client_id}
```

### Get metrics

```bash
GET https://analytics.adobe.io/api/{company_id}/metrics?rsid={report_suite_id}

Authorization: Bearer {access_token}
x-api-key: {client_id}
```

### Run report

```bash
POST https://analytics.adobe.io/api/{company_id}/reports

{
  "rsid": "{report_suite_id}",
  "globalFilters": [{
    "type": "dateRange",
    "dateRange": "2024-01-01T00:00:00/2024-01-31T23:59:59"
  }],
  "metricContainer": {
    "metrics": [
      {"id": "metrics/visits"},
      {"id": "metrics/pageviews"},
      {"id": "metrics/orders"}
    ]
  },
  "dimension": "variables/evar1"
}
```

### Get segments

```bash
GET https://analytics.adobe.io/api/{company_id}/segments?rsid={report_suite_id}

Authorization: Bearer {access_token}
x-api-key: {client_id}
```

### Data Insertion (server-side)

```bash
POST https://{tracking_server}/b/ss/{report_suite_id}/0

<?xml version="1.0" encoding="UTF-8"?>
<request>
  <visitorID>user_123</visitorID>
  <events>event1</events>
  <eVar1>campaign_name</eVar1>
  <prop1>page_type</prop1>
</request>
```

## AppMeasurement.js

```javascript
// Initialize
var s = s_gi('report_suite_id');
s.trackingServer = 'metrics.example.com';

// Set variables
s.pageName = 'Home Page';
s.channel = 'Marketing';
s.eVar1 = 'campaign_name';
s.events = 'event1';

// Track page view
s.t();

// Track link
s.tl(this, 'o', 'Button Click');
```

## Key Concepts

- **Report Suite** - Data container
- **eVars** - Conversion variables (persistent)
- **props** - Traffic variables (hit-level)
- **Events** - Success metrics
- **Segments** - User/visit filters
- **Calculated Metrics** - Derived metrics

## Common Dimensions

- `variables/page` - Page name
- `variables/evar1` - Custom conversion variable
- `variables/prop1` - Custom traffic variable
- `variables/marketingchannel` - Marketing channel
- `variables/referringdomain` - Referring domain

## Common Metrics

- `metrics/visits` - Visits
- `metrics/pageviews` - Page views
- `metrics/uniquevisitors` - Unique visitors
- `metrics/orders` - Orders
- `metrics/revenue` - Revenue

## When to Use

- Enterprise-scale analytics
- Cross-channel attribution
- Integration with Adobe Experience Cloud
- Advanced segmentation
- Data warehouse exports

## Rate Limits

- 12 requests/second per company
- 120 requests/minute

## Relevant Skills

- analytics-tracking
- ab-test-setup
- paid-ads
