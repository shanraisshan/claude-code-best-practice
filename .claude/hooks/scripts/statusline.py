#!/usr/bin/env python3
"""
Claude Code statusline.

Reads the statusline JSON payload from stdin and prints a single line:
    <model>  <output-style>  <dir> (<git-branch>)

Every field degrades gracefully: a missing payload key or a non-git
directory just drops that segment instead of erroring. Claude Code calls
this on every render, so it must be fast and never crash.
"""

import sys
import json
import subprocess
from pathlib import Path


def git_branch(cwd: str) -> str:
    try:
        out = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            cwd=cwd, capture_output=True, text=True, timeout=1,
        )
        if out.returncode == 0:
            return out.stdout.strip()
    except Exception:
        pass
    return ""


def main() -> None:
    try:
        data = json.load(sys.stdin)
    except Exception:
        data = {}

    model = (data.get("model") or {}).get("display_name", "")
    style = (data.get("output_style") or {}).get("name", "")
    cwd = (data.get("workspace") or {}).get("current_dir") or str(Path.cwd())

    segments = []
    if model:
        segments.append(model)
    if style and style.lower() != "default":
        segments.append(style)

    name = Path(cwd).name
    branch = git_branch(cwd)
    segments.append(f"{name} ({branch})" if branch else name)

    print("  ".join(segments))


if __name__ == "__main__":
    main()
