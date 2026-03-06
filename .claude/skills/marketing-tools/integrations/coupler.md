# Coupler.io

Data integration platform that connects marketing, sales, analytics, and e-commerce data sources to destinations like spreadsheets, BI tools, and data warehouses with automated scheduling.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Importers, Runs, Sources, Destinations |
| MCP | ✓ | [Claude connector](https://claude.com/connectors/coupler-io) |
| CLI | ✓ | [coupler.js](../clis/coupler.js) |
| SDK | - | REST API only |

## Authentication

- **Type**: API Key
- **Header**: `Authorization: Bearer {api_key}`
- **Get key**: Settings > API at https://app.coupler.io

## Common Agent Operations

### List Importers

```bash
GET https://api.coupler.io/v1/importers
```

### Get Importer Details

```bash
GET https://api.coupler.io/v1/importers/{id}
```

### Trigger an Importer Run

```bash
POST https://api.coupler.io/v1/importers/{id}/run
```

### Create an Importer

```bash
POST https://api.coupler.io/v1/importers

{
  "source_type": "google_analytics",
  "destination_type": "google_sheets",
  "name": "GA4 to Sheets Daily"
}
```

### Delete an Importer

```bash
DELETE https://api.coupler.io/v1/importers/{id}
```

### List Runs for an Importer

```bash
GET https://api.coupler.io/v1/importers/{id}/runs
```

### Get Run Details

```bash
GET https://api.coupler.io/v1/runs/{id}
```

### List Available Sources

```bash
GET https://api.coupler.io/v1/sources
```

### List Available Destinations

```bash
GET https://api.coupler.io/v1/destinations
```

## Key Metrics

### Importer Data
- `id` - Importer ID
- `name` - Importer name
- `source_type` - Source connector type
- `destination_type` - Destination connector type
- `schedule` - Automation schedule
- `status` - Current status
- `last_run_at` - Last run timestamp

### Run Data
- `id` - Run ID
- `importer_id` - Parent importer
- `status` - Run status (pending, running, completed, failed)
- `started_at` - Start timestamp
- `finished_at` - Finish timestamp
- `rows_imported` - Number of rows processed
- `error` - Error message if failed

## Parameters

### Importer Creation
- `source_type` - Source connector (e.g., google_analytics, google_ads, facebook_ads, hubspot, shopify, stripe, airtable)
- `destination_type` - Destination connector (e.g., google_sheets, bigquery, snowflake, postgresql)
- `name` - Importer name
- `schedule` - Automation schedule (e.g., hourly, daily, weekly)

### Supported Sources
- **Analytics**: Google Analytics, Adobe Analytics
- **Ads**: Google Ads, Facebook Ads, LinkedIn Ads, TikTok Ads
- **CRM**: HubSpot, Salesforce, Pipedrive
- **E-commerce**: Shopify, Stripe, WooCommerce
- **Other**: Airtable, Google Sheets, BigQuery, MySQL, PostgreSQL

### Supported Destinations
- **Spreadsheets**: Google Sheets, Excel Online
- **BI Tools**: Looker Studio, Power BI, Tableau
- **Data Warehouses**: BigQuery, Snowflake, Redshift
- **Databases**: PostgreSQL, MySQL

## When to Use

- Automating marketing data pipelines from ads and analytics platforms
- Consolidating multi-channel campaign data into a single destination
- Scheduling recurring data syncs from CRM to spreadsheets or BI tools
- Building marketing dashboards with fresh data from multiple sources
- Exporting e-commerce data for reporting and analysis
- Connecting data sources without writing custom ETL code

## Rate Limits

- Rate limits vary by plan
- Standard: API access available on Professional and higher plans
- Importer run frequency depends on plan tier

## Relevant Skills

- analytics-tracking
- paid-ads
- revops
