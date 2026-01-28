# claude-code-best-practice
practice makes claude perfect

<a href="https://github.com/shanraisshan/claude-code-best-practice/stargazers">
  <img src="https://img.shields.io/github/stars/shanraisshan/claude-code-best-practice?style=social" alt="GitHub Stars">
</a>

<p align="center">
  <img src="assets/claude-jumping.svg" alt="Claude Code mascot jumping" width="120" height="100">
</p>



## CONCEPTS

> **Note:** Custom slash commands have been merged into skills. Files in `.claude/commands/` still work, but skills (`.claude/skills/`) are recommended as they support additional features like supporting files, invocation control, and subagent execution.

- **[Skills](https://code.claude.com/docs/en/skills)** - Reusable knowledge, workflows, and slash commands that Claude can load on-demand or you invoke with `/skill-name`
- **[Subagents](https://code.claude.com/docs/en/sub-agents)** - Isolated execution contexts that run their own loops and return summarized results
- **[Memory](https://code.claude.com/docs/en/memory)** - Persistent context via CLAUDE.md files and `@path` imports that Claude sees every session
- **[Rules](https://code.claude.com/docs/en/memory#modular-rules-with-clauderules)** - Modular topic-specific instructions in `.claude/rules/*.md` with optional path-scoping via frontmatter
- **[Hooks](https://code.claude.com/docs/en/hooks)** - Deterministic scripts that run outside the agentic loop on specific events
- **[MCP Servers](https://code.claude.com/docs/en/mcp)** - Model Context Protocol connections to external tools, databases, and APIs
- **[Plugins](https://code.claude.com/docs/en/plugins)** - Distributable packages that bundle skills, subagents, hooks, and MCP servers
- **[Marketplaces](https://code.claude.com/docs/en/discover-plugins)** - Host and discover plugin collections
- **[Settings](https://code.claude.com/docs/en/settings)** - Hierarchical configuration system for Claude Code behavior
- **[Permissions](https://code.claude.com/docs/en/iam)** - Fine-grained access control for tools and operations

**Extension Overview:** See [Extend Claude Code](https://code.claude.com/docs/en/features-overview) for when to use each feature and how they layer together.

## MY EXPERIENCE

■ **Workflows**
- Claude.md should not exceed 150+ lines. (still not 100% guarenteed)
- use commands for your workflows instead of agents
- have feature specific subagents (extra context) with skills (progressive disclosure) instead of general qa, backend engineer.
- /memory, /rules, constitution.md does not guarentee anything
- do manual /compact at max 50%
- always start with plan mode
- subtasks should be so small that it can be completed in less than 50% context
- vanilla cc is better than any workflows with smaller tasks
- commit often, as soon as task is completed, commit.

■ **Utilities**
- iTerm terminal instead of IDE (crash issue) 
- Wispr Flow for voice prompting (10x productivity)
- claude-code-voice-hooks for claude feedback
- status line for context awareness and fast compacting
- git worktress for parallel development
- /config dont ask permission mode instead of dangerously—skip--permissions

■ **Debugging** 
- /doctor
- always ask claude to run the terminal (you want to see logs of) as a background task for better debugging
- use mcp (claude in chrome, playwright, chrome dev tool) to let claude see chrome console logs on its own
- provide screenshots of the issue

## CONTEXT ENGINEERING
- [Humanlayer - Writing a good Claude.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [Claude.md for larger monorepos - Boris Cherny on X](https://github.com/shanraisshan/claude-code-best-practice/blob/main/reports/claude-md-for-larger-mono-repos.md)

## WORKFLOWS
- [Ralph plugin with sandbox](https://www.youtube.com/watch?v=eAtvoGlpeRU)
- [Human Layer RPI - Research Plan Implement](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md)
- [AgentOs - 2026 its overkill (Brian Casel)](https://www.youtube.com/watch?v=0hdFJA-ho3c)
- [Github Speckit](https://github.com/github/spec-kit)
- [GSD - Get Shit Done](https://github.com/glittercowboy/get-shit-done)
- [OpenSpec OPSX](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md)
- [Superpower](https://github.com/obra/superpowers)
- [Andrej Karpathy Workflow](https://github.com/forrestchang/andrej-karpathy-skills)

## KEYWORDS

### Claude Keywords
- [btw] start prompt with btw to let the current task executing in background
- [claude --dangerously-skip-permissions] "defaultMode": "bypassPermissions"
- *deprecated** [ultrathink] Triggers extended thinking with up to ~32K thinking tokens for a single request.

### Community
- Agentic Workflow
- AI Slop
- Context Engineering
- Context Rot
- Dumb Zone
- Hallucination
- One Shot
- Rate Limit Jail / Cooldown
- Slot Machine Method = Save state → let Claude run → revert if bad results → try again
- The Holy Trinity = Skills + Agents + Hooks working together
- Token Burn
- Vibe Coding

## CLAUDE CODE FEATURES INSPIRATION

- [Claude Code Tasks - inspired by beats](https://www.reddit.com/r/ClaudeAI/comments/1qkjznp/anthropic_replaced_claude_codes_old_todos_with/) [Inspiration](https://github.com/steveyegge/beads)
- [Ralph Plugin](https://x.com/GeoffreyHuntley/status/2015031262692753449)

## COMMAND + SKILL + SUBAGENT ARCHITECTURE

<p align="center">
  <img src="assets/command-skill-agent-flow.svg" alt="Command Skill Agent Architecture Flow" width="600">
</p>

| Component | Role | Example |
|-----------|------|---------|
| **Command** | Entry point, user interaction | `/weather-orchestrator` |
| **Agent** | Orchestrates workflow with preloaded skills | `weather` agent |
| **Skills** | Domain knowledge injected at startup | `weather-fetcher`, `weather-transformer` |

**When to use:** Multi-step workflows • Domain-specific knowledge injection • Sequential tasks • Reusable components

**Why it works:** Progressive disclosure • Single execution context • Clean separation • Reusability

See [docs/weather-flow-architecture.md](docs/weather-flow-architecture.md) for implementation details.
