# PartnerStack

Partner and affiliate program management platform for SaaS companies with deal tracking, rewards, and multi-tier partnerships.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Vendor API v2 for partnerships, deals, customers, transactions |
| MCP | - | Not available |
| CLI | ✓ | [partnerstack.js](../clis/partnerstack.js) |
| SDK | - | No official SDK; REST API with Basic Auth |

## Authentication

- **Type**: Basic Auth (Vendor API)
- **Header**: `Authorization: Basic {base64(public_key:secret_key)}`
- **Get credentials**: Vendor dashboard > Settings > Integrations > PartnerStack API Keys
- **Note**: Separate Test and Production API keys. Test transactions can only be added to customers created with Test keys.

## Common Agent Operations

### List partnerships

```bash
GET https://api.partnerstack.com/api/v2/partnerships?limit=25

Authorization: Basic {base64(public_key:secret_key)}
```

### Create a partnership

```bash
POST https://api.partnerstack.com/api/v2/partnerships

{
  "email": "partner@example.com",
  "group_key": "affiliates",
  "first_name": "Jane",
  "last_name": "Smith"
}
```

### List customers

```bash
GET https://api.partnerstack.com/api/v2/customers?limit=25
```

### Create a customer (attribute to partner)

```bash
POST https://api.partnerstack.com/api/v2/customers

{
  "email": "customer@example.com",
  "partner_key": "prtnr_abc123",
  "name": "John Doe"
}
```

### Record a transaction

```bash
POST https://api.partnerstack.com/api/v2/transactions

{
  "customer_key": "cust_abc123",
  "amount": 9900,
  "currency": "USD",
  "product_key": "pro_plan"
}
```

### List deals

```bash
GET https://api.partnerstack.com/api/v2/deals?limit=25
```

### Create a deal

```bash
POST https://api.partnerstack.com/api/v2/deals

{
  "partner_key": "prtnr_abc123",
  "name": "Enterprise Opportunity",
  "amount": 50000,
  "stage": "qualified"
}
```

### Record an action (event-based rewards)

```bash
POST https://api.partnerstack.com/api/v2/actions

{
  "customer_key": "cust_abc123",
  "key": "signup_completed",
  "value": 1
}
```

### Create a reward

```bash
POST https://api.partnerstack.com/api/v2/rewards

{
  "partner_key": "prtnr_abc123",
  "amount": 5000,
  "description": "Bonus for Q1 performance"
}
```

### List leads

```bash
GET https://api.partnerstack.com/api/v2/leads?limit=25
```

### Create a lead

```bash
POST https://api.partnerstack.com/api/v2/leads

{
  "partner_key": "prtnr_abc123",
  "email": "lead@company.com",
  "name": "Potential Customer",
  "company": "Acme Corp"
}
```

### List partner groups

```bash
GET https://api.partnerstack.com/api/v2/groups
```

### Manage webhooks

```bash
POST https://api.partnerstack.com/api/v2/webhooks

{
  "target": "https://example.com/webhooks/partnerstack",
  "events": ["deal.created", "transaction.created", "customer.created"]
}
```

## API Pattern

PartnerStack uses cursor-based pagination. List responses include `has_more` and item keys for `starting_after` / `ending_before` parameters.

All responses follow the format:
```json
{
  "data": { ... },
  "message": "...",
  "status": "2xx"
}
```

## Key Metrics

### Partnership Metrics
- `partner_key` - Unique partner identifier
- `group` - Partner tier/group
- `status` - active, pending, archived
- `created_at` - Partnership start date

### Transaction Metrics
- `amount` - Transaction value in cents
- `currency` - Currency code
- `product_key` - Associated product
- `customer_key` - Associated customer

### Deal Metrics
- `amount` - Deal value
- `stage` - Deal pipeline stage
- `status` - open, won, lost

### Reward Metrics
- `amount` - Reward amount in cents
- `status` - pending, approved, paid

## Parameters

### Pagination Parameters
- `limit` - Items per page (1-250, default: 10)
- `starting_after` - Cursor for next page (item key)
- `ending_before` - Cursor for previous page (item key)
- `order_by` - Sort field, prefix with `-` for descending

### Common Filters
- `include_archived` - Include archived records
- `has_sub_id` - Filter by sub ID presence

## When to Use

- Managing SaaS affiliate and referral programs
- Tracking partner-driven revenue and attributions
- Automating partner onboarding and rewards
- Deal registration and pipeline tracking
- Multi-tier partnership programs (affiliates, resellers, agencies)
- Event-based reward triggers (signups, upgrades, etc.)

## Rate Limits

- Not explicitly documented
- Use reasonable request rates; implement exponential backoff on 429 responses

## Relevant Skills

- referral-program
- affiliate-marketing
- partner-enablement
- saas-metrics
- launch-sequence
