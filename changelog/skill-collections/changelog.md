# Skill Collections Changelog

**Status Legend:**

| Status | Meaning |
|--------|---------|
| `COMPLETE (reason)` | Action was taken and resolved successfully |
| `INVALID (reason)` | Finding was incorrect, not applicable, or intentional |
| `ON HOLD (reason)` | Action deferred, waiting on external dependency or user decision |

---

## [2026-04-28 04:39 PM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | LOW | Initial Run | Created SKILL COLLECTIONS section in README with 5 repos: anthropics/skills (125k/17), wshobson/agents (35k/152), mattpocock/skills (33k/17), K-Dense-AI/scientific-agent-skills (20k/134), VoltAgent/awesome-agent-skills (19k/1,100+ curated) | COMPLETE (initial seeding from research-agent findings, 2026-04-28 session) |

---

## [2026-04-29 12:52 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update mattpocock/skills ★ from 33k to 36k (36,476 exact) | NEW |
| 2 | MEDIUM | Count | Update mattpocock/skills skill count from 17 to 18 (added setup-matt-pocock-skills, deprecated/ folder reorganized 2026-04-28) | NEW |
| 3 | LOW | Star | Update wshobson/agents ★ from 35k to 34k (34,477 exact — slight drop) | NEW |
| 4 | MEDIUM | Sort | Move mattpocock/skills row above wshobson/agents row (rank swap due to star changes) | NEW |
| 5 | LOW | Count | Update VoltAgent/awesome-agent-skills curated count from 1,100+ to 930+ (actual README bullet parse; badge overstates by ~170) | NEW |
| 6 | LOW | No Change | anthropics/skills (125k/17) and K-Dense-AI/scientific-agent-skills (20k/134) — values match, no edit needed | COMPLETE (verified, no drift) |

---

## [2026-05-01 03:31 PM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update anthropics/skills ★ from 125k to 127k (126,746 exact) | NEW |
| 2 | HIGH | Star | Update mattpocock/skills ★ from 36k to 51k (50,819 exact — +15k surge over ~3 days, likely external amplification) | NEW |
| 3 | LOW | Star | Update wshobson/agents ★ from 34k to 35k (34,595 exact) | NEW |
| 4 | LOW | Star | Update VoltAgent/awesome-agent-skills ★ from 19k to 20k (19,729 exact) | NEW |
| 5 | LOW | No Change | All 5 skill counts steady (anthropics 17, mattpocock 18, wshobson 152, scientific 134, voltagent 930-curated) | COMPLETE (verified, no drift) |
| 6 | LOW | Sort | Order preserved — scientific (19,829) still > voltagent (19,729) by ~100 stars; no row reordering needed | COMPLETE (verified) |

---

## [2026-05-01 04:05 PM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Add | Added addyosmani/agent-skills (27k stars / 21 SKILL.md files) at row 4, between wshobson/agents (35k) and scientific-agent-skills (20k); user-requested manual addition | COMPLETE (inserted into SKILL COLLECTIONS table) |
| 2 | LOW | Note | Repo is dual-classified — also added to DEVELOPMENT WORKFLOWS table because it ships a full /spec → /plan → /build → /test → /review → /ship lifecycle, not just a SKILL.md library | COMPLETE (cross-referenced) |

---

## [2026-05-12 11:40 PM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star | Update anthropics/skills ★ from 127k to 133k (132,946 exact) | NEW |
| 2 | HIGH | Star | Update mattpocock/skills ★ from 51k to 76k (75,562 exact — +25k surge over ~11 days, second consecutive amplification event) | RECURRING (similar +15k surge logged 2026-05-01) |
| 3 | MEDIUM | Count | Update mattpocock/skills active skills from 18 to 24 (added handoff 2026-05-11, review 2026-05-10, plus engineering/in-progress additions; 4 deprecated unchanged) | NEW |
| 4 | LOW | Count | Update wshobson/agents skill count from 152 to 153 (README count synchronized 2026-05-09 commit) | NEW |
| 5 | LOW | Star | Update K-Dense-AI/scientific-agent-skills ★ from 20k to 21k (20,758 exact) | NEW |
| 6 | LOW | Count | Update K-Dense-AI/scientific-agent-skills count from 134 to 135 (added exa-search 2026-05-06 PR #143, autoskill 2026-05-03 PR #141) | NEW |
| 7 | MEDIUM | Star | Update VoltAgent/awesome-agent-skills ★ from 20k to 21k (21,417 exact — surpassed K-Dense-AI in star count) | NEW |
| 8 | MEDIUM | Count | Update VoltAgent/awesome-agent-skills curated count from 930+ to 1,100+ (reverts to README badge as source; prior 930+ was conservative bullet parse) | RECURRING (count source method debated 2026-04-29) |
| 9 | HIGH | Sort | Swap row 5 (K-Dense-AI 20,758) with row 6 (VoltAgent 21,417) — VoltAgent moves up due to ~660 star lead | NEW |
| 10 | LOW | No Change | addyosmani/agent-skills (27k/21) untouched — out of standard 5-repo research scope, awaiting separate review | COMPLETE (verified, manual entry preserved) |

---

## [2026-05-13 PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Add | Added pbakaus/impeccable (27k stars / 1 SKILL.md with 7 design domain references) at row 4, between wshobson/agents (35k) and addyosmani/agent-skills (27k); user-requested manual addition | COMPLETE (inserted into SKILL COLLECTIONS table) |
| 2 | LOW | Note | Single-skill repo with 7 reference files (typography, color-and-contrast, spatial-design, motion-design, interaction-design, responsive-design, ux-writing), 23 commands, 27 anti-pattern rules — design language skill for frontend AI work | COMPLETE (count notation matches VoltAgent pattern of parenthetical clarification) |

---

## [2026-05-13 01:28 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Add | Added alirezarezvani/claude-skills (14,550 exact → 15k / 246 skills across 9 domains) at row 8 of SKILL COLLECTIONS table (after K-Dense-AI/scientific-agent-skills 21k); user-requested manual addition | COMPLETE (inserted into SKILL COLLECTIONS table) |
| 2 | MEDIUM | Note | Drops empirical SKILL COLLECTIONS star floor from 21k to ~15k. No explicit star-threshold memory exists for this table (only AGENT COLLECTIONS and CROSS-MODEL WORKFLOWS have the 10k+ rule), so this is a precedent-setting addition rather than a rule violation | COMPLETE (decision logged) |
| 3 | LOW | Note | Repo is cross-tool by design (supports Claude Code, Codex, Gemini CLI, Cursor + 8 more per its own README description). Candidate for CROSS-MODEL WORKFLOWS table in future review, but classified here per user direction | COMPLETE (cross-classification noted) |

---

## [2026-05-20 11:55 PM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star | Update mattpocock/skills ★ from 76k to 97k (96,663 exact — +21k surge over ~8 days, third consecutive amplification event) | RECURRING (similar +25k surge logged 2026-05-12, +15k logged 2026-05-01) |
| 2 | MEDIUM | Star | Update anthropics/skills ★ from 133k to 138k (138,169 exact) | RECURRING (routine star bump, logged 2026-05-12) |
| 3 | LOW | Star | Update wshobson/agents ★ from 35k to 36k (35,706 exact) | RECURRING (star bumps logged 2026-05-01, 2026-05-12) |
| 4 | LOW | Count | Update wshobson/agents skill count from 153 to 155 (added recsys-pipeline-architect 2026-05-17, ship-mate plugin 2026-05-11) | RECURRING (count drift logged 2026-05-12) |
| 5 | MEDIUM | Star | Update K-Dense-AI/scientific-agent-skills ★ from 21k to 25k (24,924 exact — +4k, surpassed VoltAgent) | RECURRING (star bump logged 2026-05-12) |
| 6 | LOW | Count | Update K-Dense-AI/scientific-agent-skills count from 135 to 138 (v2.39.0 community contributions 2026-05-19, Hugging Science 2026-05-01) | RECURRING (count drift logged 2026-05-12) |
| 7 | LOW | Star | Update VoltAgent/awesome-agent-skills ★ from 21k to 22k (22,473 exact) | RECURRING (star bump logged 2026-05-12) |
| 8 | MEDIUM | Sort | Swap K-Dense-AI (24,924) above VoltAgent (22,473) — K-Dense-AI reclaims higher rank with ~2,450 star lead | RECURRING (reverses VoltAgent-up swap logged 2026-05-12) |
| 9 | LOW | No Change | anthropics & mattpocock active skill counts steady (17, 24); VoltAgent curated count steady (1,100+) | COMPLETE (verified, no drift) |
| 10 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |
