---
name: marketing-tools
description: "Registry of 68 marketing tool integrations (APIs, CLIs, SDKs) covering analytics, SEO, CRM, email, ads, payments, and more. Use when the user needs to connect to or automate a marketing tool like GA4, HubSpot, Mailchimp, Stripe, Semrush, Meta Ads, LinkedIn Ads, Segment, Mixpanel, Apollo, Clearbit, or any SaaS marketing platform."
user-invocable: false
---

# Marketing Tools Registry

Reference library of marketing tool integrations for AI agents. Contains:

- **`REGISTRY.md`** — Master index of all tools with capability matrix (API/MCP/CLI/SDK)
- **`integrations/`** — 68 detailed integration guides (auth, endpoints, common operations)
- **`clis/`** — 62 Node.js CLI wrappers for direct API interaction

## Usage

When a skill (e.g. `analytics-tracking`, `paid-ads`, `seo-audit`) needs to interact with a specific tool, consult `REGISTRY.md` to find the right integration guide, then follow the setup instructions in `integrations/<tool>.md`.

For programmatic access, use the CLI wrapper in `clis/<tool>.js` with the appropriate API key set as an environment variable.
