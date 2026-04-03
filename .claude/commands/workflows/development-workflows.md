---
description: Update the DEVELOPMENT WORKFLOWS table by researching all 10 workflow repos in parallel
---

# Workflow — Development Workflows

Update the DEVELOPMENT WORKFLOWS table in `README.md` by researching 10 repos in parallel. Launch agents, merge results, present changes, update table if approved.

---

## The 10 Repos

| # | Repo | Owner |
|---|------|-------|
| 1 | `github/spec-kit` | GitHub (John Lam / Den Delimarsky) |
| 2 | `Fission-AI/OpenSpec` | Fission-AI (@0xTab) |
| 3 | `humanlayer/humanlayer` | HumanLayer (Dex Horthy) |
| 4 | `affaan-m/everything-claude-code` | Affaan Mustafa |
| 5 | `gsd-build/get-shit-done` | Lex Christopherson |
| 6 | `obra/superpowers` | Jesse Vincent |
| 7 | `garrytan/gstack` | Garry Tan (YC CEO) |
| 8 | `bmad-code-org/BMAD-METHOD` | BMAD Code Org |
| 9 | `EveryInc/compound-engineering-plugin` | Every.to |
| 10 | `Yeachan-Heo/oh-my-claudecode` | Yeachan Heo (@bellman_ych) |

---

## Table Format

The README table has these columns:

```markdown
| Name | ★ | Uniqueness | Plan | <img src="!/tags/a.svg" height="14"> | <img src="!/tags/c.svg" height="14"> | <img src="!/tags/s.svg" height="14"> |
```

- **Name**: `[Short Name](github-url)` — use project name, not owner/repo
- **★**: Star count rounded to `k` (e.g., 98k, 10k, 4.1k). Under 1000 show exact number
- **Uniqueness**: 2-3 shields.io badge tags using `![tag](https://img.shields.io/badge/TAG-ddf4ff)`. Underscores for spaces, `--` for hyphens, `%2B` for `+`, `%2F` for `/`
- **Plan**: Icon + linked name of the Plan implementation. Icon is `<img src="!/tags/c.svg" height="14">` for command, `<img src="!/tags/a.svg" height="14">` for agent, `<img src="!/tags/s.svg" height="14">` for skill. Name links to the actual file in the repo
- **Agent/Command/Skill counts**: Just the number (e.g., `25`, `0`, `108+`)

**Sort order**: Sorted by stars descending (highest first). Do NOT group by Plan type.

---

## Phase 0: Read Current State

Read these files:

1. `README.md` — the `## ⚙️ DEVELOPMENT WORKFLOWS` table (note current stars, tags, Plan links, counts)
2. `changelog/development-workflows/changelog.md` — previous changelog entries

---

## Phase 1: Launch 2 Research Agents

**Immediately** spawn both agents in a **single message** (parallel). Each uses `subagent_type: "development-workflows-research-agent"`.

### Agent 1 (3 repos)

> Research these 3 Claude Code workflow repositories:
>
> **Repo 1: github/spec-kit** (https://github.com/github/spec-kit)
> **Repo 2: affaan-m/everything-claude-code** (https://github.com/affaan-m/everything-claude-code)
> **Repo 3: obra/superpowers** (https://github.com/obra/superpowers)
>
> For EACH repo, return:
>
> 1. **Stars** — use GitHub API `https://api.github.com/repos/{owner}/{repo}`, read `stargazers_count`. Round to `k`.
> 2. **Agent count** — count `.md` files in `agents/` or `.claude/agents/`. For obra, also count implicit sub-agents dispatched by skills.
> 3. **Skill count** — count folders in `skills/` or `.claude/skills/`.
> 4. **Command count** — count `.md` files in `commands/` or `.claude/commands/`. For spec-kit, count files in `templates/commands/`.
> 5. **Plan implementation** — find the Plan/planning agent, skill, or command. Return its name, type (agent/skill/command), and file path.
> 6. **Uniqueness tags** — 2-3 short tags (2-3 words each) capturing what makes this workflow unique.
> 7. **Notable changes** — any significant recent changes? New agents/skills/commands, major versions?
>
> Return structured report per repo:
> ```
> REPO: github/spec-kit
> STARS: <number>k
> AGENTS: <count>
> COMMANDS: <count>
> SKILLS: <count>
> PLAN: <name> (<type>) — <file-path>
> TAGS: <tag1>, <tag2>, <tag3>
> CHANGES: <changes or "No significant changes">
> ```

### Agent 2 (7 repos)

> Research these 7 Claude Code workflow repositories:
>
> **Repo 1: Fission-AI/OpenSpec** (https://github.com/Fission-AI/OpenSpec)
> **Repo 2: humanlayer/humanlayer** (https://github.com/humanlayer/humanlayer)
> **Repo 3: gsd-build/get-shit-done** (https://github.com/gsd-build/get-shit-done)
> **Repo 4: garrytan/gstack** (https://github.com/garrytan/gstack)
> **Repo 5: bmad-code-org/BMAD-METHOD** (https://github.com/bmad-code-org/BMAD-METHOD)
> **Repo 6: EveryInc/compound-engineering-plugin** (https://github.com/EveryInc/compound-engineering-plugin)
> **Repo 7: Yeachan-Heo/oh-my-claudecode** (https://github.com/Yeachan-Heo/oh-my-claudecode)
>
> For EACH repo, return:
>
> 1. **Stars** — use GitHub API `https://api.github.com/repos/{owner}/{repo}`, read `stargazers_count`. Round to `k`.
> 2. **Agent count** — count `.md` files in `agents/` or `.claude/agents/`. For BMAD, count agent-persona skills in `src/bmm-skills/`. For compound-engineering-plugin, count `.md` files across all subdirectories of `plugins/compound-engineering/agents/`. For oh-my-claudecode, count `.md` files in `agents/` at repo root.
> 3. **Skill count** — count folders in `skills/` or `.claude/skills/`. For gstack, skills are root-level directories with SKILL.md. For BMAD, count all skills in `src/bmm-skills/` and `src/core-skills/`. For compound-engineering-plugin, count folders in `plugins/compound-engineering/skills/` plus `plugins/coding-tutor/skills/`. For oh-my-claudecode, count folders in `skills/` at repo root.
> 4. **Command count** — count `.md` files in `commands/` or `.claude/commands/`. For GSD, count in `commands/gsd/`. For OpenSpec, count `/opsx:*` commands. For BMAD, count is 0 (commands generated at install time). For compound-engineering-plugin, count `.md` files in `.claude/commands/` plus `plugins/coding-tutor/commands/`. For oh-my-claudecode, count is 0 (skills serve as slash commands).
> 5. **Plan implementation** — find the Plan/planning agent, skill, or command. Return its name, type (agent/skill/command), and file path.
> 6. **Uniqueness tags** — 2-3 short tags (2-3 words each) capturing what makes this workflow unique.
> 7. **Notable changes** — any significant recent changes? New agents/skills/commands, major versions?
>
> Return structured report per repo:
> ```
> REPO: Fission-AI/OpenSpec
> STARS: <number>k
> AGENTS: <count>
> COMMANDS: <count>
> SKILLS: <count>
> PLAN: <name> (<type>) — <file-path>
> TAGS: <tag1>, <tag2>, <tag3>
> CHANGES: <changes or "No significant changes">
> ```

---

## Phase 2: Compare & Report

**Wait for both agents.** Then compare findings against the current table and present:

```
Development Workflows — Update Report
══════════════════════════════════════

Changes Found:
  <repo>: ★ <old>k → <new>k | agents <old>→<new> | commands <old>→<new> | skills <old>→<new>
  <repo>: tags updated: <old tags> → <new tags>
  <repo>: Plan link changed: <old> → <new>
  ...

No Changes:
  <repo>: ✓ (all values match)
  ...

Action Items:
#  | Type        | Action                              | Status
1  | Star        | Update <repo> ★ from Xk to Yk       | NEW/RECURRING
2  | Count       | Update <repo> agents from X to Y     | NEW/RECURRING
3  | Tags        | Update <repo> tags                   | NEW/RECURRING
4  | Plan        | Update <repo> Plan link              | NEW/RECURRING
5  | Sort        | Move <repo> (Plan type changed)      | NEW/RECURRING
```

Compare with previous changelog entries and mark items as `NEW`, `RECURRING`, or `RESOLVED`.

---

## Phase 2.5: Append to Changelog

**MANDATORY** — always execute before presenting to user.

Read `changelog/development-workflows/changelog.md`, then **append** a new entry. If the file doesn't exist, create it with a Status Legend then the first entry.

```markdown
---

## [<YYYY-MM-DD HH:MM AM/PM PKT>] Development Workflows Update

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

When executing, edit the `## ⚙️ DEVELOPMENT WORKFLOWS` table in `README.md`:
- Update stars, tags, Plan links, counts per row
- Maintain sort order: stars descending (highest first). Do NOT group by Plan type
- Match existing format exactly (icons, badge URLs, link style)

---

## Rules

1. **Launch BOTH agents in parallel** — single message, never sequential
2. **Never guess** — use data from agents only
3. **Don't auto-execute** — present report first, wait for approval
4. **ALWAYS append changelog** and **ALWAYS update badge** — mandatory
5. **Sort by stars descending** — highest stars first, do NOT group by Plan type
6. **Tags use shields.io** — `![tag](https://img.shields.io/badge/TAG-ddf4ff)` with `_` for spaces, `--` for hyphens
7. **Plan links must point to actual files** — not repo root
8. **Agents, commands, skills are different** — count from their respective directories, don't conflate
9. **Round stars consistently** — `k` suffix (98k, 10k, 4.1k). Under 1000 show exact
10. **Compare with previous changelog** — mark items NEW, RECURRING, or RESOLVED
