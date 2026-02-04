---
description: Execute phased implementation with validation gates
argument-hint: "<feature-slug> [--phase N] [--validate-only]"
---

## User Input

```text
$ARGUMENTS
```

You **MUST** parse the user input to extract the feature slug (the folder name in `rpi/`).

## Purpose

This command executes phased implementation of features based on planning documentation. It orchestrates specialized agents, enforces validation gates, and ensures constitutional compliance throughout implementation.

**Prerequisites**:
- Feature folder exists at `rpi/{feature-slug}/`
- Planning completed (`rpi/{feature-slug}/plan/PLAN.md` exists)

**Output Location**: `rpi/{feature-slug}/implement/`

**This is Step 4 of the RPI Workflow** (final step - actual implementation).

## Flags

- `--phase N`: Execute specific phase number (1-8), if omitted starts from phase 1
- `--validate-only`: Only validate current phase, don't implement
- `--skip-validation`: Skip validation gate and proceed (use with caution)

## Available Agents

All agents use **Opus model** for maximum quality.

### Implementation Agent

| Agent | Type | When to Use |
|-------|------|-------------|
| `senior-software-engineer` | Custom | All implementation tasks |

### Support Agents

| Agent | Type | Purpose |
|-------|------|---------|
| `Explore` | Built-in | Pre-implementation code exploration |
| `code-reviewer` | Custom | Code review and quality validation |
| `constitutional-validator` | Custom | Validate against project constitution |
| `documentation-analyst-writer` | Built-in | Documentation generation |

### Agent Routing

All implementation tasks are handled by the `senior-software-engineer` agent.

---

## Phase 0: Load Context and Rules

**Prerequisites**: Feature slug parsed from user input

**Process**:

### 0.1 Load Project Constitution

1. Check for a constitution or principles document in the repository
2. If exists, extract:
   - Technical constraints (type safety, testing, component isolation)
   - Business principles (quality standards, workflow)
   - Architectural boundaries
3. Store constraints for enforcement during implementation

### 0.2 Load Domain-Specific Guidelines

Based on files to be modified, load relevant project guidelines:
- Check for component-specific README files
- Check for coding style guides
- Check for testing requirements documentation

### 0.3 Analyze Implementation Scope

1. Read `rpi/{feature-slug}/plan/PLAN.md`
2. Identify all files to be modified
3. Map files to implementation agent

**Outputs**:
- Constitutional context summary
- Domain rules loaded
- File-to-agent mapping
- Phase execution plan

**Validation**:
- [ ] Constitution loaded (if exists)
- [ ] Domain rules loaded for affected files
- [ ] All files mapped to agents
- [ ] Execution plan understood

---

## Phased Implementation Workflow

### Phase Implementation Loop

For each phase in PLAN.md:

```
┌─────────────────────────────────────────────────────────────────┐
│ Phase N: [Phase Name]                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Code Discovery (Explore Agent)                              │
│     └─→ Understand existing code before changing it             │
│                                                                  │
│  2. Implementation (senior-software-engineer)                   │
│     └─→ Implement phase deliverables                            │
│                                                                  │
│  3. Self-Validation                                             │
│     └─→ Engineer validates against phase checklist              │
│                                                                  │
│  4. Code Review (code-reviewer Agent)                           │
│     └─→ Security, correctness, maintainability                  │
│                                                                  │
│  5. User Validation Gate                                        │
│     └─→ STOP and request user approval                          │
│         ├─→ PASS: Proceed to next phase                         │
│         ├─→ CONDITIONAL PASS: Note issues, proceed              │
│         └─→ FAIL: Fix issues, re-validate                       │
│                                                                  │
│  6. Documentation Update                                        │
│     └─→ Update phase status in PLAN.md                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Code Discovery (Per Phase)

**Agent**: Explore (Built-in, via Task tool)

**Purpose**: Ground implementation in code reality before making changes.

**Process**:
1. Launch Explore agent via Task tool with `subagent_type="Explore"`
2. Request analysis of files affected by current phase
3. Understand existing patterns, integration points, constraints

**Explore Agent Prompt**:
```
Analyze the codebase to prepare for implementing Phase N of [feature-name].

Files to be modified in this phase:
[List files from PLAN.md]

Investigate and document:

1. **Current Implementation**
   - How do these files currently work?
   - What patterns are used?
   - What functions/classes will be affected?

2. **Integration Points**
   - What other files import or use these modules?
   - What APIs or interfaces will change?
   - What tests cover this code?

3. **Dependencies**
   - What libraries are used?
   - What internal utilities are available?
   - What constraints exist from current code?

4. **Patterns to Follow**
   - What coding style is used in these files?
   - What naming conventions are followed?
   - What error handling patterns exist?

5. **Risks and Considerations**
   - What could break if we change this?
   - What edge cases exist?
   - What backward compatibility concerns?

Provide a discovery summary to inform implementation.
```

**Output**: Discovery summary for implementation agent

---

## Step 2: Implementation (Per Phase)

**Agent**: senior-software-engineer

**Process**:
1. Use senior-software-engineer agent
2. Provide discovery context from Step 1
3. Implement all deliverables for the phase
4. Follow constitutional constraints and project rules

**Implementation Agent Prompt Template**:
```
Acting as the [agent-name] agent, implement Phase N deliverables for [feature-name].

## Context
- Constitutional Constraints: [from Phase 0]
- Domain Rules: [from Phase 0]
- Discovery Summary: [from Step 1]

## Phase N Deliverables
[List from PLAN.md]

## Files to Modify
[List files with specific changes from PLAN.md]

## Implementation Requirements
1. Follow existing code patterns identified in discovery
2. Honor constitutional constraints (type safety, testing, etc.)
3. Follow project-specific rules (if applicable)
4. Write tests for new functionality
5. Include appropriate logging
6. Handle errors gracefully

## Quality Checklist
- [ ] Code follows existing patterns
- [ ] Type annotations present where applicable
- [ ] Tests written and passing
- [ ] No breaking changes to existing functionality
- [ ] Logging added for observability
- [ ] Error handling comprehensive

Implement all deliverables and report what was done.
```

---

## Step 3: Self-Validation

**Agent**: senior-software-engineer (same as Step 2)

**Process**:
1. Agent validates implementation against phase checklist
2. Run linting (use project's configured linter)
3. Run tests relevant to changes
4. Verify build succeeds

**Validation Commands** (adjust to your project):

```bash
# Run linter
[your-linter-command]

# Run tests
[your-test-command]

# Build/compile
[your-build-command]
```

**Self-Validation Checklist**:
- [ ] All deliverables implemented
- [ ] Linting passes
- [ ] Tests pass
- [ ] Build succeeds
- [ ] No regressions in existing tests
- [ ] Constitutional constraints honored
- [ ] Domain rules followed

---

## Step 4: Code Review

**Agent**: code-reviewer (Custom, auto-invoked)

**Process**:
1. Invoke code-reviewer agent to review changes
2. Focus on correctness, security, maintainability
3. Address blockers before proceeding

**Code Review Agent Prompt**:
```
Acting as the code-reviewer agent, review the Phase N implementation for [feature-name].

## Files Changed
[List modified files]

## Changes Made
[Summary of implementation]

## Review Focus
- Correctness & tests
- Security & dependency hygiene
- Architectural boundaries
- Clarity over cleverness

## Constitutional Constraints
[From Phase 0]

Provide review using standard output format.
```

**Review Verdicts**:
- **APPROVED**: Proceed to user validation
- **APPROVED WITH SUGGESTIONS**: Note suggestions, proceed
- **NEEDS REVISION**: Fix issues, re-review

---

## Step 5: User Validation Gate

**CRITICAL**: This step REQUIRES user interaction. DO NOT proceed automatically.

**Process**:
1. Present phase deliverables checklist
2. Show what was implemented (files changed, features added)
3. Present validation criteria from PLAN.md
4. Show code review results
5. **STOP and wait for user decision**

**Validation Request Format**:
```
## Phase N Validation Request

### Deliverables Completed
- [x] [Deliverable 1] - [implementation summary]
- [x] [Deliverable 2] - [implementation summary]
- ...

### Files Changed
| File | Change Type | Lines |
|------|-------------|-------|
| [file] | [add/modify] | [±N] |

### Tests
- [x] Unit tests: PASS
- [x] Integration tests: PASS
- [x] Build: SUCCESS

### Code Review
- Verdict: [APPROVED / APPROVED WITH SUGGESTIONS]
- Issues: [None / List]

### Validation Criteria (from PLAN.md)
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- ...

---

**Please validate Phase N:**
- **PASS**: Phase complete, proceed to Phase N+1
- **CONDITIONAL PASS**: Note issues below, proceed with caution
- **FAIL**: Specify issues to fix before proceeding
```

**User Decisions**:
- **PASS**: Proceed to next phase
- **CONDITIONAL PASS**: Document issues, proceed to next phase
- **FAIL**: Fix issues, re-run Steps 2-5

---

## Step 6: Documentation Update

**Process**:
1. Update `rpi/{feature-slug}/plan/PLAN.md` with phase status
2. Update `rpi/{feature-slug}/implement/IMPLEMENT.md` with validation results
3. Append each phase's validation to IMPLEMENT.md

### Phase Status Tracking

Update checkboxes in PLAN.md:
```markdown
- [ ] Phase N: Not Started
- [~] Phase N: In Progress
- [x] Phase N: Validated (PASS)
- [!] Phase N: Conditional Pass (with notes)
- [-] Phase N: Failed Validation (needs rework)
```

### IMPLEMENT.md Template

```markdown
# Implementation Record

**Feature**: [feature-slug]
**Started**: [Date]
**Status**: [IN_PROGRESS / COMPLETED]

---

## Phase 1: [Phase Name]

**Date**: [Date]
**Verdict**: [PASS / CONDITIONAL PASS / FAIL]

### Deliverables
- [x] [Deliverable 1]
- [x] [Deliverable 2]

### Files Changed
[List with line counts]

### Test Results
[Test output summary]

### Code Review
[Review verdict and notes]

### Notes
[Any additional notes]

---

## Phase 2: [Phase Name]
[Same structure as Phase 1...]

---

## Summary

**Phases Completed**: [N] of [N]
**Final Status**: [COMPLETED / IN_PROGRESS]
```

---

## Error Handling

### Implementation Failures

**If implementation fails**:
1. Document the specific failure
2. Analyze root cause
3. Try alternative approach (max 2 attempts)
4. If still failing, STOP and ask user for guidance
5. Do NOT proceed to next phase with broken implementation

**Message**: "Implementation failed: [error]. Attempted [N] approaches. User guidance needed."

### Test Failures

**If tests fail**:
1. Analyze failure cause (code bug vs test bug)
2. Fix the issue
3. Re-run tests
4. If persistent, document and ask user
5. Do NOT mark phase complete with failing tests

**Message**: "Tests failing: [failures]. Fix attempted but unsuccessful. User review needed."

### Build Failures

**If build fails**:
1. Check for type errors
2. Check for missing imports
3. Check for syntax errors
4. Fix and rebuild
5. If persistent, escalate to user

**Message**: "Build failing: [error]. Unable to resolve automatically."

### Agent Failures

**If agent fails or times out**:
1. Retry once with same inputs
2. If still failing, proceed without that agent's contribution
3. Document gap in validation request

**Message**: "Agent [name] failed. Proceeding without contribution."

---

## Completion Report

On successful completion of all phases:

```markdown
## Implementation Complete

### Feature Summary
- **Feature**: [feature-name]
- **Phases Completed**: [N] of [N]

### Phases Executed
| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1 | PASS | [summary] |
| Phase 2 | PASS | [summary] |
| ... | ... | ... |

### Files Modified
| File | Change Type | Lines |
|------|-------------|-------|
| [file] | [type] | [±N] |

### Tests Added
- [test files]

### Code Review Summary
- Blockers Fixed: [N]
- Suggestions Addressed: [N]

### Constitutional Compliance
- [ ] Type safety maintained
- [ ] Tests written
- [ ] Component isolation respected
- [ ] No breaking changes

### Artifacts Created
- `rpi/{feature-slug}/plan/PLAN.md` (updated with phase status)
- `rpi/{feature-slug}/implement/IMPLEMENT.md` (all phase validations)

### Next Steps
1. Create PR with changes
2. Request final human review
3. Deploy to staging
4. Verify in staging environment
5. Deploy to production

### PR Notes

**Title**: [{feature-slug}] [Brief description]

**Summary**:
[What was implemented]

**Changes**:
- [List key changes]

**Testing**:
- [How tested]

**Rollout**:
- [Deployment steps]

**Rollback**:
- [Rollback procedure if issues]
```

---

## Quality Gates

### Per-Phase Quality Gate

Before marking any phase complete:

- [ ] All deliverables implemented
- [ ] Linting passes
- [ ] Tests pass
- [ ] Build succeeds
- [ ] Code review passed
- [ ] User validation received
- [ ] Documentation updated

### Final Quality Gate

Before marking implementation complete:

- [ ] All phases validated
- [ ] No failing tests
- [ ] Build succeeds in full
- [ ] Constitutional compliance verified
- [ ] Domain rules followed
- [ ] PR notes generated

---

## Notes

### When to Use This Command

- After `/rpi:plan` generates PLAN.md
- When phased implementation with validation gates is needed
- For features requiring structured implementation

### When NOT to Use This Command

- Bug fixes (too heavy, just fix directly)
- Very simple changes (<30 minutes work)
- Exploratory prototyping
- Documentation-only changes

### Best Practices

1. **Review PLAN.md first**: Understand what you're implementing
2. **Trust code discovery**: Let Explore agent inform implementation
3. **Follow existing patterns**: Let code discovery inform implementation
4. **Don't skip validation**: Gates exist to catch issues early
5. **Document as you go**: Update status after each phase
6. **Ask when stuck**: Better to ask than to proceed incorrectly

### Part of RPI Workflow

Step 4 of 4 (Describe → Research → Plan → **Implement**)

---

## Command Examples

### Execute all phases

```bash
/rpi:implement "my-feature"
```

### Execute specific phase

```bash
/rpi:implement "my-feature" --phase 3
```

### Validate only (no implementation)

```bash
/rpi:implement "my-feature" --phase 2 --validate-only
```

---

## Post-Completion Action

**IMPORTANT**: After completing implementation (all phases or significant progress), ALWAYS prompt the user to compact the conversation:

> **Context Management**: This implementation workflow consumed significant context. To preserve progress and free up space, please run:
>
> ```
> /compact
> ```
>
> This will summarize the conversation and preserve implementation status while reducing token usage for future work.

**When to prompt for compact**:
- After all phases are complete
- After completing each major phase (if multi-session implementation)
- If context is running low during implementation
