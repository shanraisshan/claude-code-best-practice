# Changelog — README CONCEPTS Section

Tracks drift between the README CONCEPTS table and official Claude Code documentation.

## Status Legend

| Status | Meaning |
|--------|---------|
| `COMPLETE (reason)` | Action was taken and resolved successfully |
| `INVALID (reason)` | Finding was incorrect, not applicable, or intentional |
| `ON HOLD (reason)` | Action deferred, waiting on external dependency or user decision |

---

## [2026-03-02 11:14 AM PKT] Claude Code v2.1.63

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Broken URL | Fix Permissions URL from `/iam` to `/permissions` | COMPLETE (URL updated to /permissions) |
| 2 | HIGH | Missing Concept | Add Agent Teams row to CONCEPTS table | COMPLETE (row added with ~\/\.claude\/teams\/ location) |
| 3 | HIGH | Missing Concept | Add Keybindings row to CONCEPTS table | COMPLETE (row added with ~\/\.claude\/keybindings\.json location) |
| 4 | HIGH | Missing Concept | Add Model Configuration row to CONCEPTS table | COMPLETE (row added with \.claude\/settings\.json location) |
| 5 | HIGH | Missing Concept | Add Auto Memory row to CONCEPTS table | COMPLETE (row added with ~\/\.claude\/projects\/<project>\/memory\/ location) |
| 6 | HIGH | Stale Anchor | Fix Rules URL anchor from `#modular-rules-with-clauderules` to `#organize-rules-with-clauderules` | COMPLETE (anchor updated) |
| 7 | MED | Missing Concept | Add Checkpointing row to CONCEPTS table | COMPLETE (row added with automatic git-based location) |
| 8 | MED | Missing Concept | Add Status Line row to CONCEPTS table | COMPLETE (row added with ~\/\.claude\/settings\.json location) |
| 9 | MED | Missing Concept | Add Remote Control row to CONCEPTS table | COMPLETE (row added with CLI \/ claude\.ai location) |
| 10 | MED | Missing Concept | Add Fast Mode row to CONCEPTS table | COMPLETE (row added with \.claude\/settings\.json location) |
| 11 | MED | Missing Concept | Add Headless Mode row to CONCEPTS table | COMPLETE (row added with CLI flag -p location) |
| 12 | LOW | Changed Description | Update Memory description to mention auto memory | COMPLETE (description and location updated) |
| 13 | LOW | Changed Location | Update MCP Servers location to include `.mcp.json` | COMPLETE (location updated to include .mcp.json) |
| 14 | LOW | Missing Badge | Add Implemented badge to Hooks row | COMPLETE (Implemented badge added linking to .claude/hooks/) |

---

## [2026-03-02 11:57 AM PKT] Claude Code v2.1.63

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Table Consolidation | Consolidate CONCEPTS table from 22 rows to 10 rows — fold related concepts as inline doc links | COMPLETE (22 → 10 rows) |
| 2 | MED | Merged Concept | Fold Marketplaces into Plugins row as inline link | COMPLETE (linked to /discover-plugins) |
| 3 | MED | Merged Concept | Fold Agent Teams into Sub-Agents row as inline link | COMPLETE (linked to /agent-teams) |
| 4 | MED | Merged Concept | Fold Permissions, Model Config, Output Styles, Sandboxing, Keybindings, Status Line, Fast Mode into Settings row as inline links | COMPLETE (7 concepts folded with doc links) |
| 5 | MED | Merged Concept | Fold Auto Memory and Rules into Memory row as inline links | COMPLETE (linked to /memory and /memory#organize-rules-with-clauderules) |
| 6 | MED | Merged Concept | Fold Headless Mode into Remote Control row as inline link | COMPLETE (linked to /headless) |
| 7 | LOW | Reorder | Reorder table by logical grouping: building blocks → extension → config → context → runtime | COMPLETE (grouped by concern, not chronology) |
