# Development Workflows Changelog

**Status Legend:**

| Status | Meaning |
|--------|---------|
| `COMPLETE (reason)` | Action was taken and resolved successfully |
| `INVALID (reason)` | Finding was incorrect, not applicable, or intentional |
| `ON HOLD (reason)` | Action deferred, waiting on external dependency or user decision |

---

## [2026-03-19 05:25 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Repo Change | Changed humanlayer from article-only repo to humanlayer/humanlayer (★ 10k, 6 agents, 27 commands) | COMPLETE (user requested, repo has actual implementation) |
| 2 | HIGH | Count Update | Added counts for context-hub: 0 agents · 7 skills · 7 commands | COMPLETE (was showing —) |
| 3 | HIGH | Count Update | Added counts for agent-os: 0 agents · 0 skills · 5 commands | COMPLETE (was showing —) |
| 4 | MED | Count Update | Updated spec-kit commands from 14 to 9+ (9 core, extensions are community-contributed) | COMPLETE (agents confirmed 9 core command templates) |
| 5 | MED | Count Update | Updated OpenSpec commands from 10+ to 11 (confirmed exact count) | COMPLETE (agents confirmed 11 commands) |
| 6 | MED | Count Update | Updated gstack from "21 skills · 21 commands" to "21 skills/commands" (skills serve as command surface) | COMPLETE (no separate commands/ directory, skills ARE commands) |
| 7 | MED | Description | Added uniqueness descriptions for context-hub, agent-os, humanlayer | COMPLETE (was showing generic descriptions) |
| 8 | LOW | Sort Order | Moved humanlayer up from ★ 1.6k to ★ 10k position (after context-hub) | COMPLETE (repo change resulted in higher star count) |
| 9 | LOW | Report Update | Updated cross-workflow analysis report "Workflows at a Glance" table with all 9 workflows | COMPLETE (was only 6, now includes all 9 sorted by stars) |

---

## [2026-03-19 05:29 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Count Update | Update obra/superpowers agents from 7 to 5 (v5.0.4 consolidated review loop to whole-plan evaluation, removed 2 implicit agents) | COMPLETE (updated README table and report) |
| 2 | HIGH | Count Update | Update obra/superpowers skills from 44+ to 14 core (community repo obra/superpowers-skills archived Oct 2025) | COMPLETE (updated README table and report) |
| 3 | HIGH | Count Update | Update spec-kit: skills 10→0 (v0.3.0 replaced with preset system), commands kept at 9+ with 22 extensions noted in report | COMPLETE (updated README table and report) |
| 4 | HIGH | Count Update | Update context-hub counts from 7 skills · 7 commands to: 0 agents · 1 skill · 0 commands | COMPLETE (corrected previous run's inaccurate counts; only 1 SKILL.md in cli/skills/get-api-docs/) |
| 5 | MED | Star Update | Update spec-kit stars from 78k to 79k (78.5k displayed) | COMPLETE (updated README table and report) |
| 6 | MED | Count Update | agent-os counts already in README from previous run: 0 agents · 0 skills · 5 commands | COMPLETE (verified counts match) |
| 7 | MED | Star Update | Update agent-os stars from 4.1k to 4k (4,100 actual) | COMPLETE (updated README table and report) |
| 8 | MED | Report Update | Update cross-workflow analysis report with current counts for obra, spec-kit, context-hub, agent-os | COMPLETE (updated Workflows at a Glance table) |
| 9 | LOW | Count Update | OpenSpec commands: table shows 11, research found 9-11 depending on counting | INVALID (11 is within range of findings, keeping current value) |
| 10 | LOW | Uniqueness | Updated spec-kit uniqueness to mention pluggable extension/preset ecosystem (v0.3.0) | COMPLETE (replaced "pre-implementation gates" with "pluggable extension/preset ecosystem") |

---

## [2026-03-20 08:37 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 98k to 100k (99,603 actual — approaching 100k milestone) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 87k to 89k (88,580 actual) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update Get Shit Done ★ from 35k to 36k (36,307 actual) | COMPLETE (updated README table) |
| 4 | HIGH | Count Update | Update Get Shit Done commands from 46 to 50 (v1.26.0 added /gsd:ship, /gsd:next, /gsd:do, /gsd:ui-phase) | COMPLETE (updated README table) |
| 5 | MED | Star Update | Update gstack ★ from 26k to 29k (28,889 actual — v0.9.0 multi-AI expansion) | COMPLETE (updated README table) |
| 6 | MED | Count Update | Update BMAD-METHOD skills from 43 to 42 (v6.2.0 recount: 30 bmm-skills + 12 core-skills) | COMPLETE (updated README table) |
| 7 | LOW | Sort Order | Reorder table by Plan type groups (commands → agents → skills, stars descending within) | COMPLETE (commands: Spec Kit, OpenSpec, HumanLayer; agents: ECC, GSD; skills: Superpowers, BMAD, gstack) |

---

## [2026-03-21 09:20 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 100k to 103k (102,767 actual) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 89k to 93k (93,145 actual) | COMPLETE (updated README table) |
| 3 | HIGH | Count Update | Update ECC agents 25→28, commands 57→59, skills 108+→116 (v1.9.0: selective install, ECC Tools Pro, 12 lang ecosystems) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update Get Shit Done ★ from 36k to 38k (37,748 actual) | COMPLETE (updated README table) |
| 5 | HIGH | Count Update | Update GSD agents 16→18, commands 50→52 (v1.27.0: advisor mode, multi-repo workspaces, /gsd:fast, /gsd:review) | COMPLETE (updated README table) |
| 6 | HIGH | Star Update | Update gstack ★ from 29k to 34k (34,456 actual — v0.9.4 Codex reviews, Windows 11 support) | COMPLETE (updated README table) |
| 7 | HIGH | Architecture | Update BMAD agents from 9 to 0 (v6.x pure skills rewrite — agent personas now implemented as skills in bmm-skills/) | COMPLETE (updated README table) |
| 8 | MED | Star Update | Update BMAD ★ from 41k to 42k (41,629 actual) | COMPLETE (updated README table) |
| 9 | MED | Star Update | Update OpenSpec ★ from 32k to 33k (32,862 actual) | COMPLETE (updated README table) |
| 10 | MED | Sort Order | Swap gstack (34k) above OpenSpec (33k) — stars descending order | COMPLETE (updated README table) |

---

## [2026-03-23 09:53 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 103k to 107k (107,308 actual) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update ECC ★ from 93k to 101k (101,098 actual — crossed 100k milestone!) | COMPLETE (updated README table) |
| 3 | HIGH | Count Update | Update ECC commands 59→60, skills 116→125 (v1.9.0 continued: new skills pytorch-patterns, documentation-lookup, claude-devfleet, prompt-optimizer) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update gstack ★ from 34k to 41k (41,224 actual — v0.9.x multi-AI expansion, CSO security audit) | COMPLETE (updated README table) |
| 5 | HIGH | Count Update | Update gstack skills 21→27 (6 new: gstack-autoplan, gstack-benchmark, gstack-cso, gstack-design-consultation, gstack-office-hours, gstack-freeze/unfreeze) | COMPLETE (updated README table) |
| 6 | HIGH | Sort Order | Move gstack (41k) above GSD (40k) — stars descending order | COMPLETE (updated README table) |
| 7 | HIGH | Star Update | Update GSD ★ from 38k to 40k (39,588 actual) | COMPLETE (updated README table) |
| 8 | HIGH | Count Update | Update GSD commands 52→57 (v1.28.0: /gsd:forensics, /gsd:milestone-summary, /gsd:plant-seed, /gsd:profile-user, /gsd:workstreams) | COMPLETE (updated README table) |
| 9 | MED | Star Update | Update Spec Kit ★ from 79k to 81k (81,349 actual — v0.4.0 embedded core pack, 24 platform support) | COMPLETE (updated README table) |
| 10 | MED | Plan Update | Update gstack Plan from plan-eng-review to autoplan (higher-level orchestrator that reads CEO, design, eng review sequentially) | COMPLETE (updated README table) |
| 11 | LOW | Count Update | Update OpenSpec commands 11→10 (recount: /opsx:propose, apply, archive, new, continue, ff, verify, sync, bulk-archive, onboard) | COMPLETE (updated README table) |
| 12 | LOW | Count Correction | Correct OpenSpec skills 11→0 (no skills/ or .claude/skills/ directory exists — OpenSpec is a CLI tool, not skills-based) | COMPLETE (updated README table) |
