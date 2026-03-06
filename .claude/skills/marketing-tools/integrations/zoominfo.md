# ZoomInfo

B2B contact database and intent data platform with 100M+ business contacts and company intelligence for sales and marketing teams.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Contact Search, Company Search, Enrichment, Intent Data, Scoops |
| MCP | ✓ | [Claude connector](https://claude.com/connectors/zoominfo) |
| CLI | ✓ | [zoominfo.js](../clis/zoominfo.js) |
| SDK | - | REST API only |

## Authentication

- **Type**: JWT Token (Bearer)
- **Flow**: POST `/authenticate` with username + password, receive JWT token
- **Header**: `Authorization: Bearer {jwt_token}`
- **Env vars**: `ZOOMINFO_USERNAME` + `ZOOMINFO_PRIVATE_KEY` or `ZOOMINFO_ACCESS_TOKEN`
- **Get credentials**: Contact ZoomInfo sales or admin portal at https://app.zoominfo.com

## Common Agent Operations

### Authenticate

```bash
POST https://api.zoominfo.com/authenticate

{
  "username": "user@company.com",
  "password": "private-key-here"
}
```

### Contact Search

```bash
POST https://api.zoominfo.com/search/contact

{
  "jobTitle": ["VP Marketing"],
  "companyName": ["Acme Corp"],
  "managementLevel": ["VP"],
  "rpp": 25,
  "page": 1
}
```

### Contact Enrichment

```bash
POST https://api.zoominfo.com/enrich/contact

{
  "matchEmail": ["jane@acme.com"]
}
```

### Company Search

```bash
POST https://api.zoominfo.com/search/company

{
  "companyName": ["Acme"],
  "industry": ["Software"],
  "employeeCountMin": 50,
  "revenueMin": 10000000,
  "rpp": 25,
  "page": 1
}
```

### Company Enrichment

```bash
POST https://api.zoominfo.com/enrich/company

{
  "matchCompanyWebsite": ["acme.com"]
}
```

### Intent Data Lookup

```bash
POST https://api.zoominfo.com/lookup/intent

{
  "topicId": ["marketing-automation"],
  "companyId": ["123456"]
}
```

### Scoops Lookup

```bash
POST https://api.zoominfo.com/lookup/scoops

{
  "companyId": ["123456"],
  "rpp": 25,
  "page": 1
}
```

## Key Metrics

### Contact Data
- `firstName`, `lastName` - Name
- `jobTitle` - Job title
- `email` - Verified email
- `phone` - Direct phone
- `linkedinUrl` - LinkedIn profile
- `companyName` - Company name
- `managementLevel` - Seniority level
- `department` - Department

### Company Data
- `companyName` - Company name
- `website` - Website URL
- `employeeCount` - Employee count
- `industry` - Industry
- `revenue` - Annual revenue
- `techStack` - Technologies used
- `fundingAmount` - Total funding
- `companyCity`, `companyState`, `companyCountry` - Location

### Intent Data
- `topicName` - Intent topic
- `signalScore` - Signal strength
- `audienceStrength` - Audience engagement level
- `firstSeenDate`, `lastSeenDate` - Signal timeframe

## Parameters

### Contact Search
- `jobTitle` - Array of job titles
- `companyName` - Array of company names
- `managementLevel` - Array: C-Level, VP, Director, Manager, Staff
- `department` - Array: Marketing, Sales, Engineering, Finance, etc.
- `personLocationCity` - Array of cities
- `personLocationState` - Array of states
- `personLocationCountry` - Array of countries
- `rpp` - Results per page (default: 25, max: 100)
- `page` - Page number (default: 1)

### Contact Enrichment
- `matchEmail` - Array of email addresses
- `personId` - Array of ZoomInfo person IDs
- `matchFirstName` + `matchLastName` + `matchCompanyName` - Alternative lookup

### Company Search
- `companyName` - Array of company names
- `industry` - Array of industries
- `employeeCountMin` / `employeeCountMax` - Employee count range
- `revenueMin` / `revenueMax` - Revenue range
- `companyLocationCity` - Array of cities
- `rpp` - Results per page
- `page` - Page number

### Company Enrichment
- `matchCompanyWebsite` - Array of domains
- `companyId` - Array of ZoomInfo company IDs

### Intent Data
- `topicId` - Array of intent topic IDs
- `companyId` - Array of company IDs

## When to Use

- Identifying in-market accounts with intent signals
- Building targeted contact lists by role, seniority, and company
- Enriching leads with verified contact data and firmographics
- Finding decision-makers at target accounts for ABM
- Tracking company news and leadership changes via scoops
- Prioritizing outreach based on buyer intent signals

## Rate Limits

- Rate limits vary by plan and endpoint
- Standard: ~200 requests/minute
- Bulk endpoints: batched requests recommended
- Authentication tokens expire after ~12 hours

## Relevant Skills

- cold-email
- revops
- sales-enablement
- competitor-alternatives
