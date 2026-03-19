# Verification Checklist — Settings Report

Rules accumulate over time. Each workflow-changelog run MUST execute ALL rules at the specified depth. When a new type of drift is caught that an existing rule should have caught (but didn't exist or was too shallow), append a new rule here.

## Depth Levels

| Depth | Meaning | Example |
|-------|---------|---------|
| `exists` | Check if a section/table/file exists | "Does the report have a Sandbox Settings table?" |
| `presence-check` | Check if a specific item is present or absent | "Is the `ConfigChange` event in the Hook Events table?" |
| `content-match` | Compare actual values word-by-word against source | "Does the `model` setting description match official docs?" |
| `field-level` | Verify every individual field is accounted for | "Does each settings key from official docs appear in the correct table?" |
| `cross-file` | Same value must match across multiple files | "Does CLAUDE.md hooks section match the report's hook events?" |

---

## 1. Settings Keys Tables

Rules that verify settings key tables against official docs.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 1A | Key Completeness | For each settings key in official docs, verify it appears in the correct section table in the report | field-level | settings documentation page | 2026-03-05 | Initial checklist — ensures no new settings keys are missed |
| 1B | Key Types | For each key in the tables, verify the Type column matches official docs | content-match | settings documentation page | 2026-03-05 | Initial checklist — type mismatches cause user confusion |
| 1C | Key Defaults | For each key with a default, verify the Default column matches official docs | content-match | settings documentation page | 2026-03-05 | Initial checklist — wrong defaults cause unexpected behavior |
| 1D | Key Descriptions | For each key, verify the Description column accurately reflects official docs behavior | content-match | settings documentation page | 2026-03-05 | Initial checklist — stale descriptions mislead users |
| 1E | Scope Column | For each key that has a Scope column (MCP, Plugin, Permission tables), verify the scope value matches official docs (e.g., "Managed only", "Any", "Project") | content-match | settings documentation page | 2026-03-15 | v2.1.71 caught `extraKnownMarketplaces` scope wrong ("Any" → "Project"), v2.1.75 caught `autoMemoryDirectory` scope restriction. No rule existed to systematically verify scope columns |
| 1F | Inverse Completeness | For each key in the report tables, verify it exists in official docs OR is explicitly marked as "not in official docs — unverified". Keys with no official backing must be annotated | field-level | settings documentation page + JSON schema | 2026-03-15 | Suspect keys (`sandbox.ignoreViolations`, `skipWebFetchPreflight`, etc.) stayed ON HOLD for 6 runs because no rule checked the reverse direction — items in report that shouldn't be there |
| 1G | Edge-Case Semantics | For settings with special behavior at boundary values (e.g., `0`, empty string, `null`), verify the boundary behavior is documented and matches official docs | content-match | settings documentation page | 2026-03-15 | v2.1.75 caught `cleanupPeriodDays` zero-value behavior late; v2.1.76 added "hooks receive empty transcript_path" detail. Edge cases were under-verified |
| 1H | File Scope Check | For each key listed in the report as a `settings.json` key (particularly Display Settings), verify it is indeed a `settings.json` key and not a `~/.claude.json`-only preference. Official docs separate "Available settings" (settings.json) from "Global config settings" (~/.claude.json). Keys in the wrong scope mislead users and may cause schema validation errors | content-match | settings documentation page "Available settings" vs "Global config settings" sections | 2026-03-18 | v2.1.78 caught `showTurnDuration` and `terminalProgressBarEnabled` listed in Display Settings as settings.json keys, but official docs explicitly state they belong in `~/.claude.json` and "Adding them to settings.json will trigger a schema validation error." No rule existed to verify file scope |

---

## 2. Settings Hierarchy

Rules that verify the settings hierarchy table.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 2A | Priority Levels | Verify all priority levels in the hierarchy table match official docs (5-level chain + managed policy) | field-level | settings documentation page | 2026-03-05 | Initial checklist — wrong priority causes override confusion |
| 2B | File Locations | For each priority level, verify the file location path matches official docs | content-match | settings documentation page | 2026-03-05 | Initial checklist — wrong paths cause settings to be ignored |
| 2C | Merge Semantics | Verify the array/object merge behavior description (e.g., "concatenated and deduplicated") matches official docs wording exactly | content-match | settings documentation page | 2026-03-15 | v2.1.75 caught "merged" → "concatenated and deduplicated" change. No rule existed to check merge behavior wording |
| 2D | Managed Internals | Verify managed-tier delivery methods (server-managed, MDM, registry, file) and internal precedence order match official docs. Verify platform-specific file paths and deprecation notes | field-level | settings documentation page | 2026-03-15 | v2.1.75 restructured managed tier with internal precedence and Windows path deprecation. These sub-details had no dedicated rule |

---

## 3. Permissions

Rules that verify permission configuration accuracy.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 3A | Permission Modes | Verify all permission modes in the table match official docs | field-level | settings documentation page | 2026-03-05 | Initial checklist — missing modes limit user options |
| 3B | Tool Syntax Patterns | Verify all tool permission syntax patterns and examples match official docs | content-match | settings documentation page | 2026-03-05 | Initial checklist — wrong syntax causes permission failures |
| 3C | Bidirectional Mode Check | Verify every permission mode in the report exists in official docs, AND every mode in official docs exists in the report. Modes in report but not in docs must be marked "unverified" | field-level | settings + permissions documentation pages | 2026-03-15 | v2.1.74 caught `askEdits`/`viewOnly` in report but not in official docs — they had been unverified since run 1. Unidirectional check (docs→report) missed this for 3 runs |
| 3D | Evaluation Semantics | Verify permission evaluation order (deny-first), remote-environment restrictions, and path-prefix resolution meanings (`//`, `~/`, `/`, `./`) are documented and match official docs | content-match | permissions documentation page | 2026-03-15 | v2.1.75 caught missing evaluation order; v2.1.76 caught missing path-prefix patterns. Semantic behavior rules had no dedicated check |

---

## 4. Hooks (REDIRECTED)

Hook analysis is excluded from this workflow. Hooks are maintained in the [claude-code-hooks](https://github.com/shanraisshan/claude-code-hooks) repo. Only verify the redirect link is still valid.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 4A | Hooks Redirect | Verify the hooks section in the report contains a valid redirect link to the claude-code-hooks repo | exists | report file | 2026-03-05 | Hooks externalized to dedicated repo — only check redirect link validity |

---

## 5. Environment Variables

Rules that verify environment variable completeness and ownership.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 5A | Env Var Completeness | Verify all `env`-configurable environment variables from official docs appear in the report | field-level | settings documentation page | 2026-03-05 | Initial checklist — missing env vars limit user configuration options |
| 5B | Ownership Boundary | Verify no env vars from `best-practice/claude-cli-startup-flags.md` are duplicated in the settings report, and vice versa | cross-file | claude-cli-startup-flags.md vs settings report | 2026-03-05 | Initial checklist — env var refactoring split vars across two files, must prevent re-duplication |
| 5C | Env Var Descriptions | For each env var in the table, verify the description (format, values, behavior) matches official /en/env-vars page | content-match | env-vars documentation page | 2026-03-15 | v2.1.74 caught `ANTHROPIC_CUSTOM_HEADERS` described as "JSON string" instead of "Name: Value format, newline-separated". Rule 5A only checked presence, not description accuracy |
| 5D | Inverse Env Var Check | For each env var in the report table, verify it exists on the official /en/env-vars page OR is explicitly marked "not in official docs — unverified" | field-level | env-vars documentation page | 2026-03-15 | v2.1.76 found 7 env vars in report with no official backing. Without inverse checking, undocumented vars accumulate silently |

---

## 6. Examples

Rules that verify example accuracy.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 6A | Quick Reference Example | Verify the Quick Reference complete example uses valid current settings with correct syntax and realistic values | content-match | settings documentation page | 2026-03-05 | Initial checklist — example must demonstrate current best practices |
| 6B | Example URL Validation | Verify any URLs embedded in JSON example blocks (e.g., `$schema`, API endpoints) resolve correctly and use current domains | exists | HTTP response | 2026-03-15 | v2.1.74 caught `$schema` URL using wrong domain (`www.schemastore.org` vs `json.schemastore.org`). URLs inside code blocks were not covered by rule 9B which only checks markdown links |

---

## 7. Cross-File Consistency

Rules that verify consistency between the report and other repo files.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 7A | CLAUDE.md Sync | Verify CLAUDE.md's Configuration Hierarchy and Hooks System sections are consistent with the report | cross-file | CLAUDE.md vs report | 2026-03-05 | Initial checklist — CLAUDE.md could drift from report |

---

## 8. Process

Meta-rules about the workflow verification process itself.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 8A | Source Credibility Guard | Only flag items as drift if confirmed by official sources (settings documentation page, CLI reference page, GitHub changelog). Third-party blog sources may be outdated or wrong — use them for leads only, verify against official docs before flagging | content-match | official docs only | 2026-03-05 | Adopted from subagents workflow — prevents false positives from blog sources |

---

## 10. Version Metadata & Suspect Key Lifecycle

Meta-rules that verify report metadata accuracy and prevent indefinite accumulation of unresolved items.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 10A | Version Metadata | Verify the report's version badge, header settings count, and env var count reflect the actual audited version and current table row counts | content-match | report file internal consistency | 2026-03-15 | v2.1.71 caught version badge mismatch; v2.1.69 caught header counts wrong. No rule existed to verify these meta-fields |
| 10B | Suspect Key Escalation | After 5 consecutive runs ON HOLD, suspect keys must be resolved: either (a) confirmed via JSON schema and annotated with "in JSON schema, not on official page", or (b) removed from the report. Report the run count for each suspect key | exists | changelog history | 2026-03-15 | Suspect keys (`sandbox.ignoreViolations`, `skipWebFetchPreflight`, etc.) stayed ON HOLD across 6 runs with no resolution mechanism. Indefinite accumulation provides no value |
| 10C | Bidirectional Completeness | General meta-rule: every settings key, permission mode, and env var in the report must be traceable to an official source or explicitly marked "unverified". This is the inverse of rules 1A/3A/5A. Superset of 1F, 3C, 5D | field-level | official docs vs report | 2026-03-15 | Cross-cutting rule synthesized from research: 6 items were caught late because only docs→report checking existed. The reverse direction (report→docs) catches orphaned entries |

---

## 9. Hyperlinks

Rules that verify all hyperlinks in the report are valid.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 9A | Local File Links | Verify all relative file links resolve to existing files | exists | local filesystem | 2026-03-05 | Initial checklist — file moves can break relative links |
| 9B | External URL Links | Verify all external URLs return valid pages (not 404 or error) | exists | HTTP response | 2026-03-05 | Initial checklist — external docs pages can be restructured or removed |
| 9C | Anchor Links | Verify all internal anchor links point to existing headings within the same file | exists | file headings | 2026-03-05 | Initial checklist — section renames can break anchor links |
