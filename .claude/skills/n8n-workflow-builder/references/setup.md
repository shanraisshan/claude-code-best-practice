# n8n-MCP Setup for Claude Code

## Contents
- Quick setup (documentation only)
- Full setup (with n8n management)
- Project-level configuration
- Verification
- Troubleshooting

---

## Quick Setup (Documentation Only)

No API key needed — gives Claude access to node search, documentation, templates, and validation.

```bash
claude mcp add n8n-mcp \
  -e MCP_MODE=stdio \
  -e LOG_LEVEL=error \
  -e DISABLE_CONSOLE_OUTPUT=true \
  -- npx n8n-mcp
```

## Full Setup (With n8n Instance Management)

Adds ability to create, update, delete, and execute workflows on your n8n instance.

```bash
claude mcp add n8n-mcp \
  -e MCP_MODE=stdio \
  -e LOG_LEVEL=error \
  -e DISABLE_CONSOLE_OUTPUT=true \
  -e N8N_API_URL=https://your-n8n-instance.com \
  -e N8N_API_KEY=your-api-key \
  -- npx n8n-mcp
```

### Where to find your API key

1. Open your n8n instance
2. Go to **Settings** > **API** > **API Keys**
3. Create a new API key or copy an existing one

### Local n8n instance

If running n8n locally:
```bash
N8N_API_URL=http://localhost:5678
```

## Project-Level Configuration (.mcp.json)

For shared team setup, add to `.mcp.json` in the project root:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["n8n-mcp"],
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true",
        "N8N_API_URL": "https://your-n8n-instance.com",
        "N8N_API_KEY": "your-api-key"
      }
    }
  }
}
```

**Security note**: Do not commit API keys to version control. Use environment variable references or `.mcp.local.json` for sensitive values.

## Docker Setup

For environments where npx is not available:

```bash
claude mcp add n8n-mcp \
  -- docker run -i --rm --init \
  -e MCP_MODE=stdio \
  -e LOG_LEVEL=error \
  -e N8N_API_URL=http://host.docker.internal:5678 \
  -e N8N_API_KEY=your-api-key \
  ghcr.io/czlonkowski/n8n-mcp:latest
```

The `-i` flag is mandatory for Docker stdio communication.

## Verification

After setup, verify the connection:

```
/mcp                          # Check server status in Claude Code
n8n-mcp:n8n_health_check()    # Test API connectivity (if API key configured)
n8n-mcp:search_nodes("Gmail") # Test core tools
```

## Environment Variables Reference

| Variable | Required | Purpose |
|----------|----------|---------|
| `MCP_MODE` | Yes | Must be `"stdio"` |
| `LOG_LEVEL` | Recommended | Set to `"error"` to reduce noise |
| `DISABLE_CONSOLE_OUTPUT` | Recommended | Set to `"true"` for clean output |
| `N8N_API_URL` | For management | Your n8n instance URL |
| `N8N_API_KEY` | For management | n8n API key |
| `N8N_MCP_TELEMETRY_DISABLED` | Optional | Set to `"true"` to disable analytics |

## Management Commands

```bash
claude mcp list              # List all configured MCP servers
claude mcp get n8n-mcp       # Check n8n-mcp status
claude mcp remove n8n-mcp    # Remove the server
```

## Troubleshooting

- **"Server not found"**: Run `claude mcp list` to verify. Re-add if missing.
- **JSON parsing errors**: Ensure `MCP_MODE=stdio` is set. Without it, output breaks the protocol.
- **"Unauthorized" errors**: Check that `N8N_API_KEY` is valid and has proper permissions.
- **Docker connectivity**: Use `host.docker.internal` instead of `localhost` for the API URL.
- **npx fails**: Ensure Node.js >= 18 is installed. Try `npm install -g n8n-mcp` as an alternative.
- **Timeout errors**: Increase timeout or check n8n instance health at the API URL directly.
