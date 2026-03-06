# Mention Me

Enterprise referral marketing platform for customer advocacy.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API for referrals, customers, rewards |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | - | JavaScript widget for embedding |

## Authentication

- **Type**: API Key
- **Header**: `Authorization: Bearer {api_key}`
- **Environment**: Separate keys for sandbox and production

## Common Agent Operations

### Create referral offer

```bash
POST https://api.mention-me.com/api/v2/referrer-offer

{
  "email": "customer@example.com",
  "firstname": "John",
  "lastname": "Doe",
  "order_number": "ORD-123",
  "order_total": 99.99,
  "order_currency": "USD"
}
```

### Get referral link for customer

```bash
GET https://api.mention-me.com/api/v2/referrer/{customer_id}/share-links
```

### Record referee (referred customer)

```bash
POST https://api.mention-me.com/api/v2/referee

{
  "email": "referred@example.com",
  "firstname": "Jane",
  "referrer_code": "JOHN123",
  "order_number": "ORD-456",
  "order_total": 149.99
}
```

### Get referral status

```bash
GET https://api.mention-me.com/api/v2/referral/{referral_id}
```

### List referrals for customer

```bash
GET https://api.mention-me.com/api/v2/referrer/{customer_id}/referrals
```

### Get reward balance

```bash
GET https://api.mention-me.com/api/v2/referrer/{customer_id}/rewards
```

### Redeem reward

```bash
POST https://api.mention-me.com/api/v2/referrer/{customer_id}/rewards/redeem

{
  "reward_id": "RWD-123",
  "order_number": "ORD-789"
}
```

## JavaScript Widget

### Embed referral widget

```html
<div id="mmWrapper"></div>
<script>
  window.MentionMe = window.MentionMe || [];
  MentionMe.push({
    type: 'offer',
    customer: {
      email: 'customer@example.com',
      firstname: 'John',
      order_number: 'ORD-123'
    }
  });
</script>
<script src="https://tag.mention-me.com/client/{partner_code}.js" async></script>
```

### Name share widget

```javascript
MentionMe.push({
  type: 'nameShare',
  customer: {
    email: 'customer@example.com'
  }
});
```

## Webhook Events

| Event | When |
|-------|------|
| `referral.created` | New referral tracked |
| `referral.converted` | Referral completed purchase |
| `reward.earned` | Reward unlocked |
| `reward.redeemed` | Reward used |

## Key Features

- **A/B testing** - Built-in experiment framework
- **Fraud prevention** - Automatic fraud detection
- **Multi-channel** - Share via link, email, social
- **Name sharing** - Refer by name, not code
- **Segmentation** - Different offers by segment
- **Analytics** - Referral program reporting

## Key Objects

- **Referrer** - Customer who refers
- **Referee** - Customer who is referred
- **Referral** - Connection between referrer and referee
- **Offer** - Referral program configuration
- **Reward** - Incentive earned

## When to Use

- Enterprise referral programs
- Multi-market referral campaigns
- A/B testing referral offers
- Fraud-resistant referral tracking
- Name-based sharing programs

## Rate Limits

- 1000 requests per minute
- Contact for higher limits

## Relevant Skills

- referral-program
- pricing-strategy
- analytics-tracking
