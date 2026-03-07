---
name: stripe-integration
description: "Stripe integration patterns for SaaS backends — checkout, subscriptions, webhooks, customer portal, metered billing, and idempotent API calls. Use when the user mentions 'Stripe,' 'payments,' 'subscriptions,' 'checkout,' 'billing,' 'invoices,' 'webhooks,' 'customer portal,' or 'metered billing.'"
---

# Stripe Integration Patterns

Complete Stripe integration guide for SaaS backends. Covers checkout, subscriptions, webhooks, customer portal, metered billing, and production hardening.

## Setup & Authentication

### Environment Variables

```bash
STRIPE_SECRET_KEY=sk_test_xxx        # Server-side only
STRIPE_PUBLISHABLE_KEY=pk_test_xxx   # Client-side safe
STRIPE_WEBHOOK_SECRET=whsec_xxx      # Webhook signature verification
STRIPE_PRICE_ID_PRO=price_xxx        # Price IDs per plan
STRIPE_PRICE_ID_TEAM=price_xxx
```

### SDK Initialization

```typescript
// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})
```

```python
# lib/stripe.py
import stripe

stripe.api_key = os.environ["STRIPE_SECRET_KEY"]
```

## Checkout Flow

### Create Checkout Session (Server)

```typescript
export async function createCheckoutSession(
  userId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  // Find or create Stripe customer
  let customerId = await getStripeCustomerId(userId)

  if (!customerId) {
    const user = await getUser(userId)
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId },
    })
    customerId = customer.id
    await saveStripeCustomerId(userId, customerId)
  }

  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: { userId },
    },
    allow_promotion_codes: true,
  })
}
```

```python
# FastAPI equivalent
@router.post("/checkout")
async def create_checkout(request: CheckoutRequest, user: User = Depends(get_current_user)):
    customer_id = await get_or_create_stripe_customer(user)

    session = stripe.checkout.Session.create(
        customer=customer_id,
        mode="subscription",
        line_items=[{"price": request.price_id, "quantity": 1}],
        success_url=f"{request.success_url}?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=request.cancel_url,
        subscription_data={"metadata": {"user_id": str(user.id)}},
        allow_promotion_codes=True,
    )
    return {"url": session.url}
```

### Verify Checkout Completion

```typescript
// After redirect to success_url
export async function verifyCheckout(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['subscription', 'customer'],
  })

  if (session.payment_status !== 'paid') {
    throw new Error('Payment not completed')
  }

  return {
    customerId: session.customer as string,
    subscriptionId: (session.subscription as Stripe.Subscription).id,
    status: (session.subscription as Stripe.Subscription).status,
  }
}
```

## Webhook Handling

### Webhook Endpoint (Critical)

```typescript
// app/api/webhooks/stripe/route.ts (Next.js App Router)
import { headers } from 'next/headers'

export async function POST(request: Request) {
  const body = await request.text()
  const sig = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed')
    return new Response('Invalid signature', { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice)
        break
    }
  } catch (err) {
    console.error(`Webhook handler error for ${event.type}:`, err)
    return new Response('Webhook handler error', { status: 500 })
  }

  return new Response('ok', { status: 200 })
}
```

```python
# FastAPI webhook endpoint
@router.post("/webhooks/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig, os.environ["STRIPE_WEBHOOK_SECRET"]
        )
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    handler = WEBHOOK_HANDLERS.get(event["type"])
    if handler:
        await handler(event["data"]["object"])

    return {"status": "ok"}

WEBHOOK_HANDLERS = {
    "checkout.session.completed": handle_checkout_completed,
    "customer.subscription.updated": handle_subscription_updated,
    "customer.subscription.deleted": handle_subscription_deleted,
    "invoice.payment_failed": handle_payment_failed,
    "invoice.paid": handle_invoice_paid,
}
```

### Webhook Handler Implementations

```typescript
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  if (!userId) return

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  )

  await db.user.update({
    where: { id: userId },
    data: {
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: subscription.id,
      plan: getPlanFromPriceId(subscription.items.data[0].price.id),
      subscriptionStatus: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  if (!userId) return

  await db.user.update({
    where: { id: userId },
    data: {
      plan: getPlanFromPriceId(subscription.items.data[0].price.id),
      subscriptionStatus: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId
  if (!userId) return

  await db.user.update({
    where: { id: userId },
    data: {
      plan: 'free',
      subscriptionStatus: 'canceled',
      stripeSubscriptionId: null,
    },
  })
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  })

  if (user) {
    await sendEmail(user.email, 'payment-failed', {
      invoiceUrl: invoice.hosted_invoice_url,
      attemptCount: invoice.attempt_count,
    })
  }
}
```

## Customer Portal

```typescript
export async function createPortalSession(customerId: string, returnUrl: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}

// API route
export async function POST(request: Request) {
  const user = await requireAuth(request)

  if (!user.stripeCustomerId) {
    return NextResponse.json({ error: 'No billing account' }, { status: 400 })
  }

  const session = await createPortalSession(
    user.stripeCustomerId,
    `${process.env.NEXT_PUBLIC_URL}/account`
  )

  return NextResponse.json({ url: session.url })
}
```

## Subscription Helpers

### Check Access / Entitlements

```typescript
export function hasActiveSubscription(user: {
  subscriptionStatus: string | null
  currentPeriodEnd: Date | null
}): boolean {
  if (!user.subscriptionStatus || !user.currentPeriodEnd) return false

  return (
    ['active', 'trialing'].includes(user.subscriptionStatus) &&
    user.currentPeriodEnd > new Date()
  )
}

export function getPlanLimits(plan: string) {
  const limits: Record<string, { projects: number; apiCalls: number }> = {
    free:  { projects: 3,   apiCalls: 1000 },
    pro:   { projects: 50,  apiCalls: 50000 },
    team:  { projects: -1,  apiCalls: 500000 },  // -1 = unlimited
  }
  return limits[plan] ?? limits.free
}
```

### Plan Mapping

```typescript
const PRICE_TO_PLAN: Record<string, string> = {
  [process.env.STRIPE_PRICE_ID_PRO!]: 'pro',
  [process.env.STRIPE_PRICE_ID_TEAM!]: 'team',
}

function getPlanFromPriceId(priceId: string): string {
  return PRICE_TO_PLAN[priceId] ?? 'free'
}
```

## Metered / Usage-Based Billing

```typescript
// Report usage for metered subscriptions
export async function reportUsage(
  subscriptionItemId: string,
  quantity: number
) {
  return stripe.subscriptionItems.createUsageRecord(subscriptionItemId, {
    quantity,
    timestamp: Math.floor(Date.now() / 1000),
    action: 'increment',
  })
}

// Example: track API calls
export async function trackApiUsage(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user?.stripeSubscriptionId) return

  const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId)
  const meteredItem = subscription.items.data.find(
    item => item.price.recurring?.usage_type === 'metered'
  )

  if (meteredItem) {
    await reportUsage(meteredItem.id, 1)
  }
}
```

## Production Hardening

### Idempotency Keys

```typescript
// Prevent duplicate charges on retries
const session = await stripe.checkout.sessions.create(
  { /* params */ },
  { idempotencyKey: `checkout_${userId}_${Date.now()}` }
)
```

### Webhook Idempotency

```typescript
// Deduplicate webhook events
async function isEventProcessed(eventId: string): Promise<boolean> {
  const existing = await db.processedEvent.findUnique({
    where: { stripeEventId: eventId },
  })
  return !!existing
}

// In webhook handler, before processing:
if (await isEventProcessed(event.id)) {
  return new Response('Already processed', { status: 200 })
}

// After successful processing:
await db.processedEvent.create({
  data: { stripeEventId: event.id, processedAt: new Date() },
})
```

### Database Schema

```sql
-- Users table with Stripe fields
ALTER TABLE users ADD COLUMN stripe_customer_id TEXT UNIQUE;
ALTER TABLE users ADD COLUMN stripe_subscription_id TEXT;
ALTER TABLE users ADD COLUMN plan TEXT DEFAULT 'free';
ALTER TABLE users ADD COLUMN subscription_status TEXT;
ALTER TABLE users ADD COLUMN current_period_end TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN cancel_at_period_end BOOLEAN DEFAULT false;

-- Processed webhook events (idempotency)
CREATE TABLE processed_stripe_events (
  stripe_event_id TEXT PRIMARY KEY,
  processed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX idx_users_subscription_status ON users(subscription_status);
```

## CLI Testing

```bash
# Listen to webhooks locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
stripe trigger invoice.payment_failed

# Inspect resources
stripe customers list --limit 5
stripe subscriptions list --customer cus_xxx
stripe invoices list --customer cus_xxx --limit 5
```

## Key Webhook Events

| Event | When | Action |
|-------|------|--------|
| `checkout.session.completed` | Successful checkout | Provision access, save subscription |
| `customer.subscription.created` | New subscription | Update user plan |
| `customer.subscription.updated` | Plan change, renewal | Update entitlements |
| `customer.subscription.deleted` | Cancellation effective | Revoke access |
| `invoice.payment_failed` | Payment failed | Notify user, start dunning |
| `invoice.paid` | Invoice paid | Confirm, extend access |
| `customer.subscription.trial_will_end` | 3 days before trial ends | Send conversion email |

## Common Pitfalls

1. **Raw body required** — Webhook verification needs the raw request body, not parsed JSON. In Next.js App Router, use `request.text()`. In Express, use `express.raw()` middleware.
2. **Return 200 quickly** — Stripe retries on 4xx/5xx. Do heavy processing async after acknowledging.
3. **Handle out-of-order events** — Use `subscription.status` as source of truth, not event order.
4. **Test with Stripe CLI** — Always test webhooks locally before deploying.
5. **Metadata for linking** — Store `userId` in subscription/customer metadata to link back to your DB.
