# Crossbeam

Partner ecosystem platform (now part of Reveal) for sharing account data with partners to identify co-sell opportunities, overlapping customers, and partner-sourced pipeline.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Partners, Populations, Overlaps, Reports, Threads |
| MCP | ✓ | [Claude connector](https://claude.com/connectors/crossbeam) |
| CLI | ✓ | [crossbeam.js](../clis/crossbeam.js) |
| SDK | - | REST API only |

## Authentication

- **Type**: API Key
- **Header**: `Authorization: Bearer {api_key}`
- **Get key**: Settings > API at https://app.crossbeam.com

## Common Agent Operations

### List Partners

```bash
GET https://api.crossbeam.com/v1/partners
Authorization: Bearer {api_key}
```

### Get Partner Details

```bash
GET https://api.crossbeam.com/v1/partners/{id}
Authorization: Bearer {api_key}
```

### List Populations

```bash
GET https://api.crossbeam.com/v1/populations
Authorization: Bearer {api_key}
```

### List Overlaps

```bash
GET https://api.crossbeam.com/v1/overlaps?partner_id={partner_id}&population_id={population_id}
Authorization: Bearer {api_key}
```

### Get Overlap Details

```bash
GET https://api.crossbeam.com/v1/overlaps/{id}
Authorization: Bearer {api_key}
```

### Search Accounts

```bash
GET https://api.crossbeam.com/v1/accounts/search?domain={domain}
Authorization: Bearer {api_key}
```

### List Reports

```bash
GET https://api.crossbeam.com/v1/reports
Authorization: Bearer {api_key}
```

### List Collaboration Threads

```bash
GET https://api.crossbeam.com/v1/threads
Authorization: Bearer {api_key}
```

## Key Metrics

### Partner Data
- `id` - Partner ID
- `name` - Partner company name
- `status` - Partnership status (active, pending, etc.)
- `created_at` - When the partnership was established
- `populations_shared` - Number of shared populations

### Population Data
- `id` - Population ID
- `name` - Population name (e.g., "Customers", "Open Opportunities")
- `record_count` - Number of records in population
- `partner_visibility` - What partners can see

### Overlap Data
- `id` - Overlap ID
- `partner_id` - Partner involved
- `population_id` - Population matched
- `account_name` - Overlapping account name
- `overlap_type` - Type of overlap (customer, prospect, etc.)
- `match_confidence` - Match confidence score

### Report Data
- `id` - Report ID
- `name` - Report name
- `type` - Report type
- `created_at` - Creation date
- `results` - Report results data

## Parameters

### Overlaps List
- `partner_id` - Filter by specific partner
- `population_id` - Filter by specific population

### Accounts Search
- `domain` - Company domain to search for

## When to Use

- Identifying co-sell opportunities with channel partners
- Finding overlapping customers and prospects across partner ecosystems
- Building partner-sourced pipeline by matching accounts
- Tracking partner influence on deals
- Creating account mapping reports for partner meetings
- Prioritizing which partners to engage based on overlap data

## Rate Limits

- Rate limits vary by plan
- Standard: 100 requests/minute
- Pagination supported on list endpoints

## Relevant Skills

- revops
- sales-enablement
- referral-program
- competitor-alternatives
