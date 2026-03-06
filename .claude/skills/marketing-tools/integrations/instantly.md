# Instantly.ai

Cold email platform with built-in email warmup and campaign management at scale.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API for campaigns, leads, accounts, analytics |
| MCP | - | Not available |
| CLI | [✓](../clis/instantly.js) | Zero-dependency Node.js CLI |
| SDK | - | API-only |

## Authentication

- **Type**: API Key (query parameter)
- **Parameter**: `api_key={key}`
- **Env var**: `INSTANTLY_API_KEY`
- **Get key**: [Instantly Settings > Integrations > API](https://app.instantly.ai/app/settings/integrations)

## Common Agent Operations

### Manage campaigns

```bash
# List campaigns
node tools/clis/instantly.js campaigns list --limit 20

# Get campaign details
node tools/clis/instantly.js campaigns get --id cam_abc123

# Check campaign status
node tools/clis/instantly.js campaigns status --id cam_abc123

# Launch a campaign
node tools/clis/instantly.js campaigns launch --id cam_abc123

# Pause a campaign
node tools/clis/instantly.js campaigns pause --id cam_abc123
```

### Manage leads

```bash
# List leads in a campaign
node tools/clis/instantly.js leads list --campaign-id cam_abc123 --limit 50

# Add a lead
node tools/clis/instantly.js leads add --campaign-id cam_abc123 --email john@example.com --first-name John --last-name Doe --company "Example Inc"

# Delete a lead
node tools/clis/instantly.js leads delete --campaign-id cam_abc123 --email john@example.com

# Check lead status
node tools/clis/instantly.js leads status --campaign-id cam_abc123 --email john@example.com
```

### Manage email accounts

```bash
# List connected accounts
node tools/clis/instantly.js accounts list --limit 20

# Check account status
node tools/clis/instantly.js accounts status --account-id me@example.com

# Check warmup status
node tools/clis/instantly.js accounts warmup-status --account-id me@example.com
```

### View analytics

```bash
# Campaign analytics
node tools/clis/instantly.js analytics campaign --campaign-id cam_abc123 --start 2024-01-01 --end 2024-01-31

# Step-by-step analytics
node tools/clis/instantly.js analytics steps --campaign-id cam_abc123

# Account-level analytics
node tools/clis/instantly.js analytics account --start 2024-01-01 --end 2024-01-31
```

### Manage blocklist

```bash
# List blocked emails/domains
node tools/clis/instantly.js blocklist list

# Add to blocklist
node tools/clis/instantly.js blocklist add --entries "competitor.com,spam@example.com"
```

## Rate Limits

- API rate limits vary by plan
- Recommended: stay under 10 requests/second

## Use Cases

- **Link building at scale**: Run large-volume outreach campaigns with built-in warmup
- **Campaign management**: Launch, pause, and monitor cold email campaigns
- **Account health**: Monitor email account warmup and deliverability
- **Analytics**: Track open rates, reply rates, and campaign performance
