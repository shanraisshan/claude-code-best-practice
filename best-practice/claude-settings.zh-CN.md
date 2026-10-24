# Claude Code 设置最佳实践

![最后更新](https://img.shields.io/badge/最后更新-2026年5月12日-white?style=flat&labelColor=555) ![版本](https://img.shields.io/badge/Claude_Code-v2.1.139-blue?style=flat)

[![已实现](https://img.shields.io/badge/已实现-2ea44f?style=flat)](../.claude/settings.json)

Claude Code 的 `settings.json` 文件配置的完整指南。截至 v2.1.139，Claude Code 暴露了 **60+ 设置**和 **180+ 环境变量**。

---

## 目录

1. [设置层次结构](#设置层次结构)
2. [核心配置](#核心配置)
3. [权限](#权限)
4. [钩子](#钩子)
5. [MCP 服务器](#mcp-服务器)
6. [沙盒](#沙盒)
7. [插件](#插件)
8. [模型配置](#模型配置)
9. [显示和用户体验](#显示和用户体验)
10. [AWS 和云凭证](#aws-和云凭证)
11. [环境变量](#环境变量)
12. [有用的命令](#有用的命令)

---

## 设置层次结构

设置按优先级顺序应用（从高到低）：

| 优先级 | 位置 | 范围 | 共享 | 用途 |
|--------|------|------|------|------|
| 1 | 托管设置 | 组织 | 是（由IT部署） | 无法覆盖的安全策略 |
| 2 | 命令行参数 | 会话 | N/A | 临时单会话覆盖 |
| 3 | `.claude/settings.local.json` | 项目 | 否（git忽略） | 个人项目特定设置 |
| 4 | `.claude/settings.json` | 项目 | 是（已提交） | 团队共享设置 |
| 5 | `~/.claude/settings.json` | 用户 | N/A | 全局个人默认值 |

**托管设置**由组织强制执行，无法通过任何其他级别（包括命令行参数）覆盖。分配方法：
- **服务器管理**设置（远程交付）
- **MDM 配置文件** — macOS plist：`com.anthropic.claudecode`
- **注册表策略** — Windows `HKLM\SOFTWARE\Policies\ClaudeCode`（管理员）和 `HKCU\SOFTWARE\Policies\ClaudeCode`（用户级）
- **文件** — `managed-settings.json` 和 `managed-mcp.json`
- **目录** — `managed-settings.d/` 用于独立策略片段

> **注意**：在托管层中，优先级为：服务器管理 > MDM/OS级策略 > 文件基础

**托管专用策略键**：

| 键 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `parentSettingsBehavior` | 字符串 | `"first-wins"` | 控制由嵌入主机进程（SDK父级）以编程方式提供的托管设置是否应用 |
| `policyHelper` | 对象 | - | 在启动时动态计算托管设置的管理员部署可执行文件 |

**重要**：
- `deny` 规则具有最高安全优先级，无法被低优先级的允许/询问规则覆盖
- 托管设置可能会锁定或覆盖本地行为，即使本地文件指定不同的值
- 数组设置（如 `permissions.allow`）在作用域中**连接和去重** — 来自所有级别的条目被组合而不是替换

---

## 核心配置

### 通用设置

| 键 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `$schema` | 字符串 | - | 用于IDE验证和自动完成的JSON Schema URL |
| `model` | 字符串 | `"default"` | 覆盖默认模型。接受别名（`sonnet`、`opus`、`haiku`）或完整模型ID |
| `agent` | 字符串 | - | 为主对话设置默认代理。值是 `.claude/agents/` 中的代理名称 |
| `language` | 字符串 | `"english"` | Claude的首选响应语言 |
| `cleanupPeriodDays` | 数字 | `30` | 启动清理扫描的年龄截止值（最小1天） |
| `autoUpdatesChannel` | 字符串 | `"latest"` | 发布渠道：`"stable"` 或 `"latest"` |
| `minimumVersion` | 字符串 | - | 防止自动更新程序降级到特定版本以下 |
| `alwaysThinkingEnabled` | 布尔值 | `false` | 默认为所有会话启用扩展思考 |
| `availableModels` | 数组 | - | 限制用户可以选择的模型列表 |
| `fastModePerSessionOptIn` | 布尔值 | `false` | 要求用户在每个会话中选择加入快速模式 |
| `defaultShell` | 字符串 | `"bash"` | 输入框命令的默认shell。接受 `"bash"`（默认）或 `"powershell"` |
| `includeGitInstructions` | 布尔值 | `true` | 在Claude的系统提示中包含内置提交和PR工作流指令 |
| `voice` | 对象 | - | 语音听写配置对象 |

**示例**：
```json
{
  "model": "opus",
  "agent": "code-reviewer",
  "language": "chinese",
  "alwaysThinkingEnabled": true
}
```

### 计划和记忆目录

在自定义位置存储计划和自动记忆文件。

| 键 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `plansDirectory` | 字符串 | `~/.claude/plans` | `/plan` 输出的存储目录 |
| `autoMemoryDirectory` | 字符串 | - | 自动记忆存储的自定义目录 |

### 工作树设置

配置 `--worktree` 如何创建和管理git工作树。对于减少大型单体仓库中的磁盘使用和启动时间很有用。

| 键 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `worktree.symlinkDirectories` | 数组 | `[]` | 从主仓库符号链接到每个工作树的目录，以避免在磁盘上重复大目录 |
| `worktree.sparsePaths` | 数组 | `[]` | 通过git稀疏签出在每个工作树中签出的目录 |
| `worktree.baseRef` | 字符串 | `"fresh"` | 新工作树的分支来源 |

**示例**：
```json
{
  "worktree": {
    "symlinkDirectories": ["node_modules", ".cache"],
    "sparsePaths": ["packages/my-app", "shared/utils"]
  }
}
```

### 属性设置

自定义git提交和拉取请求的属性消息。

| 键 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `attribution.commit` | 字符串 | Co-authored-by | Git提交属性（支持拖车） |
| `attribution.pr` | 字符串 | 生成的消息 | 拉取请求描述属性 |
| `includeCoAuthoredBy` | 布尔值 | `true` | **已弃用** - 改用 `attribution` |

**示例**：
```json
{
  "attribution": {
    "commit": "使用AI生成\n\n共同作者：Claude <noreply@anthropic.com>",
    "pr": "使用Claude Code生成"
  }
}
```

### 身份验证帮助程序

用于动态身份验证令牌生成的脚本。

| 键 | 类型 | 说明 |
|-----|------|------|
| `apiKeyHelper` | 字符串 | 输出认证令牌的shell脚本路径 |
| `forceLoginMethod` | 字符串 | 限制登录为 `"claudeai"` 或 `"console"` 帐户 |
| `forceLoginOrgUUID` | 字符串\|数组 | 要求登录属于特定组织 |

### 公司公告

在启动时向用户显示自定义公告（随机循环）。

| 键 | 类型 | 说明 |
|-----|------|------|
| `companyAnnouncements` | 数组 | 在启动时显示的字符串数组 |

**示例**：
```json
{
  "companyAnnouncements": [
    "欢迎来到Acme公司！",
    "记得在提交前运行测试！",
    "查看wiki了解编码标准"
  ]
}
```

---

## 权限

控制Claude可以执行的工具和操作。

### 权限结构

```json
{
  "permissions": {
    "allow": [],
    "ask": [],
    "deny": [],
    "additionalDirectories": [],
    "defaultMode": "acceptEdits"
  }
}
```

### 权限键

| 键 | 类型 | 说明 |
|-----|------|------|
| `permissions.allow` | 数组 | 允许工具使用而无需提示的规则 |
| `permissions.ask` | 数组 | 需要用户确认的规则 |
| `permissions.deny` | 数组 | 阻止工具使用的规则（最高优先级） |
| `permissions.additionalDirectories` | 数组 | Claude可以访问的额外目录 |
| `permissions.defaultMode` | 字符串 | 默认权限模式 |

### 权限模式

| 模式 | 行为 |
|------|------|
| `"default"` | 标准权限检查和提示 |
| `"acceptEdits"` | 自动接受文件编辑而无需询问 |
| `"dontAsk"` | 自动拒绝工具，除非通过 `/permissions` 预先批准 |
| `"bypassPermissions"` | 跳过所有权限检查（危险） |
| `"auto"` | 自动批准工具调用，进行后台安全检查 |
| `"plan"` | 只读探索模式 |

### 工具权限语法

| 工具 | 语法 | 示例 |
|------|--------|----------|
| `Bash` | `Bash(命令模式)` | `Bash(npm run *)`, `Bash(* install)` |
| `Read` | `Read(路径模式)` | `Read(.env)`, `Read(./secrets/**)` |
| `Edit` | `Edit(路径模式)` | `Edit(src/**)`, `Edit(*.ts)` |
| `Write` | `Write(路径模式)` | `Write(*.md)`, `Write(./docs/**)` |
| `WebFetch` | `WebFetch(domain:模式)` | `WebFetch(domain:example.com)` |
| `WebSearch` | `WebSearch` | 全局网络搜索 |
| `Agent` | `Agent(名称)` | `Agent(researcher)`, `Agent(*)` |
| `MCP` | `MCP(服务器:工具)` | `MCP(github:*)`, `mcp__memory__*` |

**示例**：
```json
{
  "permissions": {
    "allow": [
      "Edit(*)",
      "Write(*)",
      "Bash(npm run *)",
      "Bash(git *)",
      "WebFetch(domain:*)"
    ],
    "ask": [
      "Bash(rm *)",
      "Bash(git push *)"
    ],
    "deny": [
      "Read(.env)",
      "Read(./secrets/**)",
      "Bash(curl *)"
    ]
  }
}
```

---

## 钩子

钩子配置在专用仓库中维护：

> **[claude-code-hooks](https://github.com/shanraisshan/claude-code-hooks)** — 完整的钩子参考，包括声音通知系统和所有25个钩子事件

有关详细信息，请查看[Claude Code 钩子文档](https://code.claude.com/docs/en/hooks)。

---

## MCP 服务器

为扩展功能配置模型上下文协议服务器。

### MCP 设置

| 键 | 类型 | 范围 | 说明 |
|-----|------|------|------|
| `enableAllProjectMcpServers` | 布尔值 | 任何 | 自动批准所有 `.mcp.json` 服务器 |
| `enabledMcpjsonServers` | 数组 | 任何 | 允许列表特定服务器名称 |
| `disabledMcpjsonServers` | 数组 | 任何 | 阻止列表特定服务器名称 |
| `allowedMcpServers` | 数组 | 仅托管 | 名称/命令/URL匹配的允许列表 |
| `deniedMcpServers` | 数组 | 仅托管 | 匹配的阻止列表 |

**示例**：
```json
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["memory", "github", "filesystem"],
  "disabledMcpjsonServers": ["experimental-server"]
}
```

---

## 沙盒

为bash命令安全配置沙盒。

### 沙盒设置

| 键 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `sandbox.enabled` | 布尔值 | `false` | 启用bash沙盒 |
| `sandbox.failIfUnavailable` | 布尔值 | `false` | 沙盒启用但无法启动时以错误退出 |
| `sandbox.autoAllowBashIfSandboxed` | 布尔值 | `true` | 沙盒时自动批准bash |
| `sandbox.excludedCommands` | 数组 | `[]` | 在沙盒外运行的命令 |
| `sandbox.allowUnsandboxedCommands` | 布尔值 | `true` | 允许 `dangerouslyDisableSandbox` |

**示例**：
```json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["git", "docker", "gh"]
  }
}
```

---

## 插件

配置Claude Code插件和市场。

### 插件设置

| 键 | 类型 | 范围 | 说明 |
|-----|------|------|------|
| `enabledPlugins` | 对象 | 任何 | 启用/禁用特定插件 |
| `extraKnownMarketplaces` | 对象 | 项目 | 添加自定义插件市场 |
| `strictKnownMarketplaces` | 数组 | 仅托管 | 允许的市场列表 |

**示例**：
```json
{
  "enabledPlugins": {
    "formatter@acme-tools": true,
    "deployer@acme-tools": true
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

| 别名 | 说明 |
|------|------|
| `"default"` | 推荐用于您的账户类型 |
| `"sonnet"` | 最新Sonnet模型（Claude Sonnet 4.6） |
| `"opus"` | 最新Opus模型（Claude Opus 4.6） |
| `"haiku"` | 快速Haiku模型 |
| `"sonnet[1m]"` | 带1M token上下文的Sonnet |
| `"opus[1m]"` | 带1M token上下文的Opus |

### 模型覆盖

将Anthropic模型ID映射到特定于提供商的模型ID。

| 键 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `effortLevel` | 字符串 | - | 跨会话保持努力级别 |
| `modelOverrides` | 对象 | - | 将模型选择器条目映射到提供商特定的ID |

**示例**：
```json
{
  "modelOverrides": {
    "claude-opus-4-6": "arn:aws:bedrock:us-east-1:123456789:inference-profile/anthropic.claude-opus-4-6-v1:0"
  }
}
```

### 努力级别

`/model` 命令暴露了**努力级别**控制，调整模型应用的推理量。

| 努力级别 | 说明 |
|----------|------|
| Max | 最大推理深度，仅Opus 4.6 |
| XHigh | 扩展高推理深度，仅Opus 4.7 |
| High | 完整推理深度，适合复杂任务 |
| Medium | 平衡推理，适合日常任务 |
| Low | 最小推理，最快响应 |

---

## 显示和用户体验

### 显示设置

| 键 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `statusLine` | 对象 | - | 自定义状态行配置 |
| `outputStyle` | 字符串 | `"default"` | 输出风格（例如 `"Explanatory"`） |
| `spinnerTipsEnabled` | 布尔值 | `true` | 等待时显示提示 |
| `respects GitIgnore` | 布尔值 | `true` | 在文件选择器中尊重.gitignore |
| `prefersReducedMotion` | 布尔值 | `false` | 减少UI中的动画 |
| `autoScrollEnabled` | 布尔值 | `true` | 在全屏模式中自动滚动对话 |
| `editorMode` | 字符串 | `"normal"` | 输入提示的键绑定模式 |
| `showTurnDuration` | 布尔值 | `true` | 在响应后显示轮次持续时间消息 |

### 状态行配置

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 2,
    "refreshInterval": 5
  }
}
```

| 字段 | 说明 |
|------|------|
| `type` | 设置为 `"command"` 运行shell脚本 |
| `command` | 生成状态行输出的shell命令或脚本路径 |
| `padding` | 添加到状态行内容的额外水平间距（字符） |
| `refreshInterval` | 每N秒重新运行命令 |

---

## AWS 和云凭证

### AWS 设置

| 键 | 类型 | 说明 |
|-----|------|------|
| `awsAuthRefresh` | 字符串 | 刷新AWS认证的脚本 |
| `awsCredentialExport` | 字符串 | 输出JSON格式AWS凭证的脚本 |

### OpenTelemetry

| 键 | 类型 | 说明 |
|-----|------|------|
| `otelHeadersHelper` | 字符串 | 生成动态OpenTelemetry头的脚本 |

---

## 环境变量

通过 `env` 为所有Claude Code会话设置环境变量。

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "...",
    "NODE_ENV": "development",
    "DEBUG": "true"
  }
}
```

### 常见环境变量

| 变量 | 说明 |
|------|------|
| `ANTHROPIC_API_KEY` | 认证API键 |
| `ANTHROPIC_AUTH_TOKEN` | OAuth令牌 |
| `ANTHROPIC_MODEL` | 要使用的模型名称 |
| `ANTHROPIC_BASE_URL` | 自定义API端点 |
| `CLAUDE_CODE_SHELL` | 覆盖自动shell检测 |
| `DISABLE_TELEMETRY` | 禁用遥测（`1` 禁用） |
| `DISABLE_AUTOUPDATER` | 禁用自动检查更新 |

---

## 有用的命令

```bash
# 查看当前设置
claude /config

# 修改模型
claude /model

# 查看权限配置
claude /permissions

# 查看环境变量
claude --env

# 显示帮助
claude --help
```

---

**最后更新**: 2026年5月14日

