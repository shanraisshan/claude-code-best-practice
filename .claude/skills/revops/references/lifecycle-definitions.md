# Lifecycle Stage Definitions

Complete templates for lead lifecycle stages, MQL criteria by business type, SLAs, and rejection/recycling workflows.

## Stage Templates

### Subscriber

**Entry criteria:**
- Opted in to blog, newsletter, or content updates
- No company information required

**Exit criteria:**
- Provides company information via form or enrichment
- Visits 3+ pages in a session
- Downloads gated content

**Owner:** Marketing (automated)

**Actions on entry:**
- Add to newsletter nurture
- Begin tracking engagement score

---

### Lead

**Entry criteria:**
- Identified contact with name + email + company
- May come from form fill, enrichment, or import

**Exit criteria:**
- Reaches MQL threshold (fit + engagement)
- Manually qualified by marketing/SDR

**Owner:** Marketing

**Actions on entry:**
- Enrich contact data (company size, industry, role)
- Begin scoring
- Add to relevant nurture sequence

---

### MQL (Marketing Qualified Lead)

**Entry criteria:**
- Meets fit score threshold AND engagement score threshold
- OR triggers high-intent action (demo request, pricing page + form fill)

**Exit criteria:**
- Sales accepts (becomes SQL)
- Sales rejects (recycled to nurture with reason code)
- No response within SLA (escalated to manager)

**Owner:** Marketing → Sales (handoff)

**Actions on entry:**
- Instant alert to assigned sales rep
- Create follow-up task with 4-hour SLA
- Pause marketing nurture sequences
- Log all recent activity for sales context

---

### SQL (Sales Qualified Lead)

**Entry criteria:**
- Sales rep has had qualifying conversation
- Confirmed: budget, authority, need, or timeline (at least 2 of 4)

**Exit criteria:**
- Opportunity created with projected value
- Disqualified (recycled with reason code)

**Owner:** Sales (SDR or AE)

**Actions on entry:**
- Update lifecycle stage in CRM
- Notify AE if SDR-qualified
- Begin sales sequence if not already in conversation

---

### Opportunity

**Entry criteria:**
- Formal opportunity created in CRM
- Deal value, close date, and stage assigned

**Exit criteria:**
- Closed-won or closed-lost

**Owner:** Sales (AE)

**Actions on entry:**
- Add to pipeline reporting
- Create deal tasks (proposal, demo, etc.)
- Notify CS if deal is likely to close

---

### Customer

**Entry criteria:**
- Closed-won deal
- Contract signed and payment terms set

**Exit criteria:**
- Churns, expands, or renews

**Owner:** Customer Success / Account Management

**Actions on entry:**
- Trigger onboarding sequence
- Assign CS manager
- Schedule kickoff call
- Remove from all sales sequences

---

### Evangelist

**Entry criteria:**
- NPS score 9-10, or active referral behavior
- Agreed to case study, testimonial, or referral program

**Exit criteria:**
- Ongoing program participation

**Owner:** Customer Success + Marketing

**Actions on entry:**
- Add to advocacy program
- Request case study or testimonial
- Invite to referral program
- Feature in marketing campaigns (with permission)

---

## MQL Criteria Templates by Business Type

### PLG (Product-Led Growth)

**Fit score (40% weight):**

| Attribute | Points |
|-----------|--------|
| Company size 10-500 | +15 |
| Company size 500-5000 | +20 |
| Target industry | +10 |
| Decision-maker role | +15 |
| Uses complementary tool | +10 |

**Engagement score (60% weight) — weight product usage heavily:**

| Signal | Points |
|--------|--------|
| Created free account | +15 |
| Completed onboarding | +20 |
| Used core feature 3+ times | +25 |
| Invited team member | +20 |
| Hit usage limit | +15 |
| Visited pricing page | +10 |

**MQL threshold:** 65 points

---

### Sales-Led (Enterprise)

**Fit score (60% weight) — weight fit heavily:**

| Attribute | Points |
|-----------|--------|
| Company size 500+ | +20 |
| Target industry | +15 |
| VP+ title | +20 |
| Budget authority confirmed | +15 |
| Uses competitor product | +10 |

**Engagement score (40% weight):**

| Signal | Points |
|--------|--------|
| Requested demo | +25 |
| Attended webinar | +10 |
| Downloaded whitepaper | +10 |
| Visited pricing page 2+ times | +15 |
| Engaged with sales email | +10 |

**MQL threshold:** 70 points

---

### Mid-Market (Balanced)

**Fit score (50% weight):**

| Attribute | Points |
|-----------|--------|
| Company size 50-1000 | +15 |
| Target industry | +10 |
| Manager+ title | +15 |
| Target geography | +10 |

**Engagement score (50% weight):**

| Signal | Points |
|--------|--------|
| Demo request | +25 |
| Free trial signup | +20 |
| Pricing page visit | +10 |
| Content download (2+) | +10 |
| Email click (3+) | +10 |
| Webinar attendance | +10 |

**MQL threshold:** 60 points

---

## SLA Templates

### MQL-to-SQL SLA

| Metric | Target | Escalation |
|--------|--------|------------|
| First contact attempt | Within 4 business hours | Alert to sales manager at 4 hours |
| Qualification decision | Within 48 hours | Auto-escalate at 48 hours |
| Meeting scheduled (if qualified) | Within 5 business days | Weekly pipeline review flag |

### SQL-to-Opportunity SLA

| Metric | Target | Escalation |
|--------|--------|------------|
| Discovery call completed | Within 3 business days of SQL | Alert to AE manager |
| Opportunity created | Within 5 business days of SQL | Pipeline review flag |

### Opportunity-to-Close SLA

| Metric | Target | Escalation |
|--------|--------|------------|
| Proposal delivered | Within 5 business days of demo | AE manager alert |
| Deal stale in stage | 2x average days for that stage | Pipeline review flag |
| Close date pushed 2+ times | Immediate | Forecast review required |

---

## Lead Rejection and Recycling

### Rejection Reason Codes

| Code | Reason | Recycle Action |
|------|--------|----------------|
| **FIT-01** | Company too small | Nurture; re-score if company grows |
| **FIT-02** | Wrong industry | Archive; do not recycle |
| **FIT-03** | Wrong role / no authority | Nurture; monitor for org changes |
| **ENG-01** | No response after 3 attempts | Recycle to nurture in 90 days |
| **ENG-02** | Interested but bad timing | Recycle to nurture; re-engage in 60 days |
| **QUAL-01** | No budget | Recycle to nurture in 90 days |
| **QUAL-02** | Using competitor, locked in | Recycle; trigger before contract renewal |
| **QUAL-03** | Not a real project | Archive; do not recycle |

### Recycling Workflow

1. Sales rejects MQL with reason code
2. CRM updates lifecycle stage to "Recycled"
3. Lead enters recycling nurture sequence (different from original nurture)
4. Engagement score resets to baseline (keep fit score)
5. If lead re-engages and crosses MQL threshold, re-route to sales with "Recycled MQL" flag
6. Track recycled MQL conversion rate separately

### Recycling Nurture Sequence

- **Frequency:** Bi-weekly or monthly (lower frequency than initial nurture)
- **Content:** Industry insights, case studies, product updates
- **Duration:** 6 months, then archive if no engagement
- **Re-MQL trigger:** High-intent action (demo request, pricing page revisit)
