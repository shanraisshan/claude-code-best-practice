# Livestorm

Video engagement platform for webinars, virtual events, and online meetings with built-in analytics and integrations.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Events, Sessions, People, Recordings, Webhooks |
| MCP | - | Not available |
| CLI | ✓ | [livestorm.js](../clis/livestorm.js) |
| SDK | - | REST API with JSON:API format |

## Authentication

- **Type**: API Token
- **Header**: `Authorization: {API_TOKEN}` (no prefix)
- **Content-Type**: `application/vnd.api+json` (JSON:API)
- **Scopes**: Identity, Events, Admin, Webhooks
- **Get token**: Account Settings > Integrations > Public API
- **Docs**: https://developers.livestorm.co/

## Common Agent Operations

### Ping (test authentication)

```bash
GET https://api.livestorm.co/v1/ping

Headers:
  Authorization: {API_TOKEN}
  Accept: application/vnd.api+json
```

### List events

```bash
GET https://api.livestorm.co/v1/events?page[number]=1&page[size]=25

Headers:
  Authorization: {API_TOKEN}
  Accept: application/vnd.api+json
```

### Create an event

```bash
POST https://api.livestorm.co/v1/events

Headers:
  Authorization: {API_TOKEN}
  Content-Type: application/vnd.api+json

{
  "data": {
    "type": "events",
    "attributes": {
      "title": "Product Demo Webinar",
      "slug": "product-demo-webinar",
      "estimated_duration": 60
    }
  }
}
```

### Get event details

```bash
GET https://api.livestorm.co/v1/events/{event_id}

Headers:
  Authorization: {API_TOKEN}
  Accept: application/vnd.api+json
```

### Update an event

```bash
PATCH https://api.livestorm.co/v1/events/{event_id}

Headers:
  Authorization: {API_TOKEN}
  Content-Type: application/vnd.api+json

{
  "data": {
    "type": "events",
    "id": "{event_id}",
    "attributes": {
      "title": "Updated Webinar Title"
    }
  }
}
```

### List sessions

```bash
GET https://api.livestorm.co/v1/sessions?page[number]=1&page[size]=25

Headers:
  Authorization: {API_TOKEN}
  Accept: application/vnd.api+json
```

### Create a session for an event

```bash
POST https://api.livestorm.co/v1/events/{event_id}/sessions

Headers:
  Authorization: {API_TOKEN}
  Content-Type: application/vnd.api+json

{
  "data": {
    "type": "sessions",
    "attributes": {
      "estimated_started_at": "2025-06-15T14:00:00.000Z",
      "timezone": "America/New_York"
    }
  }
}
```

### Register someone for a session

```bash
POST https://api.livestorm.co/v1/sessions/{session_id}/people

Headers:
  Authorization: {API_TOKEN}
  Content-Type: application/vnd.api+json

{
  "data": {
    "type": "people",
    "attributes": {
      "fields": {
        "email": "attendee@example.com",
        "first_name": "Jane",
        "last_name": "Doe"
      }
    }
  }
}
```

### List session participants

```bash
GET https://api.livestorm.co/v1/sessions/{session_id}/people?page[number]=1&page[size]=25

Headers:
  Authorization: {API_TOKEN}
  Accept: application/vnd.api+json
```

### Remove a registrant from session

```bash
DELETE https://api.livestorm.co/v1/sessions/{session_id}/people?filter[email]=attendee@example.com

Headers:
  Authorization: {API_TOKEN}
```

### List session chat messages

```bash
GET https://api.livestorm.co/v1/sessions/{session_id}/chat-messages

Headers:
  Authorization: {API_TOKEN}
  Accept: application/vnd.api+json
```

### List session questions

```bash
GET https://api.livestorm.co/v1/sessions/{session_id}/questions

Headers:
  Authorization: {API_TOKEN}
  Accept: application/vnd.api+json
```

### Get session recordings

```bash
GET https://api.livestorm.co/v1/sessions/{session_id}/recordings

Headers:
  Authorization: {API_TOKEN}
  Accept: application/vnd.api+json
```

### List all people

```bash
GET https://api.livestorm.co/v1/people?page[number]=1&page[size]=25

Headers:
  Authorization: {API_TOKEN}
  Accept: application/vnd.api+json
```

### Create a webhook

```bash
POST https://api.livestorm.co/v1/webhooks

Headers:
  Authorization: {API_TOKEN}
  Content-Type: application/vnd.api+json

{
  "data": {
    "type": "webhooks",
    "attributes": {
      "target_url": "https://example.com/webhook",
      "event_name": "attendance"
    }
  }
}
```

## API Pattern

Livestorm follows the JSON:API specification:
- All responses use `data`, `attributes`, `relationships` structure
- Pagination: `page[number]` and `page[size]` query parameters
- Filtering: `filter[field]=value` query parameters
- Events contain multiple Sessions; Sessions contain People
- ISO 8601 timestamps throughout

## Key Metrics

### Event Metrics
- `title` - Event title
- `slug` - URL-friendly identifier
- `estimated_duration` - Duration in minutes
- `registration_page_enabled` - Registration page status
- `everyone_can_speak` - Whether all attendees can speak

### Session Metrics
- `status` - Session status (upcoming, live, past)
- `estimated_started_at` - Scheduled start time
- `started_at` - Actual start time
- `ended_at` - Actual end time
- `timezone` - Session timezone
- `attendees_count` - Number of attendees
- `registrants_count` - Number of registrants

### People Metrics
- `email` - Contact email
- `first_name` / `last_name` - Contact name
- `registrant_detail` - Registration metadata
- `attendance_rate` - Attendance percentage
- `attended_at` - Join timestamp
- `left_at` - Leave timestamp

## Parameters

### Pagination
- `page[number]` - Page number (default: 1)
- `page[size]` - Items per page (default: 25)

### Event Attributes
- `title` - Event title (required for create)
- `slug` - URL slug
- `description` - Event description
- `estimated_duration` - Duration in minutes

### Session Attributes
- `estimated_started_at` - ISO 8601 start time
- `timezone` - IANA timezone string

### Registration Fields
- `email` - Registrant email (required)
- `first_name` - First name
- `last_name` - Last name

### Webhook Events
- `attendance` - Triggered on session attendance
- `registration` - Triggered on new registration
- `unregistration` - Triggered on unregistration

## When to Use

- Hosting product demos and marketing webinars
- Automated webinar registration and attendee management
- Tracking webinar engagement and attendance rates
- Retrieving session recordings for content repurposing
- Building custom registration pages with API-driven registration
- Syncing webinar data with CRM and marketing automation
- Monitoring session Q&A and chat for follow-up

## Rate Limits

- **10,000 API calls per 30-day period** (organization-wide)
- Rate limits shared across all API tokens in the organization
- Plan accordingly for high-volume operations
- Use webhooks instead of polling to conserve quota

## Relevant Skills

- webinar-marketing
- event-marketing
- lead-generation
- content-strategy
- lifecycle-marketing
- customer-engagement
