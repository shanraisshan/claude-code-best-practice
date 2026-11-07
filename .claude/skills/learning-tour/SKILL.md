---
name: learning-tour
description: Use when /_learn is invoked — personalized Claude Code best-practices tour that surveys the user's experience level, computes a stop list, runs live demos, and tracks progress on a dedicated branch.
user-invocable: false
allowed-tools: WebFetch, Read, Write, Edit, Bash, AskUserQuestion
model: sonnet
---

# Learning Tour Skill

Personalized tour of this Claude Code best-practices repository. Survey-first, live-demo-driven, doc-citation-disciplined.

---

## Source Rules (apply at every stop — read this before anything else)

Training knowledge about Claude Code features can be months out of date. Fetch official docs before each stop so you're teaching from ground truth, not memory. See [`references/doc-surprises.md`](references/doc-surprises.md) for concrete examples of where training knowledge has diverged from the actual docs.

**Source labeling — use one of these on every factual claim:**
- `Per the official docs [URL]: ...`
- `Per this repo: ...`
- `The docs don't address this, but per this repo: ...`

**WebFetch fallback:** If WebFetch fails or returns no relevant content for a concept, tell the user: "I couldn't reach the official docs for [concept] — I'll use this repo's implementation as the primary source and flag anything I'm uncertain about." Continue the stop using repo artifacts + training knowledge with explicit source labels.

---

## How the Tour Works

The tour has 4 phases. Read [`references/phase-details.md`](references/phase-details.md) for the full instructions for each phase. This file gives you the overview.

### Phase 1 — Detect Mode, Survey if New

**Read `learning-tour-progress.md`** (if it exists) to determine mode:
- No file → **init**: run survey, build stop list
- File exists, no `completed:` date → **resume**: skip survey, go to Phase 3
- File exists, `readme_version` ≠ current main HEAD → **refresh**: run Refresh Logic, then Phase 3
- File exists, `readme_version` matches, `completed:` date present → **revisit**: inform user, offer to reset

See [`references/phase-details.md`](references/phase-details.md) → "Phase 1" for the survey questions and `branch_status` handling.

### Phase 2 — Build Stop List (init only)

Compute stop order, initialize `learning-tour-progress.md`, commit to `_learning-tour` branch.

See [`references/phase-details.md`](references/phase-details.md) → "Phase 2".

### Phase 3 — Visit Each Stop

For each pending stop (checkbox not checked):
1. Fetch official doc via WebFetch (Source Rules above)
2. Read the demo file from [`demos/`](demos/) — load only the file for the current stop
3. Present the concept (familiarity: what it is + where in repo; mastery: + gotchas + when NOT to use)
4. Run the designated live demo from the demo file — required action, not optional pointer
5. Mastery only: ask "What would you change about this design? What are its limits?"
6. Mark stop complete in progress file → commit → ask "next stop or go deeper?"

**Available demo files:** `checkpointing.md`, `commands-skills.md`, `subagents.md`
For stops without a demo file yet, present the concept from docs + repo artifacts and note that a demo file hasn't been written yet.

See [`references/phase-details.md`](references/phase-details.md) → "Phase 3" for per-stop depth guidance.

### Phase 4 — Completion

Write completion date, commit, show gap map.

See [`references/phase-details.md`](references/phase-details.md) → "Phase 4".

---

## Progress File

The progress file lives at `learning-tour-progress.md` in the repo root (not in `.claude/` — that would trigger permission prompts). It is committed to `_learning-tour` branch only.

See [`references/progress-schema.md`](references/progress-schema.md) for the full schema, stop list, and refresh logic.
