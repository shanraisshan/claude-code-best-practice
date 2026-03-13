---
description: Track Claude Code commands report changes and find what needs updating
argument-hint: [number of versions to check, default 10]
---

# Workflow Changelog — Commands Report

You are a coordinator for the claude-code-best-practice project. Your job is to launch a research agent, wait for its results, and present a report about drift in the **Commands Reference** report (`best-practice/claude-commands.md`).

This workflow checks for exactly **two types of drift**:
1. **Frontmatter fields** — any field added or removed in the official docs
2. **Official commands** — any built-in slash command added or removed

**Versions to check:** `$ARGUMENTS` (default: 10 if empty or not a number)

This is a **read-then-report** workflow. Launch the agent, merge findings, and produce a report. Only take action if the user approves.

---

## Phase 1: Launch Research Agent

Spawn the `workflow-claude-commands-agent` with this prompt:

> Research the claude-code-best-practice project for commands report drift. Check the last $ARGUMENTS versions (default: 10).
>
> Fetch these 2 external sources:
> 1. Slash Commands Reference: https://code.claude.com/docs/en/slash-commands
> 2. Changelog: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
>
> Then read the local report (`best-practice/claude-commands.md`).
>
> Check for exactly two things:
> 1. **Frontmatter fields**: Compare the official docs' supported command frontmatter fields against the report's Frontmatter Fields table. Flag any fields that were added or removed.
> 2. **Official commands**: Compare the official docs' built-in slash commands list against the report's official commands table. Flag any commands that were added or removed. Also check if any command's tag or description has changed.

---

## Phase 2: Read Previous Changelog Entries

**While the agent is running**, read `changelog/best-practice/claude-commands/changelog.md` to get the last 25 entries. Parse the priority actions to identify:
- **Recurring items** — issues that appeared before and are still unresolved
- **New items** — issues appearing for the first time
- **Resolved items** — previously flagged issues now fixed

---

## Phase 3: Generate Report

**Wait for the agent to complete.** Produce a report with these sections:

1. **Frontmatter Field Changes** — Fields added or removed in official docs vs our report
2. **Official Command Changes** — Built-in slash commands added or removed vs our table

End with a prioritized **Action Items** summary table. Each item must include a `Status` column showing `NEW`, `RECURRING (first seen: <date>)`, or `RESOLVED`:

```
Priority Actions:
#  | Type              | Action                                | Status
1  | New Field         | Add <field> to frontmatter table      | NEW
2  | Removed Field     | Remove <field> from table             | RECURRING (first seen: <date>)
3  | New Command       | Add <command> to official table        | NEW
4  | Removed Command   | Remove <command> from table           | NEW
5  | Changed Tag       | Update <command> tag from X to Y      | NEW
```

Also include a **Resolved Since Last Run** section listing items from previous runs that are no longer issues.

---

## Phase 3.5: Append Summary to Changelog

**This phase is MANDATORY — always execute it before presenting the report to the user.**

Read the existing `changelog/best-practice/claude-commands/changelog.md` file, then **append** (do NOT overwrite) a new entry at the end. The entry format must be exactly:

```markdown
---

## [<YYYY-MM-DD HH:MM AM/PM PKT>] Claude Code v<VERSION>

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH/MED/LOW | <type> | <action description> | <status> |
| ... | ... | ... | ... | ... |
```

**Status format — MUST use one of these three formats:**
- `COMPLETE (reason)` — action was taken and resolved successfully
- `INVALID (reason)` — finding was incorrect, not applicable, or intentional
- `ON HOLD (reason)` — action deferred, waiting on external dependency or user decision

The `(reason)` is mandatory and must briefly explain what was done or why.

**Rules for appending:**
- Always append — never overwrite or replace previous entries
- The date and time is when the command is executed in Pakistan Standard Time (PKT, UTC+5); get it by running `TZ=Asia/Karachi date "+%Y-%m-%d %I:%M %p PKT"`. The version comes from agent findings
- If `changelog/best-practice/claude-commands/changelog.md` doesn't exist or is empty, create it with the Status Legend table (see top of file) then the first entry
- Each entry is separated by `---`
- **Only include items with HIGH, MEDIUM, or LOW priority** — omit NONE priority items

---

## Phase 3.6: Update Last Updated Badge

**This phase is MANDATORY — always execute it immediately after Phase 3.5, before presenting the report.**

Update the "Last Updated" badge at the top of `best-practice/claude-commands.md`. Run `TZ=Asia/Karachi date "+%b %d, %Y %-I:%M %p PKT"` to get the time, URL-encode it (spaces to `%20`, commas to `%2C`), and replace the date portion in the badge. Also update the Claude Code version in the badge if it has changed.

**Do NOT log badge updates as action items in the changelog or report.** Badge syncing is a routine part of every run, not a finding.

---

## Phase 4: Offer to Take Action

After presenting the report (and confirming both changelog and badge were updated), ask the user:

1. **Execute all actions** — Apply all changes
2. **Execute specific actions** — User picks which numbers to execute
3. **Just save the report** — No changes

When executing:
- **New fields**: Add to the Frontmatter Fields table with correct type, required status, and description from the official docs
- **Removed fields**: Confirm with user before removing
- **New commands**: Add to the official commands table with correct #, command, tag, and description. Insert in the correct tag group (table is sorted by tag)
- **Removed commands**: Confirm with user before removing
- **Changed tags**: Update the command's tag and re-sort if needed
- After any additions or removals, update the count in the `## Frontmatter Fields (N)` and `## ![Official](...) **(N)**` headings

---

## Critical Rules

1. **Never guess** versions or dates — use data from the agent
2. **Cross-reference field counts** — report field count must match official docs
3. **Cross-reference command counts** — report command count must match official docs
4. **Don't auto-execute** — always present the report first
5. **ALWAYS append to changelog** — Phase 3.5 is mandatory. Never skip it. Never overwrite previous entries.
6. **ALWAYS update the Last Updated badge** — Phase 3.6 is mandatory. Never skip it.
7. **Compare with previous runs** — read the last 25 entries from the changelog and mark each action item as NEW, RECURRING, or RESOLVED.
8. **Maintain tag sort order** — the official commands table is sorted by tag (alphabetical), then by command name within each tag group. Preserve this ordering when adding or removing commands.
