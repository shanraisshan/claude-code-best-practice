# Clay

Data enrichment and outbound automation platform for building lead lists with waterfall enrichment across 75+ data providers.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Tables, People Enrichment, Company Enrichment |
| MCP | ✓ | [Claude connector](https://claude.com/connectors/clay) |
| CLI | ✓ | [clay.js](../clis/clay.js) |
| SDK | - | REST API only |

## Authentication

- **Type**: API Key (Bearer token)
- **Header**: `Authorization: Bearer {api_key}`
- **Get key**: Settings > API at https://app.clay.com

## Common Agent Operations

### List Tables

```bash
GET https://api.clay.com/v3/tables

Authorization: Bearer {api_key}
```

### Get Table Details

```bash
GET https://api.clay.com/v3/tables/{table_id}

Authorization: Bearer {api_key}
```

### Get Table Rows

```bash
GET https://api.clay.com/v3/tables/{table_id}/rows?page=1&per_page=25

Authorization: Bearer {api_key}
```

### Add Row to Table

```bash
POST https://api.clay.com/v3/tables/{table_id}/rows

{
  "first_name": "Jane",
  "last_name": "Doe",
  "company": "Acme Inc",
  "email": "jane@acme.com"
}
```

### People Enrichment

```bash
POST https://api.clay.com/v3/people/enrich

{
  "email": "jane@acme.com"
}
```

### Company Enrichment

```bash
POST https://api.clay.com/v3/companies/enrich

{
  "domain": "acme.com"
}
```

## Key Metrics

### Person Data
- `first_name`, `last_name` - Name
- `email` - Email address
- `title` - Job title
- `linkedin_url` - LinkedIn profile
- `company` - Company name
- `location` - Location
- `seniority` - Seniority level

### Company Data
- `name` - Company name
- `domain` - Website domain
- `industry` - Industry
- `employee_count` - Number of employees
- `revenue` - Estimated revenue
- `location` - Headquarters location
- `technologies` - Tech stack
- `description` - Company description

### Table Data
- `id` - Table ID
- `name` - Table name
- `row_count` - Number of rows
- `columns` - Column definitions
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Parameters

### Tables
- `page` - Page number (default: 1)
- `per_page` - Results per page (default: 25)

### People Enrichment
- `email` - Email address
- `linkedin_url` - LinkedIn profile URL
- `first_name` + `last_name` - Name-based lookup

### Company Enrichment
- `domain` - Company domain (e.g., "acme.com")

### Add Row
- Fields are dynamic and match the table's column definitions
- Pass data as key-value pairs matching column names

## When to Use

- Building enriched prospect lists with waterfall enrichment across multiple providers
- Enriching leads with person and company data from 75+ sources
- Automating outbound workflows with enriched data
- Finding verified contact info (emails, phone numbers, social profiles)
- Company research and firmographic analysis
- Triggering enrichment workflows via webhooks
- Syncing enriched data back to CRM or outbound tools

## Rate Limits

- Rate limits vary by plan
- Standard: 100 requests/minute
- Enterprise plans have higher limits
- Enrichment credits consumed per lookup vary by data provider
- Webhook endpoints accept data continuously

## Relevant Skills

- cold-email
- revops
- sales-enablement
- competitor-alternatives
