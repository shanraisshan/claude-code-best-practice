# SavvyCal

Scheduling platform API for managing scheduling links, events, availability slots, and webhooks.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API v1 - scheduling links, events, webhooks |
| MCP | - | Not available |
| CLI | ✓ | [savvycal.js](../clis/savvycal.js) |
| SDK | - | No official SDK |

## Authentication

- **Type**: Bearer Token (Personal Access Token or OAuth 2.0)
- **Header**: `Authorization: Bearer {token}`
- **Get key**: Developer Settings in SavvyCal dashboard (create a Personal Access Token)

## Common Agent Operations

### Get current user

```bash
GET https://api.savvycal.com/v1/me
```

### List scheduling links

```bash
GET https://api.savvycal.com/v1/scheduling-links
```

### Get a scheduling link

```bash
GET https://api.savvycal.com/v1/scheduling-links/{id}
```

### Create a scheduling link

```bash
POST https://api.savvycal.com/v1/scheduling-links

{
  "name": "30 Minute Meeting",
  "slug": "30min",
  "duration_minutes": 30
}
```

### Update a scheduling link

```bash
PATCH https://api.savvycal.com/v1/scheduling-links/{id}

{
  "name": "Updated Meeting Name"
}
```

### Delete a scheduling link

```bash
DELETE https://api.savvycal.com/v1/scheduling-links/{id}
```

### Duplicate a scheduling link

```bash
POST https://api.savvycal.com/v1/scheduling-links/{id}/duplicate
```

### Toggle link state (active/disabled)

```bash
POST https://api.savvycal.com/v1/scheduling-links/{id}/toggle
```

### Get available time slots

```bash
GET https://api.savvycal.com/v1/scheduling-links/{id}/slots
```

### List events

```bash
GET https://api.savvycal.com/v1/events
```

### Get an event

```bash
GET https://api.savvycal.com/v1/events/{id}
```

### Create an event

```bash
POST https://api.savvycal.com/v1/events

{
  "scheduling_link_id": "{link_id}",
  "start_at": "2024-01-20T10:00:00Z",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Cancel an event

```bash
POST https://api.savvycal.com/v1/events/{id}/cancel
```

### List webhooks

```bash
GET https://api.savvycal.com/v1/webhooks
```

### Create a webhook

```bash
POST https://api.savvycal.com/v1/webhooks

{
  "url": "https://example.com/webhook",
  "events": ["event.created", "event.canceled"]
}
```

## Key Metrics

### Scheduling Link Data
- `id` - Unique link identifier
- `name` - Display name
- `slug` - URL slug
- `duration_minutes` - Meeting duration
- `state` - Active or disabled
- `url` - Full scheduling URL

### Event Data
- `id` - Unique event identifier
- `name` - Invitee name
- `email` - Invitee email
- `start_at` / `end_at` - Event timing
- `status` - Event status
- `scheduling_link` - Associated scheduling link

## Parameters

### List Events
- `before` / `after` - Pagination cursors
- `limit` - Results per page (default 20, max 100)

### List Scheduling Links
- `before` / `after` - Pagination cursors
- `limit` - Results per page

## When to Use

- Managing scheduling links programmatically
- Retrieving booked events for CRM or analytics sync
- Checking available time slots for custom booking UIs
- Automating scheduling link creation for campaigns
- Monitoring booking activity via webhooks

## Rate Limits

- Not officially documented
- Implement retry logic with exponential backoff
- Monitor for HTTP 429 responses

## Relevant Skills

- lead-generation
- sales-automation
- appointment-scheduling
- customer-onboarding
