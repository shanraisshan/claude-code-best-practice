---
name: gtm-planning
description: |
  Go-to-market planning skill for developing channel strategy, tactics,
  timeline, and budget allocation for product launches.

trigger: |
  - Positioning and messaging complete
  - New product launch planning
  - User requests "GTM plan" or "go-to-market strategy"

skip_when: |
  - Positioning not done → complete positioning-development first
  - Launch execution needed → use launch-execution
  - Pricing analysis needed → use pricing-strategy first
---

# GTM Planning

Comprehensive go-to-market planning including channel strategy, tactics, timeline, and budget allocation.

## Purpose

GTM planning translates positioning and messaging into market execution:
- Defines how to reach target customers
- Specifies channels and tactics
- Creates timeline and milestones
- Allocates resources and budget

**HARD GATE:** Positioning and messaging MUST be completed before GTM planning.

## Process

### Phase 1: GTM Strategy

Define strategic approach:

```markdown
## GTM Strategy

### Launch Type
**Type:** [New Product / Major Feature / Minor Update / Repositioning]
**Tier:** [Tier 1 (Max) / Tier 2 (Moderate) / Tier 3 (Minimal)]
**Rationale:** [Why this tier]

### GTM Model
**Primary Model:** [Product-Led / Sales-Led / Partner-Led / Hybrid]
**Motion:**
- **Acquisition:** [How we get customers]
- **Activation:** [How we convert trials]
- **Monetization:** [How we generate revenue]

### Target Metrics
| Metric | Target | Timeline |
|--------|--------|----------|
| Awareness: [Metric] | [Target] | [By when] |
| Consideration: [Metric] | [Target] | [By when] |
| Conversion: [Metric] | [Target] | [By when] |
| Revenue: [Metric] | [Target] | [By when] |

### Success Criteria
- **Launch Success:** [Definition]
- **30-Day Success:** [Definition]
- **90-Day Success:** [Definition]
```

### Phase 2: Channel Strategy

Select and prioritize channels:

```markdown
## Channel Strategy

### Channel Evaluation
| Channel | Reach | Cost | Fit | Priority |
|---------|-------|------|-----|----------|
| [Channel 1] | HIGH/MED/LOW | HIGH/MED/LOW | HIGH/MED/LOW | PRIMARY/SECONDARY/TERTIARY |
| [Channel 2] | ... | ... | ... | ... |
| [Channel 3] | ... | ... | ... | ... |

### Primary Channels
**Channel 1: [Name]**
- Role: [Awareness / Consideration / Conversion]
- Investment: [$ or %]
- Expected Outcome: [Metric]
- Timeline: [When active]

**Channel 2: [Name]**
[Repeat structure]

### Channel Mix
| Stage | Channels | Budget Allocation |
|-------|----------|------------------|
| Awareness | [Channel list] | X% |
| Consideration | [Channel list] | X% |
| Conversion | [Channel list] | X% |
| Retention | [Channel list] | X% |

### Channel Dependencies
- [Channel X] feeds [Channel Y]
- [Sequential requirements]
```

### Phase 3: Tactical Plan

Define specific tactics:

```markdown
## Tactical Plan

### Launch Tactics
| Tactic | Channel | Owner | Timeline | Budget |
|--------|---------|-------|----------|--------|
| [Tactic 1] | [Channel] | [Team/Person] | [Date] | [$] |
| [Tactic 2] | ... | ... | ... | ... |
| [Tactic 3] | ... | ... | ... | ... |

### Content Plan
| Content Type | Purpose | Channel | Due Date |
|--------------|---------|---------|----------|
| [Blog post] | [Awareness] | [Blog] | [Date] |
| [Case study] | [Consideration] | [Sales] | [Date] |
| [Demo video] | [Conversion] | [Website] | [Date] |

### Campaign Plan
**Campaign 1: [Name]**
- Objective: [What we want to achieve]
- Audience: [Target segment]
- Channels: [Channel list]
- Timeline: [Start - End]
- Key Messages: [From messaging framework]
- Creative Requirements: [Assets needed]
- Budget: [$]
- Success Metric: [KPI]

### Partner/Influencer Plan
| Partner Type | Target | Value Prop | Status |
|--------------|--------|------------|--------|
| [Type 1] | [Specific partner] | [Why they'd participate] | NOT STARTED/IN PROGRESS/CONFIRMED |

### PR Plan
| Activity | Target | Timeline | Status |
|----------|--------|----------|--------|
| Press release | [Publication targets] | [Date] | DRAFT/FINAL |
| Analyst briefing | [Analyst targets] | [Date] | SCHEDULED/PENDING |
| Media outreach | [Media targets] | [Date] | IN PROGRESS/NOT STARTED |
```

### Phase 4: Timeline and Milestones

Create launch timeline:

```markdown
## Launch Timeline

### Key Milestones
| Milestone | Date | Dependencies | Owner |
|-----------|------|--------------|-------|
| GTM Plan Approved | [Date] | [None] | [Owner] |
| Content Complete | [Date] | [Messaging final] | [Owner] |
| Sales Enablement Complete | [Date] | [Content complete] | [Owner] |
| Launch Day | [Date] | [All above] | [Owner] |
| 30-Day Review | [Date] | [Launch day] | [Owner] |

### Weekly Schedule (Launch -4 weeks to Launch +2 weeks)

**Week -4:**
- [ ] [Task 1]
- [ ] [Task 2]

**Week -3:**
- [ ] [Task 1]
- [ ] [Task 2]

**Week -2:**
- [ ] [Task 1]
- [ ] [Task 2]

**Week -1:**
- [ ] [Task 1]
- [ ] [Task 2]

**Launch Week:**
- [ ] [Task 1]
- [ ] [Task 2]

**Week +1:**
- [ ] [Task 1]
- [ ] [Task 2]

**Week +2:**
- [ ] [Task 1]
- [ ] [Task 2]
```

### Phase 5: Budget and Resources

Allocate resources:

```markdown
## Budget and Resources

### Budget Allocation
| Category | Amount | % of Total |
|----------|--------|------------|
| Paid Media | $X | X% |
| Content Creation | $X | X% |
| Events | $X | X% |
| PR/Analyst | $X | X% |
| Sales Enablement | $X | X% |
| Tools/Tech | $X | X% |
| Contingency | $X | X% |
| **TOTAL** | **$X** | **100%** |

### Resource Requirements
| Role | Commitment | Duration |
|------|------------|----------|
| [Role 1] | [X hours/week] | [Weeks] |
| [Role 2] | [X hours/week] | [Weeks] |

### External Resources
| Need | Type | Budget | Status |
|------|------|--------|--------|
| [Agency/Contractor] | [Purpose] | [$] | IDENTIFIED/ENGAGED |

### Risk and Contingency
| Risk | Likelihood | Impact | Contingency |
|------|------------|--------|-------------|
| [Risk 1] | HIGH/MED/LOW | HIGH/MED/LOW | [Backup plan] |
| [Risk 2] | ... | ... | ... |
```

## Output Format

```markdown
# GTM Plan: [Product/Feature]

## Executive Summary
- **Launch Date:** [Date]
- **GTM Model:** [Model]
- **Primary Channels:** [Top 3]
- **Budget:** [$X total]
- **Success Metric:** [Primary KPI]

## GTM Strategy
[Phase 1 output]

## Channel Strategy
[Phase 2 output]

## Tactical Plan
[Phase 3 output]

## Timeline
[Phase 4 output]

## Budget and Resources
[Phase 5 output]

## Approvals Required
- [ ] Marketing Leadership
- [ ] Sales Leadership
- [ ] Product Leadership
- [ ] Executive Sponsor

## Dependencies
- Positioning: [Link to positioning.md]
- Messaging: [Link to messaging-framework.md]
- Pricing: [Link to pricing-strategy.md if available]
```

## Blocker Criteria

| Blocker | Action |
|---------|--------|
| No positioning/messaging | STOP. Complete prerequisites first. |
| Budget not approved | STOP. Cannot plan without budget clarity. |
| Launch date not set | STOP. Timeline requires fixed launch date. |
| No channel alignment | STOP. Stakeholders must agree on channels. |

## Anti-Rationalization Table

See [shared-patterns/anti-rationalization.md](../shared-patterns/anti-rationalization.md) for universal anti-rationalizations.

### Gate-Specific Anti-Rationalizations

| Rationalization | Why It's WRONG | Required Action |
|-----------------|----------------|-----------------|
| "We'll figure out budget later" | Budget determines tactics. Tactics without budget are wishes. | **Define budget before tactics** |
| "All channels are important" | All channels = no focus. Prioritization is mandatory. | **Rank and prioritize channels** |
| "Timeline is flexible" | Flexible timelines cause scope creep and delays | **Set fixed milestones** |
| "We know what works" | Past success ≠ future success. Markets change. | **Evaluate channels systematically** |

## Pressure Resistance

See [shared-patterns/pressure-resistance.md](../shared-patterns/pressure-resistance.md) for universal pressure scenarios.

### Gate-Specific Pressures

| Pressure Type | Request | Agent Response |
|---------------|---------|----------------|
| "Just launch" | "We'll plan as we go" | "Unplanned launches waste resources. Completing GTM plan." |
| "Copy competitor's GTM" | "They succeeded, do what they did" | "Competitor GTM serves their positioning. Creating unique GTM." |
| "Cut the timeline" | "We need to launch faster" | "Rushed GTM causes launch failures. Recommend scope reduction instead." |

## Execution Report

Base metrics per [shared-patterns/execution-report.md](../shared-patterns/execution-report.md):

| Metric | Value |
|--------|-------|
| Duration | Xm Ys |
| Iterations | N |
| Result | PASS/FAIL/PARTIAL |

### Gate-Specific Details
- channels_evaluated: N
- channels_selected: N
- tactics_planned: N
- milestones_defined: N
- budget_allocated: YES/NO
- timeline_created: YES/NO
