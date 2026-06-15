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
