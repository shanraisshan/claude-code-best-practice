# Demio

Webinar platform for hosting live, automated, and on-demand webinars with built-in registration and attendee tracking.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Events, Registration, Participants, Sessions |
| MCP | - | Not available |
| CLI | ✓ | [demio.js](../clis/demio.js) |
| SDK | ✓ | PHP (official), Ruby (community) |

## Authentication

- **Type**: API Key + API Secret
- **Headers**: `Api-Key: {key}` and `Api-Secret: {secret}`
- **Get credentials**: Account Settings > API (Owner access required)
- **Docs**: https://publicdemioapi.docs.apiary.io/

## Common Agent Operations

### Ping (health check)

```bash
GET https://my.demio.com/api/v1/ping

Headers:
  Api-Key: {API_KEY}
  Api-Secret: {API_SECRET}
```

### List all events

```bash
GET https://my.demio.com/api/v1/events

Headers:
  Api-Key: {API_KEY}
  Api-Secret: {API_SECRET}
```

### List events by type

```bash
GET https://my.demio.com/api/v1/events?type=upcoming

Headers:
  Api-Key: {API_KEY}
  Api-Secret: {API_SECRET}
```

### Get a specific event

```bash
GET https://my.demio.com/api/v1/event/{event_id}

Headers:
  Api-Key: {API_KEY}
  Api-Secret: {API_SECRET}
```

### Get event date details

```bash
GET https://my.demio.com/api/v1/event/{event_id}/date/{date_id}

Headers:
  Api-Key: {API_KEY}
  Api-Secret: {API_SECRET}
```

### Register attendee for event

```bash
POST https://my.demio.com/api/v1/event/register

Headers:
  Api-Key: {API_KEY}
  Api-Secret: {API_SECRET}
  Content-Type: application/json

{
  "id": 12345,
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### Register attendee for specific date

```bash
POST https://my.demio.com/api/v1/event/register

Headers:
  Api-Key: {API_KEY}
  Api-Secret: {API_SECRET}
  Content-Type: application/json

{
  "id": 12345,
  "date_id": 67890,
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### Get participants for event date

```bash
GET https://my.demio.com/api/v1/date/{date_id}/participants

Headers:
  Api-Key: {API_KEY}
  Api-Secret: {API_SECRET}
```

## API Pattern

Demio uses a straightforward REST API:
- All requests require both `Api-Key` and `Api-Secret` headers
- Responses are JSON objects
- Registration returns a `join_link` URL for the attendee
- Events have multiple "dates" (sessions), each with a unique `date_id`

## Key Metrics

### Event Metrics
- `id` - Event ID
- `name` - Event name
- `date_id` - Session/date identifier
- `status` - Event status (upcoming, past, active)
- `type` - Event type (live, automated, on-demand)
- `registration_url` - Public registration page URL

### Participant Metrics
- `name` - Participant name
- `email` - Participant email
- `status` - Attendance status (registered, attended, missed)
- `attended_minutes` - Duration of attendance
- `join_link` - Unique join URL for the participant

## Parameters

### Event List Filters
- `type` - Filter by event type: `upcoming`, `past`, `all`

### Registration Fields
- `id` - Event ID (required)
- `name` - Registrant name (required)
- `email` - Registrant email (required)
- `date_id` - Specific session date ID (optional)
- `ref_url` - Referral URL for tracking (optional)

### Custom Fields
- Custom fields are supported via their UID (not display name)
- Check your event settings for available custom field UIDs

## When to Use

- Automating webinar registration from landing pages or forms
- Syncing webinar attendee data with CRM
- Building custom registration flows for webinars
- Tracking webinar attendance and engagement
- Triggering follow-up sequences based on attendance status
- Managing multiple webinar sessions programmatically

## Rate Limits

- **180 requests per minute** (3 per second)
- **Free Trial**: 100 API calls per day
- **Paid Plans**: 5,000 API calls per day (reset at 00:00 UTC)
- Contact Demio to request higher daily limits
- Exceeding limits returns an error response

## Relevant Skills

- webinar-marketing
- lead-generation
- event-marketing
- content-strategy
- lifecycle-marketing
