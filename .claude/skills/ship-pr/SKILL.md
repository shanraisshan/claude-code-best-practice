---
name: ship-pr
description: Safe PR workflow with a strict human approval gate before merge
user-invocable: true
---

# Ship PR Skill

## Required flow
1. Create branch
2. Commit changes
3. Push branch
4. Open PR
5. Share PR link + concise summary
6. WAIT for explicit human approval
7. Merge only after approval

## Hard rule
Never merge without explicit approval in the same thread/session.
