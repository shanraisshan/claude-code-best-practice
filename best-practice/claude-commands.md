# Claude Code Commands Reference

A comprehensive reference of all available slash commands in Claude Code's interactive mode.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

## Table of Contents

1. [Session Management](#session-management)
2. [Context & Cost](#context--cost)
3. [Model & Planning](#model--planning)
4. [Project & Memory](#project--memory)
5. [Configuration](#configuration)
6. [Extensions & Integrations](#extensions--integrations)
7. [Diagnostics & Debugging](#diagnostics--debugging)
8. [Import / Export](#import--export)
9. [Authentication](#authentication)
10. [Input Modes & Prefixes](#input-modes--prefixes)
11. [Dynamic Commands](#dynamic-commands)
12. [CLI Flags](#cli-flags)
13. [Keyboard Shortcuts](#keyboard-shortcuts)

---

## Session Management

| Command | Description |
|---------|-------------|
| `/clear` | Clear conversation history and start fresh |
| `/compact [instructions]` | Compress conversation to free context window. Optional instructions focus the compaction on specific topics |
| `/rename <name>` | Rename the current session for easier identification |
| `/resume [session]` | Resume a previous conversation by ID or name, or open the session picker |
| `/rewind` | Rewind the conversation and/or code to an earlier point, or summarize from a selected message |
| `/fork` | Fork the current conversation into a new session |
| `/teleport` | Resume a remote session from claude.ai (subscribers only) |
| `/exit` | Exit the REPL |

---

## Context & Cost

| Command | Description |
|---------|-------------|
| `/context` | Visualize current context usage as a colored grid with token counts and percentages |
| `/cost` | Show token usage statistics and spending for the current session |
| `/usage` | Show plan usage limits and rate limit status (subscription plans only) |
| `/stats` | Visualize daily usage, session history, streaks, and model preferences. Supports date range filtering |

---

## Model & Planning

| Command | Description |
|---------|-------------|
| `/model` | Switch models (haiku, sonnet, opus) and adjust Opus 4.6 effort level with arrow keys |
| `/plan` | Enter read-only planning mode where Claude suggests approaches without making changes |
| `/fast` | Toggle fast mode — same Opus 4.6 model with faster output |

---

## Project & Memory

| Command | Description |
|---------|-------------|
| `/init` | Initialize a new project with CLAUDE.md guide |
| `/memory` | View and edit CLAUDE.md memory files (user, project, and local scope) |

---

## Configuration

| Command | Description |
|---------|-------------|
| `/config` | Open the interactive Settings interface with search functionality |
| `/permissions` | View or update tool permissions |
| `/theme` | Change the color theme |
| `/vim` | Enable vim-style editing mode |
| `/terminal-setup` | Enable shift+enter for newlines in IDE terminals, Apple Terminal, Warp, and Alacritty |
| `/keybindings` | Customize keyboard shortcuts per context, create chord sequences |
| `/statusline` | Set up Claude Code's status line UI |
| `/sandbox` | Configure sandboxing with dependency status |

---

## Extensions & Integrations

| Command | Description |
|---------|-------------|
| `/agents` | Manage custom subagents — view, create, edit, delete |
| `/skills` | View available skills and their descriptions |
| `/hooks` | Interactive interface to manage hooks |
| `/mcp` | Manage MCP server connections — add, enable, list, get info, OAuth authentication |
| `/plugin` | Manage plugins — install, uninstall, enable, disable, browse marketplaces |
| `/ide` | Connect to IDE integration |

---

## Diagnostics & Debugging

| Command | Description |
|---------|-------------|
| `/doctor` | Check the health of your Claude Code installation. Detects unreachable permissions, config issues, and updates |
| `/debug [description]` | Troubleshoot the current session by reading the session debug log |
| `/tasks` | List and manage background tasks |
| `/todos` | List current TODO items |
| `/help` | Show all available slash commands and usage help |
| `/feedback` | Generate a GitHub issue URL for reporting bugs or feedback |

---

## Import / Export

| Command | Description |
|---------|-------------|
| `/copy` | Copy the last assistant response to clipboard |
| `/export [filename]` | Export the current conversation to a file or clipboard |

---

## Authentication

| Command | Description |
|---------|-------------|
| `/login` | Authenticate with Claude Code via OAuth |
| `/logout` | Log out from Claude Code |

---

## Input Modes & Prefixes

These are special prefixes you can type at the prompt, not slash commands per se:

| Prefix | Description |
|--------|-------------|
| `/` | Trigger command or skill autocomplete |
| `!` | Bash mode — run shell commands directly and add output to conversation |
| `@` | File path mention — trigger file path autocomplete for context |

---

## Dynamic Commands

These commands are not built-in but are discovered at runtime from your configuration:

### MCP Prompts

MCP servers can expose prompts that appear as commands:

```
/mcp__<server-name>__<prompt-name>
```

### Plugin Commands

Installed plugins can provide their own commands, namespaced by plugin name:

```
/plugin-name:command-name
```

### Custom Skills

Skills defined in `.claude/skills/` appear as invocable commands:

```
/skill-name
```

---

## CLI Flags

These flags are used when launching Claude Code from the terminal, not as interactive commands:

| Flag | Description |
|------|-------------|
| `--doctor` | Run diagnostics from the command line |
| `--debug` | Launch in debug mode with hook execution details |
| `--resume` | Resume most recent session |
| `--plan` | Start in plan mode |
| `--init` | Initialize repository with CLAUDE.md setup |
| `--init-only` | Run repository initialization only, then exit |
| `--maintenance` | Run repository maintenance operations |
| `--from-pr <url>` | Resume a session linked to a specific GitHub PR |

---

## Keyboard Shortcuts

### Navigation & Control

| Shortcut | Description |
|----------|-------------|
| `Ctrl+C` | Cancel current input or generation |
| `Ctrl+D` | Exit Claude Code session |
| `Ctrl+L` | Clear terminal screen |
| `Ctrl+R` | Reverse search command history |
| `Ctrl+O` | Toggle verbose output |
| `Esc` + `Esc` | Rewind or summarize |

### Model & Mode Switching

| Shortcut | Description |
|----------|-------------|
| `Option+P` / `Alt+P` | Switch model |
| `Option+T` / `Alt+T` | Toggle extended thinking |
| `Shift+Tab` / `Alt+M` | Toggle permission modes |
| `Ctrl+B` | Background running tasks |
| `Ctrl+T` | Toggle task list |

### Text Editing

| Shortcut | Description |
|----------|-------------|
| `Ctrl+G` | Open prompt in default text editor |
| `Ctrl+V` / `Cmd+V` | Paste image from clipboard |
| `Ctrl+K` | Delete to end of line |
| `Ctrl+U` | Delete entire line |
| `Ctrl+Y` | Paste deleted text |
| `Alt+Y` | Cycle paste history |

### Multiline Input

| Shortcut | Description |
|----------|-------------|
| `\` + `Enter` | Quick escape for multiline |
| `Option+Enter` | macOS default multiline |
| `Shift+Enter` | Multiline (iTerm2, WezTerm, Ghostty, Kitty) |
| `Ctrl+J` | Line feed character for multiline |

---

## Sources

- [Claude Code Interactive Mode](https://code.claude.com/docs/en/interactive-mode)
- [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Claude Code Slash Commands](https://code.claude.com/docs/en/slash-commands)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- [Claude Code Common Workflows](https://code.claude.com/docs/en/common-workflows)
