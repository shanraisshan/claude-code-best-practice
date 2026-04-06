# Production Multi-Agent Orchestration Patterns

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
</tr>
</table>

## Beyond Single-Agent Workflows

The [orchestration-workflow](../orchestration-workflow/) example shows Command → Agent → Skill for a single task. But what happens when a task needs **multiple specialized agents** working in parallel?

This document covers patterns for coordinating 3+ agents on complex tasks — preventing file conflicts, enforcing quality gates, and handling failures.

## The Coordination Problem

When you run multiple Claude Code agents simultaneously, three things go wrong fast:

1. **File conflicts** — Agent A modifies `src/auth.ts` while Agent B also needs it
2. **Duplicate work** — Two agents independently investigate the same bug
3. **No verification** — Agent says "done" but nobody checks if it actually worked

## Pattern 1: Task Registry (Anti-Duplication)

Before any agent starts work, register the task:

```json
// .claude/task-registry.json
{
  "tasks": [
    {
      "id": "SEC-001",
      "description": "Audit auth middleware for OWASP Top 10",
      "agent": "security-reviewer",
      "files": ["src/middleware/auth.ts", "src/routes/login.ts"],
      "status": "in_progress",
      "started": "2026-04-08T14:00:00Z"
    }
  ]
}
```

Before delegating to an agent, check:
```bash
# Is anyone already working on these files?
grep -l "auth.ts" .claude/task-registry.json
```

If there's a conflict: queue the second task. First agent completes → second agent starts.

**Result**: Zero duplicate work across 10,000+ tasks in our production system.

## Pattern 2: Quality Gates (Trust But Verify)

Never accept "done" from an agent without evidence:

```bash
# After code-architect reports "feature complete":

# 1. Did files actually change?
git diff --stat

# 2. Do tests pass?
npm test

# 3. Were secrets introduced?
grep -rn "sk-\|AKIA\|password\s*=" src/ --include="*.ts"

# 4. Any regressions?
git diff HEAD~1 -- "*.test.*" "*.spec.*"
```

**Rule**: Agent output is a CLAIM. Test output is EVIDENCE. Only evidence closes a task.

**Impact**: ~60% fewer "done but actually broken" incidents after implementing quality gates.

## Pattern 3: Parallel Independence Check

Before launching agents in parallel, verify file independence:

```
Task: "Add rate limiting + fix auth bug + update API docs"

Agent 1 (code-architect): src/middleware/rate-limit.ts (NEW file)
Agent 2 (code-architect): src/middleware/auth.ts (EXISTING)  
Agent 3 (doc-updater):    docs/api-reference.md

File overlap? None → Safe to parallelize
```

```
Task: "Refactor auth + add auth tests"

Agent 1: src/middleware/auth.ts (MODIFY)
Agent 2: src/middleware/auth.test.ts (MODIFY, imports from auth.ts)

Dependency? Yes (tests import the module being refactored)
→ Sequence: Agent 1 first, Agent 2 after
```

**Max parallel agents**: 5. Beyond this, coordination overhead exceeds speed gains.

## Pattern 4: Delegation Prompts That Work

Bad delegation (causes drift):
```
Fix the authentication bugs.
```

Good delegation (bounded scope):
```
Agent(
  name="auth-fix",
  prompt="Fix the null check on line 47 of src/middleware/auth.ts.
          The req.user object can be undefined when JWT expires.
          Add a guard clause before the role check on line 52.
          Run: npm test -- --grep 'auth' to verify.
          Do NOT modify any other files."
)
```

The constraint-to-capability ratio matters: **30% of your delegation prompt should be constraints** ("do NOT", "NEVER", "ONLY these files"). Without constraints, agents expand their scope.

## Pattern 5: Orchestrator Identity Block

The orchestrator agent needs a strong NOT-block to prevent it from doing work instead of routing it:

```markdown
## What You Are NOT
- NOT a code writer — delegate to code-architect
- NOT a security auditor — delegate to security-reviewer  
- NOT a test writer — delegate to tdd-guide
- NOT a doc writer — delegate to doc-updater
```

**Impact**: ~35% reduction in task drift when orchestrators have explicit NOT-blocks.

Without this, the orchestrator starts "helping" with code — which defeats the purpose of having specialized agents.

## Pattern 6: Heartbeat Monitoring

Every 30 minutes, check agent progress:

```bash
# Which tasks are in progress?
cat .claude/task-registry.json | python3 -c "
import json, sys
from datetime import datetime, timedelta
tasks = json.load(sys.stdin)['tasks']
for t in tasks:
    if t['status'] == 'in_progress':
        started = datetime.fromisoformat(t['started'].replace('Z',''))
        age = datetime.utcnow() - started
        flag = ' ⚠️ STALE' if age > timedelta(hours=1) else ''
        print(f'{t[\"id\"]}: {t[\"agent\"]} ({age.seconds//60}m){flag}')
"
```

Stale agent (>1 hour on a task)? Options:
1. Check if it's blocked → add context and retry
2. Reduce scope → split the task smaller
3. Reassign → different agent might handle it better

## Putting It Together

A complete orchestration flow for "Add rate limiting to the API":

```
1. DECOMPOSE
   - Subtask A: Implement rate-limit middleware (code-architect)
   - Subtask B: Add rate-limit tests (tdd-guide)  
   - Subtask C: Security review the implementation (security-reviewer)
   - Subtask D: Update API docs (doc-updater)

2. DEPENDENCY CHECK
   - A must complete before B and C (they need the code)
   - D can run in parallel with B and C (just docs)

3. REGISTER
   - Register all 4 tasks in .claude/task-registry.json
   
4. EXECUTE
   - Phase 1: Launch A + D in parallel
   - Phase 2: After A completes → launch B + C in parallel
   
5. QUALITY GATE
   - Each agent: run verification command
   - Orchestrator: run full test suite + check for regressions
   
6. CLOSE
   - Update registry: all tasks → "done"
   - Git commit with clear message
```

## Common Mistakes

| Mistake | What Happens | Fix |
|---------|-------------|-----|
| Orchestrator writes code | Specialized agents sit idle | Strong NOT-block in identity |
| No file-level conflict check | Agents overwrite each other | Task registry with file lists |
| Skipping quality gate | "Done" tasks are actually broken | Mandatory verification commands |
| Too many parallel agents | Coordination bugs, merge conflicts | Cap at 5 simultaneous |
| Vague delegation prompts | Agents expand scope unpredictably | 30% constraints in every prompt |

---

## Resources

- [Multi-Agent Orchestrator Agent](https://github.com/milkomida77/everything-claude-code/blob/feat/multi-agent-orchestrator/agents/multi-agent-orchestrator.md) — Ready-to-use orchestrator agent for Claude Code
- [Guardian Agent Prompts](https://github.com/milkomida77/guardian-agent-prompts) — 49 production-tested system prompts, free orchestrator + 7 n8n templates
- [Orchestration Workflow](../orchestration-workflow/) — Single-agent Command → Agent → Skill pattern (this repo)
