# Apollo.io

B2B prospecting and data enrichment platform with 210M+ contacts and 35M+ companies for sales intelligence.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | People Search, Company Search, Enrichment, Sequences |
| MCP | - | Not available |
| CLI | ✓ | [apollo.js](../clis/apollo.js) |
| SDK | - | REST API only |

## Authentication

- **Type**: API Key
- **Header**: `x-api-key: {api_key}` or `Authorization: Bearer {token}`
- **Get key**: Settings > Integrations > API at https://app.apollo.io

## Common Agent Operations

### People Search

```bash
POST https://api.apollo.io/api/v1/mixed_people/api_search

{
  "person_titles": ["Sales Manager"],
  "person_locations": ["United States"],
  "organization_num_employees_ranges": ["1,100"],
  "page": 1
}
```

### Person Enrichment

```bash
POST https://api.apollo.io/api/v1/people/match

{
  "first_name": "Tim",
  "last_name": "Zheng",
  "domain": "apollo.io"
}
```

### Bulk People Enrichment

```bash
POST https://api.apollo.io/api/v1/people/bulk_match

{
  "details": [
    { "email": "tim@apollo.io" },
    { "first_name": "Jane", "last_name": "Doe", "domain": "example.com" }
  ]
}
```

### Organization Search

```bash
POST https://api.apollo.io/api/v1/mixed_companies/search

{
  "organization_locations": ["United States"],
  "organization_num_employees_ranges": ["1,100"],
  "page": 1
}
```

### Organization Enrichment

```bash
POST https://api.apollo.io/api/v1/organizations/enrich

{
  "domain": "apollo.io"
}
```

## Key Metrics

### Person Data
- `first_name`, `last_name` - Name
- `title` - Job title
- `email` - Verified email
- `linkedin_url` - LinkedIn profile
- `organization` - Company details
- `seniority` - Seniority level
- `departments` - Department list

### Organization Data
- `name` - Company name
- `website_url` - Website
- `estimated_num_employees` - Employee count
- `industry` - Industry
- `annual_revenue` - Revenue
- `technologies` - Tech stack
- `funding_total` - Total funding

## Parameters

### People Search
- `person_titles` - Array of job titles
- `person_locations` - Array of locations
- `person_seniorities` - Array: owner, founder, c_suite, partner, vp, head, director, manager, senior, entry
- `organization_num_employees_ranges` - Array of ranges (e.g., "1,100")
- `organization_ids` - Filter by Apollo org IDs
- `page` - Page number (default: 1)
- `per_page` - Results per page (default: 25, max: 100)

### Person Enrichment
- `email` - Email address
- `first_name` + `last_name` + `domain` - Alternative lookup
- `linkedin_url` - LinkedIn URL
- `reveal_personal_emails` - Include personal emails
- `reveal_phone_number` - Include phone numbers

### Organization Search
- `organization_locations` - Array of locations
- `organization_num_employees_ranges` - Employee count ranges
- `organization_ids` - Specific org IDs
- `page` - Page number

## When to Use

- Building targeted prospect lists by role, seniority, and company size
- Enriching leads with verified contact info
- Finding decision-makers at target accounts
- Company research and firmographic analysis
- ABM campaign targeting
- Sales intelligence and outbound prospecting

## Rate Limits

- Rate limits vary by plan
- Standard: 100 requests/minute for most endpoints
- Bulk enrichment: up to 10 people per request
- Search: max 50,000 records (100 per page, 500 pages)

## Relevant Skills

- abm-strategy
- lead-enrichment
- lead-scoring
- cold-email
- competitor-alternatives
