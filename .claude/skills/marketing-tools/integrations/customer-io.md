# Customer.io

Behavior-based messaging platform for email, push, SMS, and in-app.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Track API, App API, Journeys API |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | ✓ | JavaScript, iOS, Android, Ruby, Python |

## Authentication

- **Track API**: Site ID + API Key (Basic auth)
- **App API**: Bearer token
- **Header**: `Authorization: Basic {base64(site_id:api_key)}`

## Common Agent Operations

### Identify customer

```bash
PUT https://track.customer.io/api/v1/customers/{customer_id}

Authorization: Basic {base64(site_id:api_key)}

{
  "email": "user@example.com",
  "created_at": 1705312800,
  "first_name": "John",
  "plan": "pro"
}
```

### Track event

```bash
POST https://track.customer.io/api/v1/customers/{customer_id}/events

Authorization: Basic {base64(site_id:api_key)}

{
  "name": "purchase",
  "data": {
    "product": "Pro Plan",
    "amount": 99
  }
}
```

### Track anonymous event

```bash
POST https://track.customer.io/api/v1/events

Authorization: Basic {base64(site_id:api_key)}

{
  "name": "page_viewed",
  "data": {
    "page": "/pricing"
  },
  "anonymous_id": "anon_123"
}
```

### Delete customer

```bash
DELETE https://track.customer.io/api/v1/customers/{customer_id}

Authorization: Basic {base64(site_id:api_key)}
```

### Get customer (App API)

```bash
GET https://api.customer.io/v1/customers/{customer_id}/attributes

Authorization: Bearer {app_api_key}
```

### List campaigns

```bash
GET https://api.customer.io/v1/campaigns

Authorization: Bearer {app_api_key}
```

### Get campaign metrics

```bash
GET https://api.customer.io/v1/campaigns/{campaign_id}/metrics

Authorization: Bearer {app_api_key}
```

### Trigger broadcast

```bash
POST https://api.customer.io/v1/campaigns/{campaign_id}/triggers

Authorization: Bearer {app_api_key}

{
  "emails": ["user@example.com"],
  "data": {
    "coupon_code": "SAVE20"
  }
}
```

### Send transactional email

```bash
POST https://api.customer.io/v1/send/email

Authorization: Bearer {app_api_key}

{
  "transactional_message_id": "1",
  "to": "user@example.com",
  "identifiers": {
    "id": "user_123"
  },
  "message_data": {
    "order_id": "ORD-456"
  }
}
```

## JavaScript SDK

```javascript
// Initialize
_cio.identify({
  id: 'user_123',
  email: 'user@example.com',
  created_at: 1705312800,
  plan: 'pro'
});

// Track event
_cio.track('purchase', {
  product: 'Pro Plan',
  amount: 99
});

// Track page view
_cio.page();
```

## Key Concepts

- **People** - Customers and leads
- **Segments** - Dynamic groups based on attributes/behavior
- **Campaigns** - Automated message sequences
- **Broadcasts** - One-time sends
- **Transactional** - Triggered messages

## Attribute Types

- Standard: `email`, `created_at`, `unsubscribed`
- Custom: Any key you define
- Computed: Aggregations from events

## When to Use

- Behavior-based email automation
- Multi-channel messaging (email, push, SMS)
- Onboarding sequences
- Re-engagement campaigns
- Transactional messages

## Rate Limits

- Track API: 100 requests/second
- App API: 10 requests/second

## Relevant Skills

- email-sequence
- onboarding-cro
- analytics-tracking
