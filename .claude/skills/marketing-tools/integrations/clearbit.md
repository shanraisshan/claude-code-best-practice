# Clearbit (HubSpot Breeze Intelligence)

Company and person data enrichment API for converting leads with 100+ firmographic and technographic attributes.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Person, Company, Combined Enrichment, Reveal, Name to Domain, Prospector |
| MCP | - | Not available |
| CLI | ✓ | [clearbit.js](../clis/clearbit.js) |
| SDK | ✓ | Node, Ruby, Python, PHP |

## Authentication

- **Type**: Bearer Token (or Basic Auth with API key as username)
- **Header**: `Authorization: Bearer {api_key}`
- **Get key**: https://dashboard.clearbit.com/api

## Common Agent Operations

### Person Enrichment (by email)

```bash
GET https://person.clearbit.com/v2/people/find?email=alex@clearbit.com
```

Returns 100+ attributes: name, title, company, location, social profiles, employment history.

### Company Enrichment (by domain)

```bash
GET https://company.clearbit.com/v2/companies/find?domain=clearbit.com
```

Returns firmographics: industry, size, revenue, tech stack, location, funding.

### Combined Enrichment (person + company)

```bash
GET https://person.clearbit.com/v2/combined/find?email=alex@clearbit.com
```

Returns both person and company data in a single request.

### Reveal (IP to company)

```bash
GET https://reveal.clearbit.com/v1/companies/find?ip=104.132.0.0
```

Identifies the company behind a website visitor by IP address.

### Name to Domain

```bash
GET https://company.clearbit.com/v1/domains/find?name=Clearbit
```

Converts a company name to its domain.

### Prospector (find employees)

```bash
GET https://prospector.clearbit.com/v1/people/search?domain=clearbit.com&role=sales&seniority=executive
```

Finds employees at a company filtered by role, seniority, title.

## API Pattern

Clearbit uses separate subdomains per API:
- `person.clearbit.com` - Person data
- `company.clearbit.com` - Company data, Name to Domain
- `person-stream.clearbit.com` - Streaming person lookup (blocking, up to 60s)
- `company-stream.clearbit.com` - Streaming company lookup (blocking, up to 60s)
- `reveal.clearbit.com` - IP to company
- `prospector.clearbit.com` - Employee search

Standard endpoints return `202 Accepted` if data is being processed (use webhooks). Stream endpoints block until data is ready.

## Key Metrics

### Person Attributes
- `name.fullName` - Full name
- `title` - Job title
- `role` - Job role (sales, engineering, etc.)
- `seniority` - Seniority level
- `employment.name` - Company name
- `linkedin.handle` - LinkedIn profile

### Company Attributes
- `name` - Company name
- `domain` - Website domain
- `category.industry` - Industry
- `metrics.employees` - Employee count
- `metrics.estimatedAnnualRevenue` - Revenue range
- `tech` - Technology stack array
- `metrics.raised` - Total funding raised

## Parameters

### Person Enrichment
- `email` (required) - Email address to look up
- `webhook_url` - URL for async results
- `subscribe` - Subscribe to future changes

### Company Enrichment
- `domain` (required) - Company domain to look up
- `webhook_url` - URL for async results

### Prospector
- `domain` (required) - Company domain
- `role` - Job role filter (sales, engineering, marketing, etc.)
- `seniority` - Seniority filter (executive, director, manager, etc.)
- `title` - Exact title filter
- `page` - Page number (default: 1)
- `page_size` - Results per page (default: 5, max: 20)

## When to Use

- Lead scoring and qualification based on firmographic data
- Enriching CRM contacts with company and person data
- De-anonymizing website visitors with Reveal
- Building prospect lists with Prospector
- Personalizing marketing based on company attributes
- Routing leads based on company size, industry, or tech stack

## Rate Limits

- Enrichment: 600 requests/minute
- Prospector: 100 requests/minute
- Reveal: 600 requests/minute
- Responses include `X-RateLimit-Limit` and `X-RateLimit-Remaining` headers

## Relevant Skills

- lead-scoring
- personalization
- abm-strategy
- lead-enrichment
- competitor-alternatives
