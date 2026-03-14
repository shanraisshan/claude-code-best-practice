# Checkpointing Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar%2014%2C%202026-white?style=flat&labelColor=555)<br>

Automatic git-based tracking of every file edit Claude makes — rewind, restore, and summarize session state.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 1. What is Checkpointing

Checkpointing is Claude Code's built-in safety net that automatically captures the state of your code before each edit. Every time Claude uses a file editing tool (Edit, Write, NotebookEdit), a shadow checkpoint is created — allowing you to rewind to any previous state if something goes wrong.

Key characteristics:

- **Invisible to your git history** — checkpoints are shadow commits that do not appear in `git log` or pollute your branch
- **Automatic** — no manual action required; every user prompt creates a new checkpoint
- **Persistent across sessions** — checkpoints survive session restarts and are available when you resume a conversation
- **Auto-cleaned** — removed along with sessions after 30 days (configurable via `cleanupPeriodDays`)

---

## 2. How Checkpoints Work

| Aspect | Detail |
|--------|--------|
| **Trigger** | Every user prompt creates a new checkpoint |
| **Scope** | Only tracks files modified via Claude's editing tools (Edit, Write, NotebookEdit) |
| **Storage** | Shadow git commits — not visible in your actual git history |
| **Persistence** | Survives session restarts; available in resumed conversations |
| **Cleanup** | Automatically deleted with sessions after 30 days |

### What is NOT Tracked

| Not Tracked | Example |
|-------------|---------|
| Bash command changes | `rm file.txt`, `mv old.txt new.txt`, `cp source.txt dest.txt` |
| External edits | Manual changes you make outside Claude Code |
| Concurrent sessions | Edits from other Claude Code sessions (unless modifying the same files) |

---

## 3. Rewind Methods

| Method | How to Invoke | Behavior |
|--------|---------------|----------|
| `Esc` `Esc` | Press Escape twice quickly | Opens the rewind menu — same as `/rewind` |
| `/rewind` | Type the slash command | Opens a scrollable list of every prompt from the session |

Both methods open the same interactive picker. Select the checkpoint you want to act on, then choose an action:

| Action | Code Reverted | Conversation Reverted | Description |
|--------|:-------------:|:---------------------:|-------------|
| **Restore code and conversation** | Yes | Yes | Full rewind — revert both files and conversation to that point |
| **Restore conversation** | No | Yes | Rewind conversation while keeping current files on disk |
| **Restore code** | Yes | No | Revert files while keeping the full conversation history |
| **Summarize from here** | No | Compressed | Replace messages from that point forward with a compact summary |
| **Never mind** | No | No | Return to the message list without changes |

After restoring or summarizing, the original prompt from the selected message is restored into the input field so you can re-send or edit it.

---

## 4. When to Use Rewind

| Scenario | Why Rewind Helps |
|----------|------------------|
| Claude goes off-track | Wrong files edited, incorrect logic applied — rewind to before the wrong turn |
| Wrong architectural approach | Claude chose the wrong pattern (e.g., inheritance vs. composition) — rewind and re-prompt with clearer direction |
| Exploring alternatives | Try one approach, rewind, try another — compare results without manual cleanup |
| Introduced bugs | Changes broke functionality — rewind to a known-good state faster than debugging |
| Context pollution | A long debugging thread filled the context with noise — rewind and start fresh |

---

## 5. Rewind vs. Manual Undo

A common instinct when Claude makes a mistake is to tell it to fix the problem within the same conversation. This is usually worse than rewinding.

| Approach | Pros | Cons |
|----------|------|------|
| **Rewind** | Clean context, fresh start, no accumulated errors | Loses conversation after rewind point |
| **Manual "fix it" in same context** | Preserves conversation continuity | Polluted context — Claude carries forward its wrong assumptions; may compound errors; wastes context window on debugging noise |

**Rule of thumb:** If Claude's approach was fundamentally wrong (not just a small typo), rewind. Trying to fix a wrong approach in the same context often leads to more mistakes because Claude's reasoning is now anchored to the incorrect path.

---

## 6. Targeted Summarization

The "Summarize from here" action in the rewind menu enables **targeted context compaction** — a more precise alternative to `/compact`.

| Feature | `/compact` | Summarize from here |
|---------|-----------|---------------------|
| **Scope** | Entire conversation | From selected checkpoint forward |
| **Early context** | Summarized | Preserved in full detail |
| **Files on disk** | Unchanged | Unchanged |
| **Original messages** | Replaced with summary | Preserved in session transcript (Claude can reference details if needed) |
| **Custom focus** | Optional prompt to guide summary | Optional instructions to guide what the summary focuses on |

### When to Use Targeted Summarization

- A verbose debugging session consumed significant context, but your initial setup instructions need to stay intact
- You want to keep early architectural decisions in full detail while compressing implementation chatter
- You are approaching context limits but only the middle portion of the conversation is expendable

> **Note:** Summarize keeps you in the same session and compresses context. If you want to branch off and try a different approach while preserving the original session intact, use fork instead (`claude --continue --fork-session`).

---

## 7. Best Practices

| Practice | Why |
|----------|-----|
| **Rewind early rather than trying to fix** | The longer you let Claude continue down a wrong path, the more context is wasted and the harder it is to recover |
| **Use rewind for wrong architectural decisions** | Telling Claude to "undo what you just did" rarely produces clean results — rewind gives a genuinely clean slate |
| **Combine rewind with `/compact`** | After rewinding, if the remaining conversation is long, run `/compact` to free additional context space |
| **Use targeted summarization for long sessions** | When only part of the conversation is noisy, summarize from that point rather than compacting everything |
| **Re-prompt with more specificity after rewind** | Rewinding to the same prompt and re-sending it will likely produce the same result — edit the prompt to give Claude better direction |
| **Remember bash changes are not tracked** | If Claude ran destructive bash commands (`rm`, `mv`), rewind cannot undo those — use git to recover if needed |
| **Think of checkpoints as local undo, not version control** | Continue using git for commits, branches, and long-term history — checkpoints complement but do not replace proper version control |

---

## Sources

- [Claude Code Checkpointing Documentation](https://code.claude.com/docs/en/checkpointing)
- [Claude Code Interactive Mode — Keyboard Shortcuts](https://code.claude.com/docs/en/interactive-mode)
- [Claude Code Built-in Commands](https://code.claude.com/docs/en/commands)
