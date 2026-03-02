# claude-code-best-practice
practice makes claude perfect

![Last Updated](https://img.shields.io/badge/Last_Updated-Feb_28%2C_2026_07%3A59_PM_PKT-white?style=flat&labelColor=555) <a href="https://github.com/shanraisshan/claude-code-best-practice/stargazers"><img src="https://img.shields.io/github/stars/shanraisshan/claude-code-best-practice?style=flat&label=%E2%98%85&labelColor=555&color=white" alt="GitHub Stars"></a>

[![Best Practice](!/tags/best-practice.svg)](best-practice/) *Click on this badge to show the latest best practice*<br>
[![Implemented](!/tags/implemented.svg)](implementation/) *Click on this badge to show implementation in this repo*<br>
[![Orchestration Workflow](!/tags/orchestration-workflow.svg)](orchestration-workflow/orchestration-workflow.md) *Click on this badge to see the Command → Agent → Skills orchestration workflow*

<p align="center">
  <img src="!/claude-jumping.svg" alt="Claude Code mascot jumping" width="120" height="100">
</p>

<table align="center">
  <tr>
    <td><img src="!/boris-cherny.png" alt="Claude Code Creator" width="100%"></td>
    <td><img src="!/boris-cherny-2.png" alt="Claude Code Creator" width="100%"></td>
  </tr>
</table>


## CONCEPTS

| Feature | Location | Description |
|---------|----------|-------------|
| [**Commands**](https://code.claude.com/docs/en/skills) | `.claude/commands/<name>.md` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-commands.md) [![Implemented](!/tags/implemented.svg)](.claude/commands/) Entry-point prompts for workflows — invoke with `/command-name` |
| [**Sub-Agents**](https://code.claude.com/docs/en/sub-agents) | `.claude/agents/<name>.md` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-subagents.md) [![Implemented](!/tags/implemented.svg)](implementation/claude-subagents-implementation.md) Custom agents with their own name, color, tools, permissions, and model — usable as main agent or isolated subagents via the Task tool |
| [**Skills**](https://code.claude.com/docs/en/skills) | `.claude/skills/<name>/SKILL.md` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-commands.md#skills-frontmatter-fields) [![Implemented](!/tags/implemented.svg)](.claude/skills/) Reusable knowledge, workflows, and slash commands — load on-demand or invoke with `/skill-name` |
| [**Memory**](https://code.claude.com/docs/en/memory) | `CLAUDE.md` | Persistent context via CLAUDE.md files and `@path` imports that Claude sees every session |
| [**Rules**](https://code.claude.com/docs/en/memory#modular-rules-with-clauderules) | `.claude/rules/*.md` | Modular topic-specific instructions with optional path-scoping via frontmatter |
| [**Hooks**](https://code.claude.com/docs/en/hooks) | `.claude/hooks/` | Deterministic scripts that run outside the agentic loop on specific events |
| [**MCP Servers**](https://code.claude.com/docs/en/mcp) | `.claude/settings.json` | Model Context Protocol connections to external tools, databases, and APIs |
| [**Plugins**](https://code.claude.com/docs/en/plugins) | distributable packages | Bundles of skills, subagents, hooks, and MCP servers |
| [**Marketplaces**](https://code.claude.com/docs/en/discover-plugins) | plugin registries | Host and discover plugin collections |
| [**Sandboxing**](https://code.claude.com/docs/en/sandboxing) | runtime config | File and network isolation that improves safety while reducing permission prompts |
| [**Output Styles**](https://code.claude.com/docs/en/output-styles) | `.claude/settings.json` | Configurable response tone and format — Explanatory, Learning, or Custom |
| [**Settings**](https://code.claude.com/docs/en/settings) | `.claude/settings.json` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-settings.md) [![Implemented](!/tags/implemented.svg)](.claude/settings.json) Hierarchical configuration system for Claude Code behavior (37 settings, 84 env vars) |
| [**Permissions**](https://code.claude.com/docs/en/iam) | `.claude/settings.json` | Fine-grained access control for tools and operations with wildcard syntax |

> **Note:** Custom slash commands have been merged into skills. Files in `.claude/commands/` still work, but skills (`.claude/skills/`) are recommended as they support additional features like supporting files, invocation control, and subagent execution.

<a id="orchestration-workflow"></a>

## <a href="orchestration-workflow/orchestration-workflow.md"><img src="!/tags/orchestration-workflow-hd.svg" alt="Orchestration Workflow"></a>

Workflow orchestration using the **Command → Agent → Skills** pattern.

<p align="center">
  <img src="!/command-skill-agent-flow.svg" alt="Command Skill Agent Architecture Flow" width="100%">
</p>

| Component | Role | Example |
|-----------|------|---------|
| **Command** | Entry point, user interaction | `/weather-orchestrator` |
| **Agent** | Orchestrates workflow with preloaded skills | `weather` agent |
| **Skills** | Domain knowledge injected at startup | `weather-fetcher`, `weather-transformer` |

See [orchestration-workflow](orchestration-workflow/orchestration-workflow.md) for implementation details.

## MY EXPERIENCE

■ **Workflows**
- Claude.md should not exceed 150+ lines. (still not 100% guaranteed)
- use commands for your workflows instead of agents
- have feature specific subagents (extra context) with skills (progressive disclosure) instead of general qa, backend engineer.
- /memory, /rules, constitution.md does not guarantee anything
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
- git worktrees for parallel development
- /permissions with wildcard syntax (`Bash(npm run *)`, `Edit(/docs/**)`) instead of dangerously-skip-permissions
- /sandbox to reduce permission prompts with file and network isolation
- output styles: use Explanatory when learning a new codebase, Learning for coaching
- /keybindings to remap any key, settings live reload

■ **Debugging** 
- /doctor
- always ask claude to run the terminal (you want to see logs of) as a background task for better debugging
- use mcp (claude in chrome, playwright, chrome dev tool) to let claude see chrome console logs on its own
- provide screenshots of the issue

## TIPS FROM BORIS CHERNY (CREATOR OF CLAUDE CODE)
- [Feb 2026 - 12 Tips](reports/claude-boris-tips-feb-26.md) ([Reddit thread](https://www.reddit.com/r/ClaudeAI/comments/1r2m8ma/12_claude_code_tips_from_creator_of_claude_code/))

## CONTEXT ENGINEERING
- [Humanlayer - Writing a good Claude.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [Claude.md for larger monorepos - Boris Cherny on X](https://github.com/shanraisshan/claude-code-best-practice/blob/main/reports/claude-md-for-larger-mono-repos.md)

## WORKFLOWS
- [RPI](workflow/rpi/rpi-workflow.md)
- [Boris Feb26 workflow](https://x.com/bcherny/status/2017742741636321619)
- [Ralph plugin with sandbox](https://www.youtube.com/watch?v=eAtvoGlpeRU)
- [Human Layer RPI - Research Plan Implement](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md)
- [AgentOs - 2026 its overkill (Brian Casel)](https://www.youtube.com/watch?v=0hdFJA-ho3c)
- [Github Speckit](https://github.com/github/spec-kit)
- [GSD - Get Shit Done](https://github.com/glittercowboy/get-shit-done)
- [OpenSpec OPSX](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md)
- [Superpower](https://github.com/obra/superpowers)
- [Andrej Karpathy Workflow](https://github.com/forrestchang/andrej-karpathy-skills)
- [Creator of Clawd Bot Workflow](https://www.youtube.com/watch?v=8lF7HmQ_RgY)





## CLAUDE CODE FEATURES INSPIRATION

- [Claude Code Tasks - inspired by beats](https://www.reddit.com/r/ClaudeAI/comments/1qkjznp/anthropic_replaced_claude_codes_old_todos_with/) [Inspiration](https://github.com/steveyegge/beads)
- [Ralph Plugin](https://x.com/GeoffreyHuntley/status/2015031262692753449)

## AI TERMS

| | | | | |
|---|---|---|---|---|
| Agentic Engineering | AI Slop | Context Bloat | Context Engineering | Context Rot |
| Dumb Zone | Hallucination | Scaffolding | Orchestration | Vibe Coding |

[**See Complete List →**](https://github.com/shanraisshan/claude-code-codex-cursor-gemini/blob/main/reports/ai-terms.md)

## CLI STARTUP FLAGS

| | | | | |
|---|---|---|---|---|
| `--dangerously-skip-permissions` | `--model` | `--print` | `--resume` | `--continue` |
| `--system-prompt` | `--verbose` | `--debug` | `--init` | `--max-turns` |

[**See Complete List →**](reports/claude-cli-startup-flags.md)

## CLAUDE COMMANDS

| | | | | |
|---|---|---|---|---|
| `/compact` | `/context` | `/model` | `/plan` | `/config` |
| `/clear` | `/cost` | `/memory` | `/doctor` | `/rewind` |

[**See Complete List →**](best-practice/claude-commands.md)


## CLAUDE SETTINGS

| | |
|---|---|
| [**Claude Settings**](best-practice/claude-settings.md) | [**Global vs Project Settings**](reports/claude-global-vs-project-settings.md) |


## MCP SERVERS FOR DAILY USE

> *"Went overboard with 15 MCP servers thinking more = better. Ended up using only 4 daily."* — [r/mcp](https://reddit.com/r/mcp/comments/1mj0fxs/) (682 upvotes)

| MCP Server | What It Does | Resources |
|------------|-------------|-----------|
| [**Context7**](https://github.com/upstash/context7) | Fetches up-to-date library docs into context. Prevents hallucinated APIs from outdated training data | [Reddit: "by far the best MCP for coding"](https://reddit.com/r/mcp/comments/1qarjqm/) · [npm](https://www.npmjs.com/package/@upstash/context7-mcp) |
| [**Playwright**](https://github.com/microsoft/playwright-mcp) | Browser automation — implement, test, and verify UI features autonomously. Screenshots, navigation, form testing | [Reddit: essential for frontend](https://reddit.com/r/mcp/comments/1m59pk0/) · [Docs](https://playwright.dev/) |
| [**Claude in Chrome**](https://github.com/nicobailon/claude-code-in-chrome-mcp) | Connects Claude to your real Chrome browser — inspect console, network, DOM. Debug what users actually see | [Reddit: "game changer" for debugging](https://reddit.com/r/mcp/comments/1qarjqm/5_mcps_that_have_genuinely_made_me_10x_faster/nza0i7t/) · [Comparison Report](reports/claude-in-chrome-v-chrome-devtools-mcp.md) |
| [**DeepWiki**](https://github.com/devanshusemwal/deepwiki-mcp) | Fetches structured wiki-style documentation for any GitHub repo — architecture, API surface, relationships | [Reddit: "put it behind a gateway with Context7"](https://reddit.com/r/mcp/comments/1qarjqm/) |
| [**Excalidraw**](https://github.com/antonpk1/excalidraw-mcp-app) | Generate architecture diagrams, flowcharts, and system designs as hand-drawn Excalidraw sketches from prompts | [GitHub](https://github.com/antonpk1/excalidraw-mcp-app) |

Research (Context7/DeepWiki) -> Debug (Playwright/Chrome) -> Document (Excalidraw)

## REPORTS

| Report | Description |
|--------|-------------|
| [Agent SDK vs CLI System Prompts](reports/claude-agent-sdk-vs-cli-system-prompts.md) | Why Claude CLI and Agent SDK outputs may differ—system prompt architecture and determinism |
| [Browser Automation MCP Comparison](reports/claude-in-chrome-v-chrome-devtools-mcp.md) | Comparison of Playwright, Chrome DevTools, and Claude in Chrome for automated testing |
| [Claude Code CLI Startup Flags](reports/claude-cli-startup-flags.md) | Complete reference of all CLI flags, subcommands, and environment variables |
| [CLAUDE.md Loading in Monorepos](reports/claude-md-for-larger-mono-repos.md) | Understanding ancestor vs descendant loading behavior for CLAUDE.md files |
| [Global vs Project Settings](reports/claude-global-vs-project-settings.md) | Which features are global-only (`~/.claude/`) vs dual-scope, including Tasks and Agent Teams |
| [Skills Discovery in Monorepos](reports/claude-skills-for-larger-mono-repos.md) | How skills are discovered and loaded in large monorepo projects |
| [Agent Memory Frontmatter](reports/claude-agent-memory.md) | Persistent memory scopes (`user`, `project`, `local`) for subagents — enabling agents to learn across sessions |
| [Boris Cherny's 12 Customization Tips](reports/claude-boris-tips-feb-26.md) | 12 ways to customize Claude Code — from terminal config to plugins, agents, hooks, and output styles |
| [Advanced Tool Use Patterns](reports/claude-advanced-tool-use.md) | Programmatic Tool Calling (PTC), Tool Search, and Tool Use Examples |
| [Usage, Rate Limits & Extra Usage](reports/claude-usage-and-rate-limits.md) | Usage commands (`/usage`, `/extra-usage`, `/cost`), rate limits, and pay-as-you-go overflow billing |
| [Commands Reference](best-practice/claude-commands.md) | Complete reference for Claude Code commands — command definitions, frontmatter fields, and all built-in slash commands |
| [Claude Code Settings Reference](best-practice/claude-settings.md) | Comprehensive guide to all `settings.json` configuration options |
| [Subagents Reference](best-practice/claude-subagents.md) | Complete reference for Claude Code subagents — built-in agents, custom agents, and frontmatter fields |
