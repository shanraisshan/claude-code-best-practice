# claude-code-best-practice
practice makes claude perfect

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar%2014%2C%202026%2006%3A41%20AM%20PKT-white?style=flat&labelColor=555) <a href="https://github.com/shanraisshan/claude-code-best-practice/stargazers"><img src="https://img.shields.io/github/stars/shanraisshan/claude-code-best-practice?style=flat&label=%E2%98%85&labelColor=555&color=white" alt="GitHub Stars"></a>

[![Best Practice](!/tags/best-practice.svg)](best-practice/) *Click on this badge to show the latest best practice*<br>
[![Implemented](!/tags/implemented.svg)](implementation/) *Click on this badge to show implementation in this repo*<br>
[![Orchestration Workflow](!/tags/orchestration-workflow.svg)](orchestration-workflow/orchestration-workflow.md) *Click on this badge to see the Command → Agent → Skill orchestration workflow*

<p align="center">
  <img src="!/claude-jumping.svg" alt="Claude Code mascot jumping" width="120" height="100">
</p>

<p align="center">
  <img src="!/root/boris-slider.gif" alt="Boris Cherny on Claude Code" width="600"><br>
  Boris Cherny on X (<a href="https://x.com/bcherny/status/2007179832300581177">tweet 1</a> · <a href="https://x.com/bcherny/status/2017742741636321619">tweet 2</a> · <a href="https://x.com/bcherny/status/2021699851499798911">tweet 3</a>)
</p>


## 🧠 CONCEPTS

| Feature | Location | Description |
|---------|----------|-------------|
| [**Commands**](https://code.claude.com/docs/en/slash-commands) | `.claude/commands/<name>.md` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-commands.md) [![Implemented](!/tags/implemented.svg)](implementation/claude-commands-implementation.md) Knowledge injected into existing context — simple user-invoked prompt templates for workflow orchestration |
| [**Sub-Agents**](https://code.claude.com/docs/en/sub-agents) | `.claude/agents/<name>.md` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-subagents.md) [![Implemented](!/tags/implemented.svg)](implementation/claude-subagents-implementation.md) Autonomous actor in fresh isolated context — custom tools, permissions, model, memory, and persistent identity |
| [**Skills**](https://code.claude.com/docs/en/skills) | `.claude/skills/<name>/SKILL.md` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-skills.md) [![Implemented](!/tags/implemented.svg)](implementation/claude-skills-implementation.md) Knowledge injected into existing context — configurable, preloadable, auto-discoverable, with context forking and progressive disclosure · [Official Skills](https://github.com/anthropics/skills/tree/main/skills) |
| [**Workflows**](https://code.claude.com/docs/en/common-workflows) | [`.claude/commands/weather-orchestrator.md`](.claude/commands/weather-orchestrator.md) | [![Orchestration Workflow](!/tags/orchestration-workflow.svg)](orchestration-workflow/orchestration-workflow.md) |
| [**Hooks**](https://code.claude.com/docs/en/hooks) | `.claude/hooks/` | [![Best Practice](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-voice-hooks) [![Implemented](!/tags/implemented.svg)](https://github.com/shanraisshan/claude-code-voice-hooks) Deterministic scripts that run outside the agentic loop on specific events |
| [**MCP Servers**](https://code.claude.com/docs/en/mcp) | `.claude/settings.json`, `.mcp.json` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-mcp.md) [![Implemented](!/tags/implemented.svg)](.mcp.json) Model Context Protocol connections to external tools, databases, and APIs |
| [**Plugins**](https://code.claude.com/docs/en/plugins) | distributable packages | Bundles of skills, subagents, hooks, and MCP servers · [Marketplaces](https://code.claude.com/docs/en/discover-plugins) |
| [**Settings**](https://code.claude.com/docs/en/settings) | `.claude/settings.json` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-settings.md) [![Implemented](!/tags/implemented.svg)](.claude/settings.json) Hierarchical configuration system · [Permissions](https://code.claude.com/docs/en/permissions) · [Model Config](https://code.claude.com/docs/en/model-config) · [Output Styles](https://code.claude.com/docs/en/output-styles) · [Sandboxing](https://code.claude.com/docs/en/sandboxing) · [Keybindings](https://code.claude.com/docs/en/keybindings) · [Fast Mode](https://code.claude.com/docs/en/fast-mode) |
| [**Status Line**](https://code.claude.com/docs/en/statusline) | `.claude/settings.json` | [![Best Practice](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-status-line) [![Implemented](!/tags/implemented.svg)](.claude/settings.json) Customizable status bar showing context usage, model, cost, and session info |
| [**Memory**](https://code.claude.com/docs/en/memory) | `CLAUDE.md`, `.claude/rules/`, `~/.claude/rules/`, `~/.claude/projects/<project>/memory/` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-memory.md) [![Implemented](!/tags/implemented.svg)](CLAUDE.md) Persistent context via CLAUDE.md files and `@path` imports · [Auto Memory](https://code.claude.com/docs/en/memory) · [Rules](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) |
| [**Checkpointing**](https://code.claude.com/docs/en/checkpointing) | automatic (git-based) | Automatic tracking of file edits with rewind (`Esc Esc` or `/rewind`) and targeted summarization |
| [**CLI Startup Flags**](https://code.claude.com/docs/en/cli-reference) | `claude [flags]` | [![Best Practice](!/tags/best-practice.svg)](best-practice/claude-cli-startup-flags.md) Command-line flags, subcommands, and environment variables for launching Claude Code · [Interactive Mode](https://code.claude.com/docs/en/interactive-mode) |
| **AI Terms** | | [![Best Practice](!/tags/best-practice.svg)](https://github.com/shanraisshan/claude-code-codex-cursor-gemini/blob/main/reports/ai-terms.md) Agentic Engineering · Context Engineering · Vibe Coding |
| [**Best Practices**](https://code.claude.com/docs/en/best-practices) | | Official best practices · [Prompt Engineering](https://github.com/anthropics/prompt-eng-interactive-tutorial) · [Extend Claude Code](https://code.claude.com/docs/en/features-overview) |

### 🔥 Hot

| Feature | Location | Description |
|---------|----------|-------------|
| [**/btw**](https://x.com/trq212/status/2031506296697131352) | `/btw` | [![Best Practice](!/tags/best-practice.svg)](https://x.com/trq212/status/2031506296697131352) Side chain conversations while Claude is working |
| [**Code Review**](https://code.claude.com/docs/en/code-review) ![beta](!/tags/beta.svg) | GitHub App (managed) | [![Best Practice](!/tags/best-practice.svg)](https://x.com/claudeai/status/2031088171262554195) Multi-agent PR analysis that catches bugs, security vulnerabilities, and regressions · [Blog](https://claude.com/blog/code-review) |
| [**Scheduled Tasks**](https://code.claude.com/docs/en/scheduled-tasks) | `/loop`, cron tools | [![Best Practice](!/tags/best-practice.svg)](https://x.com/bcherny/status/2030193932404150413) [![Implemented](!/tags/implemented.svg)](implementation/claude-scheduled-tasks-implementation.md) Run prompts on a recurring schedule (up to 3 days), set one-time reminders, poll deployments and builds |
| [**Voice Mode**](https://x.com/trq212/status/2028628570692890800) ![beta](!/tags/beta.svg) | `/voice` | [![Best Practice](!/tags/best-practice.svg)](https://x.com/trq212/status/2028628570692890800) speak to prompt - /voice to activate|
| [**Simplify & Batch**](https://x.com/bcherny/status/2027534984534544489) | `/simplify`, `/batch` | [![Best Practice](!/tags/best-practice.svg)](https://x.com/bcherny/status/2027534984534544489) Built-in skills for code quality and bulk operations — simplify refactors for reuse and efficiency, batch runs commands across files |
| [**Agent Teams**](https://code.claude.com/docs/en/agent-teams) ![beta](!/tags/beta.svg) | built-in (env var) | [![Best Practice](!/tags/best-practice.svg)](https://x.com/bcherny/status/2019472394696683904) [![Implemented](!/tags/implemented.svg)](implementation/claude-agent-teams-implementation.md) Multiple agents working in parallel on the same codebase with shared task coordination |
| [**Remote Control**](https://code.claude.com/docs/en/remote-control) | `/remote-control`, `/rc` | Continue local sessions from any device — phone, tablet, or browser · [Headless Mode](https://code.claude.com/docs/en/headless) |
| [**Git Worktrees**](https://code.claude.com/docs/en/common-workflows) | built-in | [![Best Practice](!/tags/best-practice.svg)](https://x.com/bcherny/status/2025007393290272904) Isolated git branches for parallel development — each agent gets its own working copy |
| [**Ralph Wiggum Loop**](https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum) | plugin | [![Best Practice](!/tags/best-practice.svg)](https://github.com/ghuntley/how-to-ralph-wiggum) [![Implemented](!/tags/implemented.svg)](https://github.com/shanraisshan/novel-llm-26) Autonomous development loop for long-running tasks — iterates until completion |

<a id="orchestration-workflow"></a>

## <a href="orchestration-workflow/orchestration-workflow.md"><img src="!/tags/orchestration-workflow-hd.svg" alt="Orchestration Workflow"></a>

See [orchestration-workflow](orchestration-workflow/orchestration-workflow.md) for implementation details of **Command → Agent → Skill** pattern.


<p align="center">
  <img src="orchestration-workflow/orchestration-workflow.svg" alt="Command Skill Agent Architecture Flow" width="100%">
</p>

<p align="center">
  <img src="orchestration-workflow/orchestration-workflow.gif" alt="Orchestration Workflow Demo" width="600">
</p>

![How to Use](!/tags/how-to-use.svg)

```bash
claude
/weather-orchestrator
```

## ⚙️ DEVELOPMENT WORKFLOWS

### 🔥 Hot
- [Cross-Model (Claude Code + Codex) Workflow](development-workflows/cross-model-workflow/cross-model-workflow.md) [![Implemented](!/tags/implemented.svg)](development-workflows/cross-model-workflow/cross-model-workflow.md)
- [RPI](development-workflows/rpi/rpi-workflow.md) [![Implemented](!/tags/implemented.svg)](development-workflows/rpi/rpi-workflow.md)
- [Ralph Wiggum Loop](https://www.youtube.com/watch?v=eAtvoGlpeRU) [![Implemented](!/tags/implemented.svg)](https://github.com/shanraisshan/novel-llm-26)

### Others
- [Github Speckit](https://github.com/github/spec-kit) · ★ 74k
- [obra/superpowers](https://github.com/obra/superpowers) · ★ 72k
- [OpenSpec OPSX](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md) · ★ 28k
- [get-shit-done (GSD)](https://github.com/gsd-build/get-shit-done) · ★ 25k
- [Brian Casel (Creator of Agent OS) - 2026 Workflow](https://github.com/buildermethods/agent-os) · ★ 4k - [it's overkill in 2026](https://www.youtube.com/watch?v=0hdFJA-ho3c)
- [Human Layer RPI - Research Plan Implement](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md) · ★ 1.5k
- [Andrej Karpathy (Founding Member, OpenAI) Workflow](https://x.com/karpathy/status/2015883857489522876)
- [Boris Cherny (Creator of Claude Code) - Feb 2026 Workflow](https://x.com/bcherny/status/2017742741636321619)
- [Peter Steinberger (Creator of OpenClaw) Workflow](https://youtu.be/8lF7HmQ_RgY?t=2582)

## 💡 TIPS AND TRICKS

![Community](!/tags/community.svg)

■ **Prompting (4)**
- challenge Claude — "grill me on these changes and don't make a PR until I pass your test." or "prove to me this works" and have Claude diff between main and your branch [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2017742752566632544)
- after a mediocre fix — "knowing everything you know now, scrap this and implement the elegant solution" [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2017742752566632544)
- Claude fixes most bugs by itself — paste the bug, say "fix", don't micromanage how 👶 [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2017742750473720121)
- say "use subagents" to throw more compute at a problem — offload tasks to keep your main context clean and focused 👶 [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2017742755737555434)

■ **Planning/Specs (5)**
- always start with [plan mode](https://code.claude.com/docs/en/common-workflows) [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2007179845336527000)
- start with a minimal spec or prompt and ask Claude to interview you using [AskUserQuestion](https://code.claude.com/docs/en/cli-reference) tool, then make a new session to execute the spec [![Thariq](https://img.shields.io/badge/Thariq-3b82f6?style=flat)](https://x.com/trq212/status/2005315275026260309)
- always make a phase-wise gated plan, with each phase having multiple tests (unit, automation, integration)
- spin up a second Claude to review your plan as a staff engineer, or use [cross-model](development-workflows/cross-model-workflow/cross-model-workflow.md) for review [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2017742745365057733)
- write detailed specs and reduce ambiguity before handing work off — the more specific you are, the better the output [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2017742752566632544)

■ **Workflows (12)**
- [CLAUDE.md](https://code.claude.com/docs/en/memory) should target under [200 lines](https://code.claude.com/docs/en/memory#write-effective-instructions) per file. [60 lines in humanlayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md) ([still not 100% guaranteed](https://www.reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/)). [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2007179840848597422)
- use [multiple CLAUDE.md](best-practice/claude-memory.md) for monorepos — ancestor + descendant loading
- use [.claude/rules/](https://code.claude.com/docs/en/memory#organize-rules-with-clauderules) to split large instructions
- use [commands](https://code.claude.com/docs/en/slash-commands) for your workflows instead of [sub-agents](https://code.claude.com/docs/en/sub-agents) [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2007179847949500714)
- have feature specific [sub-agents](https://code.claude.com/docs/en/sub-agents) (extra context) with [skills](https://code.claude.com/docs/en/skills) (progressive disclosure) instead of general qa, backend engineer. [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2007179850139000872)
- [memory.md](https://code.claude.com/docs/en/memory), constitution.md does not guarantee anything
- avoid agent dumb zone, do manual [/compact](https://code.claude.com/docs/en/interactive-mode) at max 50%. Use [/clear](https://code.claude.com/docs/en/cli-reference) to reset context mid-session if switching to a new task
- vanilla cc is better than any workflows with smaller tasks
- use [skills in subfolders](reports/claude-skills-for-larger-mono-repos.md) for monorepos
- use [/model](https://code.claude.com/docs/en/model-config) to select model and reasoning, [/context](https://code.claude.com/docs/en/interactive-mode) to see context usage, [/usage](https://code.claude.com/docs/en/costs) to check plan limits, [/extra-usage](https://code.claude.com/docs/en/interactive-mode) to configure overflow billing, [/config](https://code.claude.com/docs/en/settings) to configure settings
- always use [thinking mode](https://code.claude.com/docs/en/model-config) true (to see reasoning) and [Output Style](https://code.claude.com/docs/en/output-styles) Explanatory (to see detailed output with ★ Insight boxes) in [/config](https://code.claude.com/docs/en/settings) for better understanding of Claude's decisions [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2007179838864666847)
- use ultrathink keyword in prompts for [high effort reasoning](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking#tips-and-best-practices)
- [/rename](https://code.claude.com/docs/en/cli-reference) important sessions (e.g. [TODO - refactor task]) and [/resume](https://code.claude.com/docs/en/cli-reference) them later
- use [Esc Esc or /rewind](https://code.claude.com/docs/en/checkpointing) to undo when Claude goes off-track instead of trying to fix it in the same context
- commit often — try to commit at least once per hour, as soon as task is completed, commit.

■ **Workflows Advanced (6)**
- use ASCII diagrams a lot to understand your architecture [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2017742759218794768)
- [agent teams with tmux](https://code.claude.com/docs/en/agent-teams) and [git worktrees](https://x.com/bcherny/status/2025007393290272904) for parallel development
- use [/loop](https://code.claude.com/docs/en/scheduled-tasks) for recurring monitoring — poll deployments, babysit PRs, check builds (runs up to 3 days)
- use [Ralph Wiggum plugin](https://github.com/shanraisshan/novel-llm-26) for long-running autonomous tasks [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2007179858435281082)
- [/permissions](https://code.claude.com/docs/en/permissions) with wildcard syntax (Bash(npm run *), Edit(/docs/**)) instead of dangerously-skip-permissions [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2007179854077407667)
- [/sandbox](https://code.claude.com/docs/en/sandboxing) to reduce permission prompts with file and network isolation [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2021700506465579443)

■ **Debugging (5)**
- make it a habit to take screenshots and share with Claude whenever you are stuck with any issue
- use mcp ([Claude in Chrome](https://code.claude.com/docs/en/chrome), [Playwright](https://github.com/microsoft/playwright-mcp), [Chrome DevTools](https://developer.chrome.com/blog/chrome-devtools-mcp)) to let claude see chrome console logs on its own
- always ask claude to run the terminal (you want to see logs of) as a background task for better debugging
- [/doctor](https://code.claude.com/docs/en/cli-reference) to diagnose installation, authentication, and configuration issues
- error during compaction can be resolved by using [/model](https://code.claude.com/docs/en/model-config) to select a 1M token model, then running [/compact](https://code.claude.com/docs/en/interactive-mode)
- use a [cross-model](development-workflows/cross-model-workflow/cross-model-workflow.md) for QA — e.g. [Codex](https://github.com/shanraisshan/codex-cli-best-practice) for plan and implementation review

■ **Utilities (5)**
- [iTerm](https://iterm2.com/)/[Ghostty](https://ghostty.org/) [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2017742753971769626)/[tmux](https://github.com/tmux/tmux) terminals instead of IDE ([VS Code](https://code.visualstudio.com/)/[Cursor](https://www.cursor.com/))
- [Wispr Flow](https://wisprflow.ai) for voice prompting (10x productivity)
- [claude-code-voice-hooks](https://github.com/shanraisshan/claude-code-voice-hooks) for claude feedback
- [status line](https://github.com/shanraisshan/claude-code-status-line) for context awareness and fast compacting [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2021700784019452195)
- explore [settings.json](best-practice/claude-settings.md) features like [Plans Directory](best-practice/claude-settings.md#plans-directory), [Spinner Verbs](best-practice/claude-settings.md#display--ux) for a personalized experience [![Boris](https://img.shields.io/badge/Boris-3b82f6?style=flat)](https://x.com/bcherny/status/2021701145023197516)

■ **Daily (3)**
- [update](https://code.claude.com/docs/en/setup) Claude Code daily and start your day by reading the [changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
- follow [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/), [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/) ![Reddit](https://img.shields.io/badge/-FF4500?style=flat&logo=reddit&logoColor=white)
- follow [Boris](https://x.com/bcherny), [Thariq](https://x.com/trq212), [Cat](https://x.com/_catwu), [Lydia](https://x.com/lydiahallie), [Noah](https://x.com/noahzweben), [Anthony](https://x.com/amorriscode), [Claude](https://x.com/claudeai), [Alex](https://x.com/alexalbert__) ![X](https://img.shields.io/badge/-000?style=flat&logo=x&logoColor=white)

![Boris Cherny + Team](!/tags/boris-team.svg)

- Always use plan mode, give Claude a way to verify, use /code-review (Boris) | 27/Dec/25 ● [Tweet](https://x.com/bcherny/status/2004711722926616680)
- Ask Claude to interview you using AskUserQuestion tool (Thariq) | 28/Dec/25 ● [Tweet](https://x.com/trq212/status/2005315275026260309)
- [How I use Claude Code — 13 tips from my surprisingly vanilla setup (Boris) | 03/Jan/26](tips/claude-boris-13-tips-03-jan-26.md) ● [Tweet](https://x.com/bcherny/status/2007179832300581177)
- [10 tips for using Claude Code from the team (Boris) | 01/Feb/26](tips/claude-boris-10-tips-01-feb-26.md) ● [Tweet](https://x.com/bcherny/status/2017742741636321619)
- [12 ways how people are customizing their claudes (Boris) | 12/Feb/26](tips/claude-boris-12-tips-12-feb-26.md) ● [Tweet](https://x.com/bcherny/status/2021699851499798911)
- Git Worktrees - 5 ways how boris is using | 21 Feb 2026 ● [Tweet](https://x.com/bcherny/status/2025007393290272904)
- Seeing like an Agent - lessons from building Claude Code (Thariq) | 28 Feb 2026 ● [Tweet](https://x.com/trq212/status/2027463795355095314)
- AskUserQuestion + ASCII Markdowns (Thariq) | 28 Feb 2026 ● [Tweet](https://x.com/trq212/status/2027543858289250472)
- /loop — schedule recurring tasks for up to 3 days (Boris) | 07 Mar 2026 ● [Tweet](https://x.com/bcherny/status/2030193932404150413)
- [Code Review & Test Time Compute (Boris) | 10/Mar/26](tips/claude-boris-2-tips-10-mar-26.md) ● [Tweet](https://x.com/bcherny/status/2031089411820228645)
- /btw — side chain conversations while Claude works (Thariq) | 10 Mar 2026 ● [Tweet](https://x.com/trq212/status/2031506296697131352)

## ☠️ STARTUPS / BUSINESSES

| Claude | Replaced |
|-|-|
|[**Code Review**](https://code.claude.com/docs/en/code-review)|[Greptile](https://greptile.com), [CodeRabbit](https://coderabbit.ai), [Devin Review](https://devin.ai), [OpenDiff](https://opendiff.com), [Cursor BugBot](https://bugbot.dev)|
|[**Voice Mode**](https://x.com/trq212/status/2028628570692890800)|[Wispr Flow](https://wisprflow.ai), [SuperWhisper](https://superwhisper.com/)|
|[**Remote Control**](https://code.claude.com/docs/en/remote-control)|[OpenClaw](https://openclaw.ai/)
|**Cowork**|[OpenAI Operator](https://openai.com/operator), [AgentShadow](https://agentshadow.ai)
|[**Tasks**](https://x.com/trq212/status/2014480496013803643)|[Beads](https://github.com/steveyegge/beads)
|[**Plan Mode**](https://code.claude.com/docs/en/common-workflows)|[Agent OS](https://github.com/buildermethods/agent-os)|
|[**Skills / Plugins**](https://code.claude.com/docs/en/plugins)|YC AI wrapper startups ([reddit](https://reddit.com/r/ClaudeAI/comments/1r6bh4d/claude_code_skills_are_basically_yc_ai_startup/))|

<a id="billion-dollar-questions"></a>
![Billion-Dollar Questions](!/tags/billion-dollar-questions.svg)

*If you have answers, do let me know at shanraisshan@gmail.com*

**Memory & Instructions (4)**

1. What exactly should you put inside your CLAUDE.md — and what should you leave out?
2. If you already have a CLAUDE.md, is a separate constitution.md or rules.md actually needed?
3. How often should you update your CLAUDE.md, and how do you know when it's become stale?
4. Why does Claude still ignore CLAUDE.md instructions — even when they say MUST in all caps? ([reddit](https://reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/))

**Agents, Skills & Workflows (6)**

1. When should you use a command vs an agent vs a skill — and when is vanilla Claude Code just better?
2. How often should you update your agents, commands, and workflows as models improve?
3. Does giving your subagent a detailed persona improve quality? What does a "perfect persona/prompt" for research/QA subagent look like?
4. Should you rely on Claude Code's built-in plan mode — or build your own planning command/agent that enforces your team's workflow?
5. If you have a personal skill (e.g., /implement with your coding style), how do you incorporate community skills (e.g., /simplify) without conflicts — and who wins when they disagree?
6. Are we there yet? Can we convert an existing codebase into specs, delete the code, and have AI regenerate the exact same code from those specs alone?

**Specs & Documentation (3)**

1. Should every feature in your repo have a spec as a markdown file?
2. How often do you need to update specs so they don't become obsolete when a new feature is implemented?
3. When implementing a new feature, how do you handle the ripple effect on specs for other features?

## REPORTS

<p align="center">
  <a href="reports/claude-agent-sdk-vs-cli-system-prompts.md"><img src="https://img.shields.io/badge/Agent_SDK_vs_CLI-555?style=for-the-badge" alt="Agent SDK vs CLI"></a>
  <a href="reports/claude-in-chrome-v-chrome-devtools-mcp.md"><img src="https://img.shields.io/badge/Browser_Automation_MCP-555?style=for-the-badge" alt="Browser Automation MCP"></a>
  <a href="reports/claude-global-vs-project-settings.md"><img src="https://img.shields.io/badge/Global_vs_Project_Settings-555?style=for-the-badge" alt="Global vs Project Settings"></a>
  <a href="reports/claude-skills-for-larger-mono-repos.md"><img src="https://img.shields.io/badge/Skills_in_Monorepos-555?style=for-the-badge" alt="Skills in Monorepos"></a>
  <br>
  <a href="reports/claude-agent-memory.md"><img src="https://img.shields.io/badge/Agent_Memory-555?style=for-the-badge" alt="Agent Memory"></a>
  <a href="reports/claude-advanced-tool-use.md"><img src="https://img.shields.io/badge/Advanced_Tool_Use-555?style=for-the-badge" alt="Advanced Tool Use"></a>
  <a href="reports/claude-usage-and-rate-limits.md"><img src="https://img.shields.io/badge/Usage_&_Rate_Limits-555?style=for-the-badge" alt="Usage & Rate Limits"></a>
  <a href="reports/claude-agent-command-skill.md"><img src="https://img.shields.io/badge/Agents_vs_Commands_vs_Skills-555?style=for-the-badge" alt="Agents vs Commands vs Skills"></a>
  <br>
  <a href="reports/llm-day-to-day-degradation.md"><img src="https://img.shields.io/badge/LLM_Degradation-555?style=for-the-badge" alt="LLM Degradation"></a>
</p>

<p align="center">
  <a href="https://github.com/trending?since=monthly"><img src="!/root/github-trending.png" alt="GitHub Trending" width="1200"></a><br>
  ✨Trending on Github in March 2026✨
</p>

![How to Use](!/tags/how-to-use.svg)

```
1. Read the repo like a course, learn what commands, agents, skills, and hooks are before trying to use them.
2. Clone this repo and play with the examples, try /weather-orchestrator, listen to the hook sounds, run agent teams, so you can see how things actually work.
3. Go to your own project and ask Claude to suggest what best practices from this repo you should add, give it this repo as a reference so it knows what's possible.
```

## Developed by

![Developed by](!/tags/developed-by.svg)

> | Workflow | Description |
> |----------|-------------|
> | /workflows:best-practice:workflow-concepts | Update the README CONCEPTS section with the latest Claude Code features and concepts |
> | /workflows:best-practice:workflow-claude-settings | Track Claude Code settings report changes and find what needs updating |
> | /workflows:best-practice:workflow-claude-subagents | Track Claude Code subagents report changes and find what needs updating |
> | /workflows:best-practice:workflow-claude-commands | Track Claude Code commands report changes and find what needs updating |
> | /workflows:best-practice:workflow-claude-skills | Track Claude Code skills report changes and find what needs updating |

[![Claude for OSS](!/tags/claude-for-oss.svg)](https://claude.com/contact-sales/claude-for-oss)
[![Claude Community Ambassador](!/tags/claude-community-ambassador.svg)](https://claude.com/community/ambassadors)
[![Claude Certified Architect](!/tags/claude-certified-architect.svg)](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request)
[![Anthropic Academy](!/tags/anthropic-academy.svg)](https://anthropic.skilljar.com/)
