# Typeform

Forms and surveys platform API for creating typeforms, retrieving responses, managing webhooks, themes, images, and workspaces.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Create, Responses, Webhooks APIs |
| MCP | - | Not available |
| CLI | ✓ | [typeform.js](../clis/typeform.js) |
| SDK | ✓ | JavaScript (@typeform/js-api-client), Embed SDK |

## Authentication

- **Type**: Bearer Token (Personal Access Token or OAuth 2.0)
- **Header**: `Authorization: Bearer {token}`
- **Get key**: https://admin.typeform.com/account#/section/tokens

## Common Agent Operations

### List forms

```bash
GET https://api.typeform.com/forms
```

### Get a form

```bash
GET https://api.typeform.com/forms/{form_id}
```

### Create a form

```bash
POST https://api.typeform.com/forms

{
  "title": "Customer Feedback Survey",
  "fields": [
    {
      "type": "short_text",
      "title": "What is your name?"
    },
    {
      "type": "rating",
      "title": "How would you rate our service?",
      "properties": {
        "steps": 5
      }
    }
  ]
}
```

### Update a form

```bash
PUT https://api.typeform.com/forms/{form_id}

{
  "title": "Updated Survey Title"
}
```

### Delete a form

```bash
DELETE https://api.typeform.com/forms/{form_id}
```

### Retrieve responses

```bash
GET https://api.typeform.com/forms/{form_id}/responses?page_size=25&since=2024-01-01T00:00:00Z
```

### Delete responses

```bash
DELETE https://api.typeform.com/forms/{form_id}/responses?included_response_ids={id1},{id2}
```

### List webhooks

```bash
GET https://api.typeform.com/forms/{form_id}/webhooks
```

### Create or update webhook

```bash
PUT https://api.typeform.com/forms/{form_id}/webhooks/{tag}

{
  "url": "https://example.com/webhook",
  "enabled": true
}
```

### Delete webhook

```bash
DELETE https://api.typeform.com/forms/{form_id}/webhooks/{tag}
```

### List themes

```bash
GET https://api.typeform.com/themes
```

### List images

```bash
GET https://api.typeform.com/images
```

### List workspaces

```bash
GET https://api.typeform.com/workspaces
```

### Get a workspace

```bash
GET https://api.typeform.com/workspaces/{workspace_id}
```

## Key Metrics

### Response Data
- `response_id` - Unique response identifier
- `landed_at` / `submitted_at` - Timestamps
- `answers` - Array of field answers
- `variables` - Calculated variables
- `hidden` - Hidden field values
- `calculated` - Score calculations

### Form Data
- `id` - Form ID (from URL)
- `title` - Form title
- `fields` - Array of form fields
- `logic` - Logic jumps
- `settings` - Form settings (notifications, meta, etc.)
- `_links` - Display and responses URLs

## Parameters

### Retrieve Responses
- `page_size` - Results per page (default 25, max 1000)
- `since` / `until` - Date range filter (ISO 8601 or Unix timestamp)
- `after` / `before` - Pagination tokens
- `response_type` - Filter: started, partial, completed (default: completed)
- `query` - Text search within responses
- `fields` - Show only specific fields in answers
- `sort` - Sort order: `{fieldID},{asc|desc}`
- `included_response_ids` / `excluded_response_ids` - Filter specific responses
- `answered_fields` - Only responses containing specified fields

### List Forms
- `page` - Page number
- `page_size` - Results per page (default 10, max 200)
- `workspace_id` - Filter by workspace
- `search` - Search by form title

## When to Use

- Collecting lead information and survey data
- Building custom form experiences programmatically
- Automating survey creation for campaigns
- Analyzing form response data at scale
- Setting up real-time response webhooks
- Managing form themes and branding

## Rate Limits

- **Create & Responses APIs**: 2 requests per second per account
- **Webhooks & Embed**: No rate limits (push-based)
- Monitor for HTTP 429 responses

## Relevant Skills

- lead-generation
- customer-research
- page-cro
- signup-flow-cro
- customer-feedback
