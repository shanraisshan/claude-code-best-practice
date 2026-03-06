# ActiveCampaign

Email marketing automation platform with CRM, contacts, deals pipeline, tags, automations, and campaign management.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API v3 for contacts, deals, automations, campaigns, tags |
| MCP | - | Not available |
| CLI | ✓ | [activecampaign.js](../clis/activecampaign.js) |
| SDK | ✓ | Python, PHP, Node.js, Ruby |

## Authentication

- **Type**: API Token
- **Header**: `Api-Token: {api_token}`
- **Base URL**: `https://{yourAccountName}.api-us1.com/api/3`
- **Get key**: Settings > Developer tab in your ActiveCampaign account
- **Note**: Each user has a unique API key. Base URL is account-specific (found in Settings > Developer).

## Common Agent Operations

### Get current user

```bash
GET https://{account}.api-us1.com/api/3/users/me
```

### List contacts

```bash
GET https://{account}.api-us1.com/api/3/contacts?limit=20&offset=0

# Search by email
GET https://{account}.api-us1.com/api/3/contacts?email=user@example.com

# Search by name
GET https://{account}.api-us1.com/api/3/contacts?search=Jane
```

### Create contact

```bash
POST https://{account}.api-us1.com/api/3/contacts

{
  "contact": {
    "email": "user@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "phone": "+15551234567"
  }
}
```

### Update contact

```bash
PUT https://{account}.api-us1.com/api/3/contacts/{contactId}

{
  "contact": {
    "firstName": "Updated",
    "lastName": "Name"
  }
}
```

### Sync contact (create or update)

```bash
POST https://{account}.api-us1.com/api/3/contact/sync

{
  "contact": {
    "email": "user@example.com",
    "firstName": "Jane",
    "lastName": "Doe"
  }
}
```

### Delete contact

```bash
DELETE https://{account}.api-us1.com/api/3/contacts/{contactId}
```

### List all lists

```bash
GET https://{account}.api-us1.com/api/3/lists?limit=20&offset=0
```

### Create list

```bash
POST https://{account}.api-us1.com/api/3/lists

{
  "list": {
    "name": "Newsletter",
    "stringid": "newsletter",
    "sender_url": "https://example.com",
    "sender_reminder": "You signed up for our newsletter."
  }
}
```

### Subscribe contact to list

```bash
POST https://{account}.api-us1.com/api/3/contactLists

{
  "contactList": {
    "list": "1",
    "contact": "1",
    "status": 1
  }
}
```

### Unsubscribe contact from list

```bash
POST https://{account}.api-us1.com/api/3/contactLists

{
  "contactList": {
    "list": "1",
    "contact": "1",
    "status": 2
  }
}
```

### List campaigns

```bash
GET https://{account}.api-us1.com/api/3/campaigns?limit=20&offset=0
```

### List deals

```bash
GET https://{account}.api-us1.com/api/3/deals?limit=20&offset=0

# Filter by pipeline stage
GET https://{account}.api-us1.com/api/3/deals?filters[stage]=1
```

### Create deal

```bash
POST https://{account}.api-us1.com/api/3/deals

{
  "deal": {
    "title": "New Enterprise Deal",
    "value": 50000,
    "currency": "usd",
    "group": "1",
    "stage": "1",
    "owner": "1",
    "contact": "1"
  }
}
```

### Update deal

```bash
PUT https://{account}.api-us1.com/api/3/deals/{dealId}

{
  "deal": {
    "stage": "2",
    "value": 75000
  }
}
```

### List automations

```bash
GET https://{account}.api-us1.com/api/3/automations?limit=20&offset=0
```

### Add contact to automation

```bash
POST https://{account}.api-us1.com/api/3/contactAutomations

{
  "contactAutomation": {
    "contact": "1",
    "automation": "1"
  }
}
```

### List tags

```bash
GET https://{account}.api-us1.com/api/3/tags?limit=20&offset=0
```

### Create tag

```bash
POST https://{account}.api-us1.com/api/3/tags

{
  "tag": {
    "tag": "VIP Customer",
    "tagType": "contact"
  }
}
```

### Add tag to contact

```bash
POST https://{account}.api-us1.com/api/3/contactTags

{
  "contactTag": {
    "contact": "1",
    "tag": "1"
  }
}
```

### List pipelines (deal groups)

```bash
GET https://{account}.api-us1.com/api/3/dealGroups?limit=20&offset=0
```

### List webhooks

```bash
GET https://{account}.api-us1.com/api/3/webhooks?limit=20&offset=0
```

### Create webhook

```bash
POST https://{account}.api-us1.com/api/3/webhooks

{
  "webhook": {
    "name": "Contact Updated",
    "url": "https://example.com/webhook",
    "events": ["subscribe", "unsubscribe"],
    "sources": ["public", "admin", "api", "system"]
  }
}
```

## API Pattern

ActiveCampaign uses REST with resource wrapping (e.g., `{ "contact": {...} }`). Responses include the resource object plus metadata. Related resources are managed via junction endpoints (e.g., `/contactLists`, `/contactTags`, `/contactAutomations`). The base URL is account-specific. Pagination uses `limit` and `offset` parameters.

## Key Metrics

### Contact Fields
- `email` - Email address
- `firstName`, `lastName` - Name fields
- `phone` - Phone number
- `cdate` - Creation date
- `udate` - Last updated date
- `deals` - Related deals count

### Deal Fields
- `title` - Deal name
- `value` - Deal value in cents
- `currency` - Currency code
- `stage` - Pipeline stage ID
- `group` - Pipeline (deal group) ID
- `owner` - Assigned user ID
- `status` - 0 (open), 1 (won), 2 (lost)

### Campaign Metrics
- `sends` - Total sends
- `opens` - Opens count
- `clicks` - Clicks count
- `uniqueopens` - Unique opens
- `uniquelinks` - Unique clicks

## Parameters

### Contact List Status
- `1` - Subscribed (active)
- `2` - Unsubscribed

### Deal Status
- `0` - Open
- `1` - Won
- `2` - Lost

### Tag Types
- `contact` - Contact tags
- `deal` - Deal tags

### Common Query Parameters
- `limit` - Results per page (default 20)
- `offset` - Skip N results
- `search` - Text search
- `email` - Filter contacts by email
- `filters[stage]` - Filter deals by stage
- `filters[owner]` - Filter deals by owner

## When to Use

- Marketing automation with complex conditional workflows
- CRM with deal pipeline management
- Contact management with tagging and segmentation
- Email campaign creation and tracking
- Triggering automations based on external events
- B2B sales pipeline tracking integrated with marketing

## Rate Limits

- 5 requests per second per account
- Rate limit applies across all API users on the same account
- 429 responses include `Retry-After` header

## Relevant Skills

- email-sequence
- lifecycle-marketing
- crm-integration
- sales-pipeline
- marketing-automation
