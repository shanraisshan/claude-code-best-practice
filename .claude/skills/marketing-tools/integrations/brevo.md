# Brevo

All-in-one marketing platform (formerly Sendinblue) for email, SMS, and WhatsApp with contacts, campaigns, and transactional messaging.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API v3 for contacts, campaigns, transactional email/SMS |
| MCP | - | Not available |
| CLI | ✓ | [brevo.js](../clis/brevo.js) |
| SDK | ✓ | Node.js, Python, PHP, Ruby, Java, C#, Go |

## Authentication

- **Type**: API Key
- **Header**: `api-key: {api_key}`
- **Get key**: SMTP & API settings at https://app.brevo.com/settings/keys/api
- **Note**: API key is only shown once on creation; store securely. Formerly used `api.sendinblue.com` base URL.

## Common Agent Operations

### Get account info

```bash
GET https://api.brevo.com/v3/account
```

### List contacts

```bash
GET https://api.brevo.com/v3/contacts?limit=50&offset=0
```

### Get contact by email

```bash
GET https://api.brevo.com/v3/contacts/user@example.com
```

### Create contact

```bash
POST https://api.brevo.com/v3/contacts

{
  "email": "user@example.com",
  "attributes": {
    "FIRSTNAME": "Jane",
    "LASTNAME": "Doe"
  },
  "listIds": [1, 2]
}
```

### Update contact

```bash
PUT https://api.brevo.com/v3/contacts/user@example.com

{
  "attributes": {
    "FIRSTNAME": "Updated"
  },
  "listIds": [3]
}
```

### Delete contact

```bash
DELETE https://api.brevo.com/v3/contacts/user@example.com
```

### Import contacts

```bash
POST https://api.brevo.com/v3/contacts/import

{
  "jsonBody": [
    { "email": "user1@example.com" },
    { "email": "user2@example.com" }
  ],
  "listIds": [1]
}
```

### List contact lists

```bash
GET https://api.brevo.com/v3/contacts/lists?limit=50&offset=0
```

### Create list

```bash
POST https://api.brevo.com/v3/contacts/lists

{
  "name": "Newsletter Subscribers",
  "folderId": 1
}
```

### Add contacts to list

```bash
POST https://api.brevo.com/v3/contacts/lists/{listId}/contacts/add

{
  "emails": ["user1@example.com", "user2@example.com"]
}
```

### Remove contacts from list

```bash
POST https://api.brevo.com/v3/contacts/lists/{listId}/contacts/remove

{
  "emails": ["user1@example.com"]
}
```

### Send transactional email

```bash
POST https://api.brevo.com/v3/smtp/email

{
  "sender": {
    "name": "My App",
    "email": "noreply@example.com"
  },
  "to": [
    { "email": "user@example.com", "name": "Jane Doe" }
  ],
  "subject": "Order Confirmation",
  "htmlContent": "<html><body><p>Your order is confirmed.</p></body></html>"
}
```

### List email campaigns

```bash
GET https://api.brevo.com/v3/emailCampaigns?limit=50&offset=0&type=classic&status=sent
```

### Create email campaign

```bash
POST https://api.brevo.com/v3/emailCampaigns

{
  "name": "January Newsletter",
  "subject": "Monthly Update",
  "sender": { "name": "My Brand", "email": "news@example.com" },
  "htmlContent": "<html><body><p>Newsletter content</p></body></html>",
  "recipients": { "listIds": [1, 2] }
}
```

### Send campaign immediately

```bash
POST https://api.brevo.com/v3/emailCampaigns/{campaignId}/sendNow
```

### Send test email for campaign

```bash
POST https://api.brevo.com/v3/emailCampaigns/{campaignId}/sendTest

{
  "emailTo": ["test@example.com"]
}
```

### Send transactional SMS

```bash
POST https://api.brevo.com/v3/transactionalSMS/sms

{
  "sender": "MyApp",
  "recipient": "+15551234567",
  "content": "Your verification code is 123456",
  "type": "transactional"
}
```

### List SMS campaigns

```bash
GET https://api.brevo.com/v3/smsCampaigns?limit=50&offset=0
```

### List senders

```bash
GET https://api.brevo.com/v3/senders
```

## API Pattern

Brevo uses standard REST with offset-based pagination (`limit` and `offset` parameters). Contact attributes use uppercase field names (FIRSTNAME, LASTNAME). Lists are nested under the contacts resource path. Transactional email uses the `/smtp/email` endpoint despite being REST-based.

## Key Metrics

### Contact Fields
- `email` - Email address
- `attributes` - Custom attributes (FIRSTNAME, LASTNAME, SMS, etc.)
- `listIds` - Associated list IDs
- `emailBlacklisted` - Email opt-out status
- `smsBlacklisted` - SMS opt-out status
- `statistics` - Engagement stats (with expand)

### Campaign Metrics
- `sent` - Total sends
- `delivered` - Successful deliveries
- `openRate` - Open percentage
- `clickRate` - Click percentage
- `unsubscribed` - Unsubscribe count
- `hardBounces`, `softBounces` - Bounce counts

### Transactional Email Response
- `messageId` - Unique message identifier for tracking

## Parameters

### Contact Parameters
- `email` - Contact email address
- `attributes` - Key-value object of custom attributes
- `listIds` - Array of list IDs to subscribe to
- `unlinkListIds` - Array of list IDs to unsubscribe from

### Campaign Parameters
- `name` - Campaign name
- `subject` - Email subject line
- `sender` - Object with `name` and `email`
- `htmlContent` / `textContent` - Email body
- `recipients` - Object with `listIds` array
- `type` - classic or trigger

## When to Use

- Multi-channel marketing (email + SMS + WhatsApp)
- Transactional email sending with tracking
- Managing contacts and segmented lists
- Creating and scheduling email campaigns
- SMS notifications and marketing
- Affordable all-in-one marketing automation

## Rate Limits

- API rate limits depend on plan (free tier: limited sends/day)
- Transactional email: varies by plan
- Contact imports: batch processing with async status
- Rate limit headers returned with responses

## Relevant Skills

- email-sequence
- sms-marketing
- transactional-email
- lifecycle-marketing
- contact-management
