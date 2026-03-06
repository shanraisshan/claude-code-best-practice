---
name: seo-schema
description: >
  Detect, validate, and generate Schema.org structured data. JSON-LD format
  preferred. Use when user says "schema", "structured data", "rich results",
  "JSON-LD", or "markup".
---

# Schema Markup Analysis & Generation

## Detection

1. Scan page source for JSON-LD `<script type="application/ld+json">`
2. Check for Microdata (`itemscope`, `itemprop`)
3. Check for RDFa (`typeof`, `property`)
4. Always recommend JSON-LD as primary format

## Validation

- Check required properties per schema type
- Validate against Google's supported rich result types
- Common errors: Missing @context, Invalid @type, Wrong data types, Placeholder text, Relative URLs, Invalid date formats
- Flag deprecated types (see below)

## Schema Type Status (as of Feb 2026)

### ACTIVE — recommend freely:
Organization, LocalBusiness, SoftwareApplication, WebApplication, Product (with Certification markup), ProductGroup, Offer, Service, Article, BlogPosting, NewsArticle, Review, AggregateRating, BreadcrumbList, WebSite, WebPage, Person, ProfilePage, ContactPage, VideoObject, ImageObject, Event, JobPosting, Course, DiscussionForumPosting, BroadcastEvent, Clip, SeekToAction, SoftwareSourceCode

### RESTRICTED — only for specific sites:
- **FAQ**: ONLY for government and healthcare authority sites (restricted Aug 2023)

### DEPRECATED — never recommend:
- **HowTo**: Rich results removed September 2023
- **SpecialAnnouncement**: Deprecated July 31, 2025
- **CourseInfo, EstimatedSalary, LearningVideo**: Retired June 2025
- **ClaimReview**: Retired from rich results June 2025
- **VehicleListing**: Retired from rich results June 2025
- **Practice Problem**: Retired late 2025
- **Dataset**: Retired late 2025

> **JS Rendering Note:** Per Google's December 2025 guidance, structured data injected via JavaScript may face delayed processing. Include JSON-LD in initial server-rendered HTML.

## Common Schema Templates

### Organization
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Company Name]",
  "url": "[Website URL]",
  "logo": "[Logo URL]",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "[Phone]",
    "contactType": "customer service"
  },
  "sameAs": ["[Facebook URL]", "[LinkedIn URL]", "[Twitter URL]"]
}
```

### LocalBusiness
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[Business Name]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street]",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "telephone": "[Phone]",
  "openingHours": "Mo-Fr 09:00-17:00",
  "geo": { "@type": "GeoCoordinates", "latitude": "[Lat]", "longitude": "[Long]" }
}
```

### Article/BlogPosting
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Title]",
  "author": { "@type": "Person", "name": "[Author Name]" },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "image": "[Image URL]",
  "publisher": {
    "@type": "Organization",
    "name": "[Publisher]",
    "logo": { "@type": "ImageObject", "url": "[Logo URL]" }
  }
}
```

## Output

- `SCHEMA-REPORT.md` — detection and validation results
- `generated-schema.json` — ready-to-use JSON-LD snippets
