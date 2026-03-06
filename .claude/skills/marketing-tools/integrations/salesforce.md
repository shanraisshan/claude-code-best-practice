# Salesforce

Enterprise CRM platform for sales, service, and marketing.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API, SOAP API, Bulk API |
| MCP | - | Not available |
| CLI | ✓ | Salesforce CLI (`sf`) |
| SDK | ✓ | JSforce, simple-salesforce, etc. |

## Authentication

- **Type**: OAuth 2.0 (Web Server Flow or JWT Bearer)
- **Header**: `Authorization: Bearer {access_token}`
- **Instance URL**: Use instance_url from auth response

## Common Agent Operations

### Query records (SOQL)

```bash
GET https://{instance}.salesforce.com/services/data/v59.0/query?q=SELECT+Id,Name,Email+FROM+Contact+LIMIT+10

Authorization: Bearer {access_token}
```

### Get record by ID

```bash
GET https://{instance}.salesforce.com/services/data/v59.0/sobjects/Contact/{record_id}

Authorization: Bearer {access_token}
```

### Create record

```bash
POST https://{instance}.salesforce.com/services/data/v59.0/sobjects/Contact

{
  "FirstName": "John",
  "LastName": "Doe",
  "Email": "john@example.com",
  "AccountId": "{account_id}"
}
```

### Update record

```bash
PATCH https://{instance}.salesforce.com/services/data/v59.0/sobjects/Contact/{record_id}

{
  "Title": "Senior Developer"
}
```

### Search records (SOSL)

```bash
GET https://{instance}.salesforce.com/services/data/v59.0/search?q=FIND+{searchTerm}+IN+ALL+FIELDS+RETURNING+Contact(Id,Name,Email)

Authorization: Bearer {access_token}
```

### Get opportunities

```bash
GET https://{instance}.salesforce.com/services/data/v59.0/query?q=SELECT+Id,Name,Amount,StageName,CloseDate+FROM+Opportunity+WHERE+IsClosed=false

Authorization: Bearer {access_token}
```

### Describe object

```bash
GET https://{instance}.salesforce.com/services/data/v59.0/sobjects/Contact/describe

Authorization: Bearer {access_token}
```

## CLI Commands

```bash
# Authenticate
sf org login web

# Query records
sf data query --query "SELECT Id, Name FROM Account LIMIT 10"

# Create record
sf data create record --sobject Account --values "Name='New Account'"

# Deploy metadata
sf project deploy start

# Run Apex
sf apex run --file script.apex
```

## SOQL Examples

```sql
-- Get contacts with accounts
SELECT Id, Name, Email, Account.Name
FROM Contact
WHERE Account.Industry = 'Technology'

-- Get opportunities by stage
SELECT StageName, COUNT(Id)
FROM Opportunity
GROUP BY StageName

-- Get recent leads
SELECT Id, Name, Company, Status
FROM Lead
WHERE CreatedDate = LAST_N_DAYS:30
ORDER BY CreatedDate DESC
```

## Key Objects

- **Lead** - Potential customer
- **Contact** - Person at account
- **Account** - Company/organization
- **Opportunity** - Sales deal
- **Case** - Support ticket
- **Campaign** - Marketing campaign

## When to Use

- Enterprise CRM operations
- Complex sales processes
- Multi-object relationships
- Custom object management
- Marketing campaign tracking

## Rate Limits

- 15,000 API calls per 24 hours (Enterprise)
- Higher limits available

## Relevant Skills

- email-sequence
- analytics-tracking
- paid-ads
