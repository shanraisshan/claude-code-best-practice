# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a best practices repository for Claude Code configuration, demonstrating patterns for skills, subagents, hooks, and commands. It serves as a reference implementation rather than an application codebase.

## Key Components

### Weather System (Example Workflow)
A demonstration of the **Command → Agent → Skills** architecture pattern:
- `/weather-orchestrator` command (`.claude/commands/weather-orchestrator.md`): Entry point that invokes the weather agent
- `weather` agent (`.claude/agents/weather.md`): Executes workflow using preloaded skills
- `weather-fetcher` skill (`.claude/skills/weather-fetcher/SKILL.md`): Instructions for fetching temperature from wttr.in API
- `weather-transformer` skill (`.claude/skills/weather-transformer/SKILL.md`): Instructions for applying transformation rules from `weather-orchestration/input.md`, writes results to `weather-orchestration/output.md`

The agent has skills preloaded via the `skills` field, providing domain knowledge for sequential execution. See `weather-orchestration/weather-orchestration-architecture.md` for the complete flow diagram.

### Skill Definition Structure
Skills in `.claude/skills/<name>/SKILL.md` use YAML frontmatter:
- `name`: Skill identifier (optional, uses directory name if omitted)
- `description`: When to invoke (recommended for auto-discovery)
- `model`: Model to use when skill is active
- `disable-model-invocation`: Set `true` to prevent automatic invocation
- `context`: Set to `fork` to run in isolated subagent context
- `allowed-tools`: Restrict which tools Claude can use

### Hooks System
Cross-platform sound notification system in `.claude/hooks/`:
- `scripts/hooks.py`: Main handler for Claude Code hook events
- `config/hooks-config.json`: Shared team configuration
- `config/hooks-config.local.json`: Personal overrides (git-ignored)
- `sounds/`: Audio files organized by hook event (generated via ElevenLabs TTS)

Hook events configured in `.claude/settings.json`: PreToolUse, PostToolUse, UserPromptSubmit, Notification, Stop, SubagentStart, SubagentStop, PreCompact, SessionStart, SessionEnd, Setup, PermissionRequest.

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
- `tools`: Comma-separated list of allowed tools
- `model`: Typically "haiku" for efficiency
- `color`: CLI output color for visual distinction
- `skills`: List of skill names to preload into agent context

### Configuration Hierarchy
1. `.claude/settings.local.json`: Personal settings (git-ignored)
2. `.claude/settings.json`: Team-shared settings
3. `hooks-config.local.json` overrides `hooks-config.json`

### Disable Hooks
Set `"disableAllHooks": true` in `.claude/settings.local.json`, or disable individual hooks in `hooks-config.json`.

## Workflow Best Practices

From experience with this repository:

- Keep CLAUDE.md under 150 lines for reliable adherence
- Use commands for workflows instead of standalone agents
- Create feature-specific subagents with skills (progressive disclosure) rather than general-purpose agents
- Perform manual `/compact` at ~50% context usage
- Start with plan mode for complex tasks
- Use human-gated todo list workflow for multi-step tasks
- Break subtasks small enough to complete in under 50% context

### Debugging Tips

- Use `/doctor` for diagnostics
- Run long-running terminal commands as background tasks for better log visibility
- Use browser automation MCPs (Claude in Chrome, Playwright, Chrome DevTools) for Claude to inspect console logs
- Provide screenshots when reporting visual issues

## Documentation

- `docs/AGENTS.md`: Subagent orchestration troubleshooting
- `weather-orchestration/weather-orchestration-architecture.md`: Weather system flow diagram
- `docs/COMPARISION.md`: Commands vs Agents vs Skills invocation patterns

## Reports

- `reports/claude-in-chrome-v-chrome-devtools-mcp.md`: Browser automation MCP comparison (Playwright vs Chrome DevTools vs Claude in Chrome)
- `reports/claude-md-for-larger-mono-repos.md`: CLAUDE.md loading behavior in monorepos (ancestor vs descendant loading)
- `reports/claude-skills-for-larger-mono-repos.md`: Skills discovery and loading behavior in monorepos (static vs dynamic discovery)
