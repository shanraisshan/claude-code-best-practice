# Kit (formerly ConvertKit)

Email marketing platform for creators and newsletter businesses.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API for subscribers, forms, sequences |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | ✓ | JavaScript, Ruby gems available |

## Authentication

- **Type**: API Key or API Secret
- **Parameter**: `api_key={key}` or `api_secret={secret}` in query/body
- **Get key**: Settings > Advanced in Kit dashboard

## Common Agent Operations

### List subscribers

```bash
GET https://api.convertkit.com/v3/subscribers?api_secret={api_secret}&page=1

```

### Get subscriber

```bash
GET https://api.convertkit.com/v3/subscribers/{subscriber_id}?api_secret={api_secret}
```

### Add subscriber to form

```bash
POST https://api.convertkit.com/v3/forms/{form_id}/subscribe

{
  "api_key": "{api_key}",
  "email": "user@example.com",
  "first_name": "John",
  "fields": {
    "company": "Example Inc"
  }
}
```

### Add subscriber to sequence

```bash
POST https://api.convertkit.com/v3/sequences/{sequence_id}/subscribe

{
  "api_key": "{api_key}",
  "email": "user@example.com"
}
```

### Tag subscriber

```bash
POST https://api.convertkit.com/v3/tags/{tag_id}/subscribe

{
  "api_key": "{api_key}",
  "email": "user@example.com"
}
```

### Remove tag from subscriber

```bash
DELETE https://api.convertkit.com/v3/subscribers/{subscriber_id}/tags/{tag_id}?api_secret={api_secret}
```

### Update subscriber

```bash
PUT https://api.convertkit.com/v3/subscribers/{subscriber_id}

{
  "api_secret": "{api_secret}",
  "first_name": "Jane",
  "fields": {
    "plan": "pro"
  }
}
```

### Unsubscribe

```bash
PUT https://api.convertkit.com/v3/unsubscribe

{
  "api_secret": "{api_secret}",
  "email": "user@example.com"
}
```

### List forms

```bash
GET https://api.convertkit.com/v3/forms?api_key={api_key}
```

### List sequences

```bash
GET https://api.convertkit.com/v3/sequences?api_key={api_key}
```

### List tags

```bash
GET https://api.convertkit.com/v3/tags?api_key={api_key}
```

### Create broadcast

```bash
POST https://api.convertkit.com/v3/broadcasts

{
  "api_secret": "{api_secret}",
  "subject": "Newsletter Subject",
  "content": "<p>Email content here</p>",
  "email_layout_template": "default"
}
```

## Key Concepts

- **Subscribers** - Email contacts
- **Forms** - Signup forms
- **Sequences** - Automated email series
- **Tags** - Subscriber labels
- **Broadcasts** - One-time sends
- **Custom Fields** - Subscriber attributes

## Subscriber States

- `active` - Can receive emails
- `unsubscribed` - Opted out
- `bounced` - Email bounced
- `complained` - Marked as spam
- `inactive` - Cold subscriber

## When to Use

- Creator/newsletter businesses
- Simple email automation
- Form-based list building
- Tagging and segmentation
- Course email sequences

## Rate Limits

- 120 requests per minute
- Batch endpoints available

## Relevant Skills

- email-sequence
- content-strategy
