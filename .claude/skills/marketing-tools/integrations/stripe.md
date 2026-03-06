# Stripe

Payment processing, subscriptions, and billing for internet businesses.

## Capabilities

| Integration | Available | Notes |
|-------------|-----------|-------|
| API | ✓ | Comprehensive REST API |
| MCP | ✓ | Available via Stripe MCP server |
| CLI | ✓ | `stripe` CLI for testing and webhooks |
| SDK | ✓ | Official SDKs for most languages |

## Authentication

- **Type**: API Key
- **Header**: `Authorization: Bearer sk_live_xxx` or `sk_test_xxx`
- **Keys**: Secret key (server), Publishable key (client)

## Common Agent Operations

### List customers

```bash
GET https://api.stripe.com/v1/customers?limit=10
```

### Get customer by email

```bash
GET https://api.stripe.com/v1/customers?email=user@example.com
```

### Get subscription

```bash
GET https://api.stripe.com/v1/subscriptions/{subscription_id}
```

### List subscriptions for customer

```bash
GET https://api.stripe.com/v1/subscriptions?customer={customer_id}
```

### Create checkout session

```bash
POST https://api.stripe.com/v1/checkout/sessions

customer={customer_id}
&line_items[0][price]={price_id}
&line_items[0][quantity]=1
&mode=subscription
&success_url=https://example.com/success
&cancel_url=https://example.com/cancel
```

### Create customer portal session

```bash
POST https://api.stripe.com/v1/billing_portal/sessions

customer={customer_id}
&return_url=https://example.com/account
```

### List recent invoices

```bash
GET https://api.stripe.com/v1/invoices?customer={customer_id}&limit=10
```

### Get payment intent

```bash
GET https://api.stripe.com/v1/payment_intents/{payment_intent_id}
```

## Webhook Events

Key events to handle:

| Event | When | Action |
|-------|------|--------|
| `checkout.session.completed` | Successful checkout | Provision access |
| `customer.subscription.created` | New subscription | Update user record |
| `customer.subscription.updated` | Plan change | Update entitlements |
| `customer.subscription.deleted` | Cancellation | Revoke access |
| `invoice.payment_failed` | Payment failed | Notify user, retry |
| `invoice.paid` | Invoice paid | Confirm payment |

### Verify webhook signature

```javascript
const event = stripe.webhooks.constructEvent(
  payload,
  sig,
  webhookSecret
);
```

## CLI Commands

```bash
# Listen to webhooks locally
stripe listen --forward-to localhost:3000/webhooks

# Trigger test events
stripe trigger checkout.session.completed

# List recent events
stripe events list --limit 10

# Get resource
stripe customers retrieve cus_xxx
```

## Key Objects

- **Customer** - User billing profile
- **Subscription** - Recurring billing
- **Price** - Pricing configuration
- **Product** - What you sell
- **Invoice** - Billing document
- **PaymentIntent** - One-time payment
- **Checkout Session** - Hosted payment page

## When to Use

- Processing payments
- Managing subscriptions
- Creating checkout flows
- Handling billing portal
- Querying customer data
- Revenue analytics

## Rate Limits

- 100 read requests per second
- 100 write requests per second
- Higher limits available on request

## Relevant Skills

- pricing-strategy
- referral-program (Stripe-integrated affiliate tools)
- analytics-tracking (revenue tracking)
