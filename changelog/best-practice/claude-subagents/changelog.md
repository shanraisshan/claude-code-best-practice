# Subagents Report — Changelog History

## Status Legend

| Status | Meaning |
|--------|---------|
| ✅ `COMPLETE (reason)` | Action was taken and resolved successfully |
| ❌ `INVALID (reason)` | Finding was incorrect, not applicable, or intentional |
| ✋ `ON HOLD (reason)` | Action deferred — waiting on external dependency or user decision |

---

## [2026-02-28 03:22 PM PKT] Claude Code v2.1.63

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Agents Table | Add `workflow-changelog-claude-agents-frontmatter-agent` to Agents in This Repository table | ✅ COMPLETE (added with model: opus, inherits all tools, no skills/memory) |
| 2 | HIGH | Agents Table | Fix presentation-curator skills column — add `presentation/` prefix to skill names | ✅ COMPLETE (updated to presentation/vibe-to-agentic-framework etc.) |
| 3 | MED | Field Documentation | Add note to `color` field that it is functional but absent from official frontmatter table | ✅ COMPLETE (added note about unofficial status in description column) |
| 4 | MED | Invocation Section | Expand invocation section with --agents CLI flag, /agents command, claude agents CLI, agent resumption | ✅ COMPLETE (added invocation methods table with 5 methods) |

---

## [2026-03-07 08:35 AM PKT] Claude Code v2.1.71

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Broken Link | Fix agent memory link to `reports/claude-agent-memory.md` | ✅ COMPLETE |
| 2 | HIGH | Changed Behavior | Update `tools` field description: `Task(agent_type)` → `Agent(agent_type)` (v2.1.63 rename) | ✅ COMPLETE |
| 3 | HIGH | Changed Behavior | Update invocation section: Task tool → Agent tool (v2.1.63 rename) | ✅ COMPLETE (updated heading, code example, and added rename note) |
| 4 | HIGH | Example Update | Update full-featured example: `Task(monitor, rollback)` → `Agent(monitor, rollback)` | ✅ COMPLETE |
| 5 | HIGH | Built-in Agent | Add `Bash` agent to Official Claude Agents table (model: inherit, purpose: terminal commands in separate context) | ✅ COMPLETE (added to table) |
| 6 | HIGH | Agents Table | Add `workflow-concepts-agent` to Agents in This Repository table (model: opus, color: green) | ✅ COMPLETE |
| 7 | HIGH | Agents Table | Add `workflow-claude-settings-agent` to Agents in This Repository table (model: opus, color: yellow) | ✅ COMPLETE |
| 8 | MED | Built-in Agent | Fix `statusline-setup` model: `inherit` → `Sonnet` | ✅ COMPLETE |
| 9 | MED | Built-in Agent | Fix `claude-code-guide` model: `inherit` → `Haiku` | ❌ NOT APPLICABLE (removed from table) |
| 10 | MED | Agents Table | Fix `weather-agent` color: `teal` → `green` | ✅ COMPLETE |
| 11 | MED | Invocation | Add `--agent <name>` CLI flag to invocation methods table | ✅ COMPLETE (added as first row in invocation methods table) |
| 12 | MED | Changed Behavior | Update line 147 text: "Task tool" → "Agent tool" in Official Claude Agents table header | ✅ COMPLETE (user rewrote header text) |
| 13 | MED | Cross-File | Update CLAUDE.md: `Task(...)` → `Agent(...)` references (lines 50-53, 61) | ✅ COMPLETE (updated orchestration section and tools field description) |

---

## [2026-03-12 12:17 PM PKT] Claude Code v2.1.74

No drift detected — report is fully in sync with official docs. All 13 frontmatter fields and 6 built-in agents match.

---

## [2026-03-13 04:21 PM PKT] Claude Code v2.1.74

No drift detected — report is fully in sync with official docs. All 13 frontmatter fields and 6 built-in agents match.

---

## [2026-03-15 12:50 PM PKT] Claude Code v2.1.76

No drift detected — report is fully in sync with official docs. All 13 frontmatter fields and 6 built-in agents match.

---

## [2026-03-17 12:42 PM PKT] Claude Code v2.1.77

No drift detected — report is fully in sync with official docs. All 13 frontmatter fields and 6 built-in agents match.

---

## [2026-03-18 11:41 PM PKT] Claude Code v2.1.78

No drift detected — report is fully in sync with official docs. All 13 frontmatter fields and 6 built-in agents match.

---

## [2026-03-19 11:56 AM PKT] Claude Code v2.1.79

No drift detected — report is fully in sync with official docs. All 13 frontmatter fields and 6 built-in agents match.

---

## [2026-03-20 08:35 AM PKT] Claude Code v2.1.80

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `effort` field to Frontmatter Fields table (string, optional — effort level override: `low`, `medium`, `high`, `max`) | ✅ COMPLETE (added between `background` and `isolation`, count updated 14→15) |

---

## [2026-03-21 09:07 PM PKT] Claude Code v2.1.81

No drift detected — report is fully in sync with official docs. All 15 frontmatter fields and 6 built-in agents match.

---

## [2026-03-23 09:49 PM PKT] Claude Code v2.1.81

No drift detected — report is fully in sync with official docs. All 15 frontmatter fields (14 official + 1 unofficial `color`) and 6 built-in agents match.

---

## [2026-03-25 08:07 PM PKT] Claude Code v2.1.83

No drift detected — report is fully in sync with official docs. All 15 frontmatter fields (14 official + 1 unofficial `color`) and 6 built-in agents match.

**Watch item:** `initialPrompt` was added in v2.1.83 changelog but has not yet appeared in the official docs' supported frontmatter fields table. When it does, the report will need updating.

---

## [2026-03-26 01:01 PM PKT] Claude Code v2.1.84

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `initialPrompt` to Frontmatter Fields table (string, optional — auto-submitted as first user turn when agent runs as main session agent via `--agent` or `agent` setting) | ✅ COMPLETE (added between `isolation` and `color`, count updated 15→16) |

---

## [2026-03-27 06:28 PM PKT] Claude Code v2.1.85

No drift detected — report is fully in sync with official docs. All 16 frontmatter fields (15 official + 1 unofficial `color`) and 6 built-in agents match.

---

## [2026-03-28 06:00 PM PKT] Claude Code v2.1.86

No drift detected — report is fully in sync with official docs. All 16 frontmatter fields (15 official + 1 unofficial `color`) and 6 built-in agents match.

---

## [2026-04-01 12:26 PM PKT] Claude Code v2.1.89

No drift detected — report is fully in sync with official docs. All 16 frontmatter fields (15 official + 1 unofficial `color`) and 6 built-in agents match.

---

## [2026-04-02 09:11 PM PKT] Claude Code v2.1.90

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Agent | Remove `Bash` from Official Claude Agents table — official docs list 5 built-in agents, `Bash` is not among them | ✅ COMPLETE (removed Bash row, renumbered 6→5 agents) |
| 2 | LOW | Field Docs | Update `color` field description — remove "absent from official frontmatter table" note; `color` now appears in official supported frontmatter fields table | ✅ COMPLETE (removed unofficial note from color field description) |

---

## [2026-04-03 08:30 PM PKT] Claude Code v2.1.91

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | LOW | Field Docs | Update `permissionMode` field description — add `auto` as a valid value (official docs now list: `default`, `acceptEdits`, `auto`, `dontAsk`, `bypassPermissions`, `plan`) | ✅ COMPLETE (added `auto` between `acceptEdits` and `dontAsk` in permissionMode description) |

---

## [2026-04-04 10:43 PM PKT] Claude Code v2.1.92

No drift detected — report is fully in sync with official docs. All 16 frontmatter fields and 5 built-in agents match.

---

## [2026-04-08 09:34 PM PKT] Claude Code v2.1.96

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | LOW | Field Docs | Update `model` field description — add full model ID support (e.g., `claude-opus-4-6`) alongside aliases | ✅ COMPLETE (updated description to match official docs wording) |
| 2 | LOW | Field Docs | Update `effort` field description — add `max (Opus 4.6 only)` qualifier | ✅ COMPLETE (added Opus 4.6 only note to max option) |
| 3 | LOW | Field Docs | Update `color` field description — replace `(e.g., green, magenta)` with explicit valid values: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan` | ✅ COMPLETE (replaced example-based description with exhaustive valid values list) |

---

## [2026-04-09 11:34 PM PKT] Claude Code v2.1.97

No drift detected — report is fully in sync with official docs. All 16 frontmatter fields and 5 built-in agents match.

---

## [2026-04-11 06:10 PM PKT] Claude Code v2.1.101

No drift detected — report is fully in sync with official docs. All 16 frontmatter fields and 5 built-in agents match.
