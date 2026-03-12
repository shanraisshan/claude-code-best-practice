# Installation Guide

## Prerequisites

- **Claude Code CLI** installed and configured
- **Python 3.8+** with pip (optional, for advanced features)
- **Git** for cloning (optional)

## Quick Install

Copy the `skills/` and `agents/` directories to your Claude configuration:

```bash
# Copy skills
cp -r skills/* ~/.claude/skills/

# Copy agents
cp -r agents/* ~/.claude/agents/
```

## Manual Installation

### 1. Copy each component

```bash
# Main orchestrator
mkdir -p ~/.claude/skills/seo/references
cp skills/seo/SKILL.md ~/.claude/skills/seo/
cp skills/seo/references/* ~/.claude/skills/seo/references/

# Sub-skills
for skill in seo-audit seo-competitor-pages seo-content seo-geo seo-hreflang seo-images seo-page seo-plan seo-programmatic seo-schema seo-sitemap seo-technical; do
  mkdir -p ~/.claude/skills/$skill
  cp -r skills/$skill/* ~/.claude/skills/$skill/
done

# Agents
mkdir -p ~/.claude/agents
cp agents/seo-*.md ~/.claude/agents/
```

### 2. Install Playwright (optional, for visual analysis)

```bash
pip install playwright
playwright install chromium
```

## Verify Installation

1. Start Claude Code:
```bash
claude
```

2. Test the skill:
```
/seo
```

## Installation Paths

| Component | Path |
|-----------|------|
| Main skill | `~/.claude/skills/seo/` |
| Sub-skills | `~/.claude/skills/seo-*/` |
| Subagents | `~/.claude/agents/seo-*.md` |
| References | `~/.claude/skills/seo/references/` |
| Industry templates | `~/.claude/skills/seo-plan/assets/` |

## Uninstallation

```bash
rm -rf ~/.claude/skills/seo
rm -rf ~/.claude/skills/seo-audit
rm -rf ~/.claude/skills/seo-competitor-pages
rm -rf ~/.claude/skills/seo-content
rm -rf ~/.claude/skills/seo-geo
rm -rf ~/.claude/skills/seo-hreflang
rm -rf ~/.claude/skills/seo-images
rm -rf ~/.claude/skills/seo-page
rm -rf ~/.claude/skills/seo-plan
rm -rf ~/.claude/skills/seo-programmatic
rm -rf ~/.claude/skills/seo-schema
rm -rf ~/.claude/skills/seo-sitemap
rm -rf ~/.claude/skills/seo-technical
rm -f ~/.claude/agents/seo-*.md
```
