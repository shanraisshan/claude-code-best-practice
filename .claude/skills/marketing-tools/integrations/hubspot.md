# HubSpot

CRM platform for marketing, sales, and customer service.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API for CRM, Marketing, Sales |
| MCP | - | Not available |
| CLI | ✓ | `hs` CLI for local development |
| SDK | ✓ | Official client libraries |

## Authentication

- **Type**: Private App Token or OAuth 2.0
- **Header**: `Authorization: Bearer {access_token}`
- **Get token**: Settings > Integrations > Private Apps

## Common Agent Operations

### Get contacts

```bash
GET https://api.hubapi.com/crm/v3/objects/contacts?limit=10

Authorization: Bearer {access_token}
```

### Search contacts

```bash
POST https://api.hubapi.com/crm/v3/objects/contacts/search

{
  "filterGroups": [{
    "filters": [{
      "propertyName": "email",
      "operator": "EQ",
      "value": "user@example.com"
    }]
  }]
}
```

### Create contact

```bash
POST https://api.hubapi.com/crm/v3/objects/contacts

{
  "properties": {
    "email": "user@example.com",
    "firstname": "John",
    "lastname": "Doe",
    "company": "Example Inc"
  }
}
```

### Update contact

```bash
PATCH https://api.hubapi.com/crm/v3/objects/contacts/{contact_id}

{
  "properties": {
    "lifecyclestage": "customer"
  }
}
```

### Get deals

```bash
GET https://api.hubapi.com/crm/v3/objects/deals?limit=10&properties=dealname,amount,dealstage

Authorization: Bearer {access_token}
```

### Create deal

```bash
POST https://api.hubapi.com/crm/v3/objects/deals

{
  "properties": {
    "dealname": "New Deal",
    "amount": "10000",
    "dealstage": "appointmentscheduled",
    "pipeline": "default"
  }
}
```

### Associate contact with deal

```bash
PUT https://api.hubapi.com/crm/v3/objects/deals/{deal_id}/associations/contacts/{contact_id}/deal_to_contact
```

### Get form submissions

```bash
GET https://api.hubapi.com/form-integrations/v1/submissions/forms/{form_guid}

Authorization: Bearer {access_token}
```

### Get marketing emails

```bash
GET https://api.hubapi.com/marketing/v3/emails?limit=10

Authorization: Bearer {access_token}
```

## CLI Commands

```bash
# Install
npm install -g @hubspot/cli

# Initialize project
hs init

# Upload files
hs upload src dest

# Watch for changes
hs watch src dest

# List portals
hs accounts list
```

## Key Objects

- **Contacts** - People in CRM
- **Companies** - Organizations
- **Deals** - Sales opportunities
- **Tickets** - Support tickets
- **Products** - Items for sale
- **Line Items** - Deal line items

## Common Properties

### Contact Properties
- `email` - Email address
- `firstname`, `lastname` - Name
- `lifecyclestage` - Funnel stage
- `hs_lead_status` - Lead status

### Deal Properties
- `dealname` - Deal name
- `amount` - Deal value
- `dealstage` - Pipeline stage
- `closedate` - Expected close

## When to Use

- Managing contacts and leads
- Tracking sales deals
- Marketing automation
- Form submissions
- Email campaigns
- Customer service tickets

## Rate Limits

- 100 requests per 10 seconds
- Higher limits on enterprise plans

## Relevant Skills

- email-sequence
- analytics-tracking
- referral-program
