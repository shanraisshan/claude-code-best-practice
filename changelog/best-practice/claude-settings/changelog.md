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
| 13 | MED | Hooks Redirect | Replace hooks section with redirect to claude-code-voice-hooks repo | ✅ COMPLETE (hooks externalized to dedicated repo) |

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
