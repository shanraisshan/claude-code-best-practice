# Progress File Schema

File location: `learning-tour-progress.md` at repo root (NOT inside `.claude/`).
Branch: `_learning-tour` only. Never commit this file to `main`.

---

## Full Schema

```markdown
# Learning Tour Progress

## Session
started: YYYY-MM-DD
completed:                           ← blank until Phase 4
readme_version: <git commit hash>    ← hash of main HEAD when README was last read

## Goal
familiarity                          ← or: mastery

## Concepts
<!-- Cached from README.md CONCEPTS table at readme_version -->
<!-- Refresh rules below apply when readme_version ≠ current main HEAD -->
| Concept           | Level                             |
|-------------------|-----------------------------------|
| Subagents         | unfamiliar / familiar / mastery   |
| Commands          | unfamiliar / familiar / mastery   |
| Skills            | unfamiliar / familiar / mastery   |
| ...               | ...                               |

## Hot Features
<!-- Cached from README.md 🔥 Hot section at readme_version -->
| Feature     | Tried     |
|-------------|-----------|
| Auto Mode   | yes / no  |
| ...         | ...       |

## Stops
<!-- Order computed once at Phase 2 of first run; this file is the order authority on resume -->
<!-- recommended_first encoded inline; command/skill follow file order, never recompute -->
- [ ] Checkpointing
- [ ] Memory / CLAUDE.md
- [ ] Commands + Skills                recommended_first: none
- [ ] Subagents                        recommended_first: Commands + Skills
- [ ] context: fork                    recommended_first: Commands + Skills, Subagents
- [ ] MCP Servers
- [ ] Hooks
- [ ] Plugins                          recommended_first: Commands + Skills, Subagents, MCP Servers
- [ ] Hot Features                     ← always last; scoped to untried rows from Hot table
```

---

## Skip Threshold

**Mode is NOT a stored field.** Derive it from stop structure:
- Stops with only top-level checkboxes → familiarity pass
- Stops with sub-bullet milestones → mastery pass

**Skip rules:**
- Familiarity pass: skip a stop if concept `level ≥ familiar`
- Mastery pass: skip only if `level = mastery`

---

## Mastery Sub-bullet Format

When goal is mastery, stops include sub-bullet milestones to enable partial-stop resume:

```markdown
- [ ] Commands + Skills                recommended_first: none
  - [ ] concept explained
  - [ ] live demo completed
  - [ ] gotcha discussed
  - [ ] user articulated a design decision
```

---

## Refresh Logic

Run when `readme_version` ≠ `git log main --oneline -1 | awk '{print $1}'`.

1. Re-read `README.md`; diff CONCEPTS and Hot rows against cached rows in progress file
2. **New CONCEPTS row**: fetch its official doc via WebFetch; infer `recommended_first` from dependencies; insert stop at correct position; `level = unfamiliar`
3. **Removed CONCEPTS row**: mark stop `deprecated`; drop from pending stops
4. **Hot feature graduated to CONCEPTS**: carry `tried: yes` → `level: familiar`
5. Update `readme_version` to current main HEAD; commit progress file
6. Tell the user: "README has changed since your last session — N new concepts, stop list updated"

---

## Git Commit Messages

- Initialize: `git commit -m "learning-tour: initialize progress"`
- Per stop: `git commit -m "learning-tour: complete [Stop Name]"`
- Refresh: `git commit -m "learning-tour: refresh stop list (readme updated)"`
- Complete: `git commit -m "learning-tour: complete"`
