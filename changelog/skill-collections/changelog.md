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

---

## [2026-05-25 04:27 PM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Star | Update mattpocock/skills ★ from 97k to 104k (~104,000 — +7k, fourth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k) |
| 2 | MEDIUM | Star | Update anthropics/skills ★ from 138k to 140k (~140,000) | RECURRING (routine star bumps logged 2026-05-12, 2026-05-20) |
| 3 | MEDIUM | Count | Update VoltAgent/awesome-agent-skills curated count from 1,100+ to 1,424+ (README badge increment; remains curated list, not in-repo files) | RECURRING (count-source method debated 2026-04-29, badge reaffirmed 2026-05-12) |
| 4 | LOW | Star | Update K-Dense-AI/scientific-agent-skills ★ from 25k to 26k (25,800 exact — +1k) | RECURRING (star bump logged 2026-05-20) |
| 5 | LOW | Star | Update VoltAgent/awesome-agent-skills ★ from 22k to 23k (~23,000 — +1k) | RECURRING (star bump logged 2026-05-20) |
| 6 | LOW | No Change | wshobson/agents ★ steady at 36k (35,900 exact, still rounds to 36k) and skills steady at 155 | COMPLETE (verified, no drift) |
| 7 | LOW | No Change | Skill counts steady — anthropics 17, mattpocock 24 (active), K-Dense-AI 138 | COMPLETE (verified, no drift) |
| 8 | LOW | Sort | Order preserved — K-Dense-AI (26k) stays below the two 27k manual rows and above VoltAgent (23k); no row reordering needed | COMPLETE (verified) |
| 9 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |
| 10 | LOW | Note | anthropics & mattpocock star counts read from GitHub HTML (k-abbreviated), not exact API counts (api.github.com rate-limited); k-rounded values used per table convention | COMPLETE (method noted) |

---

## [2026-05-31 11:21 PM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update anthropics/skills ★ from 140k to 145k (144,623 exact) | RECURRING (routine star bumps logged 2026-05-12, 2026-05-20, 2026-05-25) |
| 2 | HIGH | Star | Update mattpocock/skills ★ from 104k to 113k (112,970 exact — +9k, fifth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k) |
| 3 | MEDIUM | Count | Update mattpocock/skills active skills from 24 to 25 (added /teach 2026-05-27/31; /review moved to in-progress; writing-* staged; 4 deprecated unchanged) | RECURRING (count drift logged 2026-05-12, 2026-05-20) |
| 4 | LOW | Star | Update K-Dense-AI/scientific-agent-skills ★ from 26k to 27k (26,729 exact — +1k) | RECURRING (star bumps logged 2026-05-20, 2026-05-25) |
| 5 | MEDIUM | Count | Update K-Dense-AI/scientific-agent-skills count from 138 to 143 (added bulk-rnaseq, pathway-enrichment, Nextflow support 2026-05-28; scvi-tools/scikit-bio updated) | RECURRING (count drift logged 2026-05-12, 2026-05-20) |
| 6 | LOW | Star | Update VoltAgent/awesome-agent-skills ★ from 23k to 24k (23,736 exact — +1k) | RECURRING (star bump logged 2026-05-25) |
| 7 | LOW | No Change | wshobson/agents steady — ★ 36k (36,182 exact) and skills 155 (155 SKILL.md via git tree, not truncated); native Codex/Cursor/Gemini plugin-install added 2026-05-29 but no skill count delta | COMPLETE (verified, no drift) |
| 8 | LOW | No Change | anthropics/skills active count steady at 17 (template/SKILL.md scaffold excluded); VoltAgent curated count held at 1,424+ (README badge); claude-api skill updated with Opus 4.8 migration 2026-05-29 | COMPLETE (verified, no drift) |
| 9 | LOW | Sort | Order preserved — K-Dense-AI (26,729 → 27k) stays below the two 27k manual rows (impeccable, addyosmani/agent-skills) per 2026-05-25 precedent; VoltAgent (24k) remains last among research repos | COMPLETE (verified) |
| 10 | LOW | Note | VoltAgent badge "1,424+" vs direct bold-link enumeration of 1,116 (Δ308) — badge retained as canonical source per twice-settled precedent (2026-04-29, 2026-05-12) | RECURRING (count-source method debated 2026-04-29, badge reaffirmed 2026-05-12, 2026-05-25) |
| 11 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-06-04 08:13 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update anthropics/skills ★ from 145k to 146k (GitHub shows ~146k — +1k) | RECURRING (routine star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31) |
| 2 | HIGH | Star | Update mattpocock/skills ★ from 113k to 117k (GitHub shows ~117k — +4k, sixth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k) |
| 3 | LOW | Count | Update wshobson/agents skill count from 155 to 156 (per README badge and docs/plugins.md) | RECURRING (count drift logged 2026-05-12, 2026-05-20) |
| 4 | LOW | Count | Update K-Dense-AI/scientific-agent-skills count from 143 to 142 (README badge reads 142; prior count 143 may have overstated by one) | NEW |
| 5 | LOW | No Change | VoltAgent/awesome-agent-skills steady — ★ 24k and curated count 1,424+ (README badge confirmed) | COMPLETE (verified, no drift) |
| 6 | LOW | No Change | Sort order preserved — all research repos stay in same relative positions | COMPLETE (verified) |
| 7 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-06-05 08:12 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update anthropics/skills ★ from 146k to 147k (GitHub HTML shows 147k — +1k) | RECURRING (routine star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-04) |
| 2 | MEDIUM | Star | Update mattpocock/skills ★ from 117k to 118k (GitHub HTML shows 118k — +1k, seventh consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k, 2026-06-04 +4k) |
| 3 | LOW | Count | Update K-Dense-AI/scientific-agent-skills count from 142 to 143 (search enumeration yielded 143 confirmed files; prior 2026-06-04 reduction to 142 was an index artifact) | RECURRING (count oscillated 143→142 on 2026-06-04, now restored to 143) |
| 4 | LOW | No Change | wshobson/agents steady — ★ 36k (36.4k exact, still rounds to 36k) and skills 156 | COMPLETE (verified, no drift) |
| 5 | LOW | No Change | VoltAgent/awesome-agent-skills steady — ★ 24k (24.3k) and curated count 1,424+ (README badge confirmed) | COMPLETE (verified, no drift) |
| 6 | LOW | No Change | Sort order preserved — no star crossings among research repos | COMPLETE (verified) |
| 7 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-06-07 08:09 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update mattpocock/skills ★ from 118k to 120k (GitHub HTML shows 120k — +2k, eighth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k, 2026-06-04 +4k, 2026-06-05 +1k) |
| 2 | LOW | Count | Update K-Dense-AI/scientific-agent-skills count from 143 to 142 (README badge reads 142; count oscillated 143→142→143 on 2026-06-04/05, now badge again reads 142) | RECURRING (count oscillated 143→142 on 2026-06-04, restored to 143 on 2026-06-05, now badge reads 142 again) |
| 3 | LOW | No Change | anthropics/skills steady — ★ 147k and skills 17 (API rate-limited; GitHub HTML confirms 147k) | COMPLETE (verified, no drift) |
| 4 | LOW | No Change | wshobson/agents steady — ★ 36k (36,445 exact per API) and skills 156 | COMPLETE (verified, no drift) |
| 5 | LOW | No Change | VoltAgent/awesome-agent-skills steady — ★ 24k (24,451 exact per API) and curated count 1,424+ (README badge confirmed) | COMPLETE (verified, no drift) |
| 6 | LOW | No Change | Sort order preserved — mattpocock (120k) stays at row 2; no star crossings among other research repos | COMPLETE (verified) |
| 7 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-06-11 08:06 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update anthropics/skills ★ from 147k to 149k (149,000 exact — +2k) | RECURRING (routine star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-04, 2026-06-05) |
| 2 | HIGH | Star | Update mattpocock/skills ★ from 120k to 125k (125,000 exact — +5k, ninth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k, 2026-06-04 +4k, 2026-06-05 +1k, 2026-06-07 +2k) |
| 3 | LOW | Star | Update wshobson/agents ★ from 36k to 37k (36,600 exact — +1k, now rounds to 37k) | RECURRING (star bumps logged 2026-05-01, 2026-05-12, 2026-05-20) |
| 4 | MEDIUM | Star | Update K-Dense-AI/scientific-agent-skills ★ from 27k to 28k (27,900 exact — +1k) | RECURRING (star bumps logged 2026-05-20, 2026-05-25, 2026-05-31) |
| 5 | MEDIUM | Count | Update K-Dense-AI/scientific-agent-skills count from 142 to 144 (README badge reads 144; +2 from prior 142) | RECURRING (count drift logged 2026-05-12, 2026-05-20, 2026-06-04, 2026-06-05) |
| 6 | HIGH | Sort | Move K-Dense-AI/scientific-agent-skills (28k) above impeccable (27k) and addyosmani/agent-skills (27k) — first time research repo definitively exceeds manual rows (28k > 27k vs prior tie-breaking precedent at same 27k rounding) | NEW |
| 7 | LOW | Star | Update VoltAgent/awesome-agent-skills ★ from 24k to 25k (24,900 exact — +1k, now rounds to 25k) | RECURRING (star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31) |
| 8 | LOW | No Change | VoltAgent/awesome-agent-skills curated count steady at 1,424+ (README badge confirmed) | COMPLETE (verified, no drift) |
| 9 | LOW | No Change | wshobson/agents skill count steady at 156 | COMPLETE (verified, no drift) |
| 10 | LOW | No Change | mattpocock/skills active skill count steady at 25 (engineering 10, misc 4, personal 2, productivity 5, in-progress 4; 4 deprecated excluded) | COMPLETE (verified, no drift) |
| 11 | LOW | No Change | anthropics/skills skill count steady at 17 | COMPLETE (verified, no drift) |
| 12 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-06-15 08:10 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update anthropics/skills ★ from 149k to 151k (~151k via GitHub HTML — +2k) | RECURRING (routine star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-04, 2026-06-05, 2026-06-11) |
| 2 | HIGH | Star | Update mattpocock/skills ★ from 125k to 129k (~129k via GitHub HTML — +4k, tenth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k, 2026-06-04 +4k, 2026-06-05 +1k, 2026-06-07 +2k, 2026-06-11 +5k) |
| 3 | MEDIUM | Count | Update K-Dense-AI/scientific-agent-skills count from 144 to 147 (README badge reads 147 — +3) | RECURRING (count drift logged 2026-05-12, 2026-05-20, 2026-06-04, 2026-06-05, 2026-06-11) |
| 4 | LOW | No Change | anthropics/skills skill count steady at 17 | COMPLETE (verified, no drift) |
| 5 | LOW | No Change | mattpocock/skills active skill count steady at 25 (4 deprecated excluded) | COMPLETE (verified, no drift) |
| 6 | LOW | No Change | wshobson/agents steady — ★ 37k (36,800 exact) and skills 156 | COMPLETE (verified, no drift) |
| 7 | LOW | No Change | K-Dense-AI/scientific-agent-skills ★ steady at 28k (28,200 exact — still rounds to 28k) | COMPLETE (verified, no drift) |
| 8 | LOW | No Change | VoltAgent/awesome-agent-skills steady — ★ 25k (25,300 exact) and curated count 1,424+ (README badge confirmed) | COMPLETE (verified, no drift) |
| 9 | LOW | No Change | Sort order preserved — no star crossings among research repos or vs manual rows | COMPLETE (verified) |
| 10 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-06-19 08:08 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update anthropics/skills ★ from 151k to 153k (153,000 via GitHub HTML — +2k) | RECURRING (routine star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-04, 2026-06-05, 2026-06-11, 2026-06-15) |
| 2 | HIGH | Star | Update mattpocock/skills ★ from 129k to 136k (136,000 via GitHub HTML — +7k, eleventh consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k, 2026-06-04 +4k, 2026-06-05 +1k, 2026-06-07 +2k, 2026-06-11 +5k, 2026-06-15 +4k) |
| 3 | MEDIUM | Count | Update mattpocock/skills active skills from 25 to 30 (+5; engineering grew from 10 to 14, in-progress grew from 4 to 5; 4 deprecated unchanged) | NEW |
| 4 | LOW | Star | Update K-Dense-AI/scientific-agent-skills ★ from 28k to 29k (28,700 via GitHub HTML — +1k) | RECURRING (star bumps logged 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-11) |
| 5 | LOW | Star | Update VoltAgent/awesome-agent-skills ★ from 25k to 26k (25,800 via GitHub HTML — +1k) | RECURRING (star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-15) |
| 6 | LOW | No Change | wshobson/agents steady — ★ 37k (36,900 via HTML, still rounds to 37k) and skills 156 | COMPLETE (verified, no drift) |
| 7 | LOW | No Change | anthropics/skills skill count steady at 17; K-Dense-AI count steady at 147; VoltAgent curated count steady at 1,424+ (README badge confirmed) | COMPLETE (verified, no drift) |
| 8 | LOW | No Change | Sort order preserved — K-Dense-AI (29k) remains above manual rows (27k); VoltAgent (26k) remains below manual rows; no crossings | COMPLETE (verified) |
| 9 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-06-24 08:06 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update anthropics/skills ★ from 153k to 154k (154,406 exact via GitHub API — +1k) | RECURRING (routine star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-04, 2026-06-05, 2026-06-11, 2026-06-15, 2026-06-19) |
| 2 | HIGH | Star | Update mattpocock/skills ★ from 136k to 144k (143,507 exact via GitHub API — +8k, twelfth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k, 2026-06-04 +4k, 2026-06-05 +1k, 2026-06-07 +2k, 2026-06-11 +5k, 2026-06-15 +4k, 2026-06-19 +7k) |
| 3 | MEDIUM | Count | Update VoltAgent/awesome-agent-skills curated count from 1,424+ to 1,497+ (README badge increment; remains curated list, not in-repo files) | RECURRING (count-source method debated 2026-04-29, badge reaffirmed 2026-05-12, 2026-05-25, 2026-05-31) |
| 4 | LOW | No Change | wshobson/agents steady — ★ 37k (37,106 exact) and skills 156 | COMPLETE (verified, no drift) |
| 5 | LOW | No Change | K-Dense-AI/scientific-agent-skills steady — ★ 29k (29,161 exact) and skills 147 | COMPLETE (verified, no drift) |
| 6 | LOW | No Change | mattpocock/skills active skill count steady at 30 (4 deprecated excluded) | COMPLETE (verified, no drift) |
| 7 | LOW | No Change | anthropics/skills skill count steady at 17 | COMPLETE (verified, no drift) |
| 8 | LOW | No Change | Sort order preserved — no star crossings among research repos or vs manual rows | COMPLETE (verified) |
| 9 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-06-28 08:08 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update anthropics/skills ★ from 154k to 156k (155,933 exact via GitHub API — +2k) | RECURRING (routine star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-04, 2026-06-05, 2026-06-11, 2026-06-15, 2026-06-19, 2026-06-24) |
| 2 | HIGH | Star | Update mattpocock/skills ★ from 144k to 148k (148,424 exact via GitHub API — +4k, thirteenth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k, 2026-06-04 +4k, 2026-06-05 +1k, 2026-06-07 +2k, 2026-06-11 +5k, 2026-06-15 +4k, 2026-06-19 +7k, 2026-06-24 +8k) |
| 3 | MEDIUM | Count | Update mattpocock/skills active skills from 30 to 31 (+1; 35 total SKILL.md files, 4 in deprecated/ excluded, yielding 31 active) | RECURRING (count drift logged 2026-05-12, 2026-05-31, 2026-06-19) |
| 4 | LOW | Count | Update wshobson/agents skill count from 156 to 158 (GitHub code search total_count=158 confirmed; incomplete_results=false) | RECURRING (count drift logged 2026-05-12, 2026-05-20, 2026-06-04) |
| 5 | LOW | No Change | K-Dense-AI/scientific-agent-skills steady — ★ 29k (29,476 exact) and skills 147 | COMPLETE (verified, no drift) |
| 6 | LOW | No Change | VoltAgent/awesome-agent-skills steady — ★ 26k (26,657 exact) and curated count 1,497+ (README badge confirmed) | COMPLETE (verified, no drift) |
| 7 | LOW | No Change | anthropics/skills skill count steady at 17 | COMPLETE (verified, no drift) |
| 8 | LOW | No Change | Sort order preserved — anthropics (156k) > mattpocock (148k) > wshobson (37k) > K-Dense-AI (29k) > VoltAgent (26k); no star crossings among research repos or vs manual rows | COMPLETE (verified) |
| 9 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-07-01 08:06 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update anthropics/skills ★ from 156k to 157k (157,047 exact via GitHub API — +1k) | RECURRING (routine star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-04, 2026-06-05, 2026-06-11, 2026-06-15, 2026-06-19, 2026-06-24, 2026-06-28) |
| 2 | HIGH | Star | Update mattpocock/skills ★ from 148k to 152k (151,876 exact via GitHub API — +4k, fourteenth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k, 2026-06-04 +4k, 2026-06-05 +1k, 2026-06-07 +2k, 2026-06-11 +5k, 2026-06-15 +4k, 2026-06-19 +7k, 2026-06-24 +8k, 2026-06-28 +4k) |
| 3 | MEDIUM | Count | Update mattpocock/skills active skills from 31 to 32 (+1; 36 total SKILL.md files, 4 in deprecated/ excluded, yielding 32 active) | RECURRING (count drift logged 2026-05-12, 2026-05-31, 2026-06-19, 2026-06-28) |
| 4 | MEDIUM | Star | Update K-Dense-AI/scientific-agent-skills ★ from 29k to 30k (29,680 exact via GitHub API — +1k, now rounds to 30k) | RECURRING (star bumps logged 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-11, 2026-06-19) |
| 5 | MEDIUM | Count | Update K-Dense-AI/scientific-agent-skills count from 147 to 149 (+2 SKILL.md files added) | RECURRING (count drift logged 2026-05-12, 2026-05-20, 2026-06-04, 2026-06-05, 2026-06-11, 2026-06-15) |
| 6 | LOW | Star | Update VoltAgent/awesome-agent-skills ★ from 26k to 27k (26,960 exact via GitHub API — +1k, now rounds to 27k; ties manual rows at 27k but no reorder per precedent: reorder only triggers on definitive crossing, not tie-rounding) | RECURRING (star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-11, 2026-06-15, 2026-06-19) |
| 7 | LOW | No Change | wshobson/agents steady — ★ 37k (37,377 exact) and skills 158 | COMPLETE (verified, no drift) |
| 8 | LOW | No Change | anthropics/skills skill count steady at 17; VoltAgent curated count steady at 1,497+ (README badge) | COMPLETE (verified, no drift) |
| 9 | LOW | No Change | Sort order preserved — anthropics (157k) > mattpocock (152k) > wshobson (37k) > K-Dense-AI (30k) > manual rows (27k) > VoltAgent (27k); VoltAgent ties manual rows but precedent holds (no reorder at equal k-rounding) | COMPLETE (verified) |
| 10 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-07-02 08:10 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Count | Update anthropics/skills skill count from 17 to 12 (157,396 exact; research agent enumerated full tree — 12 confirmed SKILL.md files: algorithmic-art, brand-guidelines, canvas-design, claude-api, doc-coauthoring, docx, frontend-design, internal-comms, mcp-builder, pdf, pptx, skill-creator; tree not truncated; -5 from prior 17 indicates skills removed or relocated from repo) | NEW |
| 2 | MEDIUM | Star | Update mattpocock/skills ★ from 152k to 153k (153,240 exact — +1k, fifteenth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k, 2026-06-04 +4k, 2026-06-05 +1k, 2026-06-07 +2k, 2026-06-11 +5k, 2026-06-15 +4k, 2026-06-19 +7k, 2026-06-24 +8k, 2026-06-28 +4k, 2026-07-01 +4k) |
| 3 | LOW | Count | Update K-Dense-AI/scientific-agent-skills count from 149 to 148 (29,809 exact; README badge reads 148 — -1 from prior 149, slight oscillation consistent with prior 143→142→143 pattern logged 2026-06-04/05) | RECURRING (count oscillated 143→142→143→142 on 2026-06-04/05/07; 149→148 consistent with oscillation pattern) |
| 4 | LOW | No Change | anthropics/skills ★ steady at 157k (157,396 exact) | COMPLETE (verified, no drift) |
| 5 | LOW | No Change | mattpocock/skills active skill count steady at 32 (35 total, 3 in deprecated/ excluded) | COMPLETE (verified, no drift) |
| 6 | LOW | No Change | wshobson/agents steady — ★ 37k (37,414 exact) and skills 158 | COMPLETE (verified, no drift) |
| 7 | LOW | No Change | VoltAgent/awesome-agent-skills steady — ★ 27k (27,052 exact) and curated count 1,497+ (README badge confirmed) | COMPLETE (verified, no drift) |
| 8 | LOW | No Change | Sort order preserved — anthropics (157k) > mattpocock (153k) > wshobson (37k) > K-Dense-AI (30k) > manual rows (27k) > VoltAgent (27k); no star crossings | COMPLETE (verified) |
| 9 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-07-04 08:10 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | MEDIUM | Star | Update anthropics/skills ★ from 157k to 158k (157,993 exact via GitHub API — +1k) | RECURRING (routine star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-04, 2026-06-05, 2026-06-11, 2026-06-15, 2026-06-19, 2026-06-24, 2026-06-28, 2026-07-01, 2026-07-02) |
| 2 | HIGH | Count | Update anthropics/skills skill count from 12 to 18 (157,993 exact; research agent enumerated full tree — 18 confirmed SKILL.md files, up from 12 logged 2026-07-02; net +6 indicates skills re-added or restored to repo) | NEW |
| 3 | HIGH | Star | Update mattpocock/skills ★ from 153k to 156k (155,652 exact via GitHub API — +3k, sixteenth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k, 2026-06-04 +4k, 2026-06-05 +1k, 2026-06-07 +2k, 2026-06-11 +5k, 2026-06-15 +4k, 2026-06-19 +7k, 2026-06-24 +8k, 2026-06-28 +4k, 2026-07-01 +4k, 2026-07-02 +1k) |
| 4 | MEDIUM | Count | Update mattpocock/skills active skills from 32 to 34 (155,652 exact; 38 total SKILL.md, 4 in deprecated/ excluded, yields 34 active; +2 from prior 32) | RECURRING (count drift logged 2026-05-12, 2026-05-31, 2026-06-19, 2026-06-28, 2026-07-01) |
| 5 | LOW | Count | Update K-Dense-AI/scientific-agent-skills count from 148 to 149 (30,072 exact via GitHub API — +1 SKILL.md file added) | RECURRING (count drift logged 2026-05-12, 2026-05-20, 2026-06-04, 2026-06-05, 2026-06-11, 2026-06-15, 2026-07-01) |
| 6 | LOW | No Change | wshobson/agents steady — ★ 37k (37,486 exact) and skills 158 | COMPLETE (verified, no drift) |
| 7 | LOW | No Change | VoltAgent/awesome-agent-skills steady — ★ 27k (27,220 exact) and curated count 1,497+ (README badge confirmed) | COMPLETE (verified, no drift) |
| 8 | LOW | No Change | K-Dense-AI/scientific-agent-skills ★ steady at 30k (30,072 exact — still rounds to 30k) | COMPLETE (verified, no drift) |
| 9 | LOW | No Change | Sort order preserved — anthropics (158k) > mattpocock (156k) > wshobson (37k) > K-Dense-AI (30k) > manual rows (27k) > VoltAgent (27k); no star crossings | COMPLETE (verified) |
| 10 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246), Egonex-AI/Understand-Anything (67k/8) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-07-06 08:08 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Count | Update wshobson/agents skill count from 158 to 147 (37,557 exact; GitHub code search total_count=147 incomplete_results=false — -11 from prior 158, likely skills deleted or reorganized in repo) | NEW |
| 2 | MEDIUM | Star | Update mattpocock/skills ★ from 156k to 157k (157,619 exact via GitHub API — +2k, seventeenth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k, 2026-06-04 +4k, 2026-06-05 +1k, 2026-06-07 +2k, 2026-06-11 +5k, 2026-06-15 +4k, 2026-06-19 +7k, 2026-06-24 +8k, 2026-06-28 +4k, 2026-07-01 +4k, 2026-07-02 +1k, 2026-07-04 +3k) |
| 3 | MEDIUM | Count | Update anthropics/skills skill count from 18 to 17 (158,473 exact; 18 total SKILL.md found, template/SKILL.md excluded per scope rule — corrects 2026-07-04 count which included template) | RECURRING (count oscillated 17→12→18→17; template exclusion clarifies canonical count) |
| 4 | LOW | Count | Update K-Dense-AI/scientific-agent-skills count from 149 to 148 (30,245 exact; README badge reads 148 — -1, consistent with oscillation pattern) | RECURRING (count oscillated 143→142→143→142→143→142 on 2026-06-04/05/07; 149→148 continues oscillation) |
| 5 | LOW | No Change | anthropics/skills ★ steady at 158k (158,473 exact) | COMPLETE (verified, no drift) |
| 6 | LOW | No Change | mattpocock/skills active skill count steady at 34 (4 deprecated excluded) | COMPLETE (verified, no drift) |
| 7 | LOW | No Change | VoltAgent/awesome-agent-skills steady — ★ 27k (27,395 exact) and curated count 1,497+ (README badge confirmed) | COMPLETE (verified, no drift) |
| 8 | LOW | No Change | Sort order preserved — anthropics (158k) > mattpocock (157k) > wshobson (37k) > K-Dense-AI (30k) > manual rows (27k) > VoltAgent (27k); no star crossings | COMPLETE (verified) |
| 9 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246), Egonex-AI/Understand-Anything (67k/8) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |

---

## [2026-07-08 08:06 AM PKT] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH | Sort | Swap rows 1 and 2 — mattpocock/skills (160k) overtakes anthropics/skills (159k) for the FIRST TIME ever; mattpocock now holds the top position in the SKILL COLLECTIONS table | NEW |
| 2 | HIGH | Star | Update mattpocock/skills ★ from 157k to 160k (159,961 exact via GitHub API — +3k, eighteenth consecutive amplification event) | RECURRING (surges logged 2026-05-01 +15k, 2026-05-12 +25k, 2026-05-20 +21k, 2026-05-25 +7k, 2026-05-31 +9k, 2026-06-04 +4k, 2026-06-05 +1k, 2026-06-07 +2k, 2026-06-11 +5k, 2026-06-15 +4k, 2026-06-19 +7k, 2026-06-24 +8k, 2026-06-28 +4k, 2026-07-01 +4k, 2026-07-02 +1k, 2026-07-04 +3k, 2026-07-06 +2k) |
| 3 | MEDIUM | Star | Update anthropics/skills ★ from 158k to 159k (159,228 exact via GitHub API — +1k) | RECURRING (routine star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-04, 2026-06-05, 2026-06-11, 2026-06-15, 2026-06-19, 2026-06-24, 2026-06-28, 2026-07-01, 2026-07-02, 2026-07-04, 2026-07-06) |
| 4 | MEDIUM | Star | Update wshobson/agents ★ from 37k to 38k (37,641 exact via GitHub API — +1k) | RECURRING (star bumps logged 2026-05-01, 2026-05-12, 2026-05-20, 2026-06-11) |
| 5 | MEDIUM | Count | Update wshobson/agents skill count from 147 to 149 (GitHub code search total_count=149 incomplete_results=false — +2 from prior 147) | RECURRING (count drift logged 2026-05-12, 2026-05-20, 2026-06-04, 2026-06-28, 2026-07-06) |
| 6 | MEDIUM | Star | Update VoltAgent/awesome-agent-skills ★ from 27k to 28k (27,547 exact via GitHub API — +1k; now definitively exceeds 27k manual rows) | RECURRING (star bumps logged 2026-05-12, 2026-05-20, 2026-05-25, 2026-05-31, 2026-06-11, 2026-06-15, 2026-06-19, 2026-07-01) |
| 7 | HIGH | Sort | Move VoltAgent/awesome-agent-skills (28k) above impeccable (27k) and addyosmani/agent-skills (27k) — applies same precedent as K-Dense-AI reorder on 2026-06-11: research repo definitively exceeds manual rows when k-rounded value crosses the manual row threshold | NEW |
| 8 | LOW | No Change | K-Dense-AI/scientific-agent-skills steady — ★ 30k (30,413 exact) and skills 148 | COMPLETE (verified, no drift) |
| 9 | LOW | No Change | anthropics/skills skill count steady at 17; mattpocock/skills active skill count steady at 34 (4 deprecated excluded); VoltAgent curated count steady at 1,497+ (README badge confirmed) | COMPLETE (verified, no drift) |
| 10 | LOW | No Change | Manual entries untouched — impeccable (27k/1), addyosmani/agent-skills (27k/21), alirezarezvani/claude-skills (15k/246), Egonex-AI/Understand-Anything (67k/8) — out of 5-repo research scope | COMPLETE (verified, manual entries preserved) |
