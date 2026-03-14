# Plugins Best Practice

![Last Updated](https://img.shields.io/badge/Last_Updated-Mar%2014%2C%202026-white?style=flat&labelColor=555)<br>

Distributable bundles of skills, subagents, hooks, MCP servers, and LSP servers that extend Claude Code with shareable, versioned functionality.

<table width="100%">
<tr>
<td><a href="../">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## What Are Plugins

A **plugin** is a self-contained directory that packages one or more Claude Code components — skills, subagents, hooks, MCP servers, and LSP servers — into a single distributable unit. Plugins are namespaced (e.g., `/my-plugin:deploy`) to prevent conflicts, versioned with semver, and distributed through marketplaces.

| Approach | Skill Names | Best For |
|----------|-------------|----------|
| **Standalone** (`.claude/` directory) | `/hello` | Personal workflows, single-project customizations, quick experiments |
| **Plugins** (`.claude-plugin/plugin.json`) | `/plugin-name:hello` | Team sharing, community distribution, versioned releases, cross-project reuse |

**Rule of thumb:** Start standalone in `.claude/` for rapid iteration, convert to a plugin when you are ready to share.

---

## Plugin Structure

### Directory Layout

```
my-plugin/
├── .claude-plugin/           # Metadata (only plugin.json goes here)
│   └── plugin.json
├── commands/                 # Slash commands (legacy; prefer skills/)
│   └── deploy.md
├── skills/                   # Agent Skills with SKILL.md
│   └── code-review/
│       └── SKILL.md
├── agents/                   # Subagent definitions
│   └── security-reviewer.md
├── hooks/                    # Event handlers
│   └── hooks.json
├── settings.json             # Default settings (currently only "agent" key)
├── .mcp.json                 # MCP server configurations
├── .lsp.json                 # LSP server configurations
├── scripts/                  # Hook and utility scripts
│   └── format-code.sh
├── LICENSE
└── CHANGELOG.md
```

> **Common mistake:** Do not put `commands/`, `agents/`, `skills/`, or `hooks/` inside `.claude-plugin/`. Only `plugin.json` belongs there.

### Manifest Format (`plugin.json`)

The manifest is optional. If omitted, Claude Code auto-discovers components in default locations and derives the name from the directory.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes (if manifest exists) | Unique identifier (kebab-case). Used as skill namespace prefix |
| `version` | string | No | Semantic version (`MAJOR.MINOR.PATCH`) |
| `description` | string | No | Brief explanation shown in plugin manager |
| `author` | object | No | `{ "name", "email", "url" }` |
| `homepage` | string | No | Documentation URL |
| `repository` | string | No | Source code URL |
| `license` | string | No | SPDX identifier (e.g., `MIT`) |
| `keywords` | array | No | Discovery tags |
| `commands` | string or array | No | Additional command files/directories |
| `agents` | string or array | No | Additional agent files |
| `skills` | string or array | No | Additional skill directories |
| `hooks` | string, array, or object | No | Hook config paths or inline config |
| `mcpServers` | string, array, or object | No | MCP config paths or inline config |
| `lspServers` | string, array, or object | No | LSP server configs |
| `outputStyles` | string or array | No | Output style files/directories |

**Example:**

```json
{
  "name": "deployment-tools",
  "version": "2.1.0",
  "description": "Deployment automation tools",
  "author": { "name": "DevOps Team" },
  "license": "MIT",
  "keywords": ["deployment", "ci-cd"]
}
```

### Environment Variable

Use `${CLAUDE_PLUGIN_ROOT}` in hooks, MCP servers, and scripts to reference files relative to the plugin installation directory. Plugins are cached at `~/.claude/plugins/cache`, so absolute paths and `../` traversals will not work.

---

## Installation

### `/plugin` Command

The interactive plugin manager has four tabs: **Discover**, **Installed**, **Marketplaces**, and **Errors**. Cycle tabs with **Tab** / **Shift+Tab**.

| Command | Description |
|---------|-------------|
| `/plugin` | Open interactive plugin manager |
| `/plugin install <name>@<marketplace>` | Install a plugin (default: user scope) |
| `/plugin uninstall <name>@<marketplace>` | Remove a plugin |
| `/plugin enable <name>@<marketplace>` | Re-enable a disabled plugin |
| `/plugin disable <name>@<marketplace>` | Disable without uninstalling |
| `/plugin update <name>@<marketplace>` | Update to latest version |
| `/plugin validate .` | Validate plugin/marketplace JSON |
| `/plugin marketplace add <source>` | Register a marketplace |
| `/plugin marketplace list` | List configured marketplaces |
| `/plugin marketplace update <name>` | Refresh marketplace listings |
| `/plugin marketplace remove <name>` | Remove a marketplace (uninstalls its plugins) |
| `/reload-plugins` | Apply pending plugin changes without restarting |

**Scope flag:** `--scope user|project|local` controls where the plugin is recorded.

| Scope | Settings File | Purpose |
|-------|--------------|---------|
| `user` (default) | `~/.claude/settings.json` | Personal, all projects |
| `project` | `.claude/settings.json` | Team-shared via version control |
| `local` | `.claude/settings.local.json` | Personal, this project only (git-ignored) |
| `managed` | Managed settings | Admin-enforced (read-only) |

### Marketplace Installation

```shell
# Add a marketplace
/plugin marketplace add anthropics/claude-code

# Install from it
/plugin install commit-commands@anthropics-claude-code
```

### Local Development / Manual Installation

Use `--plugin-dir` to load a plugin from a local directory without installing it:

```bash
claude --plugin-dir ./my-plugin
```

Multiple plugins can be loaded simultaneously:

```bash
claude --plugin-dir ./plugin-one --plugin-dir ./plugin-two
```

A local `--plugin-dir` plugin with the same name as an installed marketplace plugin takes precedence for that session (except managed plugins).

---

## Marketplaces

A marketplace is a catalog defined by `.claude-plugin/marketplace.json` that lists plugins and their sources. Users add the catalog, then install individual plugins from it.

### Official Anthropic Marketplace

The official marketplace (`claude-plugins-official`) is automatically available. Browse it from `/plugin` > **Discover** tab.

### Adding Marketplaces

| Source Type | Command |
|-------------|---------|
| GitHub | `/plugin marketplace add owner/repo` |
| GitLab / other Git | `/plugin marketplace add https://gitlab.com/company/plugins.git` |
| Git with branch/tag | `/plugin marketplace add https://gitlab.com/company/plugins.git#v1.0.0` |
| Local directory | `/plugin marketplace add ./my-marketplace` |
| Remote URL | `/plugin marketplace add https://example.com/marketplace.json` |

### Team Marketplaces (`extraKnownMarketplaces`)

Add to `.claude/settings.json` so team members are prompted to install when they trust the project:

```json
{
  "extraKnownMarketplaces": {
    "company-tools": {
      "source": {
        "source": "github",
        "repo": "your-org/claude-plugins"
      }
    }
  }
}
```

### Managed Marketplace Restrictions

| Setting | Scope | Purpose |
|---------|-------|---------|
| `strictKnownMarketplaces` | Managed only | Allowlist of permitted marketplaces. Empty array `[]` = complete lockdown. Undefined = no restrictions |
| `blockedMarketplaces` | Managed only | Block specific marketplaces |

**Example — allow only approved sources:**

```json
{
  "strictKnownMarketplaces": [
    { "source": "github", "repo": "acme-corp/approved-plugins" },
    { "source": "hostPattern", "hostPattern": "^github\\.internal\\.com$" }
  ]
}
```

### Auto-Updates

Official marketplaces have auto-update enabled by default. Toggle per marketplace via `/plugin` > **Marketplaces** tab. Set `DISABLE_AUTOUPDATER=true` to disable all auto-updates, or pair with `FORCE_AUTOUPDATE_PLUGINS=true` to keep plugin updates while disabling Claude Code updates.

---

## Configuration

### Plugin Settings in `settings.json`

| Key | Type | Scope | Description |
|-----|------|-------|-------------|
| `enabledPlugins` | object | Any | Enable/disable plugins. Keys: `plugin@marketplace`, values: `true`/`false` |
| `pluginConfigs` | object | Any | Per-plugin MCP server configs (keyed by `plugin@marketplace`) |
| `extraKnownMarketplaces` | object | Project | Register custom marketplaces for team sharing |
| `strictKnownMarketplaces` | array | Managed only | Allowlist of permitted marketplaces |
| `blockedMarketplaces` | array | Managed only | Block specific marketplaces |
| `skippedMarketplaces` | array | Any | Marketplaces user declined to install |
| `skippedPlugins` | array | Any | Plugins user declined to install |
| `pluginTrustMessage` | string | Managed only | Custom trust prompt message |

**Example:**

```json
{
  "enabledPlugins": {
    "formatter@acme-tools": true,
    "deployer@acme-tools": true,
    "experimental@acme-tools": false
  },
  "pluginConfigs": {
    "github@claude-plugins-official": {
      "mcpServers": {
        "github": {
          "env": { "GITHUB_TOKEN": "${GITHUB_TOKEN}" }
        }
      }
    }
  }
}
```

---

## Official Marketplace Plugins

### Code Intelligence (LSP)

LSP plugins give Claude real-time diagnostics after every edit and code navigation (go-to-definition, find references, hover info). Each requires the language server binary installed on your system.

| Language | Plugin | Binary Required |
|----------|--------|-----------------|
| C/C++ | `clangd-lsp` | `clangd` |
| C# | `csharp-lsp` | `csharp-ls` |
| Go | `gopls-lsp` | `gopls` |
| Java | `jdtls-lsp` | `jdtls` |
| Kotlin | `kotlin-lsp` | `kotlin-language-server` |
| Lua | `lua-lsp` | `lua-language-server` |
| PHP | `php-lsp` | `intelephense` |
| Python | `pyright-lsp` | `pyright-langserver` |
| Rust | `rust-analyzer-lsp` | `rust-analyzer` |
| Swift | `swift-lsp` | `sourcekit-lsp` |
| TypeScript | `typescript-lsp` | `typescript-language-server` |

### External Integrations

Pre-configured MCP server plugins for connecting Claude to external services:

| Category | Plugins |
|----------|---------|
| Source control | `github`, `gitlab` |
| Project management | `atlassian` (Jira/Confluence), `asana`, `linear`, `notion` |
| Design | `figma` |
| Infrastructure | `vercel`, `firebase`, `supabase` |
| Communication | `slack` |
| Monitoring | `sentry` |

### Development Workflows

| Plugin | Description |
|--------|-------------|
| `commit-commands` | Git commit workflows — commit, push, PR creation |
| `pr-review-toolkit` | Specialized agents for reviewing pull requests |
| `agent-sdk-dev` | Tools for building with the Claude Agent SDK |
| `plugin-dev` | Toolkit for creating your own plugins |

### Output Styles

| Plugin | Description |
|--------|-------------|
| `explanatory-output-style` | Educational insights about implementation choices |
| `learning-output-style` | Interactive learning mode for skill building |

---

## Creating Your Own Plugin

### Step-by-Step

1. **Create the directory:**
   ```bash
   mkdir -p my-plugin/.claude-plugin
   ```

2. **Create the manifest** at `my-plugin/.claude-plugin/plugin.json`:
   ```json
   {
     "name": "my-plugin",
     "description": "What this plugin does",
     "version": "1.0.0",
     "author": { "name": "Your Name" }
   }
   ```

3. **Add components** — any combination of:
   - `skills/<name>/SKILL.md` — agent skills
   - `commands/<name>.md` — slash commands
   - `agents/<name>.md` — subagent definitions
   - `hooks/hooks.json` — event handlers
   - `.mcp.json` — MCP server configs
   - `.lsp.json` — LSP server configs

4. **Test locally:**
   ```bash
   claude --plugin-dir ./my-plugin
   ```
   Use `/reload-plugins` to pick up changes without restarting.

5. **Distribute** — create a `marketplace.json` or submit to the official marketplace:
   - **Claude.ai**: [claude.ai/settings/plugins/submit](https://claude.ai/settings/plugins/submit)
   - **Console**: [platform.claude.com/plugins/submit](https://platform.claude.com/plugins/submit)

### Converting Standalone to Plugin

| Standalone (`.claude/`) | Plugin |
|-------------------------|--------|
| `.claude/commands/` | `plugin-name/commands/` |
| `.claude/skills/` | `plugin-name/skills/` |
| `.claude/agents/` | `plugin-name/agents/` |
| Hooks in `settings.json` | `plugin-name/hooks/hooks.json` |

### Debugging

| Issue | Solution |
|-------|----------|
| Plugin not loading | Validate JSON: `/plugin validate .` |
| Commands not appearing | Ensure `commands/` is at root, not inside `.claude-plugin/` |
| Hooks not firing | `chmod +x` on scripts, verify `${CLAUDE_PLUGIN_ROOT}` paths |
| MCP server fails | Use `${CLAUDE_PLUGIN_ROOT}` for all paths |
| Path errors after install | Paths cannot traverse outside plugin root (`../` fails in cache) — use symlinks instead |

Run `claude --debug` to see plugin loading details, manifest errors, and component registration.

---

## Best Practices

| Do | Avoid |
|----|-------|
| Start standalone, convert to plugin when sharing | Packaging single-use personal workflows as plugins |
| Use `${CLAUDE_PLUGIN_ROOT}` for all internal paths | Absolute paths or `../` traversals |
| Follow semver — bump version on every change | Changing code without bumping version (cache ignores unchanged versions) |
| Keep `plugin.json` in `.claude-plugin/` only | Putting skills, hooks, or commands inside `.claude-plugin/` |
| Pin plugin sources with `ref` or `sha` for stability | Floating references in production marketplaces |
| Test with `--plugin-dir` before publishing | Publishing untested plugins to shared marketplaces |
| Use `strict: true` (default) for self-contained plugins | `strict: false` unless the marketplace needs full control |
| Scope project plugins via `enabledPlugins` in `.claude/settings.json` | Asking teammates to manually install plugins |

---

## Sources

- [Create Plugins — Claude Code Docs](https://code.claude.com/docs/en/plugins)
- [Discover and Install Plugins — Claude Code Docs](https://code.claude.com/docs/en/discover-plugins)
- [Plugins Reference — Claude Code Docs](https://code.claude.com/docs/en/plugins-reference)
- [Plugin Marketplaces — Claude Code Docs](https://code.claude.com/docs/en/plugin-marketplaces)
- [Plugin Settings — Claude Code Docs](https://code.claude.com/docs/en/settings)
