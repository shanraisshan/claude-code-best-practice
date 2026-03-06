# Buffer

Social media scheduling, publishing, and analytics platform for managing multiple social profiles.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API v1 for profiles, updates, scheduling |
| MCP | - | Not available |
| CLI | ✓ | [buffer.js](../clis/buffer.js) |
| SDK | - | No official SDK; legacy API still supported |

## Authentication

- **Type**: OAuth 2.0 Bearer Token
- **Header**: `Authorization: Bearer {access_token}`
- **Get key**: Register app at https://buffer.com/developers/apps then complete OAuth flow
- **Note**: Buffer is no longer accepting new developer app registrations; existing apps continue to work. New public API is in development at https://buffer.com/developer-api

## Common Agent Operations

### Get user info

```bash
GET https://api.bufferapp.com/1/user.json

Authorization: Bearer {token}
```

### List connected profiles

```bash
GET https://api.bufferapp.com/1/profiles.json

Authorization: Bearer {token}
```

### Get profile posting schedules

```bash
GET https://api.bufferapp.com/1/profiles/{profile_id}/schedules.json
```

### Create a scheduled post

```bash
POST https://api.bufferapp.com/1/updates/create.json
Content-Type: application/x-www-form-urlencoded

profile_ids[]={profile_id}&text=Your+post+content&scheduled_at=2026-03-01T10:00:00Z
```

### Get pending updates for a profile

```bash
GET https://api.bufferapp.com/1/profiles/{profile_id}/updates/pending.json?count=25
```

### Get sent updates for a profile

```bash
GET https://api.bufferapp.com/1/profiles/{profile_id}/updates/sent.json?count=25
```

### Publish a pending update immediately

```bash
POST https://api.bufferapp.com/1/updates/{update_id}/share.json
```

### Delete an update

```bash
POST https://api.bufferapp.com/1/updates/{update_id}/destroy.json
```

### Reorder queue

```bash
POST https://api.bufferapp.com/1/profiles/{profile_id}/updates/reorder.json
Content-Type: application/x-www-form-urlencoded

order[]={update_id_1}&order[]={update_id_2}&order[]={update_id_3}
```

## API Pattern

Buffer API v1 uses `.json` extensions on all endpoints. POST requests use `application/x-www-form-urlencoded` content type. Array parameters use bracket notation (e.g., `profile_ids[]`).

Responses include a `success` boolean for mutation operations.

## Key Metrics

### Profile Metrics
- `followers` - Follower count for connected profile
- `service` - Platform name (twitter, facebook, instagram, linkedin, etc.)

### Update Metrics (sent updates)
- `statistics.reach` - Post reach
- `statistics.clicks` - Link clicks
- `statistics.retweets` - Retweets/shares
- `statistics.favorites` - Likes/favorites
- `statistics.mentions` - Mentions

## Parameters

### Update Create Parameters
- `profile_ids[]` - Required. Array of profile IDs to post to
- `text` - Required. Post content
- `scheduled_at` - ISO 8601 timestamp for scheduling
- `now` - Set to `true` to publish immediately
- `top` - Set to `true` to add to top of queue
- `shorten` - Set to `true` to auto-shorten links
- `media[photo]` - URL to photo attachment
- `media[thumbnail]` - URL to thumbnail
- `media[link]` - URL for link attachment

## When to Use

- Scheduling social media posts across multiple platforms
- Managing social media content queues
- Analyzing post performance across channels
- Automating social media publishing workflows
- Coordinating team social media activity

## Rate Limits

- 60 authenticated requests per user per minute
- Exceeding returns HTTP 429
- Higher limits available by contacting hello@buffer.com

## Relevant Skills

- social-media-calendar
- content-repurposing
- social-proof
- launch-sequence
