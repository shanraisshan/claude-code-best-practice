#!/usr/bin/env python3
"""
Claude Code Hook Handler
=============================================
This script handles events from Claude Code and plays sounds for different hook events.
Supports all 9 Claude Code hooks: https://docs.claude.com/en/docs/claude-code/hooks-guide

Special handling for git commits: plays pretooluse-git-committing.mp3
"""

import sys
import json
import subprocess
import re
import platform
from pathlib import Path

# Windows-only module for playing WAV files
try:
    import winsound
except ImportError:
    winsound = None

# ===== HOOK EVENT TO SOUND FOLDER MAPPING =====
# Maps each hook event to its corresponding sound folder
HOOK_SOUND_MAP = {
    "PreToolUse": "pretooluse",
    "PostToolUse": "posttooluse",
    "UserPromptSubmit": "userpromptsubmit",
    "Notification": "notification",
    "Stop": "stop",
    "SubagentStop": "subagentstop",
    "PreCompact": "precompact",
    "SessionStart": "sessionstart",
    "SessionEnd": "sessionend"
}

# ===== BASH COMMAND PATTERNS =====
# Regex patterns to detect specific bash commands and map to special sounds
BASH_PATTERNS = [
    (r'git commit', "pretooluse-git-committing"),  # Git commits (anywhere in command)
]

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
        # Try to find an available player
        players = [
            ["paplay"],           # PulseAudio (most common on modern Linux)
            ["aplay"],            # ALSA (fallback)
            ["ffplay", "-nodisp", "-autoexit"],  # FFmpeg (if installed)
            ["mpg123", "-q"],     # mpg123 (if installed)
        ]

        for player in players:
            try:
                # Check if the player exists
                subprocess.run(
                    ["which", player[0]],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    check=True
                )
                return player
            except (subprocess.CalledProcessError, FileNotFoundError):
                continue

        # No player found
        return None
    elif system == "Windows":
        # Windows: Use winsound for WAV, PowerShell for MP3
        return ["WINDOWS"]
    else:
        # Other OS - not supported yet
        return None


def play_sound(sound_name):
    """
    Play a sound file for the given sound name.

    Args:
        sound_name: Name of the sound file (e.g., "pretooluse", "pretooluse-git-committing")
                   The file should be at .claude/hooks/sounds/{folder}/{sound_name}.{mp3|wav}

    Returns:
        True if sound played successfully, False otherwise
    """
    # Security check: Prevent directory traversal attacks
    if "/" in sound_name or "\\" in sound_name or ".." in sound_name:
        print(f"Invalid sound name: {sound_name}", file=sys.stderr)
        return False

    # Get the appropriate audio player for this platform
    audio_player = get_audio_player()
    if not audio_player:
        # No audio player available - fail silently
        return False

    # Build the path to the sound folder
    # Scripts are in .claude/hooks/scripts/, sounds are in .claude/hooks/sounds/
    script_dir = Path(__file__).parent  # .claude/hooks/scripts/
    hooks_dir = script_dir.parent  # .claude/hooks/

    # Determine the folder based on the sound name prefix
    # For special sounds like "pretooluse-git-committing", look in "pretooluse" folder
    folder_name = sound_name.split('-')[0]
    sounds_dir = hooks_dir / "sounds" / folder_name

    # Check if we're on Windows and need special handling
    is_windows = audio_player[0] == "WINDOWS"

    # Try different audio formats
    # Note: paplay (PulseAudio) doesn't support MP3, so try WAV first
    # On Windows, only use WAV files to avoid PowerShell/COM issues
    extensions = ['.wav'] if is_windows else ['.wav', '.mp3']

    for extension in extensions:
        file_path = sounds_dir / f"{sound_name}{extension}"

        if file_path.exists():
            try:
                if is_windows:
                    # Windows: Use winsound for WAV files (built-in, reliable, fast)
                    if winsound:
                        # SND_FILENAME: file_path is a filename
                        # SND_SYNC: play sound synchronously (wait until complete)
                        # SND_NODEFAULT: don't play default sound if file not found
                        # Note: Using SND_SYNC instead of SND_ASYNC because the script exits immediately
                        # after this call, which would terminate async playback before it completes
                        winsound.PlaySound(str(file_path),
                                         winsound.SND_FILENAME | winsound.SND_NODEFAULT)
                        return True
                    else:
                        # winsound not available, fail silently
                        return False
                else:
                    # Unix/Linux/macOS: use subprocess with audio player
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
                # Catch any other exceptions (e.g., winsound errors)
                print(f"Error playing sound {file_path.name}: {e}", file=sys.stderr)
                return False

    # Sound not found - fail silently to avoid disrupting Claude's work
    return False

def is_hook_disabled(event_name):
    """
    Check if a specific hook is disabled in the config files.
    Uses fallback logic: hooks-config.local.json -> hooks-config.json

    Priority:
    1. If hooks-config.local.json exists and has the setting, use it
    2. Otherwise, fall back to hooks-config.json
    3. If neither exists or the key is missing, assume hook is enabled (return False)

    Args:
        event_name: The hook event name (e.g., "PreToolUse", "PostToolUse")

    Returns:
        True if the hook is disabled, False otherwise
    """
    try:
        # Scripts are in .claude/hooks/scripts/, config is in .claude/hooks/config/
        script_dir = Path(__file__).parent  # .claude/hooks/scripts/
        hooks_dir = script_dir.parent  # .claude/hooks/
        config_dir = hooks_dir / "config"  # .claude/hooks/config/

        local_config_path = config_dir / "hooks-config.local.json"
        default_config_path = config_dir / "hooks-config.json"

        # Map event names to config keys
        config_key = f"disable{event_name}Hook"

        # Try to load local config first
        local_config = None
        if local_config_path.exists():
            try:
                with open(local_config_path, "r", encoding="utf-8") as config_file:
                    local_config = json.load(config_file)
            except Exception as e:
                print(f"Error reading local config: {e}", file=sys.stderr)

        # Try to load default config
        default_config = None
        if default_config_path.exists():
            try:
                with open(default_config_path, "r", encoding="utf-8") as config_file:
                    default_config = json.load(config_file)
            except Exception as e:
                print(f"Error reading default config: {e}", file=sys.stderr)

        # Apply fallback logic: local -> default -> False (enabled)
        if local_config is not None and config_key in local_config:
            return local_config[config_key]
        elif default_config is not None and config_key in default_config:
            return default_config[config_key]
        else:
            # If neither config has the key, assume hook is enabled
            return False

    except Exception as e:
        # If anything goes wrong, assume hook is enabled
        print(f"Error in is_hook_disabled: {e}", file=sys.stderr)
        return False

def log_hook_data(hook_data):
    """
    Log the full hook_data to hooks-log.jsonl for debugging/auditing.
    Log file is stored at .claude/hooks/logs/hooks-log.jsonl
    """
    try:
        # Scripts are in .claude/hooks/scripts/, logs are in .claude/hooks/logs/
        script_dir = Path(__file__).parent  # .claude/hooks/scripts/
        hooks_dir = script_dir.parent  # .claude/hooks/
        logs_dir = hooks_dir / "logs"  # .claude/hooks/logs/

        # Ensure logs directory exists
        logs_dir.mkdir(parents=True, exist_ok=True)

        log_path = logs_dir / "hooks-log.jsonl"
        with open(log_path, "a", encoding="utf-8") as log_file:
            log_file.write(json.dumps(hook_data, ensure_ascii=False, indent=2) + "\n")
    except Exception as e:
        # Fail silently, but print to stderr for visibility
        print(f"Failed to log hook_data: {e}", file=sys.stderr)


def detect_bash_command_sound(command):
    """
    Detect special bash commands and return the corresponding sound name.

    Args:
        command: The bash command string

    Returns:
        Sound name (string) if a pattern matches, None otherwise
    """
    if not command:
        return None

    for pattern, sound_name in BASH_PATTERNS:
        if re.search(pattern, command.strip()):
            return sound_name

    return None


def get_sound_name(hook_data):
    """
    Determine which sound to play based on the hook event and context.

    Args:
        hook_data: Dictionary containing event information from Claude

    Returns:
        Sound name (string) or None if no sound should play
    """
    event_name = hook_data.get("hook_event_name", "")
    tool_name = hook_data.get("tool_name", "")

    # Check if this is a PreToolUse event with Bash tool
    if event_name == "PreToolUse" and tool_name == "Bash":
        tool_input = hook_data.get("tool_input", {})
        command = tool_input.get("command", "")

        # Check for special bash command patterns (e.g., git commit)
        special_sound = detect_bash_command_sound(command)
        if special_sound:
            return special_sound

    # Return the default sound for this hook event
    return HOOK_SOUND_MAP.get(event_name)

def main():
    """
    Main program - this runs when Claude triggers a hook.

    How it works:
    1. Claude sends event data as JSON through stdin
    2. We check if this specific hook is disabled in hooks-config.json
    3. We parse the JSON to understand which hook event occurred
    4. We check for special bash commands (like git commit)
    5. We play the corresponding sound for that event
    6. We exit successfully
    """
    try:
        # Step 1: Read the event data from Claude
        stdin_content = sys.stdin.read().strip()

        # If stdin is empty, exit gracefully (hook was called without data)
        if not stdin_content:
            sys.exit(0)

        input_data = json.loads(stdin_content)
        log_hook_data(input_data)

        # Step 2: Check if this hook is disabled
        event_name = input_data.get("hook_event_name", "")
        if is_hook_disabled(event_name):
            # Hook is disabled, exit silently without playing sound
            sys.exit(0)

        # Step 3: Determine which sound to play (may be special or default)
        sound_name = get_sound_name(input_data)

        # Step 4: Play the sound (if we found one)
        if sound_name:
            play_sound(sound_name)

        # Step 5: Exit successfully
        # Always exit with code 0 so we don't interrupt Claude's work
        sys.exit(0)

    except json.JSONDecodeError as e:
        print(f"Error parsing JSON input: {e}", file=sys.stderr)
        # Exit with 0 to avoid blocking Claude's work
        sys.exit(0)
    except Exception as e:
        print(f"Unexpected error: {e}", file=sys.stderr)
        # Exit with 0 to avoid blocking Claude's work
        sys.exit(0)


# Entry point - Python calls main() when the script runs
if __name__ == "__main__":
    main()