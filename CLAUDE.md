# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a best practices repository for Claude Code configuration, demonstrating patterns for skills, subagents, hooks, and commands. It serves as a reference implementation rather than an application codebase.

## Key Components

### Weather System (Example Workflow)
A demonstration of skill-based subagent orchestration:
- `/weather` command (`.claude/commands/weather.md`): Entry point, invokes the weather-karachi skill
- `/weather-karachi` skill (`.claude/skills/weather-karachi/SKILL.md`): Orchestrates the workflow
- `weather-fetcher` subagent: fetches temperature from wttr.in API
- `weather-transformer` subagent: applies transformation rules from `input/input.md`, writes results to `output/output.md`

Subagents run sequentially via Task tool, not in parallel, to maintain data dependencies.

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
- `scripts/hooks.py`: Main handler for all 11 Claude Code hook events
- `config/hooks-config.json`: Shared team configuration
- `config/hooks-config.local.json`: Personal overrides (git-ignored)
- `sounds/`: Audio files organized by hook event (generated via ElevenLabs TTS)

Hook events: PreToolUse, PostToolUse, UserPromptSubmit, Notification, Stop, SubagentStart, SubagentStop, PreCompact, SessionStart, SessionEnd, Setup, PermissionRequest.

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

### Configuration Hierarchy
1. `.claude/settings.local.json`: Personal settings (git-ignored)
2. `.claude/settings.json`: Team-shared settings
3. `hooks-config.local.json` overrides `hooks-config.json`

### Disable Hooks
Set `"disableAllHooks": true` in `.claude/settings.local.json`, or disable individual hooks in `hooks-config.json`.

## Documentation

- `docs/AGENTS.md`: Subagent orchestration troubleshooting
- `docs/WEATHER.md`: Weather system flow diagram
- `docs/COMPARISION.md`: Commands vs Agents vs Skills invocation patterns

## Reports

- `reports/claude-in-chrome-v-chrome-devtools-mcp.md`: Browser automation MCP comparison (Playwright vs Chrome DevTools vs Claude in Chrome)
- `reports/claude-md-for-larger-mono-repos.md`: CLAUDE.md loading behavior in monorepos (ancestor vs descendant loading)
