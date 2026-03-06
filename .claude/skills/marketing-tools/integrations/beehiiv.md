# Beehiiv

Newsletter platform with subscriber management, post publishing, automations, and referral programs.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API v2 for publications, subscriptions, posts, segments |
| MCP | - | Not available |
| CLI | ✓ | [beehiiv.js](../clis/beehiiv.js) |
| SDK | - | No official SDK; OpenAPI spec available for codegen |

## Authentication

- **Type**: Bearer Token
- **Header**: `Authorization: Bearer {api_key}`
- **Get key**: Settings > API under Workspace Settings at https://app.beehiiv.com
- **Note**: API key is only shown once on creation; copy and store it immediately

## Common Agent Operations

### List publications

```bash
GET https://api.beehiiv.com/v2/publications
```

### Get publication details

```bash
GET https://api.beehiiv.com/v2/publications/{publicationId}
```

### List subscriptions

```bash
GET https://api.beehiiv.com/v2/publications/{publicationId}/subscriptions?limit=10&status=active

# Filter by email
GET https://api.beehiiv.com/v2/publications/{publicationId}/subscriptions?email=user@example.com
```

### Create subscription

```bash
POST https://api.beehiiv.com/v2/publications/{publicationId}/subscriptions

{
  "email": "user@example.com",
  "reactivate_existing": false,
  "send_welcome_email": true,
  "utm_source": "api",
  "tier": "free"
}
```

### Update subscription

```bash
PUT https://api.beehiiv.com/v2/publications/{publicationId}/subscriptions/{subscriptionId}

{
  "tier": "premium"
}
```

### Delete subscription

```bash
DELETE https://api.beehiiv.com/v2/publications/{publicationId}/subscriptions/{subscriptionId}
```

### List posts

```bash
GET https://api.beehiiv.com/v2/publications/{publicationId}/posts?limit=10&status=confirmed
```

### Create post (Enterprise only)

```bash
POST https://api.beehiiv.com/v2/publications/{publicationId}/posts

{
  "title": "Weekly Update",
  "subtitle": "What happened this week",
  "content": "<p>Hello subscribers...</p>",
  "status": "draft"
}
```

### List segments

```bash
GET https://api.beehiiv.com/v2/publications/{publicationId}/segments
```

### List automations

```bash
GET https://api.beehiiv.com/v2/publications/{publicationId}/automations
```

### Get referral program

```bash
GET https://api.beehiiv.com/v2/publications/{publicationId}/referral_program
```

## API Pattern

All endpoints are scoped to a publication. The publication ID is a required path parameter for most operations. Responses use cursor-based pagination with a `cursor` parameter for fetching subsequent pages.

## Key Metrics

### Subscription Fields
- `status` - validating, invalid, pending, active, inactive
- `tier` - free or premium
- `created` - Subscription creation timestamp
- `utm_source`, `utm_medium`, `utm_campaign` - Acquisition tracking
- `referral_code` - Unique referral code for subscriber

### Post Fields
- `status` - draft, confirmed (scheduled), archived
- `publish_date` - When the post was/will be published
- `stats` - Open rate, click rate, subscriber count (with expand)

## Parameters

### Common Query Parameters
- `limit` - Results per page (1-100, default 10)
- `cursor` - Cursor for next page of results
- `expand[]` - Include additional data: stats, custom_fields, referrals
- `status` - Filter by subscription/post status
- `tier` - Filter by subscription tier (free, premium)

## When to Use

- Managing newsletter subscribers programmatically
- Syncing subscribers from external signup forms or landing pages
- Building referral program integrations
- Automating post creation and publishing workflows
- Tracking subscriber growth and engagement metrics

## Rate Limits

- API rate limits apply per API key
- Use cursor-based pagination for efficient data retrieval
- Batch operations not available; iterate with individual requests

## Relevant Skills

- email-sequence
- newsletter-growth
- referral-program
- content-strategy
