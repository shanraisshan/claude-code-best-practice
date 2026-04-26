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

---

## [2026-03-31 06:55 PM PKT] Claude Code v2.1.88

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Description Sync | Synced all 43 command descriptions to match official docs — behavioral clarifications (`/vim` toggle, `/sandbox` toggle, `/hooks` view), expanded detail (`/effort` persistence, `/copy` SSH write, `/model` effort arrows), and wording alignment across Auth, Config, Context, Debug, Export, Extensions, Model, Project, Remote, and Session tags | ✅ COMPLETE (all 64 descriptions now match official docs at code.claude.com/docs/en/commands) |

---

## [2026-04-01 12:26 PM PKT] Claude Code v2.1.89

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | LOW | Changed Description | Update `/init` — official docs now use `CLAUDE_CODE_NEW_INIT=1` instead of `=true` | ✅ COMPLETE (updated env var value from `=true` to `=1` to match official docs) |

---

## [2026-04-02 09:14 PM PKT] Claude Code v2.1.90

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Changed Description | Update `/permissions` — official docs expanded to describe interactive dialog with scope rules, directory management, and auto mode denial review | ✅ COMPLETE (updated description to match official docs) |
| 2 | MED | New Alias | Add `/bashes` alias to `/tasks` command per official docs | ✅ COMPLETE (added "Alias: /bashes" to /tasks at #27 in Debug tag) |

---

## [2026-04-03 08:34 PM PKT] Claude Code v2.1.91

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/powerup` to Config tag — Discover Claude Code features through quick interactive lessons with animated demos | ✅ COMPLETE (added as #26 in Debug tag — resolved in v2.1.92 run) |

---

## [2026-04-04 10:40 PM PKT] Claude Code v2.1.92

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/powerup` to Debug tag — Discover Claude Code features through quick interactive lessons with animated demos | ✅ COMPLETE (added as #26 in Debug tag, recurring from v2.1.91) |
| 2 | HIGH | New Command | Add `/setup-bedrock` to Auth tag — Configure Amazon Bedrock authentication, region, and model pins through an interactive wizard | ✅ COMPLETE (added as #3 in Auth tag) |
| 3 | HIGH | New Command | Add `/ultraplan <prompt>` to Model tag — Draft a plan in an ultraplan session, review it in your browser, then execute remotely or send it back | ✅ COMPLETE (added as #45 in Model tag) |
| 4 | HIGH | Removed Command | Remove `/vim` from Config tag — removed in v2.1.92 (max-version: 2.1.91), use `/config` Editor mode instead | ✅ COMPLETE (removed from Config tag) |
| 5 | HIGH | Removed Command | Remove `/pr-comments [PR]` from Project tag — removed in v2.1.91 (max-version: 2.1.90), ask Claude directly | ✅ COMPLETE (removed from Project tag) |
| 6 | MED | Changed Description | Update `/release-notes` — now "View the changelog in an interactive version picker. Select a specific version to see its release notes, or choose to show all versions." | ✅ COMPLETE (updated description at #27 in Debug tag) |

---

## [2026-04-08 09:35 PM PKT] Claude Code v2.1.96

No priority action items — report is fully in sync with official documentation (13 frontmatter fields, 65 built-in commands).

---

## [2026-04-09 11:31 PM PKT] Claude Code v2.1.97

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/autofix-pr [prompt]` to Remote tag — Spawn a web session that watches the current branch's PR and pushes fixes when CI fails or reviewers leave comments | ✅ COMPLETE (added as #51 in Remote tag, count updated 65 → 68) |
| 2 | HIGH | New Command | Add `/teleport` to Remote tag — Pull a Claude Code on the web session into this terminal. Alias: `/tp` | ✅ COMPLETE (added as #59 in Remote tag) |
| 3 | HIGH | New Command | Add `/web-setup` to Remote tag — Connect GitHub account to Claude Code on the web using local `gh` CLI credentials | ✅ COMPLETE (added as #60 in Remote tag) |
| 4 | MED | Changed Description | Update `/add-dir` — official docs now include caveat about `.claude/` config not being discovered from added directory | ✅ COMPLETE (updated description at #46 in Project tag) |

---

## [2026-04-13 08:00 PM PKT] Claude Code v2.1.101

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/setup-vertex` to Auth tag — Configure Google Vertex AI authentication, project, region, and model pins through an interactive wizard. Only visible when `CLAUDE_CODE_USE_VERTEX=1` is set | ✅ COMPLETE (added as #4 in Auth tag, count updated 68 → 69) |

---

## [2026-04-14 11:13 PM PKT] Claude Code v2.1.107

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `when_to_use` to frontmatter table — additional context for when Claude should invoke the skill, appended to `description` in the listing (count 13 → 14) | ✅ COMPLETE (added after `description` field, count updated 13 → 14) |
| 2 | HIGH | New Command | Add `/team-onboarding` to Project tag — Generate a team onboarding guide from Claude Code usage history (count 69 → 70) | ✅ COMPLETE (added as #52 in Project tag, count updated 69 → 70) |
| 3 | MED | Scope Decision | 5 bundled skills (`/batch`, `/claude-api`, `/debug`, `/loop`, `/simplify`) listed in official docs unified table but excluded per report's current scoping disclaimer | ❌ INVALID (user chose to keep report scoped to built-in commands only — disclaimer retained) |
| 4 | MED | Changed Description | Update `/doctor` — add "Press `f` to have Claude fix any reported issues" | ✅ COMPLETE (added status icons and `f` key fix detail to description) |
| 5 | MED | Changed Description | Update `/schedule` — terminology changed from "Cloud scheduled tasks" to "routines" | ✅ COMPLETE (updated terminology in description) |

---

## [2026-04-16 08:20 PM PKT] Claude Code v2.1.110

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | New Alias | Add `/undo` alias to `/rewind` entry — added in v2.1.108 | ✅ COMPLETE (added `/undo` alongside existing `/checkpoint` alias at #70 in Session tag) |

---

## [2026-04-18 07:54 PM PKT] Claude Code v2.1.114

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/recap` to Session tag — Generate a one-line summary of the current session on demand (v2.1.108) | ✅ COMPLETE (added as #72 in Session tag, count updated 70 → 75) |
| 2 | HIGH | New Command | Add `/focus` to Config tag — Toggle the focus view showing only last prompt, tool-call summary, and final response (v2.1.110) | ✅ COMPLETE (added as #8 in Config tag) |
| 3 | HIGH | New Command | Add `/tui [default\|fullscreen]` to Config tag — Set the terminal UI renderer and relaunch with conversation intact (v2.1.110) | ✅ COMPLETE (added as #17 in Config tag) |
| 4 | HIGH | New Command | Add `/ultrareview [PR]` to Project tag — Run a deep, multi-agent code review in a cloud sandbox (v2.1.111) | ✅ COMPLETE (added as #56 in Project tag) |
| 5 | HIGH | New Command | Add `/heapdump` to Debug tag — Write a JavaScript heap snapshot and memory breakdown to `~/Desktop` for diagnosing high memory usage | ✅ COMPLETE (added as #28 in Debug tag) |
| 6 | HIGH | Changed Description | Revert `/review` from deprecated → live built-in per official docs ("Review a pull request locally in your current session. For a deeper cloud-based review, see `/ultrareview`") — reverses v2.1.74 update | ✅ COMPLETE (updated description at #53 in Project tag, now references `/ultrareview`) |
| 7 | MED | Changed Description | Update `/effort` description — official now lists `xhigh` level and opens interactive slider with no args (v2.1.111) | ✅ COMPLETE (updated arg hint to include `xhigh` and description to mention interactive slider) |
| 8 | MED | Changed Description | Update `/theme` description — official adds "Auto (match terminal)" option (v2.1.111) | ✅ COMPLETE (added "Auto (match terminal)" to description at #16 in Config tag) |
| 9 | MED | Changed Description | Update `/model` description — official notes it warns before switching mid-conversation (v2.1.108) | ✅ COMPLETE (added mid-conversation warning detail at #46 in Model tag) |
| 10 | MED | New Alias | Add `/routines` alias to `/schedule` command per official docs | ✅ COMPLETE (added `Alias: /routines` at #64 in Remote tag) |

---

## [2026-04-24 12:29 AM PKT] Claude Code v2.1.118

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `arguments` to frontmatter table — named positional arguments for `$name` substitution (count 14 → 15) | ✅ COMPLETE (added after `argument-hint`, count updated 14 → 15) |
| 2 | HIGH | Changed Description | Update `/cost` — now just an alias for `/usage` | ✅ COMPLETE (description simplified to "Alias for `/usage`") |
| 3 | HIGH | Changed Description | Update `/stats` — now alias for `/usage`, opens Stats tab | ✅ COMPLETE (description updated to "Alias for `/usage`. Opens on the Stats tab") |
| 4 | HIGH | Changed Description | Update `/usage` — canonical command absorbing `/cost` and `/stats`; note aliases | ✅ COMPLETE (expanded to "Show session cost, plan usage limits, and activity stats. `/cost` and `/stats` are aliases") |
| 5 | MED | Changed Argument | Update `/voice` signature to `/voice [hold\|tap\|off]` | ✅ COMPLETE (signature and description updated) |
| 6 | MED | Changed Description | Update `/theme` — add custom themes support (`~/.claude/themes/`, plugins, "New custom theme…") | ✅ COMPLETE (custom themes detail added to description) |
| 7 | MED | Changed Description | Update `/terminal-setup` — replace terminal list (drop Warp; add Cursor, Windsurf, Zed) | ✅ COMPLETE (terminal list replaced: VS Code, Cursor, Windsurf, Alacritty, Zed) |
| 8 | LOW | Changed Description | Update `/effort` — note that `max` level is session-only | ✅ COMPLETE (added "(session-only)" qualifier to `max` in description) |

---

## [2026-04-26 01:10 PM PKT] Claude Code v2.1.119

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Changed Description | Update `/branch` — add `CLAUDE_CODE_FORK_SUBAGENT` env-var note explaining `/fork` divergence (v2.1.117) | ✅ COMPLETE (appended fork-subagent note to description at #67 in Session tag) |
| 2 | MED | Changed Description | Update `/focus` — add "Only available in fullscreen rendering" qualifier (v2.1.110) | ✅ COMPLETE (appended fullscreen-only qualifier at #8 in Config tag) |
| 3 | MED | Changed Description | Update `/skills` — add "Press `t` to sort by token count" (v2.1.110/111) | ✅ COMPLETE (appended sort-by-token-count detail at #42 in Extensions tag) |
| 4 | MED | Changed Description | Update `/clear` — reword to contrast with `/compact` per official docs | ✅ COMPLETE (replaced description with "Start a new conversation with empty context… use `/compact` instead" at #69 in Session tag) |
| 5 | LOW | Scope Decision | 6 bundled skills (`/batch`, `/claude-api`, `/debug`, `/fewer-permission-prompts`, `/loop`, `/simplify`) listed in upstream unified table but excluded per report scope | ❌ INVALID (recurring from v2.1.107 — user previously chose to keep report scoped to built-in commands only) |
