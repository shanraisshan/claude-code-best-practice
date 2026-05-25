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

---

## [2026-04-14 11:22 PM PKT] Claude Code v2.1.107

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Setting | Add `viewMode` to General Settings table — string, values `"default"`, `"verbose"`, `"focus"`. Default transcript view mode on startup, overrides sticky Ctrl+O selection. Confirmed on official settings page | ✅ COMPLETE (added after showClearContextOnPlanAccept in General Settings) |
| 2 | HIGH | Missing Env Vars | Add 5 missing env vars confirmed on official /en/env-vars page: `ANTHROPIC_CUSTOM_MODEL_OPTION_SUPPORTED_CAPABILITIES`, `CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL`, `CLAUDE_ENABLE_BYTE_WATCHDOG`, `CLAUDE_CODE_MAX_CONTEXT_TOKENS`, `CLAUDE_CODE_SKIP_PROMPT_HISTORY` | ✅ COMPLETE (added near related vars in env table) |
| 3 | HIGH | Changed Description | Update `disableAllHooks` description — add "and any custom status line" per official settings page line 180 | ✅ COMPLETE (updated inline in hooks redirect section) |
| 4 | HIGH | Changed Default | Fix `teammateMode` default from `"in-process"` to `"auto"` in Global Config Settings table. Official docs describe `auto` as primary behavior. Regressed during v2.1.86 file-scope move | ✅ COMPLETE (default updated to "auto" — recurring from 2026-03-07, regression from v2.1.86 move) |
| 5 | MED | Changed Description | Update `CLAUDE_STREAM_IDLE_TIMEOUT_MS` description — distinguish byte watchdog (default/minimum 300000ms) from event watchdog (default 90000ms). Per official /en/env-vars page | ✅ COMPLETE (description expanded with dual-watchdog detail and cross-reference to CLAUDE_ENABLE_BYTE_WATCHDOG) |
| 6 | MED | Annotation Fix | Remove "(startup-only)" from `CLAUDE_CODE_GIT_BASH_PATH` — official /en/env-vars page lists it as env-configurable | ✅ COMPLETE (description rewritten per official docs, startup-only annotation removed) |
| 7 | MED | Example Update | Add `viewMode` to Quick Reference example after `showThinkingSummaries` | ✅ COMPLETE (added "viewMode": "default" to example) |
| 8 | MED | Stale Annotation | `OTEL_LOG_TOOL_DETAILS` still marked "in v2.1.85 changelog, not yet on official env-vars page" — confirmed still absent from official page after 10+ versions and 7 consecutive runs | ✋ ON HOLD (annotation is accurate — keeping as-is pending official docs update) |
| 7 | MED | Ownership Boundary | Add `CCR_FORCE_BUNDLE` to settings report env vars table — on official /en/env-vars page as configurable via `env` key, currently only in CLI startup flags file. Add with cross-reference to CLI flags file | ✅ COMPLETE (added to settings report before CLAUDE_CODE_GIT_BASH_PATH; CLI flags file updated with cross-ref) |

---

## [2026-04-16 08:25 PM PKT] Claude Code v2.1.110

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Setting | Add `minimumVersion` to General Settings table — string, prevents auto-updater from downgrading below a specific version. Confirmed on official settings page | ✅ COMPLETE (added after autoUpdatesChannel in General Settings table) |
| 2 | HIGH | Missing Env Var | Add `CLAUDE_CODE_TMUX_TRUECOLOR` to Common Environment Variables table — set to `1` to allow 24-bit truecolor output inside tmux. Confirmed on official /en/env-vars page | ✅ COMPLETE (added before CLAUDE_CODE_NO_FLICKER) |
| 3 | HIGH | Missing Env Var | Add `CLAUDE_CODE_REMOTE` to Common Environment Variables table — read-only, set to `true` in cloud sessions. Confirmed on official /en/env-vars page | ✅ COMPLETE (added before CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX) |
| 4 | HIGH | Missing Env Var | Add `CLAUDE_CODE_REMOTE_SESSION_ID` to Common Environment Variables table — read-only, cloud session ID. Confirmed on official /en/env-vars page | ✅ COMPLETE (added before CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX) |
| 5 | HIGH | Inverse Env Var Check | Mark `ENABLE_PROMPT_CACHING_1H_BEDROCK` as "not in official docs — unverified". No longer on official /en/env-vars page. Per Rule 5D | ✅ COMPLETE (added unverified annotation with deprecation note) |
| 6 | MED | New Setting (Changelog) | Add `autoScrollEnabled` to General Settings — boolean, disable conversation auto-scroll in fullscreen mode. v2.1.110 changelog only, not yet on official settings page | ✅ COMPLETE (added before feedbackSurveyRate with changelog annotation) |
| 7 | MED | New Setting (Changelog) | Add `tui` to General Settings — setting for flicker-free rendering mode (`/tui fullscreen`). v2.1.110 changelog only, not yet on official settings page | ✅ COMPLETE (added before feedbackSurveyRate with changelog annotation) |
| 8 | MED | New Env Var (Changelog) | Add `ENABLE_PROMPT_CACHING_1H` to env vars table — 1-hour prompt cache TTL (replaces deprecated `ENABLE_PROMPT_CACHING_1H_BEDROCK`). v2.1.108 changelog only, not yet on official /en/env-vars page | ✅ COMPLETE (added before DISABLE_PROMPT_CACHING with changelog annotation) |
| 9 | MED | New Env Var (Changelog) | Add `FORCE_PROMPT_CACHING_5M` to env vars table — force 5-minute TTL. v2.1.108 changelog only, not yet on official /en/env-vars page | ✅ COMPLETE (added before DISABLE_PROMPT_CACHING with changelog annotation) |
| 10 | MED | Effort Level Table | Add `Max` row to Effort Level table — Opus 4.6 only, documented in env var but missing from table | ✅ COMPLETE (added as first row in Effort Level table) |
| 11 | MED | Sandbox Descriptions | Add platform-specific notes: `allowUnixSockets` (macOS only), `allowAllUnixSockets` (Linux/WSL2 detail), `enableWeakerNestedSandbox` (Linux/WSL2 only) | ✅ COMPLETE (all 3 descriptions updated with platform-specific notes per official docs) |
| 12 | LOW | Changelog-Only Env Vars | Consider adding `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` (v2.1.108), `OTEL_LOG_USER_PROMPTS` (v2.1.101), `OTEL_LOG_TOOL_CONTENT` (v2.1.101) — all changelog-only, not on official env-vars page. Defer per Rule 8A until official docs confirm | ✋ ON HOLD (deferred — changelog-only, not confirmed by official docs) |

---

## [2026-04-18 07:56 PM PKT] Claude Code v2.1.114

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Version Bump | Update report version badge from v2.1.110 to v2.1.114 and header "As of v2.1.110" → "As of v2.1.114" | ✅ COMPLETE (badge and header text updated) |
| 2 | HIGH | New Setting | Add `awaySummaryEnabled` to General Settings table — boolean, controls whether idle-session recap ("away summary") is generated. Confirmed on official settings page. Paired with `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` env var | ✅ COMPLETE (added to General Settings table between `tui` and `feedbackSurveyRate` with pairing note) |
| 3 | HIGH | Missing Env Var | Add `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` to Common Environment Variables table — opt-out for away summary/session recap. Confirmed on official /en/env-vars page | ✅ COMPLETE (added after `FORCE_PROMPT_CACHING_5M` — RECURRING resolved, first seen 2026-04-16) |
| 4 | HIGH | Missing Value | Add `xhigh` to `effortLevel` valid values (line 497) — v2.1.111 introduced `xhigh` for Opus 4.7. Currently lists only `"low"`, `"medium"`, `"high"` | ✅ COMPLETE (description updated with `"xhigh"` value, Opus 4.7 support, and fallback behavior) |
| 5 | HIGH | Effort Level Table | Add `xhigh` row to Effort Level table (between Max and High) — Opus 4.7 only, introduced v2.1.111 | ✅ COMPLETE (XHigh row added; default marker updated to "default on Opus 4.6/Sonnet 4.6"; Note section expanded with v2.1.111 xhigh default on Opus 4.7) |
| 6 | HIGH | File Scope Move | Move `autoScrollEnabled` from General Settings (line 88) to Global Config Settings (`~/.claude.json`) table — official docs list it as a `~/.claude.json` key, not `settings.json`. Default `true`. Per Rule 1H. Adding to settings.json may trigger schema validation error | ✅ COMPLETE (removed from General Settings, added to Global Config Settings table between `autoInstallIdeExtension` and `editorMode` with default `true`) |
| 7 | HIGH | Stale Annotation | Remove "(in v2.1.110 changelog, not yet on official settings page)" from `tui` description (line 89) — now officially documented. Update description per official docs: `"fullscreen"` or `"default"` | ✅ COMPLETE (annotation removed, description updated with values and v2.1.110 reference) |
| 8 | HIGH | New Setting | Add `externalEditorContext` to Global Config Settings (`~/.claude.json`) table — confirmed on official settings page under "Global config settings" section. Per Rule 1A | ✅ COMPLETE (added to Global Config Settings table after `editorMode` with default `true`) |
| 9 | HIGH | Stale Annotation | Remove "(not in official docs — unverified)" from `sandbox.network.deniedDomains` (line 388) — officially added in v2.1.113 changelog. Update description per official docs (takes precedence over `allowedDomains`). Per Rule 10B, unblocks after 11 consecutive ON HOLD runs | ✅ COMPLETE (annotation removed, description rewritten with precedence and glob support notes — RECURRING resolved, first seen 2026-03-05) |
| 10 | MED | Example Update | Update Quick Reference example (lines 938–1023) to include `awaySummaryEnabled`, `tui: "fullscreen"`, and `effortLevel: "xhigh"` to showcase v2.1.111–v2.1.114 additions | ✅ COMPLETE (all 3 keys added to example; `effortLevel` bumped from `"medium"` to `"xhigh"`) |
| 11 | MED | Header Setting Count | Verify "60+ settings" count still accurate after adding `awaySummaryEnabled` and `externalEditorContext`; env var count "175+" still reasonable | ✅ COMPLETE (both counts remain within stated ranges — net +2 settings, +1 env var, headers accurate as "60+" and "175+") |
| 12 | LOW | Cross-Link | Add bidirectional cross-links for `CLAUDE_CODE_SIMPLE` and `CLAUDE_CODE_EFFORT_LEVEL` between settings report and `claude-cli-startup-flags.md`. Currently one-way; startup-flags file links to settings report but settings report does not link back | ✅ COMPLETE (added cross-reference links back to `./claude-cli-startup-flags.md#environment-variables` for both env vars) |
| 13 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_DETAILS` still marked "in v2.1.85 changelog, not yet on official env-vars page" after 11+ consecutive runs. Per Rule 10B: consider resolving — either confirm via official docs or remove. Currently agent research confirms still absent from official docs | ✋ ON HOLD (kept — recurring from 2026-04-14 v2.1.107, annotation still accurate) |
| 14 | LOW | Suspect Key Recurrence | `OTEL_LOG_USER_PROMPTS`, `OTEL_LOG_TOOL_CONTENT` still changelog-only. Defer per Rule 8A | ✋ ON HOLD (kept — recurring from 2026-04-16 v2.1.110) |

---

## [2026-04-24 12:27 AM PKT] Claude Code v2.1.118

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Setting | Add `wslInheritsWindowsSettings` to managed-only settings (Windows HKLM registry / `C:\Program Files\ClaudeCode\managed-settings.json` only — WSL inherits Windows policy chain). Confirmed on official settings page | ✅ COMPLETE (added to General Settings table after `forceRemoteSettingsRefresh` with full description and v2.1.118 attribution) |
| 2 | HIGH | Changed Behavior | Update `autoMode` description to document `"$defaults"` sentinel — allows custom rules to be added alongside built-in rules instead of replacing them (v2.1.118). Confirmed on official settings page | ✅ COMPLETE (description updated — sentinel inheritance behavior documented inline with v2.1.118 attribution) |
| 3 | HIGH | New Env Var (Changelog) | Add `DISABLE_UPDATES` to env vars table — completely blocks all update paths including manual `claude update` (stricter than `DISABLE_AUTOUPDATER`). v2.1.118 changelog only, not yet on official /en/env-vars page | ✅ COMPLETE (added after `DISABLE_AUTOUPDATER` with changelog-only annotation) |
| 4 | MED | Stale Suspect Key | Remove `askEdits` and `viewOnly` rows from Permission Modes table — official permissions page lists only 6 modes (`default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`). Report has flagged both as "unverified" since v2.1.74 (2026-03-12). Per Rule 10B (5+ run ON HOLD escalation), resolve by removing | ✅ COMPLETE (both rows removed — RECURRING resolved, first seen 2026-03-12) |
| 5 | MED | Stale Suspect Key | Remove `allow_remote_sessions` from Permission Keys table — official permissions page explicitly notes "Access to Remote Control and web sessions is not controlled by a managed settings key." Admins manage this via Claude Code admin settings UI. First added v2.1.74 (2026-03-12) as a speculative managed setting; has not been documented since | ✅ COMPLETE (row removed from Permission Keys table — RECURRING resolved, first seen 2026-03-12) |
| 6 | MED | Changed Behavior | Update `cleanupPeriodDays` description — v2.1.117 expanded sweep to also clean `~/.claude/tasks/`, `~/.claude/shell-snapshots/`, and `~/.claude/backups/` (previously only transcripts and orphaned worktrees) | ✅ COMPLETE (description rewritten to cover the full sweep scope with v2.1.117 attribution) |
| 7 | MED | Effort Level Note | Add v2.1.117 Pro/Max default-effort change to Effort Level section — default for Pro/Max subscribers on Opus 4.6 and Sonnet 4.6 moved from `medium` to `high`. Current note only mentions the earlier v2.1.94 change for API-key/Bedrock/Vertex/Foundry/Team/Enterprise users | ✅ COMPLETE (Effort Level Note expanded with v2.1.117 Pro/Max alignment sentence) |
| 8 | LOW | Example Update | Update Quick Reference example to showcase v2.1.118 features — either `wslInheritsWindowsSettings` or `"$defaults"` sentinel in `autoMode.soft_deny` | ✅ COMPLETE (added `"soft_deny": ["$defaults", "Never run terraform apply"]` to autoMode block in Quick Reference) |
| 9 | LOW | New Env Var (Changelog) | Consider adding `CLAUDE_CODE_FORK_SUBAGENT` to env vars table — enables forked subagents on external builds. v2.1.117 changelog only, not yet on official /en/env-vars page | ✅ COMPLETE (added after `OTEL_LOG_RAW_API_BODIES` with changelog-only annotation) |
| 10 | LOW | New Env Var (Changelog) | Consider adding `OTEL_LOG_RAW_API_BODIES` to env vars table — emit full API request/response bodies as OpenTelemetry log events. v2.1.111 changelog only, not yet on official /en/env-vars page | ✅ COMPLETE (added after `OTEL_LOG_TOOL_DETAILS` with changelog-only annotation) |
| 11 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_DETAILS` still "in v2.1.85 changelog, not yet on official env-vars page" after 12+ consecutive runs. Per Rule 10B, deferred pending official docs update | ✋ ON HOLD (kept — recurring from 2026-04-14 v2.1.107) |
| 12 | LOW | Suspect Key Recurrence | `OTEL_LOG_USER_PROMPTS`, `OTEL_LOG_TOOL_CONTENT` still changelog-only. Defer per Rule 8A | ✋ ON HOLD (kept — recurring from 2026-04-16 v2.1.110) |
| 13 | INVALID | Spurious Drift Claim | `workflow-claude-settings-agent` reported `sandbox.allowUnsandboxedCommands` default was wrong (claimed docs say `false`). Verified against official settings page — documented default is **`true`**. Report is correct as-is | ❌ INVALID (agent report contradicted by official docs on re-verification) |
---

## [2026-04-26 01:10 PM PKT] Claude Code v2.1.119

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Version Bump | Update report version badge from v2.1.118 to v2.1.119 and header "As of v2.1.118" → "As of v2.1.119" | ✅ COMPLETE (badge, header version, and header text updated in Phase 2.6) |
| 2 | HIGH | New Setting | Add `prUrlTemplate` to Attribution Settings table — string, URL template that controls how the PR badge in commit attribution links to the pull request UI. Useful for self-hosted GitLab/Bitbucket/GitHub Enterprise instances. Confirmed in v2.1.119 changelog | ✅ COMPLETE (added between `attribution.pr` and `includeCoAuthoredBy` in Attribution Settings table with v2.1.119 attribution and self-hosted use case) |
| 3 | HIGH | Missing Env Var | Add `CLAUDE_CODE_HIDE_CWD` to Common Environment Variables table — set to `1` to hide the current working directory in the startup logo banner. Useful in screen recordings or shared sessions where the CWD path is sensitive. Confirmed in v2.1.119 changelog | ✅ COMPLETE (added after `CLAUDE_CODE_DISABLE_MOUSE` in env vars table grouped with other UI/display vars) |
| 4 | HIGH | Changed Behavior | Update `auto` permission mode description (line 247) — remove outdated `--enable-auto-mode` flag reference (flag was REMOVED in v2.1.111). Per official permissions docs, current description is: "Auto-approves tool calls with background safety checks that verify actions align with your request. Currently a research preview." Auto mode is now in the default `Shift+Tab` cycle | ✅ COMPLETE (description rewritten using official wording; `--enable-auto-mode` flag reference removed; noted Shift+Tab cycle inclusion since v2.1.111 and `--permission-mode auto` as the current entry point) |
| 5 | MED | Changed Behavior | Update `blockedMarketplaces` description in Plugin Settings — note v2.1.119 enforcement of `hostPattern` and `pathPattern` matching. Blocked sources now correctly reject before downloading touches the filesystem | ✅ COMPLETE (description expanded with hostPattern/pathPattern matchers and v2.1.119 pre-download enforcement detail) |
| 6 | MED | Voice Setting Expansion | Expand `voiceEnabled` (boolean, line 81) into the full `voice` object documented per v2.1.118 — supports `enabled` (boolean), `mode` (`"hold"` or `"tap"`), and `autoSubmit` (boolean). Keep `voiceEnabled` as legacy alias with DEPRECATED marker | ✅ COMPLETE (added new `voice` object row with all 3 fields; `voiceEnabled` row updated to DEPRECATED legacy alias pointing to `voice` object) |
| 7 | MED | New Subcommand | Add `claude plugin tag` to Useful Commands table — added in v2.1.118 for tagging plugin versions in marketplaces | ✅ COMPLETE (added after `/plugin` in Useful Commands table with v2.1.118 attribution and run-from-marketplace-repo usage note) |
| 8 | LOW | Sources URL Drift | `https://json.schemastore.org/claude-code-settings.json` now 301-redirects to `https://www.schemastore.org/claude-code-settings.json`. v2.1.74 #4 explicitly fixed it the other direction. Source still resolves via redirect — decide whether to flip or leave with redirect | ❌ INVALID (URL still resolves correctly via 301 redirect; flipping would oscillate against v2.1.74 #4 fix without functional benefit. Re-evaluate only if schemastore deprecates the redirect) |
| 9 | LOW | MCP OAuth Note | Add brief MCP OAuth RFC 9728 mention to MCP Servers section — added in v2.1.111. Informational, not a settings key | ✅ COMPLETE (added blockquote callout above MCP Settings table with RFC 9728 link, `/.well-known/oauth-protected-resource` discovery endpoint, and note that compliant servers no longer need `apiKeyHelper`/`headersHelper`) |
| 10 | LOW | Quick Reference Update | Add `prUrlTemplate` to Quick Reference example after attribution block, once the new key is added | ✅ COMPLETE (added `"prUrlTemplate": "https://gitlab.example.com/{owner}/{repo}/-/merge_requests/{number}"` after the `attribution` block in the example) |
| 11 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_DETAILS` still "in v2.1.85 changelog, not yet on official env-vars page" after 13+ consecutive runs. Per Rule 10B, deferred pending official docs update | ✋ ON HOLD (kept — recurring from 2026-04-14 v2.1.107) |
| 12 | LOW | Suspect Key Recurrence | `OTEL_LOG_USER_PROMPTS`, `OTEL_LOG_TOOL_CONTENT` still changelog-only. Defer per Rule 8A | ✋ ON HOLD (kept — recurring from 2026-04-16 v2.1.110) |
| 13 | INVALID | Spurious Drift Claim | `claude-code-guide` agent reported `attribution.pr` as a NEW v2.1.119 setting. Verified against current report (line 149) — already documented in Attribution Settings table | ❌ INVALID (already in report) |
| 14 | INVALID | Spurious Drift Claim | `claude-code-guide` agent claimed `sandbox.network.deniedDomains` was added v2.1.116. Workflow agent and report (line 386) both confirm v2.1.113 introduction (matches recent v2.1.114 changelog entry that resolved its prior unverified status). Report value retained | ❌ INVALID (agent contradicted by report-specific agent + prior changelog) |

---

## [2026-04-29 12:49 AM PKT] Claude Code v2.1.121

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Version Bump | Update report version badge from v2.1.119 → v2.1.121 and header "As of v2.1.119" → "As of v2.1.121" | ✅ COMPLETE (badge updated in Phase 2.6, header text updated to v2.1.121) |
| 2 | HIGH | New Setting | Add `sshConfigs` to a new Workspace & Teams subsection (object[], required: `id`/`name`/`sshHost`; optional: `sshPort`/`sshIdentityFile`/`startDirectory`). Provides SSH connection dropdown in Desktop. Per official settings page section 14 | ✅ COMPLETE (new Workspace & Teams subsection added with Key table, Field reference table, and JSON example) |
| 3 | HIGH | New MCP Option | Add `alwaysLoad` to MCP Settings — boolean per-server option, exempts server from tool-search deferral; available on all server types; requires v2.1.121+. Per-tool variant via `_meta: {"anthropic/alwaysLoad": true}`. Confirmed on official MCP page | ✅ COMPLETE (new "Per-Server Tool Loading" subsection added under MCP Servers with rationale, JSON example, and per-tool `_meta` variant) |
| 4 | HIGH | Status Line Fields | Add `effort.level` (low/medium/high/xhigh/max) and `thinking.enabled` to Status Line Input Fields table (v2.1.121). Confirmed on official statusline docs | ✅ COMPLETE (both fields added after `agent.name` row with v2.1.121 attribution) |
| 5 | HIGH | File Scope Migration | Move `autoScrollEnabled`, `editorMode`, `showTurnDuration`, `teammateMode`, `terminalProgressBarEnabled` from Global Config Settings (`~/.claude.json`) table to main Display Settings table (settings.json). Add historical note: "Versions before v2.1.119 stored these in `~/.claude.json`". Reverses Rule 1H findings from v2.1.78/v2.1.86/v2.1.107/v2.1.114 — official docs now explicitly list them under "Available settings" with the historical note | ✅ COMPLETE (5 keys added to Display Settings table with per-key historical note; removed from Global Config Settings table; v2.1.119 migration callout added to Global Config Settings preamble) |
| 6 | HIGH | Missing Env Var | Add `AI_AGENT` to env vars table — env var injected into subprocesses by Claude Code (similar to `CLAUDECODE`). v2.1.120 changelog only — annotate accordingly | ✅ COMPLETE (added after `CLAUDECODE` row with changelog-only annotation) |
| 7 | HIGH | Missing Env Var | Add `OTEL_LOG_USER_PROMPTS` to env vars table — gates `user_system_prompt` field in OTel LLM request spans. v2.1.121 changelog. **RECURRING** (first seen 2026-04-16 v2.1.110) — was deferred per Rule 8A but now actionable per fresh v2.1.121 changelog mention | ✅ COMPLETE (added after `OTEL_LOG_RAW_API_BODIES` with changelog-only annotation — RECURRING resolved, first seen 2026-04-16) |
| 8 | MED | Permission Behavior | Add v2.1.121 `--dangerously-skip-permissions` exclusion note to Permissions section. Re-verified against official permission-modes docs: the change is that writes to `.claude/commands/`, `.claude/agents/`, `.claude/skills/`, and `.claude/worktrees/` are EXEMPT from the protected-paths prompt under bypassPermissions — i.e., these subdirectories now auto-approve, opposite of the agent's original framing | ✅ COMPLETE (description added to `bypassPermissions` row in Permission Modes table with corrected framing per official docs — exemption, not restriction) |
| 9 | MED | Changed Description | Update `language` setting description — v2.1.121 also applies the language to the terminal tab title | ✅ COMPLETE (terminal tab title behavior appended to `language` description with v2.1.121 attribution) |
| 10 | MED | Useful Commands | Update `/effort` row to include `xhigh` value (currently lists only `low`/`medium`/`high`) | ✅ COMPLETE (`/effort` row now lists `low`, `medium`, `high`, `xhigh` (Opus 4.7 only, v2.1.111), and `max` (Opus 4.6 only)) |
| 11 | LOW | Skill Variable Note | Add brief `${CLAUDE_EFFORT}` skill template variable note (v2.1.120) — informational, not strictly a settings key | ✅ COMPLETE (added to Effort Level Note section as "Skill template variable" sentence with v2.1.120 attribution) |
| 12 | LOW | Example Update | Update Quick Reference example to showcase v2.1.121 features (MCP `alwaysLoad`, `sshConfigs`, or new status line fields) | ✅ COMPLETE (added `mcpServers` block with `alwaysLoad: true` and `sshConfigs` block to Quick Reference example) |
| 13 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_DETAILS` still "in v2.1.85 changelog, not yet on official env-vars page" after 14+ consecutive runs. Per Rule 10B, deferred pending official docs update | ✋ ON HOLD (kept — recurring from 2026-04-14 v2.1.107) |
| 14 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_CONTENT` still changelog-only. Defer per Rule 8A | ✋ ON HOLD (kept — recurring from 2026-04-16 v2.1.110) |
| 15 | HIGH | Broken Link | Fix two `[auto mode](/en/permission-modes#eliminate-prompts-with-auto-mode)` links at lines 237 and 238 (in `autoMode` and `disableAutoMode` descriptions) — relative paths missing domain prefix. Replace with `https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode`. Anchor verified valid on official permission-modes page | ✅ COMPLETE (both links updated to absolute `https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode` URL) |

---

## [2026-05-01 03:29 PM PKT] Claude Code v2.1.126

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Version Bump | Update report version badge from v2.1.121 → v2.1.126 and header "As of v2.1.121" → "As of v2.1.126" | ✅ COMPLETE (badge updated in Phase 2.6, body header text updated to v2.1.126) |
| 2 | HIGH | New Setting | Add `preferredNotifChannel` to Display Settings table — string, default `"auto"`, values: `"auto"`, `"terminal_bell"`, `"iterm2"`, `"iterm2_with_bell"`, `"kitty"`, `"ghostty"`, `"notifications_disabled"`. Method for task-complete and permission-prompt notifications. Confirmed on official settings page | ✅ COMPLETE (added to Display Settings table after `terminalProgressBarEnabled` with full enum values, default, and `/en/terminal-config` cross-link) |
| 3 | HIGH | New Env Var | Add `ANTHROPIC_BEDROCK_SERVICE_TIER` to env vars table — Bedrock service tier (`default`, `flex`, or `priority`); sent as `X-Amzn-Bedrock-Service-Tier` header. v2.1.122. Confirmed on official /en/env-vars page | ✅ COMPLETE (added after `ANTHROPIC_BEDROCK_MANTLE_BASE_URL` with v2.1.122 attribution and `/en/amazon-bedrock#service-tiers` cross-link) |
| 4 | HIGH | New Env Var | Add `CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST` to env vars table — set by host platforms that embed Claude Code; provider/auth env vars in settings.json are ignored when set; telemetry follows standard `DISABLE_TELEMETRY` opt-out instead of auto-disabling on Bedrock/Vertex/Foundry. v2.1.126. Confirmed on official /en/env-vars page | ✅ COMPLETE (added after `ANTHROPIC_BEDROCK_SERVICE_TIER` with full description, ignored-vars list, and v2.1.126 attribution) |
| 5 | MED | Permission Modes | Update `bypassPermissions` description (line 248) — v2.1.126 extended exemption to also bypass writes to `.claude/`, `.git/`, `.vscode/`, and shell config files. Catastrophic removal commands still prompt. Builds on v2.1.121 `.claude/commands/`, `.claude/agents/`, `.claude/skills/`, `.claude/worktrees/` exemption | ✅ COMPLETE (description extended with v2.1.126 exemptions for `.claude/`, `.git/`, `.vscode/`, and shell config files; catastrophic-removal safety net retained) |
| 6 | MED | Changed Description | Enrich `defaultShell` description — v2.1.126: when PowerShell is enabled (`CLAUDE_CODE_USE_POWERSHELL_TOOL=1`), it is treated as the **primary** shell. v2.1.120: PowerShell is the fallback shell when Git for Windows is unavailable. Also note v2.1.126 PowerShell 7 detection (Microsoft Store, MSI without PATH, .NET global tool) | ✅ COMPLETE (description enriched with v2.1.120 fallback behavior, v2.1.126 primary-shell flip, and PowerShell 7 detection sources) |
| 7 | LOW | spinnerTipsOverride Note | Optionally enrich `spinnerTipsOverride.excludeDefault` description (line 580) with v2.1.121 detail "suppresses time-based spinner tips". Currently accurate per official settings page wording but lacks the v2.1.121 changelog refinement | ✅ COMPLETE (description expanded with `excludeDefault` semantics from official docs and v2.1.121 time-based tip suppression refinement) |
| 8 | LOW | /config Persistence Note | Add brief note to Settings Hierarchy section that `/config` now persists changes to `~/.claude/settings.json` (v2.1.126). Informational, not a new key | ✅ COMPLETE (added v2.1.126 `> Note` block under Settings Hierarchy after the v2.1.75 Windows path note) |
| 9 | LOW | Example Update | Update Quick Reference example to showcase v2.1.122–v2.1.126 features — `preferredNotifChannel` and an `ANTHROPIC_BEDROCK_SERVICE_TIER` env example | ✅ COMPLETE (added `"preferredNotifChannel": "terminal_bell"` after `prefersReducedMotion` and `"ANTHROPIC_BEDROCK_SERVICE_TIER": "priority"` to the `env` block) |
| 10 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_DETAILS` still "in v2.1.85 changelog, not yet on official env-vars page" after 16+ consecutive runs. Per Rule 10B, deferred pending official docs update | ✋ ON HOLD (kept — recurring from 2026-04-14 v2.1.107) |
| 11 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_CONTENT` still changelog-only. Defer per Rule 8A | ✋ ON HOLD (kept — recurring from 2026-04-16 v2.1.110) |
| 12 | INVALID | Spurious Drift Claim | `workflow-claude-settings-agent` reported `autoSummaryEnabled` as a separate setting from `awaySummaryEnabled` (HIGH-confidence claim). Verified directly against official settings page — `autoSummaryEnabled` does NOT exist; only `awaySummaryEnabled` is documented | ❌ INVALID (agent contradicted by direct doc verification) |
| 13 | INVALID | Spurious Drift Claim | `workflow-claude-settings-agent` claimed `Agent` permission rule syntax should be `Agent(agent:name)` with an `agent:` prefix. Verified against official settings page — only references `Agent` rules without showing the `agent:` prefix syntax. Report's existing `Agent(name)` form matches established convention; no source confirms the prefix variant | ❌ INVALID (no source-verified evidence for `agent:` prefix) |

---

## [2026-05-09 06:58 PM PKT] Claude Code v2.1.138

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Version Bump | Update report version badge from v2.1.126 → v2.1.138 and header "As of v2.1.126" → "As of v2.1.138" | ✅ COMPLETE (badge updated in Phase 2.6; body header line 6 updated to v2.1.138) |
| 2 | HIGH | New Setting | Add `worktree.baseRef` to Worktree Settings — string, values `"fresh"` or `"head"`, controls whether new worktrees branch from a fresh main HEAD or the current HEAD. Confirmed in v2.1.133 changelog | ✅ COMPLETE (added after `worktree.sparsePaths` with default `"fresh"` and v2.1.133 attribution) |
| 3 | HIGH | New Setting | Add `sandbox.bwrapPath` to Sandbox table — string (Linux/WSL managed-only), custom path to `bwrap` (bubblewrap) binary. Confirmed in v2.1.133 changelog | ✅ COMPLETE (added after `sandbox.enableWeakerNetworkIsolation` with managed-only annotation) |
| 4 | HIGH | New Setting | Add `sandbox.socatPath` to Sandbox table — string (Linux/WSL managed-only), custom path to `socat` binary. Confirmed in v2.1.133 changelog | ✅ COMPLETE (added after `sandbox.bwrapPath` with managed-only annotation) |
| 5 | HIGH | Changed Behavior | Update `autoMode` description to document the new `hard_deny` array — auto-mode classifier rules that block unconditionally, sibling to `allow` and `soft_deny`. Confirmed in v2.1.136 changelog | ✅ COMPLETE (description extended with `hard_deny` semantics, sentinel-incompatibility note, and v2.1.136 attribution) |
| 6 | HIGH | New Setting | Add `parentSettingsBehavior` (managed-only) to Settings Hierarchy section — string `"first-wins"` or `"merge"`, controls how SDK `managedSettings` parent tier merges. Confirmed in v2.1.133 changelog | ✅ COMPLETE (added to new "Dynamic & Parent-Tier Policy" subsection under Settings Hierarchy) |
| 7 | HIGH | New Setting | Add `policyHelper` (managed-only) to a managed-policy subsection — object with `path`, `timeoutMs`, `refreshIntervalMs`. Managed executable that computes managed settings dynamically. Confirmed in v2.1.136 changelog | ✅ COMPLETE (added to new "Dynamic & Parent-Tier Policy" subsection with field reference and use-case note) |
| 8 | HIGH | New Setting | Add `skillOverrides` to General Settings — string `"off"` / `"user-invocable-only"` / `"name-only"`, controls automatic skill invocation behavior. Confirmed in v2.1.129 changelog | ✅ COMPLETE (added after `disableSkillShellExecution` with all 3 enum values and v2.1.129 attribution) |
| 9 | HIGH | New Env Var | Add `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` to env vars table — re-enables session-quality feedback survey for OpenTelemetry-enabled enterprises. v2.1.136 changelog | ✅ COMPLETE (added in display/UI env vars cluster after `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY`) |
| 10 | HIGH | New Env Var | Add `CLAUDE_CODE_SESSION_ID` to env vars table — current session ID injected into Bash subprocess environment. v2.1.132 changelog | ✅ COMPLETE (added after `CLAUDECODE` with read-only annotation and v2.1.132 attribution) |
| 11 | HIGH | New Env Var | Add `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN` to env vars table — opt out of fullscreen renderer; use classic scrollback. v2.1.132 changelog | ✅ COMPLETE (added after `CLAUDE_CODE_DISABLE_VIRTUAL_SCROLL`) |
| 12 | HIGH | New Env Var | Add `CLAUDE_CODE_FORCE_SYNC_OUTPUT` to env vars table — force synchronous output (debugging aid). v2.1.129 changelog | ✅ COMPLETE (added after `CLAUDE_CODE_HIDE_CWD`) |
| 13 | HIGH | New Env Var | Add `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` to env vars table — controls background package-manager-auto-update behavior. v2.1.129 changelog | ✅ COMPLETE (added after `CLAUDE_CODE_FORCE_SYNC_OUTPUT` with cross-reference to `DISABLE_AUTOUPDATER`) |
| 14 | HIGH | New Env Var | Add `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` to env vars table — opt-in to fetching available models from LLM gateway. v2.1.129 changelog | ✅ COMPLETE (added after `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE`) |
| 15 | MED | New Env Var (Hook Input) | Add `$CLAUDE_EFFORT` to env vars table — Bash subprocess and hook input env exposing the active effort level (companion to `CLAUDE_CODE_EFFORT_LEVEL`). Hooks also receive `effort.level` JSON field. v2.1.133 changelog | ✋ ON HOLD (deferred — user scoped this run to HIGH priority items only; will pick up next run) |
| 16 | MED | Plugin Marketplace | Add brief note that plugin marketplace `source: 'settings'` is now supported for inline plugin entries directly in settings.json (v2.1.137 changelog) | ON HOLD (awaiting user approval) |
| 17 | MED | MCP Reserved Name | Add `workspace` to a "Reserved server names" note in MCP Servers section — v2.1.128 reserved this name for the workspace MCP integration | ON HOLD (awaiting user approval) |
| 18 | MED | Missing Setting | Add `disableRemoteControl` to Permissions/Managed-only settings — official permissions docs explicitly note "Remote Control can additionally be disabled per device with the `disableRemoteControl` managed setting" | ON HOLD (awaiting user approval) |
| 19 | MED | Missing Setting | Add `claudeMdExcludes` to Core Configuration — array, skip CLAUDE.md files matching globs. Listed on official settings page | ON HOLD (awaiting user approval) |
| 20 | MED | Missing Setting | Add `autoMemoryEnabled` to Core Configuration — boolean (default `true`), enables auto memory. Currently only `autoMemoryDirectory` is listed | ON HOLD (awaiting user approval) |
| 21 | MED | Example Update | Update Quick Reference example to showcase v2.1.129–v2.1.138 features — `worktree.baseRef`, `autoMode.hard_deny`, `skillOverrides`, plus a new env var | ON HOLD (awaiting user approval) |
| 22 | LOW | Header Count | Update header claim from "60+ settings" → "80+ settings" to better reflect actual official count after additions | ON HOLD (awaiting user approval) |
| 23 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_DETAILS` still "in v2.1.85 changelog, not yet on official env-vars page" after 17+ consecutive runs. Per Rule 10B, deferred pending official docs update | ON HOLD (kept — recurring from 2026-04-14 v2.1.107) |
| 24 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_CONTENT` still changelog-only. Defer per Rule 8A | ON HOLD (kept — recurring from 2026-04-16 v2.1.110) |
| 25 | INVALID | Spurious Drift Claim | `claude-code-guide` agent listed `disableSkillShellExecution` as NEW in v2.1.137. Verified against current report (line 89) — already documented in General Settings table | ❌ INVALID (already in report; pre-existing key) |
| 26 | INVALID | Spurious Drift Claim | `workflow-claude-settings-agent` flagged `syntaxHighlightingDisabled` as missing settings.json key. Could not confirm it as a `settings.json` key on official docs (the env var `CLAUDE_CODE_SYNTAX_HIGHLIGHT` is documented, the settings-key form was not source-verified). Per Rule 8A | ❌ INVALID (no source-verified evidence the settings.json key exists) |
| 14 | INVALID | Spurious Drift Claim | `workflow-claude-settings-agent` flagged `model` default (`"default"`) and `language` default (`"english"`) in Core Configuration as cosmetically wrong because the official docs show `-`. The report's values are descriptive placeholders explaining behavior when unset; flipping to `-` would lose information without any user-facing benefit | ❌ INVALID (cosmetic re-verification with no user-facing benefit) |

---

## [2026-05-12 11:40 PM PKT] Claude Code v2.1.139

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Setting | Add `autoMode.hard_deny` field to `autoMode` description (v2.1.136) — unconditional block rules, cannot be overridden by `allow` exceptions or `$defaults` sentinel. Confirmed on official settings page | ✅ COMPLETE (added to `autoMode` field-list description) |
| 2 | HIGH | New Setting | Add `worktree.baseRef` (`"fresh" \| "head"`, default `"fresh"`, v2.1.133) to Worktree Settings table — which ref new worktrees branch from. Confirmed on official settings page | ✅ COMPLETE (added to Worktree Settings table after `worktree.sparsePaths`) |
| 3 | HIGH | New Setting | Add `sandbox.bwrapPath` and `sandbox.socatPath` (managed-only, Linux/WSL2, v2.1.133) to Sandbox Settings table — absolute paths to bubblewrap and socat binaries, overriding `PATH` detection. Confirmed on official settings page | ✅ COMPLETE (added to Sandbox Settings table after `enableWeakerNetworkIsolation`) |
| 4 | HIGH | New Setting | Add `parentSettingsBehavior` (`"first-wins" \| "merge"`, managed-only, default `"first-wins"`, v2.1.133) — controls whether SDK-host parent managed settings apply when admin-deployed managed tier is also present. Confirmed on official settings page | ✅ COMPLETE (added to new "Managed-only policy keys" subsection under Settings Hierarchy) |
| 5 | HIGH | New Setting | Add `policyHelper` (`{path: string}`, managed-only via MDM or file, v2.1.136) — admin-deployed executable that computes managed settings dynamically at startup. Confirmed on official settings page | ✅ COMPLETE (added alongside `parentSettingsBehavior` in Managed-only policy keys subsection) |
| 6 | HIGH | New Setting | Add `skillOverrides` (object, v2.1.129) to General Settings table — per-skill visibility (`"on" / "name-only" / "user-invocable-only" / "off"`). Confirmed on official settings page | ✅ COMPLETE (added to General Settings table between `awaySummaryEnabled` and `disableRemoteControl`) |
| 7 | HIGH | New Setting | Add `disableRemoteControl` (boolean, any scope, v2.1.128) to General Settings table — blocks `claude remote-control`, the `--remote-control` flag, auto-start, and in-session toggle. Confirmed on official settings page | ✅ COMPLETE (added to General Settings table before `feedbackSurveyRate`) |
| 8 | HIGH | New Setting | Add `gcpAuthRefresh` (string script) to AWS & Cloud Credentials section — custom script that refreshes GCP ADC when expired. Confirmed on official settings page | ✅ COMPLETE (added to Authentication Helpers table after `forceLoginOrgUUID`) |
| 9 | HIGH | Missing Env Vars | Add 6 env vars to Common Environment Variables table: `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` (v2.1.136), `CLAUDE_CODE_SESSION_ID` (v2.1.132), `CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN` (v2.1.132), `CLAUDE_CODE_FORCE_SYNC_OUTPUT` (v2.1.129), `CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` (v2.1.129), `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` (v2.1.129). All confirmed on official /en/env-vars page | ✅ COMPLETE (all 6 env vars added to grouped sections of Common Environment Variables table) |
| 10 | HIGH | Version Bump | Update report version badge from v2.1.126 → v2.1.139 and header "As of v2.1.126" → "As of v2.1.139" | ✅ COMPLETE (badge updated in Phase 2.6; body header text updated; env var count bumped 175+ → 180+) |
| 11 | MED | Permission Syntax | Add `Skill(name *)` wildcard prefix-match note to Tool Permission Syntax (v2.1.139) — mirrors `Bash(ls *)` behavior, allowing patterns like `Skill(weather *)` to match `weather-fetcher`, `weather-svg-creator` | ✅ COMPLETE (Skill row in Tool Permission Syntax table updated with prefix-match example and v2.1.139 attribution) |
| 12 | MED | Permission Behavior | Add v2.1.136 plan-mode note: writes are blocked even when a matching `Edit(...)` allow rule exists | ✅ COMPLETE (plan-mode row in Permission Modes table updated with v2.1.136 override-allow-rules note) |
| 13 | MED | MCP Reserved Name | Add `Workspace` reserved MCP server name note (v2.1.128) — existing servers named "workspace" are skipped with a warning | ✅ COMPLETE (blockquote added under MCP Servers section header) |
| 14 | MED | Effort Variable Scope | Expand `${CLAUDE_EFFORT}` skill-template note: v2.1.133 also passes the env var to Bash tool subprocesses and hook handlers (not just skill templates) | ✅ COMPLETE (skill template variable note rewritten as "Effort env propagation" with v2.1.133 Bash + hook scope detail) |
| 15 | MED | Example Update | Update Quick Reference example to include `worktree.baseRef`, `autoMode.hard_deny`, and `skillOverrides` to showcase v2.1.129–v2.1.136 features | ✅ COMPLETE (all 3 keys added to Quick Reference example) |
| 16 | LOW | Useful Commands | Add `claude plugin prune` (v2.1.121) and `claude plugin details` (v2.1.139) to Useful Commands table | ✅ COMPLETE (both commands added after `claude plugin tag`) |
| 17 | LOW | Sandbox Footnote | Add v2.1.139 `autoAllowBashIfSandboxed` shell-expansion fix note — now handles `$VAR` and `$(cmd)` correctly | ✅ COMPLETE (description expanded in Sandbox Settings table) |
| 18 | LOW | MCP Improvements | Add v2.1.139 `.mcp.json` hot-reload (via `/mcp` Reconnect) and `CLAUDE_PROJECT_DIR` MCP stdio injection notes to MCP Servers section | ✅ COMPLETE (combined into single blockquote under MCP Servers section) |
| 19 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_DETAILS` still "in v2.1.85 changelog, not yet on official env-vars page" after 17+ consecutive runs. Per Rule 10B, deferred pending official docs update | ✋ ON HOLD (kept — recurring from 2026-04-14 v2.1.107) |
| 20 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_CONTENT` still changelog-only. Defer per Rule 8A | ✋ ON HOLD (kept — recurring from 2026-04-16 v2.1.110) |
| 21 | INVALID | Spurious Drift Claim | `claude-code-guide` listed effort values as `"fast"`, `"balanced"`, `"thorough"`. Verified against official /en/env-vars — valid values are `low`, `medium`, `high`, `xhigh`, `max`, `auto`. Report retained | ❌ INVALID (agent contradicted by official docs) |
| 22 | INVALID | Spurious Drift Claim | `claude-code-guide` claimed `CLAUDE_EFFORT` is a documented env var. Verified — only `CLAUDE_CODE_EFFORT_LEVEL` exists on /en/env-vars. `CLAUDE_EFFORT` is changelog-only (subprocess injection, not user-configurable). Report retained | ❌ INVALID (agent contradicted by official docs) |

---

## [2026-05-21 12:07 AM PKT] Claude Code v2.1.145

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Version Bump | Update report version badge from v2.1.139 → v2.1.145 and header "As of v2.1.139" → "As of v2.1.145" | ✅ COMPLETE (header text updated to v2.1.145; badge synced in Phase 2.6) |
| 2 | HIGH | New Setting | Add `claudeMdExcludes` (array, glob patterns of CLAUDE.md files to skip) to Core Configuration — listed on official settings page. RECURRING (first seen 2026-05-09 v2.1.138 #19, was deferred to HIGH-only scope) | ✅ COMPLETE (added to General Settings table with official wording) |
| 3 | HIGH | New Setting | Add `autoMemoryEnabled` (boolean, default `true`, enables auto memory read/write) to Core Configuration — currently only `autoMemoryDirectory` is documented. RECURRING (first seen 2026-05-09 v2.1.138 #20) | ✅ COMPLETE (added to Plans & Memory Directories table beside autoMemoryDirectory) |
| 4 | HIGH | New Worktree Setting | Add `worktree.bgIsolation` (string, `"worktree" \| "none"`, default `"worktree"`) to Worktree Settings table — `"none"` lets background sessions edit the working copy directly (v2.1.143). Confirmed on official settings page | ✅ COMPLETE (added to Worktree Settings table with official wording) |
| 5 | HIGH | New Env Var | Add `ANTHROPIC_WORKSPACE_ID` to Common Environment Variables table — workload identity federation, scopes the minted token (v2.1.139/v2.1.141). Confirmed in changelog | ✅ COMPLETE (added to env vars table — confirmed ON official /en/env-vars page this run, not changelog-only) |
| 6 | HIGH | Missing Permission Mode | Confirm/keep `dontAsk` and `auto` modes; verify `acceptEdits` description matches official permissions page wording ("Automatically accepts file edits and common filesystem commands `mkdir`, `touch`, `mv`, `cp`, etc. for paths in the working directory or `additionalDirectories`") — report's current description is shorter | ✅ COMPLETE (acceptEdits description expanded to official wording) |
| 7 | MED | Permission Behavior | Update `bypassPermissions` description with v2.1.144/v2.1.145 detail per official permissions page: "Removals targeting the filesystem root or home directory such as `rm -rf /` and `rm -rf ~` still prompt as a circuit breaker" (current report says "Catastrophic removal commands still prompt") | ✅ COMPLETE (bypassPermissions circuit-breaker wording updated to official text) |
| 8 | MED | Permission Syntax | Add PowerShell tool permission rules to Tool Permission Syntax table — official permissions page documents `PowerShell(cmd *)` rules with same shape as Bash, alias canonicalization, AST-based compound-command checking. Not currently in the report's tool syntax table | ✅ COMPLETE (PowerShell row added with alias-canonicalization + AST compound-command note) |
| 9 | MED | Permission Semantics | Add compound-command / process-wrapper semantics to Bash wildcard notes — official permissions page documents wrapper stripping (`timeout`, `time`, `nice`, `nohup`, `stdbuf`, bare `xargs`), exec-wrapper prompting (`watch`, `setsid`, `ionice`, `flock`, `find -exec`/`-delete`), and per-subcommand matching for `&&`/`||`/`;`/`|` | ✅ COMPLETE (compound-command + process-wrapper bullets added to Bash wildcard notes) |
| 10 | MED | Permission Semantics | Add symlink resolution behavior to Read/Edit path patterns — official permissions page: allow rules require both symlink path and target to match; deny rules apply if either matches | ✅ COMPLETE (symlink resolution note added after Read/Edit prefix table) |
| 11 | MED | New Env Var (Hook Input) | Add `$CLAUDE_EFFORT` to env vars table — Bash subprocess and hook input env exposing active effort level (companion to `CLAUDE_CODE_EFFORT_LEVEL`). RECURRING (first seen 2026-05-09 v2.1.138 #15, deferred) | ✅ COMPLETE (added to env vars table; confirmed NOT on official /en/env-vars page — annotated read-only/changelog-only per Rule 5D) |
| 12 | MED | New Env Var (Changelog) | Add `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE` to env vars table — set to `1` to use Opus 4.6 for fast mode (v2.1.142 changed fast-mode default to Opus 4.7). v2.1.142 changelog only | ✅ COMPLETE (added to env vars table — confirmed ON official /en/env-vars page this run, NOT changelog-only as originally flagged) |
| 13 | MED | New Env Var (Changelog) | Add `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY` to env vars table — set to `1` to opt out of PowerShell tool passing `-ExecutionPolicy Bypass` (v2.1.143). Changelog only | ✅ COMPLETE (added to env vars table — confirmed ON official /en/env-vars page this run, NOT changelog-only as originally flagged) |
| 14 | MED | New Env Var (Changelog) | Add `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` to env vars table — clone GitHub plugin sources over HTTPS (v2.1.141). Changelog only | ✅ COMPLETE (added to env vars table — confirmed ON official /en/env-vars page this run, NOT changelog-only as originally flagged) |
| 15 | MED | Plugin Marketplace | Add brief note that plugin marketplace `source: 'settings'` supports inline plugin entries directly in settings.json (v2.1.137). RECURRING (first seen 2026-05-09 v2.1.138 #16) | ✅ COMPLETE (verified already documented in Plugin Settings + inline example; no change needed) |
| 16 | MED | Status Line | Add `terminalSequence` hook-output field reference and note that status line JSON now includes GitHub repo + PR information when detected (v2.1.145) to Status Line section | ✅ COMPLETE (github status-line input field added; terminalSequence is a hook-output field, deferred to claude-code-hooks repo per Rule 4A) |
| 17 | MED | Model Aliases | Verify Model Aliases table reflects Opus 4.7 / fast-mode-default-Opus-4.7 (v2.1.142) and `/model` session-only-change behavior (v2.1.144, press `d` to set default). Add `opus[1m]` default-on-Max/Team/Enterprise note already present; add note that `/model` change is session-scoped | ✅ COMPLETE (added /model session-scoped note v2.1.144; opus alias left as 4.6 — version is platform-dependent: 4.7 on Anthropic API, 4.6 on Bedrock/Vertex) |
| 18 | MED | Useful Commands | Add `/usage-credits` to Useful Commands (renamed from `/extra-usage` in v2.1.144; old name still works) | ✅ COMPLETE (/usage-credits added to Useful Commands) |
| 19 | MED | Env Var Rename | Annotate `DISABLE_EXTRA_USAGE_COMMAND` — `/extra-usage` renamed to `/usage-credits` in v2.1.144; verify whether a `DISABLE_USAGE_CREDITS_COMMAND` alias now exists | ✅ COMPLETE (annotated DISABLE_EXTRA_USAGE_COMMAND with the rename; no separate DISABLE_USAGE_CREDITS_COMMAND var observed this run) |
| 20 | LOW | Header Count | Update header claim from "60+ settings" → "80+ settings" to reflect actual official count after additions. RECURRING (first seen 2026-05-09 v2.1.138 #22) | ✅ COMPLETE (header count updated 60+ → 80+) |
| 21 | LOW | Example Update | Update Quick Reference example to showcase v2.1.140–v2.1.145 features (e.g., `worktree.bgIsolation`, `claudeMdExcludes`, or `ANTHROPIC_WORKSPACE_ID` env example) | ✅ COMPLETE (Quick Reference now showcases claudeMdExcludes + worktree.bgIsolation) |
| 22 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_DETAILS` still "in v2.1.85 changelog, not yet on official env-vars page" after 18+ consecutive runs. Per Rule 10B, deferred pending official docs update | ON HOLD (kept — recurring from 2026-04-14 v2.1.107) |
| 23 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_CONTENT` still changelog-only. Defer per Rule 8A | ON HOLD (kept — recurring from 2026-04-16 v2.1.110) |
| 24 | INVALID | Ownership Boundary (no-op) | Cross-checked all env vars in `claude-cli-startup-flags.md` (CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS, CLAUDE_CODE_TMPDIR, CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD, DISABLE_AUTOUPDATER, CLAUDE_CODE_EFFORT_LEVEL, USE_BUILTIN_RIPGREP, CLAUDE_CODE_SIMPLE, CLAUDE_BASH_NO_LOGIN, CCR_FORCE_BUNDLE) against the settings report. No duplication-without-cross-reference found; shared vars correctly carry cross-reference links both ways | ❌ INVALID (no boundary violation — Rule 5B passes) |
| 25 | INVALID | Hyperlink Validation (no-op) | All report hyperlinks validated: 12 ToC anchors resolve to headings; external URLs (settings, env-vars, permissions, schemastore via 301, feiskyer repo, shipyard blog, GitHub changelog) all return valid pages. `json.schemastore.org` still 301-redirects to `www.schemastore.org` (working) — leave as-is per v2.1.119 #8 decision | ❌ INVALID (no broken links — Rules 9A/9B/9C pass) |

---

## [2026-05-25 04:28 PM PKT] Claude Code v2.1.150

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Version Bump | Update report version badge from v2.1.145 → v2.1.150 and header "As of v2.1.145" → "As of v2.1.150" | ✅ COMPLETE (badge synced in Phase 2.6; body header text updated to v2.1.150) |
| 2 | HIGH | New Setting | Add `allowAllClaudeAiMcps` to MCP Settings table — managed-only boolean, loads claude.ai cloud MCP connectors alongside `managed-mcp.json`. v2.1.150 changelog only (NOT yet on official settings page) — annotate per Rule 1F. Agent reported it as v2.1.149; corrected to **v2.1.150** per direct changelog read | ✅ COMPLETE (added to MCP Settings table with v2.1.150 changelog-only annotation) — NEW |
| 3 | MED | New Setting | Add `disableAgentView` to General Settings — boolean, any scope (typically managed). Turns off background agents and agent view (`claude agents`, `--bg`, `/background`, on-demand supervisor). Equivalent to `CLAUDE_CODE_DISABLE_AGENT_VIEW=1`. Confirmed on official settings page | ✅ COMPLETE (added to General Settings table after `disableRemoteControl`) — NEW |
| 4 | MED | New Setting | Add `strictPluginOnlyCustomization` to Plugin Settings table — managed-only, boolean or array (`["skills","hooks"]`). Blocks skills/agents/hooks/MCP from user+project sources. Confirmed on official settings AND permissions pages | ✅ COMPLETE (added to Plugin Settings table after `strictKnownMarketplaces`) — NEW |
| 5 | MED | New Setting | Add `maxSkillDescriptionChars` to General Settings — integer, default `1536`, any scope (min-version 2.1.105). Per-skill cap on description+when_to_use text in the skill listing. Confirmed on official settings page | ✅ COMPLETE (added to General Settings table after `skillOverrides`) — NEW |
| 6 | MED | New Setting | Add `skillListingBudgetFraction` to General Settings — number, default `0.01` (1%), any scope (min-version 2.1.105). Fraction of context window reserved for the skill listing. Confirmed on official settings page | ✅ COMPLETE (added to General Settings table after `maxSkillDescriptionChars`) — NEW |
| 7 | MED | New Setting | Add `claudeMd` to Core Configuration (memory) — string, managed-only. CLAUDE.md-style instructions injected as org-managed memory; ignored in user/project/local settings. Confirmed on official settings page | ✅ COMPLETE (added to General Settings table after `claudeMdExcludes`) — NEW |
| 8 | MED | New Setting | Add `syntaxHighlightingDisabled` to Display Settings — boolean, default `false`, any scope. Disables syntax highlighting in diffs, code blocks, and file previews. Confirmed on official settings page (distinct from existing env var `CLAUDE_CODE_SYNTAX_HIGHLIGHT`) | ✅ COMPLETE (added to Display Settings table after `prefersReducedMotion`) — NEW |
| 9 | MED | Changed Behavior | Fix `externalEditorContext` (Global Config Settings table): default `true` → **`false`** (Rule 1C) AND description → "Prepend Claude's previous response as `#`-commented context when you open the external editor with `Ctrl+G`" (Rule 1D). Both confirmed wrong vs official settings page | ✅ COMPLETE (default and description corrected in Global Config Settings table) — NEW |
| 10 | MED | Changed Description | Update Model Aliases: `opus` "Claude Opus 4.6" → platform-dependent (Opus 4.7 on Anthropic API, 4.6 on Bedrock/Vertex/Foundry); `sonnet` similarly. Opus 4.7 is now latest + fast-mode default (v2.1.142); current "Latest Opus model (Claude Opus 4.6)" is self-contradictory | ✅ COMPLETE (opus → 4.7 Anthropic API / 4.6 Bedrock-Vertex-Foundry + fast-mode-default note; sonnet → 4.6 API / 4.5 third-party) — RECURRING (first seen 2026-05-21 v2.1.145 #17) |
| 11 | LOW | New Env Var | Add `CLAUDE_CODE_DISABLE_AGENT_VIEW` to env vars table — companion to `disableAgentView` setting (referenced on settings page as the env equivalent; not directly confirmed on env-vars page — annotate if added) | ✅ COMPLETE (added to env vars table after `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` with not-on-env-vars-page annotation) — NEW |
| 12 | LOW | Checklist | Add Rule 1I (Skills Settings Keys Completeness) — `maxSkillDescriptionChars`/`skillListingBudgetFraction` existed since v2.1.105 but were never caught; forces an explicit skills-key sweep each run | ✅ COMPLETE (appended Rule 1I to verification-checklist.md) |
| 13 | LOW | Example Update | Optionally showcase new keys (e.g., `maxSkillDescriptionChars`, `disableAgentView`, or `allowAllClaudeAiMcps`) in the Quick Reference complete example once added | ✅ COMPLETE (added `maxSkillDescriptionChars`, `skillListingBudgetFraction`, `disableAgentView`, `syntaxHighlightingDisabled` to Quick Reference; JSON re-validated) — NEW |
| 14 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_DETAILS` still "in v2.1.85 changelog, not yet on official env-vars page" after 19+ consecutive runs. Already in report with annotation (Rule 10B option a) | ✋ ON HOLD (kept — recurring from 2026-04-14 v2.1.107) |
| 15 | LOW | Suspect Key Recurrence | `OTEL_LOG_TOOL_CONTENT` still changelog-only. Defer per Rule 8A | ✋ ON HOLD (kept — recurring from 2026-04-16 v2.1.110) |
| 16 | INVALID | Spurious Drift Claim | `claude-code-guide` agent flagged `NO_COLOR` / `FORCE_COLOR` as missing env vars (claimed v2.1.143 subprocess pass-through). Verified directly against official /en/env-vars page — neither is documented; the v2.1.143 changelog entry covers `worktree.bgIsolation` + PowerShell ExecutionPolicy, not NO_COLOR. Not added per Rule 8A/5D | ❌ INVALID (agent claim unverified against official docs) |
| 17 | INVALID | Spurious Drift Claim | `workflow-claude-settings-agent` low-confidence noise keys `additionaleventDirectory` and `teammateDefaultModel` — garbled WebFetch-summary artifacts, not source-verified on official settings page. Not added per Rule 8A | ❌ INVALID (WebFetch-summary transcription noise) |
