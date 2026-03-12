<!-- Updated: 2026-02-07 -->
# Local Service Business SEO Strategy Template

## Industry Characteristics

- Geographic-focused searches
- High intent, quick decision making
- Reviews heavily influence decisions
- Phone calls are primary conversion
- Mobile-first user behavior
- Emergency/urgent service needs

## Recommended Site Architecture

```
/
├── Home
├── /services
│   ├── /service-1
│   ├── /service-2
│   └── ...
├── /locations
│   ├── /city-1
│   │   ├── /service-1-city-1
│   │   └── ...
│   ├── /city-2
│   └── ...
├── /about
├── /reviews
├── /gallery (or /portfolio)
├── /blog
├── /contact
├── /emergency (if applicable)
└── /faq
```

## Quality Gates

### Location Page Limits
- ⚠️ **WARNING** at 30+ location pages
- 🛑 **HARD STOP** at 50+ location pages

### Unique Content Requirements
| Page Type | Min Words | Unique % |
|-----------|-----------|----------|
| Primary Location | 600 | 60%+ |
| Service Area | 500 | 40%+ |
| Service Page | 800 | 100% |

### What Makes Location Pages Unique
- Local landmarks and neighborhoods
- Specific services offered at that location
- Local team members
- Location-specific testimonials
- Community involvement
- Local regulations or considerations

## Schema Recommendations

| Page Type | Schema Types |
|-----------|-------------|
| Homepage | LocalBusiness, Organization |
| Service Pages | Service, LocalBusiness |
| Location Pages | LocalBusiness (with geo) |
| Contact | ContactPage, LocalBusiness |
| Reviews | LocalBusiness (with AggregateRating) |

### LocalBusiness Schema Example
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Business Name",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345"
  },
  "telephone": "+1-555-555-5555",
  "openingHours": "Mo-Fr 08:00-18:00",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.7128",
    "longitude": "-74.0060"
  },
  "areaServed": ["City 1", "City 2"],
  "priceRange": "$$"
}
```

## Google Business Profile Integration

- Ensure NAP consistency (Name, Address, Phone)
- Sync service categories
- Regular post updates
- Photo uploads
- Review response strategy

### Google Business Profile Updates (2025-2026)

- **Video verification** is now standard — postcard verification has been largely phased out. Prepare for a short video verification process showing the business location or service area.
- **WhatsApp integration** replaced Google Business Chat (deprecated). Businesses can connect WhatsApp as their primary messaging channel.
- **Q&A removed from Maps** — replaced by AI-generated answers. Ensure your GBP description, services, and website FAQ are comprehensive, as Google AI uses them to answer queries.
- **Business hours are a top-5 ranking factor** — "Business is open at time of search" ranked as a top individual factor for the first time (Whitespark 2026 Local Search Ranking Factors Report). Keep hours accurate; consider extended hours if feasible.
- **Review "Stories" format** — Google Maps now shows review snippets in a swipeable Stories format on mobile. Encourage detailed, descriptive reviews with photos.

### Service Area Business (SAB) Update (June 2025)

Google updated SAB guidelines to **disallow entire states or countries** as service areas. SABs must specify: cities, postal/ZIP codes, or neighborhoods. If you serve an entire metro area, list the major cities within it rather than the state.

### AI Visibility for Local Businesses

AI Overviews appear for only ~0.14% of local keywords (March 2025 data) — local SEO faces significantly less AI disruption than other verticals. However, ChatGPT and Perplexity are increasingly used for local recommendations.

To optimize for AI local visibility:
- Ensure presence on expert-curated "best of" lists (ranked #1 AI visibility factor in Whitespark 2026 report)
- Maintain consistent NAP (Name, Address, Phone) across all platforms
- Build genuine review volume and quality
- Use LocalBusiness schema with complete properties (geo, openingHours, priceRange, areaServed)

## Content Priorities

### High Priority
1. Homepage with clear service area
2. Core service pages
3. Primary city page
4. Contact page with all locations

### Medium Priority
1. Service + location combination pages
2. FAQ page
3. About/team page
4. Reviews/testimonials page

### Blog Topics
- Seasonal maintenance tips
- How to choose a [service provider]
- Warning signs of [problem]
- DIY vs professional comparisons
- Local regulations and permits

## Key Metrics to Track

- Local pack rankings
- Phone call volume from organic
- Direction requests
- Google Business Profile insights
- Reviews count and rating

## Generative Engine Optimization (GEO) for Local

- [ ] Include clear, quotable service descriptions and pricing ranges
- [ ] Use LocalBusiness schema with complete geo, openingHours, and areaServed
- [ ] Build presence on curated "best of" and local directory lists
- [ ] Maintain consistent NAP across all platforms (Google, Yelp, Apple Maps)
- [ ] Include original photos of work, team, and location
- [ ] Structure FAQ content for common local service questions
- [ ] Monitor AI citation in ChatGPT and Perplexity local recommendations
