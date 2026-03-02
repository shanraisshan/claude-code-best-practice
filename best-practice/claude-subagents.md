# Sub-agents Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Feb%2028%2C%202026%203%3A22%20PM%20PKT-white?style=flat&labelColor=555)<br>
[![Implemented](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../implementation/claude-subagents-implementation.md)

Complete reference for Claude Code subagents — built-in agent types, custom agent definitions, and frontmatter fields.

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
| `name` | string | Yes | Unique identifier using lowercase letters and hyphens |
| `description` | string | Yes | When to invoke. Use `"PROACTIVELY"` for auto-invocation by Claude |
| `tools` | string/list | No | Comma-separated allowlist of tools (e.g., `Read, Write, Edit, Bash`). Inherits all tools if omitted. Supports `Task(agent_type)` syntax to restrict spawnable subagents |
| `disallowedTools` | string/list | No | Tools to deny, removed from inherited or specified list |
| `model` | string | No | Model alias: `haiku`, `sonnet`, `opus`, or `inherit` (default: `inherit`) |
| `permissionMode` | string | No | Permission mode: `default`, `acceptEdits`, `dontAsk`, `bypassPermissions`, or `plan` |
| `maxTurns` | integer | No | Maximum number of agentic turns before the subagent stops |
| `skills` | list | No | Skill names to preload into agent context at startup (full content injected, not just made available) |
| `mcpServers` | list | No | MCP servers for this subagent — server name strings or inline `{name: config}` objects |
| `hooks` | object | No | Lifecycle hooks scoped to this subagent: `PreToolUse`, `PostToolUse`, `Stop` (converted to `SubagentStop` at runtime) |
| `memory` | string | No | Persistent memory scope: `user`, `project`, or `local` |
| `background` | boolean | No | Set to `true` to always run as a background task (default: `false`) |
| `isolation` | string | No | Set to `"worktree"` to run in a temporary git worktree (auto-cleaned if no changes) |
| `color` | string | No | CLI output color for visual distinction (e.g., `green`, `magenta`). Functional but absent from official frontmatter table — documented in interactive quickstart only |

---

## Memory Scopes

| Scope | Storage Location | Shared | Version Controlled |
|-------|-----------------|--------|--------------------|
| `user` | `~/.claude/agent-memory/<name>/` | No | No |
| `project` | `.claude/agent-memory/<name>/` | Yes | Yes |
| `local` | `.claude/agent-memory-local/<name>/` | No | No |

See [claude-agent-memory.md](../claude-agent-memory.md) for full details.

---

## Invocation

Agents are invoked via the **Task tool**, never via bash commands:

```
Task(subagent_type="agent-name", description="...", prompt="...", model="haiku")
```

Other invocation and management methods:

| Method | Description |
|--------|-------------|
| `--agents '{...}'` CLI flag | Define session-scoped agents via JSON (accepts `description`, `prompt`, `tools`, `model`, etc.) |
| `claude agents` CLI command | List all configured agents grouped by source (added v2.1.51) |
| `/agents` interactive command | Create, edit, and manage agents interactively |
| Command delegation | A command file (`.claude/commands/`) can delegate to an agent |
| Agent resumption | Completed subagents can be resumed with their agent ID for follow-up work |

---

## Example: Minimal Agent

```yaml
---
name: code-reviewer
description: Reviews code for quality issues
tools: Read, Grep, Glob
model: haiku
---

Review the code for quality issues and report findings.
```

## Example: Full-Featured Agent (All Fields)

```yaml
---
name: deploy-manager
description: Use this agent PROACTIVELY for deployment pipelines and release management
tools: Read, Write, Edit, Bash, Grep, Glob, Task(monitor, rollback)
disallowedTools: NotebookEdit
model: sonnet
permissionMode: acceptEdits
maxTurns: 25
skills:
  - deploy-checklist
  - rollback-procedures
mcpServers:
  - slack
  - name: pagerduty
    command: npx
    args: ["-y", "@pagerduty/mcp-server"]
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-deploy-command.sh"
  PostToolUse:
    - matcher: "Write"
      hooks:
        - type: command
          command: "./scripts/log-file-changes.sh"
  Stop:
    - hooks:
        - type: command
          command: "./scripts/notify-deploy-complete.sh"
memory: project
background: false
isolation: worktree
color: blue
---

You are a deployment manager. Follow the deploy-checklist skill for
pre-flight checks and use rollback-procedures if any step fails.
Notify the team via Slack when deployment completes.
```

---

## Scope and Priority

When multiple subagents share the same name, the higher-priority location wins:

| Location | Scope | Priority |
|----------|-------|----------|
| `--agents` CLI flag | Current session | 1 (highest) |
| `.claude/agents/` | Current project | 2 |
| `~/.claude/agents/` | All your projects | 3 |
| Plugin's `agents/` directory | Where plugin is enabled | 4 (lowest) |

---

## Claude Agents

### Official Claude Agents

Built-in agent types available via `subagent_type` in the Task tool:

| Agent | Model | Tools | Description |
|-------|-------|-------|-------------|
| `general-purpose` | inherit | All | Complex multi-step tasks — the default agent type for research, code search, and autonomous work |
| `Explore` | haiku | Read-only (no Write, Edit) | Fast codebase search and exploration — optimized for finding files, searching code, and answering codebase questions |
| `Plan` | inherit | Read-only (no Write, Edit) | Pre-planning research in plan mode — explores the codebase and designs implementation approaches before writing code |
| `claude-code-guide` | inherit | Glob, Grep, Read, WebFetch, WebSearch | Answers questions about Claude Code features, hooks, slash commands, MCP servers, settings, IDE integrations, and keyboard shortcuts |
| `statusline-setup` | inherit | Read, Edit | Configures the user's Claude Code status line setting |

### Agents in This Repository

Custom agents defined in `.claude/agents/` for this project:

| Agent | Model | Color | Tools | Skills | Memory |
|-------|-------|-------|-------|--------|--------|
| [`presentation-curator`](../.claude/agents/presentation-curator.md) | sonnet | magenta | Read, Write, Edit, Grep, Glob | presentation/vibe-to-agentic-framework, presentation/presentation-structure, presentation/presentation-styling | — |
| [`weather-agent`](../.claude/agents/weather-agent.md) | sonnet | teal | WebFetch, Read, Write, Edit | weather-fetcher | project |
| [`workflow-claude-subagents-agent`](../.claude/agents/workflows/best-practice/workflow-claude-subagents-agent.md) | opus | blue | All (inherited) | — | — |

---

## Sources

- [Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [CLI reference — Claude Code Docs](https://code.claude.com/docs/en/cli-reference)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
