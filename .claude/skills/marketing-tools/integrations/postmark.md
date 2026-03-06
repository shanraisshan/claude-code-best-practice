# Postmark

Transactional email delivery service with fast delivery, templates, bounce management, and detailed analytics.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API for email sending, templates, bounces, stats |
| MCP | - | Not available |
| CLI | ✓ | [postmark.js](../clis/postmark.js) |
| SDK | ✓ | Node.js, Ruby, Python, PHP, Java, .NET, Go |

## Authentication

- **Type**: Server Token (or Account Token for account-level ops)
- **Header**: `X-Postmark-Server-Token: {server_token}` (server-level)
- **Header**: `X-Postmark-Account-Token: {account_token}` (account-level)
- **Get key**: API Tokens tab at https://account.postmarkapp.com/servers
- **Note**: Server tokens are per-server; account tokens apply across all servers

## Common Agent Operations

### Send single email

```bash
POST https://api.postmarkapp.com/email

{
  "From": "sender@example.com",
  "To": "recipient@example.com",
  "Subject": "Welcome!",
  "HtmlBody": "<html><body><p>Hello!</p></body></html>",
  "TextBody": "Hello!",
  "MessageStream": "outbound",
  "TrackOpens": true,
  "TrackLinks": "HtmlAndText"
}
```

### Send with template

```bash
POST https://api.postmarkapp.com/email/withTemplate

{
  "From": "sender@example.com",
  "To": "recipient@example.com",
  "TemplateId": 12345,
  "TemplateModel": {
    "name": "Jane",
    "action_url": "https://example.com/verify"
  },
  "MessageStream": "outbound"
}
```

### Send batch emails

```bash
POST https://api.postmarkapp.com/email/batch

[
  {
    "From": "sender@example.com",
    "To": "user1@example.com",
    "Subject": "Notification",
    "TextBody": "Hello user 1"
  },
  {
    "From": "sender@example.com",
    "To": "user2@example.com",
    "Subject": "Notification",
    "TextBody": "Hello user 2"
  }
]
```

### List templates

```bash
GET https://api.postmarkapp.com/templates?Count=100&Offset=0
```

### Get template

```bash
GET https://api.postmarkapp.com/templates/{templateIdOrAlias}
```

### Create template

```bash
POST https://api.postmarkapp.com/templates

{
  "Name": "Welcome Email",
  "Alias": "welcome",
  "Subject": "Welcome {{name}}!",
  "HtmlBody": "<html><body><p>Hello {{name}}</p></body></html>",
  "TextBody": "Hello {{name}}"
}
```

### Get delivery stats

```bash
GET https://api.postmarkapp.com/deliverystats
```

### List bounces

```bash
GET https://api.postmarkapp.com/bounces?count=50&offset=0&type=HardBounce
```

### Activate bounce (reactivate recipient)

```bash
PUT https://api.postmarkapp.com/bounces/{bounceId}/activate
```

### Search outbound messages

```bash
GET https://api.postmarkapp.com/messages/outbound?count=50&offset=0&recipient=user@example.com
```

### Get outbound stats overview

```bash
GET https://api.postmarkapp.com/stats/outbound?fromdate=2025-01-01&todate=2025-01-31
```

### Get open stats

```bash
GET https://api.postmarkapp.com/stats/outbound/opens?fromdate=2025-01-01&todate=2025-01-31
```

### Get click stats

```bash
GET https://api.postmarkapp.com/stats/outbound/clicks?fromdate=2025-01-01&todate=2025-01-31
```

### Get server info

```bash
GET https://api.postmarkapp.com/server
```

### List suppressions

```bash
GET https://api.postmarkapp.com/message-streams/outbound/suppressions/dump
```

### Create suppression

```bash
POST https://api.postmarkapp.com/message-streams/outbound/suppressions

{
  "Suppressions": [
    { "EmailAddress": "user@example.com" }
  ]
}
```

## API Pattern

Postmark uses simple REST endpoints with PascalCase field names in request/response bodies. Authentication is via custom headers rather than Authorization. Pagination uses `Count` and `Offset` parameters. Email sending is synchronous with immediate delivery confirmation.

## Key Metrics

### Delivery Metrics
- `Sent` - Total emails sent
- `Bounced` - Bounce count by type (hard, soft, transient)
- `SpamComplaints` - Spam complaint count
- `Opens` - Open count and unique opens
- `Clicks` - Click count and unique clicks

### Bounce Types
- `HardBounce` - Permanent delivery failure
- `SoftBounce` - Temporary delivery failure
- `Transient` - Temporary issue (retry)
- `SpamNotification` - Marked as spam

### Message Fields
- `MessageID` - Unique message identifier
- `SubmittedAt` - Submission timestamp
- `Status` - Delivery status
- `Recipients` - Recipient list

## Parameters

### Email Parameters
- `From` - Sender address (must be verified)
- `To` - Recipient (comma-separated for multiple)
- `Subject` - Email subject
- `HtmlBody` / `TextBody` - Email content
- `MessageStream` - outbound (transactional) or broadcast
- `TrackOpens` - Enable open tracking (boolean)
- `TrackLinks` - None, HtmlAndText, HtmlOnly, TextOnly
- `Tag` - Custom tag for categorization

### Stats Parameters
- `fromdate` - Start date (YYYY-MM-DD)
- `todate` - End date (YYYY-MM-DD)
- `tag` - Filter by tag

## When to Use

- Transactional emails (password resets, order confirmations, notifications)
- Template-based email sending with dynamic variables
- Monitoring email deliverability and bounce rates
- Tracking email engagement (opens, clicks)
- Managing email suppressions and bounces
- High-reliability email delivery with fast performance

## Rate Limits

- 500 messages per batch request
- 10 MB max per single message (including attachments)
- 50 MB max per batch request
- API rate limits vary by plan

## Relevant Skills

- email-sequence
- transactional-email
- email-deliverability
- onboarding-email
