# Intercom

Customer messaging and support platform API for managing contacts, conversations, messages, companies, articles, and tags.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API v2.11+ - contacts, conversations, messages, companies, articles, tags |
| MCP | - | Not available |
| CLI | ✓ | [intercom.js](../clis/intercom.js) |
| SDK | ✓ | Node.js, Ruby, Python, PHP, Go |

## Authentication

- **Type**: Bearer Token (Access Token or OAuth 2.0)
- **Header**: `Authorization: Bearer {token}`
- **Version Header**: `Intercom-Version: 2.11`
- **Get key**: Developer Hub at https://app.intercom.com/a/apps/_/developer-hub

## Common Agent Operations

### List contacts

```bash
GET https://api.intercom.io/contacts
```

### Get a contact

```bash
GET https://api.intercom.io/contacts/{id}
```

### Create a contact

```bash
POST https://api.intercom.io/contacts

{
  "role": "user",
  "email": "user@example.com",
  "name": "Jane Doe",
  "custom_attributes": {
    "plan": "pro"
  }
}
```

### Update a contact

```bash
PUT https://api.intercom.io/contacts/{id}

{
  "name": "Jane Smith",
  "custom_attributes": {
    "plan": "enterprise"
  }
}
```

### Search contacts

```bash
POST https://api.intercom.io/contacts/search

{
  "query": {
    "field": "email",
    "operator": "=",
    "value": "user@example.com"
  }
}
```

### Delete a contact

```bash
DELETE https://api.intercom.io/contacts/{id}
```

### List conversations

```bash
GET https://api.intercom.io/conversations
```

### Get a conversation

```bash
GET https://api.intercom.io/conversations/{id}
```

### Search conversations

```bash
POST https://api.intercom.io/conversations/search

{
  "query": {
    "field": "open",
    "operator": "=",
    "value": true
  }
}
```

### Reply to a conversation

```bash
POST https://api.intercom.io/conversations/{id}/reply

{
  "message_type": "comment",
  "type": "admin",
  "admin_id": "{admin_id}",
  "body": "Thanks for reaching out!"
}
```

### Create a message

```bash
POST https://api.intercom.io/messages

{
  "message_type": "inapp",
  "body": "Welcome to our platform!",
  "from": {
    "type": "admin",
    "id": "{admin_id}"
  },
  "to": {
    "type": "user",
    "id": "{user_id}"
  }
}
```

### List companies

```bash
GET https://api.intercom.io/companies
```

### Create or update a company

```bash
POST https://api.intercom.io/companies

{
  "company_id": "company_123",
  "name": "Acme Corp",
  "plan": "enterprise",
  "custom_attributes": {
    "industry": "Technology"
  }
}
```

### List tags

```bash
GET https://api.intercom.io/tags
```

### Create a tag

```bash
POST https://api.intercom.io/tags

{
  "name": "VIP Customer"
}
```

### Tag a contact

```bash
POST https://api.intercom.io/contacts/{contact_id}/tags

{
  "id": "{tag_id}"
}
```

### List articles

```bash
GET https://api.intercom.io/articles
```

### Create an article

```bash
POST https://api.intercom.io/articles

{
  "title": "Getting Started Guide",
  "body": "<p>Welcome to our platform...</p>",
  "author_id": "{admin_id}",
  "state": "published"
}
```

### List admins

```bash
GET https://api.intercom.io/admins
```

### Submit events

```bash
POST https://api.intercom.io/events

{
  "event_name": "purchased-item",
  "created_at": 1706140800,
  "user_id": "user_123",
  "metadata": {
    "item_name": "Pro Plan",
    "price": 99.00
  }
}
```

## Key Metrics

### Contact Data
- `id` - Unique contact identifier
- `role` - user or lead
- `email` - Contact email
- `name` - Contact name
- `created_at` / `updated_at` - Timestamps
- `last_seen_at` - Last activity
- `custom_attributes` - Custom data fields
- `tags` - Applied tags
- `companies` - Associated companies

### Conversation Data
- `id` - Conversation identifier
- `state` - open, closed, snoozed
- `open` - Boolean open status
- `read` - Read status
- `priority` - Priority level
- `statistics` - Response times, counts
- `conversation_parts` - Message history

## Parameters

### List Contacts
- `per_page` - Results per page (default 50, max 150)
- `starting_after` - Pagination cursor

### List Conversations
- `per_page` - Results per page (default 20, max 150)
- `starting_after` - Pagination cursor

### Search (Contacts & Conversations)
- `query.field` - Field to search
- `query.operator` - Comparison operator (=, !=, >, <, ~, IN, NIN)
- `query.value` - Search value
- `pagination.per_page` - Results per page
- `pagination.starting_after` - Cursor for next page
- `sort.field` / `sort.order` - Sort configuration

## When to Use

- Managing customer contact records and segments
- Automating customer messaging and onboarding
- Monitoring and responding to support conversations
- Tracking customer events and behavior
- Building custom support workflows
- Syncing customer data between platforms

## Rate Limits

- **Default**: 10,000 API calls per minute per app
- **Per workspace**: 25,000 API calls per minute
- Distributed in 10-second windows (resets every 10 seconds)
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- HTTP 429 returned when exceeded

## Relevant Skills

- customer-onboarding
- customer-retention
- lead-generation
- customer-support
- in-app-messaging
