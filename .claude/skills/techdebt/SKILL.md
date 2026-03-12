---
name: techdebt
description: Scan a repository for technical debt and return a prioritized, verification-ready action plan
user-invocable: true
---

# Tech Debt Skill

Run a fast technical debt audit for the current repository.

## Output
1. Top 10 debt items (severity, file/path, impact)
2. Quick wins (today) vs deeper fixes (later)
3. Concrete patch plan
4. Verification checklist (build/test/lint/runtime)

## Rules
- Prioritize user-facing breakage and deployment blockers first.
- Include at least one low-risk cleanup item.
- Mark risky refactors and include rollback notes.
- Keep output concise and directly actionable.
