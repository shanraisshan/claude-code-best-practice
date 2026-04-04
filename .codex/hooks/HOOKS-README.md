# HOOKS-README
Contains all the details, scripts, and instructions for the Codex CLI hooks.

## Hook Events Overview

Codex CLI provides **5 hooks** via hooks.json:

| # | Hook | Event Type | Config File | Description |
|:-:|------|------------|-------------|-------------|
| 1 | `SessionStart` | `SessionStart` | `hooks.json` | Runs once at session start — injects context + plays sound |
| 2 | `PreToolUse` | `PreToolUse` | `hooks.json` | Runs before a tool executes — plays sound |
| 3 | `PostToolUse` | `PostToolUse` | `hooks.json` | Runs after a tool completes — plays sound |
| 4 | `Stop` | `stop` | `hooks.json` | Runs when the session ends — plays sound |
| 5 | `UserPromptSubmit` | `UserPromptSubmit` | `hooks.json` | Runs when the user submits a prompt — plays sound |

> Hooks 1 and 4 require **Codex CLI v0.114.0+** with the hooks engine enabled.
> Hooks 2 and 3 require **Codex CLI v0.117.0+** with the hooks engine enabled.
> Hook 5 requires **Codex CLI v0.116.0+** with the hooks engine enabled:
> ```bash
> codex -c features.codex_hooks=true
> ```

### How Hooks Are Called

All hooks (hooks.json) are called with `--hook` flag:
```
python3 .codex/hooks/scripts/hooks.py --hook SessionStart
python3 .codex/hooks/scripts/hooks.py --hook PreToolUse
python3 .codex/hooks/scripts/hooks.py --hook PostToolUse
python3 .codex/hooks/scripts/hooks.py --hook Stop
python3 .codex/hooks/scripts/hooks.py --hook UserPromptSubmit
```

### SessionStart Context Injection

The SessionStart hook outputs context to **stdout**, which feeds directly into the model's context window. This includes:
- Current date/time
- Git branch name
- Working tree status (clean or uncommitted changes)
- Working directory path

## Prerequisites

Before using hooks, ensure you have **Python 3** installed on your system.

### Required Software

#### All Platforms (Windows, macOS, Linux)
- **Python 3**: Required for running the hook script
- Verify installation: `python3 --version`

**Installation Instructions:**
- **Windows**: Download from [python.org](https://www.python.org/downloads/) or install via `winget install Python.Python.3`
- **macOS**: Install via `brew install python3` (requires [Homebrew](https://brew.sh/))
- **Linux**: Install via `sudo apt install python3` (Ubuntu/Debian) or `sudo yum install python3` (RHEL/CentOS)

### Audio Players (Automatically Detected)

The hook script automatically detects and uses the appropriate audio player for your platform:

- **macOS**: Uses `afplay` (built-in, no installation needed)
- **Linux**: Uses `paplay` from `pulseaudio-utils` - install via `sudo apt install pulseaudio-utils`
- **Windows**: Uses built-in `winsound` module (included with Python)

### Configuration Files

There are **two** configuration files:

1. **`.codex/hooks.json`** — Registers `SessionStart`, `PreToolUse`, `PostToolUse`, `Stop`, and `UserPromptSubmit` hooks
2. **`.codex/hooks/config/hooks-config.json`** — Enable/disable individual hooks and logging

#### hooks.json

```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "shell",
        "command": "python3 .codex/hooks/scripts/hooks.py --hook SessionStart",
        "statusMessage": "Initializing session hooks...",
        "timeout": 10
      }
    ],
    "PreToolUse": [
      {
        "type": "shell",
        "command": "python3 .codex/hooks/scripts/hooks.py --hook PreToolUse",
        "statusMessage": "Running pre-tool-use hook...",
        "timeout": 10
      }
    ],
    "PostToolUse": [
      {
        "type": "shell",
        "command": "python3 .codex/hooks/scripts/hooks.py --hook PostToolUse",
        "statusMessage": "Running post-tool-use hook...",
        "timeout": 10
      }
    ],
    "Stop": [
      {
        "type": "shell",
        "command": "python3 .codex/hooks/scripts/hooks.py --hook Stop",
        "statusMessage": "Running session stop hook...",
        "timeout": 10
      }
    ],
    "UserPromptSubmit": [
      {
        "type": "shell",
        "command": "python3 .codex/hooks/scripts/hooks.py --hook UserPromptSubmit",
        "statusMessage": "Running user prompt submit hook...",
        "timeout": 10
      }
    ]
  }
}
```

## Configuring Hooks (Enable/Disable)

### Disable Individual Hooks

Edit `.codex/hooks/config/hooks-config.json`:
```json
{
  "disableSessionStartHook": false,
  "disablePreToolUseHook": false,
  "disablePostToolUseHook": false,
  "disableStopHook": false,
  "disableUserPromptSubmitHook": false,
  "disableLogging": true
}
```

**Configuration Options:**
- `disableSessionStartHook`: Set to `true` to disable the session start context injection and sound
- `disablePreToolUseHook`: Set to `true` to disable the pre-tool-use sound
- `disablePostToolUseHook`: Set to `true` to disable the post-tool-use sound
- `disableStopHook`: Set to `true` to disable the session stop sound
- `disableUserPromptSubmitHook`: Set to `true` to disable the user prompt submit sound
- `disableLogging`: Set to `true` to disable logging hook events to `.codex/hooks/logs/hooks-log.jsonl`

### Configuration Fallback

There are two configuration files:

1. **`.codex/hooks/config/hooks-config.json`** - The shared/default configuration that is committed to git
2. **`.codex/hooks/config/hooks-config.local.json`** - Your personal overrides (git-ignored)

The local config file (`.local.json`) takes precedence over the shared config, allowing each developer to customize their hook behavior without affecting the team.

#### Local Configuration (Personal Overrides)

Create or edit `.codex/hooks/config/hooks-config.local.json` for personal preferences:

```json
{
  "disableSessionStartHook": false,
  "disablePreToolUseHook": false,
  "disablePostToolUseHook": false,
  "disableStopHook": true,
  "disableUserPromptSubmitHook": false,
  "disableLogging": true
}
```

### Logging

When logging is enabled (`"disableLogging": false`), hook events are logged to `.codex/hooks/logs/hooks-log.jsonl` in JSON Lines format. Each entry contains the full JSON payload received from Codex CLI.

## Testing

Run the test suite:
```bash
python3 -m unittest tests.test_hooks -v
```

## Voice

website used to generate sounds: https://elevenlabs.io/
voice used: Adam - American, Dark and Tough

## Future Extensibility

This project can be extended by:

1. Adding new entries to `HOOK_SOUND_MAP` in `hooks.py`
2. Adding corresponding sound files in `.codex/hooks/sounds/`
3. Adding toggle keys in `hooks-config.json`
4. Adding new hook entries in `hooks.json`
