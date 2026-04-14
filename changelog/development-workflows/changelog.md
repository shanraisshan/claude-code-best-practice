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
