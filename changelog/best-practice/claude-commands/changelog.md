# Commands Report — Changelog History

## Status Legend

| Status | Meaning |
|--------|---------|
| ✅ `COMPLETE (reason)` | Action was taken and resolved successfully |
| ❌ `INVALID (reason)` | Finding was incorrect, not applicable, or intentional |
| ✋ `ON HOLD (reason)` | Action deferred — waiting on external dependency or user decision |

---

## [2026-03-13 04:23 PM PKT] Claude Code v2.1.74

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `name` to frontmatter table — display name for the skill | ❌ INVALID (skill-only field, not applicable to commands frontmatter) |
| 2 | HIGH | New Field | Add `disable-model-invocation` to frontmatter table — prevents auto-loading | ❌ INVALID (skill-only field, not applicable to commands frontmatter) |
| 3 | HIGH | New Field | Add `user-invocable` to frontmatter table — hides from `/` menu | ❌ INVALID (skill-only field, not applicable to commands frontmatter) |
| 4 | HIGH | New Field | Add `context` to frontmatter table — fork to run in subagent context | ❌ INVALID (skill-only field, not applicable to commands frontmatter) |
| 5 | HIGH | New Field | Add `agent` to frontmatter table — subagent type for context: fork | ❌ INVALID (skill-only field, not applicable to commands frontmatter) |
| 6 | HIGH | New Field | Add `hooks` to frontmatter table — lifecycle hooks scoped to skill | ❌ INVALID (skill-only field, not applicable to commands frontmatter) |
| 7 | HIGH | New Command | Add `/btw <question>` — ask a quick side question without adding to conversation | ✅ COMPLETE (added as #53 in Session tag) |
| 8 | HIGH | New Command | Add `/hooks` — manage hook configurations for tool events | ✅ COMPLETE (added as #30 in Extensions tag) |
| 9 | HIGH | New Command | Add `/insights` — generate session analysis report | ✅ COMPLETE (added as #17 in Context tag) |
| 10 | HIGH | New Command | Add `/plugin` — manage Claude Code plugins | ✅ COMPLETE (added as #33 in Extensions tag) |
| 11 | HIGH | New Command | Add `/skills` — list available skills | ✅ COMPLETE (added as #35 in Extensions tag) |
| 12 | HIGH | New Command | Add `/upgrade` — open upgrade page to switch plan tier | ✅ COMPLETE (added as #3 in Auth tag) |
| 13 | HIGH | Removed Command | Remove `/output-style` — deprecated in v2.1.73, use `/config` instead | ✅ COMPLETE (removed from Config tag) |
| 14 | HIGH | Removed Command | Remove `/bug` row — now listed as alias under `/feedback` | ✅ COMPLETE (removed row, added "Alias: /bug" to /feedback description) |
| 15 | HIGH | Changed Description | Update `/passes` — repurposed from review passes to referral sharing | ✅ COMPLETE (updated description, kept in Model tag) |
| 16 | HIGH | Changed Description | Update `/review` — deprecated, replaced by `code-review` marketplace plugin | ✅ COMPLETE (updated description in Project tag) |
| 17 | MED | Changed Description | Update `/stickers` — changed from UI sticker packs to ordering physical stickers | ✅ COMPLETE (updated description in Config tag) |

---

## [2026-03-15 12:50 PM PKT] Claude Code v2.1.76

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/color [color\|default]` to Config tag — set prompt bar color for current session | ✅ COMPLETE (added as #4 in Config tag) |
| 2 | HIGH | New Command | Add `/effort [low\|medium\|high\|max\|auto]` to Model tag — set model effort level | ✅ COMPLETE (added as #38 in Model tag) |
| 3 | MED | Changed Description | Update `/status` — now "Open the Settings interface (Status tab)" instead of "Show a concise session status summary" | ✅ COMPLETE (updated description at #20 in Context tag) |
| 4 | MED | Changed Description | Update `/desktop` — now "Continue the current session in the Claude Code Desktop app. macOS and Windows only." | ✅ COMPLETE (updated description at #49 in Remote tag) |
| 5 | LOW | Changed Argument | Update `/init` — official docs dropped `[prompt]` argument hint | ✅ COMPLETE (removed [prompt] hint at #45 in Project tag) |

---

## [2026-03-17 12:45 PM PKT] Claude Code v2.1.77

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Alias | Add `Alias: /branch` to `/fork` entry (v2.1.77 renamed fork→branch) | ✅ COMPLETE (added "Alias: /branch" to /fork at #59 in Session tag) |
| 2 | HIGH | New Aliases | Add aliases to 8 commands: `/clear` (+/reset, /new), `/config` (+/settings), `/desktop` (+/app), `/exit` (+/quit), `/rewind` (+/checkpoint), `/resume` (+/continue), `/remote-control` (+/rc), `/mobile` (+/ios, /android) | ✅ COMPLETE (added alias notations to all 8 command descriptions) |
| 3 | MED | Changed Description | Update `/diff` — "Open an interactive diff viewer showing uncommitted changes and per-turn diffs" | ✅ COMPLETE (updated description at #44 in Project tag) |
| 4 | MED | Changed Description | Update `/memory` — "Edit CLAUDE.md memory files, enable or disable auto-memory, and view auto-memory entries" | ✅ COMPLETE (updated description at #37 in Memory tag) |
| 5 | MED | Changed Description | Update `/copy` — "Copy the last assistant response to clipboard. Shows interactive picker for code blocks" | ✅ COMPLETE (updated description at #27 in Export tag) |
| 6 | MED | Changed Description | Update `/mobile` — "Show QR code to download the Claude mobile app" | ✅ COMPLETE (updated description + aliases at #52 in Remote tag) |
| 7 | MED | Changed Description | Update `/remote-control` — "Make this session available for remote control from claude.ai" | ✅ COMPLETE (updated description + alias at #53 in Remote tag) |
| 8 | LOW | Frontmatter Scope | 6 skill-only fields still absent from report (intentional scoping) | ❌ INVALID (skill-only fields — same determination as v2.1.74 run) |

---

## [2026-03-18 11:38 PM PKT] Claude Code v2.1.78

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/voice` to Config tag — toggle push-to-talk voice dictation | ✅ COMPLETE (added as #15 in Config tag) |
| 2 | HIGH | Inverted Alias | Swap `/fork` → `/branch` as primary, `/fork` as alias | ✅ COMPLETE (swapped to `/branch` at #56 in Session tag, re-sorted alphabetically) |
| 3 | MED | New Alias | Add `/allowed-tools` alias to `/permissions` | ✅ COMPLETE (added alias to #7 in Config tag) |
| 4 | MED | New Argument | Add `[N]` argument syntax to `/copy` | ✅ COMPLETE (updated to `/copy [N]` at #28 in Export tag) |
| 5 | LOW | Frontmatter Scope | 6 skill-only fields absent from report (intentional scoping) | ❌ INVALID (skill-only fields — same determination as v2.1.74 and v2.1.77 runs) |

---

## [2026-03-19 11:54 AM PKT] Claude Code v2.1.79

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | LOW | Frontmatter Scope | 6 skill-only fields absent from report (intentional scoping) | ❌ INVALID (skill-only fields — same determination as v2.1.74, v2.1.77, and v2.1.78 runs) |

---

## [2026-03-20 08:33 AM PKT] Claude Code v2.1.80

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | New Field | Add `effort` to frontmatter table — override model effort level when command is invoked (v2.1.80) | ✅ COMPLETE (added as 5th field, then repositioned to 8th when full field set was added) |
| 2 | HIGH | QA Correction | Add 6 missing fields (`name`, `disable-model-invocation`, `user-invocable`, `context`, `agent`, `hooks`) — official docs state commands support "the same frontmatter" as skills; previous INVALID determinations (v2.1.74–v2.1.79) were incorrect | ✅ COMPLETE (added all 6 fields, count updated 5 → 11, field order matches official docs) |
| 3 | HIGH | Cross-Report Fix | Add `effort` to skills report (`claude-skills.md`) — field was missing there too | ✅ COMPLETE (added as 8th field in skills report, count updated 10 → 11) |

---

## [2026-03-21 09:08 PM PKT] Claude Code v2.1.81

No priority action items — report is fully in sync with official documentation (11 frontmatter fields, 63 built-in commands).

---

## [2026-03-23 09:48 PM PKT] Claude Code v2.1.81

No priority action items — report is fully in sync with official documentation (11 frontmatter fields, 63 built-in commands).

---

## [2026-03-25 08:07 PM PKT] Claude Code v2.1.83

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/schedule [description]` to Remote tag — Create, update, list, or run Cloud scheduled tasks | ✅ COMPLETE (added as #56 in Remote tag, count updated 63 → 64) |

---

## [2026-03-26 01:01 PM PKT] Claude Code v2.1.84

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `shell` to frontmatter table — shell for `!command` blocks (`bash` or `powershell`) | ✅ COMPLETE (added as 12th field before `hooks`, count updated 11 → 12) |
| 2 | LOW | Changed Argument | Add `[on\|off]` argument hint to `/fast` command | ✅ COMPLETE (updated `/fast` to `/fast [on\|off]` at #40 in Model tag) |

---

## [2026-03-27 06:25 PM PKT] Claude Code v2.1.85

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `paths` to frontmatter table — glob patterns that limit when a skill is activated | ✅ COMPLETE (added as 6th field after `user-invocable`, count updated 12 → 13) |

---

## [2026-03-28 06:05 PM PKT] Claude Code v2.1.86

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Changed Argument | Update `/add-dir` — add `<path>` required argument hint per official docs | ✅ COMPLETE (updated at #44 in Project tag) |
| 2 | MED | Changed Argument | Update `/branch` — add `[name]` optional argument hint per official docs | ✅ COMPLETE (updated at #57 in Session tag) |
| 3 | MED | Changed Argument | Update `/model` — add `[model]` optional argument hint per official docs | ✅ COMPLETE (updated at #41 in Model tag) |
| 4 | MED | Changed Argument | Update `/plan` — add `[description]` optional argument hint per official docs | ✅ COMPLETE (updated at #43 in Model tag) |
| 5 | MED | Changed Argument | Update `/pr-comments` — add `[PR]` optional argument hint per official docs | ✅ COMPLETE (updated at #47 in Project tag) |
| 6 | MED | Changed Argument | Update `/passes` — remove `[number]` argument hint (not in official docs) | ✅ COMPLETE (updated at #42 in Model tag) |
| 7 | MED | Changed Argument | Update `/rename` — change from `<name>` (required) to `[name]` (optional) per official docs | ✅ COMPLETE (updated at #62 in Session tag) |
| 8 | LOW | Changed Argument | Update `/compact` — change argument label from `[prompt]` to `[instructions]` per official docs | ✅ COMPLETE (updated at #60 in Session tag) |
| 9 | LOW | Changed Argument | Update `/feedback` — change argument label from `[description]` to `[report]` per official docs | ✅ COMPLETE (updated at #24 in Debug tag) |
