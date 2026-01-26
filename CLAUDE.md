# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a best practices repository for Claude Code configuration, demonstrating patterns for agents, commands, hooks, and skills. It serves as a reference implementation rather than an application codebase.

## Key Components

### Weather System (Example Workflow)
A demonstration of agent orchestration:
- `/weather` command delegates to `/weather-karachi`
- `weather-fetcher` agent: fetches temperature from wttr.in API
- `weather-transformer` agent: applies transformation rules from `input/input.md`, writes results to `output/output.md`

Agents run sequentially, not in parallel, to maintain data dependencies.

### Hooks System
Cross-platform sound notification system in `.claude/hooks/`:
- `scripts/hooks.py`: Main handler for all 9 Claude Code hooks
- `config/hooks-config.json`: Shared team configuration
- `config/hooks-config.local.json`: Personal overrides (git-ignored)
- `sounds/`: Audio files organized by hook event

Special handling: git commits trigger `pretooluse-git-committing` sound.

## Critical Patterns

### Agent Orchestration
Agents **cannot** invoke other agents via bash commands. Use the Task tool:
```
Task(subagent_type="agent-name", description="...", prompt="...", model="haiku")
```

Be explicit about tool usage in agent definitions. Avoid vague terms like "launch" that could be misinterpreted as bash commands.

### Agent Definition Structure
Agents in `.claude/agents/*.md` use YAML frontmatter:
- `name`: Agent identifier
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

- `docs/AGENTS.md`: Agent orchestration troubleshooting
- `docs/WEATHER.md`: Weather system flow diagram
