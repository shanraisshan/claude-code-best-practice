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
