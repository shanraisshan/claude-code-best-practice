# Settings Report — Changelog History

## Status Legend

| Status | Meaning |
|--------|---------|
| ✅ `COMPLETE (reason)` | Action was taken and resolved successfully |
| ❌ `INVALID (reason)` | Finding was incorrect, not applicable, or intentional |
| ✋ `ON HOLD (reason)` | Action deferred — waiting on external dependency or user decision |

---

## [2026-03-05 06:18 AM PKT] Claude Code v2.1.69

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Settings | Add 13 non-hook missing settings keys (`$schema`, `availableModels`, `fastModePerSessionOptIn`, `teammateMode`, `prefersReducedMotion`, `sandbox.filesystem.*`, `sandbox.network.allowManagedDomainsOnly`, `sandbox.enableWeakerNetworkIsolation`, `allowManagedMcpServersOnly`, `blockedMarketplaces`, `includeGitInstructions`, `pluginTrustMessage`, `fileSuggestion` table entry) | ✅ COMPLETE (added to report) |
| 2 | HIGH | Missing Env Vars | Add missing environment variables including `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING`, `CLAUDE_CODE_DISABLE_1M_CONTEXT`, `CLAUDE_CODE_ACCOUNT_UUID`, `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS`, `ENABLE_CLAUDEAI_MCP_SERVERS`, and more | ✅ COMPLETE (added 13 missing env vars to report) |
| 3 | HIGH | Effort Default | Update effort level default from "High" to "Medium" for Max/Team subscribers; add Sonnet 4.6 support (changed v2.1.68) | ✅ COMPLETE (updated default and added Sonnet note) |
| 4 | MED | Settings Hierarchy | Add managed settings via macOS plist/Windows Registry (v2.1.61/v2.1.69); document array merge behavior across scopes | ✅ COMPLETE (added plist/registry and merge note) |
| 5 | MED | Sandbox Filesystem | Add `sandbox.filesystem.allowWrite`, `denyWrite`, `denyRead` with path prefix semantics (`//`, `~/`, `/`, `./`) | ✅ COMPLETE (added to sandbox table) |
| 6 | MED | Permission Syntax | Add `Agent(name)` permission pattern; document `MCP(server:tool)` syntax form | ✅ COMPLETE (added to tool syntax table) |
| 7 | MED | Plugin Gaps | Add `blockedMarketplaces`, `pluginTrustMessage` | ✅ COMPLETE (added to plugins table) |
| 8 | MED | Model Config | Add `availableModels` setting | ✅ COMPLETE (added to general settings table) |
| 9 | MED | Suspect Keys | Verify `sandbox.network.deniedDomains`, `sandbox.ignoreViolations`, `pluginConfigs` — present in report but not in official docs | ✋ ON HOLD (kept in report pending verification) |
| 10 | LOW | Header Counts | Update header from "38 settings and 84 env vars" to reflect actual counts (~55+ settings, ~110+ env vars) | ✅ COMPLETE (updated header) |
| 11 | LOW | CLAUDE.md Sync | Update CLAUDE.md configuration hierarchy (add managed/CLI/user levels) | ✋ ON HOLD (awaiting user approval) |
| 12 | LOW | Example Update | Update Quick Reference example with `$schema`, sandbox filesystem, `Agent(*)`, remove hooks example | ✅ COMPLETE (updated example) |
| 13 | MED | Hooks Redirect | Replace hooks section with redirect to claude-code-hooks repo | ✅ COMPLETE (hooks externalized to dedicated repo) |

---

## [2026-03-07 02:17 PM PKT] Claude Code v2.1.71

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Changed Behavior | Fix `teammateMode`: type `boolean` → `string`, default `false` → `"auto"`, description → "Agent team display: auto, in-process, tmux" | ✅ COMPLETE (type, default, and description updated) |
| 2 | HIGH | New Setting | Add `allowManagedPermissionRulesOnly` to Permissions table (boolean, managed only) | ✅ COMPLETE (added to Permission Keys table) |
| 3 | HIGH | Missing Env Vars | Add ~31 missing env vars including confirmed (`CLAUDE_CODE_MAX_OUTPUT_TOKENS`, `CLAUDE_CODE_DISABLE_FAST_MODE`, `CLAUDE_CODE_DISABLE_AUTO_MEMORY`, `CLAUDE_CODE_USER_EMAIL`, `CLAUDE_CODE_ORGANIZATION_UUID`, `CLAUDE_CONFIG_DIR`) and agent-reported (Foundry, Bedrock, mTLS, shell prefix, etc.) | ✅ COMPLETE (added 31 env vars to table) |
| 4 | MED | Changed Default | Fix `plansDirectory` default from `.claude/plans/` to `~/.claude/plans` | ✅ COMPLETE (default updated) |
| 5 | MED | Changed Description | Fix `sandbox.enableWeakerNetworkIsolation` description to "(macOS only) Allow access to system TLS trust; reduces security" | ✅ COMPLETE (description updated) |
| 6 | MED | Scope Fix | Fix `extraKnownMarketplaces` scope from "Any" to "Project" | ✅ COMPLETE (scope and description updated) |
| 7 | MED | Boundary Violation | Replace `CLAUDE_CODE_EFFORT_LEVEL` in `claude-cli-startup-flags.md` with cross-reference to settings report | ✅ COMPLETE (replaced with link) |
| 8 | MED | Version Badge | Update report version from v2.1.69 to v2.1.71 | ✅ COMPLETE (badge and header updated) |
| 9 | LOW | Suspect Keys | Verify `skipWebFetchPreflight`, `sandbox.ignoreViolations`, `sandbox.network.deniedDomains`, `skippedMarketplaces`, `skippedPlugins`, `pluginConfigs` | ✋ ON HOLD (kept in report pending verification — recurring from 2026-03-05) |
| 10 | LOW | CLAUDE.md Sync | Update CLAUDE.md configuration hierarchy (3 levels → 5+) | ✅ COMPLETE (updated to 5-level hierarchy with managed layer) |

---

## [2026-03-12 12:23 PM PKT] Claude Code v2.1.74

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Changed Behavior | Fix `dontAsk` permission mode description: "Auto-accept all tools" → "Auto-denies tools unless pre-approved via `/permissions` or `permissions.allow` rules" | ✅ COMPLETE (description corrected per official permissions docs) |
| 2 | HIGH | New Setting | Add `modelOverrides` to Model Configuration section (object, maps Anthropic model IDs to provider-specific IDs like Bedrock ARNs) | ✅ COMPLETE (added with example and description) |
| 3 | HIGH | New Setting | Add `allow_remote_sessions` to managed-only settings list (boolean, defaults `true`, controls Remote Control/web session access) | ✅ COMPLETE (added to Permission Keys table) |
| 4 | HIGH | Changed Default | Fix `$schema` URL from `https://www.schemastore.org/...` to `https://json.schemastore.org/...` per official docs | ✅ COMPLETE (updated in description, example, and Sources) |
| 5 | MED | Changed Description | Fix `ANTHROPIC_CUSTOM_HEADERS` format description from "JSON string" to "Name: Value format, newline-separated" | ✅ COMPLETE (description updated per official docs) |
| 6 | MED | Unverified Modes | `askEdits` and `viewOnly` permission modes not in official docs — only 5 modes documented (default, acceptEdits, plan, dontAsk, bypassPermissions) | ✅ COMPLETE (marked as "not in official docs — unverified" in table) |
| 7 | MED | Missing Env Vars | Add `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS`, `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY`, `CLAUDE_CODE_DISABLE_TERMINAL_TITLE`, `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL`, `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS` | ✅ COMPLETE (added 5 env vars plus `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS`) |
| 8 | MED | New Setting | Add `autoMemoryDirectory` to Core Configuration (string, custom auto-memory directory) — version uncertain (agents disagree: v2.1.68 vs v2.1.74), not on settings page | ✅ COMPLETE (added near plansDirectory — version unresolved) |
| 9 | LOW | Suspect Keys | Verify `skipWebFetchPreflight`, `sandbox.ignoreViolations`, `sandbox.network.deniedDomains`, `skippedMarketplaces`, `skippedPlugins`, `pluginConfigs` — still not in official docs | ✋ ON HOLD (kept in report pending verification — recurring from 2026-03-05) |
| 10 | LOW | Missing Env Var | Add `CLAUDE_CODE_SUBAGENT_MODEL` to env vars table (already in Model env example block but missing from table) | ✅ COMPLETE (added to env vars table) |
| 11 | LOW | Example Update | Update Quick Reference example to include `modelOverrides` and corrected `$schema` URL | ✅ COMPLETE (example updated with both) |

---

## [2026-03-14 01:35 AM PKT] Claude Code v2.1.75

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Settings Hierarchy | Restructure to match official 5-level hierarchy: Managed (#1) > CLI args > Local > Project > User. Remove `~/.claude/settings.local.json` row. Add managed-tier internal precedence (server-managed > MDM > file > HKCU). Note Managed "cannot be overridden by any other level, including CLI args" | ✅ COMPLETE (restructured table to 5 levels with Managed as #1, added delivery methods, internal precedence, and file paths) |
| 2 | HIGH | Changed Behavior | Fix `availableModels` description: change from complex object array (`title`/`modelId`/`effortOptions`) to simple string array `["sonnet", "haiku"]` per official docs | ✅ COMPLETE (updated description to match official docs format) |
| 3 | HIGH | Changed Behavior | Add `cleanupPeriodDays` `0`-value behavior: "Setting to `0` deletes all existing transcripts at startup and disables session persistence entirely" | ✅ COMPLETE (added 0-value behavior to description) |
| 4 | HIGH | Permission Syntax | Add evaluation order note to Permissions section: "Rules are evaluated in order: deny rules first, then ask, then allow. The first matching rule wins." | ✅ COMPLETE (added evaluation order before Bash wildcard notes) |
| 5 | MED | Changed Description | Add `autoMemoryDirectory` scope restriction: "Not accepted in project settings (`.claude/settings.json`). Accepted from policy, local, and user settings" | ✅ COMPLETE (added scope restriction to description) |
| 6 | MED | Changed Description | Add `permissions.defaultMode` Remote environment note: only `acceptEdits` and `plan` are honored in Remote environments (v2.1.70) | ✅ COMPLETE (added Remote restriction to description) |
| 7 | MED | Model Config | Add Opus 4.6 1M context default note: as of v2.1.75, 1M context is default for Max/Team/Enterprise plans | ✅ COMPLETE (added to Effort Level note) |
| 8 | MED | Settings Hierarchy | Add Windows managed path note: v2.1.75 removed deprecated `C:\ProgramData\ClaudeCode\` fallback — use `C:\Program Files\ClaudeCode\managed-settings.json` | ✅ COMPLETE (added deprecation note in hierarchy section) |
| 9 | MED | Display & UX | Add `fileSuggestion` stdin JSON format (`{"query": "..."}`) and 15-path output limit detail | ✅ COMPLETE (added stdin format and output limit to File Suggestion section) |
| 10 | MED | Settings Hierarchy | Update array merge note from "merged" to "concatenated and deduplicated" per official docs | ✅ COMPLETE (updated wording in hierarchy Important section) |
| 11 | LOW | Suspect Keys | `sandbox.ignoreViolations`, `sandbox.network.deniedDomains` still not in official docs or JSON schema top-level | ✋ ON HOLD (kept in report pending verification — recurring from 2026-03-05) |
| 12 | LOW | Suspect Keys | `skipWebFetchPreflight`, `skippedMarketplaces`, `skippedPlugins`, `pluginConfigs` — confirmed in JSON schema but not on official settings page | ✋ ON HOLD (kept in report — valid per schema, recurring from 2026-03-05) |

---

## [2026-03-15 12:52 PM PKT] Claude Code v2.1.76

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Setting | Add `effortLevel` to General Settings or Model Configuration — persists effort level across sessions (`"low"`, `"medium"`, `"high"`). Confirmed on official settings page | ✋ ON HOLD (awaiting user approval) |
| 2 | HIGH | New Settings | Add Worktree Settings section with `worktree.sparsePaths` (array, sparse-checkout cone mode) and `worktree.symlinkDirectories` (array, symlink dirs to avoid duplication). Confirmed on official settings page | ✋ ON HOLD (awaiting user approval) |
| 3 | HIGH | New Setting | Add `feedbackSurveyRate` to General Settings — probability (0-1) for session quality survey. Confirmed on official settings page | ✋ ON HOLD (awaiting user approval) |
| 4 | HIGH | Missing Env Vars | Add 20 missing env vars to table: `CLAUDE_CODE_AUTO_COMPACT_WINDOW`, `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION`, `CLAUDE_CODE_PLAN_MODE_REQUIRED`, `CLAUDE_CODE_TEAM_NAME`, `CLAUDE_CODE_TASK_LIST_ID`, `CLAUDE_ENV_FILE`, `FORCE_AUTOUPDATE_PLUGINS`, `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`, `MCP_TOOL_TIMEOUT`, `MCP_CLIENT_SECRET`, `MCP_OAUTH_CALLBACK_PORT`, `IS_DEMO`, `SLASH_COMMAND_TOOL_CHAR_BUDGET`, `VERTEX_REGION_CLAUDE_3_5_HAIKU`, `VERTEX_REGION_CLAUDE_3_7_SONNET`, `VERTEX_REGION_CLAUDE_4_0_OPUS`, `VERTEX_REGION_CLAUDE_4_0_SONNET`, `VERTEX_REGION_CLAUDE_4_1_OPUS`. Confirmed on official /en/env-vars page | ✋ ON HOLD (awaiting user approval) |
| 5 | HIGH | Missing Env Vars | Move `ANTHROPIC_DEFAULT_OPUS_MODEL`, `ANTHROPIC_DEFAULT_SONNET_MODEL`, `MAX_THINKING_TOKENS` from code-block-only to Common Environment Variables table | ✋ ON HOLD (awaiting user approval) |
| 6 | HIGH | Broken Link | Fix `https://claudelog.com/configuration/` — returns ECONNREFUSED. Remove or replace with working source | ✋ ON HOLD (awaiting user approval) |
| 7 | MED | Changed Description | Update `cleanupPeriodDays` description to add: "hooks receive an empty `transcript_path`" when set to 0. Per official docs | ✋ ON HOLD (awaiting user approval) |
| 8 | MED | Unverified Env Vars | Mark 7 env vars in report but NOT in official docs as unverified: `CLAUDE_CODE_DISABLE_MCP`, `CLAUDE_CODE_DISABLE_TOOLS`, `CLAUDE_CODE_HIDE_ACCOUNT_INFO`, `CLAUDE_CODE_MAX_TURNS`, `CLAUDE_CODE_PROMPT_CACHING_ENABLED`, `CLAUDE_CODE_SKIP_SETTINGS_SETUP`, `DISABLE_NON_ESSENTIAL_MODEL_CALLS` | ✋ ON HOLD (awaiting user approval) |
| 9 | MED | New Source | Add `https://code.claude.com/docs/en/env-vars` to Sources section — official env vars reference page | ✋ ON HOLD (awaiting user approval) |
| 10 | MED | Example Update | Update Quick Reference example to include `effortLevel` and `worktree` settings | ✋ ON HOLD (awaiting user approval) |
| 11 | LOW | Suspect Keys | `sandbox.ignoreViolations`, `sandbox.network.deniedDomains` still not in official docs sandbox table | ✋ ON HOLD (kept in report pending verification — recurring from 2026-03-05) |
| 12 | LOW | Suspect Keys | `skipWebFetchPreflight`, `skippedMarketplaces`, `skippedPlugins`, `pluginConfigs` — still in JSON schema but not on official settings page | ✋ ON HOLD (kept in report — valid per schema, recurring from 2026-03-05) |

---

## [2026-03-15 01:10 PM PKT] Claude Code v2.1.76

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Setting | Add `effortLevel` to Model Configuration — persists effort level across sessions (`"low"`, `"medium"`, `"high"`). Also added `/effort` command to Useful Commands and updated Effort Level how-to section | ✅ COMPLETE (added to Model Overrides table, updated how-to, added /effort command) |
| 2 | HIGH | New Settings | Add Worktree Settings section with `worktree.sparsePaths` (array, sparse-checkout cone mode) and `worktree.symlinkDirectories` (array, symlink dirs to avoid duplication) | ✅ COMPLETE (new Worktree Settings subsection in Core Configuration with table and example) |
| 3 | HIGH | New Setting | Add `feedbackSurveyRate` to General Settings — probability (0-1) for session quality survey | ✅ COMPLETE (added to General Settings table) |
| 4 | HIGH | Missing Env Vars | Add 23 missing env vars to table (20 genuinely new + 3 from code-block-only) | ✅ COMPLETE (added all 23 env vars to Common Environment Variables table) |
| 5 | HIGH | Broken Link | Previous run flagged `https://claudelog.com/configuration/` as ECONNREFUSED — now loads successfully | ✅ COMPLETE (link restored, no action needed) |
| 6 | MED | Permission Syntax | Add Read/Edit gitignore-style path patterns (`//path`, `~/path`, `/path`, `./path`), word-boundary wildcard detail, and legacy `:*` deprecation note | ✅ COMPLETE (added path patterns table, word-boundary note, and `:*` deprecation) |
| 7 | MED | Changed Description | Update `cleanupPeriodDays` to add "hooks receive an empty `transcript_path`" when set to 0 | ✅ COMPLETE (added to description) |
| 8 | MED | Unverified Env Vars | Mark 7 env vars not in official docs as unverified | ✅ COMPLETE (added "not in official docs — unverified" markers) |
| 9 | MED | New Source | Add `https://code.claude.com/docs/en/env-vars` and `https://code.claude.com/docs/en/permissions` to Sources section | ✅ COMPLETE (added both URLs) |
| 10 | MED | Example Update | Update Quick Reference example to include `effortLevel` and `worktree` settings | ✅ COMPLETE (added effortLevel and worktree block to example) |
| 11 | LOW | Suspect Keys | `sandbox.ignoreViolations`, `sandbox.network.deniedDomains` still not in official docs sandbox table | ✋ ON HOLD (kept in report pending verification — recurring from 2026-03-05) |
| 12 | LOW | Suspect Keys | `skipWebFetchPreflight`, `skippedMarketplaces`, `skippedPlugins`, `pluginConfigs` — still in JSON schema but not on official settings page | ✋ ON HOLD (kept in report — valid per schema, recurring from 2026-03-05) |

---

## [2026-03-17 12:54 PM PKT] Claude Code v2.1.77

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Setting | Add `sandbox.filesystem.allowRead` to Sandbox Settings table — re-allows read access within `denyRead` regions (array, default `[]`). Confirmed in v2.1.77 changelog | ✅ COMPLETE (added to Sandbox Settings table after denyRead row) |
| 2 | HIGH | Changed Description | Update `CLAUDE_CODE_MAX_OUTPUT_TOKENS` description: default for Opus 4.6 increased to 64k, upper bound for Opus 4.6 and Sonnet 4.6 increased to 128k (v2.1.77 changelog) | ✅ COMPLETE (description updated with model-specific defaults and bounds) |
| 3 | HIGH | Missing Env Var | Add `CLAUDECODE` to Common Environment Variables table — set to `1` in spawned shell environments. Confirmed on official /en/env-vars page | ✅ COMPLETE (added to env var table) |
| 4 | HIGH | Missing Env Var | Add `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS` to Common Environment Variables table — allows fast mode when org status check fails. Confirmed on official /en/env-vars page | ✅ COMPLETE (added to env var table) |
| 5 | MED | Env Var Table | Move `ANTHROPIC_MODEL` and `ANTHROPIC_DEFAULT_HAIKU_MODEL` from code-block-only to Common Environment Variables table. Both confirmed on official /en/env-vars page | ✅ COMPLETE (added both to env var table near other ANTHROPIC_ vars) |
| 6 | MED | Suspect Key Escalation | `sandbox.network.deniedDomains` — 8 consecutive ON HOLD runs (since 2026-03-05). NOT in official docs page or JSON schema. Per Rule 10B: mark as "not in official docs — unverified" | ✅ COMPLETE (added unverified annotation to description) |
| 7 | MED | Suspect Key Escalation | `allow_remote_sessions` — NOT in official docs page or JSON schema. Mark as "not in official docs — unverified" | ✅ COMPLETE (added unverified annotation to description) |
| 8 | LOW | Suspect Key Resolution | `sandbox.ignoreViolations` — 8 consecutive ON HOLD runs. Confirmed in JSON schema. Annotate: "in JSON schema, not on official settings page" | ✅ COMPLETE (added schema annotation to description) |
| 9 | LOW | Suspect Key Resolution | `skipWebFetchPreflight`, `skippedMarketplaces`, `skippedPlugins`, `pluginConfigs` — 8 consecutive ON HOLD runs. All confirmed in JSON schema. Annotate: "in JSON schema, not on official settings page" | ✅ COMPLETE (added schema annotation to all 4 descriptions) |
| 10 | LOW | Header Count | Update header env var count from "160+" to "100+" — actual table has 97 env vars | ✅ COMPLETE (header updated to "100+ environment variables", version to v2.1.77) |

---

## [2026-03-18 11:53 PM PKT] Claude Code v2.1.78

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Setting | Add `voiceEnabled` to General Settings table — enable push-to-talk voice dictation (boolean, written by `/voice`, requires Claude.ai account). Confirmed on official settings page | ✅ COMPLETE (added to General Settings table before feedbackSurveyRate) |
| 2 | HIGH | Missing Setting | Add `filesystem.allowManagedReadPathsOnly` to Sandbox Settings table — managed-only, only managed `allowRead` paths are respected (boolean, default false). Confirmed on official settings page | ✅ COMPLETE (added to Sandbox Settings table before enableWeakerNetworkIsolation) |
| 3 | HIGH | Display Location | Move `showTurnDuration` and `terminalProgressBarEnabled` from Display Settings table to a separate "Global Config Settings (~/.claude.json)" subsection. Official docs state: "Adding them to settings.json will trigger a schema validation error" | ✅ COMPLETE (created new subsection with table; removed from settings.json Display Settings table and examples) |
| 4 | HIGH | Changed Default | Fix `MAX_MCP_OUTPUT_TOKENS` default from 50000 to 25000. Official /en/env-vars page confirms default: 25000 | ✅ COMPLETE (default updated, added warning threshold note) |
| 5 | HIGH | Missing Env Vars | Add `CLAUDE_CODE_NEW_INIT`, `CLAUDE_CODE_PLUGIN_SEED_DIR`, `DISABLE_FEEDBACK_COMMAND` to env vars table. All confirmed on official /en/env-vars page | ✅ COMPLETE (added all 3 env vars to table) |
| 6 | MED | Verification Fix | Remove "unverified" annotation from `allow_remote_sessions` — now confirmed on official permissions page as a managed-only setting. Previous run (v2.1.77 #7) incorrectly marked it unverified | ✅ COMPLETE (removed "unverified" annotation) |
| 7 | MED | Env Var Rename | Update `DISABLE_BUG_COMMAND` to `DISABLE_FEEDBACK_COMMAND` — official docs say `DISABLE_FEEDBACK_COMMAND` is the current name, `DISABLE_BUG_COMMAND` is "the older name" | ✅ COMPLETE (renamed with alias note) |
| 8 | MED | Changed Description | Update `CLAUDE_CODE_EFFORT_LEVEL` to include `max` (Opus 4.6 only) and `auto` values. Official /en/env-vars page confirms: "Values: low, medium, high, max (Opus 4.6 only), or auto" | ✅ COMPLETE (description updated with all values and precedence note) |
| 9 | MED | Changed Description | Fix `CLAUDE_CODE_ENABLE_TASKS` description — official: "Set to true to enable task tracking in non-interactive mode (-p flag). Tasks are on by default in interactive mode." Report currently says "Set to false to disable" | ✅ COMPLETE (description corrected to match official docs) |
| 10 | MED | Changed Description | Update `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` to note: "Equivalent of setting DISABLE_AUTOUPDATER, DISABLE_FEEDBACK_COMMAND, DISABLE_ERROR_REPORTING, and DISABLE_TELEMETRY" | ✅ COMPLETE (description updated with equivalent vars list) |
| 11 | MED | Example Update | Remove `showTurnDuration` from Quick Reference example — doesn't belong in settings.json per official docs | ✅ COMPLETE (removed from Quick Reference example and Display & UX example) |
| 12 | LOW | Env Var Default | Verify `MCP_TIMEOUT` default (report says 10000) — official docs don't specify a default value | ✅ COMPLETE (removed unverified default — official docs omit it) |

---

## [2026-03-19 12:38 PM PKT] Claude Code v2.1.79

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Env Vars | Add `ANTHROPIC_CUSTOM_MODEL_OPTION`, `ANTHROPIC_CUSTOM_MODEL_OPTION_NAME`, `ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION` to Common Environment Variables table — model-config vars for adding custom entries to `/model` picker. Confirmed on official /en/env-vars page | ✅ COMPLETE (added 3 env vars after ANTHROPIC_BASE_URL in table) |
| 2 | HIGH | Changed Description | Update `CLAUDE_CODE_PLUGIN_SEED_DIR` from singular to plural: "Path to one or more read-only plugin seed directories, separated by `:` on Unix or `;` on Windows". Changed in v2.1.79 changelog. Confirmed on official /en/env-vars page | ✅ COMPLETE (description updated to multi-directory support) |
| 3 | HIGH | Sandbox Path Prefixes | Fix sandbox.filesystem path prefix documentation: `/` = absolute (standard Unix), `./` = project-relative, `//` = legacy still works. Report currently shows reversed convention. Official docs explicitly note: "This syntax differs from Read and Edit permission rules" | ✅ COMPLETE (updated all 4 sandbox.filesystem entries with correct prefix convention, added cross-reference note to Read/Edit permission rules, added merge-across-scopes detail) |
| 4 | MED | Changed Description | Expand `CLAUDE_CODE_AUTO_COMPACT_WINDOW` description — current "Auto-compact window behavior configuration" is too minimal. Official docs describe: token capacity, defaults (200K standard / 1M extended), interaction with `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`, status line decoupling | ✅ COMPLETE (expanded description with token capacity, model defaults, AUTOCOMPACT_PCT interaction, and status line decoupling) |

---

## [2026-03-20 08:41 AM PKT] Claude Code v2.1.80

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Setting | Add `channelsEnabled` to MCP Settings table — managed-only boolean, controls channel message delivery for Team and Enterprise users. Confirmed on official settings page | ✅ COMPLETE (added to MCP Settings table after allowManagedMcpServersOnly) |
| 2 | MED | Version Badge | Update report version from v2.1.79 to v2.1.80 | ✅ COMPLETE (badge and header updated) |

---

## [2026-03-21 09:17 PM PKT] Claude Code v2.1.81

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Settings (~/.claude.json) | Add `autoConnectIde` (boolean, default `false`) and `autoInstallIdeExtension` (boolean, default `true`) to Global Config Settings table. Confirmed on official settings page under "Global config settings" | ✅ COMPLETE (added both keys to ~/.claude.json table before showTurnDuration) |
| 2 | HIGH | Incorrect Setting | `allow_remote_sessions` listed in Permission Keys table as managed-only boolean, but official permissions page states: "Access to Remote Control and web sessions is not controlled by a managed settings key." Mark as unverified or remove | ✅ COMPLETE (re-added unverified annotation with official docs quote and admin UI link) |
| 3 | MED | Version Bump | Update report version badge from v2.1.80 to v2.1.81 | ✅ COMPLETE (badge, header version, and header text updated) |
| 4 | MED | New Setting | Add `showClearContextOnPlanAccept` — confirmed in v2.1.81 changelog. When `true`, restores "clear context" option on plan accept (hidden by default). Not yet on official settings page — may be a `~/.claude.json` key | ✅ COMPLETE (added to Global Config Settings table with changelog-source note) |
| 5 | MED | Plugin Documentation | Document `source: 'settings'` as a marketplace source type in Plugin Settings section. Official settings page lists it as one of 7 source types for `extraKnownMarketplaces` | ✅ COMPLETE (added all 7 source types list, inline marketplace example) |
| 6 | MED | Status Line Fields | Add `rate_limits` field group to Status Line Input Fields table — includes `five_hour.used_percentage`, `five_hour.resets_at`, `seven_day.used_percentage`, `seven_day.resets_at`. Added in v2.1.80 | ✅ COMPLETE (added 4 rate_limits fields to Status Line Input Fields table) |

---

## [2026-03-23 10:02 PM PKT] Claude Code v2.1.81

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Setting (~/.claude.json) | Add `editorMode` (string, default `"normal"`, values: `"normal"` or `"vim"`) to Global Config Settings table. Written automatically when running `/vim`. Confirmed on official settings page | ✅ COMPLETE (added to Global Config Settings table after autoInstallIdeExtension) |
| 2 | HIGH | File Scope Fix | Move `showClearContextOnPlanAccept` from Global Config Settings (~/.claude.json) to General Settings (settings.json). Official docs now list it in the main Available settings table, not the Global config table. Remove stale annotation "not yet on official settings page" | ✅ COMPLETE (moved to General Settings table before feedbackSurveyRate, removed stale annotation) |
| 3 | MED | Changed Description | Fix `terminalProgressBarEnabled` supported terminals from "Windows Terminal, iTerm2" to "ConEmu, Ghostty 1.2.0+, and iTerm2 3.6.6+" per official docs | ✅ COMPLETE (terminal list updated) |
| 4 | MED | Changed Description | Add "Config tool" to `availableModels` description — official docs say "via `/model`, `--model`, Config tool, or `ANTHROPIC_MODEL`". Report currently omits "Config tool" | ✅ COMPLETE (added "Config tool" to description) |

---

## [2026-03-25 08:16 PM PKT] Claude Code v2.1.83

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Setting | Add `autoMode` to Permissions section — object with `environment`, `allow`, `soft_deny` arrays for configuring auto mode classifier. Not read from shared project settings (`.claude/settings.json`). Available in user, local, and managed settings. Confirmed on official settings + permissions pages | ✅ COMPLETE (added to Permission Keys table with full description, scope restrictions, and `claude auto-mode defaults` note) |
| 2 | HIGH | New Setting | Add `disableAutoMode` to Permissions section — string, set to `"disable"` to prevent auto mode activation. Removes `auto` from Shift+Tab cycle. Can be set at any settings level, most useful in managed settings. Confirmed on official settings + permissions pages | ✅ COMPLETE (added to Permission Keys table after `autoMode`) |
| 3 | HIGH | New Permission Mode | Add `auto` to Permission Modes table — background classifier replaces manual prompts. Research preview. Requires Team plan + Sonnet/Opus 4.6. Confirmed on official permission-modes page | ✅ COMPLETE (added to Permission Modes table with classifier details and fallback behavior) |
| 4 | HIGH | New Setting | Add `sandbox.failIfUnavailable` to Sandbox Settings table — boolean, default `false`, exit with error when sandbox enabled but cannot start instead of running unsandboxed. Confirmed in v2.1.83 changelog | ✅ COMPLETE (added to Sandbox Settings table after `sandbox.enabled`) |
| 5 | HIGH | New Setting | Add `disableDeepLinkRegistration` to General Settings table — boolean, prevent `claude-cli://` protocol handler registration. Confirmed in v2.1.83 changelog | ✅ COMPLETE (added to General Settings table before `feedbackSurveyRate`) |
| 6 | HIGH | Missing Env Var | Add `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` to Common Environment Variables table — set to `1` to strip Anthropic and cloud provider credentials from subprocess environments (Bash tool, hooks, MCP stdio servers). Confirmed in v2.1.83 changelog | ✅ COMPLETE (added to env vars table after `CLAUDE_CODE_SUBAGENT_MODEL`) |
| 7 | HIGH | Settings Hierarchy | Add `managed-settings.d/` drop-in directory to Managed Settings section — independent policy fragments alongside `managed-settings.json` that merge alphabetically. Confirmed in v2.1.83 changelog | ✅ COMPLETE (added as bullet under managed settings delivery methods) |
| 8 | HIGH | Broken Link | Fix `https://claudelog.com/configuration/` in Sources — returns 403 Forbidden. Remove or replace with working source | ✅ COMPLETE (replaced with `https://claudelog.com/claude-code-changelog/` which was verified working) |
| 9 | MED | Version Badge | Update report version from v2.1.81 to v2.1.83 | ✅ COMPLETE (badge and header updated in Phase 2.6) |
| 10 | MED | Example Update | Add `autoMode` to Quick Reference example to demonstrate auto mode classifier configuration | ✅ COMPLETE (added `autoMode` block with `environment` array before `permissions` block) |
| 11 | MED | Changed Path | Fix Windows registry path from `Software\Anthropic\ClaudeCode` to `SOFTWARE\Policies\ClaudeCode` (HKLM and HKCU). Official docs updated to use `Policies` subkey | ✅ COMPLETE (updated to `HKLM\SOFTWARE\Policies\ClaudeCode` and `HKCU\SOFTWARE\Policies\ClaudeCode` with priority note) |
| 12 | LOW | Missing Alias | Add `opus[1m]` to Model Aliases table — Opus 4.6 with 1M context, available by default on Max/Team/Enterprise since v2.1.75 | ✅ COMPLETE (added to Model Aliases table after `sonnet[1m]`) |

---

## [2026-03-26 01:04 PM PKT] Claude Code v2.1.84

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Setting | Add `defaultShell` to General Settings — string, default `"bash"`, accepts `"bash"` or `"powershell"`. Routes interactive `!` commands through PowerShell on Windows. Requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`. Confirmed on official settings page | ✅ COMPLETE (added to General Settings table after teammateMode) |
| 2 | HIGH | New Setting | Add `allowedChannelPlugins` to MCP Settings — array, managed-only. Allowlist of channel plugins that may push messages. Replaces default Anthropic allowlist when set. Requires `channelsEnabled: true`. Confirmed on official settings page | ✅ COMPLETE (added to MCP Settings table after channelsEnabled) |
| 3 | HIGH | New Setting | Add `useAutoModeDuringPlan` to Permission Keys — boolean, default `true`. Plan mode uses auto mode semantics when auto mode is available. Not read from shared project settings. Confirmed on official settings page | ✅ COMPLETE (added to Permission Keys table after disableAutoMode) |
| 4 | HIGH | Missing Env Vars | Add 9 model customization env vars: `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL_{NAME,DESCRIPTION,SUPPORTED_CAPABILITIES}` for `/model` picker customization on Bedrock/Vertex/Foundry. Confirmed on official /en/env-vars page | ✅ COMPLETE (added 3 vars after each base model var: Haiku, Opus, Sonnet) |
| 5 | HIGH | Missing Env Var | Add `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` — disable non-streaming fallback when streaming fails. Prevents duplicate tool execution via proxy. Confirmed on official /en/env-vars page (added v2.1.83, missed in previous run) | ✅ COMPLETE (added after CLAUDE_CODE_DISABLE_FAST_MODE) |
| 6 | HIGH | Missing Env Var | Add `CLAUDE_CODE_USE_POWERSHELL_TOOL` — enable PowerShell tool on Windows (opt-in preview). Native Windows only, not WSL. Confirmed on official /en/env-vars page | ✅ COMPLETE (added after CLAUDE_CODE_USE_FOUNDRY) |
| 7 | HIGH | Broken Link | Fix `https://claudelog.com/claude-code-changelog/` in Sources — returns 403 Forbidden. Replace with official GitHub changelog URL | ✅ COMPLETE (replaced with github.com/anthropics/claude-code/blob/main/CHANGELOG.md) |
| 8 | MED | Settings Hierarchy | Update managed tier precedence: "file-based (`managed-settings.d/*.json` + `managed-settings.json`)" and add "across tiers" qualifier. Add within-tier merge note per official docs | ✅ COMPLETE (updated precedence description with file-based tier and cross-tier qualifier) |
| 9 | MED | Settings Hierarchy | Expand drop-in directory merge semantics: systemd convention, scalar override, array concat+dedup, deep merge, hidden file exclusion, numeric prefix tip. Per official settings page | ✅ COMPLETE (expanded with full systemd convention details and numeric prefix tip) |
| 10 | MED | Annotation | Add "in changelog, not on official settings page" annotation to `disableDeepLinkRegistration` per Rule 1F inverse completeness check | ✅ COMPLETE (added annotation to description) |
| 11 | MED | Example Update | Add `defaultShell` to Quick Reference example to demonstrate PowerShell configuration | ✅ COMPLETE (added "defaultShell": "bash" to example) |

---

## [2026-03-27 06:32 PM PKT] Claude Code v2.1.85

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Env Var | Add `CLAUDE_STREAM_IDLE_TIMEOUT_MS` to Common Environment Variables table — timeout in ms before streaming idle watchdog closes stalled connection (default: 90000). Confirmed on official /en/env-vars page. Added in v2.1.84 but missed in previous run | ✅ COMPLETE (added to env vars table after CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS) |
| 2 | HIGH | Version Bump | Update report version badge from v2.1.84 to v2.1.85 | ✅ COMPLETE (badge, header version, and header text updated in Phase 2.6) |
| 3 | MED | New Env Var | Add `OTEL_LOG_TOOL_DETAILS` to env vars table — gates `tool_parameters` in OpenTelemetry events. v2.1.85 changelog only (not yet on official env-vars page). Add with changelog-source annotation | ✅ COMPLETE (added with "in v2.1.85 changelog, not yet on official env-vars page" annotation) |
| 4 | MED | New Env Vars (Ownership) | Decide ownership for `CLAUDE_CODE_MCP_SERVER_NAME` and `CLAUDE_CODE_MCP_SERVER_URL` — env vars passed to MCP `headersHelper` scripts (v2.1.85 changelog). May belong in hooks repo rather than settings report | ✅ COMPLETE (added to settings report with changelog annotation — these are env-configurable via `env` key, not hook-only) |

---

## [2026-03-28 06:10 PM PKT] Claude Code v2.1.86

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | File Scope | Move `teammateMode` from General Settings (settings.json) to Global Config Settings (~/.claude.json). Official settings page lists it under "Global config settings" — adding to settings.json triggers schema validation error (Rule 1H). Same pattern as v2.1.78 `showTurnDuration` fix | ✅ COMPLETE (removed from General Settings table, added to Global Config Settings table after terminalProgressBarEnabled with agent-teams docs link) |
| 2 | HIGH | Type + Annotation | Fix `disableDeepLinkRegistration`: change type from `boolean` to `string` (value: `"disable"`), update description to match official docs, remove stale "(in changelog, not on official settings page)" annotation. Now confirmed on official settings page (line 169) | ✅ COMPLETE (type changed to string, description updated to match official docs, changelog annotation removed) |
| 3 | HIGH | Version Bump | Update report version badge from v2.1.85 to v2.1.86 | ✅ COMPLETE (badge and header updated in Phase 2.6) |

---

## [2026-03-31 07:02 PM PKT] Claude Code v2.1.88

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Env Var | Add `CLAUDE_CODE_NO_FLICKER` to Common Environment Variables table — enable flicker-free alt-screen rendering (v2.1.88). Confirmed on official /en/env-vars page | ✅ COMPLETE (added after CLAUDE_CODE_DISABLE_TERMINAL_TITLE) |
| 2 | HIGH | Missing Env Vars | Add `CLAUDE_CODE_SCROLL_SPEED` and `CLAUDE_CODE_DISABLE_MOUSE` to Common Environment Variables table — fullscreen UI controls. Confirmed on official /en/env-vars page | ✅ COMPLETE (added after CLAUDE_CODE_NO_FLICKER) |
| 3 | HIGH | Version Bump | Update report version badge from v2.1.86 to v2.1.88 | ✅ COMPLETE (badge, header version, and header text updated in Phase 2.6) |
| 4 | HIGH | Broken Link | Fix `https://www.eesel.ai/blog/settings-json-claude-code` in Sources — returns CSS-only content, no readable blog post | ✅ COMPLETE (removed broken link from Sources section) |
| 5 | MED | Settings Hierarchy | Add `managed-mcp.json` to file-based managed delivery methods — official settings page lists it alongside `managed-settings.json` for MCP server configuration | ✅ COMPLETE (added to File delivery method bullet in Settings Hierarchy) |
| 6 | MED | Plugin Source Types | Annotate `url`, `npm`, `file` marketplace source types as "not in official docs — unverified" (only `github`, `git`, `directory`, `hostPattern`, `settings` confirmed) | ✅ COMPLETE (added unverified annotations to all 3 source types) |
| 7 | LOW | Header Count | Update header from "60+ settings" to match actual table count after any additions | ❌ INVALID (count is accurate — 60+ settings and 125 env vars, both within stated ranges) |

---

## [2026-04-01 12:32 PM PKT] Claude Code v2.1.89

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Setting | Add `skipDangerousModePermissionPrompt` to Permission Keys table — boolean, skip bypass-mode confirmation prompt. Ignored in project settings. Confirmed on official settings page | ✅ COMPLETE (added after disableBypassPermissionsMode in Permission Keys table) |
| 2 | HIGH | New Setting | Add `showThinkingSummaries` to General Settings — boolean, default `false`. Thinking summaries no longer generated by default; set `true` to restore. v2.1.89 changelog — not yet on official settings page | ✅ COMPLETE (added before feedbackSurveyRate with changelog annotation) |
| 3 | HIGH | Changed Behavior | Update `cleanupPeriodDays` description — v2.1.89 changelog says `0` is now rejected with a validation error. CONTRADICTION: official settings page still describes `0` as valid. Flag for user | ✅ COMPLETE (updated description with contradiction note between changelog and docs page) |
| 4 | HIGH | Missing Env Vars | Add ~46 missing env vars confirmed on official /en/env-vars page: `ANTHROPIC_BEDROCK_BASE_URL`, `ANTHROPIC_VERTEX_BASE_URL`, `ANTHROPIC_BETAS`, `ANTHROPIC_VERTEX_PROJECT_ID`, `CLAUDE_CODE_DISABLE_THINKING`, `DISABLE_INTERLEAVED_THINKING`, `ENABLE_PROMPT_CACHING_1H_BEDROCK`, `DISABLE_AUTO_COMPACT`, `DISABLE_COMPACT`, `CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING`, `CLAUDE_CODE_DISABLE_ATTACHMENTS`, `CLAUDE_CODE_DISABLE_CLAUDE_MDS`, `CLAUDE_CODE_GLOB_HIDDEN`, `CLAUDE_CODE_GLOB_NO_IGNORE`, `CLAUDE_CODE_GLOB_TIMEOUT_SECONDS`, `CLAUDE_CODE_DISABLE_OFFICIAL_MARKETPLACE_AUTOINSTALL`, `CLAUDE_CODE_SYNC_PLUGIN_INSTALL`, `CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS`, `CLAUDE_CODE_AUTO_CONNECT_IDE`, `CLAUDE_CODE_IDE_HOST_OVERRIDE`, `CLAUDE_CODE_IDE_SKIP_VALID_CHECK`, `CLAUDE_CODE_MAX_RETRIES`, `API_TIMEOUT_MS`, `CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS`, `CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS`, `CLAUDE_ENABLE_STREAM_WATCHDOG`, `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING`, `CLAUDE_CODE_DEBUG_LOGS_DIR`, `CLAUDE_CODE_DEBUG_LOG_LEVEL`, `CLAUDE_CODE_ACCESSIBILITY`, `CLAUDE_CODE_SYNTAX_HIGHLIGHT`, `CLAUDE_CODE_RESUME_INTERRUPTED_TURN`, `CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY`, `CLAUDE_CODE_DISABLE_LEGACY_MODEL_REMAP`, `FALLBACK_FOR_ALL_PRIMARY_MODELS`, `CLAUDE_CODE_GIT_BASH_PATH`, `CLAUDE_AUTO_BACKGROUND_TASKS`, `CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS`, `CLAUDE_AGENT_SDK_MCP_NO_PREFIX`, `DISABLE_DOCTOR_COMMAND`, `DISABLE_LOGIN_COMMAND`, `DISABLE_LOGOUT_COMMAND`, `DISABLE_UPGRADE_COMMAND`, `DISABLE_EXTRA_USAGE_COMMAND`, `DISABLE_INSTALL_GITHUB_APP_COMMAND`, `CLAUDE_CODE_PLUGIN_CACHE_DIR`, `CLAUDE_CODE_SIMPLE` | ✅ COMPLETE (added all 46 env vars to table near related vars) |
| 5 | HIGH | Version Bump | Update report version badge from v2.1.88 to v2.1.89 | ✅ COMPLETE (badge and header updated in Phase 2.6) |
| 6 | MED | New Env Var | Add `MCP_CONNECTION_NONBLOCKING` to env vars table — set to `true` in `-p` mode to skip MCP connection wait. v2.1.89 changelog only, not yet on official /en/env-vars page | ✅ COMPLETE (added after CLAUDE_AGENT_SDK_MCP_NO_PREFIX with changelog annotation) |
| 7 | MED | Ownership Boundary | `CLAUDE_CODE_SIMPLE` is in CLI startup flags file as startup-only, but official /en/env-vars page lists it as configurable. Reconcile ownership | ✅ COMPLETE (added to settings report env table; updated CLI file to cross-reference settings report) |
| 8 | MED | Example Update | Update Quick Reference example to include `showThinkingSummaries` if added | ✅ COMPLETE (added showThinkingSummaries: true to example) |

---

## [2026-04-02 09:24 PM PKT] Claude Code v2.1.90

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Changed Type + Description | Fix `forceLoginOrgUUID`: type from `string` to `string \| string[]`. Expand description to include array behavior (any listed org accepted without pre-selection), managed settings enforcement (login fails if account not in listed org), and empty array fail-closed behavior | ✅ COMPLETE (type updated to string \| array, description expanded with array behavior, managed enforcement, fail-closed semantics, example updated) |
| 2 | HIGH | Missing Env Vars | Add `CLAUDE_CODE_OAUTH_TOKEN`, `CLAUDE_CODE_OAUTH_REFRESH_TOKEN`, `CLAUDE_CODE_OAUTH_SCOPES` to Common Environment Variables table. All confirmed on official /en/env-vars page | ✅ COMPLETE (added 3 OAuth env vars after ANTHROPIC_AUTH_TOKEN) |
| 3 | HIGH | Changed Description + Annotation | Update `showThinkingSummaries`: remove "(in v2.1.89 changelog, not yet on official settings page)" annotation — now confirmed on official settings page. Update description to match official: "When unset or false (default in interactive mode), thinking blocks are redacted by the API and shown as a collapsed stub. Redaction only changes what you see, not what the model generates" | ✅ COMPLETE (annotation removed, description updated to match official docs) |
| 4 | HIGH | Sandbox Cross-Merge | Update `sandbox.filesystem.allowWrite` description to add "Also merged with paths from `Edit(...)` allow permission rules". Update `denyWrite` to add "Also merged with paths from `Edit(...)` deny permission rules". Update `denyRead` to add "Also merged with paths from `Read(...)` deny permission rules". Confirmed on official settings page | ✅ COMPLETE (cross-merge behavior added to all 3 filesystem entries) |
| 5 | HIGH | Changed Description | Simplify `cleanupPeriodDays` description: remove contradiction note, align with official docs which now say "minimum 1, Setting to 0 is rejected with a validation error". Old behavior no longer documented on official page | ✅ COMPLETE (contradiction note removed, description aligned with official docs, added --no-session-persistence alternative) |
| 6 | HIGH | Version Bump | Update report version badge from v2.1.89 to v2.1.90 | ✅ COMPLETE (badge, header version, and header text updated) |
| 7 | MED | New Env Var | Add `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE` to env vars table — keep marketplace cache on git pull failure (v2.1.90 changelog, not yet on official /en/env-vars page) | ✅ COMPLETE (added after CLAUDE_CODE_SYNC_PLUGIN_INSTALL_TIMEOUT_MS with changelog annotation) |
| 8 | MED | Hook Redirect Count | Update redirect text from "all 19 hook events" to "all 25 hook events" per official hooks page count | ✅ COMPLETE (updated count in hooks redirect section) |
| 9 | MED | Ownership Boundary | `CLAUDE_CODE_TMPDIR` is on official /en/env-vars page as configurable via `env` key, but CLI startup flags report lists it as startup-only. Reconcile ownership | ✅ COMPLETE (added to settings report env table; updated CLI flags file to cross-reference settings report) |

---

## [2026-04-03 08:44 PM PKT] Claude Code v2.1.91

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Setting | Add `disableSkillShellExecution` to General Settings table — boolean, disable inline shell execution in skills, custom slash commands, and plugin commands. Confirmed in v2.1.91 changelog. Not yet on official settings page or in JSON schema | ✅ COMPLETE (added after showThinkingSummaries with changelog annotation) |
| 2 | HIGH | Version Bump | Update report version badge from v2.1.90 to v2.1.91 | ✅ COMPLETE (badge and header updated in Phase 2.6) |

---

## [2026-04-04 10:48 PM PKT] Claude Code v2.1.92

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Setting | Add `forceRemoteSettingsRefresh` to General Settings — boolean, managed-only, blocks CLI startup until remote managed settings are freshly fetched (fail-closed). Confirmed on official settings page | ✅ COMPLETE (added before feedbackSurveyRate in General Settings table) |
| 2 | HIGH | Missing Env Var | Add `CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX` to Common Environment Variables table — prefix for auto-generated Remote Control session names, defaults to machine hostname. Confirmed on official /en/env-vars page | ✅ COMPLETE (added before CLAUDE_CODE_ENABLE_TELEMETRY) |
| 3 | MED | Changed Description | Update `disableSkillShellExecution` — remove "(in v2.1.91 changelog, not yet on official settings page)" annotation. Now confirmed on official settings page with expanded description | ✅ COMPLETE (annotation removed, description expanded per official docs) |
| 4 | MED | Changed Description | Remove "not in official docs — unverified" tags from marketplace source types `url`, `npm`, and `file`. Official settings page now documents all 8 source types | ✅ COMPLETE (unverified annotations removed — recurring from 2026-03-31, now resolved) |
| 5 | MED | Changed Description | Enrich `cleanupPeriodDays` — add "Also controls the age cutoff for automatic removal of orphaned subagent worktrees at startup" per official settings page | ✅ COMPLETE (worktree cleanup detail added) |
| 6 | MED | Changed Description | Enrich `disableDeepLinkRegistration` — add multi-line prompt support via `%0A` per official settings page | ✅ COMPLETE (multi-line prompt detail added) |
| 7 | MED | Changed Description | Enrich `includeGitInstructions` — update to include git status snapshot and env var precedence per official settings page | ✅ COMPLETE (description expanded with git status snapshot and CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS precedence) |
| 8 | MED | Changed Description | Enrich `language` — add "Also sets the voice dictation language" per official settings page | ✅ COMPLETE (voice dictation detail added) |
| 9 | MED | Changed Description | Enrich `allowUnsandboxedCommands` — add enterprise policy detail per official settings page | ✅ COMPLETE (expanded with fail-closed behavior and enterprise use case) |

---

## [2026-04-08 09:51 PM PKT] Claude Code v2.1.96

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Env Vars | Add `CLAUDE_CODE_USE_MANTLE`, `ANTHROPIC_BEDROCK_MANTLE_BASE_URL`, `CLAUDE_CODE_SKIP_MANTLE_AUTH` to Common Environment Variables table — Bedrock Mantle endpoint support (v2.1.94). All confirmed on official /en/env-vars page | ✅ COMPLETE (added near related cloud provider vars) |
| 2 | HIGH | Changed Default | Update Effort Level section — default changed from Medium to High for API-key, Bedrock/Vertex/Foundry, Team, and Enterprise users (v2.1.94). Update table default marker and historical note | ✅ COMPLETE (table updated High as default, historical note expanded with v2.1.94 change) |
| 3 | HIGH | Version Bump | Update report version badge from v2.1.92 to v2.1.96 | ✅ COMPLETE (badge, header version, and header text updated in Phase 2.6) |
| 4 | MED | Stale Annotation | Remove "(in v2.1.90 changelog, not yet on official env-vars page)" from `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE` — now confirmed on official /en/env-vars page. Update description to match official wording | ✅ COMPLETE (annotation removed, description updated per official docs) |
| 5 | MED | Changed Description | Update `CLAUDE_CODE_GLOB_HIDDEN` description to match official: "Set to `false` to exclude dotfiles from Glob results. Included by default. Does not affect `@` file autocomplete, `ls`, Grep, or Read" | ✅ COMPLETE (description rewritten per official env-vars page) |

---

## [2026-04-09 11:39 PM PKT] Claude Code v2.1.97

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Setting | Add `sandbox.network.allowMachLookup` to Sandbox Settings table — array, macOS only, XPC/Mach service names with trailing `*` wildcard support. Confirmed on official settings page | ✅ COMPLETE (added after allowManagedDomainsOnly in sandbox network sub-keys) |
| 2 | HIGH | Display & UX | Add `refreshInterval` field to Status Line Configuration section — optional, re-runs command every N seconds, minimum 1 (v2.1.97). Confirmed on official status line docs | ✅ COMPLETE (added to config table with `padding` field, updated JSON example) |
| 3 | HIGH | Display & UX | Expand Status Line Input Fields table from 9 to 30+ fields to match official status line docs. Add `model.*`, `workspace.*`, `cost.*`, `session_id`, `session_name`, `transcript_path`, `version`, `output_style.name`, `vim.mode`, `agent.name`, `worktree.*` fields | ✅ COMPLETE (expanded from 9 to 30 fields per official status line documentation) |
| 4 | HIGH | Version Bump | Update report version badge from v2.1.96 to v2.1.97 | ✅ COMPLETE (badge and header updated in Phase 2.6) |
| 5 | MED | Field Naming | Fix `current_usage` → `context_window.current_usage` in Status Line Input Fields table | ✅ COMPLETE (renamed with full path and expanded description) |
| 6 | MED | Ownership Boundary | Add `CCR_FORCE_BUNDLE` to `claude-cli-startup-flags.md` — startup-only var for `claude --remote` bundling. On official /en/env-vars page but not in either file | ✅ COMPLETE (added to CLI startup flags env vars table) |
| 7 | MED | Changed Description | Update `CLAUDE_CODE_GLOB_NO_IGNORE` description to match official: "Set to `false` to make the Glob tool respect `.gitignore` patterns. By default, Glob returns all matching files including gitignored ones. Does not affect `@` file autocomplete" | ✅ COMPLETE (description rewritten per official env-vars page) |
| 8 | MED | Changed Description | Update `editorMode` description — remove stale `/vim` reference (removed in v2.1.94), change config label from "Key binding mode" to "Editor mode" per official docs | ✅ COMPLETE (removed /vim reference, config label updated) |

---

## [2026-04-13 08:10 PM PKT] Claude Code v2.1.101

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Env Var | Add `CLAUDE_CODE_CERT_STORE` to Common Environment Variables table — comma-separated CA certificate sources for TLS (`bundled`, `system`). Default: `bundled,system`. Native binary required for system store. v2.1.101. Confirmed on official /en/env-vars page | ✅ COMPLETE (added after CLAUDE_CODE_CLIENT_KEY_PASSPHRASE) |
| 2 | HIGH | Missing Env Var | Add `CLAUDE_CODE_PERFORCE_MODE` to Common Environment Variables table — set to `1` to enable Perforce-aware write protection. Edit/Write/NotebookEdit fail with `p4 edit` hint if target file lacks owner-write bit. v2.1.98. Confirmed on official /en/env-vars page | ✅ COMPLETE (added after CLAUDE_CODE_SCRIPT_CAPS) |
| 3 | HIGH | Missing Env Var | Add `CLAUDE_CODE_SCRIPT_CAPS` to Common Environment Variables table — JSON object limiting script invocation counts per session when `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` is set. Keys are substrings matched against command text; values are integer call limits. Confirmed on official /en/env-vars page | ✅ COMPLETE (added after CLAUDE_CODE_SUBPROCESS_ENV_SCRUB) |
| 4 | HIGH | Version Bump | Update report version badge from v2.1.97 to v2.1.101 | ✅ COMPLETE (badge, header version, and header text updated in Phase 2.6) |
| 5 | MED | Changed Description | Update `disableSkillShellExecution` — add ` ```! ` (triple-backtick shell) block syntax and "from user, project, plugin, or additional-directory sources" qualifier per official settings page | ✅ COMPLETE (description expanded per official docs) |
| 6 | MED | Ownership Boundary | Add `DISABLE_AUTOUPDATER` to settings report env vars table — on official /en/env-vars page as configurable via `env` key, currently only in CLI startup flags file. Add with cross-reference to CLI flags file | ✅ COMPLETE (added to settings report before DISABLE_TELEMETRY; CLI flags file updated with cross-ref) |
| 7 | MED | Ownership Boundary | Add `CCR_FORCE_BUNDLE` to settings report env vars table — on official /en/env-vars page as configurable via `env` key, currently only in CLI startup flags file. Add with cross-reference to CLI flags file | ✅ COMPLETE (added to settings report before CLAUDE_CODE_GIT_BASH_PATH; CLI flags file updated with cross-ref) |