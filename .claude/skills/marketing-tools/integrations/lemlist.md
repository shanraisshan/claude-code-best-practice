# Lemlist

Cold email outreach platform with personalization and campaign management.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API for campaigns, leads, activities, webhooks |
| MCP | - | Not available |
| CLI | [✓](../clis/lemlist.js) | Zero-dependency Node.js CLI |
| SDK | - | API-only |

## Authentication

- **Type**: Basic Auth (empty username, API key as password)
- **Header**: `Authorization: Basic base64(:api_key)`
- **Env var**: `LEMLIST_API_KEY`
- **Get key**: [Lemlist Settings > Integrations](https://app.lemlist.com/settings/integrations)

## Common Agent Operations

### List campaigns

```bash
node tools/clis/lemlist.js campaigns list --offset 0 --limit 20
```

### Get campaign details and stats

```bash
# Get campaign
node tools/clis/lemlist.js campaigns get --id cam_abc123

# Get campaign stats
node tools/clis/lemlist.js campaigns stats --id cam_abc123

# Export campaign data
node tools/clis/lemlist.js campaigns export --id cam_abc123
```

### Manage leads in a campaign

```bash
# List leads
node tools/clis/lemlist.js leads list --campaign-id cam_abc123

# Add a lead
node tools/clis/lemlist.js leads add --campaign-id cam_abc123 --email john@example.com --first-name John --last-name Doe --company "Example Inc"

# Get lead details
node tools/clis/lemlist.js leads get --campaign-id cam_abc123 --email john@example.com

# Remove a lead
node tools/clis/lemlist.js leads delete --campaign-id cam_abc123 --email john@example.com
```

### Manage unsubscribes

```bash
# List unsubscribed emails
node tools/clis/lemlist.js unsubscribes list

# Add to unsubscribe list
node tools/clis/lemlist.js unsubscribes add --email john@example.com

# Remove from unsubscribe list
node tools/clis/lemlist.js unsubscribes delete --email john@example.com
```

### View activities

```bash
# All activities
node tools/clis/lemlist.js activities list

# Filter by campaign and type
node tools/clis/lemlist.js activities list --campaign-id cam_abc123 --type emailsOpened
```

### Manage webhooks

```bash
# List hooks
node tools/clis/lemlist.js hooks list

# Create a webhook
node tools/clis/lemlist.js hooks create --target-url https://example.com/webhook --event emailsOpened

# Delete a webhook
node tools/clis/lemlist.js hooks delete --id hook_123
```

### Team info

```bash
node tools/clis/lemlist.js team info
```

## Rate Limits

- API rate limits vary by plan
- Recommended: stay under 10 requests/second

## Use Cases

- **Link building outreach**: Add prospects to campaigns for backlink requests
- **Campaign management**: Monitor open/reply rates across outreach campaigns
- **Lead management**: Add, remove, and track leads across campaigns
- **Webhook integration**: Get real-time notifications for email events
