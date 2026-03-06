# Amplitude

Product analytics platform for user behavior, retention, and experimentation.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | HTTP API for events, User Profile API, Export API |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | ✓ | JavaScript, iOS, Android, Python, etc. |

## Authentication

- **HTTP API**: API Key (public for events)
- **Export/Dashboard API**: API Key + Secret Key

## Common Agent Operations

### Track event

```bash
POST https://api2.amplitude.com/2/httpapi

{
  "api_key": "{api_key}",
  "events": [{
    "user_id": "user_123",
    "event_type": "signup_completed",
    "event_properties": {
      "plan": "pro"
    },
    "user_properties": {
      "email": "user@example.com"
    }
  }]
}
```

### Batch events

```bash
POST https://api2.amplitude.com/batch

{
  "api_key": "{api_key}",
  "events": [
    {"user_id": "user_1", "event_type": "pageview"},
    {"user_id": "user_2", "event_type": "signup"}
  ]
}
```

### Get user activity

```bash
GET https://amplitude.com/api/2/useractivity?user={user_id}

Authorization: Basic {base64(api_key:secret_key)}
```

### Export events

```bash
GET https://amplitude.com/api/2/export?start=20240101T00&end=20240131T23

Authorization: Basic {base64(api_key:secret_key)}
```

### Get retention data

```bash
GET https://amplitude.com/api/2/retention?e={"event_type":"signup_completed"}&start=20240101&end=20240131

Authorization: Basic {base64(api_key:secret_key)}
```

### Query with SQL (Snowflake)

For Amplitude customers with SQL access:
```sql
SELECT event_type, COUNT(*) as count
FROM events
WHERE event_time > '2024-01-01'
GROUP BY event_type
```

## JavaScript SDK

```javascript
// Initialize
amplitude.init('API_KEY');

// Identify user
amplitude.setUserId('user_123');

// Set user properties
const identify = new amplitude.Identify();
identify.set('plan', 'pro');
amplitude.identify(identify);

// Track event
amplitude.track('Feature Used', {
  feature_name: 'export'
});
```

## Key Concepts

- **Events** - User actions with properties
- **User Properties** - Persistent user attributes
- **Cohorts** - Behavioral segments
- **Funnels** - Multi-step conversion analysis
- **Retention** - User return patterns
- **Journeys** - User path analysis

## When to Use

- Tracking product analytics
- Analyzing user funnels
- Cohort analysis and retention
- Experimentation and A/B testing
- User journey mapping

## Rate Limits

- HTTP API: 1000 events/second
- Export API: 360 requests/hour

## Relevant Skills

- analytics-tracking
- ab-test-setup
- onboarding-cro
