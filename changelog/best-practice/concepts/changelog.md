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
