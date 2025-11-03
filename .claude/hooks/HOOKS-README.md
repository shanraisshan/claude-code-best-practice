# HOOKS-README
contains all the details, scripts, and instructions for the hooks

## Hook Events Overview - [Official 9 Hooks](https://docs.claude.com/en/docs/claude-code/hooks-guide)
Claude Code provides several hook events that run at different points in the workflow:
1. PreToolUse: Runs before tool calls (can block them)
2. PostToolUse: Runs after tool calls complete
3. UserPromptSubmit: Runs when the user submits a prompt, before Claude processes it
4. Notification: Runs when Claude Code sends notifications
5. Stop: Runs when Claude Code finishes responding
6. SubagentStop: Runs when subagent tasks complete
7. PreCompact: Runs before Claude Code is about to run a compact operation
8. SessionStart: Runs when Claude Code starts a new session or resumes an existing session
9. SessionEnd: Runs when Claude Code session ends

## Prerequisites

Before using hooks, ensure you have the following prerequisites installed for your operating system:

#### Windows
- **Python**: `python --version`

#### macOS
- **Python 3**: `python3 --version`
- **Audio Player**: `afplay` (built-in, no installation needed)

#### Linux
- **Python 3**: `python3 --version`
- **Audio Player**: `sudo apt install pulseaudio-utils`

## Configuring Hooks (Enable/Disable)

Hooks can be easily enabled or disabled at both the global and individual levels.

### Disable All Hooks at Once

Edit `.claude/settings.local.json` and set:
```json
{
  "disableAllHooks": true
}
```

**Note:** The `.claude/settings.local.json` file is git-ignored, so each user can configure their own hook preferences without affecting the team's shared settings in `.claude/settings.json`.

### Disable Individual Hooks

For granular control, you can disable specific hooks by editing the hooks configuration files.

#### Configuration Files

There are two configuration files for managing individual hooks:

1. **`.claude/hooks/config/hooks-config.json`** - The shared/default configuration that is committed to git
2. **`.claude/hooks/config/hooks-config.local.json`** - Your personal overrides (git-ignored)

The local config file (`.local.json`) takes precedence over the shared config, allowing each developer to customize their hook behavior without affecting the team.

#### Shared Configuration

Edit `.claude/hooks/config/hooks-config.json` for team-wide defaults:

```json
{
  "disablePreToolUseHook": false,
  "disablePostToolUseHook": false,
  "disableUserPromptSubmitHook": false,
  "disableNotificationHook": false,
  "disableStopHook": false,
  "disableSubagentStopHook": false,
  "disablePreCompactHook": false,
  "disableSessionStartHook": false,
  "disableSessionEndHook": false
}
```

#### Local Configuration (Personal Overrides)

Create or edit `.claude/hooks/config/hooks-config.local.json` for personal preferences:

```json
{
  "disablePostToolUseHook": true,
  "disableSessionStartHook": true
}
```

In this example, only the PostToolUse and SessionStart hooks are overridden locally. All other hooks will use the shared configuration values.

**Note:** Individual hook toggles are checked by the hook script (`.claude/hooks/scripts/hooks.py`). Local settings override shared settings, and if a hook is disabled, the script exits silently without playing any sounds or executing hook logic.

### Text to Speech (TTS)
website used to generate sounds: https://elevenlabs.io/
voice used: Samara X