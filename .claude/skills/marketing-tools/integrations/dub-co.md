# Dub.co

Link management and attribution platform for modern marketing teams.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API for links, analytics, domains |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | ✓ | TypeScript SDK available |

## Authentication

- **Type**: API Key
- **Header**: `Authorization: Bearer {api_key}`
- **Get key**: Settings > API Keys in Dub dashboard

## Common Agent Operations

### Create short link

```bash
POST https://api.dub.co/links

{
  "url": "https://example.com/landing-page",
  "domain": "link.example.com",
  "key": "summer-sale",
  "tags": ["campaign:summer", "channel:email"]
}
```

### Get link by key

```bash
GET https://api.dub.co/links?domain=link.example.com&key=summer-sale
```

### List links

```bash
GET https://api.dub.co/links?domain=link.example.com&page=1
```

### Get link analytics

```bash
GET https://api.dub.co/analytics?domain=link.example.com&key=summer-sale&interval=30d
```

### Get clicks by location

```bash
GET https://api.dub.co/analytics/country?domain=link.example.com&key=summer-sale
```

### Get clicks by device

```bash
GET https://api.dub.co/analytics/device?domain=link.example.com&key=summer-sale
```

### Update link

```bash
PATCH https://api.dub.co/links/{link_id}

{
  "url": "https://example.com/new-landing-page",
  "tags": ["campaign:summer", "channel:social"]
}
```

### Delete link

```bash
DELETE https://api.dub.co/links/{link_id}
```

### Bulk create links

```bash
POST https://api.dub.co/links/bulk

[
  {"url": "https://example.com/page1", "key": "page1"},
  {"url": "https://example.com/page2", "key": "page2"}
]
```

## TypeScript SDK

### Install

```bash
npm install dub
```

### Usage

```typescript
import { Dub } from "dub";

const dub = new Dub({ token: "YOUR_API_KEY" });

// Create link
const link = await dub.links.create({
  url: "https://example.com",
  domain: "link.example.com"
});

// Get analytics
const analytics = await dub.analytics.retrieve({
  domain: "link.example.com",
  key: "summer-sale"
});
```

## Key Features

- **Custom domains** - Use your own branded domains
- **Link analytics** - Clicks, locations, devices, referrers
- **Tags** - Organize links by campaign, channel, etc.
- **QR codes** - Auto-generated for each link
- **Password protection** - Secure sensitive links
- **Expiration** - Time-limited links
- **Geo-targeting** - Redirect based on location

## Analytics Dimensions

- `clicks` - Total click count
- `country` - Clicks by country
- `city` - Clicks by city
- `device` - Clicks by device type
- `browser` - Clicks by browser
- `os` - Clicks by operating system
- `referer` - Clicks by referrer

## When to Use

- Creating trackable marketing links
- Building referral link systems
- Tracking campaign attribution
- A/B testing landing pages via links
- Generating branded short URLs
- Analyzing link performance

## Rate Limits

- Free: 1,000 links, 5 API requests/second
- Pro: Unlimited links, 50 API requests/second
- Enterprise: Custom limits

## Relevant Skills

- referral-program
- analytics-tracking
- paid-ads
