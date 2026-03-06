# Mixpanel

Product analytics platform for tracking user behavior and retention.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Ingestion API, Query API, Data Export |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | ✓ | JavaScript, iOS, Android, Python, etc. |

## Authentication

- **Ingestion**: Project token (public)
- **Query API**: Service Account (username:secret as Basic auth)
- **Export**: API Secret

## Common Agent Operations

### Track event (Ingestion API)

```bash
POST https://api.mixpanel.com/track

{
  "event": "signup_completed",
  "properties": {
    "token": "{project_token}",
    "distinct_id": "user_123",
    "plan": "pro",
    "time": 1705312800
  }
}
```

### Set user profile

```bash
POST https://api.mixpanel.com/engage

{
  "$token": "{project_token}",
  "$distinct_id": "user_123",
  "$set": {
    "$email": "user@example.com",
    "$name": "John Doe",
    "plan": "pro"
  }
}
```

### Query events (Query API)

```bash
POST https://mixpanel.com/api/2.0/insights

{
  "project_id": {project_id},
  "bookmark_id": null,
  "params": {
    "events": [{"event": "signup_completed"}],
    "time_range": {
      "from_date": "2024-01-01",
      "to_date": "2024-01-31"
    }
  }
}
```

### Get funnel data

```bash
GET https://mixpanel.com/api/2.0/funnels?funnel_id={funnel_id}&from_date=2024-01-01&to_date=2024-01-31
```

### Export raw events

```bash
GET https://data.mixpanel.com/api/2.0/export?from_date=2024-01-01&to_date=2024-01-01
```

### Get retention data

```bash
GET https://mixpanel.com/api/2.0/retention?from_date=2024-01-01&to_date=2024-01-31&retention_type=birth&born_event=signup_completed
```

## JavaScript SDK

```javascript
// Initialize
mixpanel.init('YOUR_TOKEN');

// Identify user
mixpanel.identify('user_123');

// Set user properties
mixpanel.people.set({
  '$email': 'user@example.com',
  'plan': 'pro'
});

// Track event
mixpanel.track('Feature Used', {
  'feature_name': 'export'
});
```

## Key Concepts

- **Events** - User actions (signup, purchase, etc.)
- **Properties** - Attributes on events
- **User Profiles** - Persistent user data
- **Cohorts** - Saved user segments
- **Funnels** - Conversion sequences
- **Retention** - User return patterns

## When to Use

- Tracking product usage events
- Analyzing conversion funnels
- Measuring feature adoption
- Retention analysis
- User segmentation

## Rate Limits

- Ingestion: No hard limit (batch recommended)
- Query API: Varies by plan

## Relevant Skills

- analytics-tracking
- ab-test-setup
- onboarding-cro
