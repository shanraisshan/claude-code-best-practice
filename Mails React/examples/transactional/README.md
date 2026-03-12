# Transactional Email Examples

Comprehensive transactional email patterns: order confirmations, payment confirmations, password resets, and notifications.

## Overview

This example demonstrates:
- Building rich transactional email templates
- Dynamic content and itemization (orders, invoices)
- Action-oriented CTAs with tracking links
- Responsive tables for order details
- Status indicators and timelines
- Integration with Resend and data sources

## File Structure

```
transactional/
├── OrderConfirmation.tsx      # Order confirmation with items
├── PaymentConfirmation.tsx    # Payment receipt and details
├── PasswordReset.tsx          # Password reset flow
├── InvoiceEmail.tsx           # Invoice with line items
├── ShippingNotification.tsx    # Shipping status update
├── preview.tsx                # Preview server for all templates
└── send.ts                    # Resend integration functions
```

## 1. Order Confirmation

**Complete order confirmation with itemized details:**

```typescript
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  image?: string;
}

interface OrderConfirmationProps {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  trackingUrl: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderNumber,
  customerName,
  customerEmail,
  orderDate,
  items,
  subtotal,
  tax,
  shipping,
  total,
  trackingUrl,
  shippingAddress,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Order {orderNumber} confirmed</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerSection}>
            <Row>
              <Column>
                <Text style={headerGreeting}>Order Confirmed!</Text>
                <Text style={headerSubtext}>Order #{orderNumber}</Text>
              </Column>
              <Column style={{ textAlign: 'right' }}>
                <Text style={headerDate}>{orderDate}</Text>
              </Column>
            </Row>
          </Section>

          {/* Order Summary */}
          <Section style={section}>
            <Text style={sectionTitle}>Order Summary</Text>
            <Text style={paragraph}>
              Hi {customerName},
            </Text>
            <Text style={paragraph}>
              Your order has been received and confirmed. Here's a summary of what you ordered.
            </Text>
          </Section>

          {/* Items Table */}
          <Section style={tableSection}>
            <table style={table} cellPadding="0" cellSpacing="0">
              <thead>
                <tr style={tableHeaderRow}>
                  <th style={tableHeader}>Product</th>
                  <th style={{ ...tableHeader, textAlign: 'center' }}>Qty</th>
                  <th style={{ ...tableHeader, textAlign: 'right' }}>Price</th>
                  <th style={{ ...tableHeader, textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={tableRow}>
                    <td style={tableCell}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {item.image && (
                          <Img
                            src={item.image}
                            width="40"
                            height="40"
                            alt={item.name}
                            style={productImage}
                          />
                        )}
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td style={{ ...tableCell, textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ ...tableCell, textAlign: 'right' }}>
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td style={{ ...tableCell, textAlign: 'right', fontWeight: '600' }}>
                      ${item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Price Summary */}
            <Section style={priceSummary}>
              <Row>
                <Column style={{ width: '60%' }} />
                <Column style={{ width: '40%' }}>
                  <Row>
                    <Column style={{ width: '70%' }}>
                      <Text style={priceLabel}>Subtotal:</Text>
                    </Column>
                    <Column style={{ width: '30%', textAlign: 'right' }}>
                      <Text style={priceValue}>${subtotal.toFixed(2)}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={{ width: '70%' }}>
                      <Text style={priceLabel}>Tax:</Text>
                    </Column>
                    <Column style={{ width: '30%', textAlign: 'right' }}>
                      <Text style={priceValue}>${tax.toFixed(2)}</Text>
                    </Column>
                  </Row>
                  <Row>
                    <Column style={{ width: '70%' }}>
                      <Text style={priceLabel}>Shipping:</Text>
                    </Column>
                    <Column style={{ width: '30%', textAlign: 'right' }}>
                      <Text style={priceValue}>${shipping.toFixed(2)}</Text>
                    </Column>
                  </Row>
                  <Row style={totalRow}>
                    <Column style={{ width: '70%' }}>
                      <Text style={priceTotal}>Total:</Text>
                    </Column>
                    <Column style={{ width: '30%', textAlign: 'right' }}>
                      <Text style={priceTotalValue}>${total.toFixed(2)}</Text>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Shipping Address */}
          <Section style={section}>
            <Text style={sectionTitle}>Shipping Address</Text>
            <Text style={addressText}>
              {shippingAddress.street}
              <br />
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
              <br />
              {shippingAddress.country}
            </Text>
          </Section>

          {/* CTA */}
          <Section style={ctaSection}>
            <Button style={primaryButton} href={trackingUrl}>
              Track Your Order
            </Button>
          </Section>

          {/* What's Next */}
          <Section style={section}>
            <Text style={sectionTitle}>What Happens Next?</Text>
            <ul style={timeline}>
              <li style={timelineItem}>
                <Text style={timelineText}>
                  <strong>Processing:</strong> Your order is being prepared
                </Text>
              </li>
              <li style={timelineItem}>
                <Text style={timelineText}>
                  <strong>Shipping:</strong> We'll send a tracking update when it ships
                </Text>
              </li>
              <li style={timelineItem}>
                <Text style={timelineText}>
                  <strong>Delivery:</strong> Track your package in real-time
                </Text>
              </li>
            </ul>
          </Section>

          {/* Support */}
          <Section style={supportSection}>
            <Text style={supportText}>
              Questions? Check our{' '}
              <Link href="https://example.com/faq" style={link}>
                FAQ
              </Link>
              {' or '}
              <Link href="mailto:support@example.com" style={link}>
                contact us
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2024 Your Company. All rights reserved. | {customerEmail}
            </Text>
            <Text style={footerLinks}>
              <Link href="https://example.com/privacy" style={link}>
                Privacy
              </Link>
              {' • '}
              <Link href="https://example.com/terms" style={link}>
                Terms
              </Link>
              {' • '}
              <Link href="https://example.com/unsubscribe" style={link}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const headerSection = {
  backgroundColor: '#f3f4f6',
  padding: '24px 32px',
  borderBottom: '1px solid #e5e7eb',
};

const headerGreeting = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 4px 0',
};

const headerSubtext = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0',
};

const headerDate = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0',
  textAlign: 'right' as const,
};

const section = {
  padding: '24px 32px',
  borderBottom: '1px solid #e5e7eb',
};

const sectionTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 12px 0',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#525252',
  margin: '0 0 8px 0',
};

const tableSection = {
  padding: '24px 32px',
  borderBottom: '1px solid #e5e7eb',
};

const table = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const tableHeaderRow = {
  borderBottom: '2px solid #e5e7eb',
};

const tableHeader = {
  padding: '12px 0',
  fontSize: '13px',
  fontWeight: '600',
  color: '#6b7280',
  textAlign: 'left' as const,
};

const tableRow = {
  borderBottom: '1px solid #e5e7eb',
};

const tableCell = {
  padding: '16px 0',
  fontSize: '14px',
  color: '#525252',
};

const productImage = {
  borderRadius: '4px',
  objectFit: 'cover' as const,
};

const priceSummary = {
  paddingTop: '12px',
};

const priceLabel = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '8px 0',
};

const priceValue = {
  fontSize: '14px',
  color: '#525252',
  fontWeight: '500',
  margin: '8px 0',
};

const totalRow = {
  borderTop: '2px solid #e5e7eb',
  paddingTop: '12px',
};

const priceTotal = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0',
};

const priceTotalValue = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#2563eb',
  margin: '0',
};

const ctaSection = {
  padding: '24px 32px',
  textAlign: 'center' as const,
};

const primaryButton = {
  backgroundColor: '#2563eb',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600',
  padding: '12px 28px',
  textDecoration: 'none',
};

const timeline = {
  marginLeft: '20px',
  paddingLeft: '0',
};

const timelineItem = {
  marginBottom: '12px',
};

const timelineText = {
  fontSize: '14px',
  color: '#525252',
  margin: '0',
};

const supportSection = {
  padding: '24px 32px',
  backgroundColor: '#f9fafb',
  borderBottom: '1px solid #e5e7eb',
};

const supportText = {
  fontSize: '14px',
  color: '#525252',
  margin: '0',
  lineHeight: '1.5',
};

const footer = {
  padding: '24px 32px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0 0 8px 0',
};

const footerLinks = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0',
};

const link = {
  color: '#2563eb',
  textDecoration: 'underline',
};

const addressText = {
  fontSize: '14px',
  color: '#525252',
  lineHeight: '1.6',
  margin: '0',
};
```

## 2. Payment Confirmation

**Payment receipt with transaction details:**

```typescript
interface PaymentConfirmationProps {
  customerName: string;
  customerEmail: string;
  transactionId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  timestamp: string;
  invoiceUrl: string;
}

export const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  customerName,
  customerEmail,
  transactionId,
  amount,
  currency,
  paymentMethod,
  timestamp,
  invoiceUrl,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Payment received</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={successIcon}>✓</Text>
            <Text style={headerText}>Payment Received</Text>
            <Text style={headerSubtext}>Transaction ID: {transactionId}</Text>
          </Section>

          <Section style={content}>
            <Text style={greeting}>Hi {customerName},</Text>
            <Text style={paragraph}>
              We've successfully received your payment. Your transaction is complete.
            </Text>

            <Section style={receiptBox}>
              <Row>
                <Column style={{ width: '50%' }}>
                  <Text style={labelText}>Amount</Text>
                  <Text style={valueText}>
                    {currency} {amount.toFixed(2)}
                  </Text>
                </Column>
                <Column style={{ width: '50%' }}>
                  <Text style={labelText}>Payment Method</Text>
                  <Text style={valueText}>{paymentMethod}</Text>
                </Column>
              </Row>

              <Row style={{ marginTop: '16px' }}>
                <Column style={{ width: '50%' }}>
                  <Text style={labelText}>Date & Time</Text>
                  <Text style={valueText}>{timestamp}</Text>
                </Column>
                <Column style={{ width: '50%' }}>
                  <Text style={labelText}>Status</Text>
                  <Text style={{ ...valueText, color: '#059669' }}>Completed</Text>
                </Column>
              </Row>
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={invoiceUrl}>
                Download Invoice
              </Button>
            </Section>

            <Text style={supportText}>
              For billing inquiries, please{' '}
              <Link href="mailto:billing@example.com" style={link}>
                contact our billing team
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
```

## 3. Password Reset

**Secure password reset email with expiration:**

```typescript
interface PasswordResetProps {
  userName: string;
  resetUrl: string;
  expiresIn: number; // hours
  ipAddress?: string;
  timestamp?: string;
}

export const PasswordReset: React.FC<PasswordResetProps> = ({
  userName,
  resetUrl,
  expiresIn,
  ipAddress,
  timestamp,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={warningSection}>
            <Text style={warningIcon}>⚠️</Text>
            <Text style={warningTitle}>Password Reset Request</Text>
            <Text style={warningText}>
              We received a request to reset the password for your account.
            </Text>
          </Section>

          <Section style={content}>
            <Text style={greeting}>Hi {userName},</Text>

            <Text style={paragraph}>
              Click the button below to reset your password. This link expires in {expiresIn} hours.
            </Text>

            <Section style={buttonContainer}>
              <Button style={resetButton} href={resetUrl}>
                Reset Password
              </Button>
            </Section>

            <Text style={copyLinkText}>
              Or copy this link: <Link href={resetUrl} style={link}>{resetUrl}</Link>
            </Text>

            {ipAddress && (
              <Section style={infoBox}>
                <Text style={infoText}>
                  This request was initiated from IP: {ipAddress} at {timestamp}
                </Text>
              </Section>
            )}

            <Text style={warningHighlight}>
              If you didn't request this, ignore this email or{' '}
              <Link href="https://example.com/security" style={link}>
                secure your account immediately
              </Link>
              .
            </Text>

            <Text style={securityTip}>
              Never share this link with anyone. We'll never ask for your password via email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
```

## Resend Integration

**Send transactional emails via Resend:**

```typescript
// send.ts
import { Resend } from 'resend';
import { render } from 'react-email';
import { OrderConfirmation } from './OrderConfirmation';
import { PaymentConfirmation } from './PaymentConfirmation';
import { PasswordReset } from './PasswordReset';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(
  orderData: OrderConfirmationProps,
) {
  const html = render(<OrderConfirmation {...orderData} />);

  return resend.emails.send({
    from: `orders@${process.env.RESEND_DOMAIN}`,
    to: orderData.customerEmail,
    subject: `Order Confirmation - Order #${orderData.orderNumber}`,
    html,
  });
}

export async function sendPaymentConfirmation(
  paymentData: PaymentConfirmationProps,
) {
  const html = render(<PaymentConfirmation {...paymentData} />);

  return resend.emails.send({
    from: `receipts@${process.env.RESEND_DOMAIN}`,
    to: paymentData.customerEmail,
    subject: `Payment Receipt - Transaction #${paymentData.transactionId}`,
    html,
  });
}

export async function sendPasswordResetEmail(
  resetData: PasswordResetProps,
  userEmail: string,
) {
  const html = render(<PasswordReset {...resetData} />);

  return resend.emails.send({
    from: `security@${process.env.RESEND_DOMAIN}`,
    to: userEmail,
    subject: 'Reset Your Password',
    html,
  });
}
```

## Usage Examples

```typescript
// Order confirmation flow
import { sendOrderConfirmation } from '@/emails/transactional/send';

async function completeOrder(order: Order) {
  // ... process order

  await sendOrderConfirmation({
    orderNumber: order.id,
    customerName: order.customer.name,
    customerEmail: order.customer.email,
    orderDate: new Date().toLocaleDateString(),
    items: order.items.map(item => ({
      id: item.id,
      name: item.product.name,
      quantity: item.quantity,
      unitPrice: item.product.price,
      total: item.quantity * item.product.price,
      image: item.product.image,
    })),
    subtotal: order.subtotal,
    tax: order.tax,
    shipping: order.shipping,
    total: order.total,
    trackingUrl: `https://app.example.com/orders/${order.id}/track`,
    shippingAddress: order.shippingAddress,
  });
}
```

## Best Practices

1. **Immediate Sending** - Send transactional emails immediately
2. **Retry Logic** - Implement exponential backoff for failures
3. **Audit Logging** - Log all transactional emails for compliance
4. **Dynamic Content** - Always include order/transaction details
5. **Status Updates** - Send follow-up emails for order progression
6. **Unsubscribe Optional** - Transactional emails don't require unsubscribe link (though recommended)
7. **Testing** - Use preview server for all variations before sending

## Related Examples

- See `welcome-email/` for signup confirmation sequence
- See `marketing/` for promotional and newsletter emails
