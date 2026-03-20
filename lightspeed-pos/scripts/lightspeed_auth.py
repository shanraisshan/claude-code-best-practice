#!/usr/bin/env python3
"""
Lightspeed Retail R-Series OAuth Token Manager

Handles OAuth 2.0 token refresh for the Lightspeed API.
Stores tokens in a local cache file to minimize API calls.

Usage:
    python3 lightspeed_auth.py get-token    # Returns a valid access token
    python3 lightspeed_auth.py refresh      # Force-refresh the token
    python3 lightspeed_auth.py status       # Show token status (expiry, account)

Environment variables (from lightspeed-pos/.env):
    LIGHTSPEED_ACCOUNT_ID     - Your Lightspeed account ID
    LIGHTSPEED_CLIENT_ID      - OAuth app client ID
    LIGHTSPEED_CLIENT_SECRET  - OAuth app client secret
    LIGHTSPEED_REFRESH_TOKEN  - Long-lived refresh token
"""

import json
import os
import sys
import time
import urllib.request
import urllib.parse
import urllib.error
import base64
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
ENV_FILE = PROJECT_DIR / ".env"
TOKEN_CACHE = PROJECT_DIR / ".token-cache.json"

# Lightspeed R-Series OAuth endpoints
TOKEN_URL = "https://cloud.merchantos.com/oauth/access_token.php"


def load_env():
    """Load environment variables from .env file."""
    env = {}
    if ENV_FILE.exists():
        with open(ENV_FILE) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, _, value = line.partition("=")
                    env[key.strip()] = value.strip().strip('"').strip("'")

    # Override with actual environment variables
    for key in [
        "LIGHTSPEED_ACCOUNT_ID",
        "LIGHTSPEED_CLIENT_ID",
        "LIGHTSPEED_CLIENT_SECRET",
        "LIGHTSPEED_REFRESH_TOKEN",
    ]:
        if key in os.environ:
            env[key] = os.environ[key]

    return env


def load_cached_token():
    """Load cached token if it exists and hasn't expired."""
    if not TOKEN_CACHE.exists():
        return None
    try:
        with open(TOKEN_CACHE) as f:
            cache = json.load(f)
        # Check if token is still valid (with 60s buffer)
        if cache.get("expires_at", 0) > time.time() + 60:
            return cache.get("access_token")
    except (json.JSONDecodeError, KeyError):
        pass
    return None


def save_cached_token(access_token, expires_in):
    """Save token to cache file."""
    cache = {
        "access_token": access_token,
        "expires_at": time.time() + expires_in,
        "cached_at": time.time(),
    }
    with open(TOKEN_CACHE, "w") as f:
        json.dump(cache, f, indent=2)
    # Restrict permissions
    os.chmod(TOKEN_CACHE, 0o600)


def refresh_token(env):
    """Request a new access token using the refresh token."""
    required = [
        "LIGHTSPEED_CLIENT_ID",
        "LIGHTSPEED_CLIENT_SECRET",
        "LIGHTSPEED_REFRESH_TOKEN",
    ]
    missing = [k for k in required if k not in env]
    if missing:
        print(
            f"ERROR: Missing environment variables: {', '.join(missing)}",
            file=sys.stderr,
        )
        print(f"Set them in {ENV_FILE} or as environment variables.", file=sys.stderr)
        sys.exit(1)

    data = urllib.parse.urlencode(
        {
            "grant_type": "refresh_token",
            "client_id": env["LIGHTSPEED_CLIENT_ID"],
            "client_secret": env["LIGHTSPEED_CLIENT_SECRET"],
            "refresh_token": env["LIGHTSPEED_REFRESH_TOKEN"],
        }
    ).encode()

    req = urllib.request.Request(
        TOKEN_URL,
        data=data,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read().decode())

        access_token = result["access_token"]
        expires_in = int(result.get("expires_in", 3600))

        # If a new refresh token was issued, update the .env file
        if "refresh_token" in result and result["refresh_token"] != env.get(
            "LIGHTSPEED_REFRESH_TOKEN"
        ):
            update_refresh_token(result["refresh_token"])

        save_cached_token(access_token, expires_in)
        return access_token

    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ""
        print(
            f"ERROR: Token refresh failed (HTTP {e.code}): {body}", file=sys.stderr
        )
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"ERROR: Network error: {e.reason}", file=sys.stderr)
        sys.exit(1)


def update_refresh_token(new_token):
    """Update the refresh token in the .env file."""
    if not ENV_FILE.exists():
        return
    lines = ENV_FILE.read_text().splitlines()
    updated = False
    for i, line in enumerate(lines):
        if line.startswith("LIGHTSPEED_REFRESH_TOKEN="):
            lines[i] = f"LIGHTSPEED_REFRESH_TOKEN={new_token}"
            updated = True
            break
    if updated:
        ENV_FILE.write_text("\n".join(lines) + "\n")


def get_token():
    """Get a valid access token (from cache or refresh)."""
    cached = load_cached_token()
    if cached:
        return cached

    env = load_env()
    return refresh_token(env)


def show_status():
    """Show token and configuration status."""
    env = load_env()

    print("=== Lightspeed Auth Status ===")
    print(f"Account ID: {env.get('LIGHTSPEED_ACCOUNT_ID', 'NOT SET')}")
    print(f"Client ID:  {env.get('LIGHTSPEED_CLIENT_ID', 'NOT SET')[:8]}...")
    print(
        f"Refresh Token: {'SET' if env.get('LIGHTSPEED_REFRESH_TOKEN') else 'NOT SET'}"
    )

    if TOKEN_CACHE.exists():
        try:
            with open(TOKEN_CACHE) as f:
                cache = json.load(f)
            remaining = cache.get("expires_at", 0) - time.time()
            if remaining > 0:
                mins = int(remaining / 60)
                print(f"Cached Token: VALID ({mins}m remaining)")
            else:
                print("Cached Token: EXPIRED")
        except (json.JSONDecodeError, KeyError):
            print("Cached Token: CORRUPT")
    else:
        print("Cached Token: NONE")


def main():
    if len(sys.argv) < 2:
        print("Usage: lightspeed_auth.py [get-token|refresh|status]", file=sys.stderr)
        sys.exit(1)

    command = sys.argv[1]

    if command == "get-token":
        token = get_token()
        # Print only the token for script consumption
        print(token, end="")
    elif command == "refresh":
        env = load_env()
        token = refresh_token(env)
        print(token, end="")
    elif command == "status":
        show_status()
    else:
        print(f"Unknown command: {command}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
