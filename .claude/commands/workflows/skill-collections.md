---
description: Update the SKILL COLLECTIONS table by researching all 5 skill-collection repos in parallel
---

# Workflow — Skill Collections

Update the SKILL COLLECTIONS table in `README.md` by researching 5 repos in parallel. Launch a research agent, merge results, present changes, update table if approved.

---

## The 5 Repos

| # | Repo | Owner |
|---|------|-------|
| 1 | `anthropics/skills` | Anthropic (official) |
| 2 | `wshobson/agents` | William Shobson |
| 3 | `mattpocock/skills` | Matt Pocock |
| 4 | `K-Dense-AI/scientific-agent-skills` | K-Dense-AI |
| 5 | `VoltAgent/awesome-agent-skills` | VoltAgent (curated awesome-list) |

---

## Table Format

The README table has these columns:

```markdown
| Name | ★ | <img src="!/tags/s.svg" height="14"> |
```

- **Name**: `[Short Name](github-url)` — use repo's short name (e.g., `mattpocock/skills`, or just `skills` if owner is the project), not the full owner/repo unless ambiguous
- **★**: Star count rounded to `k` (e.g., 125k, 35k, 1.2k). Under 1000 show exact number
- **Skill count**: Just the number. For awesome-lists where skills are *links* not files, use `N+ (curated list)` form

**Sort order**: Sorted by stars descending (highest first).

---

## Phase 0: Read Current State

Read these files:

1. `README.md` — the `## 🧰 SKILL COLLECTIONS` table (note current stars and skill counts)
2. `changelog/skill-collections/changelog.md` — previous changelog entries (may not exist yet)

---

## Phase 1: Launch Research Agent

**Immediately** spawn one `development-workflows-research-agent` covering all 5 repos. (The existing research agent is generic — it counts skills/stars/etc. for any repo.)

> Research these 5 Claude Code **skill-collection** repositories. Each is primarily a library of `SKILL.md` files, NOT a full workflow methodology.
>
> **Repo 1: anthropics/skills** (https://github.com/anthropics/skills) — official Anthropic skills repo
> **Repo 2: wshobson/agents** (https://github.com/wshobson/agents) — plugin-scoped skills (skills nested under domain plugins)
> **Repo 3: mattpocock/skills** (https://github.com/mattpocock/skills) — TypeScript-focused
> **Repo 4: K-Dense-AI/scientific-agent-skills** (https://github.com/K-Dense-AI/scientific-agent-skills) — science/research vertical
> **Repo 5: VoltAgent/awesome-agent-skills** (https://github.com/VoltAgent/awesome-agent-skills) — curated awesome-list (links to external skills, not SKILL.md files in repo)
>
> For EACH repo, return:
>
> 1. **Stars** — use GitHub API `https://api.github.com/repos/{owner}/{repo}`, read `stargazers_count`. Round to `k`.
> 2. **Skill count** — count `SKILL.md` files in the repo via the GitHub git tree API:
>    `https://api.github.com/repos/{owner}/{repo}/git/trees/HEAD?recursive=1` and grep paths for `SKILL.md`.
>    - For `wshobson/agents`: skills are nested inside `plugins/<domain>/skills/` — count all SKILL.md across all plugins.
>    - For `VoltAgent/awesome-agent-skills`: count the *listed* skills in README.md (e.g., bullets / table rows). Mark explicitly as "curated list, not files".
>    - For `K-Dense-AI/scientific-agent-skills`: subdirectories under `skills/` may use SKILL.md or `.md`; count whichever the repo uses, and report which.
>    - For `anthropics/skills`: skills live in subdirectories under `skills/` with `SKILL.md` inside.
>    - For `mattpocock/skills`: include only **active** skills, not deprecated ones (note both numbers if obvious).
> 3. **Notable changes** — any significant additions or removals in last 30 days?
>
> Return structured report per repo:
> ```
> REPO: anthropics/skills
> STARS: <number>k (<exact>)
> SKILLS: <count> (<file pattern used, e.g., "SKILL.md files via git tree">)
> NOTES: <anything unusual — flat .md vs SKILL.md, deprecated skills, language variants, curated-list disclaimer>
> CHANGES: <changes or "No significant changes">
> CONFIDENCE: <0-1>
> ```

---

## Phase 2: Compare & Report

**Wait for the agent.** Then compare findings against the current table and present:

```
Skill Collections — Update Report
══════════════════════════════════

Changes Found:
  <repo>: ★ <old>k → <new>k | skills <old>→<new>
  ...

No Changes:
  <repo>: ✓ (all values match)
  ...

Action Items:
#  | Type   | Action                              | Status
1  | Star   | Update <repo> ★ from Xk to Yk       | NEW/RECURRING
2  | Count  | Update <repo> skills from X to Y    | NEW/RECURRING
3  | Sort   | Move <repo> (rank changed)          | NEW/RECURRING
4  | Add    | New collection candidate: <repo>     | NEW
```

Compare with previous changelog entries and mark items as `NEW`, `RECURRING`, or `RESOLVED`.

---

## Phase 2.5: Append to Changelog

**MANDATORY** — always execute before presenting to user.

Read `changelog/skill-collections/changelog.md`, then **append** a new entry. If the file doesn't exist, create it with a Status Legend then the first entry.

```markdown
---

## [<YYYY-MM-DD HH:MM AM/PM PKT>] Skill Collections Update

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH/MED/LOW | <type> | <action> | <status> |
```

Get time via `TZ=Asia/Karachi date "+%Y-%m-%d %I:%M %p PKT"`. Status must be one of:
- `COMPLETE (reason)` | `INVALID (reason)` | `ON HOLD (reason)`

Always append, never overwrite.

---

## Phase 2.6: Update Last Updated Badge

**MANDATORY** — execute after Phase 2.5.

Update the badge on line 4 of `README.md`. Get time via `TZ=Asia/Karachi date "+%b %d, %Y %-I:%M %p PKT"`, URL-encode it, replace the date in the badge. Do NOT log this as an action item.

---

## Phase 3: Execute

Ask user: **(1) Execute all** | **(2) Execute specific** | **(3) Skip**

When executing, edit the `## 🧰 SKILL COLLECTIONS` table in `README.md`:
- Update stars and skill counts per row
- Maintain sort order: stars descending (highest first)
- Match existing format exactly (link style, k-suffix on stars)

---

## Rules

1. **One research agent, 5 repos** — single message, parallel sub-fetches inside
2. **Never guess** — use data from the agent only
3. **Don't auto-execute** — present report first, wait for approval
4. **ALWAYS append changelog** and **ALWAYS update badge** — mandatory
5. **Sort by stars descending** — highest stars first
6. **Round stars consistently** — `k` suffix (125k, 35k, 1.2k). Under 1000 show exact
7. **Awesome-lists are different** — for repos that link to external skills (VoltAgent), the count is "items listed in README", not files in repo; always annotate `(curated list)`
8. **Compare with previous changelog** — mark items NEW, RECURRING, or RESOLVED
9. **Reuse `development-workflows-research-agent`** — do NOT create a new agent
