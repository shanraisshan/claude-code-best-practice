---
description: Track Claude Code settings report changes and find what needs updating
argument-hint: [number of versions to check, default 10]
---

# Workflow Changelog — Settings Report

You are a coordinator for the claude-code-best-practice project. Your job is to launch two research agents in parallel, wait for their results, merge findings, and present a unified report about drift in the **Settings Reference** report (`best-practice/claude-settings.md`).

**Versions to check:** `$ARGUMENTS` (default: 10 if empty or not a number)

This is a **read-then-report** workflow. Launch agents, merge results, and produce a report. Only take action if the user approves.

---

## Phase 0: Launch Both Agents in Parallel

**Immediately** spawn both agents using the Task tool **in the same message** (parallel launch):

### Agent 1: workflow-claude-settings-agent

Spawn using `subagent_type: "workflow-claude-settings-agent"`. Give it this prompt:

> Research the claude-code-best-practice project for settings report drift. Check the last $ARGUMENTS versions (default: 10).
>
> Fetch these 3 external sources:
> 1. Settings Documentation: https://code.claude.com/docs/en/settings
> 2. CLI Reference: https://code.claude.com/docs/en/cli-reference
> 3. Changelog: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
>
> Then read the local report file (`best-practice/claude-settings.md`) and the CLAUDE.md file. Analyze differences between what the official docs say about settings keys, permission syntax, hook events, MCP configuration, sandbox options, plugin settings, model aliases, display settings, and environment variables versus what our report documents. Return a structured findings report covering missing settings, changed types/defaults, new settings additions, deprecated settings, permission syntax changes, hook event changes, MCP setting changes, sandbox setting changes, environment variable completeness, example accuracy, settings hierarchy accuracy, and sources validity.

### Agent 2: claude-code-guide

Spawn using `subagent_type: "claude-code-guide"`. Give it this prompt:

> Research the latest Claude Code settings system. I need you to find:
> 1. The complete list of all currently supported settings.json keys with their types, defaults, and descriptions
> 2. Any new settings keys introduced in recent Claude Code versions
> 3. Changes to existing settings behavior (e.g. new permission modes, new hook events, new sandbox options)
> 4. Changes to the settings hierarchy (new priority levels, new file locations)
> 5. Changes to permission syntax (new tool patterns, new wildcard behavior)
> 6. New hook events or changes to hook configuration structure
> 7. Changes to MCP server configuration (new matching fields, new settings)
> 8. Changes to sandbox settings (new network options, new commands)
> 9. Changes to plugin configuration (new fields, new marketplace options)
> 10. Changes to environment variables (new vars, deprecated vars, changed behavior)
> 11. Changes to model aliases or model configuration
> 12. Changes to display/UX settings (status line, spinners, progress bars)
> 13. Any deprecations or removals of settings keys
>
> Be thorough — search the web, fetch docs, and provide concrete version numbers and details for everything you find.

Both agents run independently and will return their findings.

---

## Phase 0.5: Read Verification Checklist

**While agents are running**, read `changelog/best-practice/claude-settings/verification-checklist.md`. This file contains accumulated verification rules — each rule specifies what to check, at what depth, and against which source. Every rule MUST be executed during Phase 2. The checklist is the project's regression test suite for drift detection.

---

## Phase 1: Read Previous Changelog Entries

**Before merging findings**, read the file `changelog/best-practice/claude-settings/changelog.md` to get the last 25 changelog entries. Each entry is separated by `---`. Parse the priority actions from those previous entries so you can compare them against the current findings. This lets you identify:
- **Recurring items** — issues that appeared before and are still unresolved
- **Newly resolved items** — issues from previous runs that are now fixed
- **New items** — issues that appear for the first time in this run

---

## Phase 2: Merge Findings & Generate Report

**Wait for both agents to complete.** Once you have:
- **workflow-claude-settings-agent findings** — detailed report analysis with local file reads, external doc fetches, and drift detection
- **claude-code-guide findings** — independent research on latest Claude Code settings features and changes

Cross-reference the two. The dedicated agent provides report-specific drift analysis, while the claude-code-guide agent may surface things it missed (e.g. very recent changes, undocumented features, or context from web searches). Flag any contradictions between the two for the user to resolve.

**Execute the verification checklist:** For every rule in `changelog/best-practice/claude-settings/verification-checklist.md`, perform the check at the specified depth using the agent findings as source data. Include a **Verification Log** section in the report showing each rule's result:

```
Verification Log:
Rule # | Category              | Depth         | Result | Notes
1      | Settings Keys         | field-level   | PASS   | All keys match
2      | Permission Syntax     | content-match | FAIL   | New tool pattern added
...
```

**Update the checklist if needed:** If a finding reveals a new type of drift that no existing checklist rule covers (or covers at insufficient depth), append a new rule to `changelog/best-practice/claude-settings/verification-checklist.md`. The rule must include: category, what to check, depth level, what source to compare against, date added, and the origin (what error prompted this rule). Do NOT add rules for one-off issues that won't recur.

Also compare the current findings against the previous changelog entries (from Phase 1). For each priority action, mark it as:
- `NEW` — first time this issue appears
- `RECURRING` — appeared in a previous run and is still unresolved (include which run date it first appeared)
- `RESOLVED` — appeared in a previous run but is now fixed (include resolution date)

Produce a structured report with these sections:

1. **New Settings Keys** — Keys in official docs but missing from report, with version introduced
2. **Changed Setting Behavior** — Settings whose type, default, or description has changed
3. **Deprecated/Removed Settings** — Settings in report but no longer in official docs
4. **Permission Syntax Changes** — New tool patterns, wildcard behavior, or permission mode changes
5. **MCP Setting Changes** — New MCP configuration keys, matching behavior, or server settings
6. **Sandbox Setting Changes** — New sandbox options, network settings, or command exclusions
7. **Plugin Setting Changes** — New plugin configuration keys or marketplace options
8. **Model Configuration Changes** — New model aliases, effort levels, or model environment variables
9. **Display & UX Changes** — New status line fields, spinner options, or display settings
10. **Environment Variable Completeness** — Vars in official docs but missing from report, or vars in report no longer documented
11. **Settings Hierarchy Accuracy** — Verify priority levels, file locations, and override behavior
12. **Example Accuracy** — Whether the Quick Reference complete example reflects current settings
13. **Sources Accuracy** — Verify all source links are valid and point to correct documentation
14. **claude-code-guide Agent Findings** — Unique insights from the agent that weren't captured by the dedicated agent. Only include findings that add new information. If there are contradictions between the two agents, flag them for the user to resolve. Do NOT list "confirmed agreements".

> **Note:** Hook-related analysis (events, properties, matchers, exit codes, HTTP hooks, hook env vars) is **excluded** from this workflow. Hooks are maintained in the [claude-code-voice-hooks](https://github.com/shanraisshan/claude-code-voice-hooks) repo.

End with a prioritized **Action Items** summary table. Each item must include a `Status` column showing `NEW`, `RECURRING (first seen: <date>)`, or `RESOLVED`:

```
Priority Actions:
#  | Type                  | Action                                    | Status
1  | New Setting           | Add <key> to <section> table               | NEW
2  | Changed Behavior      | Update <key> description                   | NEW
3  | Deprecated Setting    | Remove <key> from table                    | RECURRING (first seen: 2026-03-05)
4  | Permission Syntax     | Add new tool pattern syntax                | NEW
5  | Env Variable          | Add <var> to environment variables table   | NEW
7  | Example Update        | Update Quick Reference example             | NEW
```

Also include a **Resolved Since Last Run** section listing any items from the previous run that are no longer issues.

---

## Phase 2.5: Append Summary to Changelog

**This phase is MANDATORY — always execute it before presenting the report to the user.**

Read the existing `changelog/best-practice/claude-settings/changelog.md` file, then **append** (do NOT overwrite) a new entry at the end. The entry format must be exactly:

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
- If `changelog/best-practice/claude-settings/changelog.md` doesn't exist or is empty, create it with the Status Legend table (see top of file) then the first entry
- Each entry is separated by `---`
- **Only include items with HIGH, MEDIUM, or LOW priority** — omit NONE priority items (things that need no action)

---

## Phase 2.6: Update Last Updated Badge

**This phase is MANDATORY — always execute it immediately after Phase 2.5, before presenting the report.**

Update the "Last Updated" badge at the top of `best-practice/claude-settings.md`. Run `TZ=Asia/Karachi date "+%b %d, %Y %-I:%M %p PKT"` to get the time, URL-encode it (spaces to `%20`, commas to `%2C`), and replace the date portion in the badge. Also update the Claude Code version in the badge if it has changed.

**Do NOT log badge updates as action items in the changelog or report.** Badge syncing is a routine part of every run, not a finding.

---

## Phase 2.7: Validate All Hyperlinks

**This phase is MANDATORY — always execute it after Phase 2.6, before presenting the report.**

Scan `best-practice/claude-settings.md` for every hyperlink (both markdown `[text](url)` and inline URLs). For each link:

1. **Local file links** (relative paths): Verify the file exists at the resolved path using the Read tool. Flag any broken links.
2. **External URLs** (e.g., `https://code.claude.com/docs/en/settings`): Fetch each URL using WebFetch and verify it returns a valid page (not a 404 or redirect to an error page). Flag any dead or moved links.
3. **Anchor links** (e.g., `#section-name`): Verify the target heading exists within the same file.

Include a **Hyperlink Validation Log** in the report:

```
Hyperlink Validation Log:
#  | Type     | Link                                          | Status | Notes
1  | Local    | ../                                            | OK     |
2  | External | https://code.claude.com/docs/en/settings       | OK     |
3  | External | https://www.schemastore.org/claude-code-settings.json | BROKEN | 404
...
```

**If any links are broken**, add them as HIGH priority action items in the report. Broken links degrade the report's usefulness and must be fixed before any other changes.

---

## Phase 3: Offer to Take Action

After presenting the report (and confirming both changelog and badge were updated), ask the user:

1. **Execute all actions** — Handle everything (add missing settings, update descriptions, fix examples)
2. **Execute specific actions** — User picks which numbers to execute
3. **Just save the report** — No changes

When executing:
- **New settings**: Add to the appropriate section table with correct type, default, and description
- **Changed behavior**: Update the setting description or default in the table
- **Deprecated settings**: Confirm with user before removing
- **Permission syntax changes**: Update the Permission Syntax table with new patterns
- **MCP setting changes**: Update the MCP Settings section
- **Sandbox setting changes**: Update the Sandbox Settings section
- **Plugin setting changes**: Update the Plugin Settings section
- **Model changes**: Update the Model Configuration section
- **Display changes**: Update the Display & UX section
- **Environment variable changes**: Add/update/remove vars in the Environment Variables section
- **Settings hierarchy changes**: Update the Settings Hierarchy table
- **Example updates**: Update the Quick Reference complete example to reflect current settings
- **Broken links**: Fix or replace broken URLs
- After all actions, re-run verification to confirm consistency

---

## Critical Rules

1. **Launch BOTH agents in parallel** in a single message — never sequentially
2. **Wait for both agents** before generating the report
3. **Never guess** versions or dates — use data from the agents
4. **New settings keys are HIGH PRIORITY** — they require table and example updates
5. **Cross-reference setting counts** — the number of settings in each table must match official docs
6. **Don't auto-execute** — always present the report first
7. **ALWAYS append to changelog** — Phase 2.5 is mandatory. Never skip it. Never overwrite previous entries.
8. **Compare with previous runs** — read the last 25 entries from the changelog and mark each action item as NEW, RECURRING, or RESOLVED.
9. **ALWAYS execute the verification checklist** — read the verification-checklist.md and execute every rule. Include a Verification Log in the report. Append new rules when a new type of drift is discovered.
10. **Checklist rules are append-only** — never remove or weaken existing rules. Only add new rules or upgrade depth levels.
11. **ALWAYS update the Last Updated badge** — Phase 2.6 is mandatory. Never skip it.
12. **ALWAYS validate all hyperlinks** — Phase 2.7 is mandatory. Never skip it. Broken links are HIGH priority.
13. **Environment variables are split across two files** — `claude-settings.md` owns `env`-configurable vars; `claude-cli-startup-flags.md` owns startup-only vars. Do NOT flag env vars as missing if they belong in the CLI file. Cross-reference `best-practice/claude-cli-startup-flags.md` to verify ownership boundaries.
14. **Verify the settings hierarchy** — the 5-level override chain plus managed policy layer must match official docs exactly.
