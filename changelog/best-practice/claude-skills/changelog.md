# Skills Report Changelog

**Status Legend:**

| Status | Meaning |
|--------|---------|
| ✅ `COMPLETE (reason)` | Action was taken and resolved successfully |
| ❌ `INVALID (reason)` | Finding was incorrect, not applicable, or intentional |
| ✋ `ON HOLD (reason)` | Action deferred — waiting on external dependency or user decision |

---

## [2026-03-13 04:22 PM PKT] Claude Code v2.1.74

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Extra Bundled Skill | `keybindings-help` is in local report but absent from official docs bundled skills list — investigate whether to remove or keep | ✅ COMPLETE (removed from bundled skills table — it is a local custom skill in this repo, not an official bundled skill; `/keybindings` is a built-in CLI command) |

---

## [2026-03-15 12:49 PM PKT] Claude Code v2.1.76

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | LOW | Field Accuracy | `name` field Required column reads "Recommended" in local report but official docs now list it as "No" (optional) — update to match | ✅ COMPLETE (updated `name` Required from "Recommended" to "No" to match official docs) |

---

## [2026-03-17 12:42 PM PKT] Claude Code v2.1.77

No drift detected — frontmatter fields (10) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-03-18 11:38 PM PKT] Claude Code v2.1.78

No drift detected — frontmatter fields (10) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-03-19 11:54 AM PKT] Claude Code v2.1.79

No drift detected — frontmatter fields (10) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-03-20 08:32 AM PKT] Claude Code v2.1.80

No drift detected — frontmatter fields (10) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-03-21 09:07 PM PKT] Claude Code v2.1.81

No drift detected — frontmatter fields (11) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-03-23 09:48 PM PKT] Claude Code v2.1.81

No drift detected — frontmatter fields (11) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-03-25 08:06 PM PKT] Claude Code v2.1.83

No drift detected — frontmatter fields (11) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-03-26 12:59 PM PKT] Claude Code v2.1.84

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `shell` field to frontmatter table — accepts `bash` (default) or `powershell`, controls shell for `!command` blocks in skill content | ✅ COMPLETE (added to frontmatter table, count updated 11→12) |

---

## [2026-03-27 06:25 PM PKT] Claude Code v2.1.85

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `paths` field to frontmatter table — accepts glob patterns (string or YAML list) that limit when a skill auto-activates | ✅ COMPLETE (added to frontmatter table, count updated 12→13) |

---

## [2026-03-28 05:59 PM PKT] Claude Code v2.1.86

No drift detected — frontmatter fields (13) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-03-31 06:51 PM PKT] Claude Code v2.1.88

No drift detected — frontmatter fields (13) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-04-01 12:27 PM PKT] Claude Code v2.1.89

No drift detected — frontmatter fields (13) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-04-02 09:11 PM PKT] Claude Code v2.1.90

No drift detected — frontmatter fields (13) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-04-03 08:28 PM PKT] Claude Code v2.1.91

No drift detected — frontmatter fields (13) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-04-04 10:38 PM PKT] Claude Code v2.1.92

No drift detected — frontmatter fields (13) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-04-08 09:33 PM PKT] Claude Code v2.1.96

No drift detected — frontmatter fields (13) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-04-09 11:30 PM PKT] Claude Code v2.1.97

No drift detected — frontmatter fields (13) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-04-11 06:08 PM PKT] Claude Code v2.1.101

No drift detected — frontmatter fields (13) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-04-13 08:02 PM PKT] Claude Code v2.1.101

No drift detected — frontmatter fields (13) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-04-14 11:13 PM PKT] Claude Code v2.1.107

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `when_to_use` field to frontmatter table — additional context for when Claude should invoke the skill; appended to `description` in skill listing, counts toward 1,536-char cap | ✅ COMPLETE (added to frontmatter table after `description`, count updated 13→14) |

---

## [2026-04-16 08:17 PM PKT] Claude Code v2.1.110

No drift detected — frontmatter fields (14) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-04-18 07:53 PM PKT] Claude Code v2.1.114

No drift detected — frontmatter fields (14) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-04-24 12:27 AM PKT] Claude Code v2.1.118

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `arguments` field to frontmatter table — accepts string or YAML list; named positional arguments for `$name` substitution in skill content; maps to argument positions in order | ✅ COMPLETE (added `arguments` row after `argument-hint`, count updated 14→15) |

---

## [2026-04-26 01:09 PM PKT] Claude Code v2.1.119

No drift detected — frontmatter fields (15) and bundled skills (5) are fully synchronized with official docs.

---

## [2026-04-29 12:48 AM PKT] Claude Code v2.1.121

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Skill | Add `fewer-permission-prompts` to official bundled skills table — introduced in v2.1.112; canonical commands reference (`/en/commands`) marks it `[Skill]` alongside the other 5 bundled skills. The Skills Reference prose at `/en/skills` undercounts (lists 5); commands page is authoritative | ✅ COMPLETE (added row 6 to bundled skills table, count updated 5→6) |

---

## [2026-05-01 03:30 PM PKT] Claude Code v2.1.126

No drift detected — frontmatter fields (15) and bundled skills (6) are fully synchronized with official docs.

---

## [2026-05-12 11:36 PM PKT] Claude Code v2.1.139

No drift detected — frontmatter fields (15) and bundled skills (6) are fully synchronized with official docs.

---

## [2026-05-21 12:04 AM PKT] Claude Code v2.1.145

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Skill | Add `run` to official bundled skills table — launch and drive the project's app to see a change working (requires v2.1.145) | ✅ COMPLETE (added as row 7, count updated 6→9) |
| 2 | HIGH | New Skill | Add `verify` to official bundled skills table — build and run the app to confirm a change works without falling back to tests/type checks (requires v2.1.145) | ✅ COMPLETE (added as row 8, count updated 6→9) |
| 3 | HIGH | New Skill | Add `run-skill-generator` to official bundled skills table — teaches `/run` and `/verify` how to build/launch the project, records a per-project recipe at `.claude/skills/run-<name>/` (requires v2.1.145) | ✅ COMPLETE (added as row 9, count updated 6→9) |

---

## [2026-05-25 04:25 PM PKT] Claude Code v2.1.150

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Renamed Skill | Rename `simplify` (row 1) to `code-review`; update description — `/simplify` was renamed to `/code-review` in v2.1.147, now reviews the current diff for correctness bugs at a chosen effort level (`--comment` posts findings as inline PR comments) | ✅ COMPLETE (renamed row 1 to `code-review` and rewrote description; bundled skill count stays 9) |
| 2 | LOW | Skill Naming | Agent flagged `fewer-permission-prompts` (report row 6) vs changelog name `less-permission-prompts` (v2.1.111) — verify which is canonical | ❌ INVALID (live `/` skill menu in this session confirms `fewer-permission-prompts` is the shipping name; report row 6 is correct, no change) |

---

## [2026-06-01 12:01 AM PKT] Claude Code v2.1.158

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `disallowed-tools` to frontmatter table — tools removed from Claude's available pool while the skill is active (accepts space/comma-separated string or YAML list; clears on next message). Introduced v2.1.152, reaffirmed v2.1.157. Update count 15→16 | ✅ COMPLETE (added `disallowed-tools` row after `allowed-tools`, count updated 15→16) |
| 2 | HIGH | New Skill | Add `simplify` to official bundled skills table — cleanup-only review (reuse, simplification, efficiency, abstraction level), four review agents in parallel; from v2.1.154 it does NOT hunt for correctness bugs (use `/code-review` for that). Update count 9→10 | ✅ COMPLETE (added as row 10, count updated 9→10) |

---

## [2026-06-01 10:11 AM PKT] Claude Code v2.1.159

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-02 10:03 AM PKT] Claude Code v2.1.160

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-03 10:03 AM PKT] Claude Code v2.1.161

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-04 10:03 AM PKT] Claude Code v2.1.162

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-05 10:03 AM PKT] Claude Code v2.1.163

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-06 10:08 AM PKT] Claude Code v2.1.167

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-07 10:04 AM PKT] Claude Code v2.1.168

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-08 10:04 AM PKT] Claude Code v2.1.168

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-09 10:04 AM PKT] Claude Code v2.1.169

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-10 10:04 AM PKT] Claude Code v2.1.170

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-11 10:08 AM PKT] Claude Code v2.1.172

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-12 10:07 AM PKT] Claude Code v2.1.175

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-13 10:07 AM PKT] Claude Code v2.1.176

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-14 10:07 AM PKT] Claude Code v2.1.176

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-15 10:08 AM PKT] Claude Code v2.1.176

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-16 10:08 AM PKT] Claude Code v2.1.178

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-17 10:07 AM PKT] Claude Code v2.1.179

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-18 10:05 AM PKT] Claude Code v2.1.181

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-19 10:06 AM PKT] Claude Code v2.1.183

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-20 10:06 AM PKT] Claude Code v2.1.183

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-21 10:06 AM PKT] Claude Code v2.1.185

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-22 10:06 AM PKT] Claude Code v2.1.185

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-23 10:06 AM PKT] Claude Code v2.1.186

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-24 10:06 AM PKT] Claude Code v2.1.187

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-25 10:06 AM PKT] Claude Code v2.1.191

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-26 10:06 AM PKT] Claude Code v2.1.193

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-27 10:06 AM PKT] Claude Code v2.1.195

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-28 10:06 AM PKT] Claude Code v2.1.195

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-29 10:07 AM PKT] Claude Code v2.1.195

No drift detected — frontmatter fields (16) and bundled skills (10) are fully synchronized with official docs.

---

## [2026-06-30 10:07 AM PKT] Claude Code v2.1.196

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Skill | Add `design-sync` to official bundled skills table — converts React design system and uploads to Claude Design; supports optional name argument (e.g., `/design-sync Acme DS`); first-time sync verifies all components (can take hours on large repos); available on Anthropic API only (unavailable on Bedrock, Google Cloud Agent Platform, Microsoft Foundry). Count updated 10→11 | ✅ COMPLETE (added as row 11, count updated 10→11) |

---

## [2026-07-01 10:05 AM PKT] Claude Code v2.1.197

No drift detected — frontmatter fields (16) and bundled skills (11) are fully synchronized with official docs.

---

## [2026-07-02 10:03 AM PKT] Claude Code v2.1.198

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Skill | Add `dataviz` to official bundled skills table — design charts, graphs, and dashboards with a color-palette validator for accessible, consistent visualizations; introduced in v2.1.187. Count updated 11→12 | ✅ COMPLETE (added as row 12, count updated 11→12) |

---

## [2026-07-03 10:03 AM PKT] Claude Code v2.1.199

No drift detected — frontmatter fields (16) and bundled skills (12) are fully synchronized with official docs.

---

## [2026-07-04 10:03 AM PKT] Claude Code v2.1.201

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | LOW | Factual Correction | Fix `dataviz` introduced version in bundled skills table — report says v2.1.187 but official changelog and commands reference both say v2.1.198 | ✅ COMPLETE (corrected introduced version v2.1.187 → v2.1.198 in row 12 of bundled skills table) |

---

## [2026-07-05 10:03 AM PKT] Claude Code v2.1.201

No drift detected — frontmatter fields (16) and bundled skills (12) are fully synchronized with official docs.

---

## [2026-07-06 10:04 AM PKT] Claude Code v2.1.201

No drift detected — frontmatter fields (16) and bundled skills (12) are fully synchronized with official docs.

---

## [2026-07-08 10:02 AM PKT] Claude Code v2.1.204

No drift detected — frontmatter fields (16) and bundled skills (12) are fully synchronized with official docs.

---

## [2026-07-09 10:03 AM PKT] Claude Code v2.1.205

No drift detected — frontmatter fields (16) and bundled skills (12) are fully synchronized with official docs.

---

## [2026-07-10 10:02 AM PKT] Claude Code v2.1.206

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Skill | Add `doctor` to official bundled skills table — reclassified from built-in command to bundled skill in v2.1.205; the one bundled skill exempt from `disableBundledSkills`, stays typable even when that setting is on. Count updated 12→13 | ✅ COMPLETE (added as row 13, count updated 12→13) |

---

## [2026-07-11 10:02 AM PKT] Claude Code v2.1.207

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-12 10:03 AM PKT] Claude Code v2.1.207

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-13 10:03 AM PKT] Claude Code v2.1.207

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-14 10:03 AM PKT] Claude Code v2.1.208

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-15 10:03 AM PKT] Claude Code v2.1.210

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-16 10:03 AM PKT] Claude Code v2.1.211

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-17 10:03 AM PKT] Claude Code v2.1.212

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-18 10:04 AM PKT] Claude Code v2.1.214

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-19 10:03 AM PKT] Claude Code v2.1.215

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-20 10:04 AM PKT] Claude Code v2.1.215

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-21 10:03 AM PKT] Claude Code v2.1.216

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-22 10:03 AM PKT] Claude Code v2.1.217

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-23 10:03 AM PKT] Claude Code v2.1.218

No drift detected — frontmatter fields (16) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-24 10:04 AM PKT] Claude Code v2.1.218

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `background` field to frontmatter table — only applies with `context: fork`; set to `false` to wait for the forked subagent's result in the current turn instead of running in the background (default: `true`). Count updated 16→17 | ✅ COMPLETE (added `background` after `agent` in frontmatter table, count updated 16→17) |
| 2 | MED | New Skill | Investigate `deep-research` as a potential bundled skill — changelog v2.1.216 changed its invocation to manual-only, but official docs also use it as a user-authored skill example, making bundled status ambiguous | ✋ ON HOLD (naming ambiguity: docs use `deep-research` as both a bundled invocation example and a user-authored skill example; needs human review to confirm bundled status before adding) |
| 3 | LOW | New Skill | Investigate `ultrareview` as a potential bundled skill — changelog v2.1.218 mentions fixing `/ultrareview` with descriptive arguments, suggesting it may be a bundled max-effort code-review variant | ✋ ON HOLD (low confidence: changelog mention is insufficient to confirm bundled status; needs human review) |

---

## [2026-07-25 10:06 AM PKT] Claude Code v2.1.220

No new drift detected — frontmatter fields (17) and bundled skills (13) are fully synchronized with official docs.

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Resolved ON HOLD | `deep-research` (held 2026-07-24): confirmed `/deep-research` is tagged Workflow in the commands reference, not a bundled skill | ❌ INVALID (commands reference marks it as Workflow — correctly absent from bundled skills table) |
| 2 | LOW | Resolved ON HOLD | `ultrareview` (held 2026-07-24): confirmed not a bundled skill — absent from commands reference bundled skills list | ❌ INVALID (absent from official commands reference; changelog mention was insufficient to confirm bundled status) |

---

## [2026-07-26 10:04 AM PKT] Claude Code v2.1.220

No drift detected — frontmatter fields (17) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-27 10:07 AM PKT] Claude Code v2.1.220

No drift detected — frontmatter fields (17) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-28 10:09 AM PKT] Claude Code v2.1.220

No drift detected — frontmatter fields (17) and bundled skills (13) are fully synchronized with official docs.

---

## [2026-07-29 10:06 AM PKT] Claude Code v2.1.220

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Skill | Add `review` to official bundled skills table — fast single-pass, read-only review of a GitHub pull request; became Skill-tool-invocable in v2.1.108; from v2.1.186–v2.1.201 used the `/code-review medium` engine; v2.1.202 reverted to fast single-pass. Count updated 13→15 | ✅ COMPLETE (added as row 14, count updated 13→15) |
| 2 | HIGH | New Skill | Add `security-review` to official bundled skills table — review the current diff for security vulnerabilities and suggest fixes; supports `--fix` and `--comment` flags; became Skill-tool-invocable in v2.1.108. Count updated 13→15 | ✅ COMPLETE (added as row 15, count updated 13→15) |

---

## [2026-07-30 10:08 AM PKT] Claude Code v2.1.220

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Potential Removed Skill | `review` (row 14) and `security-review` (row 15) are in local report but lack the `**[Skill]**` marker in the official commands reference — investigate whether this is a docs omission or a product removal | ✋ ON HOLD (likely a docs omission — both skills remain live and Skill-tool-invocable in the current session; awaiting human review before removing) |

---

## [2026-07-31 10:08 AM PKT] Claude Code v2.1.220

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Potential Removed Skills | `review` (row 14) and `security-review` (row 15) classification confirmed by today's research: official docs explicitly distinguish bundled skills (13 total) from "built-in commands reachable via the Skill tool" (`/init`, `/review`, `/security-review`) — report's bundled count of 15 overstates by 2; `/init` is also Skill-tool-invocable per docs but absent from report | ✋ ON HOLD (recurring from 2026-07-30; now confirmed as classification drift, not a docs omission; awaiting human review before reclassifying rows or moving them to a separate Skill-tool-invocable built-ins section) |

---

## [2026-08-01 10:06 AM PKT] Claude Code v2.1.220

No new drift detected — frontmatter fields (17) and bundled skills (15) are fully synchronized with official docs.

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Resolved ON HOLD | `review` and `security-review` classification (held since 2026-07-30): official commands reference now confirms both are labeled **Skill** with 15 total bundled skills — report count of 15 is correct | ❌ INVALID (commands reference confirms both as bundled skills; report count of 15 is correct and no reclassification needed) |

---

## [2026-08-02 10:05 AM PKT] Claude Code v2.1.220

No new frontmatter drift detected — frontmatter fields (17) are fully synchronized with official docs.

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Potential Removed Skills | `review` (row 14) and `security-review` (row 15) are not marked `**[Skill]**` in the official commands reference — raw marker count yields 13 bundled skills; official skills docs describe these two as built-in commands reachable via the Skill tool, not bundled skills. Count should be 13, not 15 | ✋ ON HOLD (recurring from 2026-07-30; 2026-08-01 run marked INVALID based on commands reference, but today's raw marker count re-confirms 13 bundled skills; awaiting human review before removing rows 14–15 or updating count) |

---

## [2026-08-07 10:08 AM PKT] Claude Code v2.1.224

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Field | Add `metadata` to frontmatter table — free-form YAML map for own key-value data read by external tooling from `SKILL.md`; Claude Code accepts but does not act on it; part of the Agent Skills spec. Count updated 17→20 | ✅ COMPLETE (added to frontmatter table after `shell`, count updated 17→20) |
| 2 | HIGH | New Field | Add `license` to frontmatter table — license covering the skill; part of Agent Skills spec; Claude Code accepts but does not act on it. Count updated 17→20 | ✅ COMPLETE (added to frontmatter table after `metadata`, count updated 17→20) |
| 3 | HIGH | New Field | Add `compatibility` to frontmatter table — environment requirements for the skill (max 500 chars), intended products or system prerequisites; part of Agent Skills spec; Claude Code accepts but does not act on it. Count updated 17→20 | ✅ COMPLETE (added to frontmatter table after `license`, count updated 17→20) |
| 4 | HIGH | Removed Skill | `review` (row 14) confirmed changed to alias of `/code-review` in v2.1.223 — no longer a distinct bundled skill; changelog v2.1.223: "Changed `/review` to be an alias of `/code-review`"; remove row 14 from bundled skills table | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 5 | MED | Potential Removed Skill | `security-review` (row 15) not marked `**[Skill]**` in official commands reference — official docs list 13 bundled skills; may be a docs omission since skill remains Skill-tool-invocable in live session | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |

---

## [2026-08-08 10:06 AM PKT] Claude Code v2.1.226

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — collapsed into `/code-review` alias in v2.1.223; commands reference no longer marks it **[Skill]**; report description describes pre-v2.1.223 behavior and is now stale | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) not marked **[Skill]** in commands reference — official docs list 13 bundled skills; skill remains Skill-tool-invocable per CHANGELOG but structural bundled-skill classification requires human review | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-09 10:09 AM PKT] Claude Code v2.1.226

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference shows no **[Skill]** marker; local description still describes pre-v2.1.223 standalone behavior | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — docs classify as built-in command reachable via Skill tool, not a bundled skill; official docs list 13 bundled skills (excludes both `review` and `security-review`); commands reference shows no **[Skill]** marker | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-10 10:09 AM PKT] Claude Code v2.1.226

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference has no separate `/review` row; local description still describes pre-v2.1.223 standalone fast-single-pass behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |

---

## [2026-08-11 10:06 AM PKT] Claude Code v2.1.227

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference has no separate [Skill] marker; local description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — not marked [Skill] in commands reference; official docs list 13 bundled skills total; no changelog corroboration of removal in last 10 versions; may be a docs-side classification issue rather than a product removal | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-12 10:10 AM PKT] Claude Code v2.1.228

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference carries no separate [Skill] marker for `/review`; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — official docs classify it as a "built-in command reachable via the Skill tool" (same category as `/init`), not a bundled skill; commands reference lists 13 [Skill]-marked rows, neither `review` nor `security-review` among them | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-13 10:07 AM PKT] Claude Code v2.1.229

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference carries no separate [Skill] marker for `/review`; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Resolved ON HOLD | `security-review` (row 15) ON HOLD from 2026-07-30: two independent research agents confirm commands reference lists `security-review` as one of 14 official bundled skills | ❌ INVALID (confirmed bundled — both agents independently count security-review in the 14 official bundled skills; recurring ambiguity resolved; row 15 is correct, no action needed) |

---

## [2026-08-14 10:06 AM PKT] Claude Code v2.1.232

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference carries no separate [Skill] marker for `/review`; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — commands reference does not mark it **[Skill]**; official docs classify 13 bundled skills; today's research agent again confirms absence of **[Skill]** marker despite 2026-08-13 run marking INVALID | ✋ ON HOLD (recurring from 2026-07-30; classification remains ambiguous across runs; awaiting human review before removing) |

---

## [2026-08-15 10:05 AM PKT] Claude Code v2.1.233

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference carries no separate [Skill] marker for `/review`; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — not marked [Skill] in commands reference; official docs classify 13 bundled skills; no changelog corroboration of removal in last 10 versions; classification remains ambiguous across runs | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-16 10:06 AM PKT] Claude Code v2.1.233

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference has no separate [Skill] marker for `/review`; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior; changelog v2.1.233 explicitly calls it a "bundled skill alias". Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — not marked [Skill] in commands reference; official docs list 13 bundled skills (excludes `review` and `security-review`); no changelog corroboration of removal in last 10 versions (2.1.223–2.1.233); classification remains ambiguous across runs | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-17 10:06 AM PKT] Claude Code v2.1.233

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference carries no separate [Skill] marker for `/review`; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — not marked [Skill] in commands reference; official docs list 13 bundled skills; agent also notes description drift (row 15 mentions `--fix`/`--comment` flags but official docs row no longer does); classification remains ambiguous across runs | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing or updating description) |

---

## [2026-08-18 10:09 AM PKT] Claude Code v2.1.234

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; v2.1.233 changelog explicitly mentions fixing "bundled skill aliases (`/checkup`, `/review`) reporting Unknown command", confirming alias-only status; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — official skills docs now explicitly state "A few built-in commands are also available through the Skill tool, including `/init` and `/security-review`", definitively classifying it as a built-in command reachable via Skill tool, not a bundled skill; this is the strongest doc-level evidence yet for reclassification | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing or moving to a separate built-in-commands-via-Skill section) |

---

## [2026-08-19 10:05 AM PKT] Claude Code v2.1.235

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; docs `/review` row carries no [Skill] marker and is documented as "Alias of `/code-review`"; changelog v2.1.233 confirms alias-only status by fixing "bundled skill aliases like `/checkup` and `/review` reporting Unknown command". Row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — not marked [Skill] in commands reference; official docs list 13 bundled skills; no changelog corroboration of removal in last 10 versions (v2.1.225–v2.1.235); classification remains ambiguous across runs | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-20 10:05 AM PKT] Claude Code v2.1.237

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference carries no separate [Skill] marker for `/review`; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — not marked [Skill] in commands reference; official docs list 13 bundled skills (excludes both `review` and `security-review`); no changelog corroboration of removal in last 10 versions (v2.1.228–v2.1.237); classification remains ambiguous across runs | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-21 10:05 AM PKT] Claude Code v2.1.238

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference has no separate [Skill] marker for `/review`; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior; official docs list 13 bundled skills. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — not marked [Skill] in commands reference; official docs list 13 bundled skills (excludes both `review` and `security-review`); no changelog corroboration of removal in last 10 versions (v2.1.229–v2.1.238); classification remains ambiguous across runs | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-22 10:05 AM PKT] Claude Code v2.1.239

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference carries no separate [Skill] marker for `/review`; official skills page explicitly calls `/review` "the bundled alias" of `code-review`; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — not marked [Skill] in commands reference; official docs list 13 bundled skills (excludes both `review` and `security-review`); no changelog corroboration of removal in last 10 versions (v2.1.230–v2.1.239); classification remains ambiguous across runs | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-23 10:04 AM PKT] Claude Code v2.1.241

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference carries no separate [Skill] marker for `/review`; commands reference explicitly documents: "Alias of `/code-review`… Before v2.1.223, `/review` was a separate command that ran a single-pass, read-only review of a GitHub pull request by number"; row 14 description still describes pre-v2.1.223 standalone behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — not marked [Skill] in commands reference; official docs list 13 bundled skills (excludes both `review` and `security-review`); no changelog corroboration of removal in last 10 versions (v2.1.232–v2.1.241); classification remains ambiguous across runs | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-24 10:12 AM PKT] Claude Code v2.1.241

No new drift detected — frontmatter fields (20) and bundled skills (15) are fully synchronized with official docs.

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference has no separate [Skill] marker for `/review`; official skills docs explicitly state `/review` was "a separate command" before v2.1.223, confirming alias-only status; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — official skills docs explicitly state "A few built-in commands are also available through the Skill tool, including `/init` and `/security-review`", classifying it as a built-in command reachable via Skill tool, not a bundled skill; no changelog corroboration of removal in last 10 versions (v2.1.232–v2.1.241) | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing or reclassifying) |

---

## [2026-08-25 10:08 AM PKT] Claude Code v2.1.241

No new drift detected — frontmatter fields (20) are fully synchronized with official docs.

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference carries no `[Skill]` marker for `/review`; docs classify it as "Alias of `/code-review`"; changelog v2.1.233 groups it as a "bundled skill alias" (not a distinct bundled skill); row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Official docs list 13 bundled skills. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — official skills docs explicitly state "A few built-in commands are also available through the Skill tool, including `/init` and `/security-review`", classifying it as a built-in command reachable via Skill tool, not a distinct bundled skill; commands reference carries no `[Skill]` marker; official docs list 13 bundled skills (excludes both `review` and `security-review`); no changelog corroboration of removal in v2.1.232–v2.1.241 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |

---

## [2026-08-26 10:27 AM PKT] Claude Code v2.1.246

No new drift detected — frontmatter fields (20) are fully synchronized with official docs.

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference has no separate [Skill] marker for `/review`; docs explicitly state "Before v2.1.223, `/review` was a separate command"; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Official docs list 13 bundled skills. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — official skills docs explicitly state "A few built-in commands are also available through the Skill tool, including `/init` and `/security-review`", classifying it as a built-in command reachable via Skill tool, not a bundled skill; commands reference carries no [Skill] marker; official docs list 13 bundled skills (excludes both `review` and `security-review`); no changelog corroboration of removal in v2.1.235–v2.1.246 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |

---

## [2026-08-27 10:05 AM PKT] Claude Code v2.1.247

No new drift detected — frontmatter fields (20) are fully synchronized with official docs.

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference has no separate [Skill] marker for `/review`; docs note "a `code-review` skill in `.claude/skills/` replaces the bundled `/code-review`, and the alias `/review` never runs your skill"; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Official docs list 13 bundled skills. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — not marked [Skill] in commands reference; official docs list 13 bundled skills (excludes both `review` and `security-review`); skill remains Skill-tool-invocable in live session; no changelog corroboration of removal in v2.1.236–v2.1.247 | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-28 10:08 AM PKT] Claude Code v2.1.250

No new frontmatter drift detected — frontmatter fields (20) are fully synchronized with official docs.

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | LOW | Potential New Skill | `workflow-authoring` added in v2.1.248 — ships with Claude Code but carries no `**[Skill]**` marker in the commands reference and is not user-invocable; loaded as internal reference material only | ❌ INVALID (no [Skill] marker in commands reference; not a bundled skill per official criteria — correctly absent from bundled skills table) |
| 2 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference has no separate [Skill] marker for `/review`; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Official docs list 13 bundled skills. Count should update 15→14 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 3 | MED | Potential Removed Skill | `security-review` (row 15) — official skills docs explicitly state "A few built-in commands are also available through the Skill tool, including `/init` and `/security-review`", classifying it as a built-in command reachable via Skill tool, not a distinct bundled skill; commands reference carries no [Skill] marker; no changelog corroboration of removal in last 10 versions (v2.1.240–v2.1.250) | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-29 10:02 AM PKT] Claude Code v2.1.251

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | New Skill | Add `workflow-authoring` to official bundled skills table — loads the reference for writing dynamic workflow scripts (script API, resume behavior, quality patterns, worked examples); available only when dynamic workflows are enabled; confirmed `[Skill]`-marked in commands reference as of v2.1.251; introduced v2.1.248. Count updated 15→16 | ✅ COMPLETE (added as row 16, count updated 15→16) |
| 2 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference has no separate [Skill] marker for `/review`; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Count would update 16→15 after removal | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 3 | MED | Potential Removed Skill | `security-review` (row 15) — official skills docs explicitly state "A few built-in commands are also available through the Skill tool, including `/init` and `/security-review`", classifying it as a built-in command reachable via Skill tool, not a bundled skill; commands reference carries no [Skill] marker; no changelog corroboration of removal in last 10 versions (v2.1.241–v2.1.251) | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |

---

## [2026-08-30 10:06 AM PKT] Claude Code v2.1.251

No new drift detected — frontmatter fields (20) are fully synchronized with official docs.

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Removed Skill | Remove `review` (row 14) — confirmed alias of `/code-review` since v2.1.223; commands reference carries no separate [Skill] marker for `/review`; docs explicitly document it as "Alias of `/code-review`"; changelog v2.1.223 announced the change; row 14 description still describes pre-v2.1.223 standalone fast-single-pass PR review behavior. Official docs list 14 bundled skills. Count should update 16→15 | ✋ ON HOLD (recurring from 2026-07-30; autonomous run cannot remove without human review) |
| 2 | MED | Potential Removed Skill | `security-review` (row 15) — commands reference carries no [Skill] marker; official skills docs state "A few built-in commands are also available through the Skill tool, including `/init` and `/security-review`", classifying it as a built-in command reachable via Skill tool, not a distinct bundled skill; official docs list 14 bundled skills (excludes both `review` and `security-review`); no changelog corroboration of removal in last 10 versions (v2.1.241–v2.1.251) | ✋ ON HOLD (recurring from 2026-07-30; awaiting human review before removing) |
