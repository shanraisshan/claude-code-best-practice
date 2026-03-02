# Commands Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar_2%2C_2026-white?style=flat&labelColor=555)<br>
[![Implemented](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../implementation/claude-commands-implementation.md)

Complete reference for Claude Code commands — command definitions, frontmatter fields, and all built-in slash commands.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Frontmatter Fields

Custom commands are defined in `.claude/commands/<name>.md` with optional YAML frontmatter.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | Recommended | What the command does. Shown in autocomplete and used by Claude for auto-discovery |
| `argument-hint` | string | No | Hint shown during autocomplete (e.g., `[issue-number]`, `[filename]`) |
| `allowed-tools` | string | No | Tools allowed without permission prompts when this command is active |
| `model` | string | No | Model to use when this command runs (e.g., `haiku`, `sonnet`, `opus`) |

---

## String Substitutions

Available inside command markdown for dynamic values:

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | All arguments passed when invoking the command |
| `$ARGUMENTS[N]` | Access a specific argument by 0-based index |
| `$N` | Shorthand for `$ARGUMENTS[N]` (e.g., `$0`, `$1`) |
| `${CLAUDE_SESSION_ID}` | Current session identifier |
| `` !`command` `` | Dynamic context injection — shell command output replaces the placeholder before Claude sees it |

---

## Invocation

Custom commands are invoked by typing `/command-name` in Claude Code's interactive mode:

| Method | Description |
|--------|-------------|
| `/command-name` | Invoke directly from the command menu |
| `/command-name [args]` | Pass arguments that map to `$ARGUMENTS` |
| Autocomplete | Type `/` to see all available commands with descriptions |
| Subdirectories | Commands in subdirectories use `/subdir:command-name` |

---

## Example: Minimal Command

```yaml
---
description: Fetch weather data for Dubai and create an SVG weather card
model: haiku
---

Fetch the current temperature for Dubai, UAE and create a visual SVG weather card.
```

## Example: Full-Featured Command (All Fields)

```yaml
---
description: Fix a GitHub issue by number, following team coding standards
argument-hint: [issue-number]
allowed-tools: Read, Edit, Write, Bash(gh *), Bash(npm test *)
model: sonnet
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

When multiple commands share the same name, the higher-priority location wins:

| Location | Scope | Priority |
|----------|-------|----------|
| Project (`.claude/commands/`) | This project only | 1 (highest) |
| Personal (`~/.claude/commands/`) | All your projects | 2 |
| Plugin (`<plugin>/commands/`) | Where plugin is enabled | 3 (lowest) |

---

## Claude Commands

### All Commands

Built-in slash commands available in Claude Code's interactive mode:

| Command | Tag | Description |
|---------|-----|-------------|
| `/clear` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Clear conversation history and start fresh |
| `/compact [instructions]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Compress conversation to free context window. Optional instructions focus the compaction |
| `/exit` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Exit the REPL |
| `/fork` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Fork the current conversation into a new session |
| `/rename <name>` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Rename the current session for easier identification |
| `/resume [session]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Resume a previous conversation by ID or name, or open the session picker |
| `/rewind` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Rewind conversation and/or code to an earlier point |
| `/teleport` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Resume a remote session from claude.ai (subscribers only) |
| `/context` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Visualize current context usage as a colored grid with token counts |
| `/cost` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Show token usage statistics and spending for the current session |
| `/stats` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Visualize daily usage, session history, streaks, and model preferences |
| `/usage` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Show plan usage limits and rate limit status (subscription plans only) |
| `/fast` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Toggle fast mode — same Opus 4.6 model with faster output |
| `/model` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Switch models (haiku, sonnet, opus) and adjust effort level |
| `/plan` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Enter read-only planning mode — suggests approaches without making changes |
| `/init` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Initialize a new project with CLAUDE.md guide |
| `/memory` | ![Memory](https://img.shields.io/badge/Memory-3498DB?style=flat) | View and edit CLAUDE.md memory files (user, project, and local scope) |
| `/config` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Open the interactive Settings interface with search functionality |
| `/keybindings` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Customize keyboard shortcuts per context, create chord sequences |
| `/permissions` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | View or update tool permissions |
| `/sandbox` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Configure sandboxing with dependency status |
| `/statusline` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Set up Claude Code's status line UI |
| `/terminal-setup` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Enable shift+enter for newlines in IDE terminals |
| `/theme` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Change the color theme |
| `/vim` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Enable vim-style editing mode |
| `/agents` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage custom subagents — view, create, edit, delete |
| `/hooks` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Interactive interface to manage hooks |
| `/ide` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Connect to IDE integration |
| `/mcp` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage MCP server connections — add, enable, list, get info, OAuth |
| `/plugin` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage plugins — install, uninstall, enable, disable, browse marketplaces |
| `/skills` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | View available skills and their descriptions |
| `/debug [description]` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Troubleshoot the current session by reading the debug log |
| `/doctor` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Check the health of your Claude Code installation |
| `/feedback` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Generate a GitHub issue URL for reporting bugs or feedback |
| `/help` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Show all available slash commands and usage help |
| `/tasks` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | List and manage background tasks |
| `/todos` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | List current TODO items |
| `/copy` | ![Export](https://img.shields.io/badge/Export-7F8C8D?style=flat) | Copy the last assistant response to clipboard |
| `/export [filename]` | ![Export](https://img.shields.io/badge/Export-7F8C8D?style=flat) | Export the current conversation to a file or clipboard |
| `/login` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Authenticate with Claude Code via OAuth |
| `/logout` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Log out from Claude Code |

### Commands in This Repository

Custom commands defined in `.claude/commands/` for this project:

| Command | Description | Model |
|---------|-------------|-------|
| [`weather-orchestrator`](../.claude/commands/weather-orchestrator.md) | Fetch weather data for Dubai and create an SVG weather card | haiku |
| [`workflows/best-practice/workflow-claude-subagents`](../.claude/commands/workflows/best-practice/workflow-claude-subagents.md) | Track Claude Code subagents report changes and find what needs updating | — |

---

## Sources

- [Claude Code Slash Commands](https://code.claude.com/docs/en/slash-commands)
- [Claude Code Interactive Mode](https://code.claude.com/docs/en/interactive-mode)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
