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

---

## [2026-04-29 12:50 AM PKT] Claude Code v2.1.121

No priority action items — report is fully in sync with official documentation (15 frontmatter fields, 75 built-in commands).

---

## [2026-05-01 03:31 PM PKT] Claude Code v2.1.126

No priority action items — report is fully in sync with official documentation (15 frontmatter fields, 75 built-in commands).

---

## [2026-05-12 11:39 PM PKT] Claude Code v2.1.139

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/background [prompt]` to Session tag — Detach current session to run as a background agent. Alias: `/bg` | ✅ COMPLETE (added as #69 in Session tag, count updated 75 → 80) |
| 2 | HIGH | New Command | Add `/goal [condition\|clear]` to Session tag — Claude keeps working across turns until condition met (v2.1.139) | ✅ COMPLETE (added as #75 in Session tag) |
| 3 | HIGH | New Command | Add `/radio` to Config tag — Open Claude FM lo-fi radio in your browser | ✅ COMPLETE (added as #12 in Config tag) |
| 4 | HIGH | New Command | Add `/scroll-speed` to Config tag — Adjust mouse wheel scroll speed interactively (v2.1.139) | ✅ COMPLETE (added as #14 in Config tag) |
| 5 | HIGH | New Command | Add `/stop` to Session tag — Stop the current background session; transcript and worktree are kept | ✅ COMPLETE (added as #80 in Session tag) |
| 6 | LOW | Scope Decision | 6 bundled skills (`/batch`, `/claude-api`, `/debug`, `/fewer-permission-prompts`, `/loop`, `/simplify`) listed in upstream unified table but excluded per report scope | ❌ INVALID (recurring from v2.1.107 and v2.1.119 — user previously chose to keep report scoped to built-in commands only) |

---

## [2026-05-21 12:06 AM PKT] Claude Code v2.1.145

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Renamed Command | Rename `/extra-usage` → `/usage-credits` in Context tag (v2.1.144); keep `/extra-usage` noted as previous name; re-sort within Context group (`e`→`u`) | ✅ COMPLETE (renamed at #27 in Context tag, moved after `/usage`, rows 23–27 renumbered; count unchanged at 80) |
| 2 | MED | New Alias | Add `/share` alias to `/feedback` and broaden description to "Submit feedback, report a bug, or share your conversation. Aliases: `/bug`, `/share`" | ✅ COMPLETE (updated description at #29 in Debug tag) |
| 3 | LOW | Changed Value | Add `xhigh` to the `effort` frontmatter field's options list (`low`, `medium`, `high`, `xhigh`, `max`) | ✅ COMPLETE (added `xhigh` to effort field row; value-list sync, not a field add/remove) |
| 4 | LOW | Scope Decision | 9 bundled skills (`/batch`, `/claude-api`, `/debug`, `/fewer-permission-prompts`, `/loop`, `/run`, `/run-skill-generator`, `/simplify`, `/verify`) in upstream unified table excluded per report scope | ❌ INVALID (recurring from v2.1.107/119/139 — report intentionally scoped to built-in commands only) |

---

## [2026-05-25 04:25 PM PKT] Claude Code v2.1.150

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | LOW | Scope Decision | 9 bundled skills (`/batch`, `/claude-api`, `/code-review`, `/debug`, `/fewer-permission-prompts`, `/loop`, `/run`, `/run-skill-generator`, `/verify`) in upstream unified table excluded per report scope; `/simplify` renamed → `/code-review` at v2.1.147 (still a bundled Skill, stays excluded) | ❌ INVALID (recurring from v2.1.107/119/139/145 — report intentionally scoped to built-in commands only) |

_No tracked drift: frontmatter fields 15/15 match official docs, built-in commands 80/80 match. Version badge bumped v2.1.145 → v2.1.150._

---

## [2026-06-01 12:03 AM PKT] Claude Code v2.1.158

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `disallowed-tools` to frontmatter table — tools removed from Claude's available pool while the skill/command is active; clears on next message (count 15 → 16) | ✅ COMPLETE (added after `allowed-tools`, heading updated 15 → 16) |
| 2 | HIGH | New Command | Add `/reload-skills` to Extensions tag — re-scan skill/command directories so on-disk changes apply without restart; reports counts added/removed (count 80 → 81) | ✅ COMPLETE (added as #44 after `/reload-plugins`, downstream rows renumbered) |
| 3 | HIGH | New Command | Add `/workflows` to Session tag — open the workflow progress view to watch, pause, resume, or save running and completed workflows (count 81 → 82) | ✅ COMPLETE (added as #82 at end of Session group, count heading updated → 82) |

---

## [2026-06-01 11:08 AM PKT] Claude Code v2.1.159

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 82 built-in commands).

---

## [2026-06-02 11:07 AM PKT] Claude Code v2.1.160

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Changed Description | Update `/effort` — add `ultracode` level (combines `xhigh` reasoning with automatic workflow orchestration; session-only); update signature from `auto` to `ultracode` as final listed level option (v2.1.160 renamed `workflow` → `ultracode`) | ✅ COMPLETE (updated signature and description at #47 in Model tag) |

---

## [2026-06-03 11:07 AM PKT] Claude Code v2.1.161

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 82 built-in commands).

---

## [2026-06-04 11:07 AM PKT] Claude Code v2.1.162

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/fork <directive>` to Session tag — Spawn a forked subagent that inherits the full conversation and works on the directive while you keep going (standalone since v2.1.161; previously alias of `/branch`) | ✅ COMPLETE (added as #76 in Session tag; alias reference removed from `/branch` row; downstream rows 76-82 renumbered to 77-83; count updated 82 → 83) |
| 2 | MED | Changed Description | Update `/terminal-setup` — replace "Windsurf" with "Devin Desktop" (renamed in v2.1.162) | ✅ COMPLETE (updated description at #17 in Config tag) |

---

## [2026-06-05 11:07 AM PKT] Claude Code v2.1.165

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 83 built-in commands).

---

## [2026-06-06 11:05 AM PKT] Claude Code v2.1.167

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 83 built-in commands).

---

## [2026-06-07 11:04 AM PKT] Claude Code v2.1.168

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 83 built-in commands).

---

## [2026-06-08 11:05 AM PKT] Claude Code v2.1.168

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 83 built-in commands).

---

## [2026-06-09 11:04 AM PKT] Claude Code v2.1.169

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/cd [path]` to Session tag — Move the session to a new working directory without breaking the prompt cache | ✅ COMPLETE (added as #73 in Session tag; downstream rows 73–83 renumbered to 74–84; count updated 83 → 84) |

---

## [2026-06-10 11:05 AM PKT] Claude Code v2.1.170

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/advisor [model\|off]` to Model tag — Enable or disable the advisor tool which consults a second model for guidance at key moments | ✅ COMPLETE (added as #47 in Model tag; downstream rows 47–84 renumbered 48–85; count updated 84 → 85) |

---

## [2026-06-11 11:09 AM PKT] Claude Code v2.1.173

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Changed Description | Update `/review` — official docs updated cross-reference from `/ultrareview` to `/code-review ultra` | ✅ COMPLETE (updated description at #57 in Project tag) |
| 2 | MED | Changed Description | Update `/ultrareview` — official docs now note preferred invocation is `/code-review ultra`; `/ultrareview` remains as an alias | ✅ COMPLETE (updated description at #60 in Project tag) |

---

## [2026-06-12 11:08 AM PKT] Claude Code v2.1.175

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Changed Argument | Update `/clear` — add `[name]` optional arg to label the previous conversation for retrieval via `/resume` | ✅ COMPLETE (updated signature and description at #75 in Session tag) |
| 2 | MED | Changed Argument | Update `/context` — add `[all]` optional arg to expand the full context breakdown | ✅ COMPLETE (updated signature and description at #21 in Context tag) |
| 3 | LOW | Changed Argument | Update `/cd` — change `[path]` (optional) to `<path>` (required) per official docs | ✅ COMPLETE (updated signature at #74 in Session tag) |
| 4 | LOW | Changed Description | Update `/color` — add "run without an argument to pick a random color" per official docs | ✅ COMPLETE (appended random-color note at #6 in Config tag) |
| 5 | LOW | Changed Description | Update `/remote-env` — reworded from "Configure the default remote environment for web sessions started with `--remote`" to "Choose the default environment for cloud agents" | ✅ COMPLETE (updated description at #67 in Remote tag) |

---

## [2026-06-13 11:07 AM PKT] Claude Code v2.1.176

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | LOW | Scope Decision | 11 bundled skills/workflows (`/batch`, `/claude-api`, `/code-review`, `/debug`, `/deep-research`, `/fewer-permission-prompts`, `/loop`, `/run`, `/run-skill-generator`, `/simplify`, `/verify`) listed in upstream unified table but excluded per report scope; `/deep-research` (Workflow) appears for first time in findings | ❌ INVALID (recurring from v2.1.107/119/139/145/150 — report intentionally scoped to built-in commands only; `/deep-research` is a bundled Workflow and stays excluded) |

---

## [2026-06-14 11:06 AM PKT] Claude Code v2.1.176

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-15 11:09 AM PKT] Claude Code v2.1.176

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-16 11:08 AM PKT] Claude Code v2.1.178

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-17 11:08 AM PKT] Claude Code v2.1.179

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-18 11:06 AM PKT] Claude Code v2.1.181

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-19 11:13 AM PKT] Claude Code v2.1.183

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Changed Argument | Update `/config` — add `[key=value ...]` argument hint; expand description to cover key=value syntax (v2.1.181), non-interactive and Remote Control support, and `/config help` shorthand key listing (v2.1.183) | ✅ COMPLETE (updated signature and description at #7 in Config tag) |
| 2 | MED | Changed Argument | Update `/mcp` — add `[reconnect <server>\|enable\|disable [<server>\|all]]` argument syntax and expand description with subcommand details | ✅ COMPLETE (updated signature and description at #41 in Extensions tag) |
| 3 | MED | Changed Argument | Update `/plugin` — add `[subcommand]` argument hint; expand description with subcommand list | ✅ COMPLETE (updated signature and description at #42 in Extensions tag) |
| 4 | MED | Changed Argument | Update `/reload-plugins` — add `[--force]` argument hint and description of prompt-cache invalidation warning | ✅ COMPLETE (updated signature and description at #43 in Extensions tag) |
| 5 | MED | Changed Argument | Update `/review` — add `[PR]` optional argument hint per official docs | ✅ COMPLETE (updated signature at #57 in Project tag) |
| 6 | MED | Changed Description | Update `/focus` — change "a summary of tool calls" → "a one-line tool-call summary with edit diffstats"; add "The selection persists across sessions; set `viewMode` in settings to override it."; remove "Useful for reducing visual noise during long sessions." | ✅ COMPLETE (updated description at #8 in Config tag) |
| 7 | MED | Changed Description | Update `/goal` — add "With no argument, shows the current or most recently achieved goal."; expand clear aliases to include `stop`, `off`, `reset`, `none`, `cancel` | ✅ COMPLETE (updated description at #79 in Session tag) |
| 8 | MED | Changed Description | Update `/skills` — add "Press `Space` to hide a skill from Claude or the `/` menu, then `Enter` to save" | ✅ COMPLETE (updated description at #45 in Extensions tag) |
| 9 | MED | Changed Description | Update `/background` — add "Pass a prompt to send one more instruction before detaching. Monitor the session with `claude agents`." | ✅ COMPLETE (updated description at #71 in Session tag) |
| 10 | MED | Changed Description | Update `/tasks` — reword from "List and manage background tasks. Alias: /bashes" to "View and manage everything running in the background. Also available as /bashes" | ✅ COMPLETE (updated description at #34 in Debug tag) |
| 11 | LOW | Changed Description | Update `/stop` — add "Only available while attached to a background session;" and "To detach without stopping, use `/exit` or press `←`" | ✅ COMPLETE (updated description at #84 in Session tag) |
| 12 | LOW | Changed Description | Update `/exit` — add "In an attached background session, this detaches and the session keeps running." | ✅ COMPLETE (updated description at #77 in Session tag) |
| 13 | LOW | Changed Description | Update `/resume` — add "As of v2.1.144, background sessions appear in the picker marked with `bg`." | ✅ COMPLETE (updated description at #82 in Session tag) |
| 14 | LOW | Changed Description | Update `/ultrareview` — add "Includes 3 free runs on Pro and Max, then requires usage credits"; trim "Produces a structured review with prioritized findings." | ✅ COMPLETE (updated description at #60 in Project tag) |
| 15 | LOW | Changed Description | Update `/usage` — add "On a Pro, Max, Team, or Enterprise plan, includes a breakdown of usage by skill, subagent, plugin, and MCP server." | ✅ COMPLETE (updated description at #26 in Context tag) |
| 16 | LOW | Changed Description | Update `/radio` — add "Prints the stream URL when no browser is available. Not available on Bedrock, Vertex, or Foundry" | ✅ COMPLETE (updated description at #12 in Config tag) |
| 17 | LOW | Changed Description | Update `/tui` — reword description; add "With no argument, prints the active renderer" | ✅ COMPLETE (updated description at #19 in Config tag) |
| 18 | LOW | Changed Description | Update `/team-onboarding` — expand with output format detail and Pro/Max plan share link feature | ✅ COMPLETE (updated description at #59 in Project tag) |

---

## [2026-06-20 11:05 AM PKT] Claude Code v2.1.183

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-21 11:05 AM PKT] Claude Code v2.1.185

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-22 11:07 AM PKT] Claude Code v2.1.185

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-23 11:06 AM PKT] Claude Code v2.1.186

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-24 11:06 AM PKT] Claude Code v2.1.187

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-25 11:07 AM PKT] Claude Code v2.1.191

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Changed Description | Update `/model [model]` — docs now emphasize saving as default for new sessions; add `s` key for session-only switch | ✅ COMPLETE (updated description to match official docs) |
| 2 | MED | Changed Description | Update `/review [PR]` — docs now reference `/code-review` engine and note that no-argument invocation lists open PRs | ✅ COMPLETE (updated description to match official docs) |
| 3 | MED | Changed Description | Update `/install-github-app` — expanded to "Install the Claude GitHub App for a repository, with an optional step to set up GitHub Actions workflows and secrets" | ✅ COMPLETE (updated description to match official docs) |

---

## [2026-06-26 11:06 AM PKT] Claude Code v2.1.193

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-27 11:07 AM PKT] Claude Code v2.1.195

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | LOW | Scope Decision | Review `when_to_use` field — present in report (count 16) but official reference table lists only 15 fields; field is still mentioned inline in docs under the `description` row | ✋ ON HOLD (field still referenced inline in official docs — not removing until it is explicitly absent from reference table) |

---

## [2026-06-28 11:06 AM PKT] Claude Code v2.1.195

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-29 11:07 AM PKT] Claude Code v2.1.195

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 85 built-in commands).

---

## [2026-06-30 11:07 AM PKT] Claude Code v2.1.196

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Command | Add `/design-login` to Auth tag — Authorize design-system access for `/design-sync` with your claude.ai account | ✅ COMPLETE (added as #1 in Auth tag; existing rows 1–85 renumbered to 2–86; count updated 85 → 86) |

---

## [2026-07-01 11:07 AM PKT] Claude Code v2.1.197

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 86 built-in commands).

---

## [2026-07-02 11:06 AM PKT] Claude Code v2.1.198

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 86 built-in commands).

---

## [2026-07-03 11:06 AM PKT] Claude Code v2.1.199

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Changed Description | Update `/agents` — behavior changed in v2.1.198: now prints a reminder to ask Claude or edit `.claude/agents/`/`~/.claude/agents/` directly, rather than opening an interactive management UI | ✅ COMPLETE (updated description at #38 in Extensions tag) |

---

## [2026-07-04 11:06 AM PKT] Claude Code v2.1.201

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 86 built-in commands).

---

## [2026-07-05 11:06 AM PKT] Claude Code v2.1.201

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 86 built-in commands).

---

## [2026-07-06 11:07 AM PKT] Claude Code v2.1.201

No priority action items — report is fully in sync with official documentation (16 frontmatter fields, 86 built-in commands).

---

## [2026-07-07 11:06 AM PKT] Claude Code v2.1.202

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Changed Description | Update `/review [PR]` — official docs dropped "same review engine" claim after v2.1.198 reverted multi-agent operation back to a fast single-pass review; users directed to `/code-review` for deeper analysis | ✅ COMPLETE (updated description at #58 in Project tag) |
