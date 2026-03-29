# Phase Details

Full instructions for each phase of the learning tour. Read from SKILL.md as needed — no need to load this file upfront.

---

## Phase 1 — Detect Mode and Survey

### Mode Detection

Read `learning-tour-progress.md` (if it exists):

| Condition | Mode |
|-----------|------|
| File does not exist | **init** |
| File exists, no `completed:` date | **resume** |
| File exists, `readme_version` ≠ current main HEAD | **refresh** |
| File exists, `completed:` date present, readme current | **revisit** |

Get current main HEAD hash: `git log main --oneline -1 | awk '{print $1}'`

**If mode is resume or refresh:** skip survey; go to Phase 3 (after running Refresh Logic if refresh).

**If mode is revisit:** tell the user their tour is already complete, show the gap map from Phase 4, and offer to reset a specific stop by editing its checkbox back to `[ ]`.

**If branch_status=new was passed from the command:** mode must be init; no need to check.

---

### Init: Pre-survey (1 AskUserQuestion call)

Ask the user their goal:

> "What's your goal for this tour?"
> - **Familiarity** — understand what exists, get hands-on with each concept
> - **Mastery** — go deep on things you've only surface-level tried; focus on gotchas and design decisions

---

### Init: Survey (2 AskUserQuestion calls)

Both questions are driven by the README.md content you already read in the command — do not hardcode topic lists.

**Q1 — CONCEPTS checklist** (present rows from README.md CONCEPTS table):

- Familiarity wording: "Which of these have you tried or configured before?"
- Mastery wording: "Which of these have you created yourself and then had to fix or extend?"

**Q2 — Hot Features checklist** (present rows from README.md 🔥 Hot section):

"Which of these have you tried?"

Record answers as concept levels and hot feature tried/no status. These drive skip thresholds in Phase 2.

---

## Phase 2 — Build Stop List (init only)

1. For each CONCEPTS row not meeting skip threshold: add as a stop
2. Append Hot Features as the final stop (always; scope to untried rows from Q2)
3. Order stops respecting `recommended_first` — encode inline on each stop entry (see progress-schema.md)
4. If mastery goal: add sub-bullet milestones to each stop
5. Get `readme_version`: `git log main --oneline -1 | awk '{print $1}'`
6. Write `learning-tour-progress.md` to repo root with full schema (see progress-schema.md)
7. Stage and commit: `git add learning-tour-progress.md && git commit -m "learning-tour: initialize progress"`

---

## Phase 3 — Visit Each Stop

Iterate through stops in file order. For each stop where the top-level checkbox is `[ ]`:

### Per-stop sequence

**1. Fetch official docs**

WebFetch from `https://code.claude.ai/docs/` — search for the concept page. If that root doesn't work, try `https://docs.anthropic.com/en/docs/claude-code/`. Apply WebFetch fallback rule from SKILL.md Source Rules if fetch fails.

**2. Load demo file**

Read the corresponding file from `demos/` for the current stop. Only read the file you need — progressive disclosure means not loading all demos upfront.

| Stop | Demo file |
|------|-----------|
| Checkpointing | `demos/checkpointing.md` |
| Commands + Skills | `demos/commands-skills.md` |
| Subagents | `demos/subagents.md` |
| All others | _(no demo file yet — see note below)_ |

If no demo file exists for a stop, present the concept from docs + repo artifacts. Note at the end: "A hands-on demo file for this stop hasn't been written yet — if you want to contribute one, see `demos/commands-skills.md` as a template."

**3. Present concept**

- **Familiarity depth**: what it is, where it lives in the repo, one concrete example
- **Mastery depth**: everything above + gotchas + when NOT to use it + non-obvious design decisions

**4. Run the live demo**

Follow the demo file's Steps section exactly. The demo is a required action — not an optional "you could also try..." pointer. The live demo is where the best learning moments come from.

**5. Mastery follow-up** (mastery mode only)

After the demo: "What would you change about this design? What are its limits?"

Let the user answer before moving on. This surfaces design intuitions the demo alone can't teach.

**6. Mark progress and commit**

Update the checkbox in `learning-tour-progress.md`:
- Familiarity: change `[ ]` to `[x]` on the stop line
- Mastery: change sub-bullet checkboxes as each milestone completes; check stop line when all sub-bullets done

Commit: `git add learning-tour-progress.md && git commit -m "learning-tour: complete [Stop Name]"`

Ask: "Ready for the next stop, or want to go deeper on this one?"

---

## Phase 4 — Completion

1. Write to progress file: `completed: YYYY-MM-DD` (use today's date)
2. Commit: `git add learning-tour-progress.md && git commit -m "learning-tour: complete"`
3. Show gap map — full Concepts table with current levels:
   - Toured stops (with `[x]`)
   - Skipped stops and why (level was already high enough)
   - Stops available to revisit
4. Tell the user how to revisit a skipped stop: edit `learning-tour-progress.md`, change `[x]` back to `[ ]` on the desired stop, then run `/_learn`.
