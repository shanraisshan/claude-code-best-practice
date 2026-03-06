# claude-code-best-practice

Practice makes Claude perfect — **62 skills**, **2 agents**, **130+ marketing tool integrations**

> Forked from [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) and extended with community skills and a full marketing toolkit.

[![Best Practice](!/tags/best-practice.svg)](best-practice/) *Best practices*
[![Implemented](!/tags/implemented.svg)](implementation/) *Implementation*
[![Orchestration Workflow](!/tags/orchestration-workflow.svg)](orchestration-workflow/orchestration-workflow.md) *Command → Agent → Skill workflow*

---

## SKILLS LIBRARY (62 skills)

All skills live in `.claude/skills/<name>/SKILL.md` and are auto-discovered by Claude Code.

### Development & Engineering (25)

| Skill | Description |
|-------|-------------|
| `fix` | Lint and formatting fixes before CI |
| `github` | GitHub CLI (`gh`) for issues, PRs, CI runs |
| `create-pr` | Create PRs with validated title format |
| `docstring` | PyTorch docstring conventions |
| `coding-agent` | Run Codex, Claude Code, OpenCode via background process |
| `gog` | Google Workspace CLI (Gmail, Calendar, Drive, Sheets) |
| `use-ai-sdk` | Build AI features with Vercel AI SDK |
| `update-docs` | Next.js documentation updater workflow |
| `add-malli-schemas` | Malli schemas for Metabase API endpoints |
| `angular-migration` | AngularJS to Angular migration |
| `backend-patterns` | Node.js/Express/Next.js API architecture |
| `implementing-jsc-classes-cpp` | JavaScriptCore C++ bindings |
| `implementing-jsc-classes-zig` | Bun Zig bindings for JSC |
| `develop-ai-functions-example` | AI SDK function examples |
| `workflow-orchestration-patterns` | Temporal durable workflows |
| `rag-implementation` | RAG systems with vector databases |
| `python-code-style` | Python linting, formatting, naming |
| `python-error-handling` | Exception hierarchies, validation |
| `python-type-safety` | Type hints, generics, protocols |
| `python-project-structure` | Module architecture, public API |
| `python-resource-management` | Context managers, cleanup, streaming |
| `python-background-jobs` | Task queues, workers, event-driven |
| `creating-financial-models` | DCF analysis, Monte Carlo, sensitivity |
| `startup-financial-modeling` | Revenue forecasting, burn rate, runway |
| `gtm-planning` | Go-to-market strategy and budget |

### Marketing (32)

| Skill | Description |
|-------|-------------|
| **Copy & Content** | |
| `copywriting` | Landing page, homepage, feature page copy |
| `copy-editing` | Review and improve existing marketing copy |
| `content-strategy` | Content planning and topic selection |
| `social-content` | LinkedIn, Twitter/X, Instagram, TikTok posts |
| `cold-email` | B2B cold outreach and follow-up sequences |
| `email-sequence` | Drip campaigns and lifecycle emails |
| **SEO** | |
| `seo-audit` | Technical SEO diagnosis and fixes |
| `ai-seo` | Optimize for AI search engines (AEO/GEO) |
| `programmatic-seo` | Template pages at scale |
| `schema-markup` | JSON-LD structured data |
| `site-architecture` | URL structure, navigation, internal linking |
| **CRO (Conversion Rate Optimization)** | |
| `page-cro` | Landing page and homepage optimization |
| `form-cro` | Lead capture and contact forms |
| `signup-flow-cro` | Registration and trial activation |
| `onboarding-cro` | Post-signup activation and time-to-value |
| `paywall-upgrade-cro` | In-app upsell and feature gates |
| `popup-cro` | Exit intent, modals, slide-ins |
| **Ads & Growth** | |
| `paid-ads` | Google, Meta, LinkedIn, TikTok campaigns |
| `ad-creative` | Headlines, descriptions, ad variations at scale |
| `ab-test-setup` | Experiment design and sample sizing |
| `marketing-ideas` | Growth ideas and strategies for SaaS |
| `marketing-psychology` | Cognitive biases and persuasion principles |
| `free-tool-strategy` | Engineering as marketing |
| `launch-strategy` | Product Hunt, beta, feature launches |
| **Sales & Revenue** | |
| `pricing-strategy` | Tiers, freemium, packaging decisions |
| `sales-enablement` | Pitch decks, one-pagers, objection handling |
| `competitor-alternatives` | Vs pages and comparison content |
| `referral-program` | Affiliate and word-of-mouth programs |
| `revops` | Lead scoring, routing, lifecycle management |
| `churn-prevention` | Cancel flows, dunning, retention |
| `product-marketing-context` | Positioning and audience context doc |

### Marketing Tools Registry (130+ integrations)

The `marketing-tools` skill provides a reference library for connecting to marketing SaaS platforms:

- **68 integration guides** — Auth, API endpoints, common operations for GA4, HubSpot, Salesforce, Stripe, Mailchimp, Semrush, Meta Ads, and more
- **62 CLI wrappers** — Node.js scripts for direct API automation
- **REGISTRY.md** — Master index with capability matrix (API/MCP/CLI/SDK)

### Demo Skills (5)

| Skill | Description |
|-------|-------------|
| `weather-fetcher` | Fetch weather data from Open-Meteo API |
| `weather-svg-creator` | Generate SVG weather card |
| `agent-browser` | Browser automation CLI for AI agents |
| `presentation/*` | Self-evolving presentation system (3 sub-skills) |

---

## CONCEPTS

| Feature | Location | Description |
|---------|----------|-------------|
| [**Commands**](https://code.claude.com/docs/en/skills) | `.claude/commands/` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-commands.md) [![Implemented](!/tags/implemented.svg)](implementation/claude-commands-implementation.md) Entry-point prompts — invoke with `/command-name` |
| [**Sub-Agents**](https://code.claude.com/docs/en/sub-agents) | `.claude/agents/` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-subagents.md) [![Implemented](!/tags/implemented.svg)](implementation/claude-subagents-implementation.md) Custom agents with tools, permissions, and model |
| [**Skills**](https://code.claude.com/docs/en/skills) | `.claude/skills/` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-skills.md) [![Implemented](!/tags/implemented.svg)](implementation/claude-skills-implementation.md) Reusable knowledge and workflows — auto-discovered or invoked with `/skill-name` |
| [**Hooks**](https://code.claude.com/docs/en/hooks) | `.claude/hooks/` | [![Best Practice](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-voice-hooks) [![Implemented](!/tags/implemented.svg)](.claude/hooks/) Deterministic scripts on specific events |
| [**MCP Servers**](https://code.claude.com/docs/en/mcp) | `.claude/settings.json` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-mcp.md) [![Implemented](!/tags/implemented.svg)](.mcp.json) External tools, databases, and APIs |
| [**Settings**](https://code.claude.com/docs/en/settings) | `.claude/settings.json` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-settings.md) [![Implemented](!/tags/implemented.svg)](.claude/settings.json) Configuration, permissions, output styles |
| [**Memory**](https://code.claude.com/docs/en/memory) | `CLAUDE.md` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-memory.md) [![Implemented](!/tags/implemented.svg)](CLAUDE.md) Persistent context via CLAUDE.md files |

## ORCHESTRATION WORKFLOW

See [orchestration-workflow](orchestration-workflow/orchestration-workflow.md) for the **Command → Agent → Skill** pattern.

```bash
claude
/weather-orchestrator
```

| Component | Role | Example |
|-----------|------|---------|
| **Command** | Entry point | [`/weather-orchestrator`](.claude/commands/weather-orchestrator.md) |
| **Agent** | Fetches data (preloaded skill) | [`weather-agent`](.claude/agents/weather-agent.md) + [`weather-fetcher`](.claude/skills/weather-fetcher/SKILL.md) |
| **Skill** | Creates output | [`weather-svg-creator`](.claude/skills/weather-svg-creator/SKILL.md) |

## DEVELOPMENT WORKFLOWS

- [Cross-Model Claude Code + Codex](development-workflows/cross-model-workflow/cross-model-workflow.md)
- [RPI](development-workflows/rpi/rpi-workflow.md)
- [Boris Feb26 workflow](https://x.com/bcherny/status/2017742741636321619)
- [Ralph plugin with sandbox](https://www.youtube.com/watch?v=eAtvoGlpeRU)
- [Human Layer RPI](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md)
- [Github Speckit](https://github.com/github/spec-kit)
- [GSD - Get Shit Done](https://github.com/glittercowboy/get-shit-done)

## REPORTS

| Report | Description |
|--------|-------------|
| [Agent SDK vs CLI System Prompts](reports/claude-agent-sdk-vs-cli-system-prompts.md) | System prompt architecture differences |
| [Browser Automation MCP](reports/claude-in-chrome-v-chrome-devtools-mcp.md) | Playwright vs Chrome DevTools vs Claude in Chrome |
| [Global vs Project Settings](reports/claude-global-vs-project-settings.md) | Global-only vs dual-scope features |
| [Skills in Monorepos](reports/claude-skills-for-larger-mono-repos.md) | Skills discovery in large projects |
| [Agent Memory](reports/claude-agent-memory.md) | Persistent memory scopes for subagents |
| [Advanced Tool Use](reports/claude-advanced-tool-use.md) | PTC, Tool Search, Tool Use Examples |
| [Usage & Rate Limits](reports/claude-usage-and-rate-limits.md) | `/usage`, `/cost`, overflow billing |

## TIPS

**Workflows** — Keep CLAUDE.md under 150 lines. Use commands over standalone agents. Feature-specific subagents with skills (progressive disclosure). Manual `/compact` at 50%. Start with plan mode. `ultrathink` for complex reasoning.

**Daily** — Update Claude Code daily. Read the [changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md). Follow [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/).

**Utilities** — [iTerm](https://iterm2.com/)/[Ghostty](https://ghostty.org/)/tmux over IDE. [Wispr Flow](https://wisprflow.ai) for voice. Wildcard permissions (`Bash(npm run *)`). `/sandbox` for isolation. Output Styles (Explanatory for learning).

**Debugging** — `/doctor`. Background tasks for logs. Browser MCPs for console inspection. Screenshots for visual issues.

---

## Credits

- Original repo: [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice)
- Marketing skills: [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)
- Dev skills: Community contributions via [skillfish](https://skillfish.dev)
