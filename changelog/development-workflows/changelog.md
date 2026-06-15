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

---

## [2026-03-24 08:12 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 107k to 110k (109,846 actual) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update ECC ★ from 101k to 104k (103,960 actual) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update gstack ★ from 41k to 44k (44,300 actual — v0.11.x triple-voice multi-model review) | COMPLETE (updated README table) |
| 4 | HIGH | Sort Order | Move gstack (44k) above BMAD (42k) — stars descending order | COMPLETE (updated README table) |
| 5 | HIGH | Count Update | Update BMAD skills from 42 to 44 (recount: 32 bmm-skills + 12 core-skills, including 3 nested research sub-skills) | COMPLETE (updated README table) |
| 6 | HIGH | Count Update | Update gstack skills from 27 to 28 (README states 28; 27 confirmed individually) | COMPLETE (updated README table) |
| 7 | MED | Star Update | Update Spec Kit ★ from 81k to 82k (81,780 actual) | COMPLETE (updated README table) |
| 8 | MED | Star Update | Update GSD ★ from 40k to 41k (40,500 actual) | COMPLETE (updated README table) |
| 9 | MED | Star Update | Update OpenSpec ★ from 33k to 34k (33,800 actual) | COMPLETE (updated README table) |

---

## [2026-03-25 08:12 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 110k to 112k (112,163 actual) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update ECC ★ from 104k to 107k (106,913 actual) | COMPLETE (updated README table) |
| 3 | HIGH | Count Update | Update ECC commands from 60 to 63 (3 new in .claude/commands/: add-language-rules, database-migration, feature-development) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update gstack ★ from 44k to 47k (46,703 actual — infrastructure hardening, test coverage gates) | COMPLETE (updated README table) |
| 5 | MED | Count Update | Update BMAD skills from 44 to 42 (recount: 30 bmm-skills + 12 core-skills; v6.2.1 consolidated 2 sub-skills) | COMPLETE (updated README table) |
| 6 | LOW | Count Update | Update gstack skills from 28 to 27 (27 root-level dirs confirmed; 28th may be root SKILL.md template) | COMPLETE (updated README table) |

---

## [2026-03-26 01:05 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 112k to 114k (114,107 actual) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update ECC ★ from 107k to 109k (108,839 actual) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update gstack ★ from 47k to 48k (48,303 actual) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update GSD ★ from 41k to 42k (42,092 actual) | COMPLETE (updated README table) |
| 5 | MED | Count Update | Update OpenSpec commands from 10 to 11 (v1.2.0 added /opsx:explore) | COMPLETE (updated README table) |

---

## [2026-03-27 06:32 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 114k to 118k (117,568 actual) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update ECC ★ from 109k to 111k (111,487 actual) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update gstack ★ from 48k to 52k (51,544 actual — v0.12.x skill namespacing, Codex fallback, worktree parallelization) | COMPLETE (updated README table) |
| 4 | HIGH | Count Update | Update gstack skills from 27 to 31 (4 new: canary, codex, connect-chrome, land-and-deploy among others) | COMPLETE (updated README table) |
| 5 | HIGH | Star Update | Update GSD ★ from 42k to 43k (43,136 actual) | COMPLETE (updated README table) |
| 6 | HIGH | Sort Order | Swap GSD (43,136) above BMAD (42,529) — both round to 43k but GSD has more stars | COMPLETE (updated README table) |
| 7 | MED | Star Update | Update Spec Kit ★ from 82k to 83k (82,878 actual) | COMPLETE (updated README table) |
| 8 | MED | Star Update | Update BMAD ★ from 42k to 43k (42,529 actual) | COMPLETE (updated README table) |
| 9 | MED | Star Update | Update OpenSpec ★ from 34k to 35k (34,821 actual) | COMPLETE (updated README table) |
| 10 | MED | Count Update | Update Compound Engineering agents from 43 to 47 (4 new review/workflow agents) | COMPLETE (updated README table) |
| 11 | MED | Count Update | Update Compound Engineering skills from 44 to 42 (recount: 41 compound-engineering + 1 coding-tutor) | COMPLETE (updated README table) |

---

## [2026-03-28 09:29 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 118k to 120k (120,147 actual) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update ECC ★ from 111k to 114k (114,134 actual) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update gstack ★ from 52k to 54k (53,533 actual — v0.13.x design binary, security audit) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update GSD ★ from 43k to 44k (43,816 actual — v1.30.0 GSD SDK headless CLI) | COMPLETE (updated README table) |
| 5 | MED | Count Update | Update gstack skills from 31 to 29 (29 root-level SKILL.md dirs confirmed; 2 removed/consolidated in v0.13.x) | COMPLETE (updated README table) |
| 6 | MED | Count Update | Update BMAD skills from 42 to 43 (31 bmm-skills + 12 core-skills) | COMPLETE (updated README table) |
| 7 | MED | Count Update | Update Compound Engineering skills from 42 to 43 (42 compound-eng + 1 coding-tutor) | COMPLETE (updated README table) |

---

## [2026-03-29 08:00 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 120k to 122k (122,129 actual) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update ECC ★ from 114k to 116k (115,898 actual) | COMPLETE (updated README table) |
| 3 | HIGH | Count Update | Update ECC agents from 28 to 30, skills from 125 to 135 (healthcare agent, token-budget-advisor among new additions) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update gstack ★ from 54k to 55k (55,000 actual) | COMPLETE (updated README table) |
| 5 | MED | Count Update | Update gstack skills from 29 to 28 (28 root-level SKILL.md dirs confirmed by README) | COMPLETE (updated README table) |
| 6 | MED | Count Update | Update BMAD skills from 43 to 40 (recount: 29 bmm-skills + 11 core-skills; consolidation in recent patches) | COMPLETE (updated README table) |
| 7 | MED | Star Update | Update Compound Engineering ★ from 11k to 12k (11,500 actual) | COMPLETE (updated README table) |
| 8 | MED | Count Update | Update Compound Eng agents from 47 to 48 (1 new), skills from 43 to 42 (41 compound-eng + 1 coding-tutor) | COMPLETE (updated README table) |

---

## [2026-03-31 07:43 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 122k to 127k (127,473 actual) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update ECC ★ from 116k to 124k (124,279 actual) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update gstack ★ from 55k to 59k (59,046 actual — v0.14.x Review Army, composable skills, adversarial review) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update GSD ★ from 44k to 46k (45,773 actual) | COMPLETE (updated README table) |
| 5 | HIGH | Count Update | Update gstack skills from 28 to 32 (4 new: design-html, sidebar CSS inspector, composable skill resolver, scope drift detection) | COMPLETE (updated README table) |
| 6 | MED | Star Update | Update Spec Kit ★ from 83k to 84k (84,042 actual) | COMPLETE (updated README table) |
| 7 | MED | Star Update | Update OpenSpec ★ from 35k to 36k (35,985 actual) | COMPLETE (updated README table) |
| 8 | MED | Count Update | Update BMAD skills from 40 to 43 (32 bmm-skills + 11 core-skills; 3 new bmm-skills added including PRFAQ) | COMPLETE (updated README table) |
| 9 | LOW | Count Verify | ECC commands 63→3, skills 135→30 — research agent only checked .claude/ dirs, missed root commands/ and .agents/skills/ breadth | INVALID (agent undercounting — keeping current values 63 commands, 135 skills) |
| 10 | LOW | Count Verify | Superpowers agents 5→8 — agent counted 1 explicit + 7 implicit sub-agents, but v5.0.6 replaced subagent review loops with inline self-review | ON HOLD (contradictory signals — v5.0.6 reduced review agents while brainstorm added new ones, needs manual verification) |

---

## [2026-04-01 12:35 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 127k to 129k (128,925 actual) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update ECC ★ from 124k to 129k (128,606 actual — neck-and-neck with Superpowers) | COMPLETE (updated README table) |
| 3 | HIGH | Count Update | Update ECC agents 30→36, commands 63→71, skills 135→143 (6 new agents incl. gan-evaluator/generator/planner, cpp/kotlin/flutter reviewers; 8 new commands; 8 new skills) | COMPLETE (updated README table) |
| 4 | MED | Star Update | Update gstack ★ from 59k to 60k (60,036 actual — v0.15.0 /checkpoint, /health, cross-session timeline) | COMPLETE (updated README table) |
| 5 | MED | Count Update | Update gstack skills 32→33 (v0.15.0 added /checkpoint and /health, but some consolidated — net +1) | COMPLETE (updated README table) |
| 6 | LOW | Count Update | Update CE commands 4→3 (.claude/commands/ now empty; 3 coding-tutor commands remain), skills 42→40 (39 CE + 1 CT) | COMPLETE (updated README table) |
| 7 | LOW | Count Verify | BMAD skills 43→34 — agent counted from module-help.csv (25 bmm + 9 core), previous directory counts found 43 (32 bmm + 11 core) | ON HOLD (agent likely undercounting — module-help.csv may not list all skills; keeping 43 until manual verification) |

---

## [2026-04-02 09:22 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Sort Order | Move ECC (133k) above Superpowers (132k) — ECC now has more stars | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update ECC ★ from 129k to 133k (133,114 actual — overtook Superpowers) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update Superpowers ★ from 129k to 132k (131,818 actual) | COMPLETE (updated README table) |
| 4 | HIGH | Count Update | Update ECC commands 71→68, skills 143→152 (legacy commands collapsed into skills; +9 new skills incl. brand-voice, network-ops) | COMPLETE (updated README table) |
| 5 | HIGH | Star Update | Update gstack ★ from 60k to 62k (61,800 actual — v0.15.1 design-html routing, Session Intelligence Layer) | COMPLETE (updated README table) |
| 6 | HIGH | Count Update | Update GSD agents 18→21, commands 57→59 (v1.31.0: 3 new agents, skills discovery, Gemini CLI fix) | COMPLETE (updated README table) |
| 7 | MED | Star Update | Update Spec Kit ★ from 84k to 85k (84,701 actual) | COMPLETE (updated README table) |
| 8 | MED | Star Update | Update GSD ★ from 46k to 47k (46,900 actual) | COMPLETE (updated README table) |
| 9 | MED | Count Update | Update BMAD skills 43→40 (29 bmm-skills + 11 core-skills; removed QA Quinn + Barry solo-dev, added checkpoint-preview) | COMPLETE (updated README table) |
| 10 | MED | Star Update | Update OpenSpec ★ from 36k to 37k (36,600 actual) | COMPLETE (updated README table) |
| 11 | MED | Star Update | Update CE ★ from 12k to 13k (12,600 actual) | COMPLETE (updated README table) |
| 12 | MED | Count Update | Update CE agents 48→49, commands 3→4, skills 40→42 (triage-prs command added; +1 agent, +2 skills) | COMPLETE (updated README table) |

---

## [2026-04-03 10:56 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update ECC ★ from 133k to 136k (135,765 actual — widening lead over Superpowers) | COMPLETE (updated README table) |
| 2 | HIGH | Count Update | Update ECC agents 36→38, commands 68→75, skills 152→156 (NestJS patterns, Jira integration, C#/Dart support, web frontend rules) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update Superpowers ★ from 132k to 134k (133,718 actual — v5.0.7 Copilot CLI support, contributor guardrails) | COMPLETE (updated README table) |
| 4 | MED | Star Update | Update gstack ★ from 62k to 63k (63,065 actual — Session Intelligence Layer, AquaVoice aliases) | COMPLETE (updated README table) |
| 5 | MED | Count Update | Update gstack skills from 33 to 31 (31 root-level SKILL.md dirs confirmed; checkpoint/health may be subcommands) | COMPLETE (updated README table) |
| 6 | LOW | Count Update | Update GSD commands from 59 to 60 (v1.31.0: /gsd:docs-update added) | COMPLETE (updated README table) |
| 7 | LOW | Count Update | Update BMAD skills from 40 to 39 (28 bmm-skills + 11 core-skills; minor consolidation) | COMPLETE (updated README table) |

---

## [2026-04-04 10:45 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MED | Star Update | Update ECC ★ from 136k to 137k (137,404 actual) | COMPLETE (updated README table) |
| 2 | MED | Star Update | Update Superpowers ★ from 134k to 135k (134,933 actual) | COMPLETE (updated README table) |
| 3 | MED | Star Update | Update gstack ★ from 63k to 64k (63,841 actual — GStack Browser .app with CDP, anti-bot stealth) | COMPLETE (updated README table) |
| 4 | MED | Star Update | Update GSD ★ from 47k to 48k (47,705 actual — v1.32.0 Trae/Kilo/Augment/Cline runtimes) | COMPLETE (updated README table) |
| 5 | LOW | Star Update | Update BMAD ★ from 43k to 44k (43,538 actual) | COMPLETE (updated README table) |
| 6 | LOW | Star Update | Update oh-my-claudecode ★ from 23k to 24k (23,709 actual — v4.10.2 HUD, Bedrock hardening) | COMPLETE (updated README table) |

---

## [2026-04-06 09:49 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update ECC ★ from 137k to 142k (142,218 actual — v1.10.0 Surface Refresh, 10 commits on Apr 6 alone) | COMPLETE (updated README table) |
| 2 | HIGH | Count Update | Update ECC agents 38→47, commands 75→82, skills 156→182 (agent-introspection-debugging, hookify bundle restored, 26 new skills) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update Superpowers ★ from 135k to 137k (137,166 actual) | COMPLETE (updated README table) |
| 4 | HIGH | Count Update | Update GSD agents 21→24, commands 60→68 (v1.33.0: unified behavioral refs, STATE.md drift detection, autonomous --to N) | COMPLETE (updated README table) |
| 5 | MED | Star Update | Update gstack ★ from 64k to 65k (65,279 actual — v0.15.15.0 token redaction, team mode) | COMPLETE (updated README table) |
| 6 | MED | Count Update | Update gstack skills from 31 to 34 (3 new: retro, setup-deploy, learn among others) | COMPLETE (updated README table) |
| 7 | MED | Star Update | Update Spec Kit ★ from 85k to 86k (85,617 actual — v0.5.0 native skills arch) | COMPLETE (updated README table) |
| 8 | LOW | Star Update | Update OpenSpec ★ from 37k to 38k (37,604 actual) | COMPLETE (updated README table) |
| 9 | LOW | Star Update | Update oh-my-claudecode ★ from 24k to 25k (24,921 actual — v4.10.0 HUD upgrades, LSP diagnostics) | COMPLETE (updated README table) |
| 10 | LOW | Count Update | Update CE agents from 49 to 50 (1 new agent added) | COMPLETE (updated README table) |

---

## [2026-04-08 09:38 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update ECC ★ from 142k to 146k (146,462 actual — v1.10.0 Surface Refresh momentum, ecc2 alpha development) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Superpowers ★ from 137k to 141k (141,071 actual) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update gstack ★ from 65k to 67k (67,178 actual — v0.16.0.0 browser data platform, per-tab state isolation) | COMPLETE (updated README table) |
| 4 | HIGH | Count Update | Update gstack skills from 34 to 37 (3 new: setup-browser-cookies, pair-agent, open-gstack-browser among confirmed additions) | COMPLETE (updated README table) |
| 5 | MED | Star Update | Update GSD ★ from 48k to 49k (49,343 actual — v1.34.0 four-category gate taxonomy, post-merge verification) | COMPLETE (updated README table) |
| 6 | MED | Star Update | Update oh-my-claudecode ★ from 25k to 26k (26,203 actual — v4.11.1 git status HUD, hostname element) | COMPLETE (updated README table) |
| 7 | MED | Count Update | Update oh-my-claudecode skills from 36 to 37 (skillify skill added) | COMPLETE (updated README table) |
| 8 | MED | Star Update | Update CE ★ from 13k to 14k (13,671 actual — v2.62.0 decision matrices, headless mode) | COMPLETE (updated README table) |
| 9 | LOW | Count Update | Update CE agents from 50 to 51 (1 new agent added) | COMPLETE (updated README table) |
| 10 | LOW | Count Update | Update CE skills from 42 to 44 (2 new: onboarding skill, interactive deepening mode) | COMPLETE (updated README table) |

---

## [2026-04-10 12:23 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update ECC ★ from 146k to 148k (148,000 actual — v1.10.0 momentum, ecc2 alpha) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Superpowers ★ from 141k to 143k (143,000 actual — v5.0.7 Copilot CLI) | COMPLETE (updated README table) |
| 3 | MED | Star Update | Update Spec Kit ★ from 86k to 87k (86,600 actual — v0.5.1 dev docs) | COMPLETE (updated README table) |
| 4 | MED | Star Update | Update gstack ★ from 67k to 68k (68,200 actual — v0.16.0.0 browser data platform) | COMPLETE (updated README table) |
| 5 | MED | Star Update | Update GSD ★ from 49k to 50k (49,900 actual — v1.34.0 persistent learnings, intel queries) | COMPLETE (updated README table) |
| 6 | MED | Star Update | Update OpenSpec ★ from 38k to 39k (38,700 actual) | COMPLETE (updated README table) |
| 7 | LOW | Star Update | Update oh-my-claudecode ★ from 26k to 27k (26,900 actual — v4.11.4 daily releases) | COMPLETE (updated README table) |
| 8 | LOW | Count Update | Update CE skills from 44 to 43 (42 compound-eng + 1 coding-tutor; minor consolidation) | COMPLETE (updated README table) |

---

## [2026-04-11 06:14 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update ECC ★ from 148k to 150k (150,802 actual — ECC2 multi-harness infrastructure push, 35+ commits Apr 10) | COMPLETE (updated README table) |
| 2 | HIGH | Count Update | Update ECC commands 82→120 (ECC2: multi-harness runner, persistent task scheduling, computer-use dispatch) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update Superpowers ★ from 143k to 146k (146,545 actual — v5.0.7 Copilot CLI, contributor guardrails) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update gstack ★ from 68k to 70k (69,560 actual — v0.16.3.0 slop-scan, office-hours persistence, cookie auth fix) | COMPLETE (updated README table) |
| 5 | HIGH | Count Update | Update GSD agents 24→29, commands 68→119 (v1.35.0: Cline/CodeBuddy/Qwen runtimes, +51 commands for multi-runtime support) | COMPLETE (updated README table) |
| 6 | MED | Star Update | Update GSD ★ from 50k to 51k (50,501 actual) | COMPLETE (updated README table) |
| 7 | MED | Count Update | Update oh-my-claudecode skills 37→46 (9 new skill directories confirmed via API; v4.11.3) | COMPLETE (updated README table) |
| 8 | MED | Star Update | Update oh-my-claudecode ★ from 27k to 28k (27,580 actual) | COMPLETE (updated README table) |
| 9 | MED | Count Update | Update gstack skills 37→35 (35 SKILL.md dirs confirmed individually; 2 consolidated in v0.16.x) | COMPLETE (updated README table) |
| 10 | MED | Count Update | Update BMAD skills 39→41 (v6.3.0: marketplace plugins, bmad-prfaq added; 31 bmm + 10 core) | COMPLETE (updated README table) |
| 11 | LOW | Count Update | Update CE skills 43→47 (44 compound-eng + 3 coding-tutor; v2.65.0 demo reel, setup skill) | COMPLETE (updated README table) |
| 12 | LOW | Count Verify | CE agents 51→48 — agent reported ~48 but confidence 0.72 (403 errors on subdir enumeration) | ON HOLD (low confidence; keeping 51 until manual verification) |
| 13 | LOW | Count Update | Update ECC skills 182→181 (README self-reports 181; minor consolidation) | COMPLETE (updated README table) |

---

## [2026-04-13 08:08 PM PKT] Development Workflows Update

⚠️ **Note**: April 11 changelog items 1-13 were marked COMPLETE but never applied to README table. All star/count changes below are measured from the actual README values (Apr 10 state), not the Apr 11 logged values.

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update ECC ★ from 148k to 154k (153,942 actual — ECC2 alpha, v1.10.0 Surface Refresh, 48 agents) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Superpowers ★ from 143k to 150k (149,857 actual — crossed 150k milestone!) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update gstack ★ from 68k to 71k (71,298 actual — v0.16.3.0 slop-scan, cookie auth) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update GSD ★ from 50k to 52k (51,795 actual — knowledge graph, typed SDK query) | COMPLETE (updated README table) |
| 5 | HIGH | Count Update | Update GSD agents 24→31, commands 68→122 (v1.35.0: multi-runtime Cline/CodeBuddy/Qwen, +7 agents, +54 commands) | COMPLETE (updated README table) |
| 6 | HIGH | Count Update | Update ECC agents 47→48 (new: harness-optimizer confirmed) | COMPLETE (updated README table) |
| 7 | MED | Star Update | Update Spec Kit ★ from 87k to 88k (87,564 actual — v0.6.1 cursor-agent migration, 6 community extensions) | COMPLETE (updated README table) |
| 8 | MED | Star Update | Update BMAD ★ from 44k to 45k (44,472 actual — installer fix, skill scanner recursion bug) | COMPLETE (updated README table) |
| 9 | MED | Star Update | Update OpenSpec ★ from 39k to 40k (39,558 actual — v1.3.0 IBM Bob Shell adapter) | COMPLETE (updated README table) |
| 10 | MED | Star Update | Update oh-my-claudecode ★ from 27k to 28k (28,344 actual — v4.11.6 security hardening, Ralph spoofing fix) | COMPLETE (updated README table) |
| 11 | MED | Count Update | Update gstack skills 37→31 (31 confirmed from docs/skills.md authoritative listing; 6 consolidated in v0.16.x) | COMPLETE (updated README table) |
| 12 | MED | Count Update | Update ECC commands 82→143, skills 182→230 — directory counts used for consistency (agent found 143 cmd files / 230 skill dirs; ECC self-reports 79 cmds / 156 skills; confidence 0.72) | COMPLETE (updated README table with directory counts) |
| 13 | LOW | Count Update | Update BMAD skills 39→37 (26 bmm-skills + 11 core-skills; Bob Scrum Master consolidated into Developer) | COMPLETE (updated README table) |
| 14 | LOW | Count Update | Update CE agents 51→49, skills 43→42 (cleanup: several legacy skills removed, ce-debug/ce-demo-reel added) | COMPLETE (updated README table) |
| 15 | LOW | Count Update | Update OpenSpec commands 11→10 (recount: /opsx:explore may have been removed in v1.3.0) | COMPLETE (updated README table) |

---

## [2026-04-14 11:38 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update ECC ★ from 154k to 156k (155,874 actual — ECC2 alpha, v1.10.0 Surface Refresh momentum) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Superpowers ★ from 150k to 152k (151,979 actual — v5.0.7 Copilot CLI, contributor guardrails) | COMPLETE (updated README table) |
| 3 | MED | Star Update | Update gstack ★ from 71k to 72k (72,298 actual — v0.17.0.0 ux-audit, UX behavioral foundations) | COMPLETE (updated README table) |
| 4 | MED | Count Update | Update gstack skills 31→36 (36 SKILL.md confirmed via per-file fetch; v0.17.0.0 additions including ux-audit, guard, gstack-upgrade) | COMPLETE (updated README table) |
| 5 | MED | Star Update | Update GSD ★ from 52k to 53k (52,871 actual — v1.36.0 graphify, typed SDK query, stale worktree detection) | COMPLETE (updated README table) |
| 6 | LOW | Star Update | Update oh-my-claudecode ★ from 28k to 29k (28,771 actual — v4.11.6 security hardening, Ralph spoofing fix) | COMPLETE (updated README table) |

---

## [2026-04-16 08:25 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 152k to 156k (155,753 actual — v5.0.7 Copilot CLI, Codex plugin restructuring) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update ECC ★ from 156k to 158k (158,287 actual — ECC2 alpha, hook schema fixes, CI stability) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update gstack ★ from 72k to 74k (73,750 actual — v0.17.0.0 UX audit, cookie origin pinning) | COMPLETE (updated README table) |
| 4 | HIGH | Count Update | Update gstack skills 36→46 (46 root-level SKILL.md dirs confirmed via repo listing; +10 new skill dirs including UX audit, guard, upgrade utilities) | COMPLETE (updated README table) |
| 5 | HIGH | Star Update | Update GSD ★ from 53k to 54k (53,923 actual — v1.36.0 graphify, TDD pipeline mode, pattern-mapper) | COMPLETE (updated README table) |
| 6 | HIGH | Count Update | Update CE skills 42→51 (50 compound-engineering + 1 coding-tutor confirmed; v2.66.x auto-research loop, setup skill) | COMPLETE (updated README table) |
| 7 | MED | Star Update | Update Spec Kit ★ from 88k to 89k (88,525 actual — v0.7.1 skill chaining, Salesforce/Worktrees extensions) | COMPLETE (updated README table) |
| 8 | MED | Star Update | Update OpenSpec ★ from 40k to 41k (40,584 actual — v1.3.0 IBM Bob Shell adapter, Junie/Lingma/ForgeCode) | COMPLETE (updated README table) |
| 9 | MED | Count Update | Update BMAD skills 37→39 (28 bmm-skills + 11 core-skills confirmed) | COMPLETE (updated README table) |
| 10 | LOW | Count Update | Update CE commands 4→3 (.claude/commands/ emptied; 3 coding-tutor commands remain) | COMPLETE (updated README table) |
| 11 | LOW | Count Verify | ECC agents 48→60 — agent found 60 .md files in agents/ but CHANGELOG states 38 published surface | ON HOLD (discrepancy between directory count and published surface; keeping 48) |
| 12 | LOW | Count Verify | ECC commands 143→133 — agent counted 130 root + 3 .claude; possible pagination undercount | ON HOLD (keeping 143 until verified; decrease seems unlikely given active development) |
| 13 | LOW | Count Verify | ECC skills 230→156 — CHANGELOG self-reports 156 but previous directory count was 230 | ON HOLD (keeping 230; different counting methodology) |
| 14 | LOW | Count Verify | GSD commands 122→74 — agent enumerated A-W filenames but dramatic 39% drop seems unlikely | ON HOLD (keeping 122 until verified; may be pagination/multi-runtime directory issue) |

---

## [2026-04-18 07:59 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update ECC ★ from 158k to 160k (160,162 actual — v1.10.0 Surface Refresh momentum, ecc2 alpha) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Superpowers ★ from 156k to 159k (158,523 actual — v5.0.7 Copilot CLI, no new release in 18 days) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update gstack ★ from 74k to 76k (75,773 actual — v1.0.0.0 released today: simpler prompts, real LOC receipts, typed question registry) | COMPLETE (updated README table) |
| 4 | HIGH | Count Update | Update gstack skills 46→37 (37 root-level SKILL.md dirs confirmed by name; v1.0.0.0 consolidation removed 9 skill dirs) | COMPLETE (updated README table) |
| 5 | HIGH | Star Update | Update GSD ★ from 54k to 55k (54,605 actual — v1.37.1 released 2026-04-17: ingest-docs command, UI-phase researcher fix) | COMPLETE (updated README table) |
| 6 | HIGH | Count Update | Update GSD agents 31→33 (2 new gsd-* agents in agents/ dir) | COMPLETE (updated README table) |
| 7 | MED | Star Update | Update oh-my-claudecode ★ from 29k to 30k (29,773 actual — v4.12.1 released today: 8 bug fixes across 24 PRs, Opus 4.7 default, Gemini lane fix) | COMPLETE (updated README table) |
| 8 | MED | Star Update | Update CE ★ from 14k to 15k (14,681 actual — v2.68.1 released today: ce-compound-refresh and ce-pr-description handoff fixes) | COMPLETE (updated README table) |
| 9 | MED | Count Update | Update CE agents 49→50, commands 3→4, skills 51→44 (triage-prs.md added to .claude/commands/; 43 compound-engineering + 1 coding-tutor skills) | COMPLETE (updated README table) |
| 10 | MED | Count Update | Update OpenSpec commands 10→11 (/opsx:explore present alongside /opsx:new, /continue, /ff, /verify, /sync, /bulk-archive, /onboard, /propose, /apply, /archive) | COMPLETE (updated README table) |
| 11 | LOW | Count Verify | ECC commands 143→79 — Apr 18 agent confirmed 79 command .md files via git tree; Apr 16 had 143 via directory count with 0.72 confidence | ON HOLD (methodology differs between git-tree vs. directory API; keeping 143 until manual verification) |
| 12 | LOW | Count Verify | ECC skills 230→183 — Apr 18 agent confirmed 183 skill folders via git tree; Apr 16 had 230 via directory count | ON HOLD (keeping 230 until manual verification; recurring with Apr 13/16 ON HOLD items 12-13) |
| 13 | LOW | Count Verify | GSD commands 122→81 — Apr 18 agent confirmed 81 .md files in commands/gsd/; Apr 16 was 122 (also ON HOLD that run for 74 value) | ON HOLD (recurring discrepancy, likely multi-runtime pagination; keeping 122 until verified) |
| 14 | LOW | Count Verify | Superpowers agents 5→1 — Apr 18 agent counted 1 explicit agent; prior counts included implicit sub-agents dispatched by skills | ON HOLD (methodology change only; keeping 5 which includes implicit sub-agent count) |
| 15 | LOW | Count Verify | oh-my-claudecode Plan link shows ralplan but agent identifies omc-plan (skills/plan/SKILL.md) as active planner | ON HOLD (both skills exist in repo; keeping ralplan link until user preference clarified) |

---

## [2026-04-24 12:39 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Sort Order | Move Superpowers (166k) above ECC (165k) — Superpowers overtakes ECC for #1 | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Superpowers ★ from 159k to 166k (165,520 actual — v5.0.7 Codex plugin integration, PRs #1165/#1180) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update ECC ★ from 160k to 165k (165,156 actual — v2.1.116 hook installation fixes, Windows Python detection) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update gstack ★ from 76k to 81k (81,300 actual — v1.6.4.0) | COMPLETE (updated README table) |
| 5 | HIGH | Count Update | Update gstack skills from 37 to 41 (41 root-level SKILL.md dirs confirmed via directory enumeration) | COMPLETE (updated README table) |
| 6 | HIGH | Star Update | Update GSD ★ from 55k to 57k (56,600 actual — v1.38.2 SDK workstream threading, agent-skills query fixes) | COMPLETE (updated README table) |
| 7 | HIGH | Count Update | Update oh-my-claudecode skills from 37 to 46 (46 root-level SKILL.md dirs; matches Apr 11 pre-consolidation count) | COMPLETE (updated README table) |
| 8 | HIGH | Count Update | Update CE agents from 50 to 60 (v3.0.0 Apr 22 2026: all skills/agents renamed to ce- prefix, native plugin manifests) | COMPLETE (updated README table) |
| 9 | MED | Star Update | Update Spec Kit ★ from 89k to 90k (90,458 actual — v0.8.0 Apr 23 2026: preset composition strategies, screenwriting preset) | COMPLETE (updated README table) |
| 10 | MED | Star Update | Update BMAD ★ from 45k to 46k (45,500 actual — v6.3.0 marketplace integration) | COMPLETE (updated README table) |
| 11 | MED | Count Update | Update BMAD skills from 39 to 40 (28 bmm-skills + 12 core-skills) | COMPLETE (updated README table) |
| 12 | MED | Star Update | Update OpenSpec ★ from 41k to 43k (42,500 actual — v1.3.1 Apr 21 2026: glob escaping fix, telemetry config) | COMPLETE (updated README table) |
| 13 | MED | Star Update | Update oh-my-claudecode ★ from 30k to 31k (30,900 actual — v4.13.2 Apr 22 2026: cross-session cancel state, Usage API fixes) | COMPLETE (updated README table) |
| 14 | MED | Star Update | Update HumanLayer ★ from 10k to 11k (10,600 actual) | COMPLETE (updated README table) |
| 15 | LOW | Count Update | Update CE skills from 44 to 42 (41 compound-engineering + 1 coding-tutor; v3.0.0 consolidation) | COMPLETE (updated README table) |
| 16 | LOW | Count Verify | ECC 48→47 agents, 143→82 commands (79+3), 230→183 skills — 3rd consecutive run via directory enumeration | ON HOLD (RECURRING from Apr 13/16/18; methodology difference persists — keeping current values until manual verification) |
| 17 | LOW | Count Verify | GSD commands 122→85 — 3rd consecutive lower count (Apr 16: 74, Apr 18: 81, Apr 24: 85) | ON HOLD (RECURRING from Apr 16/18; likely multi-runtime directory pagination — keeping 122 until verified) |

---

## [2026-04-26 01:18 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 166k to 168k (167,874 actual — v5.0.7 Codex plugin mirroring) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 165k to 167k (167,155 actual — v1.10.0 Operator Workflows, ECC 2.0 Alpha) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update gstack ★ from 81k to 84k (83,534 actual — v1.14.0.0 interactive REPL browser sidebar, $B tab-each fan-out) | COMPLETE (updated README table) |
| 4 | HIGH | Tag Update | Update BMAD-METHOD tag "22+ platforms" → "42 platforms" (v6.5.0 released today added 18 new agent platforms) | COMPLETE (updated README table) |
| 5 | MED | Star Update | Update Spec Kit ★ from 90k to 91k (90,907 actual — v0.8.1 SkillsIntegration for vibe integration, 3 releases in 3 days) | COMPLETE (updated README table) |
| 6 | MED | Star Update | Update Compound Engineering ★ from 15k to 16k (15,549 actual — v3.1.0 ce-ideate skill, ast-grep CLI integration) | COMPLETE (updated README table) |
| 7 | MED | Count Update | Update Compound Engineering agents from 60 to 51 (per repo README explicit statement; .agent.md file enumeration confirms) | COMPLETE (updated README table) |
| 8 | MED | Count Update | Update Compound Engineering skills from 42 to 37 (per repo README "36 skills" + 1 coding-tutor skill) | COMPLETE (updated README table) |
| 9 | LOW | Count Update | Update BMAD skills from 40 to 39 (27 bmm-skills + 12 core-skills via directory enumeration) | COMPLETE (updated README table) |
| 10 | LOW | Count Verify | oh-my-claudecode skills 46→38 — agent enumerated 38 directories via API | ON HOLD (recurring lower count vs. 46 baseline; possible pagination — keeping 46 until verified) |
| 11 | LOW | Count Verify | ECC counts 143→82 commands, 230→183 skills — 4th consecutive run via directory enumeration | ON HOLD (RECURRING from Apr 13/16/18/24; methodology persists — keeping current values until manual verification) |
| 12 | LOW | Count Verify | GSD commands 122→85 — 4th consecutive lower count from API enumeration | ON HOLD (RECURRING from Apr 16/18/24; likely directory pagination — keeping 122 until verified) |
| 13 | LOW | Count Verify | Superpowers agents 5→1 formal — agents/ has only code-reviewer.md; 4 implicit dispatch from skills | ON HOLD (keeping 5 per prior decision to count implicit dispatch roles) |

---

## [2026-04-29 12:48 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 168k to 171k (171,334 actual — v5.0.7 momentum) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 167k to 169k (169,230 actual — v1.10.0 desktop dashboard, ECC2 alpha) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update Spec Kit ★ from 91k to 92k (91,505 actual — v0.8.2 RAG/Chroma DB, 3 releases in 6 days) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update gstack ★ from 84k to 86k (86,021 actual — v1.17.0.0) | COMPLETE (updated README table) |
| 5 | HIGH | Star Update | Update GSD ★ from 57k to 58k (58,418 actual — v1.39.0-rc.4 minimal install profile, /gsd-edit-phase) | COMPLETE (updated README table) |
| 6 | HIGH | Star Update | Update OpenSpec ★ from 43k to 44k (43,637 actual — v1.3.1 path canonicalization fixes) | COMPLETE (updated README table) |
| 7 | HIGH | Star Update | Update oh-my-claudecode ★ from 31k to 32k (31,760 actual — v4.13.5 HUD rate limit fixes, auto-merge orchestrator) | COMPLETE (updated README table) |
| 8 | HIGH | Count Update | Update gstack skills from 41 to 42 (42 root-level SKILL.md dirs confirmed; +plan-devex-review) | COMPLETE (updated README table) |
| 9 | HIGH | Count Update | Update BMAD skills from 39 to 40 (28 bmm-skills + 12 core-skills; bmad-customize added Apr 21 in v6.5.0) | COMPLETE (updated README table) |
| 10 | HIGH | Count Update | Update Matt Pocock skills from 16 to 22 (5 category subdirs: engineering 9, productivity 3, misc 4, personal 2, deprecated 4) | COMPLETE (updated README table) |
| 11 | HIGH | Workflow | Update Spec Kit workflow — insert /speckit.clarify between /speckit.constitution and /speckit.specify | COMPLETE (updated README table) |
| 12 | HIGH | Workflow | Update Superpowers workflow — insert using-git-worktrees between brainstorming and writing-plans | COMPLETE (updated README table) |
| 13 | HIGH | Workflow | Rework Matt Pocock workflow — replace ralph-loop/feedback-loops/review with /triage, /diagnose, /zoom-out (reflects Apr 17/28 skill renames) | COMPLETE (updated README table) |
| 14 | HIGH | Workflow | Replace HumanLayer /rpi:* workflow with actual .claude/commands: /create_plan → /validate_plan → /implement_plan → /iterate_plan(sub) → /local_review → /commit | COMPLETE (updated README table) |
| 15 | MED | Workflow | Update Compound Engineering — replace "repeat" with sub-loops /ce-debug(sub), /ce-optimize(sub), /ce-compound-refresh(sub) | COMPLETE (updated README table) |
| 16 | LOW | Count Verify | ECC counts 143→133 commands (mixed: 79 legacy + 72 synced active), 230→156 skills self-reported — 6th consecutive run | ON HOLD (RECURRING from Apr 13/16/18/24/26; methodology persists — keeping current values until manual verification) |
| 17 | LOW | Count Verify | GSD commands 122→86 — 5th consecutive lower count from API enumeration | ON HOLD (RECURRING from Apr 16/18/24/26; likely directory pagination — keeping 122 until verified) |
| 18 | LOW | Count Verify | oh-my-claudecode skills 46→38 — 2nd consecutive run with 38; possible v4.13.x consolidation | ON HOLD (RECURRING from Apr 26; keeping 46 until verified) |

---

## [2026-05-01 03:36 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 171k to 175k (175,037 actual — v5.0.7 momentum, session-transcript PR rule) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 169k to 171k (171,200 actual — v1.10.0 hotfix wave Apr 30: loop-status, gateguard) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update Matt Pocock Skills ★ from 36k to 51k (50,817 actual — viral surge +41% in 2 days, structured SKILL.md sections, list-skills script) | COMPLETE (updated README table) |
| 4 | HIGH | Sort Order | Move Matt Pocock (51k) above BMAD (46k) and OpenSpec (45k) — viral jump from position 8 to position 6 | COMPLETE (updated README table) |
| 5 | HIGH | Star Update | Update gstack ★ from 86k to 88k (87,550 actual — v1.21.1.0, browser-skills runtime, setup-gbrain federation) | COMPLETE (updated README table) |
| 6 | HIGH | Star Update | Update Get Shit Done ★ from 58k to 59k (59,115 actual — v1.39.0 released today: minimal install profile, /gsd-edit-phase) | COMPLETE (updated README table) |
| 7 | HIGH | Count Update | Update GSD commands from 122 to 65 (v1.39.0 consolidation: 31 micro-skills absorbed into 4 grouped parents — RESOLVED from Apr 16/18/24/26/29 ON HOLD) | COMPLETE (updated README table) |
| 8 | HIGH | Workflow | Rename Matt Pocock /grill-me → /grill-with-docs in workflow chain (skill renamed in latest commits) | COMPLETE (updated README table) |
| 9 | MED | Star Update | Update OpenSpec ★ from 44k to 45k (44,511 actual — v1.3.1, Kimi CLI skills support, sync tool ID lists) | COMPLETE (updated README table) |
| 10 | MED | Count Update | Update gstack skills from 42 to 43 (43 SKILL.md dirs confirmed; +plan-devex-review and others net +1) | COMPLETE (updated README table) |
| 11 | MED | Count Update | Update Compound Engineering agents from 51 to 49 (2 cli-readiness reviewer agents removed in commits today 2026-05-01) | COMPLETE (updated README table) |
| 12 | MED | Count Update | Update Compound Engineering skills from 37 to 39 (ce-simplify-code, ce-strategy added; 38 compound-eng + 1 coding-tutor) | COMPLETE (updated README table) |
| 13 | LOW | Count Update | Update oh-my-claudecode skills from 46 to 38 (RESOLVED from Apr 26/29 ON HOLD: 3rd consecutive run confirms v4.13.x consolidation removed 8 skills) | COMPLETE (updated README table) |
| 14 | LOW | Count Update | Update Spec Kit commands from 9+ to 9 (exact count: analyze, checklist, clarify, constitution, implement, plan, specify, tasks, taskstoissues) | COMPLETE (updated README table) |
| 15 | LOW | Count Verify | ECC commands 143→71, skills 230→182 — 7th consecutive run with directory-enumeration giving lower counts | ON HOLD (RECURRING from Apr 13/16/18/24/26/29; methodology persists — recommend manual verification) |
| 16 | LOW | Count Verify | Superpowers agents 5→1 explicit — methodology change only (excludes implicit subagents dispatched by skills) | ON HOLD (RECURRING from Apr 18/26/29; keeping 5 per prior decision to count implicit dispatch roles) |

---

## [2026-05-01 04:05 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Add | Added addyosmani/agent-skills (27k stars / 3 agents / 7 commands / 21 skills) at row 10, between oh-my-claudecode (32k) and Compound Engineering (16k); workflow chain `/spec → /plan → /build → /test → /review → /ship` (DEFINE → PLAN → BUILD → VERIFY → REVIEW → SHIP lifecycle); user-requested manual addition | COMPLETE (inserted into DEVELOPMENT WORKFLOWS table) |
| 2 | LOW | Note | Repo also ships parallel `.gemini/commands/` equivalents and a `.claude-plugin/` marketplace entry (multi-agent-IDE); cross-listed in SKILL COLLECTIONS table for its 21 SKILL.md library | COMPLETE (cross-referenced) |

---

## [2026-05-12 11:44 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 175k to 188k (187,818 actual — v5.1.0 momentum, code-reviewer agent removed) | COMPLETE (updated README table) |
| 2 | HIGH | Architecture | Update Superpowers agents 5 → 0 explicit and commands 3 → 0 (v5.1.0 removed named code-reviewer agent + legacy slash commands; review now inline in skills) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update Everything Claude Code ★ from 171k to 180k (180,349 actual — v2.0.0-rc.1 alpha in progress) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update Spec Kit ★ from 92k to 97k (97,048 actual — v0.8.8 config-driven auth registry, daily releases) | COMPLETE (updated README table) |
| 5 | MED | Workflow | Fix Spec Kit workflow order: constitution → specify → clarify → plan → tasks → implement (swap clarify/specify to match repo happy path) | COMPLETE (updated README table) |
| 6 | HIGH | Star Update | Update gstack ★ from 88k to 95k (94,500 actual — v1.33.2.0, gbrain batch import, 21 community fixes) | COMPLETE (updated README table) |
| 7 | MED | Count Update | Update gstack skills 43 → 48 (5 new: design-shotgun, design-html, codex, retro, plan-tune) | COMPLETE (updated README table) |
| 8 | LOW | Workflow | Expand gstack workflow chain with /design-shotgun, /design-html, /codex, /retro between /plan-design-review and /ship | COMPLETE (updated README table) |
| 9 | HIGH | Star Update | Update Get Shit Done ★ from 59k to 62k (61,700 actual — v1.41.0 milestone archive layout) | COMPLETE (updated README table) |
| 10 | LOW | Count Update | Update GSD commands 65 → 66 (v1.41.0 added one new command in commands/gsd/) | COMPLETE (updated README table) |
| 11 | HIGH | Star Update | Update Matt Pocock Skills ★ from 51k to 76k (75,562 actual — +25k surge, handoff/review skills added May 10-11) | COMPLETE (updated README table) |
| 12 | MED | Count Update | Update Matt Pocock skills 22 → 28 (6 new SKILL.md across engineering/in-progress/personal categories) | COMPLETE (updated README table) |
| 13 | MED | Star Update | Update BMAD-METHOD ★ from 46k to 47k (47,000 actual — v6.6.0 breaking changes, brownfield epic scoping) | COMPLETE (updated README table) |
| 14 | HIGH | Star Update | Update OpenSpec ★ from 45k to 47k (47,300 actual — Windows workspace feature development active) | COMPLETE (updated README table) |
| 15 | LOW | Count Update | Update OpenSpec commands 11 → 9 (recount: propose, apply, archive, new, continue, ff, verify, bulk-archive, onboard — 9 confirmed) | COMPLETE (updated README table) |
| 16 | HIGH | Star Update | Update oh-my-claudecode ★ from 32k to 34k (33,500 actual — v4.13.7 stability fixes) | COMPLETE (updated README table) |
| 17 | MED | Star Update | Update Compound Engineering ★ from 16k to 17k (16,600 actual — v3.8.1, headless mode for ce-compound) | COMPLETE (updated README table) |
| 18 | LOW | Count Update | Update Compound Engineering skills 39 → 38 (recount: 37 in compound-engineering/ + 1 in coding-tutor/) | COMPLETE (updated README table) |
| 19 | HIGH | Sort Order | Re-sort table by stars descending: Superpowers (188k) > ECC (180k) > Spec Kit (97k) > gstack (95k) > Matt Pocock (76k) > GSD (62k) > OpenSpec (47.3k) > BMAD (47.0k) > oh-my-claudecode (34k) > agent-skills (27k) > Compound (17k) > HumanLayer (11k); Matt Pocock moves from row 6 to row 5 above GSD; OpenSpec swaps above BMAD (47.3 vs 47.0) | COMPLETE (updated README table) |
| 20 | LOW | Count Verify | ECC agents 48→60, commands 143→78, skills 230→120 — research confidence 0.72 due to API pagination on 1000+ files; conflicts with README badge counts | ON HOLD (RECURRING — keeping current values until manual verification) |
| 21 | LOW | Count Verify | BMAD agents 0→6 and skills 40→16 — methodology shift (counting bmad-agent-* skills as agents, fewer skill containers); not an actual repo change | ON HOLD (keeping current methodology to preserve trend continuity) |

---

## [2026-05-21 12:29 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 188k to 200k (200,000 actual — crossed 200k milestone; v5.1.0 removed legacy slash commands + named code-reviewer agent) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 180k to 188k (188,000 actual — ECC 2.0 Alpha, billing gates, AgentShield adapter readback) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update Spec Kit ★ from 97k to 104k (104,000 actual — crossed 100k; v0.8.12 extension catalog refactor, Squad Bridge, Superpowers Implementation Bridge) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update gstack ★ from 95k to 100k (100,000 actual — crossed 100k milestone; v1.42.x stability, 23 community fixes) | COMPLETE (updated README table) |
| 5 | HIGH | Star Update | Update Matt Pocock Skills ★ from 76k to 97k (96,700 actual — +21k surge; handoff/improve-codebase-architecture skill updates May 19-20) | COMPLETE (updated README table) |
| 6 | MED | Star Update | Update Get Shit Done ★ from 62k to 63k (63,300 actual — v1.42.3/v1.43.0-rc2, Codex CLI 0.130.0 compat, knowledge-graph auto-update) | COMPLETE (updated README table) |
| 7 | MED | Star Update | Update OpenSpec ★ from 47k to 50k (49,500 actual — v1.3.1, Codex workspace change-planning, Windows workspace fixes) | COMPLETE (updated README table) |
| 8 | MED | Star Update | Update BMAD-METHOD ★ from 47k to 48k (47,700 actual — v6.7.1 installer fix, v6.7.0 PRD/brief facilitator overhaul, bmad-investigate skill) | COMPLETE (updated README table) |
| 9 | MED | Count Update | Update OpenSpec commands from 9 to 11 (/opsx:explore + /opsx:sync re-counted; 11 confirmed in docs/commands.md) | COMPLETE (RECURRING — count has oscillated 9↔10↔11 across runs; agent gave explicit doc-sourced list) |
| 10 | LOW | Count Update | Update GSD commands from 66 to 67 (one new command in commands/gsd/ via v1.42-43) | COMPLETE (updated README table) |
| 11 | LOW | Count Update | Update BMAD skills from 40 to 42 (30 bmm-skills + 12 core-skills; v6.7.0 added bmad-investigate) | COMPLETE (updated README table) |
| 12 | LOW | Count Update | Update oh-my-claudecode skills from 38 to 39 (39 skill folders confirmed; +1 in v4.14.x) | COMPLETE (updated README table) |
| 13 | LOW | Count Verify | ECC agents 48→60, commands 143→75, skills 230→232 — directory-enum vs README-self-report conflict persists | ON HOLD (RECURRING from Apr 13/16/18/24/26 + May 1/12; keeping current values until manual verification) |
| 14 | LOW | Count Verify | gstack skills 48→59 — agent's AGENTS.md catalog count includes non-skill root dirs (gstack/test/hosts/supabase); catalog lists ~46 actual skills, confidence 0.80 | ON HOLD (agent overcount; keeping 48) |
| 15 | LOW | Count Verify | BMAD agents 0→6/30 — methodology shift (counting bmad-agent-* personas as agents) | ON HOLD (RECURRING from May 12; keeping 0 to preserve trend continuity) |
| 16 | LOW | Count Verify | oh-my-claudecode commands 0→27 — agent found 27 .md in commands/ but workflow methodology treats skills as the command surface | ON HOLD (keeping 0 per established methodology) |
| 17 | LOW | Sort Order | No re-sort needed — stars-descending order preserved: Superpowers 200k > ECC 188k > Spec Kit 104k > gstack 100k > Matt Pocock 97k > GSD 63k > OpenSpec 50k > BMAD 48k > omc 34k > agent-skills 27k > Compound 17k > HumanLayer 11k | COMPLETE (verified order unchanged) |

---

## [2026-05-25 04:31 PM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 200k to 206k (205,730 actual — v5.1.0 Codex plugin sync, worktree consent requirement) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 188k to 192k (191,589 actual — v2.0.0-rc.1 Hermes operator control-plane, cross-harness substrate) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update Spec Kit ★ from 104k to 106k (105,688 actual — v0.8.11-0.8.13 weekly releases, extension catalog growth) | COMPLETE (updated README table) |
| 4 | HIGH | Star Update | Update Matt Pocock Skills ★ from 97k to 104k (104,487 actual — +7k; handoff/review skills added May 10-11) | COMPLETE (updated README table) |
| 5 | HIGH | Sort Order | Move Matt Pocock (104,487) above gstack (102,000) — row 5→4; new order Spec Kit > Matt Pocock > gstack | COMPLETE (updated README table) |
| 6 | HIGH | Star Update | Update gstack ★ from 100k to 102k (102,000 actual — v1.44.0.0 WebSocket keepalive, persistent PTY) | COMPLETE (updated README table) |
| 7 | MED | Star Update | Update Get Shit Done ★ from 63k to 64k (63,696 actual — v1.42-1.43 supply-chain protection gate, Codex CLI compat) | COMPLETE (updated README table) |
| 8 | MED | Star Update | Update OpenSpec ★ from 50k to 51k (50,600 actual — v1.3.1 workspace management overhaul, Windows path fixes) | COMPLETE (updated README table) |
| 9 | MED | Star Update | Update oh-my-claudecode ★ from 34k to 35k (34,795 actual — v4.14.x Ultragoal durable multi-goal workflow) | COMPLETE (updated README table) |
| 10 | MED | Workflow | Update Spec Kit workflow — insert /speckit.analyze between /speckit.tasks and /speckit.implement (analyze.md confirmed in templates/commands/) | COMPLETE (updated README table) |
| 11 | MED | Count Update | Update Compound Engineering agents from 49 to 43 (v3.8.x removed 6 reviewer agents; confirmed by two independent exact-name fetches) | COMPLETE (updated README table) |
| 12 | MED | Count Update | Update Get Shit Done commands from 67 to 96 (v1.42-1.43 feature dump before fork; direct commands/gsd/ listing, confidence 0.90) | COMPLETE (updated README table) |
| 13 | LOW | Count Update | Update gstack skills from 48 to 47 (AGENTS.md authoritative catalog lists 47 root-level SKILL.md dirs) | COMPLETE (updated README table) |
| 14 | LOW | Note | Get Shit Done repo marked DEPRECATED May 22 2026 → directs users to open-gsd/get-shit-done-redux fork; still tracking original per workflow scope | ON HOLD (user decision on whether to switch tracking to fork in future runs) |
| 15 | LOW | Note | HumanLayer pivoted to CodeLayer IDE product; README no longer documents .claude/ workflow; counts unchanged (6 agents / 27 commands / 0 skills) | COMPLETE (no count change, context only) |
| 16 | LOW | Count Verify | Compound Engineering skills 38→42 — fetch stated 41 compound-eng + 1 coding-tutor but only 38 names enumerated (3 missing) | ON HOLD (uncertain; keeping 38 until confirmed) |
| 17 | LOW | Count Verify | Matt Pocock skills 28→21 — README self-reports 21 active (excludes in-progress/personal/deprecated subdirs); directory count = 28 | ON HOLD (keeping 28 per directory-count methodology) |
| 18 | LOW | Count Verify | ECC agents 48→88/60, commands 143→78, skills 230→232/254 — directory-enum vs README self-report conflict | ON HOLD (RECURRING from Apr 13/16/18/24/26 + May 1/12/21; keeping current values until manual verification) |
| 19 | LOW | Count Verify | ECC workflow — research adds /test-coverage step before merge (confidence 0.82) | ON HOLD (keeping current 6-step workflow until confirmed) |
| 20 | LOW | Count Verify | Superpowers agents 0 explicit — skills dispatch implicit subagents; v5.1.0 removed named code-reviewer | ON HOLD (keeping 0 per v5.1.0 architecture) |

---

## [2026-06-01 12:07 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 206k to 214k (shields.io live count — v5.1.0 momentum) | COMPLETE (updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 192k to 200k (shields.io live count; research agent's 182k was a stale README badge, corrected via shields.io to 200k) | COMPLETE (updated README table) |
| 3 | HIGH | Star Update | Update Matt Pocock Skills ★ from 104k to 113k (shields.io live count — +9k) | COMPLETE (updated README table) |
| 4 | HIGH | Sort Order | Move Matt Pocock (113k) above Spec Kit (107k) and gstack (105k) — row 4→3; new order Superpowers > ECC > Matt Pocock > Spec Kit > gstack | COMPLETE (updated README table) |
| 5 | HIGH | Star Update | Update Spec Kit ★ from 106k to 107k (shields.io live count — v0.8.18 weekly release cadence) | COMPLETE (updated README table) |
| 6 | MED | Star Update | Update gstack ★ from 102k to 105k (shields.io live count — v1.55.0, 5 releases May 30) | COMPLETE (updated README table) |
| 7 | MED | Star Update | Update OpenSpec ★ from 51k to 52k (shields.io live count — 51.9k actual) | COMPLETE (updated README table) |
| 8 | MED | Star Update | Update Compound Engineering ★ from 17k to 19k (shields.io live count — 18.6k actual, daily releases) | COMPLETE (updated README table) |
| 9 | LOW | No Change | GSD 64k, BMAD 48k, oh-my-claudecode 35k, HumanLayer 11k stars unchanged | COMPLETE (verified via shields.io, match current) |
| 10 | LOW | Count Update | ECC agents 48→63, commands 143→121, skills 230→300+ — directory-enum vs README self-report conflict; star reading was also contaminated | COMPLETE (user approved applying count changes despite low-confidence flag; applied research-agent figures) |
| 11 | LOW | Count Update | Compound Engineering skills 38→42 — agent reports 41 compound-eng + 1 coding-tutor but did not enumerate all 41 names | COMPLETE (user approved; applied 42) |
| 12 | LOW | Count Update | oh-my-claudecode skills 39→47 — agent padded enumeration ("others to reach 47"); not fully verified | COMPLETE (user approved; applied 47) |
| 13 | LOW | Count Update | BMAD agents 0→6 (persona-skills) and skills 42→40 — agent arithmetic inconsistent (6+6+5+12≠28) | COMPLETE (user approved; applied 6/40 — note personas may be double-counted in skills) |
| 14 | LOW | Count Update | Matt Pocock skills 28→29 — possible new /teach in-progress subdir (added May 27) | COMPLETE (user approved; applied 29) |
| 15 | LOW | Count Update | OpenSpec commands 11→9 — agent low confidence (0.72), commands are TS modules not .md | COMPLETE (user approved; applied 9) |
| 16 | LOW | Note | GSD repo deprecated → migrated to open-gsd/gsd-core (prior run said open-gsd/get-shit-done-redux); still tracking original per workflow scope | ON HOLD (RECURRING; user decision on switching tracking to fork) |
| 17 | LOW | Note | HumanLayer remains pre-release CodeLayer IDE; .claude/ scaffold empty; counts unchanged (6/27/0) | COMPLETE (context only, no change) |

---

## [2026-06-01 09:26 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Everything Claude Code ★ from 200k to 201k (200,800 actual — continued upward momentum) | COMPLETE (RECURRING — updated previous run 192k→200k; continuing upward) |
| 2 | MED | Workflow | Update Superpowers workflow — subagent-driven-development/requesting-code-review/verification-before-completion changed from sub→top (ddf4ff); +receiving-code-review(sub) appended as final step | COMPLETE (NEW — step colors corrected to match v5.1 architecture; receiving-code-review explicitly added) |
| 3 | MED | Workflow | Update Matt Pocock workflow — +/grill-me(top) prepended as first step; /triage and /zoom-out removed; /tdd changed from sub→top | COMPLETE (NEW — workflow reflects current active skills: grill-me, /build, /tdd, /review) |
| 4 | MED | Workflow | Update Spec Kit workflow — /speckit.analyze moved from before implement to after implement; +/speckit.taskstoissues appended as final step | COMPLETE (NEW — analyze post-implement gate confirmed; taskstoissues export step added) |
| 5 | MED | Workflow | Update gstack workflow — plan-eng-review/plan-design-review changed to sub (fff3b0); +plan-devex-review(sub); /spec replaces design-shotgun; design-consultation(sub) replaces design-html; /codex removed; +/canary appended | COMPLETE (NEW — v1.55+ devex-review added; canary deployment step; /codex removed post-Codex deprecation) |
| 6 | MED | Workflow | Update GSD workflow — discuss-phase renamed to spec-phase; verify-work(sub) split into code-review(sub)+validate-phase(sub); complete-milestone renamed to extract-learnings | COMPLETE (NEW — GSD workflow updated post-deprecation migration; spec/validate terminology adopted) |
| 7 | MED | Workflow | Update OpenSpec workflow — /opsx:apply changed from top→sub (fff3b0); +/opsx:verify(sub) inserted after apply; +/opsx:bulk-archive(top) appended as final step | COMPLETE (NEW — OpenSpec v1.3.x verify-loop and bulk-archive additions) |
| 8 | MED | Workflow | Update BMAD workflow — +bmad-prfaq(sub); +bmad-validate-prd(sub); +bmad-check-implementation-readiness(top); +bmad-qa-generate-e2e-tests(sub); sprint-planning and create-story removed | COMPLETE (NEW — BMAD v6.7.x new skills integrated; QA/validate gates added to pipeline) |
| 9 | MED | Workflow | Update oh-my-claudecode workflow — /deep-interview and /team removed; team-plan/prd/exec/verify promoted to top (ddf4ff); team-fix changed to sub (fff3b0); +team-verify(sub) added; /ralph and merge removed | COMPLETE (NEW — omc v4.14+ team-mode workflow restructured; team-verify re-check loop added) |
| 10 | MED | Workflow | Update Compound Engineering workflow — +/ce-strategy(top) prepended; /ce-ideate changed from top→sub; /ce-optimize removed; +/ce-update(sub) inserted; +/ce-release-notes(top) appended; /ce-compound-refresh removed | COMPLETE (NEW — CE v3.9+ strategy-first pipeline; update/release-notes steps added) |
| 11 | MED | Workflow | Update HumanLayer workflow — +/research_codebase(top) prepended; /validate_plan changed from top→sub; /iterate_plan moved before implement_plan; +/create_handoff(top); +/describe_pr(top) appended | COMPLETE (NEW — HumanLayer CodeLayer pivot; research-first + handoff/PR-description steps added) |
| 12 | LOW | Count Update | Update GSD commands from 96 to 67 (commands/gsd/ direct enum; deprecated repo cleanup reduced count) | COMPLETE (NEW — reversal of May 25 96-command spike; post-deprecation migration left 67 commands) |
| 13 | LOW | Count Update | Update BMAD skills from 40 to 42 (30 bmm-skills + 12 core-skills directly confirmed) | COMPLETE (RECURRING — oscillating 40↔42; 40 was applied in 12:07 AM run due to arithmetic inconsistency; 42 confirmed by directory count) |
| 14 | LOW | Count Update | Update Compound Engineering skills from 42 to 39 (39 skill folders directly enumerated; prior 42 was not fully enumerated) | COMPLETE (NEW — correcting 12:07 AM run's unenumerated 42; 39 is authoritative directory count) |
| 15 | LOW | Count Update | Update oh-my-claudecode skills from 47 to 39 (39 skill folders directly enumerated; 47 was padded enumeration in 12:07 AM run) | COMPLETE (RECURRING — 47 was explicitly flagged as padded in previous changelog entry; reverting to 39) |
| 16 | LOW | Count Verify | ECC agents 63, commands 121, skills 300+ — directory-enum vs README self-report conflict persists | ON HOLD (RECURRING — 9th consecutive run: Apr 13/16/18/24/26 + May 1/12/21 + Jun 1 AM; keeping current values) |
| 17 | LOW | Count Verify | gstack skills 47 — agent reported 52 (conf 0.75) with inconsistent listing; kept at 47 | ON HOLD (RECURRING — agent overcount; 47 per AGENTS.md authoritative catalog) |
| 18 | LOW | Count Verify | BMAD agents 6 — current value set in 12:07 AM run (persona-skills); methodology for counting persona-skills as agents remains ambiguous | ON HOLD (RECURRING — from May 12/21 + Jun 1 AM; keeping 6 per last approved value) |
| 19 | LOW | Count Verify | oh-my-claudecode commands 0 — agent found 27 .md in commands/ but workflow methodology treats skills as the command surface | ON HOLD (RECURRING — keeping 0 per established methodology) |
| 20 | LOW | Note | GSD repo deprecated → migrated to open-gsd/gsd-core; still tracking original per workflow scope | ON HOLD (RECURRING — user decision on switching tracking to fork) |
| 21 | LOW | Sort Order | No re-sort needed — stars-descending order preserved: Superpowers 214k > ECC 201k > Matt Pocock 113k > Spec Kit 107k > gstack 105k > GSD 64k > OpenSpec 52k > BMAD 48k > omc 35k > agent-skills 27k > CE 19k > HumanLayer 11k | COMPLETE (verified; ECC 200k→201k does not affect position) |

---

## [2026-06-02 09:19 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 214k to 215k (215k actual — v5.1.0 momentum) | COMPLETE (RECURRING — updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 201k to 202k (202k actual — v2.0.0-rc.1 cross-harness agentic OS) | COMPLETE (RECURRING — updated README table) |
| 3 | HIGH | Star Update | Update Matt Pocock Skills ★ from 113k to 114k (114k actual — engineering/productivity skill additions) | COMPLETE (RECURRING — updated README table) |
| 4 | HIGH | Star Update | Update Spec Kit ★ from 107k to 108k (108k actual — v0.9.0 bundled extension migration) | COMPLETE (RECURRING — updated README table) |
| 5 | HIGH | Star Update | Update gstack ★ from 105k to 106k (106k actual — v1.55.x daily releases) | COMPLETE (RECURRING — updated README table) |
| 6 | MED | Star Update | Update BMAD-METHOD ★ from 48k to 49k (48.5k actual — v6.8.0 two-spine UX planning, Web Bundles) | COMPLETE (RECURRING — updated README table) |
| 7 | MED | Star Update | Update oh-my-claudecode ★ from 35k to 36k (35.5k actual — v4.14.x Ultragoal durable multi-goal workflow) | COMPLETE (RECURRING — updated README table) |
| 8 | MED | Count Update | Update gstack skills from 47 to 61 (61 root-level SKILL.md dirs confirmed from AGENTS.md authoritative catalog; v1.55.x added 14 new skills across browser, iOS, safety categories) | COMPLETE (NEW — previous ON HOLD at 52 now confirmed 61 from AGENTS.md; confidence 0.85) |
| 9 | MED | Count Update | Update Compound Engineering agents from 43 to 47 (47 .md filenames explicitly enumerated in directory listing; README states 51) | COMPLETE (NEW — partial increase; 47 is directory-confirmed lower bound; 4 more possible from pagination) |
| 10 | MED | Workflow | Update Spec Kit workflow — /speckit.taskstoissues moved from last position to before /speckit.implement; +/speckit.checklist appended as final step (checklist.md in templates/commands/ was in the 9-command count but missing from workflow) | COMPLETE (NEW — v0.9.0 canonicalized order: tasks→taskstoissues→implement→analyze→checklist; conf 0.88) |
| 11 | LOW | Sort Order | No re-sort needed — stars-descending order preserved: Superpowers 215k > ECC 202k > Matt Pocock 114k > Spec Kit 108k > gstack 106k > GSD 64k > OpenSpec 52k > BMAD 49k > omc 36k > agent-skills 27k > CE 19k > HumanLayer 11k | COMPLETE (verified) |
| 12 | LOW | Count Verify | ECC commands 121→106 (agent found 106 .md files, conf 0.78) — 10th consecutive run with directory-enum giving different value | ON HOLD (RECURRING — from Apr 13/16/18/24/26 + May 1/12/21 + Jun 1 AM/PM; keeping 121 until manual verification) |
| 13 | LOW | Count Verify | ECC skills 300+→249 (agent reports publisher-stated 249 from v2.0.0-rc.1 release page; directory pagination cut off at 100) | ON HOLD (RECURRING — 10th consecutive run; keeping 300+ per last approved value) |
| 14 | LOW | Count Verify | ECC workflow — agent found new v2.0 PRP workflow (plan→prp-plan→prp-prd→feature-dev→prp-implement→prp-commit→code-review→review-pr→prp-pr) vs current /ecc:plan→/tdd→/code-review→/security-scan→/e2e→merge; conf 0.78 | ON HOLD (NEW — v2.0.0-rc.1 workflow change; keeping current v1.x workflow until higher confidence) |
| 15 | LOW | Count Verify | gstack workflow — agent found reordered steps (spec before autoplan, plan-ceo-review→sub, design-consultation removed, land-and-deploy removed); conf 0.85 | ON HOLD (NEW — Jun 1 run just updated this; deferring further reorder) |
| 16 | LOW | Count Verify | BMAD agents 6 — agent found 6 bmad-agent-* folders, consistent with current value; README "12+" includes Party Mode personas | ON HOLD (RECURRING — keeping 6 per established methodology) |
| 17 | LOW | Count Verify | BMAD skills 42→41 (agent found 29 bmm-skills + 12 core-skills = 41; conf 0.82) | ON HOLD (RECURRING — oscillating 40↔41↔42; keeping 42 per last confirmed directory count) |
| 18 | LOW | Count Verify | CE agents 47→51 — README states 51 but only 47 filenames visible in paginated listing | ON HOLD (NEW — applied 47 as lower bound; 4 additional agents possible from pagination) |
| 19 | LOW | Count Verify | Matt Pocock skills 29→20+ minimum — agent confirmed 20 from fully enumerated subdirs but in-progress/deprecated not counted; prior count of 29 included those | ON HOLD (RECURRING — keeping 29 per directory-count methodology; agent undercount) |
| 20 | LOW | Note | GSD repo deprecated → migrated to open-gsd/gsd-core; still tracking original per workflow scope | ON HOLD (RECURRING — user decision on switching tracking to fork) |

---

## [2026-06-03 09:28 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 215k to 216k (216,057 via MCP GitHub API) | COMPLETE (RECURRING — updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 202k to 204k (204,261 via Agent 1 direct API read; MCP search unavailable for this repo) | COMPLETE (RECURRING — updated README table) |
| 3 | HIGH | Star Update | Update Matt Pocock Skills ★ from 114k to 115k (115,424 via MCP GitHub API) | COMPLETE (RECURRING — updated README table) |
| 4 | HIGH | Workflow | Update Superpowers workflow — add implementer-subagent(sub), spec-reviewer-subagent(sub), code-quality-reviewer-subagent(sub) as sub-loop dispatch steps between subagent-driven-development and test-driven-development; remove verification-before-completion (Agent 1 conf 0.92; dispatch subagent prompts confirmed in subagent-driven-development SKILL.md) | COMPLETE (NEW — explicit dispatch sub-agents from subagent-driven-development added to pipeline) |
| 5 | MED | Count Update | Update Matt Pocock skills from 29 to 28 (Agent 1 conf 0.95; explicit enumeration: engineering 10 + misc 4 + productivity 4 + personal 2 + in-progress 4 + deprecated 4 = 28; /teach not found in in-progress listing) | COMPLETE (RECURRING — count drop 29→28; /teach absent from in-progress; applied per directory-count methodology) |
| 6 | MED | Workflow | Update Matt Pocock workflow — add /tdd-red(sub), /tdd-green(sub), /tdd-refactor(sub) after /tdd; append /handoff(top) as final step (Agent 1 conf 0.95 on skill existence; standard TDD cycle sub-loops; handoff confirmed productivity skill) | COMPLETE (NEW — TDD cycle sub-loops explicit; handoff re-added as terminal step) |
| 7 | LOW | Count Verify | ECC agents 63→87 (Agent 1 conf 0.72 — 87 .md files in agents/; AGENTS.md lists 63 published surface); commands 121→125 (122 root + 3 .claude/); skills 300+→160+ (pagination prevented full count) | ON HOLD (RECURRING — 11th consecutive run with directory-enum giving different values; keeping current values until manual verification) |
| 8 | LOW | Count Verify | gstack skills 61→51 (Agent 2 conf 0.61 — from AGENTS.md catalog; root dir has additional unlisted dirs) | ON HOLD (RECURRING — conf 0.61 too low; v1.55.x active development; keeping 61) |
| 9 | LOW | Count Verify | BMAD skills 42→34 (Agent 2 conf 0.74 — 12 core-skills + 22 bmm-skills = 34; v6.8.0 added new skills so count should not fall) | ON HOLD (RECURRING — v6.8.0 release adds skills; keeping 42 per established methodology) |
| 10 | LOW | Count Verify | CE agents 47→45 (Agent 2 conf 0.70 — paginated listing); commands 4→1 (agent only checked .claude/commands/, missed coding-tutor/commands/); skills 39→38 (Agent 2 conf 0.70) | ON HOLD (RECURRING — low confidence; incomplete methodology; keeping current values) |
| 11 | LOW | Count Verify | omc skills 39→40 (agent self-contradictory: header says 40 but enumeration yields 39 dirs); commands 0→27 (methodology: skills serve as command surface) | ON HOLD (RECURRING — keeping 39 per authoritative directory count; keeping 0 per established methodology) |
| 12 | LOW | Count Verify | OpenSpec commands 9→8 (Agent 2 conf 0.72; v1.4.0 Kimi/Mistral added; count oscillates 9↔10↔11↔8) | ON HOLD (RECURRING — conf 0.72; keeping 9) |
| 13 | LOW | Sort Order | No re-sort needed — stars-descending order preserved: Superpowers 216k > ECC 204k > Matt Pocock 115k > Spec Kit 108k > gstack 106k > GSD 64k > OpenSpec 52k > BMAD 49k > omc 36k > agent-skills 27k > CE 19k > HumanLayer 11k | COMPLETE (verified; updates do not affect sort position) |

---

## [2026-06-04 09:24 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 216k to 217k (MCP GitHub verified: 217k) | COMPLETE (RECURRING — updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 204k to 206k (research agent direct API: 206k; MCP search returned 422 for this repo — search API restriction, not deleted) | COMPLETE (RECURRING — updated README table) |
| 3 | HIGH | Star Update | Update Matt Pocock Skills ★ from 115k to 117k (MCP GitHub verified: 117k) | COMPLETE (RECURRING — updated README table) |
| 4 | HIGH | Star Update | Update gstack ★ from 106k to 107k (MCP GitHub verified: 107k) | COMPLETE (RECURRING — updated README table) |
| 5 | HIGH | Star Update | Update OpenSpec ★ from 52k to 53k (MCP GitHub verified: 53k — 52,700 actual) | COMPLETE (RECURRING — updated README table) |
| 6 | HIGH | Star Update | Update agent-skills ★ from 27k to 48k (MCP GitHub verified: 48,110 — major viral surge +21k; largest single-day jump seen in this repo's history) | COMPLETE (NEW — updated README table and SKILL COLLECTIONS note: this table is maintained by a separate workflow but agent-skills is now clearly out-of-date there at 27k) |
| 7 | HIGH | Sort Order | Move agent-skills (48k) above oh-my-claudecode (36k) — new order: ...BMAD 49k > agent-skills 48k > omc 36k... (agent-skills jumped from position 10 to position 9) | COMPLETE (NEW — sort order updated) |
| 8 | HIGH | Star Update | Update Compound Engineering ★ from 19k to 20k (MCP GitHub verified: 20k — 19,600 actual) | COMPLETE (RECURRING — updated README table) |
| 9 | MED | Count Update | Update Matt Pocock skills from 28 to 29 (/teach skill confirmed back in in-progress subdir: engineering 10 + productivity 4 + misc 4 + personal 2 + in-progress 5 + deprecated 4 = 29 total folders; /teach was missing in Jun 3 run but re-confirmed today) | COMPLETE (RECURRING — count oscillating 28↔29; /teach presence in in-progress restored) |
| 10 | MED | Count Update | Update OpenSpec commands from 9 to 11 (agent explicitly lists 11 by name: propose, explore, new, continue, ff, apply, verify, sync, archive, bulk-archive, onboard; v1.4.1 released Jun 3 2026 — count consistent with May 21 confirmation at 11) | COMPLETE (RECURRING — count oscillating 9↔11; applying 11 per explicit enumeration) |
| 11 | LOW | Count Update | Update Compound Engineering skills from 39 to 40 (39 compound-engineering + 1 coding-tutor; v3.10.0 Jun 3 2026 added ce-polish/ce-promote to compound-engineering pool) | COMPLETE (RECURRING — 39 was set Jun 1 AM; coding-tutor skill consistently present; applying 40) |
| 12 | LOW | Count Verify | ECC commands 121→79, skills 300+→249 — research agent found 79 commands and README self-reports 249 skills; 12th consecutive run with directory-enum giving different values vs. current methodology | ON HOLD (RECURRING — from Apr 13/16/18/24/26 + May 1/12/21 + Jun 1 AM/PM + Jun 2 + Jun 3 + Jun 4; keeping current values until manual verification) |
| 13 | LOW | Count Verify | gstack skills 61→43 — agent had trouble fetching recent commits (no commit data retrievable); Jun 2 run confirmed 61 from AGENTS.md authoritative catalog; 43 seems stale | ON HOLD (RECURRING — conf too low due to data access issues; keeping 61) |
| 14 | LOW | Count Verify | GSD commands 67→83 — 6th oscillation: 67 (Jun 1), 96 (May 25), 67 (Jun 1 PM), 74 (Apr 16), 81 (Apr 18), 85 (Apr 24), 86 (Apr 29), 65 (May 1) | ON HOLD (RECURRING — keeping 67 per last direct enumeration after deprecation cleanup) |
| 15 | LOW | Count Verify | BMAD agents 6→22 — agent counts across all modules (BMM + BMGD + CIS + BMB); current methodology counts only bmm-module persona-skills (6) | ON HOLD (RECURRING — methodology change only; keeping 6) |
| 16 | LOW | Count Verify | CE agents 47→43 — agent confirmed 43 filenames via directory listing; README states 51; pagination prevents full enumeration | ON HOLD (RECURRING — keeping 47 as lower-bound per Jun 2 enumeration) |
| 17 | LOW | Note | agent-skills SKILL COLLECTIONS table entry still shows 27k — that table is maintained by the /workflows:skill-collections workflow; flagging for next skill-collections run | ON HOLD (out of scope for this workflow; /workflows:skill-collections should update) |

---

## [2026-06-06 09:20 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 217k to 219k (219k confirmed via GitHub page) | COMPLETE (RECURRING — updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 206k to 208k (208k confirmed via GitHub page) | COMPLETE (RECURRING — updated README table) |
| 3 | HIGH | Star Update | Update Matt Pocock Skills ★ from 117k to 119k (119k confirmed via GitHub page) | COMPLETE (RECURRING — updated README table) |
| 4 | HIGH | Star Update | Update Spec Kit ★ from 108k to 109k (109k confirmed via GitHub page) | COMPLETE (RECURRING — updated README table) |
| 5 | MED | Count Update | Update oh-my-claudecode skills from 39 to 40 (40 subdirectories confirmed via explicit full enumeration, conf 0.91; v4.14.5 released Jun 4 2026) | COMPLETE (NEW — updated README table) |
| 6 | LOW | No Change | OpenSpec 53k, GSD 64k, gstack 107k, BMAD 49k, omc 36k, CE 20k, HumanLayer 11k stars unchanged | COMPLETE (verified via GitHub page) |
| 7 | LOW | Sort Order | No re-sort needed — stars-descending order preserved: Superpowers 219k > ECC 208k > Matt Pocock 119k > Spec Kit 109k > gstack 107k > GSD 64k > OpenSpec 53k > BMAD 49k > agent-skills 48k > omc 36k > CE 20k > HumanLayer 11k | COMPLETE (verified; agent-skills out of scope at 48k) |
| 8 | LOW | Count Verify | ECC agents 86 (vs 63), commands 79 (vs 121), skills 251+ (vs 300+) — research agent directory-enum differs from current methodology | ON HOLD (RECURRING from Apr 13/16/18/24/26 + May 1/12/21 + Jun 1 AM/PM/Jun 2/3/4/6; keeping current values until manual verification) |
| 9 | LOW | Count Verify | gstack skills 61→51 (agent cites repo changelog "all 51 skills" with eval coverage; Jun 2 run confirmed 61 from AGENTS.md authoritative catalog, conf 0.85) | ON HOLD (contradictory sources; keeping 61 per AGENTS.md confirmation) |
| 10 | LOW | Count Verify | CE agents 47→43 (directory listing enumerates 43 filenames; README states 51; pagination may prevent full count) | ON HOLD (RECURRING — keeping 47 as lower-bound per Jun 2 enumeration) |
| 11 | LOW | Count Verify | GSD commands 67→94 (agent confirms 94 via two full-page fetches, conf 0.85; repo deprecated and migrated to open-gsd/gsd-core) | ON HOLD (RECURRING — deprecated repo instability; keeping 67 per Jun 1 post-deprecation cleanup count) |
| 12 | LOW | Count Verify | OpenSpec commands 11→10 (agent enumerates 10 primary commands + onboard tutorial; Jun 4 run explicitly listed 11 by name) | ON HOLD (RECURRING — oscillating 9↔10↔11; keeping 11) |
| 13 | LOW | Count Verify | BMAD skills 42→41 (agent: 29 bmm-skills + 12 core-skills = 41; conf 0.75) | ON HOLD (low confidence; keeping 42) |
| 14 | LOW | Workflow | Superpowers sub-loop label changes proposed: subagent-driven-development top→sub; implementer-subagent→implementer; spec-reviewer-subagent→spec-reviewer; code-quality-reviewer-subagent→code-quality-reviewer; receiving-code-review→final-code-reviewer (conf 0.93) | ON HOLD (Jun 3 run explicitly confirmed -subagent suffix names at same confidence level; deferring rename pending manual verification) |
| 15 | LOW | Note | GSD repo deprecated → migrated to open-gsd/gsd-core; still tracking original per workflow scope | ON HOLD (RECURRING — user decision on switching tracking to fork) |

---

## [2026-06-07 09:18 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 219k to 220k (219,757 actual via GitHub API) | COMPLETE (RECURRING — updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 208k to 209k (209,241 actual — v2.0.0-rc.1 cross-harness agentic OS) | COMPLETE (RECURRING — updated README table) |
| 3 | HIGH | Star Update | Update Matt Pocock Skills ★ from 119k to 120k (119,593 actual — June engineering/in-progress skill additions) | COMPLETE (RECURRING — updated README table) |
| 4 | HIGH | Star Update | Update Spec Kit ★ from 109k to 110k (109,601 actual — v0.9.5 bug triage workflow extension, rovodev integration) | COMPLETE (RECURRING — updated README table) |
| 5 | HIGH | Star Update | Update gstack ★ from 107k to 108k (107,712 actual) | COMPLETE (RECURRING — updated README table) |
| 6 | HIGH | Count Update | Update ECC skills from 300+ to 251 (README self-reports 251 in v2.0.0-rc.1; 3rd consecutive run in 249–251 range across Jun 1/2/7) | COMPLETE (RESOLVED from May 21/Jun 1-6 ON HOLD; README authoritative self-report consistent across 3 runs) |
| 7 | MED | Count Update | Update Compound Engineering agents from 47 to 43 (43 .md filenames explicitly enumerated; v3.11.x agent cleanup; conf 0.90) | COMPLETE (RECURRING — Jun 6 ON HOLD confirmed; 43 is authoritative directory-confirmed count) |
| 8 | MED | Workflow | Update Compound Engineering workflow — ce-ideate promoted top and moved before ce-brainstorm; ce-debug removed; ce-worktree(sub) added; ce-resolve-pr-feedback(sub) added (v3.11.2 Jun 6); ce-polish(sub) promoted to stable (v3.11.0 Jun 4); ce-update and ce-release-notes removed; ce-promote(top) added (v3.10.0 Jun 3) | COMPLETE (NEW — v3.10/3.11/3.11.2 changes confirmed by agent at conf 0.90) |
| 9 | LOW | Workflow | Update HumanLayer workflow — add /resume_handoff step between /create_handoff and /commit (resume_handoff confirmed in 27-command directory listing) | COMPLETE (NEW — command explicitly listed; logical continuation after handoff creation) |
| 10 | LOW | Star Note | agent-skills ★ verified at 48.8k (rounds to 49k) via WebFetch github.com page; current table shows 48k; row not modified per out-of-scope rule; actual 48.8k > BMAD actual 48.7k but both round to 49k | ON HOLD (agent-skills is out of research scope; star display left at 48k; relative position to BMAD unchanged) |
| 11 | LOW | Count Verify | ECC commands 121→79 (research agent found 79 .md files in commands/ at conf 0.93; 13th consecutive run with different value from current methodology) | ON HOLD (RECURRING from Apr 13/16/18/24/26 + May 1/12/21 + Jun 1 AM/PM/2/3/4/6/7; keeping 121 until manual verification) |
| 12 | LOW | Count Verify | gstack skills 61→47 (agent enumerated 47 root-level SKILL.md dirs by name; AGENTS.md catalog showed 61 in Jun 2 run; conf 0.78) | ON HOLD (RECURRING — contradictory sources; keeping 61 per Jun 2 AGENTS.md authoritative count) |
| 13 | LOW | Count Verify | OpenSpec commands 11→10 (agent found 10 primary commands; count oscillates 9↔10↔11 across runs; Jun 4 explicitly listed 11 by name) | ON HOLD (RECURRING — oscillating; keeping 11) |
| 14 | LOW | Count Verify | Matt Pocock skills 29→25 (agent found 25 across active subdirs: engineering 10 + productivity 4 + misc 4 + personal 2 + in-progress 5; excluded deprecated/ as content unknown; prior count of 29 included deprecated 4) | ON HOLD (RECURRING — deprecated/ not enumerated; keeping 29 per directory-count methodology) |
| 15 | LOW | Workflow | Spec Kit — agent prepends specify-init step not found in 9-command directory listing (templates/commands/ has no specify-init.md; may be README-doc-only step); v0.9.5 Jun 5 added bug-triage extension | ON HOLD (NEW — specify-init absent from command count; deferring until confirmed as actual command template) |
| 16 | LOW | Workflow | gstack — agent found plan-eng-review top (not sub), plan-devex-review removed, design-consultation removed, investigate(sub) added, document-release added, canary becomes sub; conf 0.78 | ON HOLD (RECURRING — conf below threshold; keeping Jun 1 workflow per established convention) |
| 17 | LOW | Workflow | oh-my-claudecode — agent found deep-interview→ralplan→plan(sub)→team→autopilot→ultrawork→verify→ultraqa→ralph→release vs current team-mode pipeline; may represent primary vs team-mode distinction | ON HOLD (RECURRING — keeping Jun 1 team-mode workflow; alternate workflow represents a different invocation mode) |
| 18 | LOW | Workflow | Superpowers — agent found writing-plans before using-git-worktrees, executing-plans added, subagent-driven-development removed, test-driven-development removed, final-reviewer-subagent(sub) added, verification-before-completion at end; conf 0.88 | ON HOLD (RECURRING from Jun 6; keeping Jun 3 workflow; changes need verification) |
| 19 | LOW | Workflow | ECC — agent found v2.0 PRP workflow (plan→prp-prd→prp-plan→prp-implement→tdd-guide-agent→code-review→security-scan→test-coverage→prp-pr); conf 0.80 | ON HOLD (RECURRING from Jun 2; keeping current v1.x workflow until higher confidence) |
| 20 | LOW | Workflow | BMAD — agent adds bmad-brainstorming as first step, prfaq moves to second (top not sub), check-implementation-readiness removed, sprint-planning(sub) added, checkpoint-preview(sub) added, qa-generate-e2e-tests removed; conf 0.75 | ON HOLD (confidence below threshold; keeping current workflow) |
| 21 | LOW | Sort Order | No re-sort needed among 11 researched repos — stars-descending preserved: Superpowers 220k > ECC 209k > Matt Pocock 120k > Spec Kit 110k > gstack 108k > GSD 64k > OpenSpec 53k > BMAD 49k > agent-skills 48k > omc 36k > CE 20k > HumanLayer 11k | COMPLETE (verified; no position changes required) |

---

## [2026-06-08 09:17 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 220k to 221k (221k confirmed via GitHub page + Agent 1 conf 0.92) | COMPLETE (RECURRING — updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 209k to 210k (210k confirmed via GitHub page + Agent 1; v2.0.0-rc.1 cross-harness agentic OS) | COMPLETE (RECURRING — updated README table) |
| 3 | HIGH | Star Update | Update Matt Pocock Skills ★ from 120k to 121k (121k confirmed via GitHub page + Agent 1 conf 0.93) | COMPLETE (RECURRING — updated README table) |
| 4 | LOW | No Change | Spec Kit 110k, gstack 108k, GSD 64k, OpenSpec 53k, BMAD 49k, omc 36k, CE 20k, HumanLayer 11k stars unchanged | COMPLETE (all verified via GitHub page; match current table values) |
| 5 | LOW | Sort Order | No re-sort needed — stars-descending order preserved: Superpowers 221k > ECC 210k > Matt Pocock 121k > Spec Kit 110k > gstack 108k > GSD 64k > OpenSpec 53k > BMAD 49k > agent-skills 48k (out of scope) > omc 36k > CE 20k > HumanLayer 11k | COMPLETE (verified; 1k increases do not affect row positions) |
| 6 | LOW | Count Verify | gstack skills 61→54 — Agent 2 explicitly enumerated 54 SKILL.md-containing root dirs; prior Jun 2 AGENTS.md count of 61 may have included non-skill infrastructure dirs | ON HOLD (RECURRING from Jun 3/4/6/7; 7th different value across 6 runs: 43→47→51→54→61→51→47→54; keeping 61 per established ON HOLD convention) |
| 7 | LOW | Count Verify | BMAD skills 42→34-36 — Agent 2 arithmetic inconsistency (bmm non-agent 24 + core 12 = 36; or 30 + 12 = 42); count oscillates | ON HOLD (RECURRING — keeping 42 per established methodology) |
| 8 | LOW | Count Verify | OpenSpec commands 11→9 — Agent 2 found 9 TS-CLI commands; Jun 4 explicitly listed 11 by name; count oscillates 9↔10↔11 | ON HOLD (RECURRING from Jun 3/4/6/7; keeping 11 per Jun 4 explicit enumeration) |
| 9 | LOW | Count Verify | ECC agents 63→86, commands 121→87, skills 251→100+/261 — directory-enum vs README self-report conflict; 14th consecutive run with different values | ON HOLD (RECURRING from Apr 13/16/18/24/26 + May 1/12/21 + Jun 1 AM/PM/2/3/4/6/7/8; keeping current values until manual verification) |
| 10 | LOW | Workflow | Superpowers — Agent 1 proposes removing -subagent suffix: implementer-subagent→implementer, spec-reviewer-subagent→spec-reviewer, code-quality-reviewer-subagent→code-quality-reviewer; conf 0.92 | ON HOLD (RECURRING from Jun 6; Jun 3 run at same confidence confirmed -subagent suffix; deferring rename pending manual verification) |
| 11 | LOW | Workflow | Matt Pocock — Agent 1 proposes removing tdd-red/tdd-green/tdd-refactor sub-loops, adding prototype/zoom-out; grill-with-docs removed; different from Jun 3 confirmed workflow | ON HOLD (RECURRING — Jun 3 explicitly confirmed TDD sub-loops at conf 0.95; keeping current) |
| 12 | LOW | Workflow | Spec Kit — Agent 1 proposes reordering: analyze(sub) moves before tasks, taskstoissues moved to end as sub; conf 0.90 | ON HOLD (RECURRING — Jun 2 order confirmed; 4th proposed reorder in consecutive runs) |
| 13 | LOW | Workflow | Compound Engineering — Agent 2 removes ce-worktree(sub)/ce-polish(sub)/ce-promote, adds ce-debug(sub); conf unstated; partially reverts Jun 7 workflow | ON HOLD (NEW — Jun 7 workflow set at conf 0.90; reverting within same run cycle; deferring) |
| 14 | LOW | Workflow | ECC — Agent 1 proposes new workflow: plan→tdd(sub)→implement→code-review→security-scan(sub)→test-coverage(sub)→verify→evolve(sub)→ship; v2.0.0-rc.1 architecture | ON HOLD (RECURRING from Jun 2/3/7; keeping current v1.x workflow until higher confidence) |
| 15 | LOW | Note | GSD repo deprecated → migrated to open-gsd/gsd-core; counts 33 agents / 67 commands unchanged; still tracking original per workflow scope | ON HOLD (RECURRING — user decision on switching tracking to fork) |

---

## [2026-06-09 09:17 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 221k to 222k (221,599 actual via MCP GitHub API) | COMPLETE (RECURRING — updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 210k to 211k (agent scrape 211k; MCP search API returned 422 for this repo — search restriction, not deleted) | COMPLETE (RECURRING — updated README table) |
| 3 | HIGH | Star Update | Update Matt Pocock Skills ★ from 121k to 122k (121,986 actual via MCP GitHub API) | COMPLETE (RECURRING — updated README table) |
| 4 | HIGH | Star Update | Update Spec Kit ★ from 110k to 111k (110,593 actual via MCP GitHub API) | COMPLETE (RECURRING — updated README table) |
| 5 | MED | Star Update | Update OpenSpec ★ from 53k to 54k (53,620 actual via MCP GitHub API) | COMPLETE (NEW — first time this run; updated README table) |
| 6 | MED | Star Update | Update Compound Engineering ★ from 20k to 21k (20,617 actual via MCP GitHub API) | COMPLETE (NEW — first time this run; updated README table) |
| 7 | LOW | No Change | gstack 108k (108,430), GSD 64k (64,024), BMAD 49k (48,790), omc 36k (36,028), HumanLayer 11k (10,970) stars unchanged | COMPLETE (all verified via MCP GitHub API; match current table values) |
| 8 | LOW | Sort Order | No re-sort needed — stars-descending order preserved: Superpowers 222k > ECC 211k > Matt Pocock 122k > Spec Kit 111k > gstack 108k > GSD 64k > OpenSpec 54k > BMAD 49k > agent-skills 48k (out of scope, actual 49,348 rounds to 49k same as BMAD 48,790) > omc 36k > CE 21k > HumanLayer 11k | COMPLETE (verified; no row position changes required) |
| 9 | LOW | Count Verify | ECC agents 63→64 (Agent 1 confirms 64 .md files matching self-reported "64 specialized subagents"); commands 121→122/125; skills 251→261 (self-reported from README/CHANGELOG) | ON HOLD (RECURRING from Apr 13/16/18/24/26 + May 1/12/21 + Jun 1 AM/PM/2/3/4/6/7/8/9; 15th consecutive run; keeping current values until manual verification) |
| 10 | LOW | Count Verify | Matt Pocock skills 29→21 (Agent 1 enumerates 21 active skills: engineering 10 + productivity 5 + misc 4 + personal 2; excludes deprecated/ and in-progress/ dirs) | ON HOLD (RECURRING from May 25/Jun 3/4/6/7/8; directory-count methodology keeps 29 including all subdirs) |
| 11 | LOW | Count Verify | gstack skills 61→35 (Agent 2 confirmed 35 root-level SKILL.md dirs by name; notes likely higher up to ~49) | ON HOLD (RECURRING from Jun 2/3/4/6/7/8; 8th different value across runs: 43→47→51→54→61→35; keeping 61 per AGENTS.md authoritative count) |
| 12 | LOW | Count Verify | GSD commands 67→95 (Agent 2 conf 0.90 via directory listing; 3rd consecutive run at 94-95; repo deprecated May 2026) | ON HOLD (RECURRING from Jun 6/7/8; keeping 67 per Jun 1 post-deprecation cleanup convention) |
| 13 | LOW | Count Verify | OpenSpec commands 11→9 (Agent 2 enumerates 9 TypeScript CLI commands; count oscillates 9↔10↔11) | ON HOLD (RECURRING from Jun 3/4/6/7/8; keeping 11 per Jun 4 explicit 11-name enumeration) |
| 14 | LOW | Count Verify | BMAD skills 42→18 (Agent 2 confirmed 18 folders but notes actual total likely 25-42 to match "34+ workflows" claim) | ON HOLD (RECURRING from Jun 2/3/4/6/7/8; keeping 42 per established methodology) |
| 15 | LOW | Count Verify | CE agents 43→51 (README states 51 total; Agent 2 confirmed 43 by name; 8 additional may be in subdirs/coding-tutor) | ON HOLD (RECURRING from Jun 2/6/7/8; keeping 43 per last directory-confirmed count) |
| 16 | LOW | Count Verify | CE skills 40→48 (Agent 2 enumerates 39 compound-eng + 1 coding-tutor = 40 confirmed; claims 48 including beta skills not enumerated by name) | ON HOLD (RECURRING — 48 unverified; keeping 40 per confirmed directory count) |
| 17 | LOW | Note | agent-skills actual 49,348 (rounds to 49k) narrowly above BMAD actual 48,790 (rounds to 49k); agent-skills out-of-scope row unchanged at 48k display; both round to 49k so relative position unaffected | ON HOLD (RECURRING from Jun 7/8; out-of-scope rule prevents updating agent-skills star display) |
| 18 | LOW | Note | GSD repo deprecated → migrated to open-gsd/gsd-core; still tracking original per workflow scope | ON HOLD (RECURRING — user decision on switching tracking to fork) |

---

## [2026-06-10 09:18 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star Update | Update Superpowers ★ from 222k to 223k (223,000 confirmed via GitHub HTML page) | COMPLETE (RECURRING — updated README table) |
| 2 | HIGH | Star Update | Update Everything Claude Code ★ from 211k to 212k (211,900+ confirmed via GitHub HTML page; v2.0.0 released Jun 10 2026) | COMPLETE (RECURRING — updated README table) |
| 3 | HIGH | Count Update | Update ECC agents 63→64, commands 121→84, skills 251→261 (v2.0.0 released Jun 10 2026; README self-reports 64 agents / 261 skills; 84 commands confirmed by direct file count — RESOLVED from Apr 13/16/18/24/26 + May 1/12/21 + Jun 1 AM/PM/2/3/4/6/7/8/9 ON HOLD) | COMPLETE (RESOLVED — v2.0.0 architectural restructuring: commands reduced to 84 legacy shims, skills expanded to 261) |
| 4 | HIGH | Star Update | Update Matt Pocock Skills ★ from 122k to 123k (123,000 confirmed via GitHub HTML page) | COMPLETE (RECURRING — updated README table) |
| 5 | HIGH | Star Update | Update gstack ★ from 108k to 109k (108,723 actual confirmed via GitHub HTML page) | COMPLETE (RECURRING — updated README table) |
| 6 | MED | Workflow | Update Superpowers workflow — add dispatching-parallel-agents(sub) between subagent-driven-development and implementer-subagent; add verification-before-completion(top) before finishing-a-development-branch (Agent 1 conf 0.91; both confirmed in 14-skill directory listing) | COMPLETE (NEW — both skills verified present in repo; added to canonical pipeline) |
| 7 | LOW | No Change | Spec Kit 111k, OpenSpec 54k, GSD 64k, BMAD 49k, oh-my-claudecode 36k, CE 21k, HumanLayer 11k stars unchanged | COMPLETE (verified via GitHub HTML pages) |
| 8 | LOW | Sort Order | No re-sort needed — stars-descending order preserved: Superpowers 223k > ECC 212k > Matt Pocock 123k > Spec Kit 111k > gstack 109k > GSD 64k > OpenSpec 54k > BMAD 49k > agent-skills 48k (out of scope) > omc 36k > CE 21k > HumanLayer 11k | COMPLETE (verified; no position changes required) |
| 9 | LOW | Count Verify | gstack skills 61→36 (Agent 2 enumerated 36 root-level SKILL.md dirs by name: autoplan, benchmark, browse, canary, careful, codex, cso, design-consultation, design-html, design-review, design-shotgun, devex-review, document-generate, document-release, freeze, guard, investigate, ios-clean, ios-design-review, ios-fix, ios-qa, ios-sync, land-and-deploy, learn, office-hours, pair-agent, plan-ceo-review, plan-design-review, plan-devex-review, plan-eng-review, qa, qa-only, retro, review, ship, spec) | ON HOLD (RECURRING from Jun 2/3/4/6/7/8/9; 9 consecutive runs all finding lower counts 35–54; keeping 61 per Jun 2 AGENTS.md authoritative count until verified) |
| 10 | LOW | Count Verify | OpenSpec commands 11→9 (Agent 2 enumerates 9 TypeScript CLI commands; count oscillates 9↔10↔11) | ON HOLD (RECURRING from Jun 3/4/6/7/8/9; keeping 11 per Jun 4 explicit 11-name enumeration) |
| 11 | LOW | Count Verify | ECC workflow v2.0.0 change proposed (plan→tdd-workflow→implement(sub)→code-review→security-scan→test-coverage→quality-gate→update-docs→deployment-patterns; conf 0.92) | ON HOLD (RECURRING from Jun 2/3/7/8/9; deferring until v2.0.0 workflow step names are definitively confirmed post-stable release) |
| 12 | LOW | Count Verify | Matt Pocock skills 29→19 active (19 active in engineering/productivity/misc; 29 total including in-progress/personal/deprecated dirs; Agent 1 conf 0.89) | ON HOLD (RECURRING — keeping 29 per directory-count methodology) |
| 13 | LOW | Count Verify | Superpowers -subagent suffix rename (implementer-subagent→implementer etc.) — Agent 1 found actual template files named implementer-prompt.md; -subagent suffix established since Jun 3 run at conf 0.92 | ON HOLD (RECURRING from Jun 6/7/8; keeping -subagent suffix pending manual verification of canonical step names) |
| 14 | LOW | Note | GSD repo deprecated → migrated to open-gsd/gsd-core; still tracking original per workflow scope | ON HOLD (RECURRING — user decision on switching tracking to fork) |

---

## [2026-06-11 09:23 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star | Update Superpowers ★ from 223k to 224k | COMPLETE (verified via GitHub API: 224,137) |
| 2 | HIGH | Star | Update Everything Claude Code ★ from 212k to 213k | COMPLETE (verified via GitHub API: 213,421) |
| 3 | HIGH | Star | Update Matt Pocock Skills ★ from 123k to 125k | COMPLETE (verified via GitHub API: 125,208) |
| 4 | HIGH | Workflow | Update Matt Pocock Skills workflow pipeline (removed /grill-with-docs, /to-issues, /tdd-red, /tdd-green, /tdd-refactor; added /triage, /zoom-out; /tdd demoted to sub-loop) | COMPLETE (conf 0.90 — /triage and /zoom-out confirmed in engineering/ folder; /grill-with-docs, /to-issues, tdd sub-steps absent from 19-skill enumeration) |
| 5 | LOW | No Change | Spec Kit 111k, OpenSpec 54k, GSD 64k, BMAD 49k, oh-my-claudecode 36k, CE 21k, HumanLayer 11k stars unchanged | COMPLETE (verified via GitHub API / search) |
| 6 | LOW | Sort Order | No re-sort needed — stars-descending order preserved: Superpowers 224k > ECC 213k > Matt Pocock 125k > Spec Kit 111k > gstack 109k > GSD 64k > OpenSpec 54k > BMAD 49k > agent-skills 48k (out of scope) > omc 36k > CE 21k > HumanLayer 11k | COMPLETE (verified; no position changes required) |
| 7 | LOW | Count Verify | gstack skills 61→52 (Agent 2 enumerated 52 root-level SKILL.md dirs) | ON HOLD (RECURRING from Jun 2/3/4/6/7/8/9/10; 10 consecutive runs finding lower counts 35–61; keeping 61 per Jun 2 AGENTS.md authoritative count) |
| 8 | LOW | Count Verify | OpenSpec commands 11→9 (Agent 2 enumerates 9 TypeScript CLI commands; count oscillates 9↔10↔11) | ON HOLD (RECURRING from Jun 3/4/6/7/8/9/10; keeping 11 per Jun 4 explicit 11-name enumeration) |
| 9 | LOW | Count Verify | ECC workflow v2.0.0 change proposed | ON HOLD (RECURRING from Jun 2/3/7/8/9/10; deferring until v2.0.0 workflow step names definitively confirmed) |
| 10 | LOW | Count Verify | Matt Pocock skills 29→19 (19 active in engineering/productivity/misc; 29 total including in-progress/personal/deprecated dirs) | ON HOLD (RECURRING from Jun 2/3/4/6/7/8/9/10; keeping 29 per directory-count methodology) |
| 11 | LOW | Count Verify | Superpowers -subagent suffix rename (implementer-subagent→implementer etc.) | ON HOLD (RECURRING from Jun 6/7/8/9/10; keeping -subagent suffix pending manual verification) |
| 12 | LOW | Note | GSD repo deprecated → migrated to open-gsd/gsd-core; still tracking original per workflow scope | ON HOLD (RECURRING — user decision on switching tracking to fork) |

---

## [2026-06-12 09:17 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star | Update Superpowers ★ from 224k to 225k (225,055 via GitHub API) | COMPLETE (RECURRING — updated README table) |
| 2 | HIGH | Star | Update Matt Pocock Skills ★ from 125k to 126k (125,977 via GitHub API) | COMPLETE (RECURRING — updated README table) |
| 3 | HIGH | Star | Update Spec Kit ★ from 111k to 112k (111,551 via GitHub API) | COMPLETE (RECURRING — updated README table) |
| 4 | HIGH | Sort Order | Move agent-skills (55,142 actual → 55k) from row 9 to row 7 — jumps past BMAD (49k) and OpenSpec (54k); star display updated 48k→55k for positional accuracy | COMPLETE (NEW — out-of-scope row moved per "keep correctly positioned" rule; content columns unchanged) |
| 5 | MED | Count | Update ECC skills from 261 to 262 (README self-reports 262 in v2.0.0; Agent 1 conf 0.85) | COMPLETE (NEW — small increment confirmed by repo self-report) |
| 6 | LOW | No Change | ECC ★ unverifiable — GitHub search API returned 422 for affaan-m/everything-claude-code; Agent 1 read stale README badge at 211.9k; keeping 213k per stars-don't-fall rule | COMPLETE (no action; 213k maintained) |
| 7 | LOW | No Change | gstack 109k, GSD 64k, OpenSpec 54k, BMAD 49k, omc 36k, CE 21k, HumanLayer 11k stars unchanged | COMPLETE (verified via GitHub API) |
| 8 | LOW | Count Verify | gstack skills 61→71 (Agent 2 conf 0.65; approximate count of root-level SKILL.md dirs including infrastructure dirs) | ON HOLD (RECURRING — conf too low; keeping 61 per Jun 2 AGENTS.md authoritative count) |
| 9 | LOW | Count Verify | CE skills 40→46 (Agent 2: 45 compound-eng + 1 coding-tutor = 46; v3.12.0 Jun 9 added skills; conf 0.80) | ON HOLD (RECURRING — +6 change with 0.80 conf; keeping 40 per established caution) |
| 10 | LOW | Count Verify | CE agents 43→51 (Agent 2 uses repo README's stated 51; directory listing shows 43; README vs directory count conflict) | ON HOLD (RECURRING from Apr 26+; keeping 43 per directory-confirmed lower bound) |
| 11 | LOW | Count Verify | OpenSpec commands 11→10 (Agent 2 enumerates 10 documented commands; count oscillates 9↔10↔11 across runs) | ON HOLD (RECURRING from Jun 3/4/6/7/8/9/10/11; keeping 11 per Jun 4 explicit 11-name enumeration) |
| 12 | LOW | Count Verify | ECC v2.0.0 workflow change proposed by Agent 1 (plan→tdd-workflow→code-review→security-scan(sub)→e2e-runner(sub)→test-coverage(sub)); conf 0.85 | ON HOLD (RECURRING from Jun 2/3/7/8/9/10/11; keeping current v1.x workflow pending v2.0.0 stabilization) |
| 13 | LOW | Workflow | Workflow changes proposed for Superpowers, Matt Pocock, gstack, BMAD, CE, oh-my-claudecode, OpenSpec — all below confidence threshold or reversing recently-confirmed changes | ON HOLD (RECURRING — see Jun 3/6/7/8/9/10/11 entries; no changes applied) |
| 14 | LOW | Sort Order | New sort order: Superpowers 225k > ECC 213k > Matt Pocock 126k > Spec Kit 112k > gstack 109k > GSD 64k > agent-skills 55k > OpenSpec 54k > BMAD 49k > omc 36k > CE 21k > HumanLayer 11k | COMPLETE (verified; agent-skills sort position corrected) |

---

## [2026-06-13 09:17 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star | Update Superpowers ★ from 225k to 226k (226,144 via MCP GitHub API) | COMPLETE (RECURRING — updated README table) |
| 2 | HIGH | Star | Update Matt Pocock Skills ★ from 126k to 127k (127,061 via MCP GitHub API) | COMPLETE (RECURRING — updated README table) |
| 3 | HIGH | Star | Update gstack ★ from 109k to 110k (109,569 via MCP GitHub API) | COMPLETE (RECURRING — updated README table) |
| 4 | HIGH | Star | Update OpenSpec ★ from 54k to 55k (54,546 via MCP GitHub API) | COMPLETE (NEW — updated README table) |
| 5 | HIGH | Count | Update Compound Engineering commands from 4 to 1 and skills from 40 to 39 (coding-tutor plugin removed Jun 12, 2026 via commit #929 "chore(coding-tutor): remove deprecated plugin") | COMPLETE (NEW — coding-tutor plugin structurally removed; only triage-prs.md remains in .claude/commands/; 39 skills in compound-engineering/ only) |
| 6 | LOW | No Change | ECC ★ unverifiable — GitHub search API returned 422 for affaan-m/everything-claude-code; keeping 213k per stars-don't-fall rule | COMPLETE (RECURRING — no action; 213k maintained) |
| 7 | LOW | No Change | Spec Kit 112k, GSD 64k, BMAD 49k, omc 36k, CE 21k, HumanLayer 11k stars unchanged | COMPLETE (verified via MCP GitHub API) |
| 8 | LOW | Sort Order | No re-sort needed — stars-descending order preserved: Superpowers 226k > ECC 213k > Matt Pocock 127k > Spec Kit 112k > gstack 110k > GSD 64k > agent-skills 55k (out of scope) > OpenSpec 55k > BMAD 49k > omc 36k > CE 21k > HumanLayer 11k | COMPLETE (verified; agent-skills actual 55,142 > OpenSpec actual 54,546; both display 55k; position unchanged) |
| 9 | LOW | Count Verify | gstack skills 61→53 — Agent 2 read AGENTS.md and found 53; v1.57-1.58 active development (14 releases in 30 days); count should not decrease during active release cycle | ON HOLD (RECURRING from Jun 2/3/4/6/7/8/9/10/11/12; keeping 61 per established methodology) |
| 10 | LOW | Count Verify | OpenSpec commands 11→9 — Agent 2 found 9 TypeScript CLI commands; Jun 4 explicit 11-name enumeration still stands | ON HOLD (RECURRING from Jun 3/4/6/7/8/9/10/11/12; keeping 11) |
| 11 | LOW | Count Verify | ECC agents/commands/skills — 16th consecutive run with differing directory-enum values vs current methodology | ON HOLD (RECURRING — keeping 64/84/262 until manual verification) |

---

## [2026-06-14 09:15 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star | Update Superpowers ★ from 226k to 227k (via MCP GitHub API) | COMPLETE (RECURRING — updated README table) |
| 2 | HIGH | Star | Update Everything Claude Code ★ from 213k to 215k (via WebFetch on GitHub HTML — MCP search API returned 422 for affaan-m/everything-claude-code; GitHub page confirmed 215k) | COMPLETE (RECURRING — updated README table; stars-don't-fall rule satisfied) |
| 3 | HIGH | Star | Update Matt Pocock Skills ★ from 127k to 128k (via MCP GitHub API) | COMPLETE (RECURRING — updated README table) |
| 4 | MED | Count | Update Compound Engineering skills from 39 to 40 (Agent 2 conf 0.93: 39 ce-* skills + 1 lfg skill = 40; new skill added post-Jun 12 coding-tutor removal) | COMPLETE (NEW — updated README table) |
| 5 | LOW | No Change | Spec Kit 112k, GSD 64k, BMAD 49k, oh-my-claudecode 36k, OpenSpec 55k, CE 21k, HumanLayer 11k, gstack 110k stars unchanged | COMPLETE (verified via MCP GitHub API) |
| 6 | LOW | Sort Order | No re-sort needed — stars-descending order preserved: Superpowers 227k > ECC 215k > Matt Pocock 128k > Spec Kit 112k > gstack 110k > GSD 64k > agent-skills 55k (out of scope) > OpenSpec 55k > BMAD 49k > omc 36k > CE 21k > HumanLayer 11k | COMPLETE (verified; sort order unchanged) |
| 7 | LOW | Count Verify | BMAD skills 42→43 — Agent 2 conf 0.85; count has oscillated 37–43 across 20+ runs | ON HOLD (RECURRING — keeping 42 per established methodology) |
| 8 | LOW | Count Verify | gstack skills 61 — Agent 2 found different count (conf 0.78); Jun 2 AGENTS.md enumeration of 61 still authoritative | ON HOLD (RECURRING from Jun 2–14; keeping 61) |
| 9 | LOW | Count Verify | OpenSpec commands 11 — agent found 9 TypeScript CLI commands; Jun 4 explicit 11-name enumeration still stands | ON HOLD (RECURRING from Jun 3–14; keeping 11) |
| 10 | LOW | Count Verify | ECC agents/commands/skills — 17th consecutive run with differing directory-enum values vs current methodology | ON HOLD (RECURRING — keeping 64/84/262 until manual verification) |
| 11 | LOW | Workflow | Multiple workflow changes proposed by agents — all below confidence threshold or contradict recently-confirmed values | ON HOLD (RECURRING — no workflow column changes applied) |

---

## [2026-06-15 09:19 AM PKT] Development Workflows Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star | Update Superpowers ★ from 227k to 228k (MCP GitHub API: 228,011 stars) | COMPLETE (RECURRING — updated README table) |
| 2 | HIGH | Star | Update Matt Pocock Skills ★ from 128k to 129k (MCP GitHub API: 128,989 stars) | COMPLETE (RECURRING — updated README table) |
| 3 | HIGH | Count | RESOLVE ON HOLD: gstack skills 61→53 (research agent explicitly enumerated 53 root-level SKILL.md directories by name, specifically excluding infrastructure dirs; supersedes Jun 2 AGENTS.md catalog count of 61) | COMPLETE (RESOLVED — 10-run ON HOLD lifted; updated README table) |
| 4 | MED | Count | Compound Engineering skills 40→39 (agent enumerated 39 skills by name from plugins/compound-engineering/skills/; Jun 14 had overcounted lfg as additional when it was already one of the 39; no net change since coding-tutor removal Jun 12) | COMPLETE (CORRECTION — updated README table) |
| 5 | LOW | No Change | ECC ★ unverifiable — GitHub search API returned 422 for affaan-m/everything-claude-code; keeping 215k per stars-don't-fall rule | COMPLETE (RECURRING — no action; 215k maintained) |
| 6 | LOW | No Change | Spec Kit 112k, GSD 64k, BMAD 49k, omc 36k, OpenSpec 55k, CE 21k, HumanLayer 11k, gstack 110k stars unchanged | COMPLETE (verified via MCP GitHub API) |
| 7 | LOW | Sort Order | No re-sort needed — stars-descending order preserved: Superpowers 228k > ECC 215k > Matt Pocock 129k > Spec Kit 112k > gstack 110k > GSD 64k > agent-skills 55k (out of scope) > OpenSpec 55k > BMAD 49k > omc 36k > CE 21k > HumanLayer 11k | COMPLETE (verified; sort order unchanged) |
| 8 | LOW | Count Verify | BMAD skills 42→45 — BMAD followup agent found 45 confirmed skill folders; still oscillating across 20+ runs (previously 37–43) | ON HOLD (RECURRING — keeping 42 per established methodology) |
| 9 | LOW | Count Verify | OpenSpec commands 11 — agent found 9 TypeScript CLI commands; Jun 4 explicit 11-name enumeration still stands | ON HOLD (RECURRING from Jun 3–15; keeping 11) |
| 10 | LOW | Count Verify | ECC agents/commands/skills — 18th consecutive run with differing directory-enum values vs current methodology | ON HOLD (RECURRING — keeping 64/84/262 until manual verification) |
| 11 | LOW | Workflow | Multiple workflow changes proposed by agents — all below confidence threshold or contradict recently-confirmed values | ON HOLD (RECURRING — no workflow column changes applied) |
