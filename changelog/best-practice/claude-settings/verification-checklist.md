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

---

## 2. Settings Hierarchy

Rules that verify the settings hierarchy table.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 2A | Priority Levels | Verify all priority levels in the hierarchy table match official docs (5-level chain + managed policy) | field-level | settings documentation page | 2026-03-05 | Initial checklist — wrong priority causes override confusion |
| 2B | File Locations | For each priority level, verify the file location path matches official docs | content-match | settings documentation page | 2026-03-05 | Initial checklist — wrong paths cause settings to be ignored |

---

## 3. Permissions

Rules that verify permission configuration accuracy.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 3A | Permission Modes | Verify all permission modes in the table match official docs | field-level | settings documentation page | 2026-03-05 | Initial checklist — missing modes limit user options |
| 3B | Tool Syntax Patterns | Verify all tool permission syntax patterns and examples match official docs | content-match | settings documentation page | 2026-03-05 | Initial checklist — wrong syntax causes permission failures |

---

## 4. Hooks (REDIRECTED)

Hook analysis is excluded from this workflow. Hooks are maintained in the [claude-code-voice-hooks](https://github.com/shanraisshan/claude-code-voice-hooks) repo. Only verify the redirect link is still valid.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 4A | Hooks Redirect | Verify the hooks section in the report contains a valid redirect link to the claude-code-voice-hooks repo | exists | report file | 2026-03-05 | Hooks externalized to dedicated repo — only check redirect link validity |

---

## 5. Environment Variables

Rules that verify environment variable completeness and ownership.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 5A | Env Var Completeness | Verify all `env`-configurable environment variables from official docs appear in the report | field-level | settings documentation page | 2026-03-05 | Initial checklist — missing env vars limit user configuration options |
| 5B | Ownership Boundary | Verify no env vars from `best-practice/claude-cli-startup-flags.md` are duplicated in the settings report, and vice versa | cross-file | claude-cli-startup-flags.md vs settings report | 2026-03-05 | Initial checklist — env var refactoring split vars across two files, must prevent re-duplication |

---

## 6. Examples

Rules that verify example accuracy.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 6A | Quick Reference Example | Verify the Quick Reference complete example uses valid current settings with correct syntax and realistic values | content-match | settings documentation page | 2026-03-05 | Initial checklist — example must demonstrate current best practices |

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

## 9. Hyperlinks

Rules that verify all hyperlinks in the report are valid.

| # | Category | Check | Depth | Compare Against | Added | Origin |
|---|----------|-------|-------|-----------------|-------|--------|
| 9A | Local File Links | Verify all relative file links resolve to existing files | exists | local filesystem | 2026-03-05 | Initial checklist — file moves can break relative links |
| 9B | External URL Links | Verify all external URLs return valid pages (not 404 or error) | exists | HTTP response | 2026-03-05 | Initial checklist — external docs pages can be restructured or removed |
| 9C | Anchor Links | Verify all internal anchor links point to existing headings within the same file | exists | file headings | 2026-03-05 | Initial checklist — section renames can break anchor links |
