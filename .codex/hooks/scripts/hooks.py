#!/usr/bin/env python3
"""
Codex CLI Hook Handler
=============================================
This script handles hooks from Codex CLI and plays sounds.
Codex CLI supports 5 hooks:
  1. SessionStart - via hooks.json (v0.114.0+)
  2. PreToolUse - via hooks.json (v0.117.0+)
  3. PostToolUse - via hooks.json (v0.117.0+)
  4. Stop - via hooks.json (v0.114.0+)
  5. UserPromptSubmit - via hooks.json (v0.116.0+)

Input:
  - All hooks use --hook <hook-name> flag via hooks.json
"""

import sys
import json
import subprocess
import platform
from pathlib import Path
from datetime import datetime

# Windows-only module for playing WAV files
try:
    import winsound
except ImportError:
    winsound = None

# ===== HOOK EVENT TO SOUND MAPPING =====
# Sound name -> resolves to sounds/<name>/<name>.{mp3|wav}
HOOK_SOUND_MAP = {
    "SessionStart": "SessionStart",
    "PreToolUse": "PreToolUse",
    "PostToolUse": "PostToolUse",
    "Stop": "Stop",
    "UserPromptSubmit": "UserPromptSubmit",
}

# ===== HOOK EVENT TO CONFIG KEY MAPPING =====
HOOK_CONFIG_MAP = {
    "SessionStart": "disableSessionStartHook",
    "PreToolUse": "disablePreToolUseHook",
    "PostToolUse": "disablePostToolUseHook",
    "Stop": "disableStopHook",
    "UserPromptSubmit": "disableUserPromptSubmitHook",
}



def get_audio_player():
    """
    Detect the appropriate audio player for the current platform.

    Returns:
        List of command and args to use for playing audio, or None if no player found
    """
    system = platform.system()

    if system == "Darwin":
        # macOS: use afplay (built-in)
        return ["afplay"]
    elif system == "Linux":
        # Linux: try different players in order of preference
        players = [
            ["paplay"],           # PulseAudio (most common on modern Linux)
            ["aplay"],            # ALSA (fallback)
            ["ffplay", "-nodisp", "-autoexit"],  # FFmpeg (if installed)
            ["mpg123", "-q"],     # mpg123 (if installed)
        ]

        for player in players:
            try:
                subprocess.run(
                    ["which", player[0]],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    check=True
                )
                return player
            except (subprocess.CalledProcessError, FileNotFoundError):
                continue

        return None
    elif system == "Windows":
        # Windows: Use winsound for WAV files (built-in, reliable)
        return ["WINDOWS"]
    else:
        return None


def play_sound(sound_name):
    """
    Play a sound file for the given sound name.

    Args:
        sound_name: Name of the sound file (e.g., "SessionStart")
                   The file should be at .codex/hooks/sounds/{name}/{name}.{mp3|wav}

    Returns:
        True if sound played successfully, False otherwise
    """
    # Security check: Prevent directory traversal attacks
    if "/" in sound_name or "\\" in sound_name or ".." in sound_name:
        print(f"Invalid sound name: {sound_name}", file=sys.stderr)
        return False

    audio_player = get_audio_player()
    if not audio_player:
        return False

    # Build path: scripts/ -> hooks/ -> sounds/{folder}/
    script_dir = Path(__file__).parent  # .codex/hooks/scripts/
    hooks_dir = script_dir.parent       # .codex/hooks/

    # Sound folder matches sound name: sounds/<name>/<name>.{mp3|wav}
    sounds_dir = hooks_dir / "sounds" / sound_name

    is_windows = audio_player[0] == "WINDOWS"
    extensions = ['.wav'] if is_windows else ['.wav', '.mp3']

    for extension in extensions:
        file_path = sounds_dir / f"{sound_name}{extension}"

        if file_path.exists():
            try:
                if is_windows:
                    if winsound:
                        winsound.PlaySound(str(file_path),
                                         winsound.SND_FILENAME | winsound.SND_NODEFAULT)
                        return True
                    else:
                        return False
                else:
                    subprocess.Popen(
                        audio_player + [str(file_path)],
                        stdout=subprocess.DEVNULL,
                        stderr=subprocess.DEVNULL,
                        start_new_session=True
                    )
                    return True
            except (FileNotFoundError, OSError) as e:
                print(f"Error playing sound {file_path.name}: {e}", file=sys.stderr)
                return False
            except Exception as e:
                print(f"Error playing sound {file_path.name}: {e}", file=sys.stderr)
                return False

    return False


def load_config():
    """
    Load the hook configuration from config files.
    Uses fallback logic: hooks-config.local.json -> hooks-config.json

    Returns:
        Tuple of (local_config, default_config) - either may be None
    """
    try:
        script_dir = Path(__file__).parent
        hooks_dir = script_dir.parent
        config_dir = hooks_dir / "config"

        local_config_path = config_dir / "hooks-config.local.json"
        default_config_path = config_dir / "hooks-config.json"

        local_config = None
        if local_config_path.exists():
            try:
                with open(local_config_path, "r", encoding="utf-8") as f:
                    local_config = json.load(f)
            except Exception:
                pass

        default_config = None
        if default_config_path.exists():
            try:
                with open(default_config_path, "r", encoding="utf-8") as f:
                    default_config = json.load(f)
            except Exception:
                pass

        return local_config, default_config
    except Exception:
        return None, None


def get_config_value(key, default=False):
    """
    Get a config value with fallback logic: local -> default -> provided default.

    Args:
        key: The config key to look up
        default: Default value if key not found in any config

    Returns:
        The config value
    """
    local_config, default_config = load_config()

    if local_config is not None and key in local_config:
        return local_config[key]
    elif default_config is not None and key in default_config:
        return default_config[key]
    else:
        return default


def is_hook_disabled(event_name):
    """
    Check if a hook is disabled in the config files.
    Uses fallback logic: hooks-config.local.json -> hooks-config.json

    Args:
        event_name: The event name (e.g., "SessionStart", "Stop", "UserPromptSubmit")

    Returns:
        True if the hook is disabled, False otherwise
    """
    config_key = HOOK_CONFIG_MAP.get(event_name)
    return get_config_value(config_key, default=False)


def is_logging_disabled():
    """
    Check if logging is disabled in the config files.
    Uses fallback logic: hooks-config.local.json -> hooks-config.json

    Returns:
        True if logging is disabled, False otherwise
    """
    return get_config_value("disableLogging", default=False)


def log_hook_data(hook_data):
    """
    Log the hook_data to hooks-log.jsonl for debugging/auditing.
    Log file is stored at .codex/hooks/logs/hooks-log.jsonl

    Logs 3 keys: hook, timestamp, last_assistant_message
    """
    if is_logging_disabled():
        return

    try:
        log_entry = {
            "hook": hook_data.get("type", ""),
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "last_assistant_message": hook_data.get("last_assistant_message", ""),
        }

        script_dir = Path(__file__).parent
        hooks_dir = script_dir.parent
        logs_dir = hooks_dir / "logs"

        logs_dir.mkdir(parents=True, exist_ok=True)

        log_path = logs_dir / "hooks-log.jsonl"
        with open(log_path, "a", encoding="utf-8") as log_file:
            log_file.write(json.dumps(log_entry, ensure_ascii=False, indent=2) + "\n")
    except Exception as e:
        print(f"Failed to log hook_data: {e}", file=sys.stderr)


def get_session_context():
    """
    Gather context information for SessionStart hook.
    This output goes to stdout and feeds into the model's context.

    Returns:
        String of context information
    """
    return "hooks context: run"


def parse_args(argv):
    """
    Parse command line arguments.
    All hooks use: hooks.py --hook <hook-name>

    Args:
        argv: sys.argv[1:] list

    Returns:
        Tuple of (event_type, input_data) where input_data is the parsed JSON dict or None
    """
    if not argv:
        return None, None

    # hooks.json calling convention: --hook <event-type>
    # The hooks engine passes JSON via stdin
    if argv[0] == "--hook" and len(argv) >= 2:
        event_type = argv[1]
        input_data = {"type": event_type}
        # Read stdin payload from hooks engine (non-blocking)
        try:
            if not sys.stdin.isatty():
                stdin_data = sys.stdin.read()
                if stdin_data.strip():
                    input_data = json.loads(stdin_data)
                    input_data["type"] = event_type
        except Exception:
            pass
        return event_type, input_data

    return None, None


def main():
    """
    Main program - runs when Codex CLI triggers a hook.

    Supports 5 hooks:
    1. SessionStart (hooks.json): Outputs context to stdout + plays sound
    2. PreToolUse (hooks.json): Plays sound before a tool executes
    3. PostToolUse (hooks.json): Plays sound after a tool completes
    4. Stop (hooks.json): Plays sound on session end
    5. UserPromptSubmit (hooks.json): Plays sound when user submits a prompt
    """
    try:
        event_type, input_data = parse_args(sys.argv[1:])

        if not event_type:
            sys.exit(0)

        # Log hook data
        if input_data:
            log_hook_data(input_data)

        # Check if the hook is disabled
        if is_hook_disabled(event_type):
            sys.exit(0)

        # SessionStart: Output context to stdout (feeds into model context)
        if event_type == "SessionStart":
            context = get_session_context()
            if context:
                print(context)

        # Determine which sound to play
        sound_name = HOOK_SOUND_MAP.get(event_type)

        # Play the sound
        if sound_name:
            play_sound(sound_name)

        sys.exit(0)

    except Exception as e:
        print(f"Unexpected error: {e}", file=sys.stderr)
        sys.exit(0)


if __name__ == "__main__":
    main()
