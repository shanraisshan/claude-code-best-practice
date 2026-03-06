# Zapier

Workflow automation platform connecting apps without code.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API for Zaps, tasks, and webhooks |
| MCP | ✓ | Available via Zapier MCP server |
| CLI | - | Not available |
| SDK | - | API and webhooks only |

## Authentication

- **Type**: API Key
- **Header**: `X-API-Key: {api_key}`
- **Get key**: Settings > API in Zapier account

## Common Agent Operations

### List Zaps

```bash
GET https://api.zapier.com/v1/zaps
```

### Get Zap details

```bash
GET https://api.zapier.com/v1/zaps/{zap_id}
```

### Turn Zap on/off

```bash
POST https://api.zapier.com/v1/zaps/{zap_id}/on
POST https://api.zapier.com/v1/zaps/{zap_id}/off
```

### Get task history

```bash
GET https://api.zapier.com/v1/zaps/{zap_id}/tasks
```

### Get profile info

```bash
GET https://api.zapier.com/v1/profiles/me
```

## Webhooks (Triggers)

### Catch Hook (receive data)

Create a "Webhooks by Zapier" trigger to receive data:

```bash
POST https://hooks.zapier.com/hooks/catch/{webhook_id}/

{
  "event": "user.created",
  "user_id": "123",
  "email": "user@example.com"
}
```

### Send data to Zapier

Most common: trigger a Zap from your app:

```bash
POST https://hooks.zapier.com/hooks/catch/{account_id}/{hook_id}/

{
  "name": "John Doe",
  "email": "john@example.com",
  "plan": "pro"
}
```

## Common Marketing Automations

### Lead capture to CRM
```
Typeform → Zapier → HubSpot
```

### New customer notifications
```
Stripe (new customer) → Zapier → Slack
```

### Email sequence triggers
```
Form submission → Zapier → Customer.io
```

### Social proof automation
```
New review → Zapier → Twitter/Slack
```

### Referral tracking
```
New referral → Zapier → Spreadsheet + Slack
```

## Webhook Payload Structure

When sending to Zapier, structure data as flat JSON:

```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "plan_name": "Pro",
  "plan_price": 99,
  "signup_date": "2024-01-15"
}
```

## Key Concepts

- **Zap** - Automated workflow
- **Trigger** - Event that starts a Zap
- **Action** - Task performed by Zap
- **Task** - Single action execution
- **Filter** - Conditional logic
- **Path** - Branching logic

## When to Use

- Connecting marketing tools without code
- Automating lead routing
- Syncing data between platforms
- Triggering notifications
- Building marketing workflows

## Rate Limits

- 100 requests per minute
- Task limits by plan tier

## Relevant Skills

- email-sequence
- analytics-tracking
- referral-program
