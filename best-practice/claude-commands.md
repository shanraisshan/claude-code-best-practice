# Commands Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Jul%2001%2C%202026%2011%3A07%20AM%20PKT-white?style=flat&labelColor=555) ![Version](https://img.shields.io/badge/Claude_Code-v2.1.197-blue?style=flat&labelColor=555)<br>
[![Implemented](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../implementation/claude-commands-implementation.md)

Claude Code commands — frontmatter fields and official built-in slash commands.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Frontmatter Fields (16)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Display name and `/slash-command` identifier. Defaults to the directory name if omitted |
| `description` | string | Recommended | What the command does. Shown in autocomplete and used by Claude for auto-discovery |
| `when_to_use` | string | No | Additional context for when Claude should invoke the skill — trigger phrases or example requests. Appended to `description` in the listing and counts toward the 1,536-character cap |
| `argument-hint` | string | No | Hint shown during autocomplete (e.g., `[issue-number]`, `[filename]`) |
| `arguments` | string/list | No | Named positional arguments for `$name` substitution in command content. Accepts a space-separated string or YAML list — names map to argument positions in order |
| `disable-model-invocation` | boolean | No | Set `true` to prevent Claude from automatically invoking this command |
| `user-invocable` | boolean | No | Set `false` to hide from the `/` menu — command becomes background knowledge only |
| `paths` | string/list | No | Glob patterns that limit when this skill is activated. Accepts a comma-separated string or a YAML list. When set, Claude loads the skill automatically only when working with files matching the patterns |
| `allowed-tools` | string | No | Tools allowed without permission prompts when this command is active |
| `disallowed-tools` | string/list | No | Tools removed from Claude's available pool while this command is active. Clears when you send your next message. The inverse of `allowed-tools` |
| `model` | string | No | Model to use when this command runs (e.g., `haiku`, `sonnet`, `opus`) |
| `effort` | string | No | Override the model effort level when invoked (`low`, `medium`, `high`, `xhigh`, `max`) |
| `context` | string | No | Set to `fork` to run the command in an isolated subagent context |
| `agent` | string | No | Subagent type when `context: fork` is set (default: `general-purpose`) |
| `shell` | string | No | Shell for `` !`command` `` blocks — accepts `bash` (default) or `powershell`. Requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` |
| `hooks` | object | No | Lifecycle hooks scoped to this command |

---

## ![Official](../!/tags/official.svg) **(86)**

| # | Command | Tag | Description |
|---|---------|-----|-------------|
| 1 | `/design-login` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Authorize design-system access for `/design-sync` with your claude.ai account |
| 2 | `/login` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Sign in to your Anthropic account |
| 3 | `/logout` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Sign out from your Anthropic account |
| 4 | `/setup-bedrock` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Configure Amazon Bedrock authentication, region, and model pins through an interactive wizard. Only visible when `CLAUDE_CODE_USE_BEDROCK=1` is set. First-time Bedrock users can also access this wizard from the login screen |
| 5 | `/setup-vertex` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Configure Google Vertex AI authentication, project, region, and model pins through an interactive wizard. Only visible when `CLAUDE_CODE_USE_VERTEX=1` is set. First-time Vertex AI users can also access this wizard from the login screen |
| 6 | `/upgrade` | ![Auth](https://img.shields.io/badge/Auth-2980B9?style=flat) | Open the upgrade page to switch to a higher plan tier |
| 7 | `/color [color\|default]` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Set the prompt bar color for the current session. Available colors: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan`. Use `default` to reset. Run without an argument to pick a random color |
| 8 | `/config [key=value ...]` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Open the Settings interface to adjust theme, model, output style, and other preferences. From v2.1.181, pass one or more `key=value` pairs to set a setting directly without opening the interface, for example `/config thinking=false`. The `key=value` form also works in non-interactive (`-p`) and Remote Control modes. Run `/config help` to list the keys you can set. Alias: `/settings` |
| 9 | `/focus` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Toggle the focus view, which shows only your last prompt, a one-line tool-call summary with edit diffstats, and the final response. The selection persists across sessions; set `viewMode` in settings to override it. Only available in fullscreen rendering |
| 10 | `/keybindings` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Open or create your keybindings configuration file |
| 11 | `/permissions` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Manage allow, ask, and deny rules for tool permissions. Opens an interactive dialog where you can view rules by scope, add or remove rules, manage working directories, and review recent auto mode denials. Alias: `/allowed-tools` |
| 12 | `/privacy-settings` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | View and update your privacy settings. Only available for Pro and Max plan subscribers |
| 13 | `/radio` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Open Claude FM lo-fi radio in your browser. Prints the stream URL when no browser is available. Not available on Bedrock, Vertex, or Foundry |
| 14 | `/sandbox` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Toggle sandbox mode. Available on supported platforms only |
| 15 | `/scroll-speed` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Adjust mouse wheel scroll speed interactively |
| 16 | `/statusline` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Configure Claude Code's status line. Describe what you want, or run without arguments to auto-configure from your shell prompt |
| 17 | `/stickers` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Order Claude Code stickers |
| 18 | `/terminal-setup` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Configure terminal keybindings for Shift+Enter and other shortcuts. Only visible in terminals that need it, like VS Code, Cursor, Devin Desktop, Alacritty, or Zed |
| 19 | `/theme` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Change the color theme. Includes light and dark variants, colorblind-accessible (daltonized) themes, ANSI themes that use your terminal's color palette, an "Auto (match terminal)" option that follows your terminal's light/dark mode, and custom themes loaded from `~/.claude/themes/` or plugins. Select "New custom theme…" to create your own |
| 20 | `/tui [default\|fullscreen]` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Set the terminal UI renderer and relaunch into it with your conversation intact. `fullscreen` enables the flicker-free alt-screen renderer. With no argument, prints the active renderer |
| 21 | `/voice [hold\|tap\|off]` | ![Config](https://img.shields.io/badge/Config-F39C12?style=flat) | Toggle voice dictation, or enable it in a specific mode. Requires a Claude.ai account |
| 22 | `/context [all]` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Visualize current context usage as a colored grid. Shows optimization suggestions for context-heavy tools, memory bloat, and capacity warnings. Pass `all` to expand the full breakdown |
| 23 | `/cost` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Alias for `/usage` |
| 24 | `/insights` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Generate a report analyzing your Claude Code sessions, including project areas, interaction patterns, and friction points |
| 25 | `/stats` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Alias for `/usage`. Opens on the Stats tab |
| 26 | `/status` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Open the Settings interface (Status tab) showing version, model, account, and connectivity. Works while Claude is responding, without waiting for the current response to finish |
| 27 | `/usage` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Show session cost, plan usage limits, and activity stats. On a Pro, Max, Team, or Enterprise plan, includes a breakdown of usage by skill, subagent, plugin, and MCP server. `/cost` and `/stats` are aliases |
| 28 | `/usage-credits` | ![Context](https://img.shields.io/badge/Context-8E44AD?style=flat) | Configure usage credits to keep working when you hit a limit. Previously `/extra-usage` |
| 29 | `/doctor` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Diagnose and verify your Claude Code installation and settings. Results show with status icons. Press `f` to have Claude fix any reported issues |
| 30 | `/feedback [report]` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Submit feedback, report a bug, or share your conversation. Aliases: `/bug`, `/share` |
| 31 | `/heapdump` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Write a JavaScript heap snapshot and memory breakdown to `~/Desktop` for diagnosing high memory usage. Useful when filing bug reports about memory growth |
| 32 | `/help` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Show help and available commands |
| 33 | `/powerup` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | Discover Claude Code features through quick interactive lessons with animated demos |
| 34 | `/release-notes` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | View the changelog in an interactive version picker. Select a specific version to see its release notes, or choose to show all versions |
| 35 | `/tasks` | ![Debug](https://img.shields.io/badge/Debug-E74C3C?style=flat) | View and manage everything running in the background. Also available as `/bashes` |
| 36 | `/copy [N]` | ![Export](https://img.shields.io/badge/Export-7F8C8D?style=flat) | Copy the last assistant response to clipboard. Pass a number `N` to copy the Nth-latest response: `/copy 2` copies the second-to-last. When code blocks are present, shows an interactive picker to select individual blocks or the full response. Press `w` in the picker to write the selection to a file instead of the clipboard, which is useful over SSH |
| 37 | `/export [filename]` | ![Export](https://img.shields.io/badge/Export-7F8C8D?style=flat) | Export the current conversation as plain text. With a filename, writes directly to that file. Without, opens a dialog to copy to clipboard or save to a file |
| 38 | `/agents` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage agent configurations |
| 39 | `/chrome` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Configure Claude in Chrome settings |
| 40 | `/hooks` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | View hook configurations for tool events |
| 41 | `/ide` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage IDE integrations and show status |
| 42 | `/mcp [reconnect <server>\|enable\|disable [<server>\|all]]` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage MCP server connections and OAuth authentication. Run with no argument to open the interactive list, pass `reconnect <server>` to reconnect one disconnected server, or pass `enable`/`disable` with a server name or `all` to change connection state without opening the dialog |
| 43 | `/plugin [subcommand]` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Manage Claude Code plugins. Run with no argument to open the plugin menu, or pass a subcommand such as `list`, `install`, `enable`, or `disable` to act directly |
| 44 | `/reload-plugins [--force]` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Reload all active plugins to apply pending changes without restarting. Reports counts for each reloaded component and flags any load errors. When the reload would change which MCP tools are loaded and invalidate the prompt cache, the command warns and skips unless you pass `--force` |
| 45 | `/reload-skills` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | Re-scan skill and command directories so skills added or changed on disk during the session become available without restarting. Reports how many skills are available and how many were added or removed |
| 46 | `/skills` | ![Extensions](https://img.shields.io/badge/Extensions-16A085?style=flat) | List available skills. Press `t` to sort by token count. Press `Space` to hide a skill from Claude or the `/` menu, then `Enter` to save |
| 47 | `/memory` | ![Memory](https://img.shields.io/badge/Memory-3498DB?style=flat) | Edit `CLAUDE.md` memory files, enable or disable auto-memory, and view auto-memory entries |
| 48 | `/advisor [model\|off]` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Enable or disable the advisor tool, which consults a second model for guidance at key moments during a task. Accepts a model name (`opus`, `sonnet`, `fable`) or a full model ID; without an argument opens a picker. Use `off` to disable |
| 49 | `/effort [low\|medium\|high\|xhigh\|max\|ultracode]` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Set the model effort level. Available levels depend on the model and include `low`, `medium`, `high`, `xhigh`, `max` (session-only), and `ultracode` (combines `xhigh` reasoning with automatic workflow orchestration; session-only). Without an argument, opens an interactive slider to pick the level. `auto` resets to the model default. Takes effect immediately without waiting for the current response to finish |
| 50 | `/fast [on\|off]` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Toggle fast mode on or off |
| 51 | `/model [model]` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Switch the AI model and save it as your default for new sessions. Press `s` on a row to switch for the current session only. For models that support it, use left/right arrows to adjust effort level. When switching mid-conversation after prior output, Claude warns before applying the change |
| 52 | `/passes` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Share a free week of Claude Code with friends. Only visible if your account is eligible |
| 53 | `/plan [description]` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Enter plan mode directly from the prompt. Pass an optional description to enter plan mode and immediately start with that task, for example `/plan fix the auth bug` |
| 54 | `/ultraplan <prompt>` | ![Model](https://img.shields.io/badge/Model-E67E22?style=flat) | Draft a plan in an ultraplan session, review it in your browser, then execute remotely or send it back to your terminal |
| 55 | `/add-dir <path>` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Add a working directory for file access during the current session. Most `.claude/` configuration is not discovered from the added directory |
| 56 | `/diff` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Open an interactive diff viewer showing uncommitted changes and per-turn diffs. Use left/right arrows to switch between the current git diff and individual Claude turns, and up/down to browse files |
| 57 | `/init` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Initialize project with a `CLAUDE.md` guide. Set `CLAUDE_CODE_NEW_INIT=1` for an interactive flow that also walks through skills, hooks, and personal memory files |
| 58 | `/review [PR]` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Review a GitHub pull request by number, using the same review engine as `/code-review`. With no arguments, lists open PRs |
| 59 | `/security-review` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Analyze pending changes on the current branch for security vulnerabilities. Reviews the git diff and identifies risks like injection, auth issues, and data exposure |
| 60 | `/team-onboarding` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Generate a team onboarding guide from your Claude Code usage history. Claude analyzes your sessions, commands, and MCP server usage from the past 30 days and produces a markdown guide. For claude.ai subscribers on Pro, Max, Team, and Enterprise plans, also returns a share link teammates can open directly in Claude Code |
| 61 | `/ultrareview [PR]` | ![Project](https://img.shields.io/badge/Project-27AE60?style=flat) | Run a deep, multi-agent code review in a cloud sandbox. The preferred invocation is `/code-review ultra`; `/ultrareview` remains as an alias. Includes 3 free runs on Pro and Max, then requires usage credits |
| 62 | `/autofix-pr [prompt]` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Spawn a Claude Code on the web session that watches the current branch's PR and pushes fixes when CI fails or reviewers leave comments. Detects the open PR from your checked-out branch with `gh pr view`; to watch a different PR, check out its branch first. Requires the `gh` CLI and access to Claude Code on the web |
| 63 | `/desktop` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Continue the current session in the Claude Code Desktop app. macOS and Windows only. Alias: `/app` |
| 64 | `/install-github-app` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Install the Claude GitHub App for a repository, with an optional step to set up GitHub Actions workflows and secrets |
| 65 | `/install-slack-app` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Install the Claude Slack app. Opens a browser to complete the OAuth flow |
| 66 | `/mobile` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Show QR code to download the Claude mobile app. Aliases: `/ios`, `/android` |
| 67 | `/remote-control` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Make this session available for remote control from claude.ai. Alias: `/rc` |
| 68 | `/remote-env` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Choose the default environment for cloud agents |
| 69 | `/schedule [description]` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Create, update, list, or run routines. Claude walks you through the setup conversationally. Alias: `/routines` |
| 70 | `/teleport` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Pull a Claude Code on the web session into this terminal: opens a picker, then fetches the branch and conversation. Also available as `/tp`. Requires a claude.ai subscription |
| 71 | `/web-setup` | ![Remote](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | Connect your GitHub account to Claude Code on the web using your local `gh` CLI credentials. `/schedule` prompts for this automatically if GitHub is not connected |
| 72 | `/background [prompt]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Detach the current session to run as a background agent and free this terminal. Pass a prompt to send one more instruction before detaching. Monitor the session with `claude agents`. Alias: `/bg` |
| 73 | `/branch [name]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Create a branch of the current conversation at this point |
| 74 | `/btw <question>` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Ask a quick side question without adding to the conversation |
| 75 | `/cd <path>` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Move the session to a new working directory without breaking the prompt cache |
| 76 | `/clear [name]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Start a new conversation with empty context. Pass an optional `name` to label the previous conversation for easy retrieval via `/resume`. To free up context while continuing the same conversation, use `/compact` instead. Aliases: `/reset`, `/new` |
| 77 | `/compact [instructions]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Compact conversation with optional focus instructions |
| 78 | `/exit` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Exit the CLI. In an attached background session, this detaches and the session keeps running. Alias: `/quit` |
| 79 | `/fork <directive>` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Spawn a forked subagent: a background subagent that inherits the full conversation and works on the directive while you keep going |
| 80 | `/goal [condition\|clear]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Set a goal — Claude keeps working across turns until the condition is met. With no argument, shows the current or most recently achieved goal. `clear`, `stop`, `off`, `reset`, `none`, or `cancel` removes an active goal early |
| 81 | `/recap` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Generate a one-line summary of the current session on demand, without affecting the ongoing conversation |
| 82 | `/rename [name]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Rename the current session and show the name on the prompt bar. Without a name, auto-generates one from conversation history |
| 83 | `/resume [session]` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Resume a conversation by ID or name, or open the session picker. As of v2.1.144, background sessions appear in the picker marked with `bg`. Alias: `/continue` |
| 84 | `/rewind` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Rewind the conversation and/or code to a previous point, or summarize from a selected message. See checkpointing. Alias: `/checkpoint`, `/undo` |
| 85 | `/stop` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Stop the current background session. Only available while attached to a background session; the transcript and any worktree are kept. To detach without stopping, use `/exit` or press `←` |
| 86 | `/workflows` | ![Session](https://img.shields.io/badge/Session-4A90D9?style=flat) | Open the workflow progress view to watch, pause, resume, or save running and completed workflows |

Bundled skills such as `/debug` can also appear in the slash-command menu, but they are not built-in commands.

---

## Sources

- [Claude Code Slash Commands](https://code.claude.com/docs/en/slash-commands)
- [Claude Code Interactive Mode](https://code.claude.com/docs/en/interactive-mode)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
