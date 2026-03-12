#!/bin/bash

# React Email Component Generator
# Usage: ./scripts/generate-component.sh <component-name> <component-type>
# Types: welcome, transactional, newsletter, promotional, custom

set -e

if [ -z "$1" ]; then
  echo "Error: Component name required"
  echo "Usage: ./scripts/generate-component.sh <component-name> [type]"
  echo "Types: welcome, transactional, newsletter, promotional, custom"
  exit 1
fi

COMPONENT_NAME="$1"
COMPONENT_TYPE="${2:-custom}"
COMPONENT_FILE="${COMPONENT_NAME}.tsx"

# Check if file already exists
if [ -f "$COMPONENT_FILE" ]; then
  echo "Error: $COMPONENT_FILE already exists"
  exit 1
fi

# Generate component based on type
case $COMPONENT_TYPE in
  welcome)
    cat > "$COMPONENT_FILE" << 'EOF'
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
  Font,
} from '@react-email/components';

interface WelcomeEmailProps {
  userName: string;
  userEmail: string;
  activationUrl: string;
  companyName?: string;
}

export const COMPONENT_NAME: React.FC<WelcomeEmailProps> = ({
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
          <Section style={content}>
            <Text style={heading}>Welcome, {userName}!</Text>
            <Text style={paragraph}>
              Thank you for joining {companyName}. Click the button below to verify your email.
            </Text>
            <Section style={buttonContainer}>
              <Button style={button} href={activationUrl}>
                Verify Email
              </Button>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const content = {
  padding: '32px 32px',
};

const heading = {
  fontSize: '28px',
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

const buttonContainer = {
  paddingTop: '20px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 28px',
  textDecoration: 'none',
};
EOF
    ;;

  transactional)
    cat > "$COMPONENT_FILE" << 'EOF'
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface TransactionalEmailProps {
  recipientName: string;
  recipientEmail: string;
  subject: string;
  content: string;
  actionUrl?: string;
  actionText?: string;
}

export const COMPONENT_NAME: React.FC<TransactionalEmailProps> = ({
  recipientName,
  recipientEmail,
  subject,
  content,
  actionUrl,
  actionText,
}) => {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Text style={heading}>{subject}</Text>
            <Text style={paragraph}>Hi {recipientName},</Text>
            <Text style={paragraph}>{content}</Text>

            {actionUrl && actionText && (
              <Section style={buttonContainer}>
                <Button style={button} href={actionUrl}>
                  {actionText}
                </Button>
              </Section>
            )}
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
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const section = {
  padding: '32px 32px',
};

const heading = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 16px 0',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#525252',
  margin: '0 0 12px 0',
};

const buttonContainer = {
  paddingTop: '20px',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
};
EOF
    ;;

  newsletter)
    cat > "$COMPONENT_FILE" << 'EOF'
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface Article {
  title: string;
  excerpt: string;
  url: string;
  image?: string;
}

interface NewsletterEmailProps {
  recipientName: string;
  issueNumber: string;
  articles: Article[];
}

export const COMPONENT_NAME: React.FC<NewsletterEmailProps> = ({
  recipientName,
  issueNumber,
  articles,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Newsletter - Issue #{issueNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
            <Text style={greeting}>Hello {recipientName},</Text>
            <Text style={paragraph}>
              Here are this week's top stories:
            </Text>

            {articles.map((article, idx) => (
              <Section key={idx} style={articleSection}>
                {article.image && (
                  <Img src={article.image} width="100%" alt={article.title} />
                )}
                <Text style={articleTitle}>{article.title}</Text>
                <Text style={excerpt}>{article.excerpt}</Text>
                <Link href={article.url} style={link}>
                  Read More →
                </Link>
              </Section>
            ))}
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
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const content = {
  padding: '32px 32px',
};

const greeting = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 12px 0',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#525252',
  margin: '0 0 20px 0',
};

const articleSection = {
  marginBottom: '20px',
  paddingBottom: '20px',
  borderBottom: '1px solid #e5e7eb',
};

const articleTitle = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#1f2937',
  margin: '12px 0 8px 0',
};

const excerpt = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0 0 8px 0',
};

const link = {
  color: '#2563eb',
  textDecoration: 'none',
  fontWeight: '600',
};
EOF
    ;;

  promotional)
    cat > "$COMPONENT_FILE" << 'EOF'
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface PromotionalEmailProps {
  recipientName: string;
  headline: string;
  offerText: string;
  discountCode: string;
  discountPercent: number;
  expiresAt: string;
  ctaUrl: string;
  heroImage?: string;
}

export const COMPONENT_NAME: React.FC<PromotionalEmailProps> = ({
  recipientName,
  headline,
  offerText,
  discountCode,
  discountPercent,
  expiresAt,
  ctaUrl,
  heroImage,
}) => {
  return (
    <Html>
      <Head />
      <Preview>{headline}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={banner}>
            <Text style={bannerText}>{discountPercent}% OFF</Text>
          </Section>

          <Section style={content}>
            <Text style={greeting}>Hi {recipientName},</Text>
            <Text style={heading}>{headline}</Text>
            <Text style={paragraph}>{offerText}</Text>

            {heroImage && (
              <Img src={heroImage} width="100%" alt={headline} />
            )}

            <Section style={discountBox}>
              <Text style={discountLabel}>Use code</Text>
              <Text style={discountCodeText}>{discountCode}</Text>
              <Text style={discountNote}>for {discountPercent}% off</Text>
            </Section>

            <Section style={buttonContainer}>
              <Button style={button} href={ctaUrl}>
                Shop Now
              </Button>
            </Section>

            <Text style={urgency}>
              Offer expires {expiresAt}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const banner = {
  backgroundColor: '#dc2626',
  padding: '20px',
  textAlign: 'center' as const,
};

const bannerText = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
};

const content = {
  padding: '32px 32px',
};

const greeting = {
  fontSize: '16px',
  color: '#525252',
  margin: '0 0 12px 0',
};

const heading = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 12px 0',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#525252',
  margin: '0 0 20px 0',
};

const discountBox = {
  backgroundColor: '#f3f4f6',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center' as const,
  margin: '20px 0',
};

const discountLabel = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0 0 8px 0',
};

const discountCodeText = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#dc2626',
  margin: '0 0 8px 0',
};

const discountNote = {
  fontSize: '14px',
  color: '#525252',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  paddingTop: '20px',
};

const button = {
  backgroundColor: '#dc2626',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '700',
  padding: '12px 32px',
  borderRadius: '6px',
  textDecoration: 'none',
};

const urgency = {
  fontSize: '13px',
  color: '#6b7280',
  textAlign: 'center' as const,
  margin: '16px 0 0 0',
};
EOF
    ;;

  *)
    cat > "$COMPONENT_FILE" << 'EOF'
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface EmailProps {
  recipientName: string;
  recipientEmail: string;
}

export const COMPONENT_NAME: React.FC<EmailProps> = ({
  recipientName,
  recipientEmail,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Your email preview text here</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
            <Text style={heading}>Hello {recipientName}!</Text>
            <Text style={paragraph}>
              Add your email content here.
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
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const content = {
  padding: '32px 32px',
};

const heading = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 16px 0',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#525252',
};
EOF
    ;;
esac

# Replace COMPONENT_NAME placeholder with actual component name
sed -i.bak "s/COMPONENT_NAME/${COMPONENT_NAME}/g" "$COMPONENT_FILE"
rm -f "${COMPONENT_FILE}.bak"

echo "✓ Generated $COMPONENT_FILE (type: $COMPONENT_TYPE)"
echo ""
echo "Next steps:"
echo "1. Update the interface and props as needed"
echo "2. Customize the HTML structure and styling"
echo "3. Add preview script: npm run preview -- $COMPONENT_FILE"
echo "4. Test with: npm run dev"
