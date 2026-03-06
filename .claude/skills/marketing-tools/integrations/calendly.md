# Calendly

Scheduling and booking platform API for managing event types, scheduled events, invitees, and availability.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API v2 - event types, scheduled events, invitees, availability |
| MCP | - | Not available |
| CLI | ✓ | [calendly.js](../clis/calendly.js) |
| SDK | ✓ | No official SDK; community libraries available |

## Authentication

- **Type**: Bearer Token (Personal Access Token or OAuth 2.0)
- **Header**: `Authorization: Bearer {token}`
- **Get key**: https://calendly.com/integrations/api_webhooks (Personal Access Token)

## Common Agent Operations

### Get current user

```bash
GET https://api.calendly.com/users/me
```

### List event types

```bash
GET https://api.calendly.com/event_types?user={user_uri}
```

### List scheduled events

```bash
GET https://api.calendly.com/scheduled_events?user={user_uri}&min_start_time=2024-01-01T00:00:00Z&max_start_time=2024-12-31T23:59:59Z&status=active
```

### Get a scheduled event

```bash
GET https://api.calendly.com/scheduled_events/{event_uuid}
```

### List invitees for an event

```bash
GET https://api.calendly.com/scheduled_events/{event_uuid}/invitees
```

### Cancel a scheduled event

```bash
POST https://api.calendly.com/scheduled_events/{event_uuid}/cancellation

{
  "reason": "Cancellation reason"
}
```

### Get available times

```bash
GET https://api.calendly.com/event_type_available_times?event_type={event_type_uri}&start_time=2024-01-20T00:00:00Z&end_time=2024-01-27T00:00:00Z
```

### Get user busy times

```bash
GET https://api.calendly.com/user_busy_times?user={user_uri}&start_time=2024-01-20T00:00:00Z&end_time=2024-01-27T00:00:00Z
```

### List organization members

```bash
GET https://api.calendly.com/organization_memberships?organization={organization_uri}
```

### Create webhook subscription

```bash
POST https://api.calendly.com/webhook_subscriptions

{
  "url": "https://example.com/webhook",
  "events": ["invitee.created", "invitee.canceled"],
  "organization": "{organization_uri}",
  "scope": "organization"
}
```

### List webhook subscriptions

```bash
GET https://api.calendly.com/webhook_subscriptions?organization={organization_uri}&scope=organization
```

### Delete webhook subscription

```bash
DELETE https://api.calendly.com/webhook_subscriptions/{webhook_uuid}
```

## Key Metrics

### Scheduled Event Data
- `uri` - Unique event URI
- `name` - Event type name
- `status` - Event status (active, canceled)
- `start_time` / `end_time` - Event timing
- `event_type` - URI of the event type
- `location` - Meeting location details
- `invitees_counter` - Count of invitees (active, limit, total)

### Invitee Data
- `name` - Invitee full name
- `email` - Invitee email
- `status` - active or canceled
- `questions_and_answers` - Custom question responses
- `tracking` - UTM parameters
- `created_at` / `updated_at` - Timestamps

## Parameters

### List Scheduled Events
- `user` - User URI (required)
- `min_start_time` / `max_start_time` - Date range filter (ISO 8601)
- `status` - Filter by status (active, canceled)
- `count` - Number of results (default 20, max 100)
- `page_token` - Pagination token
- `sort` - Sort order (start_time:asc or start_time:desc)

### List Event Types
- `user` - User URI
- `organization` - Organization URI
- `active` - Filter active/inactive
- `count` - Results per page
- `sort` - Sort order

## When to Use

- Retrieving scheduled meeting data for CRM sync
- Monitoring booking activity and conversion rates
- Automating follow-up workflows after meetings
- Checking availability before suggesting meeting times
- Tracking meeting cancellations and no-shows
- Building custom booking interfaces

## Rate Limits

- Not officially documented; implement retry logic with exponential backoff
- Use conservative request rates (avoid bursting)
- Monitor for HTTP 429 responses

## Relevant Skills

- lead-generation
- sales-automation
- customer-onboarding
- appointment-scheduling
