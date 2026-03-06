---
name: react-email-templates
description: React Email component patterns for building responsive email templates using JSX, component composition, and preview servers. Use when creating reusable email components, building responsive templates, setting up email preview environments, or integrating React Email with Resend for dynamic email content.
allowed-tools: Read, Write, Bash, Grep
---

# React Email Templates Skill

Comprehensive patterns and templates for building modern, responsive email templates using React Email components and JSX, with preview server setup and Resend integration.

## Use When

- Building reusable email components with React JSX
- Creating responsive email templates that work across clients
- Setting up React Email preview servers for development
- Integrating React Email with Resend for dynamic content
- Implementing welcome, transactional, and marketing emails
- Styling emails with Tailwind CSS via @react-email/components
- Testing email layouts before sending
- Creating component libraries for email templates

## Core Concepts

### What is React Email

React Email is a library for building responsive, maintainable emails using React components and JSX. It provides:

- **JSX Templates**: Write email templates as React components
- **Built-in Components**: Email-safe components (Container, Row, Column, Text, Image, etc.)
- **Styling**: Tailwind CSS support with safe subset for email clients
- **Preview Server**: Built-in development server to test email rendering
- **Type Safety**: Full TypeScript support for email props
- **Framework Agnostic**: Send emails with Resend, SendGrid, Nodemailer, etc.

### Installation

```bash
npm install react-email @react-email/components
# or
yarn add react-email @react-email/components
```

### Package Structure

```typescript
// Core React Email
import { render } from 'react-email';

// Components
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Font,
  Head as EmailHead,
} from '@react-email/components';
```

## Core Patterns

### 1. Basic Email Component

**Simple, responsive email template structure:**

```typescript
import { Body, Container, Head, Html, Preview, Section, Text } from '@react-email/components';

interface BasicEmailProps {
  userName: string;
  message: string;
}

export const BasicEmail: React.FC<BasicEmailProps> = ({ userName, message }) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our service, {userName}!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={heading}>Welcome, {userName}!</Text>
            <Text style={paragraph}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#1f2937',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#525252',
};
```

### 2. Welcome Email Template

**Complete welcome email with branding, CTA button, and footer:**

```typescript
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface WelcomeEmailProps {
  userName: string;
  userEmail: string;
  activationUrl: string;
  companyName?: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName,
  userEmail,
  activationUrl,
  companyName = 'Our Company',
}) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Geist"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://cdn.jsdelivr.net/npm/geist-font@1.0.0/dist/geist-mono.woff2',
            format: 'woff2',
          }}
        />
      </Head>
      <Preview>Welcome to {companyName}, {userName}!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Row>
              <Column>
                <Img src={`https://${process.env.VERCEL_URL}/logo.png`} width="40" height="40" alt={companyName} />
              </Column>
              <Column style={{ paddingLeft: '8px' }}>
                <Text style={headerText}>{companyName}</Text>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={heading}>Welcome to {companyName}!</Text>
            <Text style={paragraph}>
              Hi {userName},
            </Text>
            <Text style={paragraph}>
              Thank you for signing up. We're excited to have you on board. To get started, please verify your email address by clicking the button below.
            </Text>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Button style={button} href={activationUrl}>
                Verify Email Address
              </Button>
            </Section>

            <Text style={paragraph}>
              This link expires in 24 hours. If you didn't create this account, you can ignore this email.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Row>
              <Column>
                <Text style={footerText}>
                  {companyName} Inc. | {userEmail}
                </Text>
                <Text style={footerText}>
                  <Link href="https://example.com/unsubscribe" style={link}>
                    Unsubscribe
                  </Link>
                  {' | '}
                  <Link href="https://example.com/preferences" style={link}>
                    Preferences
                  </Link>
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const header = {
  padding: '20px 0',
  borderBottom: '1px solid #e5e7eb',
};

const headerText = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#1f2937',
};

const content = {
  padding: '32px 0',
};

const heading = {
  fontSize: '28px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#1f2937',
  marginBottom: '16px',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#525252',
  marginBottom: '12px',
};

const buttonContainer = {
  paddingTop: '16px',
  paddingBottom: '16px',
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600',
  padding: '12px 20px',
  textDecoration: 'none',
  textAlign: 'center' as const,
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '0',
};

const footer = {
  paddingTop: '24px',
  paddingBottom: '24px',
  borderTop: '1px solid #e5e7eb',
};

const footerText = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0 0 4px 0',
};

const link = {
  color: '#2563eb',
  textDecoration: 'underline',
};
```

### 3. Transactional Email - Order Confirmation

**Order confirmation email with itemized details and status tracking:**

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

interface OrderConfirmationProps {
  orderNumber: string;
  customerName: string;
  orderDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  trackingUrl: string;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderNumber,
  customerName,
  orderDate,
  items,
  subtotal,
  tax,
  shipping,
  total,
  trackingUrl,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Order {orderNumber} confirmed</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={heading}>Order Confirmation</Text>
            <Text style={subHeading}>Order #{orderNumber}</Text>
          </Section>

          {/* Customer Info */}
          <Section style={section}>
            <Text style={sectionHeading}>Thank you, {customerName}!</Text>
            <Text style={paragraph}>
              Your order has been received and will be processed shortly.
            </Text>
            <Text style={paragraph}>
              <strong>Order Date:</strong> {orderDate}
            </Text>
          </Section>

          {/* Order Items */}
          <Section style={section}>
            <Text style={sectionHeading}>Order Items</Text>
            <table style={table}>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td style={tableCell}>{item.name}</td>
                    <td style={{ ...tableCell, textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ ...tableCell, textAlign: 'right' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} style={tableCellRight}>
                    <strong>Subtotal:</strong>
                  </td>
                  <td style={tableCellRight}>${subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={2} style={tableCellRight}>
                    <strong>Tax:</strong>
                  </td>
                  <td style={tableCellRight}>${tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={2} style={tableCellRight}>
                    <strong>Shipping:</strong>
                  </td>
                  <td style={tableCellRight}>${shipping.toFixed(2)}</td>
                </tr>
                <tr style={totalRow}>
                  <td colSpan={2} style={{ ...tableCellRight, color: '#ffffff' }}>
                    <strong>Total:</strong>
                  </td>
                  <td style={{ ...tableCellRight, color: '#ffffff' }}>
                    <strong>${total.toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Tracking */}
          <Section style={section}>
            <Button style={button} href={trackingUrl}>
              Track Your Order
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Questions? Contact us at support@example.com
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
  marginBottom: '64px',
};

const header = {
  padding: '20px 24px',
  backgroundColor: '#f3f4f6',
  borderBottom: '1px solid #e5e7eb',
};

const heading = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 4px 0',
};

const subHeading = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0',
};

const section = {
  padding: '24px',
  borderBottom: '1px solid #e5e7eb',
};

const sectionHeading = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  marginBottom: '12px',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#525252',
  margin: '0 0 8px 0',
};

const table = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const tableCell = {
  padding: '12px',
  borderBottom: '1px solid #e5e7eb',
  fontSize: '14px',
  color: '#525252',
};

const tableCellRight = {
  ...tableCell,
  textAlign: 'right' as const,
};

const totalRow = {
  backgroundColor: '#2563eb',
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600',
  padding: '12px 20px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block' as const,
  width: 'fit-content',
};

const footer = {
  padding: '24px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: '#6b7280',
};
```

### 4. Password Reset Email

**Secure password reset flow with time-limited link:**

```typescript
import { Body, Button, Container, Head, Html, Preview, Section, Text } from '@react-email/components';

interface PasswordResetProps {
  userName: string;
  resetUrl: string;
  expiresIn: string; // e.g., "24 hours"
}

export const PasswordReset: React.FC<PasswordResetProps> = ({
  userName,
  resetUrl,
  expiresIn,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
            <Text style={heading}>Password Reset Request</Text>
            <Text style={paragraph}>
              Hi {userName},
            </Text>
            <Text style={paragraph}>
              We received a request to reset the password associated with your account. Click the button below to reset it.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={resetUrl}>
                Reset Password
              </Button>
            </Section>

            <Text style={warningText}>
              This link expires in {expiresIn}. If you didn't request this, you can ignore this email.
            </Text>

            <Text style={paragraph}>
              For security reasons, never share this link with anyone.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
};

const content = {
  padding: '20px',
};

const heading = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#1f2937',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#525252',
  marginBottom: '16px',
};

const buttonContainer = {
  paddingTop: '20px',
  paddingBottom: '20px',
};

const button = {
  backgroundColor: '#dc2626',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
};

const warningText = {
  fontSize: '13px',
  color: '#d97706',
  fontStyle: 'italic',
  marginBottom: '16px',
};
```

### 5. Marketing Email - Newsletter

**Newsletter template with featured content, sections, and unsubscribe:**

```typescript
import {
  Body,
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

interface NewsletterProps {
  recipientName: string;
  featuredTitle: string;
  featuredImage: string;
  featuredUrl: string;
  articles: Array<{
    title: string;
    excerpt: string;
    url: string;
    image?: string;
  }>;
  unsubscribeUrl: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({
  recipientName,
  featuredTitle,
  featuredImage,
  featuredUrl,
  articles,
  unsubscribeUrl,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Latest from our community</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={headerTitle}>Our Weekly Newsletter</Text>
          </Section>

          {/* Greeting */}
          <Section style={content}>
            <Text style={greeting}>Hi {recipientName},</Text>
            <Text style={paragraph}>
              Here's what's happening in our community this week.
            </Text>
          </Section>

          {/* Featured Article */}
          <Section style={featured}>
            <Img src={featuredImage} width="100%" height="auto" alt={featuredTitle} />
            <Section style={featuredContent}>
              <Text style={featuredTitle}>{featuredTitle}</Text>
              <Link href={featuredUrl} style={link}>
                Read More →
              </Link>
            </Section>
          </Section>

          {/* Articles Grid */}
          <Section style={articlesSection}>
            {articles.map((article, idx) => (
              <Row key={idx}>
                <Column style={articleColumn}>
                  {article.image && (
                    <Img src={article.image} width="100%" height="auto" alt={article.title} />
                  )}
                  <Text style={articleTitle}>{article.title}</Text>
                  <Text style={articleExcerpt}>{article.excerpt}</Text>
                  <Link href={article.url} style={link}>
                    Read More →
                  </Link>
                </Column>
              </Row>
            ))}
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You're receiving this because you're subscribed to our newsletter.
            </Text>
            <Text style={footerText}>
              <Link href={unsubscribeUrl} style={link}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f9fafb',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0',
  marginBottom: '64px',
};

const header = {
  backgroundColor: '#1f2937',
  color: '#ffffff',
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const headerTitle = {
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
  color: '#ffffff',
};

const content = {
  padding: '20px',
};

const greeting = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1f2937',
  marginBottom: '12px',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#525252',
};

const featured = {
  margin: '20px 0',
};

const featuredContent = {
  padding: '20px',
  backgroundColor: '#f3f4f6',
};

const featuredTitle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#1f2937',
  marginBottom: '12px',
};

const articlesSection = {
  padding: '20px',
};

const articleColumn = {
  padding: '12px',
  borderRight: '1px solid #e5e7eb',
};

const articleTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  marginTop: '12px',
  marginBottom: '8px',
};

const articleExcerpt = {
  fontSize: '14px',
  lineHeight: '1.5',
  color: '#6b7280',
  marginBottom: '12px',
};

const link = {
  color: '#2563eb',
  textDecoration: 'none',
  fontWeight: '600',
};

const footer = {
  backgroundColor: '#f9fafb',
  padding: '24px 20px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e5e7eb',
};

const footerText = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0 0 8px 0',
};
```

## Preview Server Setup

### Development Server

Create a preview server for testing email templates:

```typescript
// emails/preview.tsx
import { render } from 'react-email';
import { WelcomeEmail } from './welcome';

async function main() {
  const emailHtml = render(
    <WelcomeEmail
      userName="John Doe"
      userEmail="john@example.com"
      activationUrl="https://example.com/activate/abc123"
      companyName="Example Co"
    />,
  );

  console.log(emailHtml);
}

main().catch(console.error);
```

### Resend Integration

```typescript
// Send email with React Email and Resend
import { render } from 'react-email';
import { Resend } from 'resend';
import { WelcomeEmail } from './emails/welcome';

const resend = new Resend('your_resend_key_here');

async function sendWelcomeEmail(userName: string, userEmail: string) {
  const html = render(
    <WelcomeEmail
      userName={userName}
      userEmail={userEmail}
      activationUrl={`https://app.example.com/activate/${generateToken()}`}
      companyName="Your Company"
    />,
  );

  const { data, error } = await resend.emails.send({
    from: 'onboarding@example.com',
    to: userEmail,
    subject: `Welcome to Your Company, ${userName}!`,
    html: html,
  });

  if (error) {
    console.error('Failed to send email:', error);
    return null;
  }

  return data;
}
```

## Responsive Design Patterns

### Mobile-First Approach

```typescript
import { Container, Section, Column, Row } from '@react-email/components';

// Responsive container
const ResponsiveSection = () => (
  <Section>
    <Row>
      <Column style={{ width: '100%', maxWidth: '600px' }}>
        {/* Content scales on mobile */}
      </Column>
    </Row>
  </Section>
);

// Key CSS properties for email-safe styling
const responsiveStyles = {
  // Use pixel values or percentages
  width: '100%',
  maxWidth: '600px',

  // Safe font stacks
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

  // Avoid absolute positioning
  margin: '0 auto',
  padding: '20px',

  // Safe colors (avoid rgba for older clients)
  backgroundColor: '#ffffff',
  color: '#1f2937',
};
```

## Best Practices

### Component Organization

```typescript
// emails/components/Header.tsx
export const Header: React.FC<{ title: string }> = ({ title }) => (
  <Section style={headerStyle}>
    <Text style={heading}>{title}</Text>
  </Section>
);

// emails/components/Footer.tsx
export const Footer: React.FC = () => (
  <Section style={footerStyle}>
    <Text style={footerText}>© 2024 Company. All rights reserved.</Text>
  </Section>
);

// emails/welcome.tsx
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const WelcomeEmail = () => (
  <Html>
    <Body>
      <Container>
        <Header title="Welcome!" />
        {/* Content */}
        <Footer />
      </Container>
    </Body>
  </Html>
);
```

### Email Testing

- Test across major email clients: Gmail, Outlook, Apple Mail
- Use Resend's preview feature to verify rendering
- Always provide text fallback for images
- Test on mobile and desktop viewports
- Validate links and button functionality
- Check for accessibility (alt text, contrast ratios)

### Performance Tips

- Minimize inline CSS
- Use safe color values (#hex)
- Optimize images (JPEG for photos, PNG for graphics)
- Keep emails under 25MB total
- Use base64 only for small images
- Avoid JavaScript (emails don't support it)

### Security Best Practices

- Never embed secrets in email HTML
- Validate all dynamic content
- Use HTTPS for all links
- Implement authentication for preview URLs
- Sanitize user-generated content
- Use environment variables for API keys

## Examples Directory Structure

- `welcome-email/` - Complete welcome sequence templates
- `transactional/` - Order confirmation, password reset, invoices
- `marketing/` - Newsletters, promotional campaigns, digests

See individual example README files for complete implementation details.

## Related Skills

- **email-delivery** - Sending emails with Resend API
- **email-validation** - Email address and template validation
- **email-webhooks** - Delivery events and bounce handling

## Resources

- [React Email Documentation](https://react.email/)
- [React Email Components](https://react.email/docs/components/intro)
- [Resend React Email Integration](https://resend.com/docs/integrations/react-email)
- [Email Client CSS Support](https://www.campaignmonitor.com/css/)
- [MJML Email Framework](https://mjml.io/) - Alternative template approach

## Security Notes

- API keys must be stored in environment variables (never hardcoded)
- Use `RESEND_API_KEY` from secure secret management
- Sanitize all user input before rendering in emails
- Validate preview URLs to prevent unauthorized access
- Log email rendering errors for debugging
- Test HTML sanitization for email content
