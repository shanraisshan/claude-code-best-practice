# Outreach

Sales engagement platform for managing prospects, sequences, and outbound campaigns at scale.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Prospects, Sequences, Mailings, Accounts, Tasks |
| MCP | ✓ | [Claude connector](https://claude.com/connectors/outreach) |
| CLI | ✓ | [outreach.js](../clis/outreach.js) |
| SDK | - | REST API only (JSON:API format) |

## Authentication

- **Type**: OAuth2 Bearer Token
- **Header**: `Authorization: Bearer {access_token}`
- **Content-Type**: `application/vnd.api+json`
- **Get token**: Settings > API at https://app.outreach.io or via OAuth2 flow

## Common Agent Operations

### List Prospects

```bash
curl -s https://api.outreach.io/api/v2/prospects \
  -H "Authorization: Bearer $OUTREACH_ACCESS_TOKEN" \
  -H "Content-Type: application/vnd.api+json"
```

### Get a Prospect

```bash
curl -s https://api.outreach.io/api/v2/prospects/42 \
  -H "Authorization: Bearer $OUTREACH_ACCESS_TOKEN" \
  -H "Content-Type: application/vnd.api+json"
```

### Create a Prospect

```bash
curl -s -X POST https://api.outreach.io/api/v2/prospects \
  -H "Authorization: Bearer $OUTREACH_ACCESS_TOKEN" \
  -H "Content-Type: application/vnd.api+json" \
  -d '{
    "data": {
      "type": "prospect",
      "attributes": {
        "emails": ["jane@example.com"],
        "firstName": "Jane",
        "lastName": "Doe"
      }
    }
  }'
```

### List Sequences

```bash
curl -s https://api.outreach.io/api/v2/sequences \
  -H "Authorization: Bearer $OUTREACH_ACCESS_TOKEN" \
  -H "Content-Type: application/vnd.api+json"
```

### Add Prospect to Sequence

```bash
curl -s -X POST https://api.outreach.io/api/v2/sequenceStates \
  -H "Authorization: Bearer $OUTREACH_ACCESS_TOKEN" \
  -H "Content-Type: application/vnd.api+json" \
  -d '{
    "data": {
      "type": "sequenceState",
      "relationships": {
        "prospect": { "data": { "type": "prospect", "id": 42 } },
        "sequence": { "data": { "type": "sequence", "id": 7 } }
      }
    }
  }'
```

### List Mailings for a Sequence

```bash
curl -s "https://api.outreach.io/api/v2/mailings?filter[sequence][id]=7" \
  -H "Authorization: Bearer $OUTREACH_ACCESS_TOKEN" \
  -H "Content-Type: application/vnd.api+json"
```

### List Accounts

```bash
curl -s https://api.outreach.io/api/v2/accounts \
  -H "Authorization: Bearer $OUTREACH_ACCESS_TOKEN" \
  -H "Content-Type: application/vnd.api+json"
```

### List Tasks

```bash
curl -s "https://api.outreach.io/api/v2/tasks?filter[status]=incomplete" \
  -H "Authorization: Bearer $OUTREACH_ACCESS_TOKEN" \
  -H "Content-Type: application/vnd.api+json"
```

## Key Metrics

### Prospect Data
- `firstName`, `lastName` - Name
- `emails` - Email addresses
- `title` - Job title
- `company` - Company name
- `tags` - Prospect tags
- `engagedAt` - Last engagement timestamp

### Sequence Data
- `name` - Sequence name
- `enabled` - Whether sequence is active
- `sequenceType` - Type (e.g., interval, date-based)
- `stepCount` - Number of steps
- `openCount`, `clickCount`, `replyCount` - Engagement metrics

### Mailing Data
- `mailingType` - Type of mailing
- `state` - Delivery state
- `openCount`, `clickCount` - Engagement
- `deliveredAt`, `openedAt`, `clickedAt` - Timestamps

## Parameters

### Prospects
- `page[number]` - Page number (default: 1)
- `page[size]` - Results per page (default: 25, max: 1000)
- `filter[emails]` - Filter by email
- `filter[firstName]` - Filter by first name
- `filter[lastName]` - Filter by last name
- `sort` - Sort field (e.g., `createdAt`, `-updatedAt`)

### Sequences
- `filter[name]` - Filter by sequence name
- `filter[enabled]` - Filter by active status

### Mailings
- `filter[sequence][id]` - Filter by sequence ID
- `filter[prospect][id]` - Filter by prospect ID

### Tasks
- `filter[status]` - Filter by status (e.g., `incomplete`, `complete`)
- `filter[taskType]` - Filter by type (e.g., `call`, `email`, `action_item`)

## When to Use

- Managing outbound sales sequences and cadences
- Adding prospects to automated email sequences
- Tracking prospect engagement across touchpoints
- Managing sales tasks and follow-ups
- Coordinating multi-channel outreach campaigns
- Monitoring sequence performance and reply rates

## Rate Limits

- 10,000 requests per hour per user
- Burst limit: 100 requests per 10 seconds
- Rate limit headers returned: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- 429 responses when limits exceeded

## Relevant Skills

- cold-email
- revops
- sales-enablement
- email-sequence
