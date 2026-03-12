---
description: Find and prioritize technical debt with verification-ready fixes
---

Run a fast technical debt sweep for the current repo.

## Output format
1. **Top 10 debt items** (severity, file/path, why it matters)
2. **Quick wins (today)** vs **deeper fixes (later)**
3. **Fix plan** with exact commands/files to change
4. **Verification checklist** (tests/build/lint/runtime checks)

## Rules
- Prioritize user-facing breakage and deployment blockers first.
- Include at least one no-risk cleanup item.
- If any proposed fix is risky, mark it and provide rollback steps.
- Keep it concise and actionable.
