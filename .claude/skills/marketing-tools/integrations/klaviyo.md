# Klaviyo

E-commerce email and SMS marketing platform with profiles, flows, campaigns, segments, and event tracking.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API with JSON:API spec, revision-versioned |
| MCP | - | Not available |
| CLI | ✓ | [klaviyo.js](../clis/klaviyo.js) |
| SDK | ✓ | Python, Node.js, Ruby, PHP, Java, C# |

## Authentication

- **Type**: Private API Key
- **Header**: `Authorization: Klaviyo-API-Key {private_api_key}`
- **Revision Header**: `revision: 2024-10-15` (required on all requests)
- **Get key**: Account Settings > API Keys at https://www.klaviyo.com/settings/account/api-keys
- **Note**: Private keys are prefixed with `pk_`; public keys (6-char site ID) are for client-side only

## Common Agent Operations

### List profiles

```bash
GET https://a.klaviyo.com/api/profiles/?page[size]=20

# Filter by email
GET https://a.klaviyo.com/api/profiles/?filter=equals(email,"user@example.com")
```

### Create profile

```bash
POST https://a.klaviyo.com/api/profiles/

{
  "data": {
    "type": "profile",
    "attributes": {
      "email": "user@example.com",
      "first_name": "Jane",
      "last_name": "Doe",
      "phone_number": "+15551234567"
    }
  }
}
```

### Update profile

```bash
PATCH https://a.klaviyo.com/api/profiles/{profileId}/

{
  "data": {
    "type": "profile",
    "id": "{profileId}",
    "attributes": {
      "first_name": "Updated Name"
    }
  }
}
```

### List all lists

```bash
GET https://a.klaviyo.com/api/lists/
```

### Create list

```bash
POST https://a.klaviyo.com/api/lists/

{
  "data": {
    "type": "list",
    "attributes": {
      "name": "Newsletter Subscribers"
    }
  }
}
```

### Add profiles to list

```bash
POST https://a.klaviyo.com/api/lists/{listId}/relationships/profiles/

{
  "data": [
    { "type": "profile", "id": "{profileId1}" },
    { "type": "profile", "id": "{profileId2}" }
  ]
}
```

### Track event

```bash
POST https://a.klaviyo.com/api/events/

{
  "data": {
    "type": "event",
    "attributes": {
      "metric": {
        "data": {
          "type": "metric",
          "attributes": { "name": "Placed Order" }
        }
      },
      "profile": {
        "data": {
          "type": "profile",
          "attributes": { "email": "user@example.com" }
        }
      },
      "properties": {
        "value": 99.99,
        "items": ["Product A"]
      },
      "time": "2025-01-15T10:00:00Z"
    }
  }
}
```

### List campaigns

```bash
GET https://a.klaviyo.com/api/campaigns/?filter=equals(messages.channel,"email")
```

### List flows

```bash
GET https://a.klaviyo.com/api/flows/
```

### Update flow status

```bash
PATCH https://a.klaviyo.com/api/flows/{flowId}/

{
  "data": {
    "type": "flow",
    "id": "{flowId}",
    "attributes": {
      "status": "live"
    }
  }
}
```

### List metrics

```bash
GET https://a.klaviyo.com/api/metrics/
```

### List segments

```bash
GET https://a.klaviyo.com/api/segments/
```

## API Pattern

Klaviyo uses the JSON:API specification. All request/response bodies use `{ "data": { "type": "...", "attributes": {...} } }` format. Relationships are managed via `/relationships/` sub-endpoints. The `revision` header is required on every request and determines API behavior version.

## Key Metrics

### Profile Fields
- `email` - Email address
- `phone_number` - Phone for SMS
- `first_name`, `last_name` - Name fields
- `properties` - Custom properties object
- `subscriptions` - Email/SMS subscription status

### Event Fields
- `metric` - The metric/event name
- `properties` - Custom event properties
- `time` - Event timestamp
- `value` - Monetary value (for revenue tracking)

### Campaign/Flow Metrics
- `send_count` - Number of sends
- `open_rate` - Open percentage
- `click_rate` - Click percentage
- `revenue` - Attributed revenue

## Parameters

### Common Query Parameters
- `page[size]` - Results per page (default 20, max 100)
- `page[cursor]` - Cursor for pagination
- `filter` - Filter expressions (e.g., `equals(email,"user@example.com")`)
- `sort` - Sort field (prefix `-` for descending)
- `include` - Include related resources
- `fields[resource]` - Sparse fieldsets

## When to Use

- E-commerce email/SMS marketing automation
- Syncing customer profiles from external systems
- Tracking purchase events and customer behavior
- Managing email flows and drip campaigns
- Segmenting audiences for targeted campaigns
- Reporting on campaign and flow performance

## Rate Limits

- Steady-state: 75 requests/second for most endpoints
- Burst: up to 700 requests in 1 minute
- Rate limit headers: `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`
- Lower limits on some write endpoints (profiles, events)

## Relevant Skills

- email-sequence
- ecommerce-email
- lifecycle-marketing
- customer-segmentation
