#!/bin/bash
# Cross-platform Python wrapper for Claude Code hooks
# Automatically selects python or python3 based on OS and availability

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_SCRIPT="$SCRIPT_DIR/hooks.py"

# Function to detect and use the correct Python command
run_python() {
    # Check if python3 is available (preferred on Unix-like systems)
    if command -v python3 &> /dev/null; then
        python3 "$PYTHON_SCRIPT"
    # Fallback to python command (Windows and some systems)
    elif command -v python &> /dev/null; then
        python "$PYTHON_SCRIPT"
    else
        echo "Error: Neither python nor python3 command found" >&2
        exit 1
    fi
}

# Run the Python script
run_python
