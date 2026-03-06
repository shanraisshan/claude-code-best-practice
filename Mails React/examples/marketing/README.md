# Marketing Email Examples

Professional marketing email templates: newsletters, promotional campaigns, and content digests.

## Overview

This example demonstrates:
- Building visually appealing marketing emails
- Newsletter layouts with featured articles
- Promotional campaign emails with CTAs
- Content digest and curated email formats
- Mobile-responsive design for marketing content
- Unsubscribe and preference management
- A/B testing considerations

## File Structure

```
marketing/
├── Newsletter.tsx              # Weekly newsletter template
├── PromotionalCampaign.tsx    # Campaign email with discount/offer
├── ContentDigest.tsx          # Curated content digest
├── ProductLaunch.tsx          # Product announcement email
├── preview.tsx                # Preview server for all templates
└── send.ts                    # Batch send and scheduling with Resend
```

## 1. Newsletter Template

**Professional newsletter with featured content and article grid:**

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

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  url: string;
  author?: string;
  readTime?: string;
  category?: string;
}

interface NewsletterProps {
  recipientName: string;
  recipientEmail: string;
  issueNumber: string;
  issueDate: string;
  headerImage: string;
  headerText: string;
  featuredArticle: Article;
  articles: Article[];
  unsubscribeUrl: string;
  preferencesUrl: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({
  recipientName,
  recipientEmail,
  issueNumber,
  issueDate,
  headerImage,
  headerText,
  featuredArticle,
  articles,
  unsubscribeUrl,
  preferencesUrl,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Issue #{issueNumber} - {issueDate}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header Banner */}
          <Section style={headerSection}>
            <Img
              src={headerImage}
              width="600"
              height="200"
              alt="Newsletter Header"
              style={headerImg}
            />
            <Section style={headerOverlay}>
              <Text style={headerTitle}>{headerText}</Text>
              <Text style={headerIssue}>Issue #{issueNumber} • {issueDate}</Text>
            </Section>
          </Section>

          {/* Greeting */}
          <Section style={greetingSection}>
            <Text style={greeting}>Hello {recipientName},</Text>
            <Text style={greetingText}>
              Here's what's trending in our community this week. Enjoy!
            </Text>
          </Section>

          {/* Featured Article */}
          <Section style={featuredSection}>
            <Text style={sectionLabel}>Featured This Week</Text>
            <Img
              src={featuredArticle.image}
              width="100%"
              height="300"
              alt={featuredArticle.title}
              style={featuredImage}
            />
            <Section style={featuredContent}>
              {featuredArticle.category && (
                <Text style={category}>{featuredArticle.category}</Text>
              )}
              <Text style={featuredTitle}>{featuredArticle.title}</Text>
              <Text style={excerpt}>{featuredArticle.excerpt}</Text>
              <Row style={{ marginTop: '12px' }}>
                <Column>
                  {featuredArticle.author && (
                    <Text style={meta}>By {featuredArticle.author}</Text>
                  )}
                </Column>
                <Column style={{ textAlign: 'right' }}>
                  {featuredArticle.readTime && (
                    <Text style={meta}>{featuredArticle.readTime} read</Text>
                  )}
                </Column>
              </Row>
              <Button style={readMoreButton} href={featuredArticle.url}>
                Read Article →
              </Button>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Articles Grid */}
          <Section style={articlesSection}>
            <Text style={sectionLabel}>More Stories</Text>
            {articles.map((article, idx) => (
              <Section key={article.id} style={articleItem}>
                <Row>
                  {article.image && (
                    <Column style={{ width: '35%', paddingRight: '16px' }}>
                      <Img
                        src={article.image}
                        width="100%"
                        height="120"
                        alt={article.title}
                        style={articleThumbnail}
                      />
                    </Column>
                  )}
                  <Column style={{ width: article.image ? '65%' : '100%' }}>
                    {article.category && (
                      <Text style={category}>{article.category}</Text>
                    )}
                    <Text style={articleTitle}>{article.title}</Text>
                    <Text style={excerpt}>{article.excerpt}</Text>
                    <Row style={{ marginTop: '8px' }}>
                      <Column>
                        <Link href={article.url} style={articleLink}>
                          Read More →
                        </Link>
                      </Column>
                      <Column style={{ textAlign: 'right' }}>
                        {article.readTime && (
                          <Text style={meta}>{article.readTime}</Text>
                        )}
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </Section>
            ))}
          </Section>

          <Hr style={divider} />

          {/* CTA Section */}
          <Section style={ctaSection}>
            <Text style={ctaText}>Enjoying the newsletter?</Text>
            <Button style={ctaButton} href="https://example.com/subscribe-extra">
              Get Extra Content
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Row>
              <Column>
                <Text style={footerTitle}>Our Recent Posts</Text>
                <Text style={footerLink}>
                  <Link href="https://example.com/blog" style={link}>
                    Visit Our Blog
                  </Link>
                </Text>
              </Column>
              <Column style={{ textAlign: 'right' }}>
                <Text style={footerTitle}>Follow Us</Text>
                <Text style={footerLink}>
                  <Link href="https://twitter.com/example" style={link}>
                    Twitter
                  </Link>
                  {' • '}
                  <Link href="https://linkedin.com/company/example" style={link}>
                    LinkedIn
                  </Link>
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Preferences and Unsubscribe */}
          <Section style={preferencesSection}>
            <Text style={preferencesText}>
              <Link href={preferencesUrl} style={link}>
                Update your preferences
              </Link>
              {' • '}
              <Link href={unsubscribeUrl} style={link}>
                Unsubscribe
              </Link>
            </Text>
            <Text style={copyright}>
              © 2024 Your Company. All rights reserved. | {recipientEmail}
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
  padding: '0',
  marginBottom: '64px',
  maxWidth: '600px',
};

const headerSection = {
  position: 'relative' as const,
};

const headerImg = {
  width: '100%',
  display: 'block',
};

const headerOverlay = {
  position: 'absolute' as const,
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center',
  alignItems: 'center',
  color: '#ffffff',
  padding: '40px 20px',
  textAlign: 'center' as const,
};

const headerTitle = {
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 8px 0',
  color: '#ffffff',
};

const headerIssue = {
  fontSize: '14px',
  color: 'rgba(255, 255, 255, 0.9)',
  margin: '0',
};

const greetingSection = {
  padding: '32px 32px 16px',
};

const greeting = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 8px 0',
};

const greetingText = {
  fontSize: '15px',
  color: '#525252',
  margin: '0',
  lineHeight: '1.5',
};

const sectionLabel = {
  fontSize: '13px',
  fontWeight: '700',
  color: '#6b7280',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '24px 0 16px 0',
};

const featuredSection = {
  padding: '0 32px 24px',
};

const featuredImage = {
  borderRadius: '8px',
  marginBottom: '16px',
  display: 'block',
  width: '100%',
};

const featuredContent = {
  padding: '20px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
};

const featuredTitle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 12px 0',
  lineHeight: '1.4',
};

const category = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#2563eb',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 8px 0',
};

const excerpt = {
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#525252',
  margin: '0 0 12px 0',
};

const meta = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0',
};

const readMoreButton = {
  backgroundColor: '#2563eb',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  padding: '10px 20px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '12px',
};

const articlesSection = {
  padding: '0 32px 24px',
};

const articleItem = {
  padding: '20px 0',
  borderBottom: '1px solid #e5e7eb',
};

const articleThumbnail = {
  borderRadius: '6px',
  display: 'block',
  width: '100%',
};

const articleTitle = {
  fontSize: '16px',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 8px 0',
  lineHeight: '1.4',
};

const articleLink = {
  color: '#2563eb',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '14px',
};

const divider = {
  borderColor: '#e5e7eb',
  margin: '0',
};

const ctaSection = {
  padding: '32px 32px',
  backgroundColor: '#eff6ff',
  textAlign: 'center' as const,
  borderRadius: '8px',
  margin: '0 32px 24px',
};

const ctaText = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 16px 0',
};

const ctaButton = {
  backgroundColor: '#2563eb',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600',
  padding: '12px 28px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
};

const footerSection = {
  padding: '32px 32px 24px',
  borderTop: '1px solid #e5e7eb',
};

const footerTitle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 8px 0',
};

const footerLink = {
  fontSize: '14px',
  margin: '0 0 8px 0',
};

const link = {
  color: '#2563eb',
  textDecoration: 'none',
};

const preferencesSection = {
  padding: '24px 32px',
  backgroundColor: '#f9fafb',
  textAlign: 'center' as const,
  borderTop: '1px solid #e5e7eb',
};

const preferencesText = {
  fontSize: '13px',
  color: '#6b7280',
  margin: '0 0 12px 0',
};

const copyright = {
  fontSize: '11px',
  color: '#9ca3af',
  margin: '0',
};
```

## 2. Promotional Campaign

**Promotional email with special offer and urgency:**

```typescript
interface PromotionalCampaignProps {
  recipientName: string;
  recipientEmail: string;
  offertitle: string;
  offerText: string;
  discountCode: string;
  discountPercent: number;
  expiresAt: string;
  productImage: string;
  ctaUrl: string;
  unsubscribeUrl: string;
}

export const PromotionalCampaign: React.FC<PromotionalCampaignProps> = ({
  recipientName,
  recipientEmail,
  offertitle,
  offerText,
  discountCode,
  discountPercent,
  expiresAt,
  productImage,
  ctaUrl,
  unsubscribeUrl,
}) => {
  return (
    <Html>
      <Head />
      <Preview>{offertitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Promotional Banner */}
          <Section style={banner}>
            <Text style={bannerText}>
              {discountPercent}% OFF EVERYTHING
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>Hi {recipientName},</Text>

            <Text style={heading}>{offertitle}</Text>
            <Text style={paragraph}>{offerText}</Text>

            {/* Product Image */}
            <Img
              src={productImage}
              width="100%"
              height="300"
              alt="Special Offer"
              style={productImg}
            />

            {/* Discount Code Box */}
            <Section style={discountBox}>
              <Text style={discountLabel}>Use code</Text>
              <Text style={discountCode}>{discountCode}</Text>
              <Text style={discountNote}>at checkout for {discountPercent}% off</Text>
            </Section>

            {/* Urgency */}
            <Section style={urgencyBox}>
              <Text style={urgencyText}>
                ⏰ Offer expires {expiresAt}. Don't miss out!
              </Text>
            </Section>

            {/* CTA */}
            <Section style={ctaContainer}>
              <Button style={primaryButton} href={ctaUrl}>
                Shop Now
              </Button>
            </Section>

            <Text style={footerNote}>
              This offer is for you. If you're not interested,{' '}
              <Link href={unsubscribeUrl} style={link}>
                unsubscribe
              </Link>
              .
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const banner = {
  backgroundColor: '#dc2626',
  padding: '16px',
  textAlign: 'center' as const,
};

const bannerText = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0',
  letterSpacing: '1px',
};

const content = {
  padding: '40px 32px',
};

const heading = {
  fontSize: '28px',
  fontWeight: '700',
  color: '#1f2937',
  margin: '0 0 12px 0',
  lineHeight: '1.3',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#525252',
  margin: '0 0 24px 0',
};

const productImg = {
  borderRadius: '8px',
  marginBottom: '24px',
  display: 'block',
};

const discountBox = {
  backgroundColor: '#f3f4f6',
  padding: '24px',
  borderRadius: '8px',
  textAlign: 'center' as const,
  margin: '24px 0',
  border: '2px solid #dc2626',
};

const discountLabel = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '0 0 8px 0',
  textTransform: 'uppercase' as const,
};

const discountCode = {
  fontSize: '32px',
  fontWeight: '700',
  color: '#dc2626',
  margin: '0 0 8px 0',
  fontFamily: 'monospace',
};

const discountNote = {
  fontSize: '14px',
  color: '#525252',
  margin: '0',
};

const urgencyBox = {
  backgroundColor: '#fef3c7',
  borderLeft: '4px solid #f59e0b',
  padding: '16px',
  borderRadius: '4px',
  margin: '20px 0',
};

const urgencyText = {
  fontSize: '15px',
  color: '#92400e',
  margin: '0',
  fontWeight: '600',
};

const ctaContainer = {
  textAlign: 'center' as const,
  paddingTop: '24px',
};

const primaryButton = {
  backgroundColor: '#dc2626',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '700',
  padding: '14px 40px',
  borderRadius: '6px',
  textDecoration: 'none',
  display: 'inline-block',
};

const footerNote = {
  fontSize: '13px',
  color: '#6b7280',
  textAlign: 'center' as const,
  margin: '24px 0 0 0',
  lineHeight: '1.5',
};
```

## 3. Content Digest

**Curated content digest email:**

```typescript
interface ContentDigestProps {
  recipientName: string;
  weekNumber: number;
  year: number;
  topArticles: Article[];
  topicSpotlight: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  communityHighlight: string;
  viewAllUrl: string;
  unsubscribeUrl: string;
}

export const ContentDigest: React.FC<ContentDigestProps> = ({
  recipientName,
  weekNumber,
  year,
  topArticles,
  topicSpotlight,
  communityHighlight,
  viewAllUrl,
  unsubscribeUrl,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Week {weekNumber} Digest</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={headerGreeting}>Week {weekNumber} Digest</Text>
            <Text style={headerDate}>{year}</Text>
          </Section>

          <Section style={greeting}>
            <Text>Hi {recipientName},</Text>
            <Text style={paragraph}>
              Here are the top stories and insights from this week.
            </Text>
          </Section>

          {/* Top Articles */}
          <Section style={articlesSection}>
            <Text style={sectionTitle}>Top Stories</Text>
            {topArticles.slice(0, 3).map((article, idx) => (
              <Section key={article.id} style={topArticle}>
                <Row>
                  <Column style={{ width: '8%', paddingTop: '4px' }}>
                    <Text style={rank}>{idx + 1}</Text>
                  </Column>
                  <Column style={{ width: '92%' }}>
                    <Text style={topArticleTitle}>{article.title}</Text>
                    <Text style={topArticleExcerpt}>{article.excerpt}</Text>
                    <Link href={article.url} style={readLink}>
                      Read More →
                    </Link>
                  </Column>
                </Row>
              </Section>
            ))}
          </Section>

          {/* Topic Spotlight */}
          <Section style={spotlightSection}>
            <Text style={sectionTitle}>Topic Spotlight</Text>
            <Img
              src={topicSpotlight.image}
              width="100%"
              height="200"
              alt={topicSpotlight.title}
            />
            <Section style={spotlightContent}>
              <Text style={spotlightTitle}>{topicSpotlight.title}</Text>
              <Text style={paragraph}>{topicSpotlight.description}</Text>
              <Button style={secondaryButton} href={topicSpotlight.url}>
                Learn More
              </Button>
            </Section>
          </Section>

          {/* Community Highlight */}
          <Section style={communitySection}>
            <Text style={sectionTitle}>Community Highlight</Text>
            <Text style={communityText}>"{communityHighlight}"</Text>
            <Text style={communityMeta}>
              Submitted by our community members
            </Text>
          </Section>

          {/* View All */}
          <Section style={viewAllSection}>
            <Button style={viewAllButton} href={viewAllUrl}>
              View All Articles
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footer}>
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
```

## Batch Sending and Scheduling

**Send marketing emails to multiple recipients with Resend batch API:**

```typescript
// send.ts
import { Resend } from 'resend';
import { render } from 'react-email';
import { Newsletter } from './Newsletter';
import { PromotionalCampaign } from './PromotionalCampaign';

const resend = new Resend(process.env.RESEND_API_KEY);

interface Subscriber {
  name: string;
  email: string;
  preferences: {
    newsletter: boolean;
    promotions: boolean;
  };
}

export async function sendNewsletterBatch(
  issue: NewsletterData,
  subscribers: Subscriber[],
) {
  const emails = subscribers
    .filter(sub => sub.preferences.newsletter)
    .map(sub => {
      const html = render(
        <Newsletter
          recipientName={sub.name}
          recipientEmail={sub.email}
          {...issue}
        />,
      );

      return {
        from: `newsletter@${process.env.RESEND_DOMAIN}`,
        to: sub.email,
        subject: `Newsletter - Issue #${issue.issueNumber}`,
        html,
      };
    });

  // Send in batches of 100
  const batchSize = 100;
  const results = [];

  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);
    const { data, error } = await resend.batch.send(batch);

    if (error) {
      console.error(`Batch ${Math.floor(i / batchSize) + 1} failed:`, error);
      results.push({ success: false, batch: Math.floor(i / batchSize) + 1 });
    } else {
      console.log(`Batch ${Math.floor(i / batchSize) + 1} sent successfully`);
      results.push({ success: true, data });
    }
  }

  return results;
}

export async function schedulePromotionalCampaign(
  campaign: PromotionalCampaignData,
  subscribers: Subscriber[],
  scheduledAt: Date,
) {
  const emails = subscribers
    .filter(sub => sub.preferences.promotions)
    .map(sub => {
      const html = render(
        <PromotionalCampaign
          recipientName={sub.name}
          recipientEmail={sub.email}
          {...campaign}
        />,
      );

      return {
        from: `promotions@${process.env.RESEND_DOMAIN}`,
        to: sub.email,
        subject: campaign.offertitle,
        html,
        scheduled_at: scheduledAt.toISOString(),
      };
    });

  return resend.batch.send(emails);
}
```

## A/B Testing

```typescript
// A/B test subject lines
const variants = {
  A: {
    subject: 'Your Weekly Newsletter - Issue #45',
    component: <Newsletter {...articleSetA} />,
  },
  B: {
    subject: '5 Must-Read Stories This Week',
    component: <Newsletter {...articleSetB} />,
  },
};

// Split subscribers 50/50
const groupA = subscribers.slice(0, subscribers.length / 2);
const groupB = subscribers.slice(subscribers.length / 2);

await sendNewsletterBatch(variants.A, groupA);
await sendNewsletterBatch(variants.B, groupB);
```

## Best Practices

1. **Segment Subscribers** - Send relevant content based on preferences
2. **Test Subject Lines** - A/B test for open rates
3. **Mobile First** - Design for mobile viewing first
4. **Clear CTA** - Make action obvious with primary buttons
5. **Unsubscribe Easy** - Link in footer for compliance
6. **Track Metrics** - Monitor opens, clicks, unsubscribes
7. **Batch Optimization** - Send in batches for reliability
8. **Cadence** - Consistent sending schedule builds trust
9. **Preview Testing** - Test across email clients before sending
10. **Personalization** - Use recipient name and preferences

## Compliance

- **CAN-SPAM** - Include physical address and unsubscribe
- **GDPR** - Only send to opted-in subscribers
- **List Hygiene** - Remove bounces and complaints regularly
- **Authentication** - Set up SPF, DKIM, DMARC

## Related Examples

- See `welcome-email/` for signup sequences
- See `transactional/` for order and payment confirmations
