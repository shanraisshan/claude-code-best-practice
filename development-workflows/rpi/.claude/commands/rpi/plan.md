---
description: Create comprehensive planning documentation for a feature
argument-hint: "<feature-slug>"
---

## User Input

```text
$ARGUMENTS
```

You **MUST** parse the user input to extract the feature slug (the folder name in `rpi/`).

## Purpose

This command creates comprehensive planning documentation for a feature request. It generates detailed specifications, technical design, and implementation plans in the feature's RPI folder.

**Prerequisites**:
- Feature folder exists at `rpi/{feature-slug}/`
- Research completed with GO recommendation (`rpi/{feature-slug}/research/RESEARCH.md` exists)

**Output Location**: All files saved to `rpi/{feature-slug}/plan/`

**This is Step 3 of the RPI Workflow** (after Research approves with GO).

## Outline

1. **Load Context**: Read research report and project constitution (if exists)
2. **Understand Requirements**: Parse feature scope and requirements
3. **Analyze Technical Requirements**: Review architecture and dependencies
4. **Design Architecture**: Create high-level architecture and API contracts
5. **Break Down Implementation**: Create phased task breakdown
6. **Generate Documentation**: Create structured documentation files
7. **Validate Output**: Ensure all quality gates pass
8. **Report Completion**: Provide summary and next steps

## Phases

### Phase 0: Load Context

**Prerequisites**: Feature slug provided

**Process**:
1. **Verify research completed**:
   - Check `rpi/{feature-slug}/research/RESEARCH.md` exists
   - Verify GO recommendation (warn if NO-GO or CONDITIONAL)

2. **Read research findings**:
   - Extract product analysis
   - Extract technical discovery
   - Extract technical feasibility assessment
   - Note risks and constraints

3. **Load project constitution** (if exists):
   - Look for a constitution or principles document in the repository
   - Extract relevant constraints and preferences

**Outputs**:
- Research summary
- Constitutional context (if found)
- Planning constraints

**Validation**:
- [ ] Research report exists
- [ ] GO recommendation confirmed
- [ ] Constitution loaded (if exists)

---

### Phase 1: Understand Feature Requirements

**Prerequisites**: Phase 0 complete

**Process**:
1. **Parse Feature Description** from research report:
   - Extract feature name and primary goal
   - Identify target component(s)
   - Understand user-facing vs. technical feature
   - Determine feature complexity level

2. **Identify Affected Components**:
   - Primary component (where feature lives)
   - Secondary components (integration points)
   - Shared utilities needed
   - External dependencies

3. **Research Existing Patterns**:
   - Search for similar features in codebase
   - Review component architecture and patterns
   - Identify reusable code and patterns

**Outputs**:
- Feature scope document (internal)
- Affected components list
- Existing patterns catalog

**Validation**:
- [ ] Feature name and goal clearly defined
- [ ] Target component(s) identified
- [ ] Feature complexity assessed

---

### Phase 2: Analyze Technical Requirements

**Prerequisites**: Phase 1 complete

**Process**:
1. **Review Component Architecture**:
   - Read component README and documentation
   - Review existing code structure
   - Identify architectural patterns used

2. **Identify Technical Dependencies**:
   - Internal dependencies (other components, shared utilities)
   - External dependencies (APIs, services, libraries)
   - Database/storage requirements
   - Authentication/authorization needs

3. **Assess Integration Points**:
   - APIs that need to be created or modified
   - Database schema changes required
   - Event/message flows
   - Frontend-backend integration

4. **Evaluate Technical Risks**:
   - Breaking changes to existing features
   - Performance implications
   - Security concerns
   - Data migration needs

**Outputs**:
- Technical requirements document (internal)
- Dependency map
- Integration point diagram
- Risk assessment

**Validation**:
- [ ] Component architecture understood
- [ ] All dependencies identified
- [ ] Integration points mapped
- [ ] Technical risks assessed

---

### Phase 3: Design Feature Architecture

**Prerequisites**: Phases 1-2 complete

**Agent**: senior-software-engineer

**Process**:
1. **Design High-Level Architecture**:
   - Component/module structure
   - Data flow diagrams
   - API interfaces
   - Database schema changes

2. **Define Implementation Approach**:
   - File structure and organization
   - Code organization patterns
   - Testing strategy
   - Error handling approach

3. **Plan Database/Storage Changes** (if applicable):
   - New collections/tables
   - Schema modifications
   - Migration strategy
   - Data validation rules

4. **Design API Contracts** (if applicable):
   - Request/response formats
   - Authentication requirements
   - Error responses

5. **Plan Testing Strategy**:
   - Unit test requirements
   - Integration test scenarios
   - End-to-end test cases

**Outputs**:
- Architecture design document (internal)
- API specifications
- Database schema design
- Testing strategy

**Validation**:
- [ ] High-level architecture designed
- [ ] Implementation approach defined
- [ ] Database changes planned (if needed)
- [ ] API contracts specified (if needed)
- [ ] Testing strategy complete

---

### Phase 4: Break Down Implementation Tasks

**Prerequisites**: Phases 1-3 complete

**Process**:
1. **Identify Implementation Phases**:
   - Break feature into 3-5 logical phases
   - Each phase should deliver working, testable functionality
   - Phases should build on each other progressively

2. **Create Task Breakdown for Each Phase**:
   - List specific implementation tasks
   - Estimate complexity (Low/Medium/High)
   - Identify task dependencies
   - Assign to appropriate code areas

3. **Define Success Criteria**:
   - Acceptance criteria for each phase
   - Testing requirements
   - Documentation requirements

4. **Identify Parallelization Opportunities**:
   - Tasks that can be done concurrently
   - Frontend/backend parallel work
   - Independent module development

**Outputs**:
- Phased implementation plan
- Task breakdown with estimates
- Success criteria per phase
- Dependency chart

**Validation**:
- [ ] Feature broken into 3-5 logical phases
- [ ] Each phase has specific tasks
- [ ] All tasks have complexity estimates
- [ ] Dependencies clearly marked
- [ ] Success criteria defined

---

### Phase 5: Generate Documentation

**Prerequisites**: Phases 1-4 complete

**Agent**: documentation-analyst-writer (via Task tool)

**Process**:
1. **Generate pm.md** (Product Requirements):
   - Feature description and user stories
   - Constitutional alignment (if applicable)
   - Business value and success metrics
   - User personas and use cases
   - Acceptance criteria
   - Out of scope items

2. **Generate ux.md** (User Experience Design):
   - User interface mockups (text description)
   - User flows and interactions
   - Accessibility considerations
   - Error states and edge cases

3. **Generate eng.md** (Technical Specification):
   - Architecture design
   - API specifications
   - Database schema changes
   - Technology stack
   - Technical risks and mitigation

4. **Generate PLAN.md** (Implementation Roadmap):
   - Phased implementation breakdown
   - Task list with estimates per phase
   - Dependencies and ordering
   - Success criteria per phase
   - Testing requirements
   - Validation checkpoints

**Output Files** (all saved to `rpi/{feature-slug}/plan/`):
- `pm.md` - Product requirements
- `ux.md` - UX design
- `eng.md` - Technical specification
- `PLAN.md` - Detailed implementation roadmap

**Validation**:
- [ ] All 4 files present (pm, ux, eng, PLAN)
- [ ] pm.md covers business requirements
- [ ] ux.md addresses user experience
- [ ] eng.md provides technical specification
- [ ] PLAN.md has phased implementation
- [ ] No placeholder text remains
- [ ] Markdown formatting is clean

---

## Sub-Agent Delegation

This command orchestrates specialist agents:

| Phase | Agent | Type | Purpose |
|-------|-------|------|---------|
| Phase 3 | senior-software-engineer | Custom | Architecture design |
| Phase 5 | product-manager | Custom | Product requirements (pm.md) |
| Phase 5 | ux-designer | Custom | User experience (ux.md) |
| Phase 5 | senior-software-engineer | Custom | Technical spec (eng.md) |
| Phase 5 | documentation-analyst-writer | Built-in | Documentation synthesis |

### Agent Invocation

**Custom Agents** (product-manager, senior-software-engineer, ux-designer):
- Claude Code automatically detects these from `.claude/agents/`
- Reference them naturally: "Acting as the senior-software-engineer agent..."
- NO Task tool invocation needed

**Built-in Agent** (documentation-analyst-writer):
- Use Task tool with `subagent_type="documentation-analyst-writer"`

---

## Completion Report

Report the following on successful completion:

### Outputs Created

**Documentation Folder**: `rpi/{feature-slug}/plan/`

Files created:
- **pm.md**: Product requirements and user stories ({Y} stories)
- **ux.md**: User experience design ({Z} flows)
- **eng.md**: Technical specification ({A} APIs, {B} schema changes)
- **PLAN.md**: Detailed roadmap ({C} phases, {D} tasks)

### Feature Summary

- **Feature Name**: {feature-name}
- **Target Component**: {component-name}
- **Complexity**: {Simple/Medium/Complex}
- **Implementation Phases**: {N} phases
- **Total Tasks**: {M} tasks
- **Dependencies**: {Y} internal, {Z} external

### Technical Overview

- **Architecture Pattern**: {pattern-name}
- **APIs Added/Modified**: {N} APIs
- **Database Changes**: {Y} collections/tables
- **Testing Requirements**: {Z} test suites
- **Risk Level**: {Low/Medium/High}

### Implementation Phases

1. **Phase 1**: {phase-name} - {task-count} tasks
2. **Phase 2**: {phase-name} - {task-count} tasks
3. **Phase 3**: {phase-name} - {task-count} tasks
[Continue for all phases...]

---

### Next Steps

1. **Review Documentation**:
   - Read planning docs in `rpi/{feature-slug}/plan/`
   - Review technical spec in `eng.md`
   - Understand implementation phases in `PLAN.md`

2. **Validate with Stakeholders**:
   - Product review of pm.md
   - UX review of ux.md
   - Technical review of eng.md

3. **Begin Implementation**:
   - Run `/rpi:implement "{feature-slug}"` to execute phased implementation
   - Follow PLAN.md phases
   - Complete validation gates at each phase

---

## Error Handling

**If research report doesn't exist**:
- Action: Stop and inform user
- Message: "Research report not found. Run `/rpi:research` first."

**If research recommendation is NO-GO**:
- Action: Warn user but allow proceeding
- Message: "Research recommended NO-GO. Proceed anyway? (y/n)"

**If target component doesn't exist**:
- Action: Confirm with user if this is a new component
- Message: "Component not found. Is this a new component?"

**If documentation agent fails**:
- Action: Generate documentation directly
- Warning: "Documentation may not fully adhere to standards"

---

## Notes

- **Prerequisites**: Research completed with GO recommendation
- **Part of RPI Workflow**: Step 3 of 4 (Describe → Research → Plan → Implement)

**Best Practices**:
1. **Review Research First**: Ensure you understand the viability assessment
2. **Leverage Discovery**: Use technical discovery from research phase
3. **Be Specific**: Detailed plans lead to smoother implementation
4. **Validate Early**: Review docs before implementing

---

## Post-Completion Action

**IMPORTANT**: After completing the planning workflow, ALWAYS prompt the user to compact the conversation:

> **Context Management**: This planning workflow consumed significant context. To free up space for implementation, please run:
>
> ```
> /compact
> ```
>
> This will summarize the conversation and preserve the planning decisions while reducing token usage for the implementation phase.
