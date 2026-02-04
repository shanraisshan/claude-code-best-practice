---
description: Research and analyze feature viability - GO/NO-GO decision gate
argument-hint: "<feature-slug>"
---

## User Input

```text
$ARGUMENTS
```

You **MUST** parse the user input to extract the feature slug (the folder name in `rpi/`).

**Expected Input Format**: `rpi/{feature-slug}/REQUEST.md`

## Purpose

This command performs comprehensive research and analysis of feature requests **before** the planning phase begins. It acts as a critical GO/NO-GO gate to determine whether a feature idea should proceed to detailed planning.

**Key Objectives**:
- Assess product-market fit and user value
- Evaluate technical feasibility and complexity
- Identify risks and potential blockers
- Determine the right approach (build, buy, partner, or decline)
- Make go/no-go recommendation with clear rationale

**Prerequisites**:
- Feature folder exists at `rpi/{feature-slug}/`
- Feature request file exists at `rpi/{feature-slug}/REQUEST.md`

**Output Location**: `rpi/{feature-slug}/research/RESEARCH.md`

**This is Step 2 of the RPI Workflow** (after initial feature description in Step 1).

## Outline

1. **Load Context**: Read feature description from `rpi/{feature-slug}/` and project constitution (if exists)
2. **Parse Feature Request**: Use requirement-parser agent to extract structured requirements
3. **Execute Multi-Phase Research**:
   - Phase 1: Parse Feature Request (requirement-parser agent)
   - Phase 2: Product Analysis with Constitution Alignment (product-manager agent)
   - Phase 2.5: Technical Discovery (Explore agent) - **CRITICAL: Deep code exploration**
   - Phase 3: Technical Feasibility (senior-software-engineer agent)
   - Phase 4: Strategic Assessment (technical-cto-advisor agent)
   - Phase 5: Generate Research Report (documentation-analyst-writer agent)
4. **Synthesize Recommendation**: Combine all analyses into clear go/no-go recommendation
5. **Validate Output**: Check against quality gates
6. **Report Completion**: Provide recommendation, next steps, and report location

## Phases

### Phase 0: Load Context

**Prerequisites**: Feature slug provided, `rpi/{feature-slug}/REQUEST.md` exists

**Process**:
1. **Read feature description**:
   - Read `rpi/{feature-slug}/REQUEST.md` (required)
   - Extract feature requirements and goals from REQUEST.md

2. **Check for project constitution** (optional):
   - Look for a constitution or principles document in the repository
   - Common locations: `constitution.md`, `PRINCIPLES.md`, `.project/constitution.md`
   - If found, extract core principles, constraints, and objectives

3. **Create research context**:
   - Synthesize into concise summary for agents
   - Identify key alignment criteria

**Outputs**:
- Feature description summary
- Constitutional principles (if found)
- Alignment criteria for evaluation

**Validation**:
- [ ] Feature folder exists in `rpi/{feature-slug}/`
- [ ] Feature description extracted
- [ ] Constitution checked and loaded (if exists)

---

### Phase 1: Parse Feature Request

**Prerequisites**: Phase 0 complete

**Agent**: requirement-parser (planning domain)

**Process**:
1. **Launch requirement-parser agent** with feature description
2. **Agent extracts**:
   - Feature name and type
   - Target component(s)
   - Goals and objectives
   - Functional and non-functional requirements
   - Constraints and assumptions
   - Complexity estimate
   - Clarifying questions (if any)

3. **Review parsing results**:
   - If clarifying questions exist, **STOP and ask user** before proceeding

**Outputs**:
- Structured requirements document
- Feature metadata (name, type, component, complexity)
- Clarifying questions (if any)

---

### Phase 2: Product Analysis with Constitution Alignment

**Prerequisites**: Phase 1 complete, requirements clear

**Agent**: product-manager

**Process**:
1. **Launch product-manager agent** with:
   - Parsed requirements from Phase 1
   - Constitutional context from Phase 0

2. **Agent analyzes**:
   - **User Value**: Who benefits? How much impact?
   - **Market Fit**: Does this align with market needs?
   - **Product Vision**: Does this fit our product strategy?
   - **Constitutional Alignment**: Does this align with project principles?
   - **Constraints Check**: Does this violate any constitutional constraints?

3. **Agent provides**:
   - Product viability score (High/Medium/Low)
   - User value assessment
   - Strategic alignment evaluation
   - Priority recommendation
   - Product concerns or red flags

**Outputs**:
- Product viability assessment
- User value analysis
- Strategic alignment score
- Constitutional alignment summary (if applicable)

---

### Phase 2.5: Technical Discovery (Code Exploration)

**Prerequisites**: Phases 1-2 complete, product viability established

**Agent**: Explore (via Task tool with subagent_type="Explore")

**Purpose**: **CRITICAL PHASE** - Deeply analyze existing codebase BEFORE making technical feasibility assessment.

**Process**:
1. **Launch Explore agent** with target component(s)
2. **Agent investigates**:
   - **Existing Implementation**: What code already exists for similar functionality?
   - **Integration Points**: What systems/modules would this feature touch?
   - **Current Architecture**: How is the current system structured?
   - **Data Models**: What database schemas or data structures exist?
   - **Dependencies**: What libraries, services are already integrated?
   - **Existing Patterns**: What coding patterns and conventions are used?

3. **Agent provides**:
   - **Current State Summary**: What exists today
   - **Integration Analysis**: Where proposed feature would fit
   - **Code Conflicts**: What would break or conflict
   - **Leverage Opportunities**: What can be reused vs rebuilt
   - **Technical Constraints**: Real constraints from existing code

**Outputs**:
- Current implementation summary
- Integration points map
- Code conflicts identified
- Reusable components identified
- Technical constraints from code

**Critical**: This phase ensures Phase 3 is based on **actual code reality**, not assumptions.

---

### Phase 3: Technical Feasibility Assessment

**Prerequisites**: Phases 1-2.5 complete, code explored

**Agent**: senior-software-engineer

**Process**:
1. **Launch senior-software-engineer agent** with:
   - Parsed requirements from Phase 1
   - Product context from Phase 2
   - **Technical discovery results from Phase 2.5**

2. **Agent analyzes** (informed by Phase 2.5 discoveries):
   - **Technical Approach**: What are the implementation options?
   - **Complexity**: How difficult is this to build?
   - **Dependencies**: What systems/services are needed?
   - **Technical Debt**: Will this create or reduce tech debt?
   - **Risks**: What are the technical risks?

3. **Agent provides**:
   - Technical feasibility score (High/Medium/Low)
   - Recommended approach (with alternatives)
   - Complexity estimate (Simple/Medium/Complex)
   - Technical risks and mitigations

**Outputs**:
- Technical feasibility score
- Recommended implementation approach
- Complexity and effort estimate
- Technical risks and mitigations

---

### Phase 4: Strategic Assessment

**Prerequisites**: Phases 1-3 complete

**Agent**: technical-cto-advisor

**Process**:
1. **Launch technical-cto-advisor agent** with all previous phase outputs

2. **Agent synthesizes**:
   - **Overall Assessment**: Combine product + technical perspectives
   - **Strategic Alignment**: Does this align with engineering principles AND project constitution?
   - **Risk vs. Reward**: Is the value worth the effort and risk?
   - **Alternative Options**: Build, buy, partner, defer, or decline?

3. **Agent provides**:
   - **Go/No-Go Recommendation**: Clear decision with confidence level
   - **Rationale**: Detailed reasoning
   - **Recommended Approach**: If "go", what's the best path forward?
   - **Conditions**: Any prerequisites for proceeding?
   - **Risks**: Key risks if we proceed

**Outputs**:
- Go/No-Go recommendation
- Strategic rationale
- Recommended approach
- Risk summary

---

### Phase 5: Generate Research Report

**Prerequisites**: Phases 1-4 complete

**Agent**: documentation-analyst-writer (via Task tool)

**Process**:
1. **Launch documentation-analyst-writer agent** with all phase outputs

2. **Agent generates report** with sections:
   - **Executive Summary**: One-paragraph overview with recommendation
   - **Feature Overview**: Name, type, component, goals
   - **Requirements Summary**: Key functional and non-functional requirements
   - **Product Analysis**: User value, market fit, strategic alignment
   - **Technical Discovery**: Current state, integration points, constraints from code
   - **Technical Analysis**: Feasibility, approach, complexity, risks
   - **Strategic Recommendation**: Go/no-go with detailed rationale
   - **Next Steps**: What to do based on recommendation

3. **Agent creates markdown file**: `rpi/{feature-slug}/research/RESEARCH.md`

**Outputs**:
- Complete research report saved to `rpi/{feature-slug}/research/RESEARCH.md`

---

## Sub-Agent Delegation

This command orchestrates 6 specialist agents:

| Phase | Agent | Type | Location |
|-------|-------|------|----------|
| Phase 1 | requirement-parser | Custom | .claude/agents/requirement-parser.md |
| Phase 2 | product-manager | Custom | .claude/agents/product-manager.md |
| Phase 2.5 | Explore | Built-in | Task tool with subagent_type="Explore" |
| Phase 3 | senior-software-engineer | Custom | .claude/agents/senior-software-engineer.md |
| Phase 4 | technical-cto-advisor | Custom | .claude/agents/technical-cto-advisor.md |
| Phase 5 | documentation-analyst-writer | Built-in | Task tool with subagent_type="documentation-analyst-writer" |

---

## Completion Report

Report the following on successful completion:

### Research Recommendation

**Decision**: [GO | NO-GO | CONDITIONAL GO | DEFER]

**Confidence**: [High | Medium | Low]

**Rationale** (1-2 sentences):
[Key reasons for recommendation]

---

### Research Summary

**Feature**: {feature-name}
**Type**: {feature-type}
**Component**: {target-component}
**Complexity**: {Simple | Medium | Complex}

**Scores**:
- Product Viability: [High/Medium/Low]
- Technical Feasibility: [High/Medium/Low]
- Overall Assessment: [High/Medium/Low]

**Key Risks**:
1. {risk-1}
2. {risk-2}
3. {risk-3}

---

### Report Location

**Full Research Report**: `rpi/{feature-slug}/research/RESEARCH.md`

---

### Next Steps

Based on the **[GO/NO-GO]** recommendation:

**If GO**:
1. Review the research report: `rpi/{feature-slug}/research/RESEARCH.md`
2. Proceed to planning: `/rpi:plan "{feature-slug}"`

**If CONDITIONAL GO**:
1. Review conditions in report
2. Address conditions before proceeding
3. Re-run research if needed

**If DEFER**:
1. Review timeline recommendation in report
2. Revisit when timing is appropriate

**If NO-GO**:
1. Review rationale in report
2. Consider alternatives mentioned
3. Archive for future reference

---

## Error Handling

**If REQUEST.md doesn't exist**:
- Action: Stop and inform user
- Message: "Feature request file `rpi/{feature-slug}/REQUEST.md` not found. Create the feature folder and REQUEST.md first (Step 1: Describe in Plan Mode)."

**If feature description is too vague**:
- Action: requirement-parser will identify clarifying questions
- Message: "Need more information. Please answer:"
- Next: Wait for answers, then proceed

**If agents fail or timeout**:
- Action: Retry once
- Next: If retry fails, ask user whether to continue with incomplete research

---

## Notes

- **When to Use**: After Step 1 (Describe) creates the feature folder
- **Critical Gate**: This prevents wasted effort on non-viable features
- **Part of RPI Workflow**: Step 2 of 4 (Describe → Research → Plan → Implement)

---

## Post-Completion Action

**IMPORTANT**: After completing the research workflow, ALWAYS prompt the user to compact the conversation:

> **Context Management**: This research workflow consumed significant context. To free up space for the next steps, please run:
>
> ```
> /compact
> ```
>
> This will summarize the conversation and preserve important findings while reducing token usage for subsequent commands.
