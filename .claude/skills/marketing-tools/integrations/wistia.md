# Wistia

Video hosting, management, and analytics platform built for marketers with detailed engagement tracking.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Data API (v1/modern), Stats API, Upload API |
| MCP | - | Not available |
| CLI | ✓ | [wistia.js](../clis/wistia.js) |
| SDK | ✓ | Ruby (official), community wrappers for other languages |

## Authentication

- **Type**: Bearer Token
- **Header**: `Authorization: Bearer {api_token}`
- **Get key**: Account Settings > API tab at https://account.wistia.com/account/api
- **Note**: Only Account Owners can create/manage tokens. Tokens can only be copied when first created.

## Common Agent Operations

### List all projects

```bash
GET https://api.wistia.com/v1/projects.json?page=1&per_page=25
```

### Create a project

```bash
POST https://api.wistia.com/v1/projects.json

{
  "name": "Marketing Videos Q1"
}
```

### List all media

```bash
GET https://api.wistia.com/v1/medias.json?page=1&per_page=25
```

### Get media details

```bash
GET https://api.wistia.com/v1/medias/{media_hashed_id}.json
```

### Get media stats

```bash
GET https://api.wistia.com/v1/medias/{media_hashed_id}/stats.json
```

### Get account-wide stats

```bash
GET https://api.wistia.com/v1/stats/account.json
```

### Get media engagement data (heatmap)

```bash
GET https://api.wistia.com/v1/stats/medias/{media_id}/engagement.json
```

### Get media stats by date

```bash
GET https://api.wistia.com/v1/stats/medias/{media_id}/by_date.json?start_date=2026-01-01&end_date=2026-01-31
```

### List visitors

```bash
GET https://api.wistia.com/v1/stats/visitors.json?page=1&per_page=25
```

### List viewing events

```bash
GET https://api.wistia.com/v1/stats/events.json?media_id={media_id}
```

### Update media metadata

```bash
PUT https://api.wistia.com/v1/medias/{media_hashed_id}.json

{
  "name": "Updated Video Title",
  "description": "New description"
}
```

### List captions for a video

```bash
GET https://api.wistia.com/v1/medias/{media_hashed_id}/captions.json
```

## API Versions

Wistia has two API versions:
- **v1** (`/v1/`) - Legacy, perpetually supported, no breaking changes
- **modern** (`/modern/`) - Current version, date-based versioning via `X-Wistia-Api-Version` header

The CLI uses v1 for maximum stability.

## Key Metrics

### Media Stats
- `plays` - Total video plays
- `visitors` - Unique visitors
- `pageLoads` - Page load count
- `averagePercentWatched` - Average watch percentage
- `percentOfVisitorsClickingPlay` - Play click rate

### Engagement Data
- Heatmap data showing exactly where viewers watch, rewatch, and drop off
- Per-second engagement breakdown

### Account Stats
- `total_medias` - Total video count
- `total_plays` - Account-wide plays
- `total_hours_watched` - Total hours of video watched

## Parameters

### Media List Parameters
- `page` - Page number (default: 1)
- `per_page` - Results per page (default: 25, max: 100)
- `project_id` - Filter by project
- `name` - Filter by name
- `type` - Filter by type (Video, Audio, Image, etc.)

### Stats Date Parameters
- `start_date` - Start date (YYYY-MM-DD)
- `end_date` - End date (YYYY-MM-DD)

## When to Use

- Hosting marketing and product videos with analytics
- Tracking video engagement and viewer behavior
- A/B testing video thumbnails and CTAs
- Embedding videos with custom player branding
- Analyzing which parts of videos drive engagement
- Lead generation via video email gates

## Rate Limits

- 600 requests per minute per account
- Exceeding returns HTTP 429 with `Retry-After` header
- Asset access (media file downloads) does not count toward limit
- Events data returns records from past 2 years only

## Relevant Skills

- video-marketing
- content-repurposing
- landing-page-optimization
- lead-generation
