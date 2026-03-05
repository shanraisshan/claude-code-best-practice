# Settings Report — Changelog History

## Status Legend

| Status | Meaning |
|--------|---------|
| COMPLETE (reason) | Action was taken and resolved successfully |
| INVALID (reason) | Finding was incorrect, not applicable, or intentional |
| ON HOLD (reason) | Action deferred — waiting on external dependency or user decision |

---

## [2026-03-05 06:18 AM PKT] Claude Code v2.1.69

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Missing Settings | Add 13 non-hook missing settings keys (`$schema`, `availableModels`, `fastModePerSessionOptIn`, `teammateMode`, `prefersReducedMotion`, `sandbox.filesystem.*`, `sandbox.network.allowManagedDomainsOnly`, `sandbox.enableWeakerNetworkIsolation`, `allowManagedMcpServersOnly`, `blockedMarketplaces`, `includeGitInstructions`, `pluginTrustMessage`, `fileSuggestion` table entry) | COMPLETE (added to report) |
| 2 | HIGH | Missing Env Vars | Add missing environment variables including `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING`, `CLAUDE_CODE_DISABLE_1M_CONTEXT`, `CLAUDE_CODE_ACCOUNT_UUID`, `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS`, `ENABLE_CLAUDEAI_MCP_SERVERS`, and more | COMPLETE (added 13 missing env vars to report) |
| 3 | HIGH | Effort Default | Update effort level default from "High" to "Medium" for Max/Team subscribers; add Sonnet 4.6 support (changed v2.1.68) | COMPLETE (updated default and added Sonnet note) |
| 4 | MED | Settings Hierarchy | Add managed settings via macOS plist/Windows Registry (v2.1.61/v2.1.69); document array merge behavior across scopes | COMPLETE (added plist/registry and merge note) |
| 5 | MED | Sandbox Filesystem | Add `sandbox.filesystem.allowWrite`, `denyWrite`, `denyRead` with path prefix semantics (`//`, `~/`, `/`, `./`) | COMPLETE (added to sandbox table) |
| 6 | MED | Permission Syntax | Add `Agent(name)` permission pattern; document `MCP(server:tool)` syntax form | COMPLETE (added to tool syntax table) |
| 7 | MED | Plugin Gaps | Add `blockedMarketplaces`, `pluginTrustMessage` | COMPLETE (added to plugins table) |
| 8 | MED | Model Config | Add `availableModels` setting | COMPLETE (added to general settings table) |
| 9 | MED | Suspect Keys | Verify `sandbox.network.deniedDomains`, `sandbox.ignoreViolations`, `pluginConfigs` — present in report but not in official docs | ON HOLD (kept in report pending verification) |
| 10 | LOW | Header Counts | Update header from "38 settings and 84 env vars" to reflect actual counts (~55+ settings, ~110+ env vars) | COMPLETE (updated header) |
| 11 | LOW | CLAUDE.md Sync | Update CLAUDE.md configuration hierarchy (add managed/CLI/user levels) | ON HOLD (awaiting user approval) |
| 12 | LOW | Example Update | Update Quick Reference example with `$schema`, sandbox filesystem, `Agent(*)`, remove hooks example | COMPLETE (updated example) |
| 13 | MED | Hooks Redirect | Replace hooks section with redirect to claude-code-voice-hooks repo | COMPLETE (hooks externalized to dedicated repo) |
