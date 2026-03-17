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
