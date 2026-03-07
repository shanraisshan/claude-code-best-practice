{
  "skill_name": "seo-audit",
  "evals": [
    {
      "id": 1,
      "prompt": "Can you do an SEO audit of our SaaS website? We're getting about 2,000 organic visits/month but feel like we should be getting more. URL: https://example.com",
      "expected_output": "Should check for product-marketing-context.md first. Should ask clarifying questions about priority keywords, Search Console access, recent changes, and competitors. Should follow the audit framework priority order: Crawlability & Indexation, Technical Foundations, On-Page Optimization, Content Quality, Authority & Links. Should check robots.txt, XML sitemap, site architecture. Should evaluate title tags, meta descriptions, heading structure, and content optimization. Should NOT report on schema markup based solely on web_fetch (must note the detection limitation). Output should follow the Audit Report Structure: Executive Summary, Technical SEO Findings, On-Page SEO Findings, Content Findings, and Prioritized Action Plan.",
      "assertions": [
        "Checks for product-marketing-context.md",
        "Asks clarifying questions about keywords, Search Console, recent changes",
        "Follows audit priority order: crawlability first, then technical, on-page, content, authority",
        "Checks robots.txt and XML sitemap",
        "Evaluates title tags, meta descriptions, heading structure",
        "Does NOT claim 'no schema found' based on web_fetch alone",
        "Notes schema markup detection limitation",
        "Output has Executive Summary",
        "Output has Prioritized Action Plan",
        "Each finding has Issue, Impact, Evidence, Fix, and Priority"
      ],
      "files": []
    },
    {
      "id": 2,
      "prompt": "Why am I not ranking for 'project management software'? We have a page targeting that keyword but it's stuck on page 3.",
      "expected_output": "Should trigger on the casual 'why am I not ranking' phrasing. Should investigate both on-page and off-page factors. On-page: check title tag, H1, URL alignment with keyword; evaluate content depth vs competitors; check for keyword cannibalization. Technical: check indexation status, canonical tags, crawlability. Content quality: assess E-E-A-T signals, content depth, user engagement. Should provide specific, actionable fixes organized by priority. Should mention competitive analysis against current top-ranking pages.",
      "assertions": [
        "Triggers on casual 'why am I not ranking' phrasing",
        "Checks title tag, H1, URL alignment with target keyword",
        "Evaluates content depth vs competitors",
        "Checks for keyword cannibalization",
        "Checks indexation status and canonical tags",
        "Assesses E-E-A-T signals",
        "Mentions competitive analysis against top-ranking pages",
        "Provides actionable fixes organized by priority"
      ],
      "files": []
    },
    {
      "id": 3,
      "prompt": "We just migrated from WordPress to Next.js and our organic traffic dropped 40% in the last month. Help!",
      "expected_output": "Should treat this as an urgent migration diagnostic. Should immediately check: redirect mapping (301s from old URLs to new), canonical tags on new pages, robots.txt not blocking crawlers, XML sitemap submitted and updated, meta tags preserved. Should check for common migration issues: redirect chains/loops, soft 404s, lost internal links, changed URL structures without redirects. Should reference Search Console coverage report for indexation issues. Should provide a prioritized recovery plan with critical fixes first. Should mention monitoring timeline expectations (recovery can take weeks).",
      "assertions": [
        "Treats as urgent migration diagnostic",
        "Checks redirect mapping (301s)",
        "Checks canonical tags on new pages",
        "Checks robots.txt not blocking crawlers",
        "Checks XML sitemap updated and submitted",
        "Checks for redirect chains or loops",
        "Checks for soft 404s",
        "References Search Console coverage report",
        "Provides prioritized recovery plan",
        "Mentions recovery timeline expectations"
      ],
      "files": []
    },
    {
      "id": 4,
      "prompt": "Review the technical SEO of our e-commerce site. We have about 50,000 products and use faceted navigation.",
      "expected_output": "Should focus on e-commerce-specific technical issues: faceted navigation creating duplicate content, crawl budget management for large product catalog, parameterized URLs, product schema markup (with the caveat about detection limitations). Should check for thin category pages, duplicate product descriptions, out-of-stock page handling. Should address crawl budget issues: pagination, infinite scroll handling, session IDs in URLs. Should provide structured findings with Impact ratings and specific fixes.",
      "assertions": [
        "Addresses faceted navigation duplicate content",
        "Addresses crawl budget for large catalog",
        "Checks for parameterized URL issues",
        "Mentions product schema with detection limitation caveat",
        "Checks for thin category pages",
        "Checks for duplicate product descriptions",
        "Addresses out-of-stock page handling",
        "Addresses pagination and infinite scroll",
        "Findings include Impact ratings and specific fixes"
      ],
      "files": []
    },
    {
      "id": 5,
      "prompt": "Can you check our blog posts for on-page SEO issues? We publish 4 posts per week but traffic has been flat for 6 months.",
      "expected_output": "Should apply the Content/Blog Sites framework: check for outdated content not refreshed, keyword cannibalization, missing topical clustering, poor internal linking, missing author pages. Should audit on-page elements: title tags, meta descriptions, heading structure, keyword targeting per post. Should assess E-E-A-T signals for blog content. Should check for content depth issues and whether posts answer search intent. Should recommend a content audit process and provide a prioritized action plan for the existing content library.",
      "assertions": [
        "Applies Content/Blog Sites framework",
        "Checks for outdated content",
        "Checks for keyword cannibalization",
        "Checks for topical clustering",
        "Checks for internal linking quality",
        "Checks for author pages and E-E-A-T signals",
        "Audits title tags, meta descriptions, heading structure",
        "Assesses whether content answers search intent",
        "Recommends content audit process",
        "Provides prioritized action plan"
      ],
      "files": []
    },
    {
      "id": 6,
      "prompt": "I run a local plumbing business with 3 locations. My website barely shows up when people search for 'plumber near me' in our areas. What's wrong?",
      "expected_output": "Should apply the Local Business site-type framework. Should check for: inconsistent NAP (Name, Address, Phone) across the site, missing local schema markup (with detection limitation caveat), Google Business Profile optimization, missing individual location pages for each of the 3 locations, and missing local content. Should also check standard technical and on-page factors. Should recommend local-specific fixes: location-specific pages with unique content, local schema on each, GBP optimization, citation consistency.",
      "assertions": [
        "Applies Local Business framework",
        "Checks NAP consistency",
        "Checks for local schema markup with detection caveat",
        "Addresses Google Business Profile optimization",
        "Recommends individual location pages for each location",
        "Recommends local content strategy",
        "Checks standard technical SEO factors too",
        "Provides prioritized local SEO action plan"
      ],
      "files": []
    },
    {
      "id": 7,
      "prompt": "Our site loads really slowly, especially on mobile. Pages take 5-6 seconds to load. Is this hurting our SEO?",
      "expected_output": "Should focus on Site Speed and Core Web Vitals. Should explain CWV thresholds: LCP < 2.5s, INP < 200ms, CLS < 0.1, and that 5-6s load time is well above acceptable. Should investigate speed factors: server response time (TTFB), image optimization, JavaScript execution, CSS delivery, caching headers, CDN usage, font loading. Should recommend specific tools: PageSpeed Insights, WebPageTest, Chrome DevTools, Search Console CWV report. Should explain that yes, page speed is a ranking factor and directly impacts SEO. Should provide prioritized fixes.",
      "assertions": [
        "Focuses on Core Web Vitals",
        "Explains CWV thresholds (LCP, INP, CLS)",
        "Identifies 5-6s as well above acceptable",
        "Investigates specific speed factors",
        "Recommends specific diagnostic tools",
        "Confirms page speed impacts SEO rankings",
        "Provides prioritized speed fixes",
        "Addresses mobile-specific performance"
      ],
      "files": []
    },
    {
      "id": 8,
      "prompt": "I want to add FAQ schema to my product pages. Can you help me set that up?",
      "expected_output": "Should recognize this is a schema markup implementation task, not an SEO audit. Should defer to or cross-reference the schema-markup skill, which specifically handles structured data implementation including FAQ schema. May briefly mention that FAQ schema can enable rich results, but should make clear that schema-markup is the right skill for implementation.",
      "assertions": [
        "Recognizes this as schema markup implementation",
        "References or defers to schema-markup skill",
        "Does not attempt a full SEO audit",
        "May briefly mention FAQ schema benefits"
      ],
      "files": []
    }
  ]
}
