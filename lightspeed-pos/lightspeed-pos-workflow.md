# Lightspeed POS Workflow

> Query your Lightspeed Retail POS using natural language via Claude Code's Command → Agent → Skill pipeline.

[← Back to README](../README.md)

## Architecture

```
User: "/lightspeed how are sales today?"
  │
  ▼
┌──────────────────────────────────┐
│  /lightspeed command (haiku)     │  ← Thin orchestrator
│  • Parses user query             │
│  • Asks clarifying questions     │
│  • Invokes agent + skill         │
└──────────┬───────────────────────┘
           │ Agent tool
           ▼
┌──────────────────────────────────┐
│  lightspeed-agent (sonnet)       │  ← Autonomous data fetcher
│  • Preloaded: lightspeed-api-    │
│    fetcher skill (endpoint ref)  │
│  • OAuth via helper script       │
│  • Paginates, filters, aggregates│
│  • memory: project (trends)      │
│  • maxTurns: 15                  │
└──────────┬───────────────────────┘
           │ Returns structured data
           ▼
┌──────────────────────────────────┐
│  lightspeed-report-creator       │  ← Standalone skill
│  (Skill tool invocation)         │
│  • Formats data into markdown    │
│  • 5 report types                │
│  • Trend indicators from memory  │
│  • Writes to lightspeed-pos/     │
│    reports/                      │
└──────────────────────────────────┘
```

## Two Skill Patterns Used

| Pattern | Skill | How Used |
|---------|-------|----------|
| **Agent Skill** (preloaded) | `lightspeed-api-fetcher` | Full API reference injected into agent context at startup. Agent follows these instructions to construct API calls. Not user-invocable. |
| **Standalone Skill** (invoked) | `lightspeed-report-creator` | Called via `Skill` tool after data is fetched. Takes raw data from context and produces formatted reports. User-invocable. |

## Setup

### 1. Register a Lightspeed API App

Go to the [Lightspeed Developer Portal](https://developers.lightspeedhq.com/retail/introduction/introduction/) and register an OAuth application.

### 2. Configure Credentials

```bash
cd lightspeed-pos
cp .env.example .env
# Edit .env with your credentials
```

### 3. Complete OAuth Flow

The first time, you need to complete the OAuth authorization flow to get a refresh token. The `lightspeed_auth.py` script handles token refresh after that.

### 4. Use It

```
/lightspeed how are sales today?
/lightspeed what's running low in inventory?
/lightspeed who are my top 10 customers this month?
/lightspeed how did each employee perform this week?
/lightspeed compare this week to last week
```

## Files

```
.claude/
├── commands/lightspeed.md                    # /lightspeed command (orchestrator)
├── agents/lightspeed-agent.md                # Data fetching agent
└── skills/
    ├── lightspeed-api-fetcher/
    │   ├── SKILL.md                          # API endpoint reference (agent skill)
    │   └── reference.md                      # Full endpoint list + query patterns
    └── lightspeed-report-creator/
        ├── SKILL.md                          # Report formatting skill
        └── reference.md                      # Report templates + formatting rules

lightspeed-pos/
├── .env.example                              # Credential template
├── .env                                      # Your credentials (git-ignored)
├── .gitignore                                # Protects secrets + generated reports
├── .token-cache.json                         # OAuth token cache (git-ignored)
├── scripts/
│   └── lightspeed_auth.py                    # OAuth token manager
├── reports/                                  # Generated reports land here
│   └── .gitkeep
└── lightspeed-pos-workflow.md                # This file
```

## Key Architectural Features

| Feature | How It's Used |
|---------|--------------|
| **Agent Memory** (`memory: project`) | Stores previous query results for trend comparison ("sales up 12% vs last week") |
| **Model Tiering** | Command runs on haiku (fast orchestration), agent runs on sonnet (complex API work) |
| **Permission Mode** (`acceptEdits`) | Agent can write report files without prompting |
| **maxTurns: 15** | Enough for multi-endpoint queries with pagination |
| **Hooks** | Sound notifications on tool use (PreToolUse/PostToolUse) |
| **Progressive Disclosure** | SKILL.md has core instructions; reference.md has full endpoint catalog |

## Monetization Potential

This pattern can be packaged as a **Retail Analytics Agent** for any Lightspeed merchant:

- **SaaS Model**: Monthly subscription for always-on POS analytics via Claude Code
- **Consulting**: Set up the workflow for merchants, train them on natural language queries
- **White-Label**: Replace Lightspeed with any POS API (Square, Shopify, Clover) — same architecture
- **Add-On Services**: Automated daily reports via `/loop`, inventory reorder alerts, employee scheduling insights
