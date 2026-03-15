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
