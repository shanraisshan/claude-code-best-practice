# Architecture

## Overview

Claude SEO follows Anthropic's official Claude Code skill specification with a modular, multi-skill architecture.

## Directory Structure

```
~/.claude/
├── skills/
│   ├── seo/                  # Main orchestrator skill
│   │   ├── SKILL.md              # Entry point with routing logic
│   │   └── references/           # On-demand reference files
│   │       ├── cwv-thresholds.md
│   │       ├── schema-types.md
│   │       ├── eeat-framework.md
│   │       └── quality-gates.md
│   │
│   ├── seo-audit/            # Full site audit
│   ├── seo-competitor-pages/ # Competitor comparison pages
│   ├── seo-content/          # E-E-A-T analysis
│   ├── seo-geo/              # AI search optimization
│   ├── seo-hreflang/         # Hreflang/i18n SEO
│   ├── seo-images/           # Image optimization
│   ├── seo-page/             # Single page analysis
│   ├── seo-plan/             # Strategic planning
│   │   └── assets/           # Industry templates
│   ├── seo-programmatic/     # Programmatic SEO
│   ├── seo-schema/           # Schema markup
│   ├── seo-sitemap/          # Sitemap analysis/generation
│   └── seo-technical/        # Technical SEO
│
└── agents/
    ├── seo-technical.md      # Technical SEO specialist
    ├── seo-content.md        # Content quality reviewer
    ├── seo-schema.md         # Schema markup expert
    ├── seo-sitemap.md        # Sitemap architect
    ├── seo-performance.md    # Performance analyzer
    └── seo-visual.md         # Visual analyzer
```

## Orchestration Flow

### Full Audit

```
User Request → seo (orchestrator) → Detect business type
                                   → Spawn subagents in parallel:
                                     ├── seo-technical
                                     ├── seo-content
                                     ├── seo-schema
                                     ├── seo-sitemap
                                     ├── seo-performance
                                     └── seo-visual
                                   → Aggregate Results
                                   → Generate Report
```

### Individual Command

```
User Request (e.g., /seo page) → seo (orchestrator) → seo-page (sub-skill)
```

## Design Principles

1. **Progressive Disclosure** — Main SKILL.md is concise (<200 lines), reference files loaded on-demand
2. **Parallel Processing** — Subagents run concurrently during audits
3. **Quality Gates** — Built-in thresholds prevent bad recommendations
4. **Industry Awareness** — Templates for different business types

## Extension Points

### Adding a New Sub-Skill
1. Create `skills/seo-newskill/SKILL.md`
2. Add YAML frontmatter with name and description
3. Update main `seo/SKILL.md` to route to new skill

### Adding a New Subagent
1. Create `agents/seo-newagent.md`
2. Add YAML frontmatter with name, description, tools
3. Reference from relevant skills
