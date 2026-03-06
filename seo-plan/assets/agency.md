<!-- Updated: 2026-02-07 -->
# Agency/Consultancy SEO Strategy Template

## Industry Characteristics

- Service-based, high-value transactions
- Expertise and trust are paramount
- Long consideration cycles
- Portfolio/case study driven decisions
- Relationship-based sales
- Niche specialization benefits

## Recommended Site Architecture

```
/
├── Home
├── /services
│   ├── /service-1
│   │   ├── /sub-service-1
│   │   └── ...
│   └── /service-2
├── /industries
│   ├── /industry-1
│   ├── /industry-2
│   └── ...
├── /work (or /case-studies)
│   ├── /case-study-1
│   ├── /case-study-2
│   └── ...
├── /about
│   ├── /team
│   │   ├── /team-member-1
│   │   └── ...
│   ├── /culture
│   └── /careers
├── /insights (or /blog)
│   ├── /articles
│   ├── /guides
│   ├── /webinars
│   └── /podcasts
├── /contact
├── /process
└── /faq
```

## Schema Recommendations

| Page Type | Schema Types |
|-----------|-------------|
| Homepage | Organization, ProfessionalService |
| Service Page | Service, ProfessionalService |
| Case Study | Article, Organization (client) |
| Team Member | Person, ProfilePage |
| Blog | Article, BlogPosting |

### ProfessionalService Schema Example
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Agency Name",
  "description": "What the agency does",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Agency St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345"
  },
  "telephone": "+1-555-555-5555",
  "areaServed": "National",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Service 1"
        }
      }
    ]
  }
}
```

## E-E-A-T Requirements

### Team Pages Must Include
- Professional headshots
- Detailed bios with credentials
- Industry experience
- Speaking engagements
- Publications
- Social profiles

### Case Studies Must Include
- Client name (with permission) or industry
- Challenge/problem statement
- Approach/methodology
- Results with specific metrics
- Timeline
- Testimonial quote

## Content Priorities

### High Priority
1. Service pages (detailed, specific)
2. Industry pages (vertical expertise)
3. 3-5 detailed case studies
4. Team/leadership pages

### Medium Priority
1. Methodology/process page
2. Blog with thought leadership
3. Comparison content (vs alternatives)
4. FAQ page

### Thought Leadership Topics
- Industry trend analysis
- How-to guides (non-competitive)
- Original research/surveys
- Event recaps and insights
- Expert interviews
- Tool/technology reviews

## Content Strategy

### Service Pages (min 800 words)
- Clear value proposition
- Methodology overview
- Deliverables list
- Relevant case studies
- Team members who deliver this service
- CTA to schedule consultation

### Industry Pages (min 800 words)
- Industry-specific challenges
- How you solve them differently
- Relevant case studies
- Industry credentials/experience
- Client logos (with permission)

### Case Studies (min 1,000 words)
- Executive summary
- Client background
- Challenge details
- Solution approach
- Implementation process
- Measurable results
- Client testimonial
- Related services/CTA

## Key Metrics to Track

- Organic traffic to service pages
- Case study page views
- Contact form submissions from organic
- Time on page for key content
- Blog → service page conversion

## Generative Engine Optimization (GEO) for Agencies

- [ ] Publish original case studies with specific, citable metrics and results
- [ ] Use Person schema with sameAs links for all team members (builds entity authority)
- [ ] Use ProfilePage schema for team member pages
- [ ] Include clear, quotable expertise statements in service page descriptions
- [ ] Produce original industry research and surveys AI systems can cite
- [ ] Structure thought leadership content with clear headings and extractable insights
- [ ] Maintain consistent agency entity information across directories, social profiles, and industry sites
- [ ] Monitor AI citation in ChatGPT, Perplexity, and Google AI Overviews for brand and key service terms
