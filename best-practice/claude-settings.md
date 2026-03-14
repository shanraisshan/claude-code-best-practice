# Claude Code Settings Reference

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar%2014%2C%202026%201%3A36%20AM%20PKT-white?style=flat&labelColor=555) ![Version](https://img.shields.io/badge/Claude_Code-v2.1.75-blue?style=flat&labelColor=555)

A comprehensive guide to all available configuration options in Claude Code's `settings.json` files. As of v2.1.75, Claude Code exposes **55+ settings** and **140+ environment variables** (use the `"env"` field in `settings.json` to avoid wrapper scripts).

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

## Table of Contents

1. [Settings Hierarchy](#settings-hierarchy)
2. [Core Configuration](#core-configuration)
3. [Permissions](#permissions)
4. [Hooks](#hooks)
5. [MCP Servers](#mcp-servers)
6. [Sandbox](#sandbox)
7. [Plugins](#plugins)
8. [Model Configuration](#model-configuration)
9. [Display & UX](#display--ux)
10. [AWS & Cloud Credentials](#aws--cloud-credentials)
11. [Environment Variables](#environment-variables-via-env)
12. [Useful Commands](#useful-commands)

---

## Settings Hierarchy

Settings apply in order of precedence (highest to lowest):

| Priority | Location | Scope | Shared? | Purpose |
|----------|----------|-------|---------|---------|
| 1 | Managed settings | Organization | Yes (deployed by IT) | Security policies that cannot be overridden |
| 2 | Command line arguments | Session | N/A | Temporary single-session overrides |
| 3 | `.claude/settings.local.json` | Project | No (git-ignored) | Personal project-specific |
| 4 | `.claude/settings.json` | Project | Yes (committed) | Team-shared settings |
| 5 | `~/.claude/settings.json` | User | N/A | Global personal defaults |

**Managed settings** are organization-enforced and cannot be overridden by any other level, including command line arguments. Delivery methods:
- **Server-managed** settings (remote delivery)
- **MDM profiles** — macOS plist at `com.anthropic.claudecode`
- **Registry policies** — Windows HKLM/HKCU at `Software\Anthropic\ClaudeCode`
- **File** — `managed-settings.json` (macOS: `/Library/Application Support/ClaudeCode/`, Linux/WSL: `/etc/claude-code/`, Windows: `C:\Program Files\ClaudeCode\`)

Within the managed tier, precedence is: server-managed > MDM/OS-level policies > `managed-settings.json` > HKCU registry (Windows only). Only one managed source is used; sources do not merge.

> **Note:** As of v2.1.75, the deprecated Windows fallback path `C:\ProgramData\ClaudeCode\managed-settings.json` has been removed. Use `C:\Program Files\ClaudeCode\managed-settings.json` instead.

**Important**:
- `deny` rules have highest safety precedence and cannot be overridden by lower-priority allow/ask rules.
- Managed settings may lock or override local behavior even if local files specify different values.
- Array settings (e.g., `permissions.allow`) are **concatenated and deduplicated** across scopes — entries from all levels are combined, not replaced.

---

## Core Configuration

### General Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `$schema` | string | - | JSON Schema URL for IDE validation and autocompletion (e.g., `"https://json.schemastore.org/claude-code-settings.json"`) |
| `model` | string | `"default"` | Override default model. Accepts aliases (`sonnet`, `opus`, `haiku`) or full model IDs |
| `agent` | string | - | Set the default agent for the main conversation. Value is the agent name from `.claude/agents/`. Also available via `--agent` CLI flag |
| `language` | string | `"english"` | Claude's preferred response language |
| `cleanupPeriodDays` | number | `30` | Sessions inactive longer than this are deleted at startup. Setting to `0` deletes all existing transcripts and disables session persistence entirely (no `.jsonl` files written, `/resume` shows no conversations) |
| `autoUpdatesChannel` | string | `"latest"` | Release channel: `"stable"` or `"latest"` |
| `alwaysThinkingEnabled` | boolean | `false` | Enable extended thinking by default for all sessions |
| `skipWebFetchPreflight` | boolean | `false` | Skip WebFetch blocklist check before fetching URLs |
| `availableModels` | array | - | Restrict which models users can select via `/model`, `--model`, or `ANTHROPIC_MODEL`. Does not affect the Default option. Example: `["sonnet", "haiku"]` |
| `fastModePerSessionOptIn` | boolean | `false` | Require users to opt in to fast mode each session |
| `teammateMode` | string | `"auto"` | Agent team display mode: `"auto"` (split panes in tmux/iTerm2, in-process otherwise), `"in-process"`, or `"tmux"` |
| `includeGitInstructions` | boolean | `true` | Include git-related instructions in system prompt |

**Example:**
```json
{
  "model": "opus",
  "agent": "code-reviewer",
  "language": "japanese",
  "cleanupPeriodDays": 60,
  "autoUpdatesChannel": "stable",
  "alwaysThinkingEnabled": true
}
```

### Plans & Memory Directories

Store plan and auto-memory files in custom locations.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `plansDirectory` | string | `~/.claude/plans` | Directory where `/plan` outputs are stored |
| `autoMemoryDirectory` | string | - | Custom directory for auto-memory storage. Accepts `~/`-expanded paths. Not accepted in project settings (`.claude/settings.json`) to prevent redirecting memory writes to sensitive locations; accepted from policy, local, and user settings |

**Example:**
```json
{
  "plansDirectory": "./my-plans"
}
```

**Use Case:** Useful for organizing planning artifacts separately from Claude's internal files, or for keeping plans in a shared team location.

### Attribution Settings

Customize attribution messages for git commits and pull requests.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `attribution.commit` | string | Co-authored-by | Git commit attribution (supports trailers) |
| `attribution.pr` | string | Generated message | Pull request description attribution |
| `includeCoAuthoredBy` | boolean | `true` | **DEPRECATED** - Use `attribution` instead |

**Example:**
```json
{
  "attribution": {
    "commit": "Generated with AI\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
    "pr": "Generated with Claude Code"
  }
}
```

**Note:** Set to empty string (`""`) to hide attribution entirely.

### Authentication Helpers

Scripts for dynamic authentication token generation.

| Key | Type | Description |
|-----|------|-------------|
| `apiKeyHelper` | string | Shell script path that outputs auth token (sent as `X-Api-Key` header) |
| `forceLoginMethod` | string | Restrict login to `"claudeai"` or `"console"` accounts |
| `forceLoginOrgUUID` | string | UUID to automatically select organization during login |

**Example:**
```json
{
  "apiKeyHelper": "/bin/generate_temp_api_key.sh",
  "forceLoginMethod": "console",
  "forceLoginOrgUUID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### Company Announcements

Display custom announcements to users at startup (cycled randomly).

| Key | Type | Description |
|-----|------|-------------|
| `companyAnnouncements` | array | Array of strings displayed at startup |

**Example:**
```json
{
  "companyAnnouncements": [
    "Welcome to Acme Corp!",
    "Remember to run tests before committing!",
    "Check the wiki for coding standards"
  ]
}
```

---

## Permissions

Control what tools and operations Claude can perform.

### Permission Structure

```json
{
  "permissions": {
    "allow": [],
    "ask": [],
    "deny": [],
    "additionalDirectories": [],
    "defaultMode": "acceptEdits",
    "disableBypassPermissionsMode": "disable"
  }
}
```

### Permission Keys

| Key | Type | Description |
|-----|------|-------------|
| `permissions.allow` | array | Rules allowing tool use without prompting |
| `permissions.ask` | array | Rules requiring user confirmation |
| `permissions.deny` | array | Rules blocking tool use (highest precedence) |
| `permissions.additionalDirectories` | array | Extra directories Claude can access |
| `permissions.defaultMode` | string | Default permission mode. In Remote environments, only `acceptEdits` and `plan` are honored (v2.1.70+) |
| `permissions.disableBypassPermissionsMode` | string | Prevent bypass mode activation |
| `allowManagedPermissionRulesOnly` | boolean | **(Managed only)** Only managed permission rules apply; user/project `allow`, `ask`, `deny` rules are ignored |
| `allow_remote_sessions` | boolean | **(Managed only)** Allow users to start Remote Control and web sessions. Defaults to `true`. Set to `false` to prevent remote session access |

### Permission Modes

| Mode | Behavior |
|------|----------|
| `"default"` | Standard permission checking with prompts |
| `"acceptEdits"` | Auto-accept file edits without asking |
| `"askEdits"` | Ask before every operation *(not in official docs — unverified)* |
| `"dontAsk"` | Auto-denies tools unless pre-approved via `/permissions` or `permissions.allow` rules |
| `"viewOnly"` | Read-only mode, no modifications *(not in official docs — unverified)* |
| `"bypassPermissions"` | Skip all permission checks (dangerous) |
| `"plan"` | Read-only exploration mode |

### Tool Permission Syntax

| Tool | Syntax | Examples |
|------|--------|----------|
| `Bash` | `Bash(command pattern)` | `Bash(npm run *)`, `Bash(* install)`, `Bash(git * main)` |
| `Read` | `Read(path pattern)` | `Read(.env)`, `Read(./secrets/**)` |
| `Edit` | `Edit(path pattern)` | `Edit(src/**)`, `Edit(*.ts)` |
| `Write` | `Write(path pattern)` | `Write(*.md)`, `Write(./docs/**)` |
| `NotebookEdit` | `NotebookEdit(pattern)` | `NotebookEdit(*)` |
| `WebFetch` | `WebFetch(domain:pattern)` | `WebFetch(domain:example.com)` |
| `WebSearch` | `WebSearch` | Global web search |
| `Task` | `Task(agent-name)` | `Task(Explore)`, `Task(my-agent)` |
| `Agent` | `Agent(name)` | `Agent(researcher)`, `Agent(*)` — permission scoped to subagent spawning |
| `Skill` | `Skill(skill-name)` | `Skill(weather-fetcher)` |
| `MCP` | `mcp__server__tool` or `MCP(server:tool)` | `mcp__memory__*`, `MCP(github:*)` |

**Evaluation order:** Rules are evaluated in order: deny rules first, then ask, then allow. The first matching rule wins.

**Bash wildcard notes:**
- `*` can appear at **any position**: prefix (`Bash(* install)`), suffix (`Bash(npm *)`), or middle (`Bash(git * main)`)
- `Bash(*)` is treated as equivalent to `Bash` (matches all bash commands)
- Permission rules support output redirections: `Bash(python:*)` matches `python script.py > output.txt`

**Example:**
```json
{
  "permissions": {
    "allow": [
      "Edit(*)",
      "Write(*)",
      "Bash(npm run *)",
      "Bash(git *)",
      "WebFetch(domain:*)",
      "mcp__*"
    ],
    "ask": [
      "Bash(rm *)",
      "Bash(git push *)"
    ],
    "deny": [
      "Read(.env)",
      "Read(./secrets/**)",
      "Bash(curl *)"
    ],
    "additionalDirectories": ["../shared-libs/"]
  }
}
```

---

## Hooks

Hook configuration (events, properties, matchers, exit codes, environment variables, and HTTP hooks) is maintained in a dedicated repository:

> **[claude-code-voice-hooks](https://github.com/shanraisshan/claude-code-voice-hooks)** — Complete hook reference with sound notification system, all 19 hook events, HTTP hooks, matcher patterns, exit codes, and environment variables.

Hook-related settings keys (`hooks`, `disableAllHooks`, `allowManagedHooksOnly`, `allowedHttpHookUrls`, `httpHookAllowedEnvVars`) are documented there.

For the official hooks reference, see the [Claude Code Hooks Documentation](https://code.claude.com/docs/en/hooks).

---

## MCP Servers

Configure Model Context Protocol servers for extended capabilities.

### MCP Settings

| Key | Type | Scope | Description |
|-----|------|-------|-------------|
| `enableAllProjectMcpServers` | boolean | Any | Auto-approve all `.mcp.json` servers |
| `enabledMcpjsonServers` | array | Any | Allowlist specific server names |
| `disabledMcpjsonServers` | array | Any | Blocklist specific server names |
| `allowedMcpServers` | array | Managed only | Allowlist with name/command/URL matching |
| `deniedMcpServers` | array | Managed only | Blocklist with matching |
| `allowManagedMcpServersOnly` | boolean | Managed only | Only allow MCP servers explicitly listed in managed allowlist |

### MCP Server Matching (Managed Settings)

```json
{
  "allowedMcpServers": [
    { "serverName": "github" },
    { "serverCommand": "npx @modelcontextprotocol/*" },
    { "serverUrl": "https://mcp.company.com/*" }
  ],
  "deniedMcpServers": [
    { "serverName": "dangerous-server" }
  ]
}
```

**Example:**
```json
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["memory", "github", "filesystem"],
  "disabledMcpjsonServers": ["experimental-server"]
}
```

---

## Sandbox

Configure bash command sandboxing for security.

### Sandbox Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `sandbox.enabled` | boolean | `false` | Enable bash sandboxing |
| `sandbox.autoAllowBashIfSandboxed` | boolean | `true` | Auto-approve bash when sandboxed |
| `sandbox.excludedCommands` | array | `[]` | Commands to run outside sandbox |
| `sandbox.allowUnsandboxedCommands` | boolean | `true` | Allow `dangerouslyDisableSandbox` |
| `sandbox.ignoreViolations` | object | `{}` | Map of command patterns to path arrays — suppress violation warnings |
| `sandbox.enableWeakerNestedSandbox` | boolean | `false` | Weaker sandbox for Docker (reduces security) |
| `sandbox.network.allowUnixSockets` | array | `[]` | Specific Unix socket paths accessible in sandbox |
| `sandbox.network.allowAllUnixSockets` | boolean | `false` | Allow all Unix sockets (overrides allowUnixSockets) |
| `sandbox.network.allowLocalBinding` | boolean | `false` | Allow binding to localhost ports (macOS) |
| `sandbox.network.allowedDomains` | array | `[]` | Network domain allowlist for sandbox |
| `sandbox.network.deniedDomains` | array | `[]` | Network domain denylist for sandbox |
| `sandbox.network.httpProxyPort` | number | - | HTTP proxy port 1-65535 (custom proxy) |
| `sandbox.network.socksProxyPort` | number | - | SOCKS5 proxy port 1-65535 (custom proxy) |
| `sandbox.network.allowManagedDomainsOnly` | boolean | `false` | Only allow domains in managed allowlist (managed settings) |
| `sandbox.filesystem.allowWrite` | array | `[]` | Path prefixes where write is allowed. Prefix: `//` (absolute), `~/` (home), `/` (project root), `./` (cwd) |
| `sandbox.filesystem.denyWrite` | array | `[]` | Path prefixes where write is denied |
| `sandbox.filesystem.denyRead` | array | `[]` | Path prefixes where read is denied |
| `sandbox.enableWeakerNetworkIsolation` | boolean | `false` | (macOS only) Allow access to system TLS trust (`com.apple.trustd.agent`); reduces security |

**Example:**
```json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["git", "docker", "gh"],
    "allowUnsandboxedCommands": false,
    "network": {
      "allowUnixSockets": ["/var/run/docker.sock"],
      "allowLocalBinding": true
    }
  }
}
```

---

## Plugins

Configure Claude Code plugins and marketplaces.

### Plugin Settings

| Key | Type | Scope | Description |
|-----|------|-------|-------------|
| `enabledPlugins` | object | Any | Enable/disable specific plugins |
| `extraKnownMarketplaces` | object | Project | Add custom plugin marketplaces (team sharing via `.claude/settings.json`) |
| `strictKnownMarketplaces` | array | Managed only | Allowlist of permitted marketplaces |
| `skippedMarketplaces` | array | Any | Marketplaces user declined to install |
| `skippedPlugins` | array | Any | Plugins user declined to install |
| `pluginConfigs` | object | Any | Per-plugin MCP server configs (keyed by `plugin@marketplace`) |
| `blockedMarketplaces` | array | Managed only | Block specific plugin marketplaces |
| `pluginTrustMessage` | string | Managed only | Custom message displayed when prompting users to trust plugins |

**Example:**
```json
{
  "enabledPlugins": {
    "formatter@acme-tools": true,
    "deployer@acme-tools": true,
    "experimental@acme-tools": false
  },
  "extraKnownMarketplaces": {
    "acme-tools": {
      "source": {
        "source": "github",
        "repo": "acme-corp/claude-plugins"
      }
    }
  }
}
```

---

## Model Configuration

### Model Aliases

| Alias | Description |
|-------|-------------|
| `"default"` | Recommended for your account type |
| `"sonnet"` | Latest Sonnet model (Claude Sonnet 4.6) |
| `"opus"` | Latest Opus model (Claude Opus 4.6) |
| `"haiku"` | Fast Haiku model |
| `"sonnet[1m]"` | Sonnet with 1M token context |
| `"opusplan"` | Opus for planning, Sonnet for execution |

**Example:**
```json
{
  "model": "opus"
}
```

### Model Overrides

Map Anthropic model IDs to provider-specific model IDs for Bedrock, Vertex, or Foundry deployments.

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `modelOverrides` | object | - | Map model picker entries to provider-specific IDs (e.g., Bedrock inference profile ARNs). Each key is a model picker entry name, each value is the provider model ID |

**Example:**
```json
{
  "modelOverrides": {
    "claude-opus-4-6": "arn:aws:bedrock:us-east-1:123456789:inference-profile/anthropic.claude-opus-4-6-v1:0",
    "claude-sonnet-4-6": "arn:aws:bedrock:us-east-1:123456789:inference-profile/anthropic.claude-sonnet-4-6-v1:0"
  }
}
```

### Effort Level

The `/model` command exposes an **effort level** control that adjusts how much reasoning the model applies per response. Use the ← → arrow keys in the `/model` UI to cycle through effort levels.

| Effort Level | Description |
|-------------|-------------|
| High | Full reasoning depth, best for complex tasks |
| Medium (default) | Balanced reasoning, good for everyday tasks |
| Low | Minimal reasoning, fastest responses |

**How to use:**
1. Run `/model` in Claude Code
2. Select **Default (recommended)** — Opus 4.6
3. Use **← →** arrow keys to adjust the effort level
4. The setting applies to the current session and future sessions

**Note:** Effort level is available for Opus 4.6 and Sonnet 4.6 on Max and Team plans. The default was changed from High to Medium in v2.1.68. As of v2.1.75, 1M context window for Opus 4.6 is available by default on Max, Team, and Enterprise plans.

### Model Environment Variables

Configure via `env` key:

```json
{
  "env": {
    "ANTHROPIC_MODEL": "sonnet",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "custom-haiku-model",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "custom-sonnet-model",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "custom-opus-model",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku",
    "MAX_THINKING_TOKENS": "10000"
  }
}
```

---

## Display & UX

### Display Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `statusLine` | object | - | Custom status line configuration |
| `outputStyle` | string | `"default"` | Output style (e.g., `"Explanatory"`) |
| `spinnerTipsEnabled` | boolean | `true` | Show tips while waiting |
| `spinnerVerbs` | object | - | Custom spinner verbs with `mode` ("append" or "replace") and `verbs` array |
| `spinnerTipsOverride` | object | - | Custom spinner tips with `tips` (string array) and optional `excludeDefault` (boolean) |
| `terminalProgressBarEnabled` | boolean | `true` | Show progress bar in terminal |
| `showTurnDuration` | boolean | `true` | Show turn duration messages |
| `respectGitignore` | boolean | `true` | Respect .gitignore in file picker |
| `prefersReducedMotion` | boolean | `false` | Reduce animations and motion effects in the UI |
| `fileSuggestion` | object | - | Custom file suggestion command (see File Suggestion Configuration below) |

### Status Line Configuration

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 0
  }
}
```

**Status Line Input Fields:**

The status line command receives a JSON object on stdin with these notable fields:

| Field | Description |
|-------|-------------|
| `workspace.added_dirs` | Directories added via `/add-dir` |
| `context_window.used_percentage` | Context window usage percentage |
| `context_window.remaining_percentage` | Context window remaining percentage |
| `current_usage` | Current context window token count |
| `exceeds_200k_tokens` | Whether context exceeds 200k tokens |

### File Suggestion Configuration

The file suggestion script receives a JSON object on stdin (e.g., `{"query": "src/comp"}`) and must output up to 15 file paths (one per line).

```json
{
  "fileSuggestion": {
    "type": "command",
    "command": "~/.claude/file-suggestion.sh"
  },
  "respectGitignore": true
}
```

**Example:**
```json
{
  "statusLine": {
    "type": "command",
    "command": "git branch --show-current 2>/dev/null || echo 'no-branch'"
  },
  "spinnerTipsEnabled": true,
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": ["Cooking", "Brewing", "Crafting", "Conjuring"]
  },
  "spinnerTipsOverride": {
    "tips": ["Use /compact at ~50% context", "Start with plan mode for complex tasks"],
    "excludeDefault": true
  },
  "terminalProgressBarEnabled": true,
  "showTurnDuration": false
}
```

---

## AWS & Cloud Credentials

### AWS Settings

| Key | Type | Description |
|-----|------|-------------|
| `awsAuthRefresh` | string | Script to refresh AWS auth (modifies `.aws` dir) |
| `awsCredentialExport` | string | Script outputting JSON with AWS credentials |

**Example:**
```json
{
  "awsAuthRefresh": "aws sso login --profile myprofile",
  "awsCredentialExport": "/bin/generate_aws_grant.sh"
}
```

### OpenTelemetry

| Key | Type | Description |
|-----|------|-------------|
| `otelHeadersHelper` | string | Script to generate dynamic OpenTelemetry headers |

**Example:**
```json
{
  "otelHeadersHelper": "/bin/generate_otel_headers.sh"
}
```

---

## Environment Variables (via `env`)

Set environment variables for all Claude Code sessions.

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "...",
    "NODE_ENV": "development",
    "DEBUG": "true"
  }
}
```

### Common Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | API key for authentication |
| `ANTHROPIC_AUTH_TOKEN` | OAuth token |
| `ANTHROPIC_BASE_URL` | Custom API endpoint |
| `CLAUDE_CODE_USE_BEDROCK` | Use AWS Bedrock (`1` to enable) |
| `CLAUDE_CODE_USE_VERTEX` | Use Google Vertex AI (`1` to enable) |
| `CLAUDE_CODE_USE_FOUNDRY` | Use Microsoft Foundry (`1` to enable) |
| `CLAUDE_CODE_ENABLE_TELEMETRY` | Enable/disable telemetry (`0` or `1`) |
| `DISABLE_ERROR_REPORTING` | Disable error reporting (`1` to disable) |
| `DISABLE_TELEMETRY` | Disable telemetry (`1` to disable) |
| `MCP_TIMEOUT` | MCP startup timeout in ms (default: 10000) |
| `MAX_MCP_OUTPUT_TOKENS` | Max MCP output tokens (default: 50000) |
| `BASH_MAX_TIMEOUT_MS` | Bash command timeout |
| `BASH_MAX_OUTPUT_LENGTH` | Max bash output length |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | Auto-compact threshold percentage (1-100). Default is ~95%. Set lower (e.g., `50`) to trigger compaction earlier. Values above 95% have no effect. Use `/context` to monitor current usage. Example: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50 claude` |
| `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` | Keep cwd between bash calls (`1` to enable) |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | Disable background tasks (`1` to disable) |
| `ENABLE_TOOL_SEARCH` | MCP tool search threshold (e.g., `auto:5`) |
| `DISABLE_PROMPT_CACHING` | Disable all prompt caching (`1` to disable) |
| `DISABLE_PROMPT_CACHING_HAIKU` | Disable Haiku prompt caching |
| `DISABLE_PROMPT_CACHING_SONNET` | Disable Sonnet prompt caching |
| `DISABLE_PROMPT_CACHING_OPUS` | Disable Opus prompt caching |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | Disable experimental beta features (`1` to disable) |
| `CLAUDE_CODE_SHELL` | Override automatic shell detection |
| `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` | Override default file read token limit |
| `CLAUDE_CODE_ENABLE_TASKS` | Set to `false` to disable new task system |
| `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY` | Auto-exit SDK mode after idle duration (ms) |
| `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` | Disable adaptive thinking (`1` to disable) |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | Disable 1M token context window (`1` to disable) |
| `CLAUDE_CODE_ACCOUNT_UUID` | Override account UUID for authentication |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | Disable git-related system prompt instructions |
| `ENABLE_CLAUDEAI_MCP_SERVERS` | Enable Claude.ai MCP servers |
| `CLAUDE_CODE_EFFORT_LEVEL` | Set effort level: `high`, `medium`, or `low` |
| `CLAUDE_CODE_MAX_TURNS` | Maximum agentic turns before stopping |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | Disable non-essential network traffic |
| `CLAUDE_CODE_SKIP_SETTINGS_SETUP` | Skip first-run settings setup flow |
| `CLAUDE_CODE_PROMPT_CACHING_ENABLED` | Override prompt caching behavior |
| `CLAUDE_CODE_DISABLE_TOOLS` | Comma-separated list of tools to disable |
| `CLAUDE_CODE_DISABLE_MCP` | Disable all MCP servers (`1` to disable) |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | Max output tokens per response (default: 32000, max: 64000) |
| `CLAUDE_CODE_DISABLE_FAST_MODE` | Disable fast mode entirely (`1` to disable) |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | Disable auto memory (`1` to disable) |
| `CLAUDE_CODE_USER_EMAIL` | Provide user email synchronously for authentication |
| `CLAUDE_CODE_ORGANIZATION_UUID` | Provide organization UUID synchronously for authentication |
| `CLAUDE_CONFIG_DIR` | Custom config directory (overrides default `~/.claude`) |
| `ANTHROPIC_CUSTOM_HEADERS` | Custom headers for API requests (`Name: Value` format, newline-separated for multiple headers) |
| `ANTHROPIC_FOUNDRY_API_KEY` | API key for Microsoft Foundry authentication |
| `ANTHROPIC_FOUNDRY_BASE_URL` | Base URL for Foundry resource |
| `ANTHROPIC_FOUNDRY_RESOURCE` | Foundry resource name |
| `AWS_BEARER_TOKEN_BEDROCK` | Bedrock API key for authentication |
| `ANTHROPIC_SMALL_FAST_MODEL` | **DEPRECATED** — Use `ANTHROPIC_DEFAULT_HAIKU_MODEL` instead |
| `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION` | AWS region for deprecated Haiku-class model override |
| `CLAUDE_CODE_SHELL_PREFIX` | Command prefix prepended to bash commands |
| `BASH_DEFAULT_TIMEOUT_MS` | Default bash command timeout in ms |
| `CLAUDE_CODE_SKIP_BEDROCK_AUTH` | Skip AWS auth for Bedrock (`1` to skip) |
| `CLAUDE_CODE_SKIP_FOUNDRY_AUTH` | Skip Azure auth for Foundry (`1` to skip) |
| `CLAUDE_CODE_SKIP_VERTEX_AUTH` | Skip Google auth for Vertex (`1` to skip) |
| `CLAUDE_CODE_PROXY_RESOLVES_HOSTS` | Allow proxy to perform DNS resolution |
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | Credential refresh interval in ms for `apiKeyHelper` |
| `CLAUDE_CODE_CLIENT_CERT` | Client certificate path for mTLS |
| `CLAUDE_CODE_CLIENT_KEY` | Client private key path for mTLS |
| `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` | Passphrase for encrypted mTLS key |
| `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS` | Plugin marketplace git clone timeout in ms (default: 120000) |
| `CLAUDE_CODE_HIDE_ACCOUNT_INFO` | Hide email/org info from UI |
| `CLAUDE_CODE_DISABLE_CRON` | Disable scheduled/cron tasks (`1` to disable) |
| `DISABLE_INSTALLATION_CHECKS` | Disable installation warnings |
| `DISABLE_BUG_COMMAND` | Disable the `/bug` command |
| `DISABLE_NON_ESSENTIAL_MODEL_CALLS` | Disable flavor text and non-essential model calls |
| `DISABLE_COST_WARNINGS` | Disable cost warning messages |
| `CLAUDE_CODE_SUBAGENT_MODEL` | Override model for subagents (e.g., `haiku`, `sonnet`) |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` | SessionEnd hook timeout in ms (replaces hard 1.5s limit) |
| `CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY` | Disable feedback survey prompts (`1` to disable) |
| `CLAUDE_CODE_DISABLE_TERMINAL_TITLE` | Disable terminal title updates (`1` to disable) |
| `CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL` | Skip automatic IDE extension installation (`1` to skip) |
| `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS` | Debounce interval in ms for OTel headers helper script |

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `/model` | Switch models and adjust Opus 4.6 effort level |
| `/config` | Interactive configuration UI |
| `/memory` | View/edit all memory files |
| `/agents` | Manage subagents |
| `/mcp` | Manage MCP servers |
| `/hooks` | View configured hooks |
| `/plugin` | Manage plugins |
| `/keybindings` | Configure custom keyboard shortcuts |
| `/skills` | View and manage skills |
| `/permissions` | View and manage permission rules |
| `--doctor` | Diagnose configuration issues |
| `--debug` | Debug mode with hook execution details |

---

## Quick Reference: Complete Example

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "model": "sonnet",
  "agent": "code-reviewer",
  "language": "english",
  "cleanupPeriodDays": 30,
  "autoUpdatesChannel": "stable",
  "alwaysThinkingEnabled": true,
  "includeGitInstructions": true,
  "plansDirectory": "./plans",

  "modelOverrides": {
    "claude-opus-4-6": "arn:aws:bedrock:us-east-1:123456789:inference-profile/anthropic.claude-opus-4-6-v1:0"
  },

  "permissions": {
    "allow": [
      "Edit(*)",
      "Write(*)",
      "Bash(npm run *)",
      "Bash(git *)",
      "WebFetch(domain:*)",
      "mcp__*",
      "Agent(*)"
    ],
    "deny": [
      "Read(.env)",
      "Read(./secrets/**)"
    ],
    "additionalDirectories": ["../shared/"],
    "defaultMode": "acceptEdits"
  },

  "enableAllProjectMcpServers": true,

  "sandbox": {
    "enabled": true,
    "excludedCommands": ["git", "docker"],
    "filesystem": {
      "denyRead": ["./secrets/"],
      "denyWrite": ["./.env"]
    }
  },

  "attribution": {
    "commit": "Generated with Claude Code",
    "pr": ""
  },

  "statusLine": {
    "type": "command",
    "command": "git branch --show-current"
  },

  "spinnerTipsEnabled": true,
  "spinnerTipsOverride": {
    "tips": ["Custom tip 1", "Custom tip 2"],
    "excludeDefault": false
  },
  "showTurnDuration": false,
  "prefersReducedMotion": false,

  "env": {
    "NODE_ENV": "development",
    "CLAUDE_CODE_EFFORT_LEVEL": "medium"
  }
}
```

---

## Sources

- [Claude Code Settings Documentation](https://code.claude.com/docs/en/settings)
- [Claude Code Settings JSON Schema](https://json.schemastore.org/claude-code-settings.json)
- [Claude Code Configuration Guide](https://claudelog.com/configuration/)
- [Claude Code GitHub Settings Examples](https://github.com/feiskyer/claude-code-settings)
- [Eesel AI - Developer's Guide to settings.json](https://www.eesel.ai/blog/settings-json-claude-code)
- [Shipyard - Claude Code CLI Cheatsheet](https://shipyard.build/blog/claude-code-cheat-sheet/)
