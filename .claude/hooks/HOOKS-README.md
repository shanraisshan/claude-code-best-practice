# HOOKS-README
contains all the details, scripts, and instructions for the hooks

## Hook Events Overview - [Official 19 Hooks](https://code.claude.com/docs/en/hooks)
Claude Code provides several hook events that run at different points in the workflow:

| # | Hook | Description | Options |
|:-:|------|-------------|---------|
| 1 | `PreToolUse` | Runs before tool calls (can block them) | `async`, `timeout: 5000` |
| 2 | `PermissionRequest` | Runs when Claude Code requests permission from the user | `async`, `timeout: 5000`, `permission_suggestions` |
| 3 | `PostToolUse` | Runs after tool calls complete successfully | `async`, `timeout: 5000`, `tool_response` |
| 4 | `PostToolUseFailure` | Runs after tool calls fail | `async`, `timeout: 5000`, `error`, `is_interrupt` |
| 5 | `UserPromptSubmit` | Runs when the user submits a prompt, before Claude processes it | `async`, `timeout: 5000`, `prompt` |
| 6 | `Notification` | Runs when Claude Code sends notifications | `async`, `timeout: 5000`, `notification_type`, `message`, `title` |
| 7 | `Stop` | Runs when Claude Code finishes responding | `async`, `timeout: 5000`, `last_assistant_message`, `stop_hook_active` |
| 8 | `SubagentStart` | Runs when subagent tasks start | `async`, `timeout: 5000`, `agent_id`, `agent_type` |
| 9 | `SubagentStop` | Runs when subagent tasks complete | `async`, `timeout: 5000`, `agent_id`, `agent_type`, `last_assistant_message`, `agent_transcript_path`, `stop_hook_active` |
| 10 | `PreCompact` | Runs before Claude Code is about to run a compact operation | `async`, `timeout: 5000`, `once`, `trigger`, `custom_instructions` |
| 11 | `SessionStart` | Runs when Claude Code starts a new session or resumes an existing session | `async`, `timeout: 5000`, `once`, `agent_type`, `model`, `source` |
| 12 | `SessionEnd` | Runs when Claude Code session ends | `async`, `timeout: 5000`, `once`, `reason` |
| 13 | `Setup` | Runs when Claude Code runs the /setup command for project initialization | `async`, `timeout: 30000` |
| 14 | `TeammateIdle` | Runs when a teammate agent becomes idle (experimental agent teams) | `async`, `timeout: 5000`, `teammate_name`, `team_name` |
| 15 | `TaskCompleted` | Runs when a background task completes (experimental agent teams) | `async`, `timeout: 5000`, `task_id`, `task_subject`, `task_description`, `teammate_name`, `team_name` |
| 16 | `ConfigChange` | Runs when a configuration file changes during a session | `async`, `timeout: 5000`, `file_path`, `source` |
| 17 | `WorktreeCreate` | Runs when agent worktree isolation creates worktrees for custom VCS setup | `async`, `timeout: 5000`, `name` |
| 18 | `WorktreeRemove` | Runs when agent worktree isolation removes worktrees for custom VCS teardown | `async`, `timeout: 5000`, `worktree_path` |
| 19 | `InstructionsLoaded` | Runs when CLAUDE.md or `.claude/rules/*.md` files are loaded into context | `async`, `timeout: 5000` |

> **Note:** Hooks 14-15 (`TeammateIdle` and `TaskCompleted`) require the experimental agent teams feature. Set `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` when launching Claude Code to enable them.

### Not in Official Docs

The following items exist in the [Claude Code Changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) but are **not listed** in the [Official Hooks Reference](https://code.claude.com/docs/en/hooks):

| Item | Added In | Changelog Reference | Notes |
|------|----------|-------------------|-------|
| `Setup` hook | [v2.1.10](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#2110) | "Added new Setup hook event that can be triggered via `--init`, `--init-only`, or `--maintenance` CLI flags for repository setup and maintenance operations" | Not listed in official hooks reference page (17 hooks listed, Setup excluded) |
| `InstructionsLoaded` hook | [v2.1.69](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#2169) | "Added `InstructionsLoaded` hook event that fires when CLAUDE.md or `.claude/rules/*.md` files are loaded into context" | Not listed in official hooks reference page. This hook is introduced in v2.1.69 and not v2.1.64 |
| Agent frontmatter hooks | [v2.1.0](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#210) | "Added hooks support to agent frontmatter, allowing agents to define PreToolUse, PostToolUse, and Stop hooks scoped to the agent's lifecycle" | Changelog only mentions 3 hooks, but testing confirms **6 hooks** actually fire in agent sessions: PreToolUse, PostToolUse, PermissionRequest, PostToolUseFailure, Stop, SubagentStop. Not all 16 hooks are supported. |

## Prerequisites

Before using hooks, ensure you have **Python 3** installed on your system.

### Required Software

#### All Platforms (Windows, macOS, Linux)
- **Python 3**: Required for running the hook scripts
- Verify installation: `python3 --version`

**Installation Instructions:**
- **Windows**: Download from [python.org](https://www.python.org/downloads/) or install via `winget install Python.Python.3`
- **macOS**: Install via `brew install python3` (requires [Homebrew](https://brew.sh/))
- **Linux**: Install via `sudo apt install python3` (Ubuntu/Debian) or `sudo yum install python3` (RHEL/CentOS)

### Audio Players (Optional - Automatically Detected)

The hook scripts automatically detect and use the appropriate audio player for your platform:

- **macOS**: Uses `afplay` (built-in, no installation needed)
- **Linux**: Uses `paplay` from `pulseaudio-utils` - install via `sudo apt install pulseaudio-utils`
- **Windows**: Uses built-in `winsound` module (included with Python)

### How Hooks Are Executed

The hooks are configured in `.claude/settings.json` to run directly with Python 3:

```json
{
  "type": "command",
  "command": "python3 .claude/hooks/scripts/hooks.py"
}
```

## Configuring Hooks (Enable/Disable)

Hooks can be easily enabled or disabled at both the global and individual levels.

### Disable All Hooks at Once

Edit `.claude/settings.local.json` and set:
```json
{
  "disableAllHooks": true
}
```

**Note:** The `.claude/settings.local.json` file is git-ignored, so each user can configure their own hook preferences without affecting the team's shared settings in `.claude/settings.json`.

> **Managed Settings:** If an administrator has configured hooks through managed policy settings, `disableAllHooks` set in user, project, or local settings cannot disable those managed hooks (fixed in v2.1.49).

### Disable Individual Hooks

For granular control, you can disable specific hooks by editing the hooks configuration files.

#### Configuration Files

There are two configuration files for managing individual hooks:

1. **`.claude/hooks/config/hooks-config.json`** - The shared/default configuration that is committed to git
2. **`.claude/hooks/config/hooks-config.local.json`** - Your personal overrides (git-ignored)

The local config file (`.local.json`) takes precedence over the shared config, allowing each developer to customize their hook behavior without affecting the team.

#### Shared Configuration

Edit `.claude/hooks/config/hooks-config.json` for team-wide defaults:

```json
{
  "disableLogging": false,
  "disablePreToolUseHook": false,
  "disablePermissionRequestHook": false,
  "disablePostToolUseHook": false,
  "disablePostToolUseFailureHook": false,
  "disableUserPromptSubmitHook": false,
  "disableNotificationHook": false,
  "disableStopHook": false,
  "disableSubagentStartHook": false,
  "disableSubagentStopHook": false,
  "disablePreCompactHook": false,
  "disableSessionStartHook": false,
  "disableSessionEndHook": false,
  "disableSetupHook": false,
  "disableTeammateIdleHook": false,
  "disableTaskCompletedHook": false,
  "disableConfigChangeHook": false,
  "disableWorktreeCreateHook": false,
  "disableWorktreeRemoveHook": false,
  "disableInstructionsLoadedHook": false
}
```

**Configuration Options:**
- `disableLogging`: Set to `true` to disable logging hook events to `.claude/hooks/logs/hooks-log.jsonl` (useful to prevent log file growth)

#### Local Configuration (Personal Overrides)

Create or edit `.claude/hooks/config/hooks-config.local.json` for personal preferences:

```json
{
  "disableLogging": true,
  "disablePostToolUseHook": true,
  "disableSessionStartHook": true
}
```

In this example, logging is disabled, and the PostToolUse and SessionStart hooks are overridden locally. All other hooks will use the shared configuration values.

**Note:** Individual hook toggles are checked by the hook script (`.claude/hooks/scripts/hooks.py`). Local settings override shared settings, and if a hook is disabled, the script exits silently without playing any sounds or executing hook logic.

### Text to Speech (TTS)
website used to generate sounds: https://elevenlabs.io/
voice used: Samara X

## Agent Frontmatter Hooks

Claude Code 2.1.0 introduced support for agent-specific hooks defined in agent frontmatter files. These hooks only run within the agent's lifecycle and support a subset of hook events.

### Supported Agent Hooks

Agent frontmatter hooks support **6 hooks** (not all 16). The changelog originally mentioned only 3, but testing confirms 6 hooks actually fire in agent sessions:
- `PreToolUse`: Runs before the agent uses a tool
- `PostToolUse`: Runs after the agent completes a tool use
- `PermissionRequest`: Runs when a tool requires user permission
- `PostToolUseFailure`: Runs after a tool call fails
- `Stop`: Runs when the agent finishes
- `SubagentStop`: Runs when a subagent completes

> **Note:** The [v2.1.0 changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#210) only mentions 3 hooks: *"Added hooks support to agent frontmatter, allowing agents to define PreToolUse, PostToolUse, and Stop hooks scoped to the agent's lifecycle"*. However, testing with the `claude-code-voice-hook-agent` confirms that 6 hooks actually fire in agent sessions. The remaining 10 hooks (e.g., Notification, SessionStart, SessionEnd, etc.) do not fire in agent contexts.
>
> **Update (Feb 2026):** The [official hooks reference](https://code.claude.com/docs/en/hooks) now states *"All hook events are supported"* for skill/agent frontmatter hooks. This may mean support has expanded beyond the 6 hooks originally tested. Re-testing recommended to verify if additional hooks now fire in agent sessions.

### Agent Sound Folders

Agent-specific sounds are stored in separate folders:
- `.claude/hooks/sounds/agent_pretooluse/`
- `.claude/hooks/sounds/agent_posttooluse/`
- `.claude/hooks/sounds/agent_permissionrequest/`
- `.claude/hooks/sounds/agent_posttoolusefailure/`
- `.claude/hooks/sounds/agent_stop/`
- `.claude/hooks/sounds/agent_subagentstop/`

### Creating an Agent with Hooks

1. Create an agent definition file in `.claude/agents/`:

```markdown
---
name: my-agent
description: Description of what this agent does
hooks:
  PreToolUse:
    - type: command
      command: python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/hooks.py --agent=my-agent
      timeout: 5000
      async: true
      statusMessage: PreToolUse
  PostToolUse:
    - type: command
      command: python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/hooks.py --agent=my-agent
      timeout: 5000
      async: true
      statusMessage: PostToolUse
  PermissionRequest:
    - type: command
      command: python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/hooks.py --agent=my-agent
      timeout: 5000
      async: true
      statusMessage: PermissionRequest
  PostToolUseFailure:
    - type: command
      command: python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/hooks.py --agent=my-agent
      timeout: 5000
      async: true
      statusMessage: PostToolUseFailure
  Stop:
    - type: command
      command: python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/hooks.py --agent=my-agent
      timeout: 5000
      async: true
      statusMessage: Stop
  SubagentStop:
    - type: command
      command: python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/hooks.py --agent=my-agent
      timeout: 5000
      async: true
      statusMessage: SubagentStop
---

Your agent instructions here...
```

2. Add sound files to the agent sound folders:
   - `agent_pretooluse/agent_pretooluse.wav`
   - `agent_posttooluse/agent_posttooluse.wav`
   - `agent_permissionrequest/agent_permissionrequest.wav`
   - `agent_posttoolusefailure/agent_posttoolusefailure.wav`
   - `agent_stop/agent_stop.wav`
   - `agent_subagentstop/agent_subagentstop.wav`

### Example: Weather Fetcher Agent

See `.claude/agents/claude-code-voice-hook-agent.md` for a complete example of an agent with hooks configured.

### Hook Option: `once: true`

The `once: true` option ensures a hook only runs once per session:

```json
{
  "type": "command",
  "command": "python3 .claude/hooks/scripts/hooks.py",
  "timeout": 5000,
  "once": true
}
```

This is useful for hooks like `SessionStart`, `SessionEnd`, and `PreCompact` that should only trigger once.

> **Note:** The `once` option is for **skills only, not agents**. It works in settings-based hooks and skill frontmatter, but is not supported in agent frontmatter hooks.

### Hook Option: `async: true`

Hooks can run in the background without blocking Claude Code's execution by adding `"async": true`:

```json
{
  "type": "command",
  "command": "python3 .claude/hooks/scripts/hooks.py",
  "timeout": 5000,
  "async": true
}
```

**When to use async hooks:**
- Logging and analytics
- Notifications and sound effects
- Any side-effect that shouldn't slow down Claude Code

This project uses `async: true` for all hooks since voice notifications are side-effects that don't need to block execution. The `timeout` specifies how long the async hook can run before being terminated.

### Hook Option: `statusMessage`

The `statusMessage` field sets a custom spinner message displayed to the user while the hook is running:

```json
{
  "type": "command",
  "command": "python3 .claude/hooks/scripts/hooks.py",
  "timeout": 5000,
  "async": true,
  "statusMessage": "PreToolUse"
}
```

This project sets `statusMessage` to the hook event name on all hooks, so the spinner briefly shows which hook is firing (e.g., "PreToolUse", "SessionStart", "Stop"). This is most visible for synchronous hooks; for async hooks the message flashes briefly before the hook runs in the background.

## Hook Types

Claude Code supports four hook handler types. This project uses `command` hooks for all sound playback.

### `type: "command"` (used by this project)

Runs a shell command. Receives JSON input via stdin, communicates results through exit codes and stdout.

```json
{
  "type": "command",
  "command": "python3 .claude/hooks/scripts/hooks.py",
  "timeout": 5000,
  "async": true
}
```

### `type: "prompt"`

Sends a prompt to a Claude model for single-turn evaluation. The model returns a yes/no decision as JSON (`{"ok": true/false, "reason": "..."}`). Useful for decisions that require judgment rather than deterministic rules.

```json
{
  "type": "prompt",
  "prompt": "Check if all tasks are complete. $ARGUMENTS",
  "timeout": 30
}
```

**Supported events:** PreToolUse, PostToolUse, PostToolUseFailure, PermissionRequest, UserPromptSubmit, Stop, SubagentStop, TaskCompleted. **Command-only events (not supported for prompt/agent types):** ConfigChange, InstructionsLoaded, Notification, PreCompact, SessionEnd, SessionStart, Setup, SubagentStart, TeammateIdle, WorktreeCreate, WorktreeRemove.

### `type: "agent"`

Spawns a subagent with multi-turn tool access (Read, Grep, Glob) to verify conditions before returning a decision. Same response format as prompt hooks. Useful when verification requires inspecting actual files or test output.

```json
{
  "type": "agent",
  "prompt": "Verify that all unit tests pass. $ARGUMENTS",
  "timeout": 120
}
```

### `type: "http"` (since v2.1.63)

POSTs JSON to a URL and receives a JSON response, instead of running a shell command. Useful for integrating with external services or webhooks. HTTP hooks are routed through the sandbox network proxy when sandboxing is enabled.

```json
{
  "type": "http",
  "url": "http://localhost:8080/hooks/pre-tool-use",
  "timeout": 30,
  "headers": {
    "Authorization": "Bearer $MY_TOKEN"
  },
  "allowedEnvVars": ["MY_TOKEN"]
}
```

**Not supported for:** SessionStart, Setup events. Headers support environment variable interpolation with `$VAR_NAME`, but only for variables explicitly listed in `allowedEnvVars`.

## Environment Variables

Claude Code provides these environment variables to hook scripts:

| Variable | Availability | Description |
|----------|-------------|-------------|
| `$CLAUDE_PROJECT_DIR` | All hooks | Project root directory. Wrap in quotes for paths with spaces |
| `$CLAUDE_ENV_FILE` | SessionStart only | File path for persisting environment variables for subsequent Bash commands. Use append (`>>`) to preserve variables from other hooks |
| `${CLAUDE_PLUGIN_ROOT}` | Plugin hooks | Plugin's root directory, for scripts bundled with a plugin |
| `$CLAUDE_CODE_REMOTE` | All hooks | Set to `"true"` in remote web environments, not set in local CLI |
| `session_id` (via stdin JSON) | All hooks | Current session ID, received as part of the JSON input on stdin (not an environment variable) |

### Common Input Fields (stdin JSON)

Every hook receives a JSON object on stdin containing these common fields, in addition to any hook-specific fields listed in the Options column above:

| Field | Type | Description |
|-------|------|-------------|
| `hook_event_name` | string | Name of the hook event that fired (e.g., `"PreToolUse"`, `"Stop"`) |
| `session_id` | string | Current session identifier |
| `transcript_path` | string | Path to the conversation transcript JSON file |
| `cwd` | string | Current working directory |
| `permission_mode` | string | Current permission mode: `default`, `plan`, `acceptEdits`, `dontAsk`, or `bypassPermissions` |
| `agent_id` | string | Unique subagent identifier. Present when the hook fires inside a subagent context (since v2.1.69) |
| `agent_type` | string | Agent type name (e.g. `Bash`, `Explore`, `Plan`, or custom). Present when using `--agent <name>` flag or inside a subagent (since v2.1.69) |

> **Note:** Hook-specific fields (e.g., `tool_name` for PreToolUse, `last_assistant_message` for Stop) are listed in the Options column of the [Hook Events Overview](#hook-events-overview---official-18-hooks) table above.

## Hooks Management Commands

Claude Code provides built-in commands for managing hooks:

- **`/hooks`** — Interactive hook management UI. View, add, and delete hooks without editing JSON files. Hooks are labeled by source: `[User]`, `[Project]`, `[Local]`, `[Plugin]`. You can also toggle `disableAllHooks` from this menu.
- **`claude hooks reload`** — Reload hooks configuration without restarting the session. Useful after editing settings files (since v2.0.47).

## MCP Tool Matchers

For `PreToolUse`, `PostToolUse`, and `PermissionRequest` hooks, you can match MCP (Model Context Protocol) tools using the pattern `mcp__<server>__<tool>`:

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "mcp__memory__.*",
      "hooks": [{ "type": "command", "command": "echo 'MCP memory tool used'" }]
    }]
  }
}
```

Full regex is supported: `mcp__memory__.*` (all tools from memory server), `mcp__.*__write.*` (any write tool from any server).

### Per-Hook Matcher Reference

Matchers filter which events trigger a hook. Not all hooks support matchers — hooks without matcher support always fire.

| Hook | Matcher Field | Possible Values | Example |
|------|--------------|-----------------|---------|
| `PreToolUse` | `tool_name` | Any tool name: `Bash`, `Read`, `Edit`, `Write`, `Glob`, `Grep`, `mcp__*` | `"matcher": "Bash"` |
| `PermissionRequest` | `tool_name` | Same as PreToolUse | `"matcher": "mcp__memory__.*"` |
| `PostToolUse` | `tool_name` | Same as PreToolUse | `"matcher": "Write"` |
| `PostToolUseFailure` | `tool_name` | Same as PreToolUse | `"matcher": "Bash"` |
| `Notification` | `notification_type` | `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog` | `"matcher": "permission_prompt"` |
| `SubagentStart` | `agent_type` | `Bash`, `Explore`, `Plan`, or custom agent name | `"matcher": "Bash"` |
| `SubagentStop` | `agent_type` | `Bash`, `Explore`, `Plan`, or custom agent name | `"matcher": "Bash"` |
| `SessionStart` | `source` | `startup`, `resume`, `clear`, `compact` | `"matcher": "startup"` |
| `SessionEnd` | `reason` | `clear`, `logout`, `prompt_input_exit`, `bypass_permissions_disabled`, `other` | `"matcher": "logout"` |
| `PreCompact` | `trigger` | `manual`, `auto` | `"matcher": "auto"` |
| `ConfigChange` | `source` | `user_settings`, `project_settings`, `local_settings`, `policy_settings`, `skills` | `"matcher": "project_settings"` |
| `UserPromptSubmit` | — | No matcher support | Always fires |
| `Stop` | — | No matcher support | Always fires |
| `TeammateIdle` | — | No matcher support | Always fires |
| `TaskCompleted` | — | No matcher support | Always fires |
| `WorktreeCreate` | — | No matcher support | Always fires |
| `WorktreeRemove` | — | No matcher support | Always fires |
| `InstructionsLoaded` | — | No matcher support | Always fires |
| `Setup` | — | No matcher support | Always fires |

## Known Issues & Workarounds

### Agent Stop Hook Bug (SubagentStop vs Stop)

**Bug Report:** [GitHub Issue #19220](https://github.com/anthropics/claude-code/issues/19220)

**Issue:** When defining a `Stop` hook in an agent's frontmatter, the `hook_event_name` passed to the hook script is `"SubagentStop"` instead of `"Stop"`. This contradicts the official documentation and breaks consistency with other agent hooks (`PreToolUse` and `PostToolUse`), which correctly pass their configured names.

| Hook | Defined As | Received As | Status |
|------|------------|-------------|--------|
| PreToolUse | `PreToolUse:` | `"PreToolUse"` | ✅ Correct |
| PostToolUse | `PostToolUse:` | `"PostToolUse"` | ✅ Correct |
| Stop | `Stop:` | `"SubagentStop"` | ❌ Inconsistent |

**Status:** The [official hooks reference](https://code.claude.com/docs/en/hooks#hooks-in-skills-and-agents) now documents this as expected behavior: *"For subagents, Stop hooks are automatically converted to SubagentStop since that is the event that fires when a subagent completes."* This project handles it via the `AGENT_HOOK_SOUND_MAP` in `hooks.py`, which has a separate `SubagentStop` entry that maps to the `agent_subagentstop` sound folder.

### PreToolUse Decision Control Deprecation

The `PreToolUse` hook previously used top-level `decision` and `reason` fields for blocking tool calls. These are now **deprecated**. Use `hookSpecificOutput.permissionDecision` and `hookSpecificOutput.permissionDecisionReason` instead:

| Deprecated | Current |
|-----------|---------|
| `"decision": "approve"` | `"hookSpecificOutput": { "permissionDecision": "allow" }` |
| `"decision": "block"` | `"hookSpecificOutput": { "permissionDecision": "deny" }` |

This does not affect this project since `hooks.py` uses async sound playback and does not use decision control.

## Decision Control Patterns

Different hooks use different output schemas for blocking or controlling execution. This project does not use decision control (all hooks are async sound playback), but for reference:

| Hook(s) | Control Method | Values |
|---------|---------------|--------|
| PreToolUse | `hookSpecificOutput.permissionDecision` | `allow`, `deny`, `ask` |
| PreToolUse | `hookSpecificOutput.autoAllow` | `true` — auto-approve future uses of this tool (since v2.0.76) |
| PermissionRequest | `hookSpecificOutput.decision.behavior` | `allow`, `deny` |
| PostToolUse, PostToolUseFailure, Stop, SubagentStop, ConfigChange | Top-level `decision` | `block` |
| TeammateIdle, TaskCompleted | Exit code 2 only | No JSON decision control |
| UserPromptSubmit | Can modify `prompt` field | Returns modified prompt via stdout |
| WorktreeCreate | Non-zero exit + stdout path | Non-zero exit fails creation; stdout provides worktree path |

### Universal JSON Output Fields

All hooks can return these fields via stdout JSON:

| Field | Type | Description |
|-------|------|-------------|
| `continue` | bool | If `false`, stops Claude entirely |
| `stopReason` | string | Message shown when `continue` is false |
| `suppressOutput` | bool | Hides stdout from verbose mode |
| `systemMessage` | string | Warning message shown to user |
| `additionalContext` | string | Context added to Claude's conversation |

## Hook Deduplication & External Changes

- **Hook deduplication:** Identical hook handlers defined in multiple settings locations run only once in parallel, preventing duplicate execution.
- **External change detection:** Claude Code warns when hooks are modified externally (e.g., by another process editing settings files) during an active session.