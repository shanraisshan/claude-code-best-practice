# Commands Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Apr%2004%2C%202026%2010%3A40%20PM%20PKT-white?style=flat&labelColor=555) ![Version](https://img.shields.io/badge/Claude_Code-v2.1.92-blue?style=flat&labelColor=555)<br>
[![Implemented](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../implementation/claude-commands-implementation.md)

Claude Code commands — frontmatter fields and official built-in slash commands.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Frontmatter Fields (13)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Display name and `/slash-command` identifier. Defaults to the directory name if omitted |
| `description` | string | Recommended | What the command does. Shown in autocomplete and used by Claude for auto-discovery |
| `argument-hint` | string | No | Hint shown during autocomplete (e.g., `[issue-number]`, `[filename]`) |
| `disable-model-invocation` | boolean | No | Set `true` to prevent Claude from automatically invoking this command |
| `user-invocable` | boolean | No | Set `false` to hide from the `/` menu — command becomes background knowledge only |
| `paths` | string/list | No | Glob patterns that limit when this skill is activated. Accepts a comma-separated string or a YAML list. When set, Claude loads the skill automatically only when working with files matching the patterns |
| `allowed-tools` | string | No | Tools allowed without permission prompts when this command is active |
| `model` | string | No | Model to use when this command runs (e.g., `haiku`, `sonnet`, `opus`) |
| `effort` | string | No | Override the model effort level when invoked (`low`, `medium`, `high`, `max`) |
| `context` | string | No | Set to `fork` to run the command in an isolated subagent context |
| `agent` | string | No | Subagent type when `context: fork` is set (default: `general-purpose`) |
| `shell` | string | No | Shell for `` !`command` `` blocks — accepts `bash` (default) or `powershell`. Requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` |
| `hooks` | object | No | Lifecycle hooks scoped to this command |

---

## ![Official](../!/tags/official.svg) **(65)**

| # | Command | Tag | Description |
|---|---------|-----|-------------|
| 1 | `/login` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Sign in to your Anthropic account |
| 2 | `/logout` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Sign out from your Anthropic account |
| 3 | `/setup-bedrock` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Configure Amazon Bedrock authentication, region, and model pins through an interactive wizard. Only visible when `CLAUDE_CODE_USE_BEDROCK=1` is set. First-time Bedrock users can also access this wizard from the login screen |
| 4 | `/upgrade` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Open the upgrade page to switch to a higher plan tier |
| 5 | `/color [color\|default]` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Set the prompt bar color for the current session. Available colors: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan`. Use `default` to reset |
| 6 | `/config` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Open the Settings interface to adjust theme, model, output style, and other preferences. Alias: `/settings` |
| 7 | `/keybindings` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Open or create your keybindings configuration file |
| 8 | `/permissions` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Manage allow, ask, and deny rules for tool permissions. Opens an interactive dialog where you can view rules by scope, add or remove rules, manage working directories, and review recent auto mode denials. Alias: `/allowed-tools` |
| 9 | `/privacy-settings` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | View and update your privacy settings. Only available for Pro and Max plan subscribers |
| 10 | `/sandbox` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Toggle sandbox mode. Available on supported platforms only |
| 11 | `/statusline` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Configure Claude Code's status line. Describe what you want, or run without arguments to auto-configure from your shell prompt |
| 12 | `/stickers` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Order Claude Code stickers |
| 13 | `/terminal-setup` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Configure terminal keybindings for Shift+Enter and other shortcuts. Only visible in terminals that need it, like VS Code, Alacritty, or Warp |
| 14 | `/theme` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Change the color theme. Includes light and dark variants, colorblind-accessible (daltonized) themes, and ANSI themes that use your terminal's color palette |
| 15 | `/voice` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Toggle push-to-talk voice dictation. Requires a Claude.ai account |
| 16 | `/context` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Visualize current context usage as a colored grid. Shows optimization suggestions for context-heavy tools, memory bloat, and capacity warnings |
| 17 | `/cost` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Show token usage statistics. See cost tracking guide for subscription-specific details |
| 18 | `/extra-usage` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Configure extra usage to keep working when rate limits are hit |
| 19 | `/insights` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Generate a report analyzing your Claude Code sessions, including project areas, interaction patterns, and friction points |
| 20 | `/stats` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Visualize daily usage, session history, streaks, and model preferences |
| 21 | `/status` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Open the Settings interface (Status tab) showing version, model, account, and connectivity. Works while Claude is responding, without waiting for the current response to finish |
| 22 | `/usage` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Show plan usage limits and rate limit status |
| 23 | `/doctor` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Diagnose and verify your Claude Code installation and settings |
| 24 | `/feedback [report]` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Submit feedback about Claude Code. Alias: `/bug` |
| 25 | `/help` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Show help and available commands |
| 26 | `/powerup` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Discover Claude Code features through quick interactive lessons with animated demos |
| 27 | `/release-notes` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | View the changelog in an interactive version picker. Select a specific version to see its release notes, or choose to show all versions |
| 28 | `/tasks` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | List and manage background tasks. Alias: `/bashes` |
| 29 | `/copy [N]` | ![Export](https://img.shields.io/badge/Export-7F8C8D?style=flat) | Copy the last assistant response to clipboard. Pass a number `N` to copy the Nth-latest response: `/copy 2` copies the second-to-last. When code blocks are present, shows an interactive picker to select individual blocks or the full response. Press `w` in the picker to write the selection to a file instead of the clipboard, which is useful over SSH |
| 30 | `/export [filename]` | ![Export](https://img.shields.io/badge/Export-7F8C8D?style=flat) | Export the current conversation as plain text. With a filename, writes directly to that file. Without, opens a dialog to copy to clipboard or save to a file |
| 31 | `/agents` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage agent configurations |
| 32 | `/chrome` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Configure Claude in Chrome settings |
| 33 | `/hooks` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | View hook configurations for tool events |
| 34 | `/ide` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage IDE integrations and show status |
| 35 | `/mcp` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage MCP server connections and OAuth authentication |
| 36 | `/plugin` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage Claude Code plugins |
| 37 | `/reload-plugins` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Reload all active plugins to apply pending changes without restarting. Reports counts for each reloaded component and flags any load errors |
| 38 | `/skills` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | List available skills |
| 39 | `/memory` | ![Memory](https://img.shields.io/badge/Memory-3498DB?style=flat) | Edit `CLAUDE.md` memory files, enable or disable auto-memory, and view auto-memory entries |
| 40 | `/effort [low\|medium\|high\|max\|auto]` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Set the model effort level. `low`, `medium`, and `high` persist across sessions. `max` applies to the current session only and requires Opus 4.6. `auto` resets to the model default. Without an argument, shows the current level. Takes effect immediately without waiting for the current response to finish |
| 41 | `/fast [on\|off]` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Toggle fast mode on or off |
| 42 | `/model [model]` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Select or change the AI model. For models that support it, use left/right arrows to adjust effort level. The change takes effect immediately without waiting for the current response to finish |
| 43 | `/passes` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Share a free week of Claude Code with friends. Only visible if your account is eligible |
| 44 | `/plan [description]` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Enter plan mode directly from the prompt. Pass an optional description to enter plan mode and immediately start with that task, for example `/plan fix the auth bug` |
| 45 | `/ultraplan <prompt>` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Draft a plan in an ultraplan session, review it in your browser, then execute remotely or send it back to your terminal |
| 46 | `/add-dir <path>` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Add a new working directory to the current session |
| 47 | `/diff` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Open an interactive diff viewer showing uncommitted changes and per-turn diffs. Use left/right arrows to switch between the current git diff and individual Claude turns, and up/down to browse files |
| 48 | `/init` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Initialize project with a `CLAUDE.md` guide. Set `CLAUDE_CODE_NEW_INIT=1` for an interactive flow that also walks through skills, hooks, and personal memory files |
| 49 | `/review` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Deprecated. Install the `code-review` plugin instead: `claude plugin install code-review@claude-plugins-official` |
| 50 | `/security-review` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Analyze pending changes on the current branch for security vulnerabilities. Reviews the git diff and identifies risks like injection, auth issues, and data exposure |
| 51 | `/desktop` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Continue the current session in the Claude Code Desktop app. macOS and Windows only. Alias: `/app` |
| 52 | `/install-github-app` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Set up the Claude GitHub Actions app for a repository. Walks you through selecting a repo and configuring the integration |
| 53 | `/install-slack-app` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Install the Claude Slack app. Opens a browser to complete the OAuth flow |
| 54 | `/mobile` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Show QR code to download the Claude mobile app. Aliases: `/ios`, `/android` |
| 55 | `/remote-control` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Make this session available for remote control from claude.ai. Alias: `/rc` |
| 56 | `/remote-env` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Configure the default remote environment for web sessions started with `--remote` |
| 57 | `/schedule [description]` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Create, update, list, or run Cloud scheduled tasks. Claude walks you through the setup conversationally |
| 58 | `/branch [name]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Create a branch of the current conversation at this point. Alias: `/fork` |
| 59 | `/btw <question>` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Ask a quick side question without adding to the conversation |
| 60 | `/clear` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Clear conversation history and free up context. Aliases: `/reset`, `/new` |
| 61 | `/compact [instructions]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Compact conversation with optional focus instructions |
| 62 | `/exit` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Exit the CLI. Alias: `/quit` |
| 63 | `/rename [name]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Rename the current session and show the name on the prompt bar. Without a name, auto-generates one from conversation history |
| 64 | `/resume [session]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Resume a conversation by ID or name, or open the session picker. Alias: `/continue` |
| 65 | `/rewind` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Rewind the conversation and/or code to a previous point, or summarize from a selected message. See checkpointing. Alias: `/checkpoint` |

Bundled skills such as `/debug` can also appear in the slash-command menu, but they are not built-in commands.

---

## Sources

- [Claude Code Slash Commands](https://code.claude.com/docs/en/slash-commands)
- [Claude Code Interactive Mode](https://code.claude.com/docs/en/interactive-mode)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
