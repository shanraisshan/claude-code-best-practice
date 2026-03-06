# Welcome Email Example

Complete welcome email sequence using React Email components and Resend integration.

## Overview

This example demonstrates:
- Building a professional welcome email with branding
- Email verification flow with activation links
- Responsive design for mobile and desktop
- Tailwind CSS styling in React Email
- Sending via Resend API
- Type-safe props and component composition

## File Structure

```
welcome-email/
├── WelcomeEmail.tsx          # Main welcome component
├── WelcomeEmailWithButton.tsx # Variant with CTA button
├── EmailVerification.tsx      # Email verification component
├── preview.tsx               # Preview server setup
└── send.ts                   # Resend integration
```

## Components

### WelcomeEmail.tsx

**Basic welcome email with user information:**

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
  Font,
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
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHAPUlfrw.woff2',
            format: 'woff2',
          }}
        />
      </Head>
      <Preview>Welcome to {companyName}, {userName}!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Section */}
          <Section style={header}>
            <Row style={{ marginBottom: '12px' }}>
              <Column>
                <Img
                  src={`https://example.com/logo.png`}
                  width="40"
                  height="40"
                  alt={companyName}
                  style={logo}
                />
              </Column>
              <Column style={{ paddingLeft: '12px', paddingTop: '4px' }}>
                <Text style={companyTitle}>{companyName}</Text>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={heading}>Welcome aboard, {userName}! 🎉</Text>

            <Text style={paragraph}>
              We're thrilled to have you join {companyName}. Get ready to unlock a world of possibilities.
            </Text>

            <Text style={highlight}>
              Your account is all set up. Let's verify your email to get started.
            </Text>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Button style={primaryButton} href={activationUrl}>
                Verify Email Address
              </Button>
            </Section>

            {/* What's Next */}
            <Section style={nextSteps}>
              <Text style={subheading}>What's next?</Text>
              <ul style={list}>
                <li style={listItem}>
                  <Text style={listItemText}>Complete your profile</Text>
                </li>
                <li style={listItem}>
                  <Text style={listItemText}>Connect your integrations</Text>
                </li>
                <li style={listItem}>
                  <Text style={listItemText}>Read our getting started guide</Text>
                </li>
              </ul>
            </Section>

            {/* Security Note */}
            <Section style={securityNote}>
              <Text style={securityText}>
                🔒 This link expires in 24 hours and is unique to your account. Never share it with anyone.
              </Text>
            </Section>
          </Section>

          {/* Divider */}
          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Row>
              <Column style={{ width: '100%' }}>
                <Text style={footerHeading}>Questions?</Text>
                <Text style={footerText}>
                  Check out our{' '}
                  <Link href="https://example.com/help" style={link}>
                    help center
                  </Link>
                  {' or '}
                  <Link href="mailto:support@example.com" style={link}>
                    contact support
                  </Link>
                </Text>
              </Column>
            </Row>

            <Hr style={footerDivider} />

            <Row>
              <Column style={{ width: '100%', textAlign: 'center' }}>
                <Text style={footerLinks}>
                  <Link href="https://example.com/privacy" style={link}>
                    Privacy Policy
                  </Link>
                  {' • '}
                  <Link href="https://example.com/terms" style={link}>
                    Terms of Service
                  </Link>
                  {' • '}
                  <Link href="https://example.com/unsubscribe" style={link}>
                    Unsubscribe
                  </Link>
                </Text>
                <Text style={copyright}>
                  © 2024 {companyName}. All rights reserved. | {userEmail}
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Comprehensive Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '24px 32px',
  borderBottom: '1px solid #e5e7eb',
};

const logo = {
  borderRadius: '4px',
};

const companyTitle = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0',
};

const content = {
  padding: '32px 32px',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 16px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#525252',
  margin: '0 0 16px 0',
};

const highlight = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#2563eb',
  backgroundColor: '#eff6ff',
  padding: '12px 16px',
  borderRadius: '8px',
  margin: '16px 0',
};

const buttonContainer = {
  paddingTop: '20px',
  paddingBottom: '20px',
  textAlign: 'center' as const,
};

const primaryButton = {
  backgroundColor: '#2563eb',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 28px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
};

const nextSteps = {
  backgroundColor: '#f9fafb',
  padding: '20px 24px',
  borderRadius: '8px',
  margin: '24px 0',
};

const subheading = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 12px 0',
};

const list = {
  marginLeft: '20px',
  paddingLeft: '0',
};

const listItem = {
  marginBottom: '8px',
};

const listItemText = {
  fontSize: '15px',
  color: '#525252',
  margin: '0',
};

const securityNote = {
  backgroundColor: '#fef3c7',
  borderLeft: '4px solid #f59e0b',
  padding: '16px',
  borderRadius: '4px',
  margin: '24px 0 0 0',
};

const securityText = {
  fontSize: '14px',
  color: '#92400e',
  margin: '0',
  lineHeight: '1.5',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const footer = {
  paddingLeft: '32px',
  paddingRight: '32px',
  paddingBottom: '32px',
};

const footerHeading = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 8px 0',
};

const footerText = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0',
  lineHeight: '1.5',
};

const footerDivider = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
};

const footerLinks = {
  fontSize: '12px',
  color: '#6b7280',
  textAlign: 'center' as const,
  margin: '0 0 8px 0',
};

const link = {
  color: '#2563eb',
  textDecoration: 'underline',
};

const copyright = {
  fontSize: '11px',
  color: '#9ca3af',
  textAlign: 'center' as const,
  margin: '8px 0 0 0',
};
```

### Preview Server

**Test emails locally with preview server:**

```typescript
// preview.tsx
import { render } from 'react-email';
import { WelcomeEmail } from './WelcomeEmail';

async function preview() {
  const activationToken = 'abc123token456';
  const activationUrl = `https://app.example.com/activate/${activationToken}`;

  const email = render(
    <WelcomeEmail
      userName="Sarah Anderson"
      userEmail="sarah@example.com"
      activationUrl={activationUrl}
      companyName="TechFlow"
    />,
  );

  // Write to file for preview
  const fs = require('fs');
  fs.writeFileSync('/tmp/welcome-email.html', email);
  console.log('Email preview written to /tmp/welcome-email.html');

  return email;
}

preview().catch(console.error);
```

### Resend Integration

**Send welcome email via Resend:**

```typescript
// send.ts
import { Resend } from 'resend';
import { render } from 'react-email';
import { WelcomeEmail } from './WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(
  userName: string,
  userEmail: string,
  activationToken: string,
) {
  const activationUrl = `${process.env.APP_URL}/activate/${activationToken}`;

  const html = render(
    <WelcomeEmail
      userName={userName}
      userEmail={userEmail}
      activationUrl={activationUrl}
      companyName={process.env.COMPANY_NAME || 'Our Company'}
    />,
  );

  const { data, error } = await resend.emails.send({
    from: `onboarding@${process.env.RESEND_DOMAIN}`,
    to: userEmail,
    subject: `Welcome to ${process.env.COMPANY_NAME || 'Our Company'}, ${userName}!`,
    html: html,
  });

  if (error) {
    console.error('Failed to send welcome email:', error);
    throw new Error(`Email send failed: ${error.message}`);
  }

  console.log(`Welcome email sent to ${userEmail}. Message ID: ${data?.id}`);
  return data;
}
```

## Usage in Application

**Typical user signup flow:**

```typescript
// app/api/auth/signup.ts
import { sendWelcomeEmail } from '@/emails/welcome';
import { generateActivationToken } from '@/lib/tokens';
import { createUser } from '@/lib/db';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  // Create user
  const user = await createUser({
    name,
    email,
    passwordHash: await hashPassword(password),
  });

  // Generate activation token
  const activationToken = await generateActivationToken(user.id);

  // Send welcome email
  try {
    await sendWelcomeEmail(name, email, activationToken);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Still allow signup, email can be resent
  }

  return Response.json({
    success: true,
    message: 'Account created. Check your email to verify your address.',
    userId: user.id,
  });
}
```

## Customization

### Variant: Welcome with Dashboard Link

```typescript
// For invites or direct signups
const variant2 = (
  <WelcomeEmail
    userName="John"
    userEmail="john@example.com"
    activationUrl="https://app.example.com/dashboard"
    companyName="StartupCo"
  />
);
```

### Styling Customization

Modify colors to match your brand:

```typescript
const primaryButton = {
  backgroundColor: '#your-brand-color', // Change from #2563eb
  // ... other styles
};

const highlight = {
  color: '#your-brand-color',
  backgroundColor: 'rgba(your-brand-color, 0.1)',
  // ... other styles
};
```

## Testing

### Automated Testing

```typescript
// __tests__/welcome-email.test.ts
import { render } from 'react-email';
import { WelcomeEmail } from '../WelcomeEmail';

describe('WelcomeEmail', () => {
  it('renders welcome email with correct props', () => {
    const html = render(
      <WelcomeEmail
        userName="Test User"
        userEmail="test@example.com"
        activationUrl="https://example.com/activate/token"
      />,
    );

    expect(html).toContain('Test User');
    expect(html).toContain('test@example.com');
    expect(html).toContain('https://example.com/activate/token');
  });

  it('includes all required sections', () => {
    const html = render(
      <WelcomeEmail
        userName="Test"
        userEmail="test@example.com"
        activationUrl="https://example.com/activate/token"
      />,
    );

    expect(html).toContain('Welcome aboard');
    expect(html).toContain("What's next?");
    expect(html).toContain('Privacy Policy');
  });
});
```

## Best Practices

1. **Always include an unsubscribe mechanism** even for transactional emails
2. **Test activation links** to ensure they work before sending
3. **Set reasonable token expiration** (typically 24 hours)
4. **Include fallback text versions** for non-HTML email clients
5. **Monitor delivery metrics** using Resend webhooks
6. **Store email templates in version control** for audit trail
7. **Log all email sends** for compliance and debugging

## Related Examples

- See `transactional/` for order confirmation and password reset
- See `marketing/` for newsletter and promotional templates

## Resources

- [React Email Docs](https://react.email/)
- [Resend Welcome Guide](https://resend.com/docs/get-started/introduction)
- [Email Verification Best Practices](https://resend.com/docs/knowledge-base/verification)
