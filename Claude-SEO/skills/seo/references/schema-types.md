# Schema.org Type Status (February 2026)

## ACTIVE — Recommend Freely

| Type | Use Case |
|------|----------|
| Organization | Company/brand pages |
| LocalBusiness | Local business pages |
| SoftwareApplication | Software/app pages |
| WebApplication | Web app pages |
| Product | Product pages (with Certification as of April 2025) |
| ProductGroup | Products with variants (size, color) |
| Offer | Pricing/availability |
| Service | Service pages |
| Article | General articles |
| BlogPosting | Blog posts |
| NewsArticle | News articles |
| Review | Individual reviews |
| AggregateRating | Aggregate ratings |
| BreadcrumbList | Navigation breadcrumbs |
| WebSite | Site-level with SearchAction |
| WebPage | Generic page |
| Person | Author/team pages |
| ProfilePage | Profile pages |
| ContactPage | Contact pages |
| VideoObject | Video content |
| ImageObject | Image content |
| Event | Events |
| JobPosting | Job listings |
| Course | Course pages |
| DiscussionForumPosting | Forum posts |
| BroadcastEvent | Live broadcasts |
| Clip | Video clips |
| SeekToAction | Video seek |
| SoftwareSourceCode | Code repositories |

## RESTRICTED — Only for Specific Sites

| Type | Restriction |
|------|-------------|
| **FAQPage** | ONLY government and healthcare authority sites (restricted August 2023) |

## DEPRECATED — Never Recommend

| Type | Status | Date |
|------|--------|------|
| **HowTo** | Rich results removed | September 2023 |
| **SpecialAnnouncement** | Deprecated | July 31, 2025 |
| **CourseInfo** | Retired | June 2025 |
| **EstimatedSalary** | Retired | June 2025 |
| **LearningVideo** | Retired | June 2025 |
| **ClaimReview** | Retired from rich results | June 2025 |
| **VehicleListing** | Retired from rich results | June 2025 |
| **Practice Problem** | Retired from rich results | Late 2025 |
| **Dataset** | Retired from rich results | Late 2025 |

## Key Notes

- **JSON-LD** is Google's stated preferred format
- Use `https://schema.org` as @context (not http)
- All URLs must be absolute
- Dates must be ISO 8601 format
- Product structured data should be in initial server-rendered HTML (not JS-injected) per December 2025 Google guidance
