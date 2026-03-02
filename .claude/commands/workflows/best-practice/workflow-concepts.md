---
description: Update the README CONCEPTS section with the latest Claude Code features and concepts
argument-hint: [number of changelog versions to check, default 10]
---

# Workflow Changelog — README Concepts

You are a coordinator for the claude-code-best-practice project. Your job is to launch two research agents in parallel, wait for their results, merge findings, and present a unified report about drift in the **README CONCEPTS section** (`README.md`).

**Versions to check:** `$ARGUMENTS` (default: 10 if empty or not a number)

This is a **read-then-report** workflow. Launch agents, merge results, and produce a report. Only take action if the user approves.

---

## Phase 0: Launch Both Agents in Parallel

**Immediately** spawn both agents using the Task tool **in the same message** (parallel launch):

### Agent 1: workflow-concepts-agent

Spawn using `subagent_type: "workflow-concepts-agent"`. Give it this prompt:

> Research the claude-code-best-practice project for README CONCEPTS section drift. Check the last $ARGUMENTS versions (default: 10).
>
> Fetch these 3 external sources:
> 1. Claude Code Docs Index: https://code.claude.com/docs/en
> 2. Claude Code Changelog: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
> 3. Claude Code Features Overview: https://code.claude.com/docs/en/overview
>
> Then read the local README.md (specifically the CONCEPTS table), CLAUDE.md, and `reports/claude-global-vs-project-settings.md`. Analyze differences between what the official docs list as Claude Code concepts/features and what our README CONCEPTS table documents. Return a structured findings report covering missing concepts, changed concepts, deprecated concepts, URL accuracy, description accuracy, and badge accuracy.

### Agent 2: claude-code-guide

Spawn using `subagent_type: "claude-code-guide"`. Give it this prompt:

> Research the latest Claude Code features and concepts. I need you to find the COMPLETE list of all Claude Code concepts/features that should be documented. For each, provide:
> 1. Official feature name
> 2. Official docs URL
> 3. File system location (e.g., `.claude/commands/`, `~/.claude/teams/`)
> 4. Brief description (one line)
> 5. When it was introduced (version/date if known)
>
> Specifically check for these potentially missing concepts:
> - **Worktrees** — git worktree isolation for parallel development
> - **Agent Teams** — multi-agent coordination
> - **Tasks** — persistent task lists across sessions
> - **Auto Memory** — Claude's self-written project learnings
> - **Keybindings** — custom keyboard shortcuts
> - **Remote Connections** — SSH, Docker, cloud development
> - **IDE Integration** — VS Code, JetBrains extensions
> - **Model Configuration** — model selection and routing
> - **GitHub Integration** — PR reviews, issue triage
> - Any other concept from recent Claude Code versions
>
> Be thorough — search the web, fetch docs, and provide concrete version numbers and details for everything you find.

Both agents run independently and will return their findings.

---

## Phase 0.5: Read Verification Checklist

**While agents are running**, read `changelog/best-practice/concepts/verification-checklist.md` if it exists. This file contains accumulated verification rules. If it does not exist yet, skip this step — it will be created in Phase 2.

---

## Phase 1: Read Previous Changelog Entries

**Before merging findings**, read the file `changelog/best-practice/concepts/changelog.md` if it exists to get previous changelog entries. Each entry is separated by `---`. Parse the priority actions from those previous entries so you can compare them against the current findings. This lets you identify:
- **Recurring items** — issues that appeared before and are still unresolved
- **Newly resolved items** — issues from previous runs that are now fixed
- **New items** — issues that appear for the first time in this run

If the file doesn't exist yet, all items are `NEW`.

---

## Phase 2: Merge Findings & Generate Report

**Wait for both agents to complete.** Once you have:
- **workflow-concepts-agent findings** — detailed analysis with local file reads, external doc fetches, and drift detection
- **claude-code-guide findings** — independent research on latest Claude Code features and concepts

Cross-reference the two. The dedicated agent provides CONCEPTS-specific drift analysis, while the claude-code-guide agent may surface things it missed (e.g. very recent changes, undocumented features, or context from web searches). Flag any contradictions between the two for the user to resolve.

**Execute the verification checklist (if it exists):** For every rule in `changelog/best-practice/concepts/verification-checklist.md`, perform the check. Include a **Verification Log** section in the report.

**Update the checklist if needed:** If a finding reveals a new type of drift that no existing checklist rule covers, append a new rule to `changelog/best-practice/concepts/verification-checklist.md`. If the file doesn't exist, create it. The rule must include: category, what to check, depth level, what source to compare against, date added, and the origin.

Also compare the current findings against the previous changelog entries (from Phase 1). For each priority action, mark it as:
- `NEW` — first time this issue appears
- `RECURRING` — appeared in a previous run and is still unresolved (include which run date it first appeared)
- `RESOLVED` — appeared in a previous run but is now fixed (include resolution date)

Produce a structured report with these sections:

1. **Missing Concepts** — Features/concepts in official docs but missing from CONCEPTS table, with:
   - Official name and docs URL
   - Recommended Location column value
   - Recommended Description column value
   - Exact markdown table row ready to paste
   - Version introduced (if known)
2. **Changed Concepts** — Concepts whose name, URL, location, or description has changed
3. **Deprecated/Removed Concepts** — Concepts in CONCEPTS table but no longer in official docs
4. **URL Accuracy** — Per-concept URL verification
5. **Description Accuracy** — Per-concept description/location verification
6. **Badge Accuracy** — Badge link verification and missing badge recommendations
7. **claude-code-guide Agent Findings** — Unique insights from the agent that weren't captured by the dedicated agent. Only include findings that add new information. Flag contradictions.

End with a prioritized **Action Items** summary table:

```
Priority Actions:
#  | Type                | Action                                     | Status
1  | Missing Concept     | Add <concept> row to CONCEPTS table         | NEW
2  | Changed URL         | Update <concept> docs link                  | NEW
3  | Changed Description | Update <concept> description                | RECURRING (first seen: <date>)
4  | Deprecated Concept  | Remove <concept> row from CONCEPTS table    | NEW
5  | Broken Badge        | Fix badge link for <concept>                | NEW
```

Also include a **Resolved Since Last Run** section listing any items from the previous run that are no longer issues.

---

## Phase 2.5: Append Summary to Changelog

**This phase is MANDATORY — always execute it before presenting the report to the user.**

Read the existing `changelog/best-practice/concepts/changelog.md` file, then **append** (do NOT overwrite) a new entry at the end. If the file doesn't exist, create it with a Status Legend table then the first entry. The entry format must be exactly:

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
- Each entry is separated by `---`
- **Only include items with HIGH, MEDIUM, or LOW priority** — omit NONE priority items

---

## Phase 2.6: Update Last Updated Badge

**This phase is MANDATORY — always execute it immediately after Phase 2.5, before presenting the report.**

Update the "Last Updated" badge at the top of `README.md` (line 3). Run `TZ=Asia/Karachi date "+%b %d, %Y %-I:%M %p PKT"` to get the time, URL-encode it (spaces to `%20`, commas to `%2C`), and replace the date portion in the badge.

**Do NOT log badge updates as action items in the changelog or report.**

---

## Phase 2.7: Validate All CONCEPTS URLs

**This phase is MANDATORY — always execute it after Phase 2.6, before presenting the report.**

For each concept in the CONCEPTS table:

1. **External docs URLs** (e.g., `https://code.claude.com/docs/en/skills`): Fetch each URL using WebFetch and verify it returns a valid page. Flag any dead or moved links.
2. **Local badge links** (e.g., `best-practice/claude-commands.md`): Verify the file exists using the Read tool. Flag any broken links.
3. **Implementation badge links** (e.g., `.claude/commands/`): Verify the path exists.

Include a **URL Validation Log** in the report:

```
URL Validation Log:
#  | Concept     | URL Type  | URL                                           | Status | Notes
1  | Commands    | External  | https://code.claude.com/docs/en/skills         | OK     |
2  | Commands    | Badge     | best-practice/claude-commands.md               | OK     |
3  | Sub-Agents  | External  | https://code.claude.com/docs/en/sub-agents     | OK     |
...
```

**If any URLs are broken**, add them as HIGH priority action items.

---

## Phase 3: Offer to Take Action

After presenting the report (and confirming changelog was updated), ask the user:

1. **Execute all actions** — Add missing concepts, update changed ones, remove deprecated ones
2. **Execute specific actions** — User picks which numbers to execute
3. **Just save the report** — No changes

When executing:
- **Missing concepts**: Add a new row to the CONCEPTS table in `README.md` following the existing format:
  ```
  | [**Name**](docs-url) | `location` | Description |
  ```
  Add badges (best-practice, implemented) only if corresponding files exist.
- **Changed concepts**: Update the specific column(s) that changed
- **Deprecated concepts**: Confirm with user before removing rows
- **Broken URLs**: Fix the URL to the current valid one
- **Badge fixes**: Update badge links to correct file paths
- Maintain alphabetical or logical ordering consistent with the existing table
- After all actions, re-verify the CONCEPTS table for consistency

---

## Critical Rules

1. **Launch BOTH agents in parallel** in a single message — never sequentially
2. **Wait for both agents** before generating the report
3. **Never guess** versions, URLs, or dates — use data from the agents
4. **Missing concepts are HIGH PRIORITY** — the CONCEPTS table is the first thing developers see
5. **Verify every URL** — broken links degrade trust in the entire project
6. **Don't auto-execute** — always present the report first
7. **ALWAYS append to changelog** — Phase 2.5 is mandatory. Never skip it. Never overwrite previous entries.
8. **Compare with previous runs** — read previous entries from the changelog and mark each action item as NEW, RECURRING, or RESOLVED.
9. **Execute the verification checklist if it exists** — read the verification-checklist.md and execute every rule. Create the file if it doesn't exist and there are findings that warrant persistent rules.
10. **ALWAYS update the Last Updated badge** — Phase 2.6 is mandatory.
11. **ALWAYS validate all CONCEPTS URLs** — Phase 2.7 is mandatory. Broken URLs are HIGH priority.
12. **Provide ready-to-paste rows** — for missing concepts, include the exact markdown table row so execution is copy-paste.
13. **Respect the existing table format** — match the column structure, badge pattern, and linking style of existing rows.
