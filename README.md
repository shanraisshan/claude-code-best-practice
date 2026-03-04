# claude-code-best-practice
practice makes claude perfect

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar_04%2C_2026_1%3A16_PM_PKT-white?style=flat&labelColor=555) <a href="https://github.com/shanraisshan/claude-code-best-practice/stargazers"><img src="https://img.shields.io/github/stars/shanraisshan/claude-code-best-practice?style=flat&label=%E2%98%85&labelColor=555&color=white" alt="GitHub Stars"></a>

[![Best Practice](!/tags/best-practice.svg)](best-practice/) *Click on this badge to show the latest best practice*<br>
[![Implemented](!/tags/implemented.svg)](implementation/) *Click on this badge to show implementation in this repo*<br>
[![Orchestration Workflow](!/tags/orchestration-workflow.svg)](orchestration-workflow/orchestration-workflow.md) *Click on this badge to see the Command → Agent → Skill orchestration workflow*

<p align="center">
  <img src="!/claude-jumping.svg" alt="Claude Code mascot jumping" width="120" height="100">
</p>

<p align="center">
  <img src="!/slider/boris-slider.gif" alt="Boris Cherny on Claude Code" width="600"><br>
  Boris Cherny on X (<a href="https://x.com/bcherny/status/2007179832300581177">tweet 1</a> · <a href="https://x.com/bcherny/status/2017742741636321619">tweet 2</a> · <a href="https://x.com/bcherny/status/2021699851499798911">tweet 3</a>)
</p>


## CONCEPTS

| Feature | Location | Description |
|---------|----------|-------------|
| [**Commands**](https://code.claude.com/docs/en/skills) | `.claude/commands/<name>.md` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-commands.md) [![Implemented](!/tags/implemented.svg)](implementation/claude-commands-implementation.md) Entry-point prompts for workflows — invoke with `/command-name` |
| [**Sub-Agents**](https://code.claude.com/docs/en/sub-agents) | `.claude/agents/<name>.md` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-subagents.md) [![Implemented](!/tags/implemented.svg)](implementation/claude-subagents-implementation.md) Custom agents with their own name, color, tools, permissions, and model |
| [**Skills**](https://code.claude.com/docs/en/skills) | `.claude/skills/<name>/SKILL.md` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-skills.md) [![Implemented](!/tags/implemented.svg)](implementation/claude-skills-implementation.md) Reusable knowledge, workflows, and slash commands — load on-demand or invoke with `/skill-name` |
| [**Workflows**](https://code.claude.com/docs/en/common-workflows) | [`.claude/commands/weather-orchestrator.md`](.claude/commands/weather-orchestrator.md) | [![Orchestration Workflow](!/tags/orchestration-workflow.svg)](orchestration-workflow/orchestration-workflow.md) |
| [**Hooks**](https://code.claude.com/docs/en/hooks) | `.claude/hooks/` | [![Best Practice](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-voice-hooks) [![Implemented](!/tags/implemented.svg)](.claude/hooks/) Deterministic scripts that run outside the agentic loop on specific events |
| [**MCP Servers**](https://code.claude.com/docs/en/mcp) | `.claude/settings.json`, `.mcp.json` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-mcp.md) [![Implemented](!/tags/implemented.svg)](.mcp.json) Model Context Protocol connections to external tools, databases, and APIs |
| [**Plugins**](https://code.claude.com/docs/en/plugins) | distributable packages | Bundles of skills, subagents, hooks, and MCP servers · [Marketplaces](https://code.claude.com/docs/en/discover-plugins) |
| [**Settings**](https://code.claude.com/docs/en/settings) | `.claude/settings.json` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-settings.md) [![Implemented](!/tags/implemented.svg)](.claude/settings.json) Hierarchical configuration system · [Permissions](https://code.claude.com/docs/en/permissions) · [Model Config](https://code.claude.com/docs/en/model-config) · [Output Styles](https://code.claude.com/docs/en/output-styles) · [Sandboxing](https://code.claude.com/docs/en/sandboxing) · [Keybindings](https://code.claude.com/docs/en/keybindings) · [Fast Mode](https://code.claude.com/docs/en/fast-mode) |
| [**Status Line**](https://code.claude.com/docs/en/statusline) | `.claude/settings.json` | [![Best Practice](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-status-line) [![Implemented](!/tags/implemented.svg)](.claude/settings.json) Customizable status bar showing context usage, model, cost, and session info |
| [**Memory**](https://code.claude.com/docs/en/memory) | `CLAUDE.md`, `~/.claude/projects/<project>/memory/` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-memory.md) [![Implemented](!/tags/implemented.svg)](CLAUDE.md) Persistent context via CLAUDE.md files and `@path` imports · [Auto Memory](https://code.claude.com/docs/en/memory) · [Rules](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) |
| [**Checkpointing**](https://code.claude.com/docs/en/checkpointing) | automatic (git-based) | Automatic tracking of file edits with rewind (`Esc Esc` or `/rewind`) and targeted summarization |
| [**CLI Startup Flags**](https://code.claude.com/docs/en/cli-reference) | `claude [flags]` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-cli-startup-flags.md) Command-line flags, subcommands, and environment variables for launching Claude Code |
| **AI Terms** | | [![Best Practice](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-codex-cursor-gemini/blob/main/reports/ai-terms.md) Agentic Engineering · Context Engineering · Vibe Coding |
| [**Best Practices**](https://code.claude.com/docs/en/best-practices) | | Official best practices · [Prompt Engineering](https://github.com/anthropics/prompt-eng-interactive-tutorial) · [Extend Claude Code](https://code.claude.com/docs/en/features-overview) |

### 🔥 Hot

| Feature | Location | Description |
|---------|----------|-------------|
| [**Agent Teams**](https://code.claude.com/docs/en/agent-teams) | `.claude/agents/<name>.md` | Multiple agents working in parallel on the same codebase with shared task coordination |
| [**Voice Mode**](https://x.com/trq212/status/2028628570692890800) | built-in command | speak to prompt - /voice to activate|
| [**Remote Control**](https://code.claude.com/docs/en/remote-control) | built-in command | Continue local sessions from any device — phone, tablet, or browser · [Headless Mode](https://code.claude.com/docs/en/headless) |
| [**Git Worktrees**](https://code.claude.com/docs/en/common-workflows) | built-in | [![Best Practice](!/tags/best-practice.svg)](https://x.com/bcherny/status/2025007393290272904) Isolated git branches for parallel development — each agent gets its own working copy |
| [**Ralph Wiggum Loop**](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum) | plugin | [![Best Practice](!/tags/best-practice.svg)](https://github.com/ghuntley/how-to-ralph-wiggum) [![Implemented](!/tags/implemented.svg)](https://github.com/shanraisshan/novel-llm-26) Autonomous development loop for long-running tasks — iterates until completion |

<a id="orchestration-workflow"></a>

## <a href="orchestration-workflow/orchestration-workflow.md"><img src="!/tags/orchestration-workflow-hd.svg" alt="Orchestration Workflow"></a>

See [orchestration-workflow](orchestration-workflow/orchestration-workflow.md) for implementation details of **Command → Agent → Skill** pattern.


<p align="center">
  <img src="!/command-skill-agent-flow.svg" alt="Command Skill Agent Architecture Flow" width="100%">
</p>

![How to Use](!/tags/how-to-use.svg)

```bash
claude
/weather-orchestrator
```

| Component | Role | Example |
|-----------|------|---------|
| **Command** | Entry point, user interaction | [`/weather-orchestrator`](.claude/commands/weather-orchestrator.md) |
| **Agent** | Fetches data with preloaded skill (agent skill) | [`weather-agent`](.claude/agents/weather-agent.md) with [`weather-fetcher`](.claude/skills/weather-fetcher/SKILL.md) |
| **Skill** | Creates output independently (skill) | [`weather-svg-creator`](.claude/skills/weather-svg-creator/SKILL.md) |

## DEVELOPMENT WORKFLOWS
- [RPI](development-workflows/rpi/rpi-workflow.md) [![Implemented](!/tags/implemented.svg)](development-workflows/rpi/rpi-workflow.md)
- [Boris Feb26 workflow](https://x.com/bcherny/status/2017742741636321619)
- [Ralph plugin with sandbox](https://www.youtube.com/watch?v=eAtvoGlpeRU) [![Implemented](!/tags/implemented.svg)](https://github.com/shanraisshan/novel-llm-26)
- [Human Layer RPI - Research Plan Implement](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md)
- [AgentOs - 2026 its overkill (Brian Casel)](https://www.youtube.com/watch?v=0hdFJA-ho3c)
- [Github Speckit](https://github.com/github/spec-kit)
- [GSD - Get Shit Done](https://github.com/glittercowboy/get-shit-done)
- [OpenSpec OPSX](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md)
- [Superpower](https://github.com/obra/superpowers)
- [Andrej Karpathy Workflow](https://github.com/forrestchang/andrej-karpathy-skills)
- [Creator of Clawd Bot Workflow](https://www.youtube.com/watch?v=8lF7HmQ_RgY)

## TIPS AND TRICKS

![Shayan](!/tags/shayan.svg)

■ **Workflows**
- [CLAUDE.md](https://code.claude.com/docs/en/memory) should not exceed 150+ lines. [60 lines in humanlayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md) (still not 100% guaranteed)
- use [multiple CLAUDE.md](best-practice/claude-memory.md) for monorepos — ancestor + descendant loading
- use [commands](https://code.claude.com/docs/en/skills) for your workflows instead of [agents](https://code.claude.com/docs/en/sub-agents)
- have feature specific [subagents](https://code.claude.com/docs/en/sub-agents) (extra context) with [skills](https://code.claude.com/docs/en/skills) (progressive disclosure) instead of general qa, backend engineer.
- [/memory](https://code.claude.com/docs/en/memory), [/rules](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules), constitution.md does not guarantee anything
- avoid agent dumb zone, do manual /compact at max 50%
- always start with [plan mode](https://code.claude.com/docs/en/common-workflows)
- vanilla cc is better than any workflows with smaller tasks
- [agent teams](https://code.claude.com/docs/en/agent-teams) and [git worktrees](https://x.com/bcherny/status/2025007393290272904) for parallel development
- use [Ralph Wiggum plugin](https://github.com/shanraisshan/novel-llm-26) for long-running autonomous tasks

■ **Daily**
- [update](https://code.claude.com/docs/en/setup) Claude Code daily and start your day by reading the [changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)

■ **Hourly**
- commit often, as soon as task is completed, commit.

■ **Utilities**
- [iTerm](https://iterm2.com/) terminal instead of IDE (crash issue)
- [Wispr Flow](https://wisprflow.ai) for voice prompting (10x productivity)
- [claude-code-voice-hooks](https://github.com/shanraisshan/claude-code-voice-hooks) for claude feedback
- [status line](https://github.com/shanraisshan/claude-code-status-line) for context awareness and fast compacting
- [/permissions](https://code.claude.com/docs/en/permissions) with wildcard syntax (`Bash(npm run *)`, `Edit(/docs/**)`) instead of dangerously-skip-permissions
- [/sandbox](https://code.claude.com/docs/en/sandboxing) to reduce permission prompts with file and network isolation
- explore [settings.json](best-practice/claude-settings.md) features like [Output Styles](https://code.claude.com/docs/en/output-styles) (e.g. Explanatory when learning a new codebase), Plan Directory, Spinner Verbs for a personalized experience

■ **Debugging**
- [/doctor](https://code.claude.com/docs/en/cli-reference)
- always ask claude to run the terminal (you want to see logs of) as a background task for better debugging
- use mcp ([Claude in Chrome](https://code.claude.com/docs/en/chrome), [Playwright](https://github.com/microsoft/playwright-mcp), [Chrome DevTools](https://developer.chrome.com/blog/chrome-devtools-mcp)) to let claude see chrome console logs on its own
- provide screenshots of the issue
- use a different model for QA — e.g. [Codex](https://chatgpt.com/codex) for plan and implementation review

![Boris Cherny + Team](!/tags/boris-team.svg)

- [Boris setup - 5 tips | 03/Jan/26]() ● [Tweet](https://x.com/bcherny/status/2007179832300581177)
- [10 tips for using claude code by team itself | 01/Feb/26]() ● [Tweet](https://x.com/bcherny/status/2017742741636321619)
- [12 ways how people are customizing their claudes | 12/Feb/26](tips/claude-boris-tips-feb-26.md) ● [Tweet](https://x.com/bcherny/status/2021699851499798911)
- [Git Worktrees - 5 ways how boris is using | 21 Feb 2026]() ● [Tweet](https://x.com/bcherny/status/2025007393290272904)
- [Seeing like an Agent - lessons from building Claude Code (Thariq) | 28 Feb 2026]() ● [Article](https://x.com/trq212/status/2027463795355095314)

## ☠️ STARTUPS / BUSINESSES

| Claude | Replaced |
|-|-|
|[**Voice Mode**](https://x.com/trq212/status/2028628570692890800)|[Wispr Flow](https://wisprflow.ai), [SuperWhisper](https://superwhisper.com/)|
|[**Remote Control**](https://code.claude.com/docs/en/remote-control)|[OpenClaw](https://openclaw.ai/)
|[**Cowork**](https://code.claude.com/docs/en/cowork)|[OpenAI Operator](https://openai.com/operator), [AgentShadow](https://agentshadow.ai)
|[**Tasks**](https://x.com/trq212/status/2014480496013803643)|[Beads](https://github.com/steveyegge/beads)
|[**Plan Mode**](https://code.claude.com/docs/en/common-workflows)|[Agent OS](https://github.com/buildermethods/agent-os)|
|[**Skills / Plugins**](https://code.claude.com/docs/en/plugins)|YC AI wrapper startups ([reddit](https://reddit.com/r/ClaudeAI/comments/1r6bh4d/claude_code_skills_are_basically_yc_ai_startup/))|

## REPORTS

| Report | Description |
|--------|-------------|
| [Agent SDK vs CLI System Prompts](reports/claude-agent-sdk-vs-cli-system-prompts.md) | Why Claude CLI and Agent SDK outputs may differ—system prompt architecture and determinism |
| [Browser Automation MCP Comparison](reports/claude-in-chrome-v-chrome-devtools-mcp.md) | Comparison of Playwright, Chrome DevTools, and Claude in Chrome for automated testing |
| [Global vs Project Settings](reports/claude-global-vs-project-settings.md) | Which features are global-only (`~/.claude/`) vs dual-scope, including Tasks and Agent Teams |
| [Skills Discovery in Monorepos](reports/claude-skills-for-larger-mono-repos.md) | How skills are discovered and loaded in large monorepo projects |
| [Agent Memory Frontmatter](reports/claude-agent-memory.md) | Persistent memory scopes (`user`, `project`, `local`) for subagents — enabling agents to learn across sessions |
| [Advanced Tool Use Patterns](reports/claude-advanced-tool-use.md) | Programmatic Tool Calling (PTC), Tool Search, and Tool Use Examples |
| [Usage, Rate Limits & Extra Usage](reports/claude-usage-and-rate-limits.md) | Usage commands (`/usage`, `/extra-usage`, `/cost`), rate limits, and pay-as-you-go overflow billing |
