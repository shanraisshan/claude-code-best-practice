# Demo: Checkpointing

## Repo Artifact

No specific file to open — checkpointing is a runtime feature of the Claude Code session itself. The demo is interactive.

## Steps

1. Make a small, visible edit to any file (e.g., add a comment to `README.md`)
2. Press `Esc Esc` to open the checkpoint menu
3. Walk through all 5 rewind actions with the user:
   - **Restore previous checkpoint** — undoes the last Claude turn
   - **Fork from here** — creates a new conversation branch from this point
   - **Summarize from here** — targeted `/compact` that preserves early context intact (this one surprises people)
   - **Branch to new task** — starts a parallel track without losing current context
   - **Compare checkpoints** — shows a diff between two points in time
4. Undo the edit you made in step 1 (restore or manually revert)

## Expected "Why Does This Exist?" Question

**"What doesn't get tracked?"**

Answer: Only Claude's file-editing tools (Write, Edit, NotebookEdit) are tracked. Bash commands — `rm`, `mv`, `cp`, package installs, database migrations — are **not** tracked. If you run `rm -rf dist/` via Bash, checkpointing cannot rewind that. This is why the docs recommend keeping destructive Bash operations minimal and preferring Claude's file tools where possible.

## Mastery Follow-up

"If checkpointing only tracks file edits, not Bash side-effects, what kinds of tasks are risky to run without a manual git commit first?"

Good answers: database schema changes, package installs that modify `node_modules`, build artifacts written via shell scripts. The broader insight: checkpointing is a conversation-level undo, not a full system snapshot.
