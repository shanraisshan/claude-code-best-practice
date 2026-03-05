---
name: vibe-to-agentic-framework
description: The conceptual framework behind the presentation — what "Vibe Coding to Agentic Engineering" means, why the journey is structured the way it is, and how every slide fits the narrative arc
---

# The "Vibe Coding to Agentic Engineering" Framework

This skill teaches the **conceptual model** behind the presentation. Every slide and section exists to tell a single story: how a developer incrementally moves from unstructured "vibe coding" (Low level) to high-level agentic engineering (High level).

## Core Concept

**Vibe Coding (Low level)** is when a developer uses Claude Code with no structure — no project context, no conventions, no reusable knowledge. Every prompt is a coin flip. Claude might create random endpoints, ignore existing patterns, skip tests, and produce inconsistent code. The codebase drifts toward entropy with every interaction.

**Agentic Engineering (High level)** is when Claude Code operates as a fully configured engineering system. It knows the project architecture (CLAUDE.md), follows scoped conventions (Rules), loads domain expertise on demand (Skills), delegates to specialized workers (Agents), orchestrates multi-step workflows (Commands), automates lifecycle events (Hooks), and connects to external tools (MCP Servers). Every prompt produces consistent, tested, production-quality code.

The journey between these two extremes is **incremental and cumulative**. Each best practice builds on the previous ones, and the presentation teaches them in the order a developer should adopt them.

## The 4-Level Journey System

The presentation uses a 4-level scoring system instead of a percentage bar:

| Level | Order | Color | Journey Bar Height | Description |
|-------|-------|-------|--------------------|-------------|
| Low | 1 | Red/orange (`hsl(0, 70%, 45%)`) | 25% | Vibe coding territory — no structure |
| Medium | 2 | Yellow (`hsl(40, 70%, 45%)`) | 50% | Structured workflows, some automation |
| High | 3 | Light green (`hsl(80, 70%, 45%)`) | 75% | Domain knowledge, skills, custom agents |
| Pro | 4 | Deep green (`hsl(120, 70%, 45%)`) | 100% | Full agentic engineering, multi-agent teams |

The journey bar is hidden on slide 1 (title slide) and appears from slide 2 onward. Levels are set via `data-level` attributes on key transition slides and inherited by subsequent slides until the next level change. A `.level-badge` is JS-injected on the slide's `h1` when the level changes (do not hardcode these in HTML).

## The Running Example: TodoApp Monorepo

Every technique is demonstrated on a realistic full-stack project. The presentation shows the transformation from a plain project (vibe coding) to one with full Claude Code configuration (agentic engineering):

**Before (Vibe Coding):**
```
todoapp/
├── backend/          # FastAPI (Python)
│   ├── main.py
│   ├── routes/
│   ├── models/
│   └── tests/
└── frontend/         # Next.js (TypeScript)
    ├── components/
    ├── pages/
    └── lib/
```

**After (Agentic Engineering):**
```
todoapp/
├── .claude/                  # Claude Code config
│   ├── agents/               # Custom subagents
│   ├── skills/               # Domain knowledge
│   ├── commands/             # Slash commands
│   ├── hooks/                # Lifecycle scripts
│   ├── rules/                # Modular instructions
│   ├── settings.json         # Team settings
│   └── settings.local.json   # Personal settings
├── backend/
│   └── CLAUDE.md             # Backend instructions
├── frontend/
│   └── CLAUDE.md             # Frontend instructions
├── .mcp.json                 # Managed MCP servers
└── CLAUDE.md                 # Project instructions
```

**Why TodoApp?** It's small enough to fit on slides but complex enough to demonstrate real problems: a backend with route patterns and test conventions, a frontend with component hierarchy and design tokens, and a monorepo structure where cross-cutting concerns (like adding a new feature) require coordination between both sides.

The TodoApp makes the vibe-coding problem concrete: without structure, asking Claude to "add a notes feature" produces a random `/api/notes` endpoint that doesn't follow `routes/todos.py` patterns, a standalone page with no sidebar navigation, and zero tests. With full agentic setup, the same request produces a route following existing patterns, a page integrated into the sidebar, and tests matching `test_todos.py` style.

## The Journey Arc: Why This Order

The presentation follows a deliberate pedagogical sequence. Each section unlocks a new capability layer:

### Part 0: Introduction (Slides 1–4, no weight)
**Purpose:** Set the stage. Introduce the TodoApp, define vibe coding, and show the destination.
- Title slide establishes the journey metaphor
- Example Project shows the transformation: before/after comparison of TodoApp — plain project structure vs one with full Claude Code configuration (.claude/, CLAUDE.md, .mcp.json, etc.)
- "What is Vibe Coding?" creates the 0% baseline — the pain point
- Journey Map provides a clickable TOC showing the full path ahead

### Part 1: Prerequisites (Slides 5–9, no weight)
**Purpose:** Get Claude Code installed and running. This is purely logistical — no engineering practices yet.
- Installing, authentication, first session, interface overview
- No weight because knowing how to install a tool doesn't improve code quality
- The "first session" IS vibe coding — this is intentional, so the developer experiences the 0% state firsthand

### Part 2: Better Prompting (Slides 10–17, Level: Low)
**Purpose:** The first real improvement. Better inputs produce better outputs, even without any project configuration.
- **Good vs Bad Prompts:** Specific, scoped prompts vs vague requests. The simplest possible improvement.
- **Providing Context:** Using `@files` to give Claude the code it needs. Reduces hallucination immediately.
- **Context Window & /compact:** Understanding the finite context window prevents degraded responses in long sessions.
- **Plan Mode:** `/plan` forces thinking before coding. Prevents wasted effort on wrong approaches.

**Why Low level:** Prompting is foundational but limited. It improves individual interactions but doesn't create lasting project knowledge. Each session starts from zero.

### Part 3: Project Memory (Slides 18–24, Level: Medium)
**Purpose:** The leap from session-level to project-level knowledge. Claude now remembers across sessions.
- **CLAUDE.md & /init:** The project's "README for Claude." Establishes architecture, tech stack, and conventions. This is the single most impactful file.
- **What to Include:** Practical guidance on writing effective CLAUDE.md content (keep under 150 lines, focus on what Claude needs to know).
- **Rules:** Path-scoped conventions in `.claude/rules/`. Rules are a multiplier — they apply automatically to every matching file, enforcing consistency without developer effort. A single `backend-testing.md` rule ensures every test follows the same pattern forever.

**Why Medium level:** Project memory transforms Claude from a stateless tool into a context-aware collaborator. But knowledge alone doesn't create workflows.

### Part 4: Structured Workflows (Slides 25–28, Level: Medium)
**Purpose:** Systematic approaches that prevent wasted effort and improve execution quality.
- **Task Lists:** Breaking complex work into trackable steps. Prevents scope drift and ensures completeness.
- **Model Selection:** Choosing the right model (Opus for architecture, Sonnet for implementation, Haiku for quick tasks) optimizes cost and quality.

**Why still Medium level:** Workflows are important but relatively simple concepts. They build on Part 3's project memory and use it more systematically. The step up to High comes with domain knowledge.

### Part 5: Domain Knowledge (Slides 29–33, Level: High)
**Purpose:** Reusable, on-demand expertise. Skills are the bridge between static memory (CLAUDE.md/Rules) and dynamic agents.
- **What Are Skills:** Skills as packaged domain knowledge that Claude loads when relevant. The concept of progressive disclosure.
- **Creating Skills:** Hands-on: building a `frontend-conventions` skill for the TodoApp that teaches Tailwind tokens, component patterns, and sidebar integration.
- **Skill Frontmatter & Invocation:** The technical details: YAML frontmatter, manual vs auto-discovery invocation, the `context: fork` option.

**Why High level:** Skills are the first "multiplier" concept — one skill definition improves every future interaction in its domain. But skills are passive knowledge; they need agents to become active.

### Part 6: Agentic Engineering (Slides 34–46, Level: High)
**Purpose:** The destination covered in this presentation. Autonomous, specialized agents that coordinate to build features end-to-end.
- **What Are Agents:** The concept of specialized subagents with constrained tools and preloaded skills.
- **Frontend Engineer Agent:** A concrete agent that uses the TodoApp's frontend conventions, adds routes to sidebar, follows design tokens. Before/after comparison shows the transformation.
- **Backend Engineer Agent:** Parallel agent for the backend — follows FastAPI route patterns, SQLAlchemy models, writes tests matching existing style.
- **Commands & Orchestration:** The capstone pattern: Command → Agent → Skills. A single `/add-feature` command coordinates frontend + backend agents, each with their own skills, to deliver a complete feature. This is the architectural pinnacle.
- **Hooks & MCP:** Lifecycle automation (pre-commit checks, sound notifications) and external tool integration. The final automation layer.
- **Command → Agent → Skills:** The full architecture diagram. Shows how all pieces connect: commands invoke agents, agents load skills, skills provide knowledge. This is the "High level" understanding slide.

**Why High level:** This section covers the highest-value practices taught in this presentation. Everything before it was building toward this. Orchestration and agentic workflows represent the ceiling of what this course covers — full Pro (multi-agent teams, advanced orchestration patterns) is beyond this presentation's scope.

### The High Level Slide (Slide 44)
The celebration moment. Shows the complete TodoApp configuration:
- CLAUDE.md for project context
- Rules for path-scoped conventions
- Skills for domain knowledge
- Agents for consistent execution
- Commands for orchestrated workflows
- Hooks for lifecycle automation
- MCP servers for external tools

### Appendix (Slides 47+, no weight)
**Purpose:** Reference material. Every command, setting, and configuration option. No weight because these are reference lookups, not journey milestones. Includes: tool usage, all slash commands, commit/PR workflows, customization options, debugging tips, and golden rules.

## How to Use This Framework When Editing Slides

When creating or modifying slides, consider:

1. **Where does this concept sit on the journey?** A slide about "better error messages in prompts" belongs in Part 2 (prompting, Low level). A slide about "agent memory scopes" belongs in Part 6 (agentic, High level).

2. **What's the before/after?** Every significant slide should implicitly or explicitly show the contrast: what happens at Low level (vibe coding) vs what happens with this technique. Use the TodoApp to make it concrete.

3. **Does the level assignment feel right?** Level transitions happen at Part section boundaries. Individual slides within a section inherit the section's level.

4. **Does it build on what came before?** Skills assume the developer already knows about CLAUDE.md and Rules. Agents assume they know about Skills. Commands assume they know about Agents. Never reference a concept before its section.

5. **Use the TodoApp.** Abstract explanations lose the audience. Show the actual `routes/todos.py` code, the actual `Sidebar.tsx` component, the actual `CLAUDE.md` content. The running example is what makes the framework tangible.

## Level Transition Reference Table

| Slide | Slide Name | data-level | Level Label |
|-------|-----------|------------|-------------|
| 10 | Better Prompting (section divider) | `data-level="low"` | Low |
| 18 | Project Memory (section divider) | `data-level="medium"` | Medium |
| 29 | Domain Knowledge (section divider) | `data-level="high"` | High |
| 34 | Agentic Engineering (section divider) | `data-level="high"` | High |

All other slides inherit the level from the last `data-level` attribute set before them. Slides 1–9 (Intro + Prerequisites) have no level and keep the bar hidden until slide 2 shows "Low" (slides 2–9 are below the first level transition at slide 10, so the bar shows empty/zero until slide 10).

**Note:** The main presentation (`presentation/index.html`) caps at **High** level — `data-level="pro"` is not used. The Pro tick mark remains visible on the journey bar as the theoretical ceiling, but the fill never reaches it. The video presentation (`1-video-workflow.html`) caps at **Medium** level.
