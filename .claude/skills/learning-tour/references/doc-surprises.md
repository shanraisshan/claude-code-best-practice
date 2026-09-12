# Why Fetch Docs Before Each Stop

This file explains why the Source Rules require fetching official docs rather than relying on training knowledge. It's context for contributors and for the model when reasoning about whether to apply the rule.

## The Problem

Claude's training knowledge about Claude Code features can lag the actual product by several months. A model that "knows" how checkpointing works may have learned from documentation that predates significant changes. This is especially true for:

- Feature counts and option names (these change in minor releases)
- Deprecated patterns that have been superseded
- Newly announced conventions that postdate training

## Concrete Examples

These are cases where fetching docs revealed the training-knowledge answer would have been wrong:

| Concept | Training-knowledge answer | What the docs actually say |
|---------|--------------------------|---------------------------|
| Checkpointing | "Rewind to a previous state" | 5 distinct rewind actions, including "Summarize from here" (targeted /compact that preserves early context) |
| Checkpointing scope | (not well-specified) | Bash side-effects (rm, mv, cp) are NOT tracked — only Claude's file-editing tools (Write, Edit, NotebookEdit) |
| Commands vs Skills | Commands are the primary extension point | "Custom commands have been merged into skills" — officially announced; commands remain as first-class menu entry points, but skills are the underlying mechanism |
| `context: fork` | Runs skill in isolated context | Warning: only valid for skills with explicit task instructions; reference-content skills return nothing useful |

## For Contributors

When writing a new demo file, run `/_learn` first and note any place where the official doc differs from what you expected. Add the discrepancy to the table above — it helps calibrate future model invocations.
