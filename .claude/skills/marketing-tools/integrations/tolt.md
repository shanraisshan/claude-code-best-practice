# Tolt

Affiliate program management for SaaS, with Stripe and Paddle integration.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | REST API for affiliates, referrals, payouts |
| MCP | - | Not available |
| CLI | - | Not available |
| SDK | - | JavaScript snippet for tracking |

## Authentication

- **Type**: API Key
- **Header**: `Authorization: Bearer {api_key}`
- **Get key**: Settings > API in Tolt dashboard

## Common Agent Operations

### List affiliates

```bash
GET https://api.tolt.io/v1/affiliates
```

### Get affiliate

```bash
GET https://api.tolt.io/v1/affiliates/{affiliate_id}
```

### Create affiliate

```bash
POST https://api.tolt.io/v1/affiliates

{
  "email": "affiliate@example.com",
  "name": "John Doe"
}
```

### List referrals

```bash
GET https://api.tolt.io/v1/referrals?affiliate_id={affiliate_id}
```

### Get referral by customer

```bash
GET https://api.tolt.io/v1/referrals?customer_id={stripe_customer_id}
```

### List commissions

```bash
GET https://api.tolt.io/v1/commissions?affiliate_id={affiliate_id}
```

### Get payout history

```bash
GET https://api.tolt.io/v1/payouts?affiliate_id={affiliate_id}
```

### Update affiliate

```bash
PATCH https://api.tolt.io/v1/affiliates/{affiliate_id}

{
  "commission_rate": 30,
  "payout_method": "paypal",
  "paypal_email": "affiliate@paypal.com"
}
```

## JavaScript Tracking

### Install snippet

```html
<script src="https://cdn.tolt.io/tolt.js" data-tolt="YOUR_PUBLIC_KEY"></script>
```

### Track signup

```javascript
window.tolt.signup(stripeCustomerId);
```

### Identify existing customer

```javascript
window.tolt.identify(stripeCustomerId);
```

## Webhook Events

| Event | When |
|-------|------|
| `affiliate.created` | New affiliate registered |
| `affiliate.approved` | Affiliate approved |
| `referral.created` | New referral tracked |
| `referral.converted` | Referral converted to customer |
| `commission.created` | Commission earned |
| `payout.completed` | Payout sent |

## Key Features

- **Stripe native** - Automatic commission tracking
- **Paddle support** - Works with Paddle billing
- **Affiliate dashboard** - White-labeled portal
- **Payout automation** - PayPal and Wise payouts
- **Custom commission tiers** - Different rates per affiliate

## Key Objects

- **Affiliate** - Partner in your program
- **Referral** - Tracked conversion
- **Commission** - Earned affiliate payment
- **Payout** - Processed payment to affiliate
- **Program** - Campaign configuration

## When to Use

- Setting up SaaS affiliate programs
- Managing affiliate relationships
- Tracking Stripe or Paddle-based referrals
- Processing affiliate payouts
- Building affiliate dashboards

## Rate Limits

- 100 requests per minute
- Higher limits on enterprise plans

## Relevant Skills

- referral-program
- pricing-strategy
