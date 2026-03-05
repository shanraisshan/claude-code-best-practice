# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a best practices repository for Claude Code configuration, demonstrating patterns for skills, subagents, hooks, and commands. It serves as a reference implementation rather than an application codebase.

## Key Components

### Weather System (Example Workflow)
A demonstration of two distinct skill patterns via the **Command → Agent → Skill** architecture:
- `/weather-orchestrator` command (`.claude/commands/weather-orchestrator.md`): Entry point — asks user for C/F, invokes agent, then invokes SVG skill
- `weather-agent` agent (`.claude/agents/weather-agent.md`): Fetches temperature using its preloaded `weather-fetcher` skill (agent skill pattern)
- `weather-fetcher` skill (`.claude/skills/weather-fetcher/SKILL.md`): Preloaded into agent — instructions for fetching temperature from wttr.in API
- `weather-svg-creator` skill (`.claude/skills/weather-svg-creator/SKILL.md`): Skill — creates SVG weather card, writes `orchestration-workflow/weather.svg` and `orchestration-workflow/output.md`

Two skill patterns: agent skills (preloaded via `skills:` field) vs skills (invoked via `Skill` tool). See `orchestration-workflow/orchestration-workflow.md` for the complete flow diagram.

### Skill Definition Structure
Skills in `.claude/skills/<name>/SKILL.md` use YAML frontmatter:
- `name`: Display name and `/slash-command` (defaults to directory name)
- `description`: When to invoke (recommended for auto-discovery)
- `argument-hint`: Autocomplete hint (e.g., `[issue-number]`)
- `disable-model-invocation`: Set `true` to prevent automatic invocation
- `user-invocable`: Set `false` to hide from `/` menu (background knowledge only)
- `allowed-tools`: Tools allowed without permission prompts when skill is active
- `model`: Model to use when skill is active
- `context`: Set to `fork` to run in isolated subagent context
- `agent`: Subagent type for `context: fork` (default: `general-purpose`)
- `hooks`: Lifecycle hooks scoped to this skill

### Presentation System
Any request to update, modify, or fix the presentation (`presentation/index.html`) must be handled by the `presentation-curator` agent (`.claude/agents/presentation-curator.md`). Always delegate presentation work to this agent via the Task tool — never edit the presentation directly.

The agent is **self-evolving**: after every execution, it updates its own skills to stay in sync with the presentation. It has three preloaded skills:
- `vibe-to-agentic-framework`: The conceptual framework ("Vibe Coding → Agentic Engineering"), weight rationale, and journey narrative. Updated after every slide change.
- `presentation-structure`: Slide format, weight system, navigation, section ranges. Updated when slides are added/removed/reordered.
- `presentation-styling`: CSS classes, component patterns, syntax highlighting. Updated when new styling patterns are introduced.

### Hooks System
Cross-platform sound notification system in `.claude/hooks/`:
- `scripts/hooks.py`: Main handler for Claude Code hook events
- `config/hooks-config.json`: Shared team configuration
- `config/hooks-config.local.json`: Personal overrides (git-ignored)
- `sounds/`: Audio files organized by hook event (generated via ElevenLabs TTS)

Hook events configured in `.claude/settings.json`: PreToolUse, PostToolUse, UserPromptSubmit, Notification, Stop, SubagentStart, SubagentStop, PreCompact, SessionStart, SessionEnd, Setup, PermissionRequest, TeammateIdle, TaskCompleted, ConfigChange.

Special handling: git commits trigger `pretooluse-git-committing` sound.

## Critical Patterns

### Subagent Orchestration
Subagents **cannot** invoke other subagents via bash commands. Use the Task tool:
```
Task(subagent_type="agent-name", description="...", prompt="...", model="haiku")
```

Be explicit about tool usage in subagent definitions. Avoid vague terms like "launch" that could be misinterpreted as bash commands.

### Subagent Definition Structure
Subagents in `.claude/agents/*.md` use YAML frontmatter:
- `name`: Subagent identifier
- `description`: When to invoke (use "PROACTIVELY" for auto-invocation)
- `tools`: Comma-separated allowlist of tools (inherits all if omitted). Supports `Task(agent_type)` syntax
- `disallowedTools`: Tools to deny, removed from inherited or specified list
- `model`: Model alias: `haiku`, `sonnet`, `opus`, or `inherit` (default: `inherit`)
- `permissionMode`: Permission mode (e.g., `"acceptEdits"`, `"plan"`, `"bypassPermissions"`)
- `maxTurns`: Maximum agentic turns before the subagent stops
- `skills`: List of skill names to preload into agent context
- `mcpServers`: MCP servers for this subagent (server names or inline configs)
- `hooks`: Lifecycle hooks scoped to this subagent (`PreToolUse`, `PostToolUse`, `Stop`)
- `memory`: Persistent memory scope — `user`, `project`, or `local` (see `reports/claude-agent-memory.md`)
- `background`: Set to `true` to always run as a background task
- `isolation`: Set to `"worktree"` to run in a temporary git worktree
- `color`: CLI output color for visual distinction

### Configuration Hierarchy
1. `.claude/settings.local.json`: Personal settings (git-ignored)
2. `.claude/settings.json`: Team-shared settings
3. `hooks-config.local.json` overrides `hooks-config.json`

### Disable Hooks
Set `"disableAllHooks": true` in `.claude/settings.local.json`, or disable individual hooks in `hooks-config.json`.

## Workflow Best Practices

From experience with this repository:

- Keep CLAUDE.md under 200 lines per file for reliable adherence
- Use commands for workflows instead of standalone agents
- Create feature-specific subagents with skills (progressive disclosure) rather than general-purpose agents
- Perform manual `/compact` at ~50% context usage
- Start with plan mode for complex tasks
- Use human-gated task list workflow for multi-step tasks
- Break subtasks small enough to complete in under 50% context

### Debugging Tips

- Use `/doctor` for diagnostics
- Run long-running terminal commands as background tasks for better log visibility
- Use browser automation MCPs (Claude in Chrome, Playwright, Chrome DevTools) for Claude to inspect console logs
- Provide screenshots when reporting visual issues

## Documentation

- `docs/AGENTS.md`: Subagent orchestration troubleshooting
- `orchestration-workflow/orchestration-workflow.md`: Weather system flow diagram
- `docs/COMPARISION.md`: Commands vs Agents vs Skills invocation patterns

## Reports

- `reports/claude-in-chrome-v-chrome-devtools-mcp.md`: Browser automation MCP comparison (Playwright vs Chrome DevTools vs Claude in Chrome)
- `best-practice/claude-memory.md`: CLAUDE.md loading behavior in monorepos (ancestor vs descendant loading)
- `reports/claude-skills-for-larger-mono-repos.md`: Skills discovery and loading behavior in monorepos (static vs dynamic discovery)
- `reports/claude-agent-memory.md`: Agent memory frontmatter — persistent memory scopes (user, project, local) for subagents
- `reports/claude-advanced-tool-use.md`: Advanced tool use patterns — Programmatic Tool Calling (PTC), Tool Search, Tool Use Examples
- `reports/claude-usage-and-rate-limits.md`: Usage commands (`/usage`, `/extra-usage`, `/cost`), rate limits, and pay-as-you-go overflow billing
