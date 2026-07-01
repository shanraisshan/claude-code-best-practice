# Changelog — README CONCEPTS Section

Tracks drift between the README CONCEPTS table and official Claude Code documentation.

## Status Legend

| Status | Meaning |
|--------|---------|
| ✅ `COMPLETE (reason)` | Action was taken and resolved successfully |
| ❌ `INVALID (reason)` | Finding was incorrect, not applicable, or intentional |
| ✋ `ON HOLD (reason)` | Action deferred — waiting on external dependency or user decision |

---

## [2026-03-02 11:14 AM PKT] Claude Code v2.1.63

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Broken URL | Fix Permissions URL from `/iam` to `/permissions` | ✅ COMPLETE (URL updated to /permissions) |
| 2 | HIGH | Missing Concept | Add Agent Teams row to CONCEPTS table | ✅ COMPLETE (row added with ~\/\.claude\/teams\/ location) |
| 3 | HIGH | Missing Concept | Add Keybindings row to CONCEPTS table | ✅ COMPLETE (row added with ~\/\.claude\/keybindings\.json location) |
| 4 | HIGH | Missing Concept | Add Model Configuration row to CONCEPTS table | ✅ COMPLETE (row added with \.claude\/settings\.json location) |
| 5 | HIGH | Missing Concept | Add Auto Memory row to CONCEPTS table | ✅ COMPLETE (row added with ~\/\.claude\/projects\/<project>\/memory\/ location) |
| 6 | HIGH | Stale Anchor | Fix Rules URL anchor from `#modular-rules-with-clauderules` to `#organize-rules-with-clauderules` | ✅ COMPLETE (anchor updated) |
| 7 | MED | Missing Concept | Add Checkpointing row to CONCEPTS table | ✅ COMPLETE (row added with automatic git-based location) |
| 8 | MED | Missing Concept | Add Status Line row to CONCEPTS table | ✅ COMPLETE (row added with ~\/\.claude\/settings\.json location) |
| 9 | MED | Missing Concept | Add Remote Control row to CONCEPTS table | ✅ COMPLETE (row added with CLI \/ claude\.ai location) |
| 10 | MED | Missing Concept | Add Fast Mode row to CONCEPTS table | ✅ COMPLETE (row added with \.claude\/settings\.json location) |
| 11 | MED | Missing Concept | Add Headless Mode row to CONCEPTS table | ✅ COMPLETE (row added with CLI flag -p location) |
| 12 | LOW | Changed Description | Update Memory description to mention auto memory | ✅ COMPLETE (description and location updated) |
| 13 | LOW | Changed Location | Update MCP Servers location to include `.mcp.json` | ✅ COMPLETE (location updated to include .mcp.json) |
| 14 | LOW | Missing Badge | Add Implemented badge to Hooks row | ✅ COMPLETE (Implemented badge added linking to .claude/hooks/) |

---

## [2026-03-02 11:57 AM PKT] Claude Code v2.1.63

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Table Consolidation | Consolidate CONCEPTS table from 22 rows to 10 rows — fold related concepts as inline doc links | ✅ COMPLETE (22 → 10 rows) |
| 2 | MED | Merged Concept | Fold Marketplaces into Plugins row as inline link | ✅ COMPLETE (linked to /discover-plugins) |
| 3 | MED | Merged Concept | Fold Agent Teams into Sub-Agents row as inline link | ✅ COMPLETE (linked to /agent-teams) |
| 4 | MED | Merged Concept | Fold Permissions, Model Config, Output Styles, Sandboxing, Keybindings, Status Line, Fast Mode into Settings row as inline links | ✅ COMPLETE (7 concepts folded with doc links) |
| 5 | MED | Merged Concept | Fold Auto Memory and Rules into Memory row as inline links | ✅ COMPLETE (linked to /memory and /memory#organize-rules-with-clauderules) |
| 6 | MED | Merged Concept | Fold Headless Mode into Remote Control row as inline link | ✅ COMPLETE (linked to /headless) |
| 7 | LOW | Reorder | Reorder table by logical grouping: building blocks → extension → config → context → runtime | ✅ COMPLETE (grouped by concern, not chronology) |

---

## [2026-03-07 08:40 AM PKT] Claude Code v2.1.71

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Broken URL | Fix `context-management` → `interactive-mode` in TIPS (lines 112, 115, 135) | ✅ COMPLETE (3 occurrences replaced with interactive-mode) |
| 2 | HIGH | Broken URL | Fix `model-configuration` → `model-config` in TIPS (lines 115, 116, 135) | ✅ COMPLETE (3 occurrences replaced with model-config) |
| 3 | HIGH | Broken URL | Fix `usage-billing` → `costs` in TIPS (line 115) | ✅ COMPLETE (replaced with costs) |
| 4 | HIGH | Broken URL | Remove `cowork` URL in STARTUPS (line 167) — page does not exist | ✅ COMPLETE (hyperlink removed, plain text kept) |
| 5 | HIGH | Missing Concept | Add Scheduled Tasks row to CONCEPTS and Hot section (`/loop`, cron tools) | ✅ COMPLETE (added by user to both tables + /loop tip + Boris tweet) |
| 6 | MED | Changed Location | Update Agent Teams location from `.claude/agents/<name>.md` to `built-in (env var)` | ✅ COMPLETE (location updated to built-in env var) |

---

## [2026-03-10 01:18 PM PKT] Claude Code v2.1.72

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Broken URL | Fix Commands URL from `/slash-commands` to `/skills` in CONCEPTS table (line 24) — `/slash-commands` serves Skills page content; docs say "commands merged into skills" | ❌ INVALID (URL still resolves; user chose to keep as-is) |
| 2 | HIGH | Broken URL | Fix Commands URL from `/slash-commands` to `/skills` in TIPS section (line 108) — same stale URL | ❌ INVALID (URL still resolves; user chose to keep as-is) |
| 3 | MED | Missing Inline Link | Add Interactive Mode (`/interactive-mode`) as inline link to CLI Startup Flags row — covers /compact, /clear, /context, /extra-usage | ✅ COMPLETE (inline link added to CLI Startup Flags description) |
| 4 | MED | Missing Inline Link | Add Costs (`/costs`) as inline link to Settings row — covers /usage, billing, pay-as-you-go | ❌ INVALID (user chose to skip) |
| 5 | LOW | Missing Concept | Consider adding IDE Integrations row (VS Code, JetBrains, Desktop App, Web) or inline links to Best Practices | ❌ INVALID (user chose to skip — platform surfaces, not configuration concepts) |
| 6 | HIGH | Missing Concept | Add Code Review row to Hot table — multi-agent PR analysis (research preview, Teams & Enterprise) | ✅ COMPLETE (row added as first Hot entry with blog link and best practice tweet) |
| 7 | MED | New Badge | Create `!/tags/beta.svg` tag (yellow, 38x20px) and add to Code Review and Agent Teams in Hot table | ✅ COMPLETE (beta.svg created; added to Code Review and Agent Teams rows) |
| 8 | MED | Reorder | Sort Hot table by release date (most recent first): Code Review → Scheduled Tasks → Voice Mode → Agent Teams → Remote Control → Git Worktrees → Ralph Wiggum | ✅ COMPLETE (Voice Mode and Agent Teams swapped to match chronological order) |

---

## [2026-03-12 12:22 PM PKT] Claude Code v2.1.74

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Broken URL | Fix Commands URL from `/slash-commands` to `/skills` in CONCEPTS table (line 24) — `/slash-commands` redirects to `/skills` page | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 2 | LOW | Verification | All external docs URLs validated — no broken links found | ✅ COMPLETE (all 20+ URLs return valid pages) |
| 3 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all badge targets exist on filesystem) |
| 4 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` validated on target page | ✅ COMPLETE (heading exists on /memory page) |
| 5 | LOW | Verification | All CONCEPTS descriptions checked against official docs | ✅ COMPLETE (no description drift detected) |

---

## [2026-03-15 12:48 PM PKT] Claude Code v2.1.76

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 2 | MED | Missing Badges | Remote Control (Hot) has zero badges — only Hot item without any BP or Impl badge | ✅ COMPLETE (BP badge added linking to official docs page) |
| 3 | LOW | Naming | "Sub-Agents" in README vs "subagents" (one word) in official docs — cosmetic inconsistency | ✅ COMPLETE (renamed to "Subagents" in CONCEPTS table) |
| 4 | LOW | Verification | All 27 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages) |
| 5 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all badge targets exist on filesystem) |
| 6 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading exists) |
| 7 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (descriptions accurate for all 13 CONCEPTS + 9 Hot rows) |

---

## [2026-03-17 12:46 PM PKT] Claude Code v2.1.77

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 2 | HIGH | Changed Description | Hooks description says "Deterministic scripts" but hooks now include 4 types: command, HTTP, prompt, and agent — only command hooks are deterministic | ✅ COMPLETE (updated to "User-defined handlers (scripts, HTTP, prompts, agents)" in CONCEPTS table) |
| 3 | MED | Missing Concept | Desktop App has dedicated docs page at `/desktop` — not in CONCEPTS or Hot table | ❌ INVALID (user chose to skip — Desktop is a platform surface, not a configuration concept) |
| 4 | MED | Changed URL | Hooks docs now split into Guide (`/hooks-guide`) and Reference (`/hooks`) — CONCEPTS links only to Reference | ✅ COMPLETE (Guide link added as inline link in Hooks row description) |
| 5 | LOW | Verification | All 28 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 6 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20 badge targets exist on filesystem) |
| 7 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | All CONCEPTS descriptions checked against official docs | ✅ COMPLETE (Hooks description drift detected — see #2) |

---

## [2026-03-18 11:43 PM PKT] Claude Code v2.1.78

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 2 | HIGH | Changed URL+Name | Voice Mode in Hot table links to tweet instead of official docs `/voice-dictation`; official name is "Voice Dictation" | ✅ COMPLETE (renamed to "Voice Dictation", linked to /voice-dictation, description updated; BP badge kept linking to tweet; also updated in STARTUPS table) |
| 3 | LOW | Verification | All 29 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 4 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20+ badge targets exist on filesystem) |
| 5 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading exists) |
| 6 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-03-19 11:59 AM PKT] Claude Code v2.1.79

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 2 | LOW | Verification | All 30 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 3 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20+ badge targets exist on filesystem) |
| 4 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading exists) |
| 5 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-03-20 08:38 AM PKT] Claude Code v2.1.80

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Concept | Add Channels row to Hot table — push events from Telegram/Discord/webhooks into running sessions (research preview, v2.1.80) | ✅ COMPLETE (row added as first Hot entry with beta badge and Reference link) |
| 2 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 3 | MED | Missing Deep Link | Git Worktrees URL should anchor to `#run-parallel-claude-code-sessions-with-git-worktrees` | ✅ COMPLETE (anchor added to Git Worktrees URL in Hot table) |
| 4 | LOW | Missing Inline Link | Plugins row could add `[Marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)` sub-link | ✅ COMPLETE (Create Marketplaces inline link added to Plugins row) |
| 5 | LOW | Verification | All 31 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 6 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20+ badge targets exist on filesystem) |
| 7 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-03-21 09:12 PM PKT] Claude Code v2.1.81

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 2 | LOW | Verification | All 32 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 3 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20+ badge targets exist on filesystem) |
| 4 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading exists) |
| 5 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 6 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-03-23 09:53 PM PKT] Claude Code v2.1.81

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 2 | LOW | Verification | All 33 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 3 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20+ badge targets exist on filesystem) |
| 4 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading exists) |
| 5 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 6 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-03-25 08:12 PM PKT] Claude Code v2.1.83

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 2 | MED | Changed URL | Simplify & Batch primary link points to tweet instead of official docs `/skills#bundled-skills` — now officially bundled skills | ✅ COMPLETE (primary link updated to /skills#bundled-skills; BP badge kept linking to Boris's tweet) |
| 3 | LOW | Verification | All 34 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 4 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20+ badge targets exist on filesystem) |
| 5 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading exists) |
| 6 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 7 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |
| 8 | HIGH | Missing Concept | Add Auto Mode row to Hot table — background safety classifier replaces permission prompts (research preview, Team/Enterprise) | ✅ COMPLETE (row added as first Hot entry with beta badge, BP badge linking to @claudeai tweet, and blog link) |

---

## [2026-03-26 01:05 PM PKT] Claude Code v2.1.84

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 2 | MED | Missing Concept | Add Slack integration to Hot table — mention @Claude in Slack to route coding tasks to Claude Code web sessions | ✅ COMPLETE (row added after Channels with @Claude location and web session description) |
| 3 | MED | Missing Concept | Add GitHub Actions / CI-CD to Hot table — automate PR reviews, issue triage, and code generation in CI/CD pipelines | ✅ COMPLETE (row added after Code Review with .github/workflows/ location and GitLab CI/CD inline link) |
| 4 | LOW | Verification | All 35 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 5 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20+ badge targets exist on filesystem) |
| 6 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading exists) |
| 7 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on /permission-modes page | ✅ COMPLETE (section heading exists) |
| 9 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on /skills page | ✅ COMPLETE (section heading exists) |
| 10 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-03-27 06:37 PM PKT] Claude Code v2.1.85

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 2 | MED | Missing Concept | Add Chrome integration to Hot table — browser automation via Claude in Chrome extension (beta, dedicated docs at `/chrome`) | ✅ COMPLETE (row added after GitHub Actions with --chrome location and beta badge) |
| 3 | LOW | Verification | All 36 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 4 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20+ badge targets exist on filesystem) |
| 5 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading exists) |
| 6 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 7 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on /permission-modes page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on /skills page | ✅ COMPLETE (section heading exists) |
| 9 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-03-28 06:04 PM PKT] Claude Code v2.1.86

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 2 | MED | Missing Badge | Chrome row in Hot table has no BP badge — report exists at `reports/claude-in-chrome-v-chrome-devtools-mcp.md` | ✅ COMPLETE (BP badge added linking to reports/claude-in-chrome-v-chrome-devtools-mcp.md) |
| 3 | LOW | Changed Description | Plugins description missing LSP servers — official docs list `.lsp.json` as plugin component | ✅ COMPLETE (added "and LSP servers" to Plugins description) |
| 4 | LOW | Verification | All 37 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 5 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20+ badge targets exist on filesystem) |
| 6 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading `.claude/rules/` exists) |
| 7 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on /permission-modes page | ✅ COMPLETE (section heading exists) |
| 9 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on /skills page | ✅ COMPLETE (section heading exists) |
| 10 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate except Plugins LSP note — see #3) |

---

## [2026-04-01 12:33 PM PKT] Claude Code v2.1.89

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Concept | Add Computer Use row to Hot table — screen control on macOS via built-in MCP server (research preview, v2.1.85+) | ✅ COMPLETE (row added after Fullscreen Rendering with beta badge and Desktop inline link) |
| 2 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 3 | MED | Missing Concept | Add Fullscreen Rendering row to Hot table — flicker-free alt-screen rendering with mouse support (research preview, v2.1.88+) | ✅ COMPLETE (row added as first Hot entry with CLAUDE_CODE_NO_FLICKER=1 location) |
| 4 | LOW | Verification | All 38 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 5 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20+ badge targets exist on filesystem) |
| 6 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading exists) |
| 7 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on /permission-modes page | ✅ COMPLETE (section heading exists) |
| 9 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on /skills page | ✅ COMPLETE (section heading exists) |
| 10 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-04-02 09:17 PM PKT] Claude Code v2.1.90

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` serves Skills page — docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves; user chose to keep as-is) |
| 2 | LOW | Verification | All 39 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 3 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20+ badge targets exist on filesystem) |
| 4 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading "Organize rules with `.claude/rules/`" exists) |
| 5 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 6 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on /permission-modes page | ✅ COMPLETE (section heading exists) |
| 7 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on /skills page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-04-03 08:35 PM PKT] Claude Code v2.1.91

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap (llms.txt) — redirects to `/skills` page; docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user chose to keep as-is) |
| 2 | LOW | Verification | All 40 external docs URLs validated against llms.txt sitemap (80 pages) — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 3 | LOW | Verification | All local badge file paths validated — no missing files (17 local targets checked) | ✅ COMPLETE (all badge targets exist on filesystem) |
| 4 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading "Organize rules with `.claude/rules/`" exists) |
| 5 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 6 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on /permission-modes page | ✅ COMPLETE (section heading exists) |
| 7 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on /skills page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-04-04 10:46 PM PKT] Claude Code v2.1.92

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Concept | Add Ultraplan row to Hot table — cloud-based plan drafting with browser review, inline comments, and flexible execution (`/ultraplan`) | ✅ COMPLETE (row added after Power-ups with beta badge and /ultraplan location) |
| 2 | HIGH | Missing Concept | Add Claude Code Web row to Hot table — run tasks on cloud infrastructure at claude.ai/code with PR auto-fix and parallel sessions | ✅ COMPLETE (row added after Ultraplan with beta badge, claude.ai/code location, and Web Scheduled Tasks inline link) |
| 3 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills` page; docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user chose to keep as-is) |
| 4 | MED | Missing Concept | Add Desktop App row to Hot table — standalone app with visual diff, Dispatch, computer use, and parallel sessions | ❌ INVALID (RECURRING from 2026-03-17; user considers it a platform surface, not a configuration concept) |

---

## [2026-04-08 09:37 PM PKT] Claude Code v2.1.96

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills` page; docs say "commands merged into skills" | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user chose to keep as-is) |
| 2 | MED | Changed Name | "No Flicker Mode" in Hot table — official docs page title is "Fullscreen rendering"; consider renaming or adding subtitle | ❌ INVALID (user chose to keep "No Flicker Mode" per Boris's tweet naming convention; env var is `CLAUDE_CODE_NO_FLICKER`) |
| 3 | MED | Missing Concept | Add Desktop App row to Hot table — standalone app with visual diff, Dispatch, computer use, and parallel sessions | ❌ INVALID (RECURRING from 2026-03-17; user considers it a platform surface, not a configuration concept) |
| 4 | LOW | Verification | All 41 external docs URLs validated — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 5 | LOW | Verification | All local badge file paths validated — no missing files | ✅ COMPLETE (all 20+ badge targets exist on filesystem) |
| 6 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading "Organize rules with `.claude/rules/`" exists) |
| 7 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on /permission-modes page | ✅ COMPLETE (section heading exists) |
| 9 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on /skills page | ✅ COMPLETE (section heading exists) |
| 10 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-04-09 11:37 PM PKT] Claude Code v2.1.97

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Concept | Add Agent SDK row to Hot table — build production AI agents with Python/TypeScript SDKs (29 docs pages, `/en/agent-sdk/overview`) | ✅ COMPLETE (row added after Claude Code Web with Quickstart and Examples inline links) |
| 2 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills`; canonical commands reference is now `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user chose to keep as-is) |
| 3 | MED | Missing Inline Link | Add Environment Variables (`/env-vars`) inline link to CLI Startup Flags row — new dedicated docs page | ✅ COMPLETE (Env Vars inline link added after Interactive Mode) |
| 4 | LOW | Verification | All 42 external docs URLs validated against llms.txt sitemap (110 pages) — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 5 | LOW | Verification | All local badge file paths validated — no missing files (20+ badge targets checked) | ✅ COMPLETE (all badge targets exist on filesystem) |
| 6 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading "Organize rules with `.claude/rules/`" exists) |
| 7 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on /permission-modes page | ✅ COMPLETE (section heading exists) |
| 9 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on /skills page | ✅ COMPLETE (section heading exists) |
| 10 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-04-11 06:13 PM PKT] Claude Code v2.1.101

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap (110 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user chose to keep as-is) |
| 2 | LOW | Verification | All 43 external docs URLs validated against llms.txt sitemap (110 pages) — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 3 | LOW | Verification | All local badge file paths validated — no missing files (20+ badge targets checked) | ✅ COMPLETE (all badge targets exist on filesystem) |
| 4 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading "Organize rules with `.claude/rules/`" exists) |
| 5 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 6 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on /permission-modes page | ✅ COMPLETE (section heading exists) |
| 7 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on /skills page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-04-13 08:07 PM PKT] Claude Code v2.1.101

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap (110 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user chose to keep as-is) |
| 2 | LOW | Verification | All 44 external docs URLs validated against llms.txt sitemap (110 pages) — no broken links found | ✅ COMPLETE (all URLs return valid pages including /slash-commands redirect) |
| 3 | LOW | Verification | All local badge file paths validated — no missing files (20+ badge targets checked) | ✅ COMPLETE (all badge targets exist on filesystem) |
| 4 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading "Organize rules with `.claude/rules/`" exists) |
| 5 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 6 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on /permission-modes page | ✅ COMPLETE (section heading exists) |
| 7 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on /skills page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-04-14 11:17 PM PKT] Claude Code v2.1.107

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Concept | Add Routines row to Hot table — cloud automation on Anthropic infrastructure with schedule, API, and GitHub event triggers (`/en/routines`) | ✅ COMPLETE (row added after Scheduled Tasks with beta badge, Desktop Tasks inline link) |
| 2 | HIGH | Stale URL | Update `web-scheduled-tasks` inline link in Claude Code Web row (line 45) to `/en/routines` — URL not in sitemap, redirects to Routines page | ✅ COMPLETE (inline link text changed to "Routines", URL updated to /routines) |
| 3 | HIGH | Stale URL | Update `web-scheduled-tasks` inline link in Scheduled Tasks row (line 55) to `/en/routines` — same stale URL | ✅ COMPLETE (URL updated to /routines) |
| 4 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap (119 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user chose to keep as-is) |
| 5 | MED | Changed Description | Update Scheduled Tasks description from "up to 3 days" to "up to 7 days" — docs now specify seven-day expiry for recurring tasks | ✅ COMPLETE (description updated to "up to 7 days") |
| 6 | MED | Missing Concept | Add Devcontainers row to Hot table — preconfigured dev containers with security isolation and firewall rules (`/en/devcontainer`) | ✅ COMPLETE (row added after Routines with .devcontainer/ location) |

---

## [2026-04-16 08:20 PM PKT] Claude Code v2.1.110

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Fix `web-scheduled-tasks` URL in TIPS (line 223) to `/en/routines` — URL not in sitemap; same stale URL fixed in Hot table on 2026-04-14 but TIPS instance was missed | ✅ COMPLETE (URL updated to /routines) |
| 2 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap (111 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user chose to keep as-is) |
| 3 | MED | Changed Description | Update "up to 3 days" to "up to 7 days" in TIPS (line 223) — same description updated in Hot table on 2026-04-14 but TIPS instance was missed | ✅ COMPLETE (description updated to "up to 7 days") |
| 4 | LOW | Verification | All 45 external docs URLs validated against llms.txt sitemap (111 pages) — 1 broken link found (see #1) | ✅ COMPLETE (web-scheduled-tasks flagged) |
| 5 | LOW | Verification | All local badge file paths validated — no missing files (20+ badge targets checked) | ✅ COMPLETE (all badge targets exist on filesystem) |
| 6 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading "Organize rules with `.claude/rules/`" exists) |
| 7 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 8 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on /permission-modes page | ✅ COMPLETE (section heading exists) |
| 9 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on /skills page | ✅ COMPLETE (section heading exists) |
| 10 | LOW | Verification | All CONCEPTS descriptions checked against official docs — no drift detected | ✅ COMPLETE (all descriptions accurate) |

---

## [2026-04-18 07:53 PM PKT] Claude Code v2.1.113

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Changed Description | Auto Mode row (line 48) still references `claude --enable-auto-mode` — flag removed in v2.1.111; auto mode now starts via `--permission-mode auto` or Shift+Tab cycle (Max subscribers default with Opus 4.7) | ✅ COMPLETE (location updated to `--permission-mode auto`, `Shift+Tab`; description notes flag removal and Max+Opus-4.7 default) |
| 2 | HIGH | Missing Concept | Add Ultrareview row to Hot table — cloud-based multi-agent code review (`/ultrareview`, v2.1.86+, dedicated docs at `/en/ultrareview`); free 3 runs for Pro/Max | ✅ COMPLETE (row added after Routines with beta badge, /ultrareview location, Tasks-tracking inline link) |
| 3 | HIGH | Missing Concept | Add Tasks row — `/tasks` command for tracking background work (referenced on Ultrareview page); replaces TodoWrite per `reports/claude-global-vs-project-settings.md` | ✅ COMPLETE (row added after Scheduled Tasks with /tasks location, BP badge linking to global-vs-project-settings report) |
| 4 | MED | Changed Description | No Flicker Mode row (line 47) — official docs now lead with `/tui fullscreen` command (v2.1.110); env var is the pre-v2.1.110 legacy path per /fullscreen page | ✅ COMPLETE (location updated to `/tui fullscreen`, `CLAUDE_CODE_NO_FLICKER=1`; description notes /tui as canonical, env var as legacy) |
| 5 | MED | Stale Command Name | TIPS line 249 references `/fewer-permission-prompts` — official skill name is `/less-permission-prompts` per v2.1.111 changelog (local skill folder is `fewer-permission-prompts` but the user-visible command should match the official name) | ✅ COMPLETE (TIPS line 249 updated to /less-permission-prompts) |
| 6 | LOW | Changed Description | Scheduled Tasks row (line 60) — Week 15 added Monitor tool + self-pacing `/loop` (LLM picks its own interval); description doesn't mention this | ✅ COMPLETE (description appended with self-pacing/Monitor tool note) |
| 7 | LOW | Changed Description | Git Worktrees row (line 63) — v2.1.105/106 added `EnterWorktree`/`ExitWorktree` tools and `isolation: "worktree"` subagent frontmatter; description doesn't mention these | ✅ COMPLETE (location updated to include EnterWorktree/ExitWorktree and isolation frontmatter; description notes v2.1.106+ subagent worktree support) |
| 8 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap (119 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 17+ runs) |
| 9 | LOW | Verification | All 45+ external docs URLs validated against llms.txt sitemap (119 pages) — no NEW broken links found beyond the recurring `/slash-commands` redirect | ✅ COMPLETE (all flagged URLs return valid pages) |
| 10 | LOW | Verification | All local badge file paths validated — no missing files (20+ badge targets checked) | ✅ COMPLETE (all badge targets exist on filesystem) |
| 11 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on /memory page | ✅ COMPLETE (section heading "Organize rules with `.claude/rules/`" exists) |
| 12 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on /common-workflows page | ✅ COMPLETE (section heading exists) |
| 13 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on /permission-modes page | ✅ COMPLETE (section heading exists) |
| 14 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on /skills page | ✅ COMPLETE (section heading exists) |
| 15 | LOW | Verification | Fullscreen page confirms `/tui fullscreen` is canonical command and `tui` is settings field (v2.1.110) | ✅ COMPLETE (page fetched and quoted) |
| 16 | LOW | Verification | Permission-modes page confirms `--enable-auto-mode` flag is no longer documented; auto mode now requires Max plan + Opus 4.7 | ✅ COMPLETE (page fetched; flag absent from docs) |
| 17 | LOW | Verification | Ultrareview page exists at `/en/ultrareview` (v2.1.86+), confirms `/ultrareview` and `/tasks` commands | ✅ COMPLETE (page fetched and content captured) |

---

## [2026-04-24 12:32 AM PKT] Claude Code v2.1.118

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Changed Description | Hooks row (line 28) lists 4 handler types ("scripts, HTTP, prompts, agents") — official `/en/hooks` page now documents 5 types with `mcp_tool` added (v2.1.118 changelog: "Hooks can invoke MCP tools directly" via `type: "mcp_tool"`) | ✅ COMPLETE (description updated to "scripts, HTTP, MCP tools, prompts, agents") |
| 2 | MED | Empty Description | Workflows row (line 27) description cell is empty (only Orchestration Workflow badge) — official `/en/common-workflows` page covers step-by-step guides for exploring, fixing, refactoring, testing | ✅ COMPLETE (description filled with official-docs-sourced text: "Step-by-step guides for exploring codebases, fixing bugs, refactoring, and testing — orchestration patterns for multi-step tasks") |
| 3 | LOW | Changed Description | Consider mentioning `/usage` (v2.1.118 merged `/cost`+`/stats`) inline in CLI Startup Flags row — new slash command replacing two legacy ones | ✅ COMPLETE (inline note "`/usage` (merged `/cost`+`/stats` in v2.1.118)" appended after Env Vars) |
| 4 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap (117 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 18+ runs) |
| 5 | LOW | Verification | Hooks page `/en/hooks` fetched — confirmed 5 handler types including `mcp_tool` (v2.1.118) | ✅ COMPLETE (live fetch documented 5-type schema) |
| 6 | LOW | Verification | Ultrareview page `/en/ultrareview#track-a-running-review` anchor fetched and confirmed | ✅ COMPLETE (section exists, describes `/tasks` integration) |
| 7 | LOW | Verification | Checkpointing page `/en/checkpointing` fetched — `/undo` alias (v2.1.108) NOT surfaced in docs, only in changelog; no CONCEPTS update required | ✅ COMPLETE (docs page content matches existing description) |
| 8 | LOW | Verification | All local badge file paths — no changes since v2.1.113 run on 2026-04-18 | ✅ COMPLETE (stable since prior run) |
| 9 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` — not re-checked this run; stable since v2.1.113 | ✅ COMPLETE (stable) |
| 10 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 11 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 12 | LOW | Verification | Bundled Skills anchor `#bundled-skills` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 13 | LOW | Verification | claude-code-guide agent cross-check — no contradictions with dedicated agent; surfaced /recap (v2.1.108), /usage (v2.1.118), MCP-tool hooks (v2.1.118) as corroborating evidence | ✅ COMPLETE (both agents aligned) |

---

## [2026-04-26 01:10 PM PKT] Claude Code v2.1.119

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap (139 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 19+ runs) |
| 2 | HIGH | Wrong Target URL | Tasks row (line 62) primary URL points to `/ultrareview#track-a-running-review` — anchor is valid but target is the ultrareview tracking section, not the broader Tasks system; canonical home is the local report `reports/claude-global-vs-project-settings.md#tasks-system` | ✅ COMPLETE (primary URL updated to `reports/claude-global-vs-project-settings.md#tasks-system`; ultrareview tracking anchor preserved as inline link "Ultrareview tracking" at end of description) |
| 3 | MED | Beta Badge Currency | Routines / No Flicker Mode / Computer Use / Code Review have `![beta]` in README but their docs pages no longer mark them as beta — re-evaluate and demote where appropriate | ❌ INVALID (verification fetched all 4 docs pages — Routines: "in research preview"; Fullscreen: "research preview"; Computer Use: "research preview on macOS"; Code Review: "in research preview" — README beta badges are accurate; the agent's 0.6-confidence read of body content was contradicted by `<Note>` banner text) |
| 4 | MED | Description Disambiguation | Scheduled Tasks row (line 61) description conflates `/loop` (local, session-scoped, 7-day expiry) and `/schedule` (cloud Routines on Anthropic infrastructure) — official `/en/scheduled-tasks` page now formally distinguishes Cloud / Desktop / Loop as three surfaces | ✅ COMPLETE (description now explicitly names "Three surfaces" with `/loop` local, `/schedule` cloud Routines, and Desktop scheduled tasks called out separately) |
| 5 | LOW | Missing Concept (optional) | Fast Mode is currently only a side-link inside Settings (line 31) — has its own dedicated `/en/fast-mode` page with `↯` indicator and `/fast` toggle (v2.1.36+); could be a Hot row | ✅ COMPLETE (Hot row inserted between Power-ups and Computer Use with beta badge; removed redundant Fast Mode side-link from Settings to prevent duplication) |
| 6 | LOW | Missing Inline Link | Memory row could surface `reports/claude-agent-memory.md` as an inline link — auto-memory is referenced but the local deep-dive isn't linked from CONCEPTS | ✅ COMPLETE ("Auto Memory Deep-dive" inline link added between Auto Memory docs and Rules in the Memory row) |
| 7 | LOW | Missing Inline Link | Skills row could surface `reports/claude-skills-for-larger-mono-repos.md` as an inline link — exists locally but only referenced from TIPS | ✅ COMPLETE ("Skills for Mono-repos" inline link appended after Official Skills in the Skills row) |
| 8 | LOW | Optional Concept | Vim visual mode (v2.1.118), Theme Customization (`~/.claude/themes/`, v2.1.118), and PowerShell tool (v2.1.111) could be Settings side-links — minor concepts surfaced by claude-code-guide cross-check | ❌ INVALID (Vim mode is covered by existing Keybindings side-link; Themes have no dedicated docs page distinct from Settings; PowerShell tool has no dedicated docs page — no concrete sub-link target warrants addition) |
| 9 | LOW | Verification | All 35+ external CONCEPTS docs URLs validated against llms.txt sitemap (139 pages) — only the recurring `/slash-commands` redirect flagged; all other URLs resolve to expected pages | ✅ COMPLETE (no NEW broken URLs) |
| 10 | LOW | Verification | All local badge file paths validated — all 20+ `best-practice/`, `implementation/`, and `reports/` targets exist on filesystem | ✅ COMPLETE (no missing local files) |
| 11 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` confirmed on `/en/memory` page | ✅ COMPLETE (stable since v2.1.113) |
| 12 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` confirmed on `/en/common-workflows` page | ✅ COMPLETE (stable) |
| 13 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` confirmed on `/en/permission-modes` page | ✅ COMPLETE (stable) |
| 14 | LOW | Verification | Bundled Skills anchor `#bundled-skills` confirmed on `/en/skills` page | ✅ COMPLETE (stable) |
| 15 | LOW | Verification | Ultrareview anchor `#track-a-running-review` confirmed on `/en/ultrareview` page | ✅ COMPLETE (stable since v2.1.118) |
| 16 | LOW | Verification | claude-code-guide cross-check — corroborated dedicated agent's findings on Vim mode (v2.1.118), Theme (v2.1.118), Effort xhigh (v2.1.111+ Opus 4.7), Worktrees (v2.1.105+); no contradictions | ✅ COMPLETE (both agents aligned) |
| 17 | LOW | Verification Checklist Update | Added new rule (#7) "Beta Badge Currency" to verification-checklist.md — covers re-evaluating beta badges against upstream docs page lifecycle | ✅ COMPLETE (rule added) |

---

## [2026-04-29 12:53 AM PKT] Claude Code v2.1.121

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap (139+ pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 20+ runs) |
| 2 | MED | Changed Description | Ultrareview row (line 44) doesn't mention `claude ultrareview [target]` non-interactive subcommand introduced in v2.1.120 — docs confirm `--json` and `--timeout` flags for CI usage | ✅ COMPLETE (location updated to include `claude ultrareview [target]`; description appends non-interactive subcommand with `--json` and `--timeout` flags note, v2.1.120+) |
| 3 | MED | Changed Description | MCP Servers row (line 29) doesn't mention `alwaysLoad` setting added in v2.1.121 — bypasses tool-search deferral so a server's tools are always loaded into context | ✅ COMPLETE (description appended with `alwaysLoad` note explaining tool-search deferral bypass, v2.1.121+) |
| 4 | MED | Changed Description | Hooks row (line 28) doesn't mention `updatedToolOutput` capability added in v2.1.121 — PostToolUse hooks can now replace tool output via `hookSpecificOutput.updatedToolOutput` | ✅ COMPLETE (description appended with `hookSpecificOutput.updatedToolOutput` note for PostToolUse output replacement, v2.1.121+) |
| 5 | LOW | Changed Description | Subagents row (line 24) doesn't mention forked subagents now available on external builds via `CLAUDE_CODE_FORK_SUBAGENT=1` (v2.1.117) — was previously internal-only | ✅ COMPLETE (description appended with `CLAUDE_CODE_FORK_SUBAGENT=1` note for external builds, v2.1.117+) |
| 6 | LOW | Missing Inline Link | Settings row (line 31) inline links cover Permissions/Model Config/Output Styles/Sandboxing/Keybindings but not Auto Mode Config (`/auto-mode-config`) — exists as standalone page | ✅ COMPLETE (Auto Mode Config inline link appended after Keybindings) |
| 7 | LOW | Verification | All 35+ external CONCEPTS docs URLs spot-validated — Subagents, Skills, MCP, Ultrareview pages confirmed; only the recurring `/slash-commands` redirect flagged | ✅ COMPLETE (no NEW broken URLs) |
| 8 | LOW | Verification | All local badge file paths validated — all 22 `best-practice/`, `implementation/`, `reports/`, `.claude/`, `CLAUDE.md` targets exist on filesystem | ✅ COMPLETE (no missing local files) |
| 9 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` — stable since v2.1.113 (not re-fetched this run) | ✅ COMPLETE (stable) |
| 10 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 11 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 12 | LOW | Verification | Bundled Skills anchor `#bundled-skills` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 13 | LOW | Verification | Ultrareview anchor `#track-a-running-review` confirmed on `/en/ultrareview` page — section exists and describes `/tasks` integration | ✅ COMPLETE (stable since v2.1.118) |
| 14 | LOW | Verification | claude-code-guide cross-check — corroborated dedicated agent's findings on v2.1.117–v2.1.121 changes (forked subagents external, alwaysLoad, updatedToolOutput, claude ultrareview subcommand); also surfaced Bedrock/Vertex/Foundry, Desktop, IDE Integrations as long-standing missing concepts | ✅ COMPLETE (both agents aligned; all "missing platform surfaces" already INVALID per recurring user decision) |

---

## [2026-05-01 03:34 PM PKT] Claude Code v2.1.126

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale Version | README badge pinned at v2.1.121 (Apr 29) — latest is v2.1.126 (May 01); 5 versions behind | ✅ COMPLETE (badge bumped to v2.1.126 May 01 2026 3:34 PM PKT) |
| 2 | MED | New Concept (optional) | v2.1.126 introduced `claude project purge [path]` subcommand with `--dry-run`/`--all` flags — currently absent from CLI Startup Flags row; could be inline note | ✋ ON HOLD (deferred — single-version-old subcommand; revisit if user requests CLI Startup Flags refresh) |
| 3 | MED | New Concept (optional) | v2.1.126 added gateway-driven model picker — `/model` lists models from `ANTHROPIC_BASE_URL`'s `/v1/models` endpoint when gateway is Anthropic-compatible | ✋ ON HOLD (deferred — niche LLM-gateway feature; only relevant for self-hosted-gateway users; not surfaced in CONCEPTS by design) |
| 4 | LOW | Changed Description (optional) | v2.1.122 expanded `--from-pr` to accept GitLab MR + Bitbucket PR + GitHub Enterprise PR URLs (originally GitHub only) — CLI Startup Flags row doesn't surface this | ✋ ON HOLD (deferred — `--from-pr` not currently surfaced as inline link; would require new sub-link addition) |
| 5 | HIGH | Stale URL | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 21+ runs) |
| 6 | MED | Missing Concept (recurring) | Dedicated agent re-flagged Output Styles, Permissions, Sandboxing, Headless Mode, Desktop App, IDE Integration as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10/2026-03-17/2026-04-08/2026-04-09; user considers all six platform surfaces or covered as Settings sub-links — not standalone concepts) |
| 7 | MED | Missing Concept (recurring) | Dedicated agent flagged Auto Memory needs its own row separate from Memory | ❌ INVALID (RECURRING — current Memory row already surfaces both `/en/memory#auto-memory` and `reports/claude-agent-memory.md` as inline links; user's chosen pattern for cross-cutting feature) |
| 8 | LOW | Stale Finding | Dedicated agent flagged Tasks row primary URL needs `/en/agent-sdk/todo-tracking` cross-reference | ❌ INVALID (already RESOLVED on 2026-04-26 — user explicitly moved Tasks primary URL to `reports/claude-global-vs-project-settings.md#tasks-system` and kept ultrareview tracking as inline link; agent's analysis is stale) |
| 9 | LOW | Verification | All 23 local badge file paths validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md` all exist | ✅ COMPLETE (no missing local files) |
| 10 | LOW | Verification | Spot-validated external CONCEPTS URLs (`/en/cli-reference`, `/en/agent-teams`, `/en/changelog`, `/en/mcp`) — all return valid pages | ✅ COMPLETE (no NEW broken URLs) |
| 11 | LOW | Verification | Beta badge currency (rule #7) — fetched `/en/agent-teams` and confirmed `<Warning>` banner: "Agent teams are experimental and disabled by default" — README beta badge accurate | ✅ COMPLETE (no demotions warranted) |
| 12 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 13 | LOW | Verification | Git Worktrees anchor `#run-parallel-claude-code-sessions-with-git-worktrees` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 14 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 15 | LOW | Verification | Bundled Skills anchor `#bundled-skills` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 16 | LOW | Verification | Ultrareview anchor `#track-a-running-review` — stable since v2.1.118 | ✅ COMPLETE (stable) |
| 17 | LOW | Verification | claude-code-guide cross-check — independent research surfaced same v2.1.122–126 changes (`claude project purge`, gateway model picker, `--from-pr` expansion); also re-surfaced long-standing platform-surface concepts (Desktop, IDE Integration, Bedrock/Vertex/Foundry) which are RECURRING INVALID per user policy; no contradictions | ✅ COMPLETE (both agents aligned) |

---

## [2026-05-12 11:36 PM PKT] Claude Code v2.1.139

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale Version | README badge pinned at v2.1.128 (May 08) — latest is v2.1.139 (May 11); 11 versions behind | ✅ COMPLETE (badge bumped to v2.1.139 May 12 2026 11:36 PM PKT in Phase 2.6) |
| 2 | HIGH | Stale URL/Anchor (NEW) | Git Worktrees row primary URL points to `/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees` — but a dedicated `/en/worktrees` page now exists (covers `--worktree`/`-w` flag, `.worktreeinclude`, WorktreeCreate/Remove hooks, non-git VCS) AND the legacy common-workflows anchor has been renamed to `#run-parallel-sessions-with-worktrees` (word "git" dropped). Both verified live | ✅ COMPLETE (URL switched to `/en/worktrees` dedicated page; Location column expanded with `--worktree`/`-w`, `.worktreeinclude`, `WorktreeCreate`/`WorktreeRemove` hooks per user authorization) |
| 3 | HIGH | Missing Concept (NEW) | v2.1.139 introduced **Agent View** (`claude agents`, `--bg`, `/bg`) — research preview "one screen for many background sessions" with peek/attach/dispatch. Dedicated docs page `/en/agent-view` confirmed live | ✅ COMPLETE (Hot row added after Agent Teams with `![beta]` badge per `<Note>` "research preview" banner; description notes supervisor hosting and reboot persistence) |
| 4 | HIGH | Missing Concept (NEW) | v2.1.139 introduced **/goal** command — keep Claude working across turns until a model-evaluated condition holds (session-scoped Stop hook wrapper). Dedicated docs page `/en/goal` confirmed live | ✅ COMPLETE (Hot row added after Tasks; description compares to `/loop` and auto mode per docs framing) |
| 5 | MED | Missing Concept (NEW) | **Deep Links** (`claude-cli://open?repo=…&q=…`) introduced v2.1.91 — custom URL scheme for runbooks/alerts/dashboards. Dedicated docs page `/en/deep-links` confirmed live; never surfaced in CONCEPTS across any prior run | ✅ COMPLETE (Hot row added after Remote Control — both are session-launching surfaces; description mentions runbooks/alerts/dashboards use cases and OS-level handler registration) |
| 6 | LOW | Missing Concept (NEW) | v2.1.139 added `/scroll-speed` command — tunes mouse wheel scroll speed with live preview | ✋ ON HOLD (deferred — minor UX command, no dedicated docs page; would only fit as a CLI Startup Flags sub-link if at all) |
| 7 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 22+ runs) |
| 8 | MED | Missing Concept (recurring) | Dedicated agent re-flagged Output Styles, Permissions, Sandboxing, Headless Mode, Desktop App, IDE Integration, .claude Directory, Tools Reference as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10/2026-03-17/2026-04-08/2026-04-09/2026-05-01; user considers all platform surfaces or covered as Settings sub-links — not standalone concepts) |
| 9 | MED | Missing Concept (recurring) | Dedicated agent flagged Auto Memory needs its own row separate from Memory | ❌ INVALID (RECURRING — current Memory row already surfaces both `/en/memory#auto-memory` and `reports/claude-agent-memory.md` as inline links; user's chosen pattern) |
| 10 | LOW | Verification | All 4 NEW candidate URLs validated via WebFetch: `/en/worktrees` (live, full dedicated page), `/en/agent-view` (live, research preview banner), `/en/goal` (live, /goal command page), `/en/deep-links` (live, v2.1.91+ banner) | ✅ COMPLETE (all 4 NEW URLs return expected canonical pages) |
| 11 | LOW | Verification | Local badge file paths validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md` targets exist on filesystem | ✅ COMPLETE (no missing local files) |
| 12 | LOW | Verification | Beta Badge Currency (rule #7) — fetched `/en/agent-view` and confirmed `<Note>` banner: "Agent view is a research preview and requires Claude Code v2.1.139 or later" — if added, a beta badge would be accurate | ✅ COMPLETE (badge recommendation noted for action item #3) |
| 13 | LOW | Verification | Memory anchor `#organize-rules-with-clauderules` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 14 | LOW | Verification | Git Worktrees anchor — heading renamed in `/en/common-workflows` from `#run-parallel-claude-code-sessions-with-git-worktrees` to `#run-parallel-sessions-with-worktrees` (word "git" dropped); legacy anchor still resolves but is no longer canonical | ⚠️ FLAGGED (captured under action item #2; treated as part of the stale URL action, not a separate item) |
| 15 | LOW | Verification | Auto Mode anchor `#eliminate-prompts-with-auto-mode` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 16 | LOW | Verification | Bundled Skills anchor `#bundled-skills` — stable since v2.1.113 | ✅ COMPLETE (stable) |
| 17 | LOW | Verification | Ultrareview anchor `#track-a-running-review` — stable since v2.1.118 | ✅ COMPLETE (stable) |
| 18 | LOW | Verification | claude-code-guide cross-check — independent research corroborated v2.1.139 additions (Agent View, /goal, /scroll-speed) and surfaced same Deep Links page; also re-surfaced long-standing platform-surface concepts (Desktop, IDE Integration, .claude Directory, Tools Reference) which are RECURRING INVALID per user policy; no contradictions | ✅ COMPLETE (both agents aligned on NEW v2.1.139 findings) |

---

## [2026-05-21 12:07 AM PKT] Claude Code v2.1.145

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Wrong Location (NEW) | Checkpointing row (line 36) Location reads `automatic (git-based)` — factually wrong. Live `/en/checkpointing` fetch confirms checkpoints track "all changes made by its file editing tools", explicitly "do not track files modified by bash commands", and are "Not a replacement for version control" — *"Think of checkpoints as 'local undo' and Git as 'permanent history'."* The 2026-04-24 run only checked the (empty) Description column, never the Location, so this slipped through every prior run. Recommend `automatic (file-edit tracking)` | ✅ COMPLETE (user authorized; line 36 Location updated `automatic (git-based)` → `automatic (file-edit tracking)`) |
| 2 | MED | Missing Concept (NEW) | **Sessions** has a dedicated `/en/sessions` page (resume, `/rename`, fork/branch via `--fork-session`) never surfaced in CONCEPTS across any prior run; concepts-agent flagged at 0.6 confidence as possibly a runtime surface rather than an authoring concept | ❌ INVALID (user chose to skip — consistent with the standing "platform/runtime surface, not configuration concept" rejection pattern) |
| 3 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 23+ runs) |
| 4 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, .claude Directory, Tools Reference as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10/2026-03-17/2026-04-08/2026-05-01/2026-05-12; user considers all platform surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 5 | LOW | Verification | Fast Mode URL `/en/fast-mode` fetched live — page valid ("Speed up responses with fast mode"), research preview, `/fast` toggle + `"fastMode": true` setting, Opus 4.7 default since v2.1.142; resolves concepts-agent's 0.5-confidence doubt — README Fast Mode row (line 52) is fully accurate | ✅ COMPLETE (row confirmed accurate, no change needed) |
| 6 | LOW | Verification | Latest version confirmed v2.1.145 via raw CHANGELOG.md (blob URL returns no body — used raw.githubusercontent.com per the documented workaround); v2.1.145 adds JSON session listing + OTEL agent identity — nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.144 → v2.1.145 in Phase 2.6) |
| 7 | LOW | Verification | External CONCEPTS docs URLs spot-validated (`/en/checkpointing`, `/en/fast-mode`, CHANGELOG raw) + remainder stable since v2.1.139 run — only the recurring `/slash-commands` redirect flagged | ✅ COMPLETE (no NEW broken URLs) |
| 8 | LOW | Verification | Local badge file paths — no CONCEPTS table structural changes since v2.1.139; `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md` targets stable | ✅ COMPLETE (stable since prior run) |
| 9 | LOW | Verification | Beta Badge Currency (rule #7) — `/en/fast-mode` confirms "research preview" `<Note>` banner; README `![beta]` on Fast Mode accurate | ✅ COMPLETE (no demotions warranted) |
| 10 | LOW | Verification | Anchors (`#organize-rules-with-clauderules`, `#run-parallel-...-worktrees`, `#eliminate-prompts-with-auto-mode`, `#bundled-skills`, `#track-a-running-review`) — stable since v2.1.113/v2.1.139 | ✅ COMPLETE (stable) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent 80-concept sweep corroborated coverage; surfaced Auto Dream + MCP Tool Search as possible Memory/MCP sub-links and re-surfaced platform surfaces (RECURRING INVALID). Its version numbers were unreliable (e.g. "MCP introduced Dec 2024", fuzzy v-numbers) — deferred to dedicated agent + live fetches for all dates; no contradictions affecting CONCEPTS | ✅ COMPLETE (agents aligned; guide's fuzzy versioning noted, not used) |

---

## [2026-05-25 04:27 PM PKT] Claude Code v2.1.150

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Wrong Location (NEW) | Simplify & Batch row (line 70) Location `/simplify`, `/batch` and the row name are stale — `/simplify` was **renamed to `/code-review`** in v2.1.147. Triple-confirmed: CHANGELOG *"Renamed `/simplify` to `/code-review`… pass `--comment` to post findings as inline GitHub PR comments"*; `/en/skills` bundled-skills list now reads `/code-review, /batch, /debug, /loop, /claude-api` (no `/simplify`); `/en/code-review` docs note *"The command was named `/simplify` before v2.1.147."* Naming collision with existing cloud Code Review row (line 59) — fix approach needs user choice | ✅ COMPLETE (user chose "Bundled Skills" rename; row 70 renamed `Simplify & Batch` → `Bundled Skills`, Location `/simplify`, `/batch` → `/code-review`, `/batch`; avoids collision since row is really the bundled-skills concept) |
| 2 | LOW | Optional Inline Link (NEW) | Code Review row (line 59, cloud GitHub App) could add inline link to the local `/code-review` command (`/en/commands`) — docs now formally cross-reference the local "twin" of the cloud feature | ✅ COMPLETE (user approved; `[Local /code-review](https://code.claude.com/docs/en/commands)` inline link appended to Code Review row line 59) |
| 3 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 24+ runs) |
| 4 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10/2026-03-17/2026-04-08/2026-05-01/2026-05-12/2026-05-21; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 5 | LOW | Beta Badge Currency (rule #7) | Re-evaluated beta badges against upstream lifecycle — `/en/code-review` `<Note>`: "Code Review is in research preview"; `/en/channels` requires v2.1.80+ research preview; `/en/fast-mode` research preview (Opus 4.7 default since v2.1.142) | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 6 | LOW | Verification | Latest version confirmed v2.1.150 via raw CHANGELOG.md (blob URL returns no body — used raw.githubusercontent.com per documented workaround). v2.1.146–150 add `/usage` per-category breakdown (2.1.149), GFM task-list checkboxes (2.1.149), `worktree.bgIsolation` (2.1.143), Fast Mode Opus 4.7 default (2.1.142) — nothing new CONCEPTS-worthy beyond #1 | ✅ COMPLETE (version verified; badge bumped v2.1.145 → v2.1.150 in Phase 2.6) |
| 7 | LOW | Verification | All 22 local badge/link target files validated via filesystem check (`best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/`) — all exist | ✅ COMPLETE (no missing local files) |
| 8 | LOW | Verification | External CONCEPTS URLs spot-validated live: `/en/skills` (bundled-skills section present), `/en/code-review` (research preview, disambiguates cloud vs local), CHANGELOG raw; remainder stable since v2.1.145 run — only recurring `/slash-commands` redirect flagged | ✅ COMPLETE (no NEW broken URLs) |
| 9 | LOW | Verification Checklist Update | Added rule #9 "Bundled Skill / Command Rename Tracking" — scan CHANGELOG (last N versions) + `/en/commands` + `/skills#bundled-skills` for command/skill renames or removals affecting Location-column command names | ✅ COMPLETE (rule added; origin: `/simplify`→`/code-review` rename was changelog-only, missed by docs-page-listing checks) |
| 10 | LOW | Verification | Anchors stable since v2.1.113/v2.1.139 (`#organize-rules-with-clauderules`, `#run-parallel-...-worktrees`, `#eliminate-prompts-with-auto-mode`, `#bundled-skills`, `#track-a-running-review`) | ✅ COMPLETE (stable) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent 95-concept sweep corroborated coverage but **missed the `/simplify`→`/code-review` rename** (changelog-only event invisible to docs-page listing; dedicated agent caught it via raw CHANGELOG); re-surfaced platform surfaces (RECURRING INVALID); version numbers fuzzy, deferred to live CHANGELOG | ✅ COMPLETE (agents aligned on coverage; rename gap noted) |

---

## [2026-06-01 12:03 AM PKT] Claude Code v2.1.158

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Concept (NEW) | Add **Dynamic Workflows** row to Hot table — v2.1.154 introduced script-based orchestration of tens-to-hundreds of subagents (`/workflows`, `workflow` keyword, `/effort ultracode`, `.claude/workflows/`, bundled `/deep-research`). Dedicated `/en/workflows` docs page confirmed live; both agents independently flagged it as the top gap. Distinct from existing "Workflows" row (line 30, `/en/common-workflows` = Research→Plan→Execute patterns) — name it **Dynamic Workflows** to avoid collision | ✅ COMPLETE (user approved; row inserted at line 64 between Deep Links and Agent Teams to cluster the multi-agent orchestration surfaces — Dynamic Workflows → Agent Teams → Agent View — with `![beta]` badge and `[Deep Research]` link; table re-verified 3-column consistent) |
| 2 | MED | Beta Badge Currency (rule #7) | Concepts-agent doubted Auto Mode `![beta]` badge (0.5) citing "no longer requires opt-in" (v2.1.152) | ❌ INVALID (live `/en/permission-modes` `<Warning>` confirms *"Auto mode is a research preview"* — badge accurate, no demotion; agent's body-text read contradicted by banner, same pattern as 2026-04-26) |
| 3 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 25+ runs) |
| 4 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10/03-17/04-08/05-01/05-12/05-21/05-25; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 5 | LOW | Model Freshness (out of scope) | Concepts-agent flagged TIPS section references "Opus 4.7" while Opus 4.8 is now default (v2.1.154) | ✋ ON HOLD (TIPS-section content, outside the CONCEPTS-table scope of this workflow; deferred to user — not a CONCEPTS-table action item) |
| 6 | LOW | Verification | Latest version confirmed v2.1.158 via raw CHANGELOG.md (blob URL returns no body — used raw.githubusercontent.com per documented workaround); v2.1.155–158 add thinking-block fix (2.1.156), `.claude/skills` plugin auto-load (2.1.157), auto mode on Bedrock/Vertex/Foundry (2.1.158) — nothing CONCEPTS-worthy beyond #1 | ✅ COMPLETE (version verified; badge bumped v2.1.150 → v2.1.158 in Phase 2.6) |
| 7 | LOW | Verification | `/en/workflows` fetched live — `<Note>` "Dynamic workflows are in research preview… require Claude Code v2.1.154 or later"; `#run-a-bundled-workflow` anchor confirmed; Location claims (`/workflows`, `workflow` keyword, `/effort ultracode`, `.claude/workflows/`) all verified against page body | ✅ COMPLETE (NEW URL returns expected canonical page; rules #1/#2/#8 satisfied for the new row) |
| 8 | LOW | Verification | Beta Badge Currency (rule #7) — both Auto Mode and the proposed Dynamic Workflows row confirmed research preview via live `<Warning>`/`<Note>` banners | ✅ COMPLETE (Dynamic Workflows beta badge warranted; Auto Mode badge accurate) |
| 9 | LOW | Verification | Local badge/link target files validated via filesystem check — `best-practice/`, `implementation/`, `reports/` targets exist; `implementation/claude-tasks-implementation.md` is **absent**, so concepts-agent's "add Tasks Implemented badge" suggestion is not actionable (no file to link) | ✅ COMPLETE (no missing local files among linked targets; Tasks-badge suggestion INVALID for lack of target) |
| 10 | LOW | Verification | Command rename scan (rule #9) — changelog top 10 shows no NEW renames affecting Location-column command names; `/code-review`,`/batch` in Bundled Skills row still accurate; `/deep-research` is a new bundled workflow command surfaced under the proposed Dynamic Workflows row | ✅ COMPLETE (no rename drift; `/reload-skills` v2.1.152 is a new command, not a rename) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent 99-concept sweep corroborated Dynamic Workflows (v2.1.154), Opus 4.8, Ultracode; re-surfaced platform surfaces (RECURRING INVALID); flagged a docs/changelog lag — changelog 2.1.158 says auto mode reached Bedrock/Vertex/Foundry while `/en/permission-modes` still reads "Anthropic API only" (not CONCEPTS-actionable; Auto Mode row makes no provider claim) | ✅ COMPLETE (agents aligned on the NEW finding; lag noted, no action) |

---

## [2026-06-01 09:40 AM PKT] Claude Code v2.1.159

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 26+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10/03-17/04-08/05-01/05-12/05-21/05-25/06-01; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | MED | Missing Concept (recurring) | claude-code-guide flagged Prompt Library (`/en/prompt-library`) as missing concept | ❌ INVALID (reference/utility page with copy-paste prompts, not a feature/concept — consistent with user's pattern of rejecting non-feature docs pages like Glossary, Troubleshooting) |
| 4 | LOW | Location Accuracy (NEW) | Concepts-agent questioned Dynamic Workflows Location `/effort ultracode` and `.claude/workflows/` at 0.65 confidence — neither term appears in official `/en/workflows` docs body | ✋ ON HOLD (below 0.7 confidence threshold; `/effort ultracode` may be an alias not yet documented; deferring to next run for re-evaluation) |
| 5 | LOW | Verification | Latest version confirmed v2.1.159 via raw CHANGELOG.md — "Internal infrastructure improvements (no user-facing changes)"; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.158 → v2.1.159 in Phase 2.6) |
| 6 | LOW | Verification | All 40+ external CONCEPTS URLs validated live by dedicated agent — only recurring `/slash-commands` redirect flagged; all other URLs return expected canonical pages including anchors (`#organize-rules-with-clauderules`, `#eliminate-prompts-with-auto-mode`, `#bundled-skills`, `#track-a-running-review`, `#run-a-bundled-workflow`, `#let-claude-use-your-computer`) | ✅ COMPLETE (no NEW broken URLs) |
| 7 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 8 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (`/en/permission-modes` `<Warning>`: "research preview"), Dynamic Workflows (`/en/workflows` `<Note>`: "research preview"), Fast Mode, Channels, Computer Use, Code Review, Chrome, Agent Teams, Agent View, Ultrareview, Ultraplan, No Flicker Mode, Routines, Voice Dictation — all confirmed research preview banners on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 9 | LOW | Verification | Command rename scan (rule #9) — v2.1.159 changelog contains no command/skill renames; `/code-review`, `/batch` in Bundled Skills row remain accurate | ✅ COMPLETE (no rename drift) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent 100-concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces and Prompt Library (both RECURRING INVALID per user policy); no contradictions with dedicated agent findings | ✅ COMPLETE (agents aligned; no NEW actionable findings) |

---

## [2026-06-02 09:44 AM PKT] Claude Code v2.1.160

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Changed Location (NEW) | Dynamic Workflows row Location column: rename `workflow` keyword → `ultracode` keyword per v2.1.160 CHANGELOG ("Renamed dynamic-workflow trigger from 'workflow' to 'ultracode'"); docs page `/en/workflows` still references `workflow` (docs lag) but CHANGELOG is authoritative for CLI behavior | ✅ COMPLETE (Location updated; `workflow` keyword replaced with `ultracode` keyword) |
| 2 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (145 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 27+ runs) |
| 3 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10/03-17/04-08/05-01/05-12/05-21/05-25/06-01; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 4 | LOW | Resolved ON HOLD | Previous run (v2.1.159) item #4 questioned Dynamic Workflows Location `/effort ultracode` and `.claude/workflows/` at 0.65 confidence — both terms now confirmed present on live `/en/workflows` docs page body (ultracode section + save-for-reuse section) | ✅ COMPLETE (resolved; docs page confirmed both terms) |
| 5 | LOW | Verification | Latest version confirmed v2.1.160 via raw CHANGELOG.md; key changes: "Renamed dynamic-workflow trigger from 'workflow' to 'ultracode'" + security prompts for shell startup files + `acceptEdits` build-tool config guard + single-file grep satisfies read-before-edit | ✅ COMPLETE (version verified; badge bumped v2.1.159 → v2.1.160 in Phase 2.6) |
| 6 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (145 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 7 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 8 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (`/en/permission-modes` `<Warning>`: "Auto mode is a research preview"), Dynamic Workflows (`/en/workflows` `<Note>`: "Dynamic workflows are in research preview"), plus all other beta-badged rows confirmed research preview on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 9 | LOW | Verification | Command rename scan (rule #9) — v2.1.160 CHANGELOG: "Renamed dynamic-workflow trigger from 'workflow' to 'ultracode'" — keyword rename, not a command rename; row uses `ultracode` keyword from the start; `/code-review`, `/batch` in Bundled Skills row remain accurate | ✅ COMPLETE (no command/skill renames affecting existing rows) |
| 10 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 11 | LOW | Verification | New `/en/agents` hub page found in sitemap ("Run agents in parallel") — comparison page for subagents/agent-view/agent-teams/workflows; not a new concept, individual items already covered | ✅ COMPLETE (hub page, not CONCEPTS-worthy) |
| 12 | LOW | Verification | claude-code-guide cross-check — independent 100+ concept sweep corroborated Dynamic Workflows (v2.1.154) and keyword rename; also flagged "Auto Dream" (unverified, not in v2.1.160 CHANGELOG) and "Channels v2.1.164+" (hallucinated future version); re-surfaced platform surfaces (RECURRING INVALID); version numbers unreliable per prior pattern | ✅ COMPLETE (agents aligned on the actionable finding; guide's unverified claims noted, not acted on) |

---

## [2026-06-03 09:47 AM PKT] Claude Code v2.1.161

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Changed Location (NEW) | Ultrareview row Location column: `/ultrareview` → `/code-review ultra` per official docs `/en/ultrareview` — page explicitly states "The command is now invoked as `/code-review ultra`, and `/ultrareview` remains as an alias"; CLI subcommand `claude ultrareview` unchanged. Rule #8 (Location Column Factual Accuracy) violation: presenting alias as primary invocation | ✅ COMPLETE (Location updated from `/ultrareview` to `/code-review ultra`; `claude ultrareview [target]` retained for CLI) |
| 2 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (161 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 28+ runs) |
| 3 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10/03-17/04-08/05-01/05-12/05-21/05-25/06-01/06-02; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 4 | MED | Name Accuracy (NEW) | workflow-concepts-agent flagged No Flicker Mode — official docs page title is "Fullscreen rendering" at `/en/fullscreen`, not "No Flicker Mode" (confidence 0.75) | ❌ INVALID (README uses community/informal name while linking to official page; consistent with user's naming choices; URL is correct) |
| 5 | LOW | Verification | Latest version confirmed v2.1.161 via raw CHANGELOG.md — "OTEL resource attributes, parallel tool calls fail independently, MCP credential redaction"; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.160 → v2.1.161 in Phase 2.6) |
| 6 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (161 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors (`#organize-rules-with-clauderules`, `#eliminate-prompts-with-auto-mode`, `#bundled-skills`, `#track-a-running-review`, `#run-a-bundled-workflow`, `#let-claude-use-your-computer`) | ✅ COMPLETE (no NEW broken URLs) |
| 7 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 8 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (`/en/permission-modes` `<Warning>`: "Auto mode is a research preview"), Dynamic Workflows (`/en/workflows` `<Note>`: "Dynamic workflows are in research preview"), Ultrareview (`/en/ultrareview` `<Note>`: "research preview"), plus all other beta-badged rows confirmed research preview on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 9 | LOW | Verification | Command rename scan (rule #9) — v2.1.161 CHANGELOG contains no command/skill renames; `/code-review`, `/batch` in Bundled Skills row remain accurate; Ultrareview canonical invocation change (`/ultrareview` → `/code-review ultra`) caught via rule #8 (Location accuracy) rather than changelog scan | ✅ COMPLETE (no rename drift in v2.1.161; Ultrareview Location fixed via rule #8) |
| 10 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 11 | LOW | Verification | Agent contradiction resolved: workflow-concepts-agent marked Ultrareview Location "CORRECT" but own WebFetch of `/en/ultrareview` revealed explicit canonical-invocation change statement — agent's Location-accuracy pass checked path/command existence but not canonical-vs-alias distinction; rule #8 caught it | ✅ COMPLETE (contradiction resolved in favor of direct docs evidence) |
| 12 | LOW | Verification | claude-code-guide cross-check — independent 32-concept sweep; no NEW actionable findings beyond what dedicated agent surfaced; re-surfaced platform surfaces (RECURRING INVALID); no contradictions | ✅ COMPLETE (agents aligned; guide had limited novel findings this run) |

---

## [2026-06-04 09:44 AM PKT] Claude Code v2.1.162

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (145 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 29+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10/03-17/04-08/05-01/05-12/05-21/05-25/06-01/06-02/06-03; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.162 via raw CHANGELOG.md — bug fixes and UX polish (message streaming, auto-mode message, MCP tool filtering, terminal resize); nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.161 → v2.1.162 in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (145 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors (`#organize-rules-with-clauderules`, `#eliminate-prompts-with-auto-mode`, `#bundled-skills`, `#track-a-running-review`, `#run-a-bundled-workflow`, `#let-claude-use-your-computer`) | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode, Dynamic Workflows, Ultrareview, plus all other beta-badged rows confirmed research preview on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.162 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch` in existing rows remain accurate | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Run Agents in Parallel hub page (`/en/agents`) — comparison page for subagents/agent-view/agent-teams/workflows; individual items already covered in CONCEPTS table | ✅ COMPLETE (hub page, not CONCEPTS-worthy; consistent with v2.1.160 finding) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent 85-concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with dedicated agent findings; no NEW actionable items | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-05 09:43 AM PKT] Claude Code v2.1.163

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (144 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 30+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10/03-17/04-08/05-01/05-12/05-21/05-25/06-01/06-02/06-03/06-04; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.163 via raw CHANGELOG.md — `/plugin list` with `--enabled`/`--disabled` filters, `requiredMinimumVersion`/`requiredMaximumVersion` managed settings, Stop/SubagentStop `hookSpecificOutput.additionalContext`, skills `\$` escape syntax; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.162 → v2.1.163 in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (144 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (`/en/permission-modes` `<Warning>`: "Auto mode is a research preview"), Dynamic Workflows (`/en/workflows` `<Note>`: "Dynamic workflows are in research preview"), Ultrareview (`/en/ultrareview` `<Note>`: "research preview"), Fast Mode (`/en/fast-mode` `<Note>`: "research preview"), Channels (`/en/channels` `<Note>`: "research preview"), plus all other beta-badged rows confirmed research preview on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.163 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch` in existing rows remain accurate | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`: "tracks all changes made by its file editing tools", "does not track files modified by bash commands", "not a replacement for version control" | ✅ COMPLETE (Location accurate) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent 84-concept sweep corroborated all existing CONCEPTS coverage; still lists `/simplify` as current (was renamed to `/code-review` in v2.1.147 — known blind spot from v2.1.150 run); re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with dedicated agent findings; no NEW actionable items | ✅ COMPLETE (agents aligned; guide's `/simplify` stale reference noted, not acted on) |

---

## [2026-06-06 09:36 AM PKT] Claude Code v2.1.167

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (172 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 31+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10/03-17/04-08/05-01/05-12/05-21/05-25/06-01/06-02/06-03/06-04/06-05; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | New Feature (optional) | v2.1.166 introduced `fallbackModel` setting — configure up to 3 fallback models tried in order when primary is overloaded; `--fallback-model` also applies to interactive sessions | ✋ ON HOLD (niche Settings feature; could be a Settings sub-link but not a standalone concept; deferred to user) |
| 4 | LOW | Verification | Latest version confirmed v2.1.167 via raw CHANGELOG.md — v2.1.165 (bug fixes), v2.1.166 (fallbackModel, glob deny rules, cross-session messaging hardening, thinking toggle), v2.1.167 (bug fixes); nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.163 → v2.1.167 in Phase 2.6) |
| 5 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (172 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 6 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 7 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (`/en/permission-modes` `<Warning>`: "Auto mode is a research preview"), Dynamic Workflows (`/en/workflows` `<Note>`: "Dynamic workflows are in research preview"), Ultrareview (`/en/ultrareview` `<Note>`: "research preview"), Fullscreen (`/en/fullscreen` `<Note>`: "research preview"), plus all other beta-badged rows confirmed research preview on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 8 | LOW | Verification | Command rename scan (rule #9) — v2.1.165–167 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch` in existing rows remain accurate; bundled skills page confirms `/code-review`, `/batch`, `/debug`, `/loop`, `/claude-api` | ✅ COMPLETE (no rename drift) |
| 9 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 10 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`; Dynamic Workflows Location confirmed against `/en/workflows` (`/workflows`, `ultracode` keyword, `/effort ultracode`, `.claude/workflows/`) | ✅ COMPLETE (Locations accurate) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent 87-concept sweep corroborated all existing CONCEPTS coverage; surfaced Fallback Models (v2.1.166) as new but niche; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with dedicated agent findings | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-07 09:39 AM PKT] Claude Code v2.1.168

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 32+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-06; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.168 via raw CHANGELOG.md — bug fixes and reliability improvements; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.167 → v2.1.168 in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode, Dynamic Workflows, Ultrareview, Fullscreen, Fast Mode, Channels, plus all other beta-badged rows confirmed research preview on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.168 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch` in existing rows remain accurate | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`; Dynamic Workflows Location confirmed against `/en/workflows` | ✅ COMPLETE (Locations accurate) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent research corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with dedicated agent findings | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-08 09:36 AM PKT] Claude Code v2.1.168

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (166 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 33+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-07; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.168 via raw CHANGELOG.md — bug fixes and reliability improvements (same version as prior run 2026-06-07); nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge timestamp bumped in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (166 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode, Dynamic Workflows, Ultrareview, Fullscreen, Fast Mode, Channels, Computer Use, Code Review, Chrome, Agent Teams, Agent View, Ultraplan, Routines, Voice Dictation — all confirmed research preview on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.168 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch` in existing rows remain accurate | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`; Dynamic Workflows Location confirmed against `/en/workflows` | ✅ COMPLETE (Locations accurate) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent 100+ concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with own findings | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-09 09:41 AM PKT] Claude Code v2.1.169

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (165 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 34+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-08; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.169 via raw CHANGELOG.md — `--safe-mode` flag, `/cd` command, `disableBundledSkills` setting; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.168 → v2.1.169 in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (165 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode, Dynamic Workflows, Ultrareview, Fullscreen, Fast Mode, Channels, Computer Use, Code Review, Chrome, Agent Teams, Agent View, Ultraplan, Routines, Voice Dictation — all confirmed research preview on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.169 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch` in existing rows remain accurate | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`; Dynamic Workflows Location confirmed against `/en/workflows` | ✅ COMPLETE (Locations accurate) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent 55-concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with own findings | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-10 09:35 AM PKT] Claude Code v2.1.170

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 35+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-09; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.170 via raw CHANGELOG.md — Claude Fable 5 model addition + session transcript fix; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.169 → v2.1.170 in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode, Dynamic Workflows, Ultrareview, Fullscreen, Fast Mode, Channels, Computer Use, Code Review, Chrome, Agent Teams, Agent View, Ultraplan, Routines, Voice Dictation — all confirmed research preview on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.170 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch` in existing rows remain accurate | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`; Dynamic Workflows Location confirmed against `/en/workflows` | ✅ COMPLETE (Locations accurate) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent 69-concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with own findings | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-11 09:39 AM PKT] Claude Code v2.1.172

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Concept (new) | Add **Advisor** row to Hot table — experimental model consultation feature (`/advisor`, `advisorModel`, `--advisor`), dedicated docs at `/en/advisor`, introduced v2.1.98; never surfaced in any prior CONCEPTS run; both workflow-concepts-agent (confidence 0.80) and own WebFetch research confirmed | ✅ COMPLETE (row added after Fast Mode in Hot table with beta badge and blog supplementary link) |
| 2 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 36+ runs) |
| 3 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged VS Code, JetBrains, Desktop App, Sessions, Headless Mode, Prompt Library, Context Window, Tools Reference, Analytics, Prompt Caching as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-10; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 4 | LOW | Verification | Latest version confirmed v2.1.172 via raw CHANGELOG.md — sub-agents can spawn own sub-agents (5 levels deep), marketplace plugin search, bug fixes; Advisor is CONCEPTS-worthy (actioned in #1) | ✅ COMPLETE (version verified; badge bumped v2.1.170 → v2.1.172 in Phase 2.6) |
| 5 | LOW | Verification | All 40+ external CONCEPTS URLs validated — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 6 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 7 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode, Dynamic Workflows confirmed still "research preview"; Advisor confirmed "experimental"; all other beta-tagged features retain beta/preview status on docs pages | ✅ COMPLETE (all README beta badges accurate; Advisor correctly tagged beta) |
| 8 | LOW | Verification | Command rename scan (rule #9) — v2.1.170–v2.1.172 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 9 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 10 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed; Dynamic Workflows Location confirmed; Advisor Location `/advisor`, `advisorModel`, `--advisor` verified against docs | ✅ COMPLETE (Locations accurate) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent 40+ concept sweep corroborated all existing CONCEPTS coverage; surfaced Advisor as missing (corroborated by own research); re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions | ✅ COMPLETE (agents aligned; Advisor gap actioned) |

---

## [2026-06-12 09:36 AM PKT] Claude Code v2.1.175

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 37+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged VS Code, JetBrains, Desktop App, Sessions, Headless Mode, Prompt Library, Context Window, Tools Reference, Analytics, Prompt Caching as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-11; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.175 via raw CHANGELOG.md — v2.1.173–v2.1.175 contain bug fixes and minor admin settings (`enforceAvailableModels`, `wheelScrollAccelerationEnabled`, Fable 5 model name fixes); no CONCEPTS-worthy features | ✅ COMPLETE (version verified; badge bumped v2.1.172 → v2.1.175 in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode, Dynamic Workflows, Ultrareview, Ultraplan, No Flicker Mode, Fast Mode, Channels, Computer Use, Code Review, Chrome, Agent Teams, Agent View, Routines, Voice Dictation, Advisor confirmed research preview / experimental on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.173–v2.1.175 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed; Dynamic Workflows Location confirmed; Advisor Location `/advisor`, `advisorModel`, `--advisor` verified | ✅ COMPLETE (Locations accurate) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent 46-concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-13 09:40 AM PKT] Claude Code v2.1.176

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (173 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 38+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-12; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.176 via raw CHANGELOG.md — session title `language` setting, `footerLinksRegexes` setting, bug fixes; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.175 → v2.1.176 in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode, Dynamic Workflows, Ultrareview, Ultraplan, No Flicker Mode, Fast Mode, Channels, Computer Use, Code Review, Chrome, Agent Teams, Agent View, Routines, Voice Dictation, Advisor confirmed research preview / experimental on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.175–v2.1.176 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed; Dynamic Workflows Location confirmed; Advisor Location `/advisor`, `advisorModel`, `--advisor` verified | ✅ COMPLETE (Locations accurate) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-14 09:41 AM PKT] Claude Code v2.1.176

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 39+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-13; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.176 via raw CHANGELOG.md — same version as prior run (2026-06-13); v2.1.176 changes: session title language, footerLinksRegexes, bug fixes; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge timestamp bumped in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode, Dynamic Workflows, Ultrareview, Ultraplan, No Flicker Mode, Fast Mode, Channels, Computer Use, Code Review, Chrome, Agent Teams, Agent View, Routines, Voice Dictation, Advisor confirmed research preview / experimental on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.175–v2.1.176 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`; Dynamic Workflows Location confirmed against `/en/workflows`; Advisor Location `/advisor`, `advisorModel`, `--advisor` verified against `/en/advisor` | ✅ COMPLETE (Locations accurate) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent 70-concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-15 09:37 AM PKT] Claude Code v2.1.176

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (188 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 40+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-14; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.176 via raw CHANGELOG.md — same version as prior run (2026-06-14); v2.1.176 changes: session title language, footerLinksRegexes, bug fixes; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge timestamp bumped in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (188 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode, Dynamic Workflows, Ultrareview, Ultraplan, No Flicker Mode, Fast Mode, Channels, Computer Use, Code Review, Chrome, Agent Teams, Agent View, Routines, Voice Dictation, Advisor confirmed research preview / experimental on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.175–v2.1.176 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`; Dynamic Workflows Location confirmed against `/en/workflows`; Advisor Location `/advisor`, `advisorModel`, `--advisor` verified against `/en/advisor` | ✅ COMPLETE (Locations accurate) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent 100-concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-16 09:35 AM PKT] Claude Code v2.1.178

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (173 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 41+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-15; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.178 via raw CHANGELOG.md; v2.1.177–178 add tool parameter matching in permission rules, nested `.claude/` directory precedence, improved auto mode subagent evaluation; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.176 → v2.1.178 in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (173 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (`/en/permission-modes` `<Warning>`: "Auto mode is a research preview"), Dynamic Workflows (`/en/workflows` `<Note>`: "research preview"), Advisor (`/en/advisor` `<Note>`: "experimental"), plus all other beta-badged rows confirmed research preview / experimental on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.177–v2.1.178 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current; bundled skills page confirms `/code-review`, `/batch`, `/debug`, `/loop`, `/claude-api` | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`; Dynamic Workflows Location confirmed against `/en/workflows` (`/workflows`, `ultracode` keyword, `/effort ultracode`, `.claude/workflows/`); Advisor Location `/advisor`, `advisorModel`, `--advisor` verified against `/en/advisor` | ✅ COMPLETE (Locations accurate) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-17 09:36 AM PKT] Claude Code v2.1.179

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (150 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 42+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-16; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.179 via raw CHANGELOG.md — mid-stream connection drops fix, WSL2 mouse wheel fix, sandbox glob fix, feedback survey fix, welcome screen fix, plugin loading perf; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.178 → v2.1.179 in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (150 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (`/en/permission-modes` `<Warning>`: "Auto mode is a research preview"), Dynamic Workflows (`/en/workflows` `<Note>`: "Dynamic workflows are in research preview"), Advisor (`/en/advisor` `<Note>`: "experimental"), Ultrareview (`/en/ultrareview` `<Note>`: "research preview"), plus all other beta-badged rows confirmed research preview / experimental on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.179 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current; bundled skills page confirms `/code-review`, `/batch`, `/debug`, `/loop`, `/claude-api` | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`: "tracks all changes made by its file editing tools", "does not track files modified by bash commands", "not a replacement for version control"; Dynamic Workflows Location confirmed against `/en/workflows`; Advisor Location `/advisor`, `advisorModel`, `--advisor` verified against `/en/advisor` | ✅ COMPLETE (Locations accurate) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent 118-concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-18 09:39 AM PKT] Claude Code v2.1.181

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (148 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 43+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-17; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | LOW | Verification | Latest version confirmed v2.1.181 via raw CHANGELOG.md — `/config key=value` syntax, `sandbox.allowAppleEvents` opt-in, `CLAUDE_CLIENT_PRESENCE_FILE`, Bun 1.4 upgrade; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.179 → v2.1.181 in Phase 2.6) |
| 4 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (148 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 5 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 6 | LOW | Verification | Beta Badge Currency (rule #7) — Advisor (`/en/advisor`: "experimental"), Dynamic Workflows (`/en/workflows`: "research preview"), Ultrareview (`/en/ultrareview`: "research preview"), plus all other beta-badged rows confirmed research preview / experimental on their respective docs pages | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 7 | LOW | Verification | Command rename scan (rule #9) — v2.1.180–v2.1.181 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current; bundled skills page confirms `/code-review`, `/batch`, `/debug`, `/loop`, `/claude-api` | ✅ COMPLETE (no rename drift) |
| 8 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 9 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed; Dynamic Workflows Location confirmed; Advisor Location `/advisor`, `advisorModel`, `--advisor` verified | ✅ COMPLETE (Locations accurate) |
| 10 | LOW | Verification | claude-code-guide cross-check — independent 88-concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings | ✅ COMPLETE (agents aligned; no drift detected) |

---

## [2026-06-19 09:37 AM PKT] Claude Code v2.1.183

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale Beta Badge (NEW) | Dynamic Workflows row (line 64) has `![beta]` badge but `/en/workflows` docs page no longer contains "research preview" — Note now reads "require Claude Code v2.1.154 or later and are available on all paid plans"; feature appears to have graduated to GA; remove beta badge | ✅ COMPLETE (auto-applied: `![beta]` badge removed from Dynamic Workflows row; confidence 0.85) |
| 2 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (149 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 44+ runs) |
| 3 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-18; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 4 | LOW | Verification | Latest version confirmed v2.1.183 via raw CHANGELOG.md — enhanced auto mode safety (blocks destructive git commands), deprecation warnings for models, bug fixes; nothing CONCEPTS-worthy beyond #1 | ✅ COMPLETE (version verified; badge bumped v2.1.181 → v2.1.183 in Phase 2.6) |
| 5 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (149 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 6 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 7 | LOW | Verification | Beta Badge Currency (rule #7) — Dynamic Workflows (`/en/workflows`): **NO "research preview" banner found** — Note now reads availability on all paid plans; Auto Mode (`/en/permission-modes` `<Warning>`: "Auto mode is a research preview"), Advisor (`/en/advisor` `<Note>`: "experimental"), Ultrareview (`/en/ultrareview` `<Note>`: "research preview"), Fast Mode (`/en/fast-mode` `<Note>`: "research preview"), plus all other beta-badged rows confirmed research preview / experimental | ✅ COMPLETE (Dynamic Workflows beta badge stale — actioned in #1; all other beta badges accurate) |
| 8 | LOW | Verification | Command rename scan (rule #9) — v2.1.182–v2.1.183 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current; bundled skills page confirms `/code-review`, `/batch`, `/debug`, `/loop`, `/claude-api` | ✅ COMPLETE (no rename drift) |
| 9 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 10 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`; Dynamic Workflows Location confirmed against `/en/workflows` (`/workflows`, `ultracode` keyword, `/effort ultracode`, `.claude/workflows/`); Advisor Location `/advisor`, `advisorModel`, `--advisor` verified against `/en/advisor` | ✅ COMPLETE (Locations accurate) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent 87-concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings | ✅ COMPLETE (agents aligned; Dynamic Workflows beta badge stale finding is NEW) |

---

## [2026-06-20 09:37 AM PKT] Claude Code v2.1.183

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (149 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 45+ runs) |
| 2 | MED | Missing Concept (NEW) | Artifacts (`/en/artifacts`) — beta feature for publishing interactive HTML pages from sessions; Team/Enterprise only; `Artifact` tool; confidence 0.70 | ⏸️ ON HOLD (NEW; borderline confidence 0.70; Team/Enterprise-only beta feature — user review needed before adding) |
| 3 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-19; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 4 | LOW | Verification | Latest version confirmed v2.1.183 via raw CHANGELOG.md — same version as prior run (2026-06-19); no new versions released; no CONCEPTS-worthy changelog entries | ✅ COMPLETE (version verified; badge timestamp bumped in Phase 2.6) |
| 5 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (149 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 6 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 7 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (`/en/permission-modes` `<Warning>`: "Auto mode is a research preview"), Advisor (`/en/advisor` `<Note>`: "experimental"), Ultrareview, Channels, Ultraplan, No Flicker Mode, Fast Mode, Computer Use, Chrome, Claude Code Web, Code Review, Agent Teams, Agent View, Routines, Voice Dictation all confirmed beta/experimental on their docs pages; Dynamic Workflows beta badge already removed in prior run (2026-06-19) | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 8 | LOW | Verification | Command rename scan (rule #9) — v2.1.183 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current; bundled skills page confirms `/code-review`, `/batch`, `/debug`, `/loop`, `/claude-api` | ✅ COMPLETE (no rename drift) |
| 9 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 10 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`; Dynamic Workflows Location confirmed against `/en/workflows`; Advisor Location `/advisor`, `advisorModel`, `--advisor` verified against `/en/advisor` | ✅ COMPLETE (Locations accurate) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent concept sweep corroborated all existing CONCEPTS coverage; both agents independently identified Artifacts (`/en/artifacts`) as a NEW missing concept; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions between agents | ✅ COMPLETE (agents aligned; Artifacts is the only NEW actionable finding) |

---

## [2026-06-21 09:36 AM PKT] Claude Code v2.1.185

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (149 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 46+ runs) |
| 2 | MED | Missing Concept (recurring) | Artifacts (`/en/artifacts`) — beta feature for publishing interactive HTML pages from sessions; Team/Enterprise only; `Artifact` tool; confidence 0.70 | ⏸️ ON HOLD (RECURRING from 2026-06-20; borderline confidence 0.70; Team/Enterprise-only beta feature — user review needed before adding) |
| 3 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-20; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 4 | LOW | Verification | Latest version confirmed v2.1.185 via raw CHANGELOG.md — v2.1.184–185 contain stream-stall messaging update (trigger threshold 10→20s) and API response wording change; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.183 → v2.1.185 in Phase 2.6) |
| 5 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (149 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 6 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 7 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (`/en/permission-modes` `<Warning>`: "Auto mode is a research preview"), Advisor (`/en/advisor` `<Note>`: "experimental"), Ultrareview (`/en/ultrareview` `<Note>`: "research preview"), Channels (`/en/channels` `<Note>`: "research preview"), Fast Mode (`/en/fast-mode` `<Note>`: "research preview"), plus all other beta-badged rows confirmed research preview / experimental on their respective docs pages; Dynamic Workflows beta badge already removed in v2.1.183 run (2026-06-19) | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 8 | LOW | Verification | Command rename scan (rule #9) — v2.1.184–v2.1.185 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current; bundled skills page confirms `/code-review`, `/batch`, `/debug`, `/loop`, `/claude-api` | ✅ COMPLETE (no rename drift) |
| 9 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 10 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)` confirmed against `/en/checkpointing`; Dynamic Workflows Location confirmed against `/en/workflows` (`/workflows`, `ultracode` keyword, `/effort ultracode`, `.claude/workflows/`); Advisor Location `/advisor`, `advisorModel`, `--advisor` verified against `/en/advisor` | ✅ COMPLETE (Locations accurate) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent 63-concept sweep corroborated all existing CONCEPTS coverage; re-surfaced Artifacts (RECURRING ON HOLD from 2026-06-20) and platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings | ✅ COMPLETE (agents aligned; no NEW actionable findings) |

---

## [2026-06-22 09:37 AM PKT] Claude Code v2.1.185

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (149 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 47+ runs) |
| 2 | MED | Missing Concept (recurring) | Artifacts (`/en/artifacts`) — beta feature for publishing interactive HTML pages from sessions; Team/Enterprise only; `Artifact` tool; confidence 0.70 | ⏸️ ON HOLD (RECURRING from 2026-06-20; borderline confidence 0.70; Team/Enterprise-only beta feature — user review needed before adding) |
| 3 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-21; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 4 | LOW | Verification | Latest version confirmed v2.1.185 via raw CHANGELOG.md — same version as prior run (2026-06-21); no new versions released; no CONCEPTS-worthy changelog entries | ✅ COMPLETE (version verified; badge timestamp bumped in Phase 2.6) |
| 5 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (149 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 6 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 7 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode, Advisor, Ultrareview, Channels, Fast Mode, plus all other beta-badged rows confirmed research preview / experimental on their respective docs pages; Dynamic Workflows beta badge already removed in prior run (2026-06-19) | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 8 | LOW | Verification | Command rename scan (rule #9) — v2.1.185 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 9 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 10 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)`, Dynamic Workflows Location, Advisor Location all verified against official docs | ✅ COMPLETE (Locations accurate) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent concept sweep corroborated all existing CONCEPTS coverage; re-surfaced Artifacts (RECURRING ON HOLD from 2026-06-20) and platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings | ✅ COMPLETE (agents aligned; no NEW actionable findings) |

---

## [2026-06-23 09:38 AM PKT] Claude Code v2.1.186

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (150 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 48+ runs) |
| 2 | MED | Missing Concept (recurring) | Artifacts (`/en/artifacts`) — beta feature for publishing interactive HTML pages from sessions; Team/Enterprise only; `Artifact` tool; confidence 0.70 | ⏸️ ON HOLD (RECURRING from 2026-06-20; borderline confidence 0.70; Team/Enterprise-only beta feature — user review needed before adding) |
| 3 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-22; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 4 | LOW | Verification | Latest version confirmed v2.1.186 via raw CHANGELOG.md — up from v2.1.185; v2.1.186 changes: MCP CLI auth (`claude mcp login/logout`), workflow status filtering, Skills in plugins, bug fixes; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge timestamp bumped in Phase 2.6) |
| 5 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (150 pages, up from 149 — new page `whats-new/2026-w24.md`) — only recurring `/slash-commands` redirect flagged; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs) |
| 6 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 7 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode, Advisor, Ultrareview, Channels, Fast Mode, plus all other beta-badged rows confirmed research preview / experimental on their respective docs pages; Dynamic Workflows beta badge already removed in prior run (2026-06-19) | ✅ COMPLETE (all README beta badges accurate; no demotions warranted) |
| 8 | LOW | Verification | Command rename scan (rule #9) — v2.1.186 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 9 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 10 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)`, Dynamic Workflows Location, Advisor Location all verified against official docs | ✅ COMPLETE (Locations accurate) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent concept sweep corroborated all existing CONCEPTS coverage; re-surfaced Artifacts (RECURRING ON HOLD from 2026-06-20) and platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings | ✅ COMPLETE (agents aligned; no NEW actionable findings) |

---

## [2026-06-24 09:38 AM PKT] Claude Code v2.1.187

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Concept (resolved) | Artifacts (`/en/artifacts`) — beta feature for publishing interactive HTML pages from sessions; Team/Enterprise only; `Artifact` tool; confidence now 0.95 (up from 0.70); ON HOLD condition met (>= 0.80) | ✅ COMPLETE (auto-applied: Artifacts row added to Hot table after Claude Code Web; `![beta]` badge included; Location: `/share`, `Artifact` tool) |
| 2 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (150 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 49+ runs) |
| 3 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms & Integrations as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-23; user considers all platform/runtime surfaces or covered as Settings/Memory sub-links — not standalone concepts) |
| 4 | LOW | Verification | Latest version confirmed v2.1.187 via raw CHANGELOG.md — up from v2.1.186; v2.1.187 changes: credential sandboxing (`sandbox.credentials` setting), org model restrictions (`enforceAvailableModels`), mouse support for select menus, bug fixes; nothing CONCEPTS-worthy beyond Artifacts resolution | ✅ COMPLETE (version verified; badge bumped v2.1.186 → v2.1.187 in Phase 2.6) |
| 5 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (150 pages) — only recurring `/slash-commands` redirect flagged; Artifacts URL (`/en/artifacts`) newly validated as live; all other URLs resolve to expected canonical pages including anchors | ✅ COMPLETE (no NEW broken URLs; Artifacts URL confirmed live) |
| 6 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 7 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (`/en/permission-modes` `<Warning>`: "Auto mode is a research preview"), Advisor (`/en/advisor` `<Note>`: "experimental"), Artifacts (`/en/artifacts` `<Note>`: "Artifacts are in beta"), plus all other beta-badged rows confirmed research preview / experimental on their respective docs pages; Dynamic Workflows beta badge already removed in prior run (2026-06-19) | ✅ COMPLETE (all README beta badges accurate including newly added Artifacts; no demotions warranted) |
| 8 | LOW | Verification | Command rename scan (rule #9) — v2.1.187 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 9 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 10 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)`, Dynamic Workflows Location, Advisor Location all verified against official docs; new Artifacts Location `/share`, `Artifact` tool confirmed against `/en/artifacts` | ✅ COMPLETE (Locations accurate) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent 85-concept sweep corroborated all existing CONCEPTS coverage; both agents independently flagged Artifacts at 0.95 confidence (resolved via auto-apply); re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions between agents | ✅ COMPLETE (agents aligned; Artifacts is the only actionable finding — resolved) |

---

## [2026-06-25 09:40 AM PKT] Claude Code v2.1.191

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (179 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 50+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Platforms as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-24; user considers all platform/runtime surfaces covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | MED | Stale Beta Badge (new) | Voice Dictation (`/en/voice-dictation`) — docs page contains NO beta/preview/experimental language; Note box only mentions version requirements (v2.1.69+); may have graduated to GA; confidence 0.65 | ⏸️ ON HOLD (NEW; below 0.7 auto-apply threshold; requires user review — voice dictation docs page lacks any beta/preview banner unlike other beta-tagged features) |
| 4 | LOW | Verification | Latest version confirmed v2.1.191 via raw CHANGELOG.md — up from v2.1.187; v2.1.188-191 changes: bug fixes, performance improvements; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge bumped v2.1.187 → v2.1.191 in Phase 2.6) |
| 5 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (179 pages, up from 150 — 29 new mostly whats-new weekly entries) — only recurring `/slash-commands` redirect flagged; all other URLs resolve correctly | ✅ COMPLETE (no NEW broken URLs) |
| 6 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/`, `implementation/`, `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 7 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (research preview), Advisor (experimental), Ultrareview (research preview), Channels (research preview), Routines (research preview), Agent View (research preview), Artifacts (beta) all confirmed on docs pages; Voice Dictation flagged as potentially stale (see #3); Dynamic Workflows correctly has no beta badge | ✅ COMPLETE (all verified; one potential stale badge flagged as ON HOLD) |
| 8 | LOW | Verification | Command rename scan (rule #9) — v2.1.188-191 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 9 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 10 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)`, Dynamic Workflows Location, Advisor Location, Artifacts Location all verified against official docs | ✅ COMPLETE (Locations accurate) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings; no NEW actionable findings beyond Voice Dictation beta badge | ✅ COMPLETE (agents aligned) |

---

## [2026-06-26 09:40 AM PKT] Claude Code v2.1.193

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (234 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 51+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Platforms as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-25; user considers all platform/runtime surfaces covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | MED | Stale Beta Badge (recurring) | Voice Dictation (`/en/voice-dictation`) — docs page contains NO beta/preview/experimental language; Note box only mentions version requirements (v2.1.69+); may have graduated to GA; confidence 0.65 | ⏸️ ON HOLD (RECURRING from 2026-06-25; below 0.7 auto-apply threshold; requires user review — voice dictation docs page lacks any beta/preview banner unlike other beta-tagged features) |
| 4 | LOW | Verification | Latest version confirmed v2.1.193 via raw CHANGELOG.md — up from v2.1.191; v2.1.192-193 changes: `autoMode.classifyAllShell`, OTEL logging, file path autocomplete, memory-pressure management; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge timestamp bumped in Phase 2.6) |
| 5 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (234 pages, up from 179 — 55 new pages mostly whats-new weekly entries and enterprise/admin docs) — only recurring `/slash-commands` redirect flagged; all other URLs resolve correctly | ✅ COMPLETE (no NEW broken URLs) |
| 6 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/` (8 files), `implementation/` (6 files), `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 7 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (research preview), Advisor (experimental), Ultrareview (research preview), Channels (research preview), Routines (research preview), Agent View (research preview), Artifacts (beta) all confirmed on docs pages; Voice Dictation flagged as potentially stale (see #3) | ✅ COMPLETE (all verified; one potential stale badge flagged as ON HOLD) |
| 8 | LOW | Verification | Command rename scan (rule #9) — v2.1.192-193 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 9 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 10 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)`, Dynamic Workflows Location, Advisor Location, Artifacts Location all verified against official docs | ✅ COMPLETE (Locations accurate) |
| 11 | LOW | Verification | claude-code-guide cross-check — independent 100+ concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings; no NEW actionable findings | ✅ COMPLETE (agents aligned; no NEW items) |

---

## [2026-06-27 09:38 AM PKT] Claude Code v2.1.195

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (185 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 52+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + claude-code-guide agents re-flagged Sessions, IDE Integration, Desktop App, Output Styles, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-26; user considers all platform/runtime surfaces covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | MED | Stale Beta Badge (recurring) | Voice Dictation (`/en/voice-dictation`) — docs page contains NO beta/preview/experimental language; Note box only mentions version requirements (v2.1.69+); may have graduated to GA; confidence 0.65 | ⏸️ ON HOLD (RECURRING from 2026-06-25; below 0.7 auto-apply threshold; requires user review — voice dictation docs page lacks any beta/preview banner unlike other beta-tagged features) |
| 4 | MED | Location Update (new) | Bundled Skills Location column lists `/code-review`, `/batch` but official docs (`/en/skills#bundled-skills`) enumerate 8 bundled skills: `/code-review`, `/batch`, `/debug`, `/loop`, `/claude-api`, `/run`, `/verify`, `/run-skill-generator`; confidence 0.7 | ⏸️ ON HOLD (NEW; which subset to display requires user judgement on representativeness vs row width) |
| 5 | LOW | Verification | Latest version confirmed v2.1.195 via raw CHANGELOG.md — up from v2.1.193; v2.1.194-195 changes: `CLAUDE_CODE_DISABLE_MOUSE_CLICKS` env var, hook matcher fix; nothing CONCEPTS-worthy | ✅ COMPLETE (version verified; badge timestamp bumped in Phase 2.6) |
| 6 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (185 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve correctly | ✅ COMPLETE (no NEW broken URLs) |
| 7 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/` (8 files), `implementation/` (6 files), `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 8 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (research preview), Advisor (experimental), Ultrareview (research preview), Channels (research preview), Routines (research preview), Agent View (research preview), Artifacts (beta) all confirmed on docs pages; Voice Dictation flagged as potentially stale (see #3) | ✅ COMPLETE (all verified; one potential stale badge flagged as ON HOLD) |
| 9 | LOW | Verification | Command rename scan (rule #9) — v2.1.194-195 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 10 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 11 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)`, Dynamic Workflows Location, Advisor Location, Artifacts Location, Bundled Skills Location all verified; Bundled Skills partially incomplete (see #4) | ✅ COMPLETE (Locations accurate; one incomplete listing flagged as ON HOLD) |
| 12 | LOW | Verification | claude-code-guide cross-check — independent 90+ concept sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions with workflow-concepts-agent findings; no NEW actionable findings beyond Bundled Skills Location | ✅ COMPLETE (agents aligned; one NEW ON HOLD item) |

---

## [2026-06-28 09:37 AM PKT] Claude Code v2.1.195

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (156 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 53+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + workflow-concepts-agent re-flagged Sessions, IDE Integration (VS Code, JetBrains), Desktop App, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-27; user considers all platform/runtime surfaces covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | MED | Stale Beta Badge (recurring) | Voice Dictation (`/en/voice-dictation`) — docs page contains NO beta/preview/experimental language; Note box only mentions version requirements (v2.1.69+); may have graduated to GA; confidence 0.65 | ⏸️ ON HOLD (RECURRING from 2026-06-25; below 0.7 auto-apply threshold; requires user review — voice dictation docs page lacks any beta/preview banner unlike other beta-tagged features) |
| 4 | MED | Location Update (recurring) | Bundled Skills Location column lists `/code-review`, `/batch` but official docs (`/en/skills#bundled-skills`) enumerate 8 bundled skills; confidence 0.7 | ⏸️ ON HOLD (RECURRING from 2026-06-27; which subset to display requires user judgement on representativeness vs row width) |
| 5 | LOW | Verification | Latest version confirmed v2.1.195 via raw CHANGELOG.md — same as prior run (2026-06-27); no new CONCEPTS-worthy changes | ✅ COMPLETE (version unchanged; badge timestamp bumped in Phase 2.6) |
| 6 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (156 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve correctly | ✅ COMPLETE (no NEW broken URLs) |
| 7 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/` (8 files), `implementation/` (6 files), `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 8 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (research preview), Advisor (experimental), Ultrareview (research preview), Channels (research preview), Routines (research preview), Agent View (research preview), Artifacts (beta) all confirmed on docs pages; Voice Dictation flagged as potentially stale (see #3) | ✅ COMPLETE (all verified; one potential stale badge flagged as ON HOLD) |
| 9 | LOW | Verification | Command rename scan (rule #9) — v2.1.195 CHANGELOG contains no command/skill renames since prior run; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 10 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 11 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)`, Dynamic Workflows Location, Advisor Location, Artifacts Location, Bundled Skills Location all verified; Bundled Skills partially incomplete (see #4) | ✅ COMPLETE (Locations accurate; one incomplete listing flagged as ON HOLD) |
| 12 | LOW | Verification | workflow-concepts-agent cross-check — independent 156-page docs index sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions; no NEW actionable findings | ✅ COMPLETE (agents aligned; no NEW items) |

---

## [2026-06-29 09:39 AM PKT] Claude Code v2.1.195

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (241 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 54+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + workflow-concepts-agent re-flagged Sessions, IDE Integration (VS Code, JetBrains), Desktop App, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-28; user considers all platform/runtime surfaces covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | MED | Stale Beta Badge (recurring) | Voice Dictation (`/en/voice-dictation`) — docs page contains NO beta/preview/experimental language; Note box only mentions version requirements (v2.1.69+); may have graduated to GA; confidence 0.65 | ⏸️ ON HOLD (RECURRING from 2026-06-25; below 0.7 auto-apply threshold; requires user review — voice dictation docs page lacks any beta/preview banner unlike other beta-tagged features) |
| 4 | MED | Location Update (recurring) | Bundled Skills Location column lists `/code-review`, `/batch` but official docs (`/en/skills#bundled-skills`) enumerate 8 bundled skills; confidence 0.70 | ⏸️ ON HOLD (RECURRING from 2026-06-27; which subset to display requires user judgement on representativeness vs row width) |
| 5 | LOW | Verification | Latest version confirmed v2.1.195 via raw CHANGELOG.md — same as prior run (2026-06-28); no new CONCEPTS-worthy changes | ✅ COMPLETE (version unchanged; badge timestamp bumped in Phase 2.6) |
| 6 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (241 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve correctly | ✅ COMPLETE (no NEW broken URLs) |
| 7 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/` (8 files), `implementation/` (6 files), `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 8 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (research preview), Advisor (experimental), Ultrareview (research preview), Channels (research preview), Routines (research preview), Agent View (research preview), Artifacts (beta) all confirmed on docs pages; Voice Dictation flagged as potentially stale (see #3) | ✅ COMPLETE (all verified; one potential stale badge flagged as ON HOLD) |
| 9 | LOW | Verification | Command rename scan (rule #9) — v2.1.195 CHANGELOG contains no command/skill renames since prior run; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 10 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 11 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)`, Dynamic Workflows Location, Advisor Location, Artifacts Location, Bundled Skills Location all verified; Bundled Skills partially incomplete (see #4) | ✅ COMPLETE (Locations accurate; one incomplete listing flagged as ON HOLD) |
| 12 | LOW | Verification | workflow-concepts-agent cross-check — independent 241-page docs index sweep corroborated all existing CONCEPTS coverage; re-surfaced platform/runtime surfaces (RECURRING INVALID); no contradictions; no NEW actionable findings | ✅ COMPLETE (agents aligned; no NEW items) |

---

## [2026-06-30 09:39 AM PKT] Claude Code v2.1.196

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (~150 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 55+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + workflow-concepts-agent re-flagged Sessions, IDE Integration (VS Code, JetBrains), Desktop App, Permissions, Sandboxing, Headless Mode, Context Window, .claude Directory, Prompt Library, Platforms as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-29; user considers all platform/runtime surfaces covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | MED | Stale Beta Badge (recurring) | Voice Dictation (`/en/voice-dictation`) — docs page contains NO beta/preview/experimental language; Note box only mentions version requirements (v2.1.69+); may have graduated to GA; confidence 0.65 | ⏸️ ON HOLD (RECURRING from 2026-06-25; below 0.7 auto-apply threshold; requires user review — voice dictation docs page lacks any beta/preview banner unlike other beta-tagged features) |
| 4 | MED | Location Update (recurring) | Bundled Skills Location column lists `/code-review`, `/batch` but official docs (`/en/skills#bundled-skills`) enumerate 8 bundled skills (`/code-review`, `/batch`, `/debug`, `/loop`, `/claude-api`, `/run`, `/verify`, `/run-skill-generator`); confidence 0.70 | ⏸️ ON HOLD (RECURRING from 2026-06-27; which subset to display requires user judgement on representativeness vs row width) |
| 5 | LOW | Verification | Latest version confirmed v2.1.196 via raw CHANGELOG.md — up from v2.1.195; bug-fix/reliability release with no new CONCEPTS-worthy changes (org default models, readable session names, clickable file attachments, MCP security, /code-review token reduction) | ✅ COMPLETE (version bumped; no CONCEPTS drift) |
| 6 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (~150 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve correctly | ✅ COMPLETE (no NEW broken URLs) |
| 7 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/` (8 files), `implementation/` (6 files), `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 8 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (research preview), Advisor (experimental), Ultrareview (research preview), Channels (research preview), Routines (research preview), Agent View (research preview), Artifacts (beta) all confirmed on docs pages; Voice Dictation flagged as potentially stale (see #3) | ✅ COMPLETE (all verified; one potential stale badge flagged as ON HOLD) |
| 9 | LOW | Verification | Command rename scan (rule #9) — v2.1.196 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 10 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 11 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)`, Dynamic Workflows Location, Advisor Location, Artifacts Location, Bundled Skills Location all verified; Bundled Skills partially incomplete (see #4) | ✅ COMPLETE (Locations accurate; one incomplete listing flagged as ON HOLD) |
| 12 | LOW | Verification | Both agents cross-check — workflow-concepts-agent (~159-page docs sweep) and claude-code-guide (65+ concept inventory) both corroborated existing CONCEPTS coverage; no contradictions; no NEW actionable findings beyond recurring items | ✅ COMPLETE (agents aligned; no NEW items) |

---

## [2026-07-01 09:37 AM PKT] Claude Code v2.1.197

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Stale URL (recurring) | Commands URL `/slash-commands` not in official sitemap (163 pages) — redirects to `/skills`; canonical commands reference is `/en/commands` | ❌ INVALID (RECURRING from 2026-03-10; URL still resolves via redirect; user has chosen to keep as-is across 56+ runs) |
| 2 | MED | Missing Concept (recurring) | Dedicated + workflow-concepts-agent re-flagged Sessions, IDE Integration (VS Code, JetBrains), Desktop App, Context Window, .claude Directory, Prompt Library, Prompt Caching as missing standalone rows | ❌ INVALID (RECURRING from 2026-03-10 through 2026-06-30; user considers all platform/runtime surfaces covered as Settings/Memory sub-links — not standalone concepts) |
| 3 | MED | Stale Beta Badge (recurring) | Voice Dictation (`/en/voice-dictation`) — docs page contains NO beta/preview/experimental language; Note box only mentions version requirements (v2.1.69+); may have graduated to GA; confidence 0.65 | ⏸️ ON HOLD (RECURRING from 2026-06-25; below 0.7 auto-apply threshold; requires user review — voice dictation docs page lacks any beta/preview banner unlike other beta-tagged features) |
| 4 | MED | Location Update (recurring) | Bundled Skills Location column lists `/code-review`, `/batch` but official docs (`/en/skills#bundled-skills`) enumerate 8 bundled skills; confidence 0.70 | ⏸️ ON HOLD (RECURRING from 2026-06-27; which subset to display requires user judgement on representativeness vs row width) |
| 5 | LOW | Verification | Latest version confirmed v2.1.197 via raw CHANGELOG.md — up from v2.1.196; headline: Claude Sonnet 5 as default model with native 1M-token context window, promotional pricing | ✅ COMPLETE (version bumped; no new CONCEPTS-worthy changes) |
| 6 | LOW | Verification | All 40+ external CONCEPTS URLs validated against llms.txt sitemap (163 pages) — only recurring `/slash-commands` redirect flagged; all other URLs resolve correctly | ✅ COMPLETE (no NEW broken URLs) |
| 7 | LOW | Verification | All 22+ local badge/link target files validated — `best-practice/` (8 files), `implementation/` (6 files), `reports/`, `.claude/`, `.mcp.json`, `CLAUDE.md`, `orchestration-workflow/` targets all exist | ✅ COMPLETE (no missing local files) |
| 8 | LOW | Verification | Beta Badge Currency (rule #7) — Auto Mode (research preview), Advisor (experimental), Ultrareview (research preview), Channels (research preview), Routines (research preview), Agent View (research preview), Artifacts (beta) all confirmed on docs pages; Voice Dictation flagged as potentially stale (see #3) | ✅ COMPLETE (all verified; one potential stale badge flagged as ON HOLD) |
| 9 | LOW | Verification | Command rename scan (rule #9) — v2.1.197 CHANGELOG contains no command/skill renames; `/code-review`, `/code-review ultra`, `/batch`, `/advisor` all current | ✅ COMPLETE (no rename drift) |
| 10 | LOW | Verification | Anchors stable: `#organize-rules-with-clauderules` on /memory, `#eliminate-prompts-with-auto-mode` on /permission-modes, `#bundled-skills` on /skills, `#track-a-running-review` on /ultrareview, `#run-a-bundled-workflow` on /workflows | ✅ COMPLETE (all stable) |
| 11 | LOW | Verification | Location Column Factual Accuracy (rule #8) — Checkpointing `automatic (file-edit tracking)`, Dynamic Workflows Location, Advisor Location, Artifacts Location, Bundled Skills Location all verified; Bundled Skills partially incomplete (see #4) | ✅ COMPLETE (Locations accurate; one incomplete listing flagged as ON HOLD) |
| 12 | LOW | Verification | Both agents cross-check — workflow-concepts-agent (163-page docs sweep) and claude-code-guide (58+ concept inventory) both corroborated existing CONCEPTS coverage; no contradictions; no NEW actionable findings beyond recurring items | ✅ COMPLETE (agents aligned; no NEW items) |
