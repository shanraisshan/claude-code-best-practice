# CLI Startup Flags Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar%2002%2C%202026-white?style=flat&labelColor=555)

Reference for Claude Code startup flags, top-level subcommands, and startup environment variables when launching Claude Code from the terminal.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Table of Contents

1. [Session Management](#session-management)
2. [Model & Configuration](#model--configuration)
3. [Permissions & Security](#permissions--security)
4. [Output & Format](#output--format)
5. [System Prompt](#system-prompt)
6. [Agent & Subagent](#agent--subagent)
7. [MCP & Plugins](#mcp--plugins)
8. [Directory & Workspace](#directory--workspace)
9. [Budget & Limits](#budget--limits)
10. [Integration](#integration)
11. [Initialization & Maintenance](#initialization--maintenance)
12. [Debug & Diagnostics](#debug--diagnostics)
13. [Settings Override](#settings-override)
14. [Version & Help](#version--help)
15. [Subcommands](#subcommands)
16. [Environment Variables](#environment-variables)

---

## Session Management

| Flag | Short | Description |
|------|-------|-------------|
| `--continue` | `-c` | Continue the most recent conversation in the current directory |
| `--resume` | `-r` | Resume a specific session by ID or name, or show interactive picker |
| `--from-pr <NUMBER\|URL>` | | Resume sessions linked to a specific GitHub PR |
| `--fork-session` | | Create a new session ID when resuming (use with `--resume` or `--continue`) |
| `--session-id <UUID>` | | Use a specific session ID (must be valid UUID) |
| `--no-session-persistence` | | Disable session persistence (print mode only) |
| `--remote` | | Create a new web session on claude.ai |
| `--teleport` | | Resume a web session in your local terminal |

---

## Model & Configuration

| Flag | Short | Description |
|------|-------|-------------|
| `--model <NAME>` | | Set model with alias (`sonnet`, `opus`, `haiku`) or full model ID |
| `--fallback-model <NAME>` | | Auto-fallback model when default is overloaded (print mode only) |
| `--betas <LIST>` | | Beta headers to include in API requests (API key users only) |

---

## Permissions & Security

| Flag | Short | Description |
|------|-------|-------------|
| `--dangerously-skip-permissions` | | Skip ALL permission prompts. Use with extreme caution |
| `--allow-dangerously-skip-permissions` | | Enable permission bypassing as an option without activating it |
| `--permission-mode <MODE>` | | Begin in specified permission mode: `default`, `plan`, `acceptEdits`, `bypassPermissions` |
| `--allowedTools <TOOLS>` | | Tools that execute without prompting (permission rule syntax) |
| `--disallowedTools <TOOLS>` | | Tools removed from model context entirely |
| `--tools <TOOLS>` | | Restrict which built-in tools Claude can use (use `""` to disable all) |
| `--permission-prompt-tool <TOOL>` | | Specify MCP tool to handle permission prompts in non-interactive mode |

---

## Output & Format

| Flag | Short | Description |
|------|-------|-------------|
| `--print` | `-p` | Print response without interactive mode (headless/SDK mode) |
| `--output-format <FORMAT>` | | Output format: `text`, `json`, `stream-json` |
| `--input-format <FORMAT>` | | Input format: `text`, `stream-json` |
| `--json-schema <SCHEMA>` | | Get validated JSON matching schema (print mode only) |
| `--include-partial-messages` | | Include partial streaming events (requires `--print` and `--output-format=stream-json`) |
| `--verbose` | | Enable verbose logging with full turn-by-turn output |

---

## System Prompt

| Flag | Short | Description |
|------|-------|-------------|
| `--system-prompt <TEXT>` | | Replace entire system prompt with custom text |
| `--system-prompt-file <PATH>` | | Load system prompt from file, replacing default (print mode only) |
| `--append-system-prompt <TEXT>` | | Append custom text to default system prompt |
| `--append-system-prompt-file <PATH>` | | Append file contents to default prompt (print mode only) |

---

## Agent & Subagent

| Flag | Short | Description |
|------|-------|-------------|
| `--agent <NAME>` | | Specify an agent for the current session |
| `--agents <JSON>` | | Define custom subagents dynamically via JSON |
| `--teammate-mode <MODE>` | | Set agent team display: `auto`, `in-process`, `tmux` |

---

## MCP & Plugins

| Flag | Short | Description |
|------|-------|-------------|
| `--mcp-config <PATH\|JSON>` | | Load MCP servers from JSON file or string |
| `--strict-mcp-config` | | Only use MCP servers from `--mcp-config`, ignore all others |
| `--plugin-dir <PATH>` | | Load plugins from directory for this session only (repeatable) |

---

## Directory & Workspace

| Flag | Short | Description |
|------|-------|-------------|
| `--add-dir <PATH>` | | Add additional working directories for Claude to access |
| `--worktree` | `-w` | Start Claude in an isolated git worktree (branched from HEAD) |

---

## Budget & Limits

| Flag | Short | Description |
|------|-------|-------------|
| `--max-budget-usd <AMOUNT>` | | Maximum dollar amount for API calls before stopping (print mode only) |
| `--max-turns <NUMBER>` | | Limit number of agentic turns (print mode only) |

---

## Integration

| Flag | Short | Description |
|------|-------|-------------|
| `--chrome` | | Enable Chrome browser integration for web automation |
| `--no-chrome` | | Disable Chrome browser integration for this session |
| `--ide` | | Automatically connect to IDE on startup if exactly one valid IDE available |

---

## Initialization & Maintenance

| Flag | Short | Description |
|------|-------|-------------|
| `--init` | | Run initialization hooks and start interactive mode |
| `--init-only` | | Run initialization hooks and exit (no interactive session) |
| `--maintenance` | | Run maintenance hooks and exit |

---

## Debug & Diagnostics

| Flag | Short | Description |
|------|-------|-------------|
| `--debug <CATEGORIES>` | | Enable debug mode with optional category filtering (e.g., `"api,hooks"`) |

---

## Settings Override

| Flag | Short | Description |
|------|-------|-------------|
| `--settings <PATH\|JSON>` | | Path to settings JSON file or JSON string to load |
| `--setting-sources <LIST>` | | Comma-separated list of sources to load: `user`, `project`, `local` |
| `--disable-slash-commands` | | Disable all skills and slash commands for this session |

---

## Version & Help

| Flag | Short | Description |
|------|-------|-------------|
| `--version` | `-v` | Output the version number |
| `--help` | `-h` | Show help information |

---

## Subcommands

These are top-level commands run as `claude <subcommand>`:

| Subcommand | Description |
|------------|-------------|
| `claude` | Start interactive REPL |
| `claude "query"` | Start REPL with initial prompt |
| `claude agents` | List configured agents |
| `claude auth` | Manage Claude Code authentication |
| `claude doctor` | Run diagnostics from the command line |
| `claude install` | Install or switch Claude Code native builds |
| `claude mcp` | Configure MCP servers (`add`, `remove`, `list`, `get`, `enable`) |
| `claude plugin` | Manage Claude Code plugins |
| `claude remote-control` | Manage remote control sessions |
| `claude setup-token` | Create a long-lived token for subscription usage |
| `claude update` / `claude upgrade` | Update to the latest version |

---

## Environment Variables

These startup-only environment variables are set in your shell before launching Claude Code (they cannot be configured via `settings.json`):

| Variable | Description |
|----------|-------------|
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | Enable experimental agent teams |
| `CLAUDE_CODE_TMPDIR` | Override temp directory for internal files. Also configurable via `env` key — see [Settings Reference](./claude-settings.md#environment-variables-via-env) |
| `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` | Enable additional directory CLAUDE.md loading |
| `DISABLE_AUTOUPDATER=1` | Disable auto-updates. Also configurable via `env` key — see [Settings Reference](./claude-settings.md#environment-variables-via-env) |
| `CLAUDE_CODE_EFFORT_LEVEL` | Control thinking depth — see [Settings Reference](./claude-settings.md#environment-variables-via-env) |
| `USE_BUILTIN_RIPGREP=0` | Use system ripgrep instead of built-in (Alpine Linux) |
| `CLAUDE_CODE_SIMPLE` | Enable simple mode (Bash + Edit tools only). Also configurable via `env` key — see [Settings Reference](./claude-settings.md#environment-variables-via-env) |
| `CLAUDE_BASH_NO_LOGIN=1` | Skip login shell for BashTool |
| `CCR_FORCE_BUNDLE=1` | Force bundling/uploading local repository when using `claude --remote`. Also configurable via `env` key — see [Settings Reference](./claude-settings.md#environment-variables-via-env) |

For environment variables configurable via the `"env"` key in `settings.json` (including `MAX_THINKING_TOKENS`, `CLAUDE_CODE_SHELL`, `CLAUDE_CODE_ENABLE_TASKS`, `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS`, `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS`, and more), see the [Claude Settings Reference](./claude-settings.md#environment-variables-via-env).

---

## Sources

- [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Claude Code Headless Mode](https://code.claude.com/docs/en/headless)
- [Claude Code Setup](https://code.claude.com/docs/en/setup)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- [Claude Code Common Workflows](https://code.claude.com/docs/en/common-workflows)
