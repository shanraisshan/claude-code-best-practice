# Claude Code: Commands Frontmatter Reference

Quick-reference tables for defining custom commands in `.claude/commands/<name>.md`.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | Recommended | Short description shown in autocomplete when user types `/` |
| `model` | string | No | Model override for this command (e.g., `haiku`, `sonnet`) |

Commands have minimal frontmatter compared to agents and skills — they are lightweight entry points that delegate heavy work to agents.

---

## Invocation

| Method | Example |
|--------|---------|
| **Slash command** | User types `/command-name` at the prompt |
| **With arguments** | `/command-name arg1 arg2` — arguments are appended to the prompt |

---

## Scope Levels

| Scope | Location | Shared |
|-------|----------|--------|
| **Project** | `.claude/commands/*.md` | Yes (committed to repo) |
| **User** | `~/.claude/commands/*.md` | No (personal, all projects) |

Both scopes are available simultaneously — project commands appear alongside user commands.

---

## Template Variables

Available inside command markdown via `${VARIABLE}`:

| Variable | Description |
|----------|-------------|
| `${ARGUMENTS}` | Arguments passed after the command name |
| `${CLAUDE_SESSION_ID}` | Current session identifier |
| `${CLAUDE_PROJECT_DIR}` | Project root directory path |

---

## Example: Orchestrator Command

```yaml
---
description: Fetch and transform weather data for Karachi
model: haiku
---

# Weather Orchestrator

1. Ask the user for temperature unit preference
2. Use the Task tool to invoke the weather agent
3. Report the results
```

---

## Commands in This Repository

| Command | Model | Description | Delegates To |
|---------|-------|-------------|-------------|
| `weather-orchestrator` | haiku | Fetch and transform Karachi weather | weather agent |

---

## Intentionally Not Documented Here

These items were identified during the 2.1.0–2.1.49 audit but belong in other reports:

| Item | Reason | Where It Belongs |
|------|--------|-----------------|
| Skill `user-invocable` field | Skill-specific frontmatter | [claude-skills-frontmatter.md](../best-practice/claude-skills-frontmatter.md) |
| Skill `${CLAUDE_SESSION_ID}` variable | Skill-specific template variable | [claude-skills-frontmatter.md](../best-practice/claude-skills-frontmatter.md) |
| Agent `memory` frontmatter | Already covered in depth | [claude-agent-memory.md](../claude-agent-memory.md) |
| claude.ai MCP connectors | Product feature, not settings | N/A |
| `chat:newline` keybinding | Keybindings reference, not settings | [claude-commands.md](../best-practice/claude-commands.md) (Keyboard Shortcuts section) |

---

## Sources

- [Create custom commands — Claude Code Docs](https://code.claude.com/docs/en/custom-commands)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
