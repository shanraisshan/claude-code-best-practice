# Agent Teams Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar%2014%2C%202026-white?style=flat&labelColor=555)<br>
[![Implemented](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../implementation/claude-agent-teams-implementation.md)

Multiple Claude Code instances working in parallel on the same codebase with shared task coordination.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## What Are Agent Teams

Agent teams let you coordinate multiple Claude Code instances working together. One session acts as the **team lead**, coordinating work, assigning tasks, and synthesizing results. **Teammates** work independently, each in its own context window, and communicate directly with each other via a shared mailbox.

Unlike subagents (which run within a single session and only report back to the caller), teammates are fully independent Claude Code sessions that can message each other, claim tasks from a shared list, and be interacted with directly.

| Component | Role |
|-----------|------|
| **Team lead** | The main Claude Code session that creates the team, spawns teammates, and coordinates work |
| **Teammates** | Separate Claude Code instances that each work on assigned tasks |
| **Task list** | Shared list of work items that teammates claim and complete |
| **Mailbox** | Messaging system for communication between agents |

> **Requirement:** Claude Code v2.1.32 or later. Check with `claude --version`.

---

## Agent Teams vs Subagents

| | Subagents | Agent Teams |
|---|-----------|-------------|
| **Context** | Own context window; results return to the caller | Own context window; fully independent |
| **Communication** | Report results back to the main agent only | Teammates message each other directly |
| **Coordination** | Main agent manages all work | Shared task list with self-coordination |
| **Best for** | Focused tasks where only the result matters | Complex work requiring discussion and collaboration |
| **Token cost** | Lower: results summarized back to main context | Higher: each teammate is a separate Claude instance |

Use subagents when you need quick, focused workers that report back. Use agent teams when teammates need to share findings, challenge each other, and coordinate on their own.

---

## Enabling Agent Teams

Agent teams are experimental and disabled by default. Enable by setting the environment variable in your shell or via `settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

## Display Modes

| Mode | Setting Value | Behavior | Requirements |
|------|---------------|----------|--------------|
| **Auto** | `"auto"` (default) | Uses split panes if already inside a tmux session; in-process otherwise | None |
| **In-process** | `"in-process"` | All teammates run inside the main terminal. Use `Shift+Down` to cycle through teammates | Any terminal |
| **Split panes** | `"tmux"` | Each teammate gets its own pane. Auto-detects tmux vs iTerm2 | tmux or iTerm2 with `it2` CLI |

### Configuring Display Mode

In `settings.json`:

```json
{
  "teammateMode": "in-process"
}
```

Or per-session via CLI flag:

```bash
claude --teammate-mode in-process
```

### Split Pane Setup

- **tmux**: install through your system package manager. `tmux -CC` in iTerm2 is the suggested entrypoint on macOS.
- **iTerm2**: install the [`it2` CLI](https://github.com/mkusaka/it2), then enable the Python API in **iTerm2 > Settings > General > Magic > Enable Python API**.

> **Note:** Split-pane mode is not supported in VS Code integrated terminal, Windows Terminal, or Ghostty.

---

## Task Coordination

The shared task list coordinates work across the team. Tasks have three states: **pending**, **in progress**, and **completed**. Tasks can depend on other tasks — a pending task with unresolved dependencies cannot be claimed until those dependencies are completed.

### How Tasks Flow

1. The lead creates tasks and assigns them to teammates (or teammates self-claim)
2. Task claiming uses file locking to prevent race conditions when multiple teammates try to claim the same task simultaneously
3. When a teammate completes a task that others depend on, blocked tasks unblock automatically
4. The lead synthesizes findings after teammates finish

### Storage

| Data | Location |
|------|----------|
| Team config | `~/.claude/teams/{team-name}/config.json` |
| Task list | `~/.claude/tasks/{team-name}/` |

---

## Interacting with Teammates

### In-Process Mode

| Key | Action |
|-----|--------|
| `Shift+Down` | Cycle through teammates (wraps back to lead after last teammate) |
| `Enter` | View a teammate's session |
| `Escape` | Interrupt a teammate's current turn |
| `Ctrl+T` | Toggle the task list |

### Split-Pane Mode

Click into a teammate's pane to interact with their session directly. Each teammate has a full view of its own terminal.

### Messaging

- **message**: send a message to one specific teammate
- **broadcast**: send to all teammates simultaneously (use sparingly — costs scale with team size)

---

## Git Worktrees with Teams

For parallel branch work that avoids file conflicts entirely, combine agent teams with git worktrees using the `isolation` field on subagent definitions:

```yaml
isolation: "worktree"
```

When set, the teammate runs in a temporary git worktree. This gives each teammate its own working directory on a separate branch, eliminating merge conflicts during parallel work. The worktree is auto-cleaned if no changes are made.

For manual parallel sessions without automated team coordination, see the [Git worktrees workflow](https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees).

---

## Relevant Settings

| Setting / Variable | Type | Default | Description |
|--------------------|------|---------|-------------|
| `teammateMode` | string | `"auto"` | Display mode: `"auto"`, `"in-process"`, or `"tmux"` |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | env var | unset | Set to `"1"` to enable agent teams |

---

## Plan Approval for Teammates

For complex or risky tasks, require teammates to plan before implementing:

```text
Spawn an architect teammate to refactor the authentication module.
Require plan approval before they make any changes.
```

The teammate works in read-only plan mode until the lead approves. If rejected, the teammate revises and resubmits. The lead makes approval decisions autonomously — influence its judgment by giving criteria in your prompt (e.g., "only approve plans that include test coverage").

---

## Hooks for Quality Gates

| Hook Event | When It Runs | Exit Code 2 Behavior |
|------------|-------------|----------------------|
| `TeammateIdle` | When a teammate is about to go idle | Sends feedback and keeps the teammate working |
| `TaskCompleted` | When a task is being marked complete | Prevents completion and sends feedback |

---

## Best Practices

### Task Decomposition

- **Too small**: coordination overhead exceeds the benefit
- **Too large**: teammates work too long without check-ins, increasing risk of wasted effort
- **Just right**: self-contained units that produce a clear deliverable (a function, a test file, a review)
- Aim for **5-6 tasks per teammate** to keep everyone productive without excessive context switching

### Team Size

Start with **3-5 teammates** for most workflows. Token costs scale linearly with each teammate. Three focused teammates often outperform five scattered ones. Scale up only when the work genuinely benefits from simultaneous parallel exploration.

### Avoiding Merge Conflicts

- Break work so each teammate owns a **different set of files**
- Use `isolation: "worktree"` when teammates must work on overlapping areas
- Two teammates editing the same file leads to overwrites — structure tasks to prevent this

### When to Use Teams vs Sequential Agents

| Use Agent Teams | Use a Single Session / Subagents |
|-----------------|----------------------------------|
| Research and review across multiple dimensions | Sequential tasks with dependencies |
| New modules or features with clear boundaries | Same-file edits |
| Debugging with competing hypotheses | Work with many inter-step dependencies |
| Cross-layer coordination (frontend, backend, tests) | Routine tasks where token cost matters |

### Keeping Tasks Independent

- Give teammates enough context in the spawn prompt — they do not inherit the lead's conversation history
- Teammates load `CLAUDE.md`, MCP servers, and skills automatically, but need task-specific details explicitly
- Monitor and steer: check in on progress, redirect approaches that are not working
- Tell the lead to wait for teammates if it starts implementing tasks itself:
  ```text
  Wait for your teammates to complete their tasks before proceeding
  ```

### Start with Low-Risk Tasks

If new to agent teams, begin with tasks that have clear boundaries and do not require writing code: reviewing a PR, researching a library, or investigating a bug. These show the value of parallel exploration without the coordination challenges of parallel implementation.

---

## Permissions and Context

- Teammates start with the lead's permission settings. If the lead runs with `--dangerously-skip-permissions`, all teammates do too.
- Each teammate has its own context window. `CLAUDE.md`, MCP servers, and skills load normally. The lead's conversation history does not carry over.
- You can change individual teammate permissions after spawning, but cannot set per-teammate modes at spawn time.

---

## Limitations

- **No session resumption with in-process teammates**: `/resume` and `/rewind` do not restore in-process teammates
- **Task status can lag**: teammates sometimes fail to mark tasks as completed, blocking dependent tasks
- **One team per session**: clean up the current team before starting a new one
- **No nested teams**: teammates cannot spawn their own teams — only the lead can manage the team
- **Lead is fixed**: the session that creates the team is the lead for its lifetime
- **Permissions set at spawn**: all teammates start with the lead's permission mode
- **Split panes require tmux or iTerm2**: not supported in VS Code integrated terminal, Windows Terminal, or Ghostty

---

## Cleanup

Always use the lead to clean up:

```text
Clean up the team
```

The lead checks for active teammates and fails if any are still running — shut them down first. Teammates should not run cleanup because their team context may not resolve correctly.

If orphaned tmux sessions persist:

```bash
tmux ls
tmux kill-session -t <session-name>
```

---

## Sources

- [Orchestrate teams of Claude Code sessions — Claude Code Docs](https://code.claude.com/docs/en/agent-teams)
- [Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [Git worktrees workflow — Claude Code Docs](https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)
- [Claude Code Settings Documentation](https://code.claude.com/docs/en/settings)
