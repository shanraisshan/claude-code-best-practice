# Segment

Customer data platform for collecting, routing, and activating user data.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Tracking API, Profile API, Config API |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | ✓ | analytics.js, iOS, Android, server libraries |

## Authentication

- **Tracking**: Write Key (per source)
- **API**: Access Token (OAuth 2.0)
- **Header**: `Authorization: Bearer {access_token}`

## Common Agent Operations

### Track event

```bash
POST https://api.segment.io/v1/track

Authorization: Basic {base64(write_key:)}

{
  "userId": "user_123",
  "event": "signup_completed",
  "properties": {
    "plan": "pro",
    "method": "email"
  }
}
```

### Identify user

```bash
POST https://api.segment.io/v1/identify

Authorization: Basic {base64(write_key:)}

{
  "userId": "user_123",
  "traits": {
    "email": "user@example.com",
    "name": "John Doe",
    "plan": "pro"
  }
}
```

### Track page view

```bash
POST https://api.segment.io/v1/page

Authorization: Basic {base64(write_key:)}

{
  "userId": "user_123",
  "name": "Pricing",
  "properties": {
    "title": "Pricing - Example",
    "url": "https://example.com/pricing"
  }
}
```

### Batch events

```bash
POST https://api.segment.io/v1/batch

Authorization: Basic {base64(write_key:)}

{
  "batch": [
    {"type": "identify", "userId": "user_1", "traits": {"plan": "free"}},
    {"type": "track", "userId": "user_1", "event": "signup"}
  ]
}
```

### Get user profile (Profile API)

```bash
GET https://profiles.segment.com/v1/spaces/{space_id}/collections/users/profiles/user_id:{user_id}/traits

Authorization: Basic {base64(access_token:)}
```

### Get user events

```bash
GET https://profiles.segment.com/v1/spaces/{space_id}/collections/users/profiles/user_id:{user_id}/events

Authorization: Basic {base64(access_token:)}
```

## JavaScript SDK

```javascript
// Initialize
analytics.load('WRITE_KEY');

// Identify user
analytics.identify('user_123', {
  email: 'user@example.com',
  plan: 'pro'
});

// Track event
analytics.track('Feature Used', {
  feature_name: 'export'
});

// Page view
analytics.page('Pricing');
```

## Key Concepts

- **Sources** - Where data comes from (website, app, server)
- **Destinations** - Where data goes (analytics, CRM, ads)
- **Tracking Plan** - Schema for events and properties
- **Protocols** - Data governance and validation
- **Personas** - Unified user profiles
- **Audiences** - Computed user segments

## Common Destinations

- Analytics: GA4, Mixpanel, Amplitude
- CRM: HubSpot, Salesforce
- Email: Customer.io, Mailchimp
- Ads: Google Ads, Meta
- Data Warehouse: BigQuery, Snowflake

## When to Use

- Centralizing event tracking
- Routing data to multiple tools
- Maintaining consistent tracking
- Building unified user profiles
- Syncing audiences across platforms

## Rate Limits

- 500 requests/second per source
- Batch up to 500KB or 32KB per event

## Relevant Skills

- analytics-tracking
- email-sequence
- paid-ads
