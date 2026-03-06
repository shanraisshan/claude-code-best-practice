# OneSignal

Push notification, email, SMS, and in-app messaging platform for customer engagement at scale.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Notifications, Users, Segments, Templates, Apps |
| MCP | - | Not available |
| CLI | ✓ | [onesignal.js](../clis/onesignal.js) |
| SDK | ✓ | JavaScript, Node.js, Python, Java, PHP, Ruby, Go, .NET |

## Authentication

- **Type**: REST API Key (Basic Auth)
- **Header**: `Authorization: Basic {REST_API_KEY}`
- **App ID**: Required as `app_id` in request bodies
- **Get credentials**: Dashboard > Settings > Keys & IDs
- **Security**: HTTPS required, TLS 1.2+ on port 443

## Common Agent Operations

### Send push notification to segment

```bash
POST https://api.onesignal.com/api/v1/notifications

Headers:
  Authorization: Basic {REST_API_KEY}
  Content-Type: application/json

{
  "app_id": "YOUR_APP_ID",
  "included_segments": ["Subscribed Users"],
  "headings": { "en": "New Feature!" },
  "contents": { "en": "Check out our latest update." },
  "url": "https://example.com/feature"
}
```

### Send notification to specific users

```bash
POST https://api.onesignal.com/api/v1/notifications

Headers:
  Authorization: Basic {REST_API_KEY}
  Content-Type: application/json

{
  "app_id": "YOUR_APP_ID",
  "include_aliases": { "external_id": ["user-123", "user-456"] },
  "target_channel": "push",
  "contents": { "en": "You have a new message." }
}
```

### Schedule a notification

```bash
POST https://api.onesignal.com/api/v1/notifications

Headers:
  Authorization: Basic {REST_API_KEY}
  Content-Type: application/json

{
  "app_id": "YOUR_APP_ID",
  "included_segments": ["Subscribed Users"],
  "contents": { "en": "Scheduled notification" },
  "send_after": "2025-12-01 12:00:00 GMT-0500"
}
```

### List notifications

```bash
GET https://api.onesignal.com/api/v1/notifications?app_id={APP_ID}&limit=50&offset=0

Headers:
  Authorization: Basic {REST_API_KEY}
```

### View a notification

```bash
GET https://api.onesignal.com/api/v1/notifications/{notification_id}?app_id={APP_ID}

Headers:
  Authorization: Basic {REST_API_KEY}
```

### Cancel a scheduled notification

```bash
DELETE https://api.onesignal.com/api/v1/notifications/{notification_id}?app_id={APP_ID}

Headers:
  Authorization: Basic {REST_API_KEY}
```

### List segments

```bash
GET https://api.onesignal.com/api/v1/apps/{APP_ID}/segments

Headers:
  Authorization: Basic {REST_API_KEY}
```

### Create a segment

```bash
POST https://api.onesignal.com/api/v1/apps/{APP_ID}/segments

Headers:
  Authorization: Basic {REST_API_KEY}
  Content-Type: application/json

{
  "name": "Active Users",
  "filters": [
    { "field": "session_count", "relation": ">", "value": "5" }
  ]
}
```

### Get user by external ID

```bash
GET https://api.onesignal.com/api/v1/apps/{APP_ID}/users/by/external_id/{external_id}

Headers:
  Authorization: Basic {REST_API_KEY}
```

### Create a user

```bash
POST https://api.onesignal.com/api/v1/apps/{APP_ID}/users

Headers:
  Authorization: Basic {REST_API_KEY}
  Content-Type: application/json

{
  "identity": { "external_id": "user-789" },
  "subscriptions": [
    { "type": "Email", "token": "user@example.com" }
  ],
  "tags": { "plan": "pro", "signup_source": "organic" }
}
```

### List templates

```bash
GET https://api.onesignal.com/api/v1/templates?app_id={APP_ID}

Headers:
  Authorization: Basic {REST_API_KEY}
```

## Key Metrics

### Notification Metrics
- `successful` - Number of successful deliveries
- `failed` - Number of failed deliveries
- `converted` - Users who clicked/converted
- `remaining` - Notifications still queued
- `errored` - Count of errors
- `opened` - Notification open count

### User Metrics
- `session_count` - Total user sessions
- `last_active` - Last activity timestamp
- `tags` - Custom key-value metadata
- `subscriptions` - Active subscription channels

## Parameters

### Notification Parameters
- `app_id` - Application ID (required)
- `included_segments` - Target segments array
- `excluded_segments` - Excluded segments array
- `include_aliases` - Target specific users by alias
- `target_channel` - Channel: `push`, `email`, `sms`
- `contents` - Message content by language code
- `headings` - Notification title by language code
- `url` - Launch URL on click
- `data` - Custom key-value data payload
- `send_after` - Scheduled send time (UTC string)
- `ttl` - Time to live in seconds

### Segment Filter Fields
- `session_count` - Number of sessions
- `first_session` - First session date
- `last_session` - Last session date
- `tag` - Custom tag value
- `language` - User language
- `app_version` - App version
- `country` - User country code

## When to Use

- Sending push notifications for product updates
- Triggered notifications based on user behavior
- Multi-channel messaging (push + email + SMS)
- Re-engagement campaigns for inactive users
- Segmenting users for targeted messaging
- A/B testing notification content
- Scheduling promotional campaigns

## Rate Limits

- **Free Plan**: 150 notification requests/second per app
- **Paid Plan**: 6,000 notification requests/second per app
- **User/Subscription ops**: 1,000 requests/second per app
- **Burst limit**: No more than 10x total subscribers in 15 minutes
- **429 response**: Includes `RetryAfter` header with seconds to wait

## Relevant Skills

- push-notifications
- customer-engagement
- retention-campaign
- re-engagement
- lifecycle-marketing
