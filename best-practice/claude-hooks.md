# Hooks Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar%2014%2C%202026-white?style=flat&labelColor=555)<br>
[![Implemented](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](https://github.com/shanraisshan/claude-code-voice-hooks)

Claude Code hooks — lifecycle events, hook types, exit codes, matchers, and environment variables.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Hook Events (22)

| # | Event | When It Fires | Can Block? | Useful For |
|---|-------|---------------|------------|------------|
| 1 | `PreToolUse` | Before a tool executes | Yes | Validating or modifying tool input, enforcing policies, auto-approving safe operations |
| 2 | `PostToolUse` | After a tool completes successfully | No | Logging, injecting additional context, replacing MCP tool output |
| 3 | `PostToolUseFailure` | After a tool execution fails | No | Error tracking, custom failure diagnostics |
| 4 | `UserPromptSubmit` | When the user submits a prompt | Yes | Input validation, prompt rewriting, guardrails |
| 5 | `Notification` | When a notification is sent | No | Sound alerts, desktop notifications, Slack messages |
| 6 | `Stop` | When the main agent finishes | Yes | Forcing continuation, post-task verification, cleanup |
| 7 | `SubagentStart` | When a subagent is spawned | No | Logging subagent activity, resource tracking |
| 8 | `SubagentStop` | When a subagent finishes | Yes | Validating subagent output, forcing subagent continuation |
| 9 | `PreCompact` | Before context compaction | No | Saving context snapshots, analytics |
| 10 | `PostCompact` | After context compaction | No | Logging compaction results, cache warming |
| 11 | `SessionStart` | New session, resume, clear, or compact | No | Environment setup, persisting env vars via `CLAUDE_ENV_FILE`, loading project context |
| 12 | `SessionEnd` | Session terminates | No | Cleanup, analytics, saving session summaries |
| 13 | `InstructionsLoaded` | CLAUDE.md or `.claude/rules` loaded | No | Tracking which instructions are active, auditing rule changes |
| 14 | `PermissionRequest` | Permission dialog is shown | Yes | Auto-approving/denying permissions programmatically |
| 15 | `TeammateIdle` | Team teammate is about to idle | Yes | Keeping teammates active, assigning new work |
| 16 | `TaskCompleted` | A task is marked complete | Yes | Validation gates, notification pipelines, CI integration |
| 17 | `ConfigChange` | A config file changes | Yes | Auditing config drift, blocking unsafe changes (policy changes cannot be blocked) |
| 18 | `Elicitation` | MCP server requests user input | Yes | Auto-responding to MCP prompts without user dialog |
| 19 | `ElicitationResult` | User responds to elicitation | Yes | Intercepting or modifying MCP input responses |
| 20 | `WorktreeCreate` | Git worktree is created | Yes | Custom worktree paths, non-git VCS setup |
| 21 | `WorktreeRemove` | Git worktree is removed | No | Cleanup for non-git version control systems |
| 22 | `Setup` | First-run setup flow | No | Bootstrapping developer environments |

---

## Hook Types (4)

| Type | Description | Default Timeout | Multi-turn? |
|------|-------------|-----------------|-------------|
| `command` | Executes a shell command; receives JSON on stdin, returns exit code + stdout/stderr | 600s | No |
| `http` | Sends a JSON POST request to a URL; response body follows the same format as command hooks | 30s | No |
| `prompt` | Single-turn LLM evaluation; responds with `{"ok": true/false, "reason": "..."}` | 30s | No |
| `agent` | Multi-turn agentic verification with tool access (Read, Grep, Glob); up to 50 turns | 60s | Yes |

### Supported Hook Types by Event

| Events | command | http | prompt | agent |
|--------|---------|------|--------|-------|
| PreToolUse, PostToolUse, PostToolUseFailure, PermissionRequest, Stop, SubagentStop, TaskCompleted, UserPromptSubmit | Yes | Yes | Yes | Yes |
| ConfigChange, Elicitation, ElicitationResult, InstructionsLoaded, Notification, PostCompact, PreCompact, SessionEnd, SessionStart, SubagentStart, TeammateIdle, WorktreeCreate, WorktreeRemove | Yes | No | No | No |

---

## Hook Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | string | Yes | Hook type: `command`, `http`, `prompt`, or `agent` |
| `command` | string | For `command` | Shell command to execute. Supports `$CLAUDE_PROJECT_DIR` and `${CLAUDE_PLUGIN_ROOT}` |
| `url` | string | For `http` | HTTP endpoint URL |
| `prompt` | string | For `prompt`/`agent` | LLM prompt text. Use `$ARGUMENTS` placeholder for JSON input |
| `model` | string | For `prompt`/`agent` | Model to use (e.g., `claude-3-5-haiku-20241022`) |
| `headers` | object | No | HTTP headers for `http` hooks. Supports env var interpolation (e.g., `"Bearer $MY_TOKEN"`) |
| `timeout` | number | No | Timeout in seconds (defaults vary by type) |
| `async` | boolean | No | Run in background (command hooks only). Cannot block or control behavior |
| `once` | boolean | No | Run only once per session |
| `statusMessage` | string | No | Custom message displayed while the hook is running |

### Matcher Configuration

Matchers filter which specific events trigger a hook. Configured at the event-handler level, not on individual hooks.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash|Edit|Write",
        "hooks": [{ "type": "command", "command": "validate.sh" }]
      }
    ]
  }
}
```

| Pattern | Meaning |
|---------|---------|
| `""`, `"*"`, or omitted | Match all |
| `"Bash\|Edit\|Write"` | Match any of these tool names |
| `"mcp__memory__.*"` | Regex — match MCP tools from the memory server |
| `"mcp__.*__write.*"` | Regex — match write tools across all MCP servers |
| `".*test"` | Regex — match any tool name ending in "test" |

### Matcher Values by Event

| Event(s) | Matcher Matches Against |
|----------|------------------------|
| PreToolUse, PostToolUse, PostToolUseFailure, PermissionRequest | Tool name (e.g., `Bash`, `Edit`, `mcp__github__create_issue`) |
| SubagentStart, SubagentStop | Agent type name |
| SessionStart | `startup`, `resume`, `clear`, `compact` |
| SessionEnd | `clear`, `logout`, `prompt_input_exit`, `bypass_permissions_disabled`, `other` |
| Notification | `permission_prompt`, `idle_prompt`, `auth_success`, `elicitation_dialog` |
| PreCompact, PostCompact | `manual`, `auto` |
| ConfigChange | `user_settings`, `project_settings`, `local_settings`, `policy_settings`, `skills` |
| Elicitation, ElicitationResult | MCP server name |
| UserPromptSubmit, Stop, TeammateIdle, TaskCompleted, WorktreeCreate, WorktreeRemove, InstructionsLoaded | No matcher support |

---

## Exit Codes

| Exit Code | Meaning | Behavior |
|-----------|---------|----------|
| **0** | Success | Action proceeds. Stdout parsed for JSON output. Text output shown in verbose mode (`Ctrl+O`) |
| **2** | Blocking error | Action is blocked (if the event supports blocking). Stderr is fed back to Claude as an error message |
| **Other** (1, 3, ...) | Non-blocking error | Execution continues. Stderr shown in verbose mode only |

### Exit Code 2 Behavior by Event

| Event | What Gets Blocked |
|-------|-------------------|
| `PreToolUse` | Tool call is blocked |
| `PermissionRequest` | Permission is denied |
| `UserPromptSubmit` | Prompt is blocked and erased |
| `Stop`, `SubagentStop` | Agent is prevented from stopping |
| `TeammateIdle` | Teammate gets feedback and continues working |
| `TaskCompleted` | Task completion is prevented with feedback |
| `ConfigChange` | Config change is blocked (except policy changes) |
| `Elicitation`, `ElicitationResult` | Elicitation is denied/blocked |
| `WorktreeCreate` | Worktree creation fails |
| Non-blocking events | Error is shown but action proceeds |

---

## JSON Output Schema

Hooks can return JSON on stdout to control Claude's behavior beyond simple exit codes.

### Universal Fields

| Field | Type | Description |
|-------|------|-------------|
| `continue` | boolean | Set `false` to stop Claude entirely |
| `stopReason` | string | Message when `continue` is false |
| `suppressOutput` | boolean | Suppress hook output from display |
| `systemMessage` | string | Warning message injected into context |

### Event-Specific Output

| Event | Key Fields | Example |
|-------|------------|---------|
| PreToolUse | `hookSpecificOutput.permissionDecision` (`allow`/`deny`/`ask`), `updatedInput`, `additionalContext` | Auto-approve safe Bash commands |
| PermissionRequest | `hookSpecificOutput.decision.behavior` (`allow`/`deny`), `updatedInput`, `message` | Programmatic permission handling |
| PostToolUse | `hookSpecificOutput.additionalContext`, `updatedMCPToolOutput` | Inject context or replace MCP output |
| Stop, SubagentStop | `decision` (`block`), `reason` | Force Claude to keep working |
| UserPromptSubmit | `decision` (`block`), `reason` | Block inappropriate prompts |
| Elicitation | `hookSpecificOutput.action` (`accept`/`decline`/`cancel`), `content` | Auto-respond to MCP input dialogs |

---

## HTTP Hooks

HTTP hooks send a JSON POST request to a URL endpoint instead of running a shell command.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "http",
            "url": "http://localhost:8080/hooks/post-bash",
            "headers": {
              "Authorization": "Bearer $MY_TOKEN"
            },
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

### HTTP Hook Settings

| Setting | Scope | Description |
|---------|-------|-------------|
| `allowedHttpHookUrls` | Any | URL patterns allowed for HTTP hooks (e.g., `"http://localhost:*"`) |
| `httpHookAllowedEnvVars` | Any | Environment variable names allowed for header interpolation |

Non-2xx responses are treated as non-blocking errors. The response body follows the same JSON schema as command hook stdout.

---

## Environment Variables

### Hook-Specific Variables

| Variable | Availability | Description |
|----------|-------------|-------------|
| `CLAUDE_ENV_FILE` | SessionStart only | File path to persist environment variables across the session |
| `CLAUDE_PROJECT_DIR` | All command hooks | Project root path (wrap in quotes for paths with spaces) |
| `${CLAUDE_PLUGIN_ROOT}` | Plugin hooks | Plugin root directory path |
| `CLAUDE_CODE_REMOTE` | All hooks | Set to `"true"` in remote/web environments; not set locally |

### Hook Input (JSON on stdin)

All hooks receive a JSON object on stdin with these common fields:

| Field | Description |
|-------|-------------|
| `session_id` | Current session identifier |
| `transcript_path` | Path to the session transcript `.jsonl` file |
| `cwd` | Current working directory |
| `permission_mode` | Active permission mode (`default`, `plan`, `acceptEdits`, `dontAsk`, `bypassPermissions`) |
| `hook_event_name` | The event that triggered this hook |
| `agent_id` | Agent instance identifier |
| `agent_type` | Agent type name |

### Timeout Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | 1500ms | Timeout for SessionEnd hooks (set higher if hooks need more time) |

---

## Configuration Scopes

Hooks can be defined at multiple levels. All levels merge at runtime; identical handlers are deduplicated.

| Scope | Location | Shared? | Use Case |
|-------|----------|---------|----------|
| User (global) | `~/.claude/settings.json` | No | Personal hooks across all projects |
| Project (team) | `.claude/settings.json` | Yes | Team-shared hooks |
| Project (local) | `.claude/settings.local.json` | No (git-ignored) | Personal project-specific hooks |
| Managed (org) | Managed settings | Yes (IT-deployed) | Organization-enforced hooks |
| Agent frontmatter | `.claude/agents/*.md` `hooks:` field | Yes | Hooks scoped to a specific subagent |
| Skill frontmatter | `.claude/skills/*/SKILL.md` `hooks:` field | Yes | Hooks scoped to a specific skill |
| Plugin | Plugin `hooks/hooks.json` | Yes | Hooks bundled with a plugin |

### Disabling Hooks

```json
{
  "disableAllHooks": true
}
```

- Respects the settings hierarchy — user/project settings cannot disable managed hooks
- Only managed-level `disableAllHooks` disables managed hooks
- Set `allowManagedHooksOnly` (managed settings) to ignore all non-managed hooks

---

## Best Practices

### When to Use Hooks vs Skills vs Commands

| Mechanism | Best For | Runs |
|-----------|----------|------|
| **Hooks** | Automated reactions to lifecycle events — validation, logging, notifications, policy enforcement | Automatically on matching events |
| **Skills** | Reusable knowledge and workflows invoked by Claude or the user via `/slash-command` | On demand (user or model) |
| **Commands** | User-initiated workflows with arguments — orchestration entry points | On demand (user only) |

### Performance

- Keep command hooks **fast** (under 1 second for blocking events). Slow hooks degrade the interactive experience
- Use `async: true` for non-critical hooks (logging, analytics) that do not need to influence behavior
- Set appropriate `timeout` values — do not rely on the 600-second default for hooks that should be quick
- SessionEnd hooks have a hard 1.5-second default timeout (`CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS`)

### Cross-Platform Considerations

- Use Python or Node.js scripts instead of Bash for cross-platform compatibility
- Shell profiles that print output on startup can break JSON parsing — keep hook scripts clean
- Test hooks on all target platforms (macOS, Linux, Windows/WSL)
- Quote `$CLAUDE_PROJECT_DIR` in shell commands for paths with spaces

### Debugging

- Use `Ctrl+O` (verbose mode) to see hook output in real time
- Run Claude Code with `--debug` to see full hook execution details
- Use `/hooks` to view all configured hooks by event and their source labels (`[User]`, `[Project]`, `[Local]`, `[Plugin]`, `[Session]`, `[Built-in]`)
- Hook snapshots are taken at session start — external modifications trigger a review warning

---

## Sources

- [Claude Code Hooks Documentation](https://code.claude.com/docs/en/hooks)
- [Claude Code Voice Hooks](https://github.com/shanraisshan/claude-code-voice-hooks) — Reference implementation with sound notifications
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
