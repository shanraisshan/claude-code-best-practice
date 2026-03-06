# Pendo

Product analytics and in-app guidance platform for tracking user behavior, measuring feature adoption, and delivering targeted in-app messages.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Features, Pages, Guides, Visitors, Accounts, Reports, Metadata |
| MCP | - | Not available |
| CLI | ✓ | [pendo.js](../clis/pendo.js) |
| SDK | - | REST API only |

## Authentication

- **Type**: Integration Key
- **Header**: `x-pendo-integration-key: {key}`
- **Get key**: Settings > Integrations at https://app.pendo.io

## Common Agent Operations

### List Features

```bash
GET https://app.pendo.io/api/v1/feature
```

### Get Feature Details

```bash
GET https://app.pendo.io/api/v1/feature/{featureId}
```

### List Pages

```bash
GET https://app.pendo.io/api/v1/page
```

### Get Page Details

```bash
GET https://app.pendo.io/api/v1/page/{pageId}
```

### List Guides

```bash
GET https://app.pendo.io/api/v1/guide?state=public
```

### Get Guide Details

```bash
GET https://app.pendo.io/api/v1/guide/{guideId}
```

### Get Visitor Data

```bash
GET https://app.pendo.io/api/v1/visitor/{visitorId}
```

### Search Visitors

```bash
POST https://app.pendo.io/api/v1/aggregation

{
  "response": { "mimeType": "application/json" },
  "request": {
    "pipeline": [
      { "source": { "visitors": null } },
      { "filter": "lastVisitedAt > 1700000000000" }
    ]
  }
}
```

### Get Account Data

```bash
GET https://app.pendo.io/api/v1/account/{accountId}
```

### Search Accounts

```bash
POST https://app.pendo.io/api/v1/aggregation

{
  "response": { "mimeType": "application/json" },
  "request": {
    "pipeline": [
      { "source": { "accounts": null } },
      { "filter": "metadata.auto.lastupdated > 1700000000000" }
    ]
  }
}
```

### Run Funnel Report

```bash
POST https://app.pendo.io/api/v1/aggregation

{
  "response": { "mimeType": "application/json" },
  "request": {
    "pipeline": [
      { "source": { "visitors": null, "timeSeries": { "period": "dayRange", "first": 1700000000000, "last": 1700600000000 } } },
      { "identified": "visitorId" },
      { "filter": "pageId == \"page-id-1\"" },
      { "filter": "pageId == \"page-id-2\"" }
    ]
  }
}
```

### List Metadata Fields

```bash
GET https://app.pendo.io/api/v1/metadata/schema/visitor
GET https://app.pendo.io/api/v1/metadata/schema/account
GET https://app.pendo.io/api/v1/metadata/schema/parentAccount
```

## Key Metrics

### Feature Data
- `id` - Feature ID
- `name` - Feature name
- `kind` - Feature type
- `elementPath` - CSS selector for the tracked element
- `pageId` - Associated page ID
- `numEvents` - Event count
- `numVisitors` - Unique visitor count

### Page Data
- `id` - Page ID
- `name` - Page name
- `rules` - URL matching rules
- `numEvents` - Pageview count
- `numVisitors` - Unique visitor count

### Guide Data
- `id` - Guide ID
- `name` - Guide name
- `state` - Guide state (draft, staged, public, disabled)
- `launchMethod` - How the guide is triggered
- `steps` - Guide step definitions
- `numSteps` - Number of steps
- `numViews` - Total views
- `numVisitors` - Unique visitors who saw the guide

### Visitor Data
- `visitorId` - Unique visitor identifier
- `lastVisitedAt` - Last visit timestamp
- `firstVisit` - First visit timestamp
- `numEvents` - Total event count
- `metadata` - Custom visitor metadata

### Account Data
- `accountId` - Unique account identifier
- `lastVisitedAt` - Last visit from any account member
- `numVisitors` - Number of visitors in the account
- `metadata` - Custom account metadata

## Parameters

### Guide Filtering
- `state` - Filter by state: draft, staged, public, disabled

### Aggregation Queries
- `source` - Data source: visitors, accounts, features, pages, guides
- `filter` - Expression-based filtering
- `sort` - Sort results
- `limit` - Max results to return
- `timeSeries` - Time range with period, first, last

### Metadata Kinds
- `visitor` - Visitor metadata schema
- `account` - Account metadata schema
- `parentAccount` - Parent account metadata schema

## When to Use

- Tracking feature adoption and usage patterns
- Building and managing in-app onboarding guides
- Analyzing user behavior across pages and features
- Segmenting users by engagement level
- Running funnel analysis on user journeys
- Identifying at-risk accounts based on usage decline
- A/B testing in-app messages and tooltips

## Rate Limits

- Rate limits vary by plan
- Standard: 500 requests per minute
- Aggregation queries: may take longer for large datasets
- Use pagination for large result sets

## Relevant Skills

- analytics-tracking
- onboarding-cro
- churn-prevention
- ab-test-setup
