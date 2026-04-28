---
description: Update the DEVELOPMENT WORKFLOWS table by researching all 11 workflow repos in parallel
---

# Workflow — Development Workflows

Update the DEVELOPMENT WORKFLOWS table in `README.md` by researching 11 repos in parallel. Launch agents, merge results, present changes, update table if approved.

---

## The 11 Repos

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
| 11 | `mattpocock/skills` | Matt Pocock |

---

## Table Format

The README table has these columns:

```markdown
| Name | ★ | Workflow | <img src="!/tags/a.svg" height="14"> | <img src="!/tags/c.svg" height="14"> | <img src="!/tags/s.svg" height="14"> |
```

- **Name**: `[Short Name](github-url)` — use project name, not owner/repo
- **★**: Star count rounded to `k` (e.g., 98k, 10k, 4.1k). Under 1000 show exact number
- **Workflow**: The canonical end-to-end pipeline as a flat left-to-right sequence of shields.io badges joined by ` → `. Each step is the actual command/skill/agent name from the repo (e.g. `/speckit.plan`, `bmad-create-prd`, `subagent-driven-development`). **Flat only** — no parentheticals, no English qualifiers ("loop", "per story", "parallel waves"), no `+` connectors. If a step has internal sub-steps that matter, list them as siblings in the main chain and **color them yellow (`fff3b0`)** to mark them as sub-loops; top-level steps stay light blue (`ddf4ff`). Trace the README's "how to use" / "workflow" section for the canonical happy path: idea → spec/plan → tasks → implement → review → ship.
- **Agent/Command/Skill counts**: Just the number (e.g., `25`, `0`, `108+`)

### Workflow badge encoding (shields.io)

Each step renders as an **HTML `<img>` tag with `align="middle"`** (not markdown image syntax) so the arrow stays vertically centered with the badges. Two background colors:

| Color | Hex | When to use |
|---|---|---|
| Light blue | `ddf4ff` | Top-level workflow steps |
| Soft yellow | `fff3b0` | Sub-loop steps (repeat per task/story/until verified inside a parent step) |

Template:

```html
<img src="https://img.shields.io/badge/<ENCODED>-ddf4ff" alt="<plain-label>" align="middle">    <!-- top-level -->
<img src="https://img.shields.io/badge/<ENCODED>-fff3b0" alt="<plain-label>" align="middle">    <!-- sub-loop -->
```

The `align="middle"` puts the badge's vertical center at the text baseline, so the ` → ` arrow ends up centered on each badge instead of sitting at badge-bottom. Without it the arrow visibly drops below the badges in GitHub's rendering.

After the table closes, **always include this legend** as a blockquote on its own line:

```markdown
> *Note: yellow tags are sub-loops — steps that repeat inside a parent step (e.g. per task, per story, or until a verify condition passes).*
```

Encoding rules for the `<ENCODED>` portion of the URL:

| Input character | Encoded as |
|---|---|
| `/` (leading slash) | `%2F` |
| `-` (literal dash) | `--` |
| `_` (literal underscore) | `__` |
| ` ` (space) | `_` |
| `+` | `%2B` |
| `.` and `:` | unchanged |

Examples:
- `/grill-me` → `%2Fgrill--me`
- `/speckit.plan` → `%2Fspeckit.plan`
- `/opsx:propose` → `%2Fopsx:propose`
- `bmad-create-epics-and-stories` → `bmad--create--epics--and--stories`

Join steps with the literal arrow ` → ` (space-arrow-space) **between** the closing `>` of one img tag and the opening `<` of the next.

**Do not** wrap sub-steps in parentheses or annotate them with English ("loop", "per story", "+", "parallel waves"). If a step has an internal loop, just list the inner step names as siblings in the flat chain.

**Sort order**: Sorted by stars descending (highest first).

---

## Phase 0: Read Current State

Read these files:

1. `README.md` — the `## ⚙️ DEVELOPMENT WORKFLOWS` table (note current stars, workflow pipelines, counts)
2. `changelog/development-workflows/changelog.md` — previous changelog entries

---

## Phase 1: Launch 2 Research Agents

**Immediately** spawn both agents in a **single message** (parallel). Each uses `subagent_type: "development-workflows-research-agent"`.

### Agent 1 (4 repos)

> Research these 4 Claude Code workflow repositories:
>
> **Repo 1: github/spec-kit** (https://github.com/github/spec-kit)
> **Repo 2: affaan-m/everything-claude-code** (https://github.com/affaan-m/everything-claude-code)
> **Repo 3: obra/superpowers** (https://github.com/obra/superpowers)
> **Repo 4: mattpocock/skills** (https://github.com/mattpocock/skills)
>
> For EACH repo, return:
>
> 1. **Stars** — use GitHub API `https://api.github.com/repos/{owner}/{repo}`, read `stargazers_count`. Round to `k`.
> 2. **Agent count** — count `.md` files in `agents/` or `.claude/agents/`. For obra, also count implicit sub-agents dispatched by skills. For mattpocock, count is 0 (skills-only repo).
> 3. **Skill count** — count folders in `skills/` or `.claude/skills/`. For mattpocock, count folders in `skills/` at repo root.
> 4. **Command count** — count `.md` files in `commands/` or `.claude/commands/`. For spec-kit, count files in `templates/commands/`. For mattpocock, count is 0 (skills serve as slash commands).
> 5. **Workflow** — the canonical end-to-end pipeline as a flat left-to-right sequence of step names joined by ` → `. Trace the README's "how to use" / "workflow" section for the happy path: idea → spec/plan → tasks → implement → review → ship. Use the actual command/skill/agent names from the repo. **Flat only** — no parentheses, no English qualifiers ("loop", "per story", "parallel waves"), no `+` connectors. If a step has internal sub-steps, list them as siblings in the main chain. Mark each step as either `top` (top-level) or `sub` (sub-loop, repeats inside a parent step) so the orchestrator can color it. Output as plain text — the orchestrator will encode each step into a shields.io HTML img badge.
> 6. **Notable changes** — any significant recent changes? New agents/skills/commands, major versions?
>
> Return structured report per repo:
> ```
> REPO: github/spec-kit
> STARS: <number>k
> AGENTS: <count>
> COMMANDS: <count>
> SKILLS: <count>
> WORKFLOW: <step1>(top) → <step2>(top) → <step3>(sub) → ... → <stepN>(top)
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
> 5. **Workflow** — the canonical end-to-end pipeline as a flat left-to-right sequence of step names joined by ` → `. Trace the README's "how to use" / "workflow" section for the happy path: idea → spec/plan → tasks → implement → review → ship. Use the actual command/skill/agent names from the repo. **Flat only** — no parentheses, no English qualifiers ("loop", "per story", "parallel waves"), no `+` connectors. If a step has internal sub-steps, list them as siblings in the main chain. Mark each step as either `top` (top-level) or `sub` (sub-loop, repeats inside a parent step) so the orchestrator can color it. Output as plain text — the orchestrator will encode each step into a shields.io HTML img badge.
> 6. **Notable changes** — any significant recent changes? New agents/skills/commands, major versions?
>
> Return structured report per repo:
> ```
> REPO: Fission-AI/OpenSpec
> STARS: <number>k
> AGENTS: <count>
> COMMANDS: <count>
> SKILLS: <count>
> WORKFLOW: <step1>(top) → <step2>(top) → <step3>(sub) → ... → <stepN>(top)
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
  <repo>: workflow updated: <old workflow> → <new workflow>
  ...

No Changes:
  <repo>: ✓ (all values match)
  ...

Action Items:
#  | Type        | Action                                | Status
1  | Star        | Update <repo> ★ from Xk to Yk         | NEW/RECURRING
2  | Count       | Update <repo> agents from X to Y      | NEW/RECURRING
3  | Workflow    | Update <repo> workflow pipeline       | NEW/RECURRING
4  | Sort        | Move <repo> (stars changed)           | NEW/RECURRING
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
- Update stars, counts, **and the Workflow column** per row
- Maintain sort order: stars descending (highest first)
- Match existing format exactly (icons, badge URLs, link style)
- For the Workflow column, encode each plain-text step the agent returned into a shields.io HTML img badge per the Table Format section. Use `ddf4ff` for steps marked `(top)` and `fff3b0` for steps marked `(sub)`. Join with ` → `.
- Ensure the legend `> *Note: yellow tags are sub-loops — steps that repeat inside a parent step (e.g. per task, per story, or until a verify condition passes).*` is present immediately after the table; add it if missing.

---

## Rules

1. **Launch BOTH agents in parallel** — single message, never sequential
2. **Never guess** — use data from agents only
3. **Don't auto-execute** — present report first, wait for approval
4. **ALWAYS append changelog** and **ALWAYS update badge** — mandatory
5. **Sort by stars descending** — highest stars first
6. **Workflow badges use HTML img with align="middle"** — `<img src="https://img.shields.io/badge/<ENCODED>-<COLOR>" alt="<plain-label>" align="middle">`. The `align="middle"` is required so the ` → ` arrow stays vertically centered with the badges. Two colors: `ddf4ff` for top-level steps, `fff3b0` for sub-loop steps. Encoding: `_` for spaces, `--` for hyphens, `__` for underscores, `%2F` for `/`, `%2B` for `+`. Dots and colons survive verbatim. Join steps with ` → `. Always update the Workflow column when any step name in the upstream repo changes.
7. **Agents, commands, skills are different** — count from their respective directories, don't conflate
8. **Round stars consistently** — `k` suffix (98k, 10k, 4.1k). Under 1000 show exact
9. **Compare with previous changelog** — mark items NEW, RECURRING, or RESOLVED
10. **Workflow column is mandatory and flat** — every row must have a Workflow cell. Trace the README's "how to use" / canonical happy path; do not synthesize a fictional pipeline. **No parentheses, no English qualifiers, no `+` connectors** — if a step has internal sub-steps, list them as siblings in the flat chain and color them yellow (`fff3b0`); top-level steps stay blue (`ddf4ff`).
11. **Sub-loop legend is mandatory** — immediately after the table, the line `> *Note: yellow tags are sub-loops — steps that repeat inside a parent step (e.g. per task, per story, or until a verify condition passes).*` must be present. Add it back if it was removed; never edit the wording.
