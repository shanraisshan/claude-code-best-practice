# Git Worktrees Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar%2014%2C%202026-white?style=flat&labelColor=555)<br>

Git worktrees in Claude Code — isolated parallel workspaces for concurrent development without branch conflicts.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## What Are Git Worktrees

Git worktrees create separate working directories that each have their own files and branch, while sharing the same repository history and remote connections. This allows multiple Claude sessions to work in parallel without file changes in one session interfering with another.

| Concept | Description |
|---------|-------------|
| **Shared history** | All worktrees share the same `.git` directory, commits, and remote connections |
| **Separate branches** | Each worktree checks out its own branch independently |
| **Isolated files** | File changes in one worktree do not affect another |
| **No stashing needed** | Unlike switching branches, worktrees eliminate the need to stash or commit in-progress work |

---

## Using Worktrees in Claude Code (3 Ways)

| Method | Syntax | Context | Description |
|--------|--------|---------|-------------|
| CLI flag | `--worktree` / `-w` | Terminal startup | Starts Claude in an isolated worktree branched from the default remote branch |
| Subagent frontmatter | `isolation: worktree` | `.claude/agents/*.md` | Runs subagent in its own worktree, auto-cleaned if no changes |
| Agent tool parameter | `isolation: "worktree"` | Agent tool call | Spawns an agent in a dedicated worktree at runtime |

### CLI flag: `--worktree` / `-w`

Start Claude in an isolated worktree from the terminal. The value becomes both the directory name and the branch name:

```bash
# Named worktree — creates .claude/worktrees/feature-auth/ with branch worktree-feature-auth
claude --worktree feature-auth

# Another session in a separate worktree
claude -w bugfix-123

# Auto-generated name (e.g., "bright-running-fox")
claude --worktree
```

Worktrees are created at `<repo>/.claude/worktrees/<name>` and branch from the default remote branch. The worktree branch is named `worktree-<name>`.

You can also ask Claude to "work in a worktree" or "start a worktree" during a session, and it will create one automatically.

### Subagent frontmatter: `isolation: worktree`

Add `isolation: worktree` to a custom subagent definition in `.claude/agents/*.md`:

```yaml
---
name: feature-builder
description: Implements features in an isolated worktree
tools: Read, Write, Edit, Bash, Glob, Grep
isolation: worktree
---
```

Each subagent instance gets its own worktree that is automatically cleaned up when the subagent finishes without changes.

### Agent tool parameter

When spawning an agent programmatically, pass `isolation: "worktree"` to run it in a dedicated worktree:

```
Agent(subagent_type="general-purpose", description="...", prompt="...", isolation="worktree")
```

---

## Boris Cherny's 5 Ways to Use Worktrees

Boris Cherny ([@bcherny](https://x.com/bcherny/status/2025007393290272904)) outlined five patterns for using worktrees with Claude Code:

| # | Pattern | Description |
|---|---------|-------------|
| 1 | **CLI flag** | `claude -w` to start a session in an isolated worktree from the terminal |
| 2 | **In-session request** | Ask Claude to "work in a worktree" during an active session |
| 3 | **Subagent frontmatter** | `isolation: worktree` in `.claude/agents/*.md` for automatic worktree isolation |
| 4 | **Agent tool parameter** | Pass `isolation: "worktree"` when invoking the Agent tool |
| 5 | **Parallel agent teams** | Combine worktrees with agent teams so multiple agents each work in their own isolated copy of the codebase simultaneously |

---

## Cleanup Behavior

| Scenario | What happens |
|----------|-------------|
| **No changes made** | Worktree and its branch are removed automatically on exit |
| **Changes or commits exist** | Claude prompts you to keep or remove the worktree |
| **Keep** | Preserves the directory and branch so you can return later |
| **Remove** | Deletes the worktree directory and its branch, discarding all uncommitted changes and commits |
| **Subagent worktree** | Auto-cleaned when the subagent finishes without changes; worktree path and branch returned if changes were made |

To clean up worktrees outside of a Claude session, use standard Git commands:

```bash
git worktree list
git worktree remove <path>
```

Add `.claude/worktrees/` to your `.gitignore` to prevent worktree contents from appearing as untracked files in your main repository.

---

## Combining with Agent Teams

Worktrees and agent teams are complementary. Each agent in a team can operate in its own worktree, enabling true parallel development across multiple features or bug fixes.

| Setup | Description |
|-------|-------------|
| **Single agent, single worktree** | One Claude session in an isolated worktree — good for focused feature work |
| **Multiple agents, each with a worktree** | Several subagents each in their own worktree — good for parallelizing independent tasks |
| **Agent team + worktrees** | Full agent team coordination with shared task queues and messaging, each member in an isolated worktree |

Example: a team of three agents each implementing a separate module, all running concurrently without file conflicts, then merging their branches back when done.

---

## Best Practices

| Practice | Why |
|----------|-----|
| **One task per worktree** | Keep worktrees focused on a single feature or bug fix to simplify merging and reduce conflicts |
| **Use named worktrees** | `claude -w auth-refactor` is easier to find later than an auto-generated name |
| **Add `.claude/worktrees/` to `.gitignore`** | Prevents worktree contents from appearing as untracked files in your main repo |
| **Initialize dependencies per worktree** | Each worktree needs its own `npm install`, virtual environment setup, or equivalent |
| **Merge promptly** | Merge worktree branches back to the main branch promptly to avoid long-lived divergence |
| **Prefer worktrees over branch switching** | Worktrees avoid the stash/unstash cycle and let you keep multiple features open simultaneously |
| **Use regular branches for quick edits** | If the change is small and fast, a worktree adds unnecessary overhead |
| **Clean up after merging** | Run `git worktree remove` after merging to keep your workspace tidy |
| **Non-git VCS** | Configure `WorktreeCreate` and `WorktreeRemove` hooks for SVN, Perforce, or Mercurial |

---

## Sources

- [Claude Code Common Workflows — Git Worktrees](https://code.claude.com/docs/en/common-workflows)
- [Claude Code Sub-agents — Isolation](https://code.claude.com/docs/en/sub-agents)
- [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Git Worktree Documentation](https://git-scm.com/docs/git-worktree)
- [Boris Cherny — 5 Ways to Use Worktrees](https://x.com/bcherny/status/2025007393290272904)
