# PostHog

Open-source product analytics with session replay and feature flags.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Capture API, Query API, Feature Flags API |
| MCP | - | Not available |
| CLI | ✓ | `posthog` CLI for local development |
| SDK | ✓ | JavaScript, Python, Ruby, Go, etc. |

## Authentication

- **Type**: API Key (Personal or Project)
- **Header**: `Authorization: Bearer {api_key}`
- **For capture**: Project API Key in payload

## Common Agent Operations

### Capture event

```bash
POST https://app.posthog.com/capture/

{
  "api_key": "{project_api_key}",
  "event": "signup_completed",
  "distinct_id": "user_123",
  "properties": {
    "plan": "pro",
    "$current_url": "https://example.com/signup"
  }
}
```

### Batch events

```bash
POST https://app.posthog.com/batch/

{
  "api_key": "{project_api_key}",
  "batch": [
    {"event": "pageview", "distinct_id": "user_1"},
    {"event": "signup", "distinct_id": "user_2"}
  ]
}
```

### Get person by distinct_id

```bash
GET https://app.posthog.com/api/projects/{project_id}/persons/?distinct_id=user_123

Authorization: Bearer {api_key}
```

### Query events (HogQL)

```bash
POST https://app.posthog.com/api/projects/{project_id}/query/

{
  "query": {
    "kind": "HogQLQuery",
    "query": "SELECT event, count() FROM events WHERE timestamp > now() - interval 7 day GROUP BY event ORDER BY count() DESC LIMIT 10"
  }
}
```

### Get feature flag value

```bash
POST https://app.posthog.com/decide?v=3

{
  "api_key": "{project_api_key}",
  "distinct_id": "user_123"
}
```

### Get insights

```bash
GET https://app.posthog.com/api/projects/{project_id}/insights/

Authorization: Bearer {api_key}
```

### Get session recordings

```bash
GET https://app.posthog.com/api/projects/{project_id}/session_recordings/

Authorization: Bearer {api_key}
```

## JavaScript SDK

```javascript
// Initialize
posthog.init('PROJECT_API_KEY', {
  api_host: 'https://app.posthog.com'
});

// Identify user
posthog.identify('user_123', {
  email: 'user@example.com',
  plan: 'pro'
});

// Track event
posthog.capture('signup_completed', {
  method: 'email'
});

// Check feature flag
if (posthog.isFeatureEnabled('new-pricing')) {
  // Show new pricing
}
```

## Key Features

- **Event tracking** - Product analytics
- **Session replay** - Watch user sessions
- **Feature flags** - Control feature rollout
- **A/B testing** - Built-in experiments
- **HogQL** - SQL-like query language
- **Self-hostable** - Run on your infrastructure

## When to Use

- Product analytics with privacy focus
- Session replay for UX insights
- Feature flag management
- Self-hosted analytics needs
- Open-source requirements

## Rate Limits

- Cloud: 10,000 events/second
- Self-hosted: Unlimited

## Relevant Skills

- analytics-tracking
- ab-test-setup
- onboarding-cro
