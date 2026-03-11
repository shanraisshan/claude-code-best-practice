# Claude Code 设置参考

![最后更新](https://img.shields.io/badge/Last_Updated-Mar%2007%2C%202026%202%3A31%20PM%20PKT-white?style=flat&labelColor=555) ![版本](https://img.shields.io/badge/Claude_Code-v2.1.71-blue?style=flat&labelColor=555)

Claude Code `settings.json` 文件中所有可用配置选项的完整指南。截至 v2.1.71，Claude Code 暴露了 **55+ 设置项** 和 **140+ 环境变量**（使用 `settings.json` 中的 `"env"` 字段可避免使用包装脚本）。

<table width="100%">
<tr>
<td><a href="../">← 返回 Claude Code 最佳实践</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

## 目录

1. [设置层级](#设置层级)
2. [核心配置](#核心配置)
3. [权限](#权限)
4. [钩子](#钩子)
5. [MCP 服务器](#mcp-服务器)
6. [沙箱](#沙箱)
7. [插件](#插件)
8. [模型配置](#模型配置)
9. [显示与用户体验](#显示与用户体验)
10. [AWS 与云凭证](#aws-与云凭证)
11. [环境变量](#环境变量via-env)
12. [实用命令](#实用命令)

---

## 设置层级

Claude Code 设置使用 5 级用户可写覆盖链，外加一个强制策略层：

| 优先级 | 位置 | 作用域 | 版本控制 | 用途 |
|----------|----------|-------|-----------------|---------|
| 1 | 命令行参数 | 会话 | N/A | 单次会话覆盖 |
| 2 | `.claude/settings.local.json` | 项目 | 否（git 忽略） | 个人项目特定设置 |
| 3 | `.claude/settings.json` | 项目 | 是（已提交） | 团队共享设置 |
| 4 | `~/.claude/settings.local.json` | 用户 | N/A | 个人全局覆盖 |
| 5 | `~/.claude/settings.json` | 用户 | N/A | 全局个人默认值 |

**策略层**：`managed-settings.json` 是组织强制的设置，无法被本地设置覆盖。在 macOS 上，托管设置也可以通过 MDM 配置文件提供（位于 `com.anthropic.claudecode` 的 plist）。在 Windows 上，托管设置使用 Windows 注册表。

**重要说明**：
- `deny` 规则具有最高的安全优先级，无法被低优先级的 allow/ask 规则覆盖。
- 托管设置可能会锁定或覆盖本地行为，即使本地文件指定了不同的值。
- 数组设置（如 `permissions.allow`）在作用域间是**合并**的 — 来自所有层级的条目会被组合，而非替换。

---

## 核心配置

### 通用设置

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| `$schema` | string | - | 用于 IDE 验证和自动补全的 JSON Schema URL（例如 `"https://www.schemastore.org/claude-code-settings.json"`） |
| `model` | string | `"default"` | 覆盖默认模型。接受别名（`sonnet`、`opus`、`haiku`）或完整模型 ID |
| `agent` | string | - | 设置主对话的默认代理。值为 `.claude/agents/` 中的代理名称。也可通过 `--agent` CLI 标志使用 |
| `language` | string | `"english"` | Claude 的首选响应语言 |
| `cleanupPeriodDays` | number | `30` | 超过此时间未活动的会话将在启动时被删除 |
| `autoUpdatesChannel` | string | `"latest"` | 发布通道：`"stable"` 或 `"latest"` |
| `alwaysThinkingEnabled` | boolean | `false` | 默认为所有会话启用扩展思考 |
| `skipWebFetchPreflight` | boolean | `false` | 跳过获取 URL 前的 WebFetch 黑名单检查 |
| `availableModels` | array | - | 限制用户可用的模型（托管设置）。每个条目包含 `title`、`modelId` 和可选的 `effortOptions` |
| `fastModePerSessionOptIn` | boolean | `false` | 要求用户每次会话都选择启用快速模式 |
| `teammateMode` | string | `"auto"` | 代理团队显示模式：`"auto"`（在 tmux/iTerm2 中分屏，否则在进程内）、`"in-process"` 或 `"tmux"` |
| `includeGitInstructions` | boolean | `true` | 在系统提示词中包含 git 相关指令 |

**示例：**
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

### 计划目录

将计划文件存储在相对于项目根目录的自定义位置。

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| `plansDirectory` | string | `~/.claude/plans` | 存储 `/plan` 输出的目录 |

**示例：**
```json
{
  "plansDirectory": "./my-plans"
}
```

**使用场景：** 适用于将计划工件与 Claude 内部文件分开组织，或将计划保存在团队共享位置。

### 归属设置

自定义 git 提交和拉取请求的归属消息。

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| `attribution.commit` | string | Co-authored-by | Git 提交归属（支持 trailers） |
| `attribution.pr` | string | Generated message | 拉取请求描述归属 |
| `includeCoAuthoredBy` | boolean | `true` | **已弃用** - 请改用 `attribution` |

**示例：**
```json
{
  "attribution": {
    "commit": "Generated with AI\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
    "pr": "Generated with Claude Code"
  }
}
```

**注意：** 设置为空字符串（`""`）可完全隐藏归属信息。

### 认证助手

用于动态生成认证令牌的脚本。

| 键 | 类型 | 描述 |
|-----|------|-------------|
| `apiKeyHelper` | string | 输出认证令牌的 Shell 脚本路径（作为 `X-Api-Key` 标头发送） |
| `forceLoginMethod` | string | 限制登录方式为 `"claudeai"` 或 `"console"` 账户 |
| `forceLoginOrgUUID` | string | 登录时自动选择组织的 UUID |

**示例：**
```json
{
  "apiKeyHelper": "/bin/generate_temp_api_key.sh",
  "forceLoginMethod": "console",
  "forceLoginOrgUUID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### 公司公告

在启动时向用户显示自定义公告（随机轮换）。

| 键 | 类型 | 描述 |
|-----|------|-------------|
| `companyAnnouncements` | array | 启动时显示的字符串数组 |

**示例：**
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

## 权限

控制 Claude 可以执行的工具和操作。

### 权限结构

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

### 权限键

| 键 | 类型 | 描述 |
|-----|------|-------------|
| `permissions.allow` | array | 允许工具使用而无需提示的规则 |
| `permissions.ask` | array | 需要用户确认的规则 |
| `permissions.deny` | array | 阻止工具使用的规则（最高优先级） |
| `permissions.additionalDirectories` | array | Claude 可以访问的额外目录 |
| `permissions.defaultMode` | string | 默认权限模式 |
| `permissions.disableBypassPermissionsMode` | string | 防止绕过模式激活 |
| `allowManagedPermissionRulesOnly` | boolean | **（仅托管）** 仅应用托管权限规则；用户/项目的 `allow`、`ask`、`deny` 规则被忽略 |

### 权限模式

| 模式 | 行为 |
|------|----------|
| `"default"` | 标准权限检查并提示 |
| `"acceptEdits"` | 自动接受文件编辑，无需询问 |
| `"askEdits"` | 每次操作前都询问 |
| `"dontAsk"` | 自动接受所有工具，无需提示（相当于 `bypassPermissions`，但通过设置实现） |
| `"viewOnly"` | 只读模式，不允许修改 |
| `"bypassPermissions"` | 跳过所有权限检查（危险） |
| `"plan"` | 只读探索模式 |

### 工具权限语法

| 工具 | 语法 | 示例 |
|------|--------|----------|
| `Bash` | `Bash(command pattern)` | `Bash(npm run *)`, `Bash(* install)`, `Bash(git * main)` |
| `Read` | `Read(path pattern)` | `Read(.env)`, `Read(./secrets/**)` |
| `Edit` | `Edit(path pattern)` | `Edit(src/**)`, `Edit(*.ts)` |
| `Write` | `Write(path pattern)` | `Write(*.md)`, `Write(./docs/**)` |
| `NotebookEdit` | `NotebookEdit(pattern)` | `NotebookEdit(*)` |
| `WebFetch` | `WebFetch(domain:pattern)` | `WebFetch(domain:example.com)` |
| `WebSearch` | `WebSearch` | 全局网页搜索 |
| `Task` | `Task(agent-name)` | `Task(Explore)`, `Task(my-agent)` |
| `Agent` | `Agent(name)` | `Agent(researcher)`, `Agent(*)` — 权限范围限于子代理生成 |
| `Skill` | `Skill(skill-name)` | `Skill(weather-fetcher)` |
| `MCP` | `mcp__server__tool` 或 `MCP(server:tool)` | `mcp__memory__*`, `MCP(github:*)` |

**Bash 通配符说明：**
- `*` 可以出现在**任意位置**：前缀（`Bash(* install)`）、后缀（`Bash(npm *)`）或中间（`Bash(git * main)`）
- `Bash(*)` 被视为等同于 `Bash`（匹配所有 bash 命令）
- 权限规则支持输出重定向：`Bash(python:*)` 匹配 `python script.py > output.txt`

**示例：**
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

## 钩子

钩子配置（事件、属性、匹配器、退出码、环境变量和 HTTP 钩子）在专门的仓库中维护：

> **[claude-code-voice-hooks](https://github.com/shanraisshan/claude-code-voice-hooks)** — 完整的钩子参考，包含声音通知系统、全部 19 个钩子事件、HTTP 钩子、匹配器模式、退出码和环境变量。

钩子相关的设置键（`hooks`、`disableAllHooks`、`allowManagedHooksOnly`、`allowedHttpHookUrls`、`httpHookAllowedEnvVars`）在那里有详细文档。

如需官方钩子参考，请参阅 [Claude Code Hooks 文档](https://code.claude.com/docs/en/hooks)。

---

## MCP 服务器

配置 Model Context Protocol 服务器以扩展功能。

### MCP 设置

| 键 | 类型 | 作用域 | 描述 |
|-----|------|-------|-------------|
| `enableAllProjectMcpServers` | boolean | 任意 | 自动批准所有 `.mcp.json` 服务器 |
| `enabledMcpjsonServers` | array | 任意 | 允许列表中的特定服务器名称 |
| `disabledMcpjsonServers` | array | 任意 | 阻止列表中的特定服务器名称 |
| `allowedMcpServers` | array | 仅托管 | 按名称/命令/URL 匹配的允许列表 |
| `deniedMcpServers` | array | 仅托管 | 按匹配规则的阻止列表 |
| `allowManagedMcpServersOnly` | boolean | 仅托管 | 仅允许托管允许列表中明确列出的 MCP 服务器 |

### MCP 服务器匹配（托管设置）

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

**示例：**
```json
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["memory", "github", "filesystem"],
  "disabledMcpjsonServers": ["experimental-server"]
}
```

---

## 沙箱

配置 bash 命令沙箱以提高安全性。

### 沙箱设置

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| `sandbox.enabled` | boolean | `false` | 启用 bash 沙箱 |
| `sandbox.autoAllowBashIfSandboxed` | boolean | `true` | 沙箱启用时自动批准 bash |
| `sandbox.excludedCommands` | array | `[]` | 在沙箱外运行的命令 |
| `sandbox.allowUnsandboxedCommands` | boolean | `true` | 允许 `dangerouslyDisableSandbox` |
| `sandbox.ignoreViolations` | object | `{}` | 命令模式到路径数组的映射 — 抑制违规警告 |
| `sandbox.enableWeakerNestedSandbox` | boolean | `false` | 为 Docker 使用较弱沙箱（降低安全性） |
| `sandbox.network.allowUnixSockets` | array | `[]` | 沙箱中可访问的特定 Unix socket 路径 |
| `sandbox.network.allowAllUnixSockets` | boolean | `false` | 允许所有 Unix sockets（覆盖 allowUnixSockets） |
| `sandbox.network.allowLocalBinding` | boolean | `false` | 允许绑定到 localhost 端口 |
| `sandbox.network.allowedDomains` | array | `[]` | 沙箱的网络域名允许列表 |
| `sandbox.network.deniedDomains` | array | `[]` | 沙箱的网络域名阻止列表 |
| `sandbox.network.httpProxyPort` | number | - | HTTP 代理端口 1-65535（自定义代理） |
| `sandbox.network.socksProxyPort` | number | - | SOCKS5 代理端口 1-65535（自定义代理） |
| `sandbox.network.allowManagedDomainsOnly` | boolean | `false` | 仅允许托管允许列表中的域名（托管设置） |
| `sandbox.filesystem.allowWrite` | array | `[]` | 允许写入的路径前缀。前缀：`//`（绝对路径）、`~/`（主目录）、`/`（项目根目录）、`./`（当前工作目录） |
| `sandbox.filesystem.denyWrite` | array | `[]` | 拒绝写入的路径前缀 |
| `sandbox.filesystem.denyRead` | array | `[]` | 拒绝读取的路径前缀 |
| `sandbox.enableWeakerNetworkIsolation` | boolean | `false` | （仅 macOS）允许访问系统 TLS 信任（`com.apple.trustd.agent`）；降低安全性 |

**示例：**
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

## 插件

配置 Claude Code 插件和市场。

### 插件设置

| 键 | 类型 | 作用域 | 描述 |
|-----|------|-------|-------------|
| `enabledPlugins` | object | 任意 | 启用/禁用特定插件 |
| `extraKnownMarketplaces` | object | 项目 | 添加自定义插件市场（通过 `.claude/settings.json` 团队共享） |
| `strictKnownMarketplaces` | array | 仅托管 | 允许的市场列表 |
| `skippedMarketplaces` | array | 任意 | 用户拒绝安装的市场 |
| `skippedPlugins` | array | 任意 | 用户拒绝安装的插件 |
| `pluginConfigs` | object | 任意 | 每插件的 MCP 服务器配置（以 `plugin@marketplace` 为键） |
| `blockedMarketplaces` | array | 仅托管 | 阻止特定插件市场 |
| `pluginTrustMessage` | string | 仅托管 | 提示用户信任插件时显示的自定义消息 |

**示例：**
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

## 模型配置

### 模型别名

| 别名 | 描述 |
|-------|-------------|
| `"default"` | 根据您的账户类型推荐 |
| `"sonnet"` | 最新 Sonnet 模型（Claude Sonnet 4.6） |
| `"opus"` | 最新 Opus 模型（Claude Opus 4.6） |
| `"haiku"` | 快速的 Haiku 模型 |
| `"sonnet[1m]"` | 具有 1M token 上下文的 Sonnet |
| `"opusplan"` | Opus 用于规划，Sonnet 用于执行 |

**示例：**
```json
{
  "model": "opus"
}
```

### 努力级别

`/model` 命令提供了一个**努力级别**控制，用于调整模型每次响应投入的推理量。在 `/model` UI 中使用 ← → 箭头键循环切换努力级别。

| 努力级别 | 描述 |
|-------------|-------------|
| High | 完整推理深度，最适合复杂任务 |
| Medium（默认） | 平衡推理，适合日常任务 |
| Low | 最少推理，响应最快 |

**使用方法：**
1. 在 Claude Code 中运行 `/model`
2. 选择 **Default (recommended)** — Opus 4.6
3. 使用 **← →** 箭头键调整努力级别
4. 该设置将应用于当前会话和未来会话

**注意：** 努力级别适用于 Max 和 Team 计划上的 Opus 4.6 和 Sonnet 4.6。默认值在 v2.1.68 中从 High 改为 Medium。

### 模型环境变量

通过 `env` 键配置：

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

## 显示与用户体验

### 显示设置

| 键 | 类型 | 默认值 | 描述 |
|-----|------|---------|-------------|
| `statusLine` | object | - | 自定义状态栏配置 |
| `outputStyle` | string | `"default"` | 输出样式（例如 `"Explanatory"`） |
| `spinnerTipsEnabled` | boolean | `true` | 等待时显示提示 |
| `spinnerVerbs` | object | - | 自定义加载动画动词，包含 `mode`（"append" 或 "replace"）和 `verbs` 数组 |
| `spinnerTipsOverride` | object | - | 自定义加载动画提示，包含 `tips`（字符串数组）和可选的 `excludeDefault`（布尔值） |
| `terminalProgressBarEnabled` | boolean | `true` | 在终端显示进度条 |
| `showTurnDuration` | boolean | `true` | 显示轮次耗时消息 |
| `respectGitignore` | boolean | `true` | 在文件选择器中遵循 .gitignore |
| `prefersReducedMotion` | boolean | `false` | 减少界面中的动画和动态效果 |
| `fileSuggestion` | object | - | 自定义文件建议命令（见下方文件建议配置） |

### 状态栏配置

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 0
  }
}
```

**状态栏输入字段：**

状态栏命令在 stdin 上接收一个 JSON 对象，包含以下值得注意的字段：

| 字段 | 描述 |
|-------|-------------|
| `workspace.added_dirs` | 通过 `/add-dir` 添加的目录 |
| `context_window.used_percentage` | 上下文窗口使用百分比 |
| `context_window.remaining_percentage` | 上下文窗口剩余百分比 |
| `current_usage` | 当前上下文窗口 token 数 |
| `exceeds_200k_tokens` | 上下文是否超过 200k tokens |

### 文件建议配置

```json
{
  "fileSuggestion": {
    "type": "command",
    "command": "~/.claude/file-suggestion.sh"
  },
  "respectGitignore": true
}
```

**示例：**
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

## AWS 与云凭证

### AWS 设置

| 键 | 类型 | 描述 |
|-----|------|-------------|
| `awsAuthRefresh` | string | 刷新 AWS 认证的脚本（修改 `.aws` 目录） |
| `awsCredentialExport` | string | 输出包含 AWS 凭证的 JSON 的脚本 |

**示例：**
```json
{
  "awsAuthRefresh": "aws sso login --profile myprofile",
  "awsCredentialExport": "/bin/generate_aws_grant.sh"
}
```

### OpenTelemetry

| 键 | 类型 | 描述 |
|-----|------|-------------|
| `otelHeadersHelper` | string | 生成动态 OpenTelemetry 标头的脚本 |

**示例：**
```json
{
  "otelHeadersHelper": "/bin/generate_otel_headers.sh"
}
```

---

## 环境变量（通过 `env`）

为所有 Claude Code 会话设置环境变量。

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "...",
    "NODE_ENV": "development",
    "DEBUG": "true"
  }
}
```

### 常用环境变量

| 变量 | 描述 |
|----------|-------------|
| `ANTHROPIC_API_KEY` | 用于认证的 API 密钥 |
| `ANTHROPIC_AUTH_TOKEN` | OAuth 令牌 |
| `ANTHROPIC_BASE_URL` | 自定义 API 端点 |
| `CLAUDE_CODE_USE_BEDROCK` | 使用 AWS Bedrock（`1` 启用） |
| `CLAUDE_CODE_USE_VERTEX` | 使用 Google Vertex AI（`1` 启用） |
| `CLAUDE_CODE_USE_FOUNDRY` | 使用 Microsoft Foundry（`1` 启用） |
| `CLAUDE_CODE_ENABLE_TELEMETRY` | 启用/禁用遥测（`0` 或 `1`） |
| `DISABLE_ERROR_REPORTING` | 禁用错误报告（`1` 禁用） |
| `DISABLE_TELEMETRY` | 禁用遥测（`1` 禁用） |
| `MCP_TIMEOUT` | MCP 启动超时时间（毫秒，默认：10000） |
| `MAX_MCP_OUTPUT_TOKENS` | 最大 MCP 输出 tokens（默认：50000） |
| `BASH_MAX_TIMEOUT_MS` | Bash 命令超时时间 |
| `BASH_MAX_OUTPUT_LENGTH` | 最大 bash 输出长度 |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | 自动压缩阈值百分比（1-100）。默认约 95%。设置较低的值（如 `50`）可更早触发压缩。高于 95% 的值无效。使用 `/context` 监控当前使用情况。示例：`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50 claude` |
| `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` | 在 bash 调用之间保持 cwd（`1` 启用） |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | 禁用后台任务（`1` 禁用） |
| `ENABLE_TOOL_SEARCH` | MCP 工具搜索阈值（例如 `auto:5`） |
| `DISABLE_PROMPT_CACHING` | 禁用所有提示缓存（`1` 禁用） |
| `DISABLE_PROMPT_CACHING_HAIKU` | 禁用 Haiku 提示缓存 |
| `DISABLE_PROMPT_CACHING_SONNET` | 禁用 Sonnet 提示缓存 |
| `DISABLE_PROMPT_CACHING_OPUS` | 禁用 Opus 提示缓存 |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | 禁用实验性 beta 功能（`1` 禁用） |
| `CLAUDE_CODE_SHELL` | 覆盖自动 shell 检测 |
| `CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS` | 覆盖默认文件读取 token 限制 |
| `CLAUDE_CODE_ENABLE_TASKS` | 设置为 `false` 以禁用新任务系统 |
| `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY` | 空闲后自动退出 SDK 模式的延迟时间（毫秒） |
| `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING` | 禁用自适应思考（`1` 禁用） |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | 禁用 1M token 上下文窗口（`1` 禁用） |
| `CLAUDE_CODE_ACCOUNT_UUID` | 覆盖用于认证的账户 UUID |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | 禁用 git 相关的系统提示指令 |
| `ENABLE_CLAUDEAI_MCP_SERVERS` | 启用 Claude.ai MCP 服务器 |
| `CLAUDE_CODE_EFFORT_LEVEL` | 设置努力级别：`high`、`medium` 或 `low` |
| `CLAUDE_CODE_MAX_TURNS` | 停止前的最大代理轮次数 |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | 禁用非必要的网络流量 |
| `CLAUDE_CODE_SKIP_SETTINGS_SETUP` | 跳过首次运行设置向导 |
| `CLAUDE_CODE_PROMPT_CACHING_ENABLED` | 覆盖提示缓存行为 |
| `CLAUDE_CODE_DISABLE_TOOLS` | 以逗号分隔的要禁用的工具列表 |
| `CLAUDE_CODE_DISABLE_MCP` | 禁用所有 MCP 服务器（`1` 禁用） |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | 每次响应的最大输出 tokens（默认：32000，最大：64000） |
| `CLAUDE_CODE_DISABLE_FAST_MODE` | 完全禁用快速模式（`1` 禁用） |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | 禁用自动记忆（`1` 禁用） |
| `CLAUDE_CODE_USER_EMAIL` | 同步提供用户邮箱用于认证 |
| `CLAUDE_CODE_ORGANIZATION_UUID` | 同步提供组织 UUID 用于认证 |
| `CLAUDE_CONFIG_DIR` | 自定义配置目录（覆盖默认的 `~/.claude`） |
| `ANTHROPIC_CUSTOM_HEADERS` | API 请求的自定义标头（JSON 字符串） |
| `ANTHROPIC_FOUNDRY_API_KEY` | Microsoft Foundry 认证的 API 密钥 |
| `ANTHROPIC_FOUNDRY_BASE_URL` | Foundry 资源的基础 URL |
| `ANTHROPIC_FOUNDRY_RESOURCE` | Foundry 资源名称 |
| `AWS_BEARER_TOKEN_BEDROCK` | Bedrock 认证的 API 密钥 |
| `ANTHROPIC_SMALL_FAST_MODEL` | **已弃用** — 请改用 `ANTHROPIC_DEFAULT_HAIKU_MODEL` |
| `ANTHROPIC_SMALL_FAST_MODEL_AWS_REGION` | 已弃用的 Haiku 类模型覆盖的 AWS 区域 |
| `CLAUDE_CODE_SHELL_PREFIX` | 附加到 bash 命令前的命令前缀 |
| `BASH_DEFAULT_TIMEOUT_MS` | 默认 bash 命令超时时间（毫秒） |
| `CLAUDE_CODE_SKIP_BEDROCK_AUTH` | 跳过 Bedrock 的 AWS 认证（`1` 跳过） |
| `CLAUDE_CODE_SKIP_FOUNDRY_AUTH` | 跳过 Foundry 的 Azure 认证（`1` 跳过） |
| `CLAUDE_CODE_SKIP_VERTEX_AUTH` | 跳过 Vertex 的 Google 认证（`1` 跳过） |
| `CLAUDE_CODE_PROXY_RESOLVES_HOSTS` | 允许代理执行 DNS 解析 |
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | `apiKeyHelper` 的凭证刷新间隔（毫秒） |
| `CLAUDE_CODE_CLIENT_CERT` | mTLS 客户端证书路径 |
| `CLAUDE_CODE_CLIENT_KEY` | mTLS 客户端私钥路径 |
| `CLAUDE_CODE_CLIENT_KEY_PASSPHRASE` | 加密的 mTLS 密钥密码 |
| `CLAUDE_CODE_PLUGIN_GIT_TIMEOUT_MS` | 插件市场 git clone 超时时间（毫秒，默认：120000） |
| `CLAUDE_CODE_HIDE_ACCOUNT_INFO` | 在界面中隐藏邮箱/组织信息 |
| `CLAUDE_CODE_DISABLE_CRON` | 禁用计划/cron 任务（`1` 禁用） |
| `DISABLE_INSTALLATION_CHECKS` | 禁用安装警告 |
| `DISABLE_BUG_COMMAND` | 禁用 `/bug` 命令 |
| `DISABLE_NON_ESSENTIAL_MODEL_CALLS` | 禁用趣味文本和非必要的模型调用 |
| `DISABLE_COST_WARNINGS` | 禁用成本警告消息 |

---

## 实用命令

| 命令 | 描述 |
|---------|-------------|
| `/model` | 切换模型并调整 Opus 4.6 努力级别 |
| `/config` | 交互式配置界面 |
| `/memory` | 查看/编辑所有记忆文件 |
| `/agents` | 管理子代理 |
| `/mcp` | 管理 MCP 服务器 |
| `/hooks` | 查看已配置的钩子 |
| `/plugin` | 管理插件 |
| `/keybindings` | 配置自定义键盘快捷键 |
| `/skills` | 查看和管理技能 |
| `/permissions` | 查看和管理权限规则 |
| `--doctor` | 诊断配置问题 |
| `--debug` | 调试模式，显示钩子执行详情 |

---

## 快速参考：完整示例

```json
{
  "$schema": "https://www.schemastore.org/claude-code-settings.json",
  "model": "sonnet",
  "agent": "code-reviewer",
  "language": "english",
  "cleanupPeriodDays": 30,
  "autoUpdatesChannel": "stable",
  "alwaysThinkingEnabled": true,
  "includeGitInstructions": true,
  "plansDirectory": "./plans",

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

## 来源

- [Claude Code 设置文档](https://code.claude.com/docs/en/settings)
- [Claude Code 设置 JSON Schema](https://www.schemastore.org/claude-code-settings.json)
- [Claude Code 配置指南](https://claudelog.com/configuration/)
- [Claude Code GitHub 设置示例](https://github.com/feiskyer/claude-code-settings)
- [Eesel AI - 开发者 settings.json 指南](https://www.eesel.ai/blog/settings-json-claude-code)
- [Shipyard - Claude Code CLI 备忘单](https://shipyard.build/blog/claude-code-cheat-sheet/)