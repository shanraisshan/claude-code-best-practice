# SendGrid

Email delivery platform for transactional and marketing emails.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Mail Send API, Marketing API |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | ✓ | Official libraries for most languages |

## Authentication

- **Type**: API Key
- **Header**: `Authorization: Bearer {api_key}`
- **Get key**: Settings > API Keys in SendGrid dashboard

## Common Agent Operations

### Send email

```bash
POST https://api.sendgrid.com/v3/mail/send

Authorization: Bearer {api_key}

{
  "personalizations": [{
    "to": [{"email": "user@example.com"}]
  }],
  "from": {"email": "hello@example.com"},
  "subject": "Welcome!",
  "content": [{
    "type": "text/html",
    "value": "<h1>Welcome!</h1>"
  }]
}
```

### Send with template

```bash
POST https://api.sendgrid.com/v3/mail/send

{
  "personalizations": [{
    "to": [{"email": "user@example.com"}],
    "dynamic_template_data": {
      "name": "John",
      "order_id": "12345"
    }
  }],
  "from": {"email": "hello@example.com"},
  "template_id": "d-xxx"
}
```

### Add contact to list

```bash
PUT https://api.sendgrid.com/v3/marketing/contacts

{
  "list_ids": ["list-id"],
  "contacts": [{
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }]
}
```

### Search contacts

```bash
POST https://api.sendgrid.com/v3/marketing/contacts/search

{
  "query": "email LIKE 'user@%'"
}
```

### Get email statistics

```bash
GET https://api.sendgrid.com/v3/stats?start_date=2024-01-01&end_date=2024-01-31

Authorization: Bearer {api_key}
```

### Get bounces

```bash
GET https://api.sendgrid.com/v3/suppression/bounces

Authorization: Bearer {api_key}
```

### Get spam reports

```bash
GET https://api.sendgrid.com/v3/suppression/spam_reports

Authorization: Bearer {api_key}
```

### Validate email

```bash
POST https://api.sendgrid.com/v3/validations/email

{
  "email": "user@example.com"
}
```

## Webhook Events

| Event | Description |
|-------|-------------|
| `processed` | Email accepted |
| `delivered` | Email delivered |
| `open` | Email opened |
| `click` | Link clicked |
| `bounce` | Hard/soft bounce |
| `dropped` | Email dropped |
| `spamreport` | Marked as spam |
| `unsubscribe` | Unsubscribed |

## Node.js SDK

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('SG.xxx');

await sgMail.send({
  to: 'user@example.com',
  from: 'hello@example.com',
  subject: 'Welcome!',
  html: '<h1>Welcome!</h1>'
});
```

## When to Use

- Transactional email at scale
- Marketing email campaigns
- Email validation
- Deliverability management

## Rate Limits

- Free: 100 emails/day
- Paid: Varies by plan (up to millions/month)

## Relevant Skills

- email-sequence
- analytics-tracking
