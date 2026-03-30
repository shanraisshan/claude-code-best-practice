---
description: Start or resume a personalized learning tour of this Claude Code best-practices repo
---

# Learning Tour Entry Point

Personalized, interactive tour of this Claude Code best-practices repository.

## What This Command Does

1. Read `README.md` — always; live source of truth for concepts and hot features
2. Set up the `_learning-tour` branch (underscore = infrastructure branch, not a workflow)
3. Hand off to the `learning-tour` skill with branch context

---

## Step 1: Read README.md

Read the full `README.md` now. You'll need the CONCEPTS table and the Hot Features section (🔥) to drive the survey and stop list. Do not proceed without reading it.

---

## Step 2: Branch Setup

Run these checks in order:

```bash
git branch --list _learning-tour
```

**If the branch does NOT exist:**
- Run: `git checkout -b _learning-tour` (branches from HEAD — preserves any in-progress work on the current branch)
- Tell the user: "Created a new `_learning-tour` branch to track your progress."
- Pass `branch_status=new` to the skill.

**If the branch already exists:**
- Run: `git checkout _learning-tour`
- Tell the user: "Switched to your `_learning-tour` branch."
- Pass `branch_status=existing` to the skill.

---

## Step 3: Invoke the Skill

Use the `Skill` tool:

```
Skill("learning-tour", args: "branch_status=<new|existing> $ARGUMENTS")
```

Pass `$ARGUMENTS` through unchanged — the user may have typed `resume`, `revisit`, or nothing.

The skill handles all mode detection, survey, stop sequencing, and progress tracking from here.
