# Skills Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar_2%2C_2026-white?style=flat&labelColor=555)<br>
[![Implemented](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../implementation/claude-skills-implementation.md)

Complete reference for Claude Code skills — skill definitions, frontmatter fields, and invocation patterns.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Frontmatter Fields

Skills are defined in `.claude/skills/<name>/SKILL.md` with optional YAML frontmatter.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Recommended | Display name and `/slash-command` identifier. Defaults to the directory name if omitted |
| `description` | string | Recommended | What the skill does. Shown in autocomplete and used by Claude for auto-discovery |
| `argument-hint` | string | No | Hint shown during autocomplete (e.g., `[issue-number]`, `[filename]`) |
| `disable-model-invocation` | boolean | No | Set `true` to prevent Claude from automatically invoking this skill |
| `user-invocable` | boolean | No | Set `false` to hide from the `/` menu — skill becomes background knowledge only, intended for agent preloading |
| `allowed-tools` | string | No | Tools allowed without permission prompts when this skill is active |
| `model` | string | No | Model to use when this skill runs (e.g., `haiku`, `sonnet`, `opus`) |
| `context` | string | No | Set to `fork` to run the skill in an isolated subagent context |
| `agent` | string | No | Subagent type when `context: fork` is set (default: `general-purpose`) |
| `hooks` | object | No | Lifecycle hooks scoped to this skill |

---

## Two Skill Patterns

| Pattern | Loading | Invocation | Use Case |
|---------|---------|-----------|----------|
| **Skill** | On-demand | `/skill-name` or `Skill(skill: "name")` tool | Standalone reusable workflows invoked by commands or Claude |
| **Agent Skill** | Preloaded at agent startup via `skills:` field | Automatic — full content injected into agent context | Domain knowledge or procedures baked into a specific agent |

---

## String Substitutions

Available inside skill markdown for dynamic values:

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | All arguments passed when invoking the skill |
| `$ARGUMENTS[N]` | Access a specific argument by 0-based index |
| `$N` | Shorthand for `$ARGUMENTS[N]` (e.g., `$0`, `$1`) |
| `${CLAUDE_SESSION_ID}` | Current session identifier |
| `` !`command` `` | Dynamic context injection — shell command output replaces the placeholder before Claude sees it |

---

## Invocation

| Method | Description |
|--------|-------------|
| `/skill-name` | Invoke directly from the slash command menu |
| `/skill-name [args]` | Pass arguments that map to `$ARGUMENTS` |
| `Skill(skill: "name")` | Programmatic invocation via the Skill tool (used in commands and agents) |
| `skills: [name]` in agent frontmatter | Preload into an agent — full skill content injected at startup, not invoked on-demand |
| Subdirectories | Skills in subdirectories use `/subdir:skill-name` |

---

## Example: Minimal Skill

```yaml
---
description: Summarize staged changes into a concise changelog entry
---

Summarize the git diff in context into a one-paragraph changelog entry,
focusing on what changed and why.
```

## Example: Minimal Agent Skill

A skill preloaded into an agent as background knowledge — hidden from the `/` menu:

```yaml
---
name: deploy-checklist
description: Pre-flight deployment checks for production releases
user-invocable: false
---

# Deploy Checklist

Before any production deployment:
1. Run all tests: `npm test`
2. Check for uncommitted changes: `git status`
3. Verify environment variables are set
4. Confirm database migrations are ready
```

## Example: Full-Featured Skill (All Fields)

```yaml
---
name: code-review
description: Review code for quality, security, and performance issues
argument-hint: [file-path]
allowed-tools: Read, Grep, Glob
model: sonnet
context: fork
agent: general-purpose
hooks:
  Stop:
    - hooks:
        - type: command
          command: "./scripts/log-review-complete.sh"
---

Review the code at $0.

## Checklist
- [ ] Security: injection, XSS, hardcoded secrets
- [ ] Performance: N+1 queries, unnecessary loops
- [ ] Quality: naming, complexity, test coverage
- [ ] Error handling: edge cases, failure modes
```

---

## Scope and Priority

When multiple skills share the same name, the higher-priority location wins:

| Location | Scope | Priority |
|----------|-------|----------|
| Project (`.claude/skills/`) | This project only | 1 (highest) |
| Personal (`~/.claude/skills/`) | All your projects | 2 |
| Plugin (`<plugin>/skills/`) | Where plugin is enabled | 3 (lowest) |

---

## Skills in This Repository

Skills defined in `.claude/skills/` for this project:

| Skill | User-Invocable | Preloaded Into | Description |
|-------|----------------|----------------|-------------|
| [`weather-svg-creator`](../.claude/skills/weather-svg-creator/SKILL.md) | Yes | — | Creates SVG weather card and writes output files |
| [`weather-fetcher`](../.claude/skills/weather-fetcher/SKILL.md) | No | `weather-agent` | Fetches current temperature from wttr.in API |
| [`agent-browser`](../.claude/skills/agent-browser/SKILL.md) | Yes | — | Browser automation CLI for AI agents |
| [`presentation/vibe-to-agentic-framework`](../.claude/skills/presentation/vibe-to-agentic-framework/SKILL.md) | Yes | `presentation-curator` | Conceptual framework behind the presentation |
| [`presentation/presentation-structure`](../.claude/skills/presentation/presentation-structure/SKILL.md) | Yes | `presentation-curator` | Slide format, weight system, and section structure |
| [`presentation/presentation-styling`](../.claude/skills/presentation/presentation-styling/SKILL.md) | Yes | `presentation-curator` | CSS classes, component patterns, and syntax highlighting |

---

## Sources

- [Claude Code Skills — Docs](https://code.claude.com/docs/en/skills)
- [Skills Discovery in Monorepos](../reports/claude-skills-for-larger-mono-repos.md)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
