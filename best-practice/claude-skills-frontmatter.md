# Claude Code: Skills Frontmatter Reference

Quick-reference tables for defining skills in `.claude/skills/<name>/SKILL.md`.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Frontmatter Fields

All fields are optional. Only `description` is recommended so Claude knows when to use the skill.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Display name and `/slash-command`. Lowercase letters, numbers, hyphens only (max 64 chars). Defaults to directory name if omitted |
| `description` | string | Recommended | What the skill does and when to use it. Claude uses this for auto-discovery. Falls back to first paragraph of content if omitted |
| `argument-hint` | string | No | Hint shown during autocomplete (e.g., `[issue-number]`, `[filename] [format]`) |
| `disable-model-invocation` | boolean | No | Set `true` to prevent Claude from auto-loading this skill. User can still invoke via `/name`. Default: `false` |
| `user-invocable` | boolean | No | Set `false` to hide from the `/` menu. Use for background knowledge Claude should load automatically but users shouldn't invoke directly. Default: `true` |
| `allowed-tools` | string | No | Tools Claude can use without permission prompts when this skill is active (e.g., `Bash(agent-browser:*)`) |
| `model` | string | No | Model to use when this skill is active |
| `context` | string | No | Set to `"fork"` to run in an isolated subagent context |
| `agent` | string | No | Which subagent type to use when `context: fork` is set (e.g., `Explore`, `Plan`, or a custom agent name). Default: `general-purpose` |
| `hooks` | object | No | Lifecycle hooks scoped to this skill (same format as agent hooks) |

---

## Invocation Methods

| Method | Trigger | Example |
|--------|---------|---------|
| **Slash command** | User types `/skill-name` | `/weather-fetcher` |
| **Agent preload** | Listed in agent's `skills:` frontmatter | `skills: [weather-fetcher]` |
| **Auto-discovery** | Claude matches user intent to `description` | Automatic |
| **Direct mention** | User references the skill by name | "Use the weather-fetcher skill" |

---

## Invocation Control

| Frontmatter | User can invoke | Claude can invoke | Context loading |
|-------------|-----------------|-------------------|-----------------|
| (default) | Yes | Yes | Description always in context, full skill loads when invoked |
| `disable-model-invocation: true` | Yes | No | Description not in context, full skill loads when user invokes |
| `user-invocable: false` | No | Yes | Description always in context, full skill loads when invoked |

---

## Skill vs Agent vs Command

| Aspect | Skill | Agent | Command |
|--------|-------|-------|---------|
| **File location** | `.claude/skills/<name>/SKILL.md` | `.claude/agents/<name>.md` | `.claude/commands/<name>.md` |
| **Has own tools** | No (restricts via `allowed-tools`) | Yes (`tools:` field) | No |
| **Has memory** | No | Yes (`memory:` field) | No |
| **Has hooks** | Yes (`hooks:` field) | Yes (`hooks:` field) | No |
| **Can preload skills** | No | Yes (`skills:` field) | No |
| **User-invocable** | Yes (`/skill-name`) | No (invoked via Task tool) | Yes (`/command-name`) |
| **Runs in isolation** | Optional (`context: fork`) | Always isolated subprocess | Runs in main context |
| **Supporting files** | Yes (same directory) | No | No |

---

## String Substitutions

Available inside skill markdown for dynamic values:

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | All arguments passed when invoking the skill |
| `$ARGUMENTS[N]` | Access a specific argument by 0-based index (e.g., `$ARGUMENTS[0]`) |
| `$N` | Shorthand for `$ARGUMENTS[N]` (e.g., `$0`, `$1`) |
| `${CLAUDE_SESSION_ID}` | Current session identifier |
| `` !`command` `` | Dynamic context injection — shell command output replaces the placeholder before Claude sees it |

---

## Example: Minimal Skill

```yaml
---
name: weather-fetcher
description: Instructions for fetching weather data from wttr.in API
---

Fetch the current temperature from https://wttr.in/Karachi?format=j1
```

## Example: Restricted Skill

```yaml
---
name: agent-browser
description: Browser automation CLI for AI agents
allowed-tools: Bash(agent-browser:*)
---

Every browser automation follows: navigate → snapshot → interact → re-snapshot.
```

## Example: Fork Context Skill

```yaml
---
name: code-analysis
description: Analyze code quality in isolation
context: fork
agent: Explore
---

Analyze the codebase for code quality issues without affecting the main conversation.
```

## Example: Full-Featured Skill (All Fields)

```yaml
---
name: fix-issue
description: Fix a GitHub issue by number, following team coding standards
argument-hint: [issue-number]
disable-model-invocation: true
user-invocable: true
allowed-tools: Read, Edit, Write, Bash(gh *), Bash(npm test *)
model: sonnet
context: fork
agent: general-purpose
hooks:
  PostToolUse:
    - matcher: "Edit|Write"
      hooks:
        - type: command
          command: "./scripts/run-linter.sh"
---

Fix GitHub issue $0 following our coding standards.

## Context
- PR diff: !`gh pr diff`
- Issue details: !`gh issue view $0`

## Steps
1. Read the issue description
2. Understand the requirements
3. Implement the fix
4. Write tests
5. Create a commit

Session: ${CLAUDE_SESSION_ID}
```

---

## Scope and Priority

When skills share the same name, the higher-priority location wins:

| Location | Scope | Priority |
|----------|-------|----------|
| Enterprise (managed settings) | All users in organization | 1 (highest) |
| Personal (`~/.claude/skills/`) | All your projects | 2 |
| Project (`.claude/skills/`) | This project only | 3 |
| Plugin (`<plugin>/skills/`) | Where plugin is enabled | Namespaced (no conflict) |

Skills from `.claude/commands/` still work. If a skill and a command share the same name, the skill takes precedence.

---

## Skills in This Repository

| Skill | Description | Used By |
|-------|-------------|---------|
| `weather-fetcher` | Fetch temperature from wttr.in API | weather agent |
| `weather-transformer` | Apply transformations to temperature data | weather agent |
| `agent-browser` | Browser automation CLI commands | standalone (auto-discovery) |
| `presentation/vibe-to-agentic-framework` | Conceptual framework for the presentation | presentation-curator agent |
| `presentation/presentation-structure` | Slide format, weight system, navigation | presentation-curator agent |
| `presentation/presentation-styling` | CSS classes and component patterns | presentation-curator agent |

---

## Sources

- [Use skills — Claude Code Docs](https://code.claude.com/docs/en/skills)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
