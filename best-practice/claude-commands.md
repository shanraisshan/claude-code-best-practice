# Commands Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar%2013%2C%202026%204%3A47%20PM%20PKT-white?style=flat&labelColor=555)<br>
[![Implemented](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../implementation/claude-commands-implementation.md)

Claude Code commands — frontmatter fields and official built-in slash commands.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Frontmatter Fields (4)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `description` | string | Recommended | What the command does. Shown in autocomplete and used by Claude for auto-discovery |
| `argument-hint` | string | No | Hint shown during autocomplete (e.g., `[issue-number]`, `[filename]`) |
| `allowed-tools` | string | No | Tools allowed without permission prompts when this command is active |
| `model` | string | No | Model to use when this command runs (e.g., `haiku`, `sonnet`, `opus`) |

---

## ![Official](../!/tags/official.svg) **(60)**

| # | Command | Tag | Description |
|---|---------|-----|-------------|
| 1 | `/login` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Authenticate with Claude Code via OAuth |
| 2 | `/logout` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Log out from Claude Code |
| 3 | `/upgrade` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Open the upgrade page to switch to a higher plan tier |
| 4 | `/config` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Open the interactive settings interface with search |
| 5 | `/keybindings` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Customize keyboard shortcuts per context and create chord sequences |
| 6 | `/permissions` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | View or update tool permissions |
| 7 | `/privacy-settings` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Manage privacy and telemetry preferences |
| 8 | `/sandbox` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Configure sandboxing with dependency status |
| 9 | `/statusline` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Set up Claude Code's status line UI |
| 10 | `/stickers` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Order Claude Code stickers |
| 11 | `/terminal-setup` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Enable shift+enter for newlines in IDE terminals |
| 12 | `/theme` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Change the color theme |
| 13 | `/vim` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Enable vim-style editing mode |
| 14 | `/context` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Visualize current context usage as a colored grid with token counts |
| 15 | `/cost` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Show token usage statistics for the current session |
| 16 | `/extra-usage` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Configure pay-as-you-go overflow billing for subscription plans |
| 17 | `/insights` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Generate a report analyzing your Claude Code sessions, including project areas, interaction patterns, and friction points |
| 18 | `/stats` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Visualize daily usage, session history, streaks, and model preferences |
| 19 | `/status` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Show a concise session status summary |
| 20 | `/usage` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Show plan usage limits and rate limit status (subscription plans only) |
| 21 | `/doctor` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Check the health of your Claude Code installation |
| 22 | `/feedback [description]` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Generate a GitHub issue URL for reporting bugs or feedback. Alias: `/bug` |
| 23 | `/help` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Show slash-command help |
| 24 | `/release-notes` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Show recent Claude Code release notes |
| 25 | `/tasks` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | List and manage background tasks |
| 26 | `/copy` | ![Export](https://img.shields.io/badge/Export-7F8C8D?style=flat) | Copy the last assistant response to the clipboard |
| 27 | `/export [filename]` | ![Export](https://img.shields.io/badge/Export-7F8C8D?style=flat) | Export the current conversation to a file or clipboard |
| 28 | `/agents` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage custom subagents — view, create, edit, delete |
| 29 | `/chrome` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage Claude in Chrome browser integration |
| 30 | `/hooks` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage hook configurations for tool events |
| 31 | `/ide` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Connect to IDE integration |
| 32 | `/mcp` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage MCP server connections |
| 33 | `/plugin` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage Claude Code plugins |
| 34 | `/reload-plugins` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Reload installed plugins without restarting |
| 35 | `/skills` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | List available skills |
| 36 | `/memory` | ![Memory](https://img.shields.io/badge/Memory-3498DB?style=flat) | View and edit memory files |
| 37 | `/fast` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Toggle fast mode — same Opus 4.6 model with faster output |
| 38 | `/model` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Switch models (haiku, sonnet, opus) and adjust effort level |
| 39 | `/passes [number]` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Share a free week of Claude Code with friends. Only visible if your account is eligible |
| 40 | `/plan` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Enter read-only planning mode — suggests approaches without making changes |
| 41 | `/add-dir` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Add additional working directories to the current session |
| 42 | `/diff` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Review the current git diff in the active repo |
| 43 | `/init [prompt]` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Initialize a new project with a CLAUDE.md guide |
| 44 | `/pr-comments` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Review or reply to pull-request comments |
| 45 | `/review` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Deprecated — install the `code-review` plugin instead |
| 46 | `/security-review` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Run a focused security review on current changes |
| 47 | `/desktop` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Connect to or manage the desktop companion app |
| 48 | `/install-github-app` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Install the GitHub app for PR-linked workflows |
| 49 | `/install-slack-app` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Install the Slack app for notifications and sharing |
| 50 | `/mobile` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Connect to or manage the mobile companion app |
| 51 | `/remote-control` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Continue the current session from another device |
| 52 | `/remote-env` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Inspect or copy the remote-control environment setup |
| 53 | `/btw <question>` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Ask a quick side question without adding to the conversation |
| 54 | `/clear` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Clear conversation history and start fresh |
| 55 | `/compact [prompt]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Compress conversation to free context window. Optional prompt focuses the compaction |
| 56 | `/exit` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Exit the REPL |
| 57 | `/fork` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Fork the current conversation into a new session |
| 58 | `/rename <name>` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Rename the current session for easier identification |
| 59 | `/resume [session]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Resume a previous conversation by ID or name, or open the session picker |
| 60 | `/rewind` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Rewind conversation and/or code to an earlier point |

Bundled skills such as `/debug` can also appear in the slash-command menu, but they are not built-in commands.

---

## Sources

- [Claude Code Slash Commands](https://code.claude.com/docs/en/slash-commands)
- [Claude Code Interactive Mode](https://code.claude.com/docs/en/interactive-mode)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
