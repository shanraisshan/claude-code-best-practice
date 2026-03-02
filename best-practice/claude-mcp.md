# MCP Servers Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar%2002%2C%202026%2012%3A30%20PM%20PKT-white?style=flat&labelColor=555)<br>
[![Implemented](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../.mcp.json)

MCP (Model Context Protocol) servers extend Claude Code with connections to external tools, databases, and APIs. This guide covers recommended servers for daily use and configuration best practices.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## MCP Servers for Daily Use

> *"Went overboard with 15 MCP servers thinking more = better. Ended up using only 4 daily."* — [r/mcp](https://reddit.com/r/mcp/comments/1mj0fxs/) (682 upvotes)

| MCP Server | What It Does | Resources |
|------------|-------------|-----------|
| [**Context7**](https://github.com/upstash/context7) | Fetches up-to-date library docs into context. Prevents hallucinated APIs from outdated training data | [Reddit: "by far the best MCP for coding"](https://reddit.com/r/mcp/comments/1qarjqm/) · [npm](https://www.npmjs.com/package/@upstash/context7-mcp) |
| [**Playwright**](https://github.com/microsoft/playwright-mcp) | Browser automation — implement, test, and verify UI features autonomously. Screenshots, navigation, form testing | [Reddit: essential for frontend](https://reddit.com/r/mcp/comments/1m59pk0/) · [Docs](https://playwright.dev/) |
| [**Claude in Chrome**](https://github.com/nicobailon/claude-code-in-chrome-mcp) | Connects Claude to your real Chrome browser — inspect console, network, DOM. Debug what users actually see | [Reddit: "game changer" for debugging](https://reddit.com/r/mcp/comments/1qarjqm/5_mcps_that_have_genuinely_made_me_10x_faster/nza0i7t/) · [Comparison Report](../reports/claude-in-chrome-v-chrome-devtools-mcp.md) |
| [**DeepWiki**](https://github.com/devanshusemwal/deepwiki-mcp) | Fetches structured wiki-style documentation for any GitHub repo — architecture, API surface, relationships | [Reddit: "put it behind a gateway with Context7"](https://reddit.com/r/mcp/comments/1qarjqm/) |
| [**Excalidraw**](https://github.com/antonpk1/excalidraw-mcp-app) | Generate architecture diagrams, flowcharts, and system designs as hand-drawn Excalidraw sketches from prompts | [GitHub](https://github.com/antonpk1/excalidraw-mcp-app) |

Research (Context7/DeepWiki) -> Debug (Playwright/Chrome) -> Document (Excalidraw)

---

## Configuration

MCP servers are configured in `.mcp.json` at the project root (project-scoped) or in `~/.claude.json` (user-scoped).

### Server Types

| Type | Transport | Example |
|------|-----------|---------|
| **stdio** | Spawns a local process | `npx`, `python`, binary |
| **http** | Connects to a remote URL | HTTP/SSE endpoint |

### Example `.mcp.json`

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    },
    "deepwiki": {
      "command": "npx",
      "args": ["-y", "deepwiki-mcp"]
    },
    "remote-api": {
      "type": "http",
      "url": "https://mcp.example.com/mcp"
    }
  }
}
```

### Settings for MCP Servers

These settings in `.claude/settings.json` control MCP server approval:

| Key | Type | Description |
|-----|------|-------------|
| `enableAllProjectMcpServers` | boolean | Auto-approve all `.mcp.json` servers without prompting |
| `enabledMcpjsonServers` | array | Allowlist of specific server names to auto-approve |
| `disabledMcpjsonServers` | array | Blocklist of specific server names to reject |

### Permission Rules for MCP Tools

MCP tools follow the `mcp__<server>__<tool>` naming convention in permission rules:

```json
{
  "permissions": {
    "allow": [
      "mcp__*",
      "mcp__context7__*",
      "mcp__playwright__browser_snapshot"
    ],
    "deny": [
      "mcp__dangerous-server__*"
    ]
  }
}
```

---

## MCP Scopes

MCP servers can be defined at three levels:

| Scope | Location | Purpose |
|-------|----------|---------|
| **Project** | `.mcp.json` (repo root) | Team-shared servers, committed to git |
| **User** | `~/.claude.json` (`mcpServers` key) | Personal servers across all projects |
| **Subagent** | Agent frontmatter (`mcpServers` field) | Servers scoped to a specific subagent |

Precedence: Subagent > Project > User

---

## Sources

- [MCP Servers — Claude Code Docs](https://code.claude.com/docs/en/mcp)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [5 MCPs that have genuinely made me 10x faster — r/mcp](https://reddit.com/r/mcp/comments/1qarjqm/)
- [MCP Server Overload Discussion — r/mcp](https://reddit.com/r/mcp/comments/1mj0fxs/)
