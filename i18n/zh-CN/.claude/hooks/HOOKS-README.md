# HOOKS-README
包含钩子的所有详细信息、脚本和指令。

## 钩子事件概览 - [官方 19 个钩子](https://code.claude.com/docs/en/hooks)
Claude Code 提供多个在工作流不同点运行的钩子事件：

| # | 钩子 | 描述 | 选项 |
|:-:|------|-------------|---------|
| 1 | `PreToolUse` | 在工具调用之前运行（可以阻止它们） | `async`, `timeout: 5000` |
| 2 | `PermissionRequest` | 当 Claude Code 向用户请求权限时运行 | `async`, `timeout: 5000`, `permission_suggestions` |
| 3 | `PostToolUse` | 工具调用成功完成后运行 | `async`, `timeout: 5000`, `tool_response` |
| 4 | `PostToolUseFailure` | 工具调用失败后运行 | `async`, `timeout: 5000`, `error`, `is_interrupt` |
| 5 | `UserPromptSubmit` | 当用户提交提示时运行，在 Claude 处理之前 | `async`, `timeout: 5000`, `prompt` |
| 6 | `Notification` | 当 Claude Code 发送通知时运行 | `async`, `timeout: 5000`, `notification_type`, `message`, `title` |
| 7 | `Stop` | 当 Claude Code 完成响应时运行 | `async`, `timeout: 5000`, `last_assistant_message`, `stop_hook_active` |
| 8 | `SubagentStart` | 子代理任务开始时运行 | `async`, `timeout: 5000`, `agent_id`, `agent_type` |
| 9 | `SubagentStop` | 子代理任务完成时运行 | `async`, `timeout: 5000`, `agent_id`, `agent_type`, `last_assistant_message`, `agent_transcript_path`, `stop_hook_active` |
| 10 | `PreCompact` | Claude Code 即将运行压缩操作之前运行 | `async`, `timeout: 5000`, `once`, `trigger`, `custom_instructions` |
| 11 | `SessionStart` | Claude Code 开始新会话或恢复现有会话时运行 | `async`, `timeout: 5000`, `once`, `agent_type`, `model`, `source` |
| 12 | `SessionEnd` | Claude Code 会话结束时运行 | `async`, `timeout: 5000`, `once`, `reason` |
| 13 | `Setup` | Claude Code 运行 /setup 命令进行项目初始化时运行 | `async`, `timeout: 30000` |
| 14 | `TeammateIdle` | 当队友代理变为空闲时运行（实验性代理团队） | `async`, `timeout: 5000`, `teammate_name`, `team_name` |
| 15 | `TaskCompleted` | 后台任务完成时运行（实验性代理团队） | `async`, `timeout: 5000`, `task_id`, `task_subject`, `task_description`, `teammate_name`, `team_name` |
| 16 | `ConfigChange` | 会话期间配置文件更改时运行 | `async`, `timeout: 5000`, `file_path`, `source` |
| 17 | `WorktreeCreate` | 代理 worktree 隔离创建 worktrees 用于自定义 VCS 设置时运行 | `async`, `timeout: 5000`, `name` |
| 18 | `WorktreeRemove` | 代理 worktree 隔离移除 worktrees 用于自定义 VCS 清理时运行 | `async`, `timeout: 5000`, `worktree_path` |
| 19 | `InstructionsLoaded` | CLAUDE.md 或 `.claude/rules/*.md` 文件加载到上下文中时运行 | `async`, `timeout: 5000` |

> **注意：** 钩子 14-15（`TeammateIdle` 和 `TaskCompleted`）需要实验性代理团队功能。启动 Claude Code 时设置 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` 以启用它们。

### 不在官方文档中

以下项目存在于 [Claude Code Changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) 但**未列出**在[官方钩子参考](https://code.claude.com/docs/en/hooks)中：

| 项目 | 添加版本 | Changelog 参考 | 备注 |
|------|----------|-------------------|-------|
| `Setup` 钩子 | [v2.1.10](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#2110) | "Added new Setup hook event that can be triggered via `--init`, `--init-only`, or `--maintenance` CLI flags for repository setup and maintenance operations" | 官方钩子参考页面未列出（列出 17 个钩子，Setup 被排除） |
| `InstructionsLoaded` 钩子 | [v2.1.69](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#2169) | "Added `InstructionsLoaded` hook event that fires when CLAUDE.md or `.claude/rules/*.md` files are loaded into context" | 官方钩子参考页面未列出。此钩子在 v2.1.69 中引入，而非 v2.1.64 |
| Agent 前置配置钩子 | [v2.1.0](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#210) | "Added hooks support to agent frontmatter, allowing agents to define PreToolUse, PostToolUse, and Stop hooks scoped to the agent's lifecycle" | Changelog 仅提到 3 个钩子，但测试确认**6 个钩子**实际在代理会话中触发：PreToolUse、PostToolUse、PermissionRequest、PostToolUseFailure、Stop、SubagentStop。并非所有 16 个钩子都受支持。 |

## 先决条件

在使用钩子之前，确保系统已安装 **Python 3**。

### 所需软件

#### 所有平台（Windows、macOS、Linux）
- **Python 3**：运行钩子脚本所需
- 验证安装：`python3 --version`

**安装说明：**
- **Windows**：从 [python.org](https://www.python.org/downloads/) 下载或通过 `winget install Python.Python.3` 安装
- **macOS**：通过 `brew install python3` 安装（需要 [Homebrew](https://brew.sh/)）
- **Linux**：通过 `sudo apt install python3`（Ubuntu/Debian）或 `sudo yum install python3`（RHEL/CentOS）安装

### 音频播放器（可选 - 自动检测）

钩子脚本自动检测并使用适合你平台的音频播放器：

- **macOS**：使用 `afplay`（内置，无需安装）
- **Linux**：使用 `pulseaudio-utils` 的 `paplay` - 通过 `sudo apt install pulseaudio-utils` 安装
- **Windows**：使用内置 `winsound` 模块（Python 自带）

### 钩子如何执行

钩子在 `.claude/settings.json` 中配置为直接用 Python 3 运行：

```json
{
  "type": "command",
  "command": "python3 .claude/hooks/scripts/hooks.py"
}
```

## 配置钩子（启用/禁用）

钩子可以在全局和单个级别轻松启用或禁用。

### 一次性禁用所有钩子

编辑 `.claude/settings.local.json` 并设置：
```json
{
  "disableAllHooks": true
}
```

**注意：** `.claude/settings.local.json` 文件被 git 忽略，因此每个用户可以配置自己的钩子偏好，而不影响 `.claude/settings.json` 中团队的共享设置。

> **托管设置：** 如果管理员通过托管策略设置配置了钩子，则在用户、项目或本地设置中设置的 `disableAllHooks` 无法禁用这些托管钩子（在 v2.1.49 中修复）。

### 禁用单个钩子

要进行精细控制，可以通过编辑钩子配置文件来禁用特定钩子。

#### 配置文件

有两个用于管理单个钩子的配置文件：

1. **`.claude/hooks/config/hooks-config.json`** - 提交到 git 的共享/默认配置
2. **`.claude/hooks/config/hooks-config.local.json`** - 你的个人覆盖（git 忽略）

本地配置文件（`.local.json`）优先于共享配置，允许每个开发者自定义其钩子行为而不影响团队。

#### 共享配置

编辑 `.claude/hooks/config/hooks-config.json` 设置团队范围的默认值：

```json
{
  "disableLogging": false,
  "disablePreToolUseHook": false,
  "disablePermissionRequestHook": false,
  "disablePostToolUseHook": false,
  "disablePostToolUseFailureHook": false,
  "disableUserPromptSubmitHook": false,
  "disableNotificationHook": false,
  "disableStopHook": false,
  "disableSubagentStartHook": false,
  "disableSubagentStopHook": false,
  "disablePreCompactHook": false,
  "disableSessionStartHook": false,
  "disableSessionEndHook": false,
  "disableSetupHook": false,
  "disableTeammateIdleHook": false,
  "disableTaskCompletedHook": false,
  "disableConfigChangeHook": false,
  "disableWorktreeCreateHook": false,
  "disableWorktreeRemoveHook": false,
  "disableInstructionsLoadedHook": false
}
```

**配置选项：**
- `disableLogging`：设为 `true` 禁用将钩子事件记录到 `.claude/hooks/logs/hooks-log.jsonl`（用于防止日志文件增长）

#### 本地配置（个人覆盖）

创建或编辑 `.claude/hooks/config/hooks-config.local.json` 设置个人偏好：

```json
{
  "disableLogging": true,
  "disablePostToolUseHook": true,
  "disableSessionStartHook": true
}
```

在此示例中，日志记录被禁用，PostToolUse 和 SessionStart 钩子在本地被覆盖。所有其他钩子将使用共享配置值。

**注意：** 单个钩子开关由钩子脚本（`.claude/hooks/scripts/hooks.py`）检查。本地设置覆盖共享设置，如果钩子被禁用，脚本将静默退出而不播放任何声音或执行钩子逻辑。

### 文本转语音（TTS）
用于生成声音的网站：https://elevenlabs.io/
使用的声音：Samara X

## Agent 前置配置钩子

Claude Code 2.1.0 引入了对代理前置配置文件中定义的代理特定钩子的支持。这些钩子仅在代理的生命周期内运行，支持一部分钩子事件。

### 支持的 Agent 钩子

Agent 前置配置钩子支持 **6 个钩子**（不是全部 16 个）。Changelog 最初只提到 3 个，但测试确认 6 个钩子实际在代理会话中触发：
- `PreToolUse`：代理使用工具之前运行
- `PostToolUse`：代理完成工具使用后运行
- `PermissionRequest`：工具需要用户权限时运行
- `PostToolUseFailure`：工具调用失败后运行
- `Stop`：代理完成时运行
- `SubagentStop`：子代理完成时运行

> **注意：** [v2.1.0 changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md#210) 仅提到 3 个钩子：*"Added hooks support to agent frontmatter, allowing agents to define PreToolUse, PostToolUse, and Stop hooks scoped to the agent's lifecycle"*。然而，使用 `claude-code-voice-hook-agent` 的测试确认 6 个钩子实际在代理会话中触发。其余 10 个钩子（如 Notification、SessionStart、SessionEnd 等）不会在代理上下文中触发。
>
> **更新（2026年2月）：** [官方钩子参考](https://code.claude.com/docs/en/hooks) 现在声明技能/代理前置配置钩子*"支持所有钩子事件"*。这可能意味着支持已扩展到最初测试的 6 个钩子之外。建议重新测试以验证是否现在有更多钩子在代理会话中触发。

### Agent 音效文件夹

代理特定的音效存储在单独的文件夹中：
- `.claude/hooks/sounds/agent_pretooluse/`
- `.claude/hooks/sounds/agent_posttooluse/`
- `.claude/hooks/sounds/agent_permissionrequest/`
- `.claude/hooks/sounds/agent_posttoolusefailure/`
- `.claude/hooks/sounds/agent_stop/`
- `.claude/hooks/sounds/agent_subagentstop/`

### 创建带钩子的 Agent

1. 在 `.claude/agents/` 中创建代理定义文件：

```markdown
---
name: my-agent
description: 此代理功能的描述
hooks:
  PreToolUse:
    - type: command
      command: python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/hooks.py --agent=my-agent
      timeout: 5000
      async: true
      statusMessage: PreToolUse
  PostToolUse:
    - type: command
      command: python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/hooks.py --agent=my-agent
      timeout: 5000
      async: true
      statusMessage: PostToolUse
  PermissionRequest:
    - type: command
      command: python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/hooks.py --agent=my-agent
      timeout: 5000
      async: true
      statusMessage: PermissionRequest
  PostToolUseFailure:
    - type: command
      command: python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/hooks.py --agent=my-agent
      timeout: 5000
      async: true
      statusMessage: PostToolUseFailure
  Stop:
    - type: command
      command: python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/hooks.py --agent=my-agent
      timeout: 5000
      async: true
      statusMessage: Stop
  SubagentStop:
    - type: command
      command: python3 ${CLAUDE_PROJECT_DIR}/.claude/hooks/scripts/hooks.py --agent=my-agent
      timeout: 5000
      async: true
      statusMessage: SubagentStop
---

你的代理指令...
```

2. 将音效文件添加到代理音效文件夹：
   - `agent_pretooluse/agent_pretooluse.wav`
   - `agent_posttooluse/agent_posttooluse.wav`
   - `agent_permissionrequest/agent_permissionrequest.wav`
   - `agent_posttoolusefailure/agent_posttoolusefailure.wav`
   - `agent_stop/agent_stop.wav`
   - `agent_subagentstop/agent_subagentstop.wav`

### 示例：Weather Fetcher Agent

参见 `.claude/agents/claude-code-voice-hook-agent.md` 获取配置了钩子的代理完整示例。

### 钩子选项：`once: true`

`once: true` 选项确保钩子在每次会话中只运行一次：

```json
{
  "type": "command",
  "command": "python3 .claude/hooks/scripts/hooks.py",
  "timeout": 5000,
  "once": true
}
```

这对 `SessionStart`、`SessionEnd` 和 `PreCompact` 等只应触发一次的钩子很有用。

> **注意：** `once` 选项仅用于**技能，而非代理**。它在基于设置的钩子和技能前置配置中有效，但在代理前置配置钩子中不受支持。

### 钩子选项：`async: true`

通过添加 `"async": true`，钩子可以在后台运行而不阻塞 Claude Code 的执行：

```json
{
  "type": "command",
  "command": "python3 .claude/hooks/scripts/hooks.py",
  "timeout": 5000,
  "async": true
}
```

**何时使用异步钩子：**
- 日志记录和分析
- 通知和音效
- 任何不应减慢 Claude Code 的副作用

此项目对所有钩子使用 `async: true`，因为语音通知是不需要阻塞执行的副作用。`timeout` 指定异步钩子在终止前可以运行多长时间。

### 钩子选项：`statusMessage`

`statusMessage` 字段设置钩子运行时向用户显示的自定义旋转消息：

```json
{
  "type": "command",
  "command": "python3 .claude/hooks/scripts/hooks.py",
  "timeout": 5000,
  "async": true,
  "statusMessage": "PreToolUse"
}
```

此项目在所有钩子上将 `statusMessage` 设置为钩子事件名称，因此旋转器会简要显示正在触发的钩子（例如 "PreToolUse"、"SessionStart"、"Stop"）。这对同步钩子最可见；对于异步钩子，消息在钩子在后台运行之前短暂闪现。

## 钩子类型

Claude Code 支持四种钩子处理器类型。此项目对所有音频播放使用 `command` 钩子。

### `type: "command"`（此项目使用）

运行 shell 命令。通过 stdin 接收 JSON 输入，通过退出码和 stdout 传递结果。

```json
{
  "type": "command",
  "command": "python3 .claude/hooks/scripts/hooks.py",
  "timeout": 5000,
  "async": true
}
```

### `type: "prompt"`

向 Claude 模型发送提示进行单轮评估。模型以 JSON 形式返回是/否决定（`{"ok": true/false, "reason": "..."}`）。适用于需要判断而非确定性规则的决定。

```json
{
  "type": "prompt",
  "prompt": "Check if all tasks are complete. $ARGUMENTS",
  "timeout": 30
}
```

**支持的事件：** PreToolUse、PostToolUse、PostToolUseFailure、PermissionRequest、UserPromptSubmit、Stop、SubagentStop、TaskCompleted。**仅命令事件（不支持 prompt/agent 类型）：** ConfigChange、InstructionsLoaded、Notification、PreCompact、SessionEnd、SessionStart、Setup、SubagentStart、TeammateIdle、WorktreeCreate、WorktreeRemove。

### `type: "agent"`

生成具有多轮工具访问（Read、Grep、Glob）的子代理来验证条件，然后返回决定。与 prompt 钩子响应格式相同。当验证需要检查实际文件或测试输出时很有用。

```json
{
  "type": "agent",
  "prompt": "Verify that all unit tests pass. $ARGUMENTS",
  "timeout": 120
}
```

### `type: "http"`（自 v2.1.63 起）

将 JSON POST 到 URL 并接收 JSON 响应，而不是运行 shell 命令。适用于与外部服务或 webhook 集成。启用沙箱时，HTTP 钩子通过沙箱网络代理路由。

```json
{
  "type": "http",
  "url": "http://localhost:8080/hooks/pre-tool-use",
  "timeout": 30,
  "headers": {
    "Authorization": "Bearer $MY_TOKEN"
  },
  "allowedEnvVars": ["MY_TOKEN"]
}
```

**不支持：** SessionStart、Setup 事件。Headers 支持使用 `$VAR_NAME` 进行环境变量插值，但仅限于 `allowedEnvVars` 中明确列出的变量。

## 环境变量

Claude Code 向钩子脚本提供这些环境变量：

| 变量 | 可用性 | 描述 |
|----------|-------------|-------------|
| `$CLAUDE_PROJECT_DIR` | 所有钩子 | 项目根目录。对于包含空格的路径用引号包裹 |
| `$CLAUDE_ENV_FILE` | 仅 SessionStart | 用于为后续 Bash 命令持久化环境变量的文件路径。使用追加（`>>`）保留来自其他钩子的变量 |
| `${CLAUDE_PLUGIN_ROOT}` | 插件钩子 | 插件根目录，用于与插件捆绑的脚本 |
| `$CLAUDE_CODE_REMOTE` | 所有钩子 | 在远程 web 环境中设为 `"true"`，在本地 CLI 中不设置 |
| `session_id`（通过 stdin JSON） | 所有钩子 | 当前会话 ID，作为 stdin 上 JSON 输入的一部分接收（不是环境变量） |

### 通用输入字段（stdin JSON）

每个钩子在 stdin 上接收一个 JSON 对象，包含这些通用字段，以及上面选项列中列出的任何钩子特定字段：

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `hook_event_name` | string | 触发的钩子事件名称（例如 `"PreToolUse"`、`"Stop"`） |
| `session_id` | string | 当前会话标识符 |
| `transcript_path` | string | 对话记录 JSON 文件路径 |
| `cwd` | string | 当前工作目录 |
| `permission_mode` | string | 当前权限模式：`default`、`plan`、`acceptEdits`、`dontAsk` 或 `bypassPermissions` |
| `agent_id` | string | 唯一的子代理标识符。当钩子在子代理上下文中触发时存在（自 v2.1.69 起） |
| `agent_type` | string | 代理类型名称（例如 `Bash`、`Explore`、`Plan` 或自定义）。使用 `--agent <name>` 标志或在子代理内部时存在（自 v2.1.69 起） |

> **注意：** 钩子特定字段（例如 PreToolUse 的 `tool_name`、Stop 的 `last_assistant_message`）在上面的[钩子事件概览](#钩子事件概览---官方-19-个钩子)表格的选项列中列出。

## 钩子管理命令

Claude Code 提供用于管理钩子的内置命令：

- **`/hooks`** — 交互式钩子管理 UI。无需编辑 JSON 文件即可查看、添加和删除钩子。钩子按来源标记：`[User]`、`[Project]`、`[Local]`、`[Plugin]`。你也可以从此菜单切换 `disableAllHooks`。
- **`claude hooks reload`** — 无需重启会话即可重新加载钩子配置。在编辑设置文件后很有用（自 v2.0.47 起）。

## MCP 工具匹配器

对于 `PreToolUse`、`PostToolUse` 和 `PermissionRequest` 钩子，可以使用 `mcp__<server>__<tool>` 模式匹配 MCP（模型上下文协议）工具：

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "mcp__memory__.*",
      "hooks": [{ "type": "command", "command": "echo 'MCP memory tool used'" }]
    }]
  }
}
```

支持完整正则：`mcp__memory__.*`（memory 服务器的所有工具）、`mcp__.*__write.*`（任何服务器的写入工具）。

### 每钩子匹配器参考

匹配器过滤触发钩子的事件。并非所有钩子都支持匹配器 — 不支持匹配器的钩子始终触发。

| 钩子 | 匹配器字段 | 可能值 | 示例 |
|------|--------------|-----------------|---------|
| `PreToolUse` | `tool_name` | 任何工具名称：`Bash`、`Read`、`Edit`、`Write`、`Glob`、`Grep`、`mcp__*` | `"matcher": "Bash"` |
| `PermissionRequest` | `tool_name` | 与 PreToolUse 相同 | `"matcher": "mcp__memory__.*"` |
| `PostToolUse` | `tool_name` | 与 PreToolUse 相同 | `"matcher": "Write"` |
| `PostToolUseFailure` | `tool_name` | 与 PreToolUse 相同 | `"matcher": "Bash"` |
| `Notification` | `notification_type` | `permission_prompt`、`idle_prompt`、`auth_success`、`elicitation_dialog` | `"matcher": "permission_prompt"` |
| `SubagentStart` | `agent_type` | `Bash`、`Explore`、`Plan` 或自定义代理名称 | `"matcher": "Bash"` |
| `SubagentStop` | `agent_type` | `Bash`、`Explore`、`Plan` 或自定义代理名称 | `"matcher": "Bash"` |
| `SessionStart` | `source` | `startup`、`resume`、`clear`、`compact` | `"matcher": "startup"` |
| `SessionEnd` | `reason` | `clear`、`logout`、`prompt_input_exit`、`bypass_permissions_disabled`、`other` | `"matcher": "logout"` |
| `PreCompact` | `trigger` | `manual`、`auto` | `"matcher": "auto"` |
| `ConfigChange` | `source` | `user_settings`、`project_settings`、`local_settings`、`policy_settings`、`skills` | `"matcher": "project_settings"` |
| `UserPromptSubmit` | — | 不支持匹配器 | 始终触发 |
| `Stop` | — | 不支持匹配器 | 始终触发 |
| `TeammateIdle` | — | 不支持匹配器 | 始终触发 |
| `TaskCompleted` | — | 不支持匹配器 | 始终触发 |
| `WorktreeCreate` | — | 不支持匹配器 | 始终触发 |
| `WorktreeRemove` | — | 不支持匹配器 | 始终触发 |
| `InstructionsLoaded` | — | 不支持匹配器 | 始终触发 |
| `Setup` | — | 不支持匹配器 | 始终触发 |

## 已知问题与解决方法

### Agent Stop 钩子 Bug（SubagentStop vs Stop）

**Bug 报告：** [GitHub Issue #19220](https://github.com/anthropics/claude-code/issues/19220)

**问题：** 在代理前置配置中定义 `Stop` 钩子时，传递给钩子脚本的 `hook_event_name` 是 `"SubagentStop"` 而不是 `"Stop"`。这与官方文档相矛盾，并破坏了与其他代理钩子（`PreToolUse` 和 `PostToolUse`）的一致性，后者正确传递其配置的名称。

| 钩子 | 定义为 | 接收为 | 状态 |
|------|------------|-------------|--------|
| PreToolUse | `PreToolUse:` | `"PreToolUse"` | ✅ 正确 |
| PostToolUse | `PostToolUse:` | `"PostToolUse"` | ✅ 正确 |
| Stop | `Stop:` | `"SubagentStop"` | ❌ 不一致 |

**状态：** [官方钩子参考](https://code.claude.com/docs/en/hooks#hooks-in-skills-and-agents) 现在将此记录为预期行为：*"For subagents, Stop hooks are automatically converted to SubagentStop since that is the event that fires when a subagent completes."* 此项目通过 `hooks.py` 中的 `AGENT_HOOK_SOUND_MAP` 处理此问题，其中有单独的 `SubagentStop` 条目映射到 `agent_subagentstop` 音效文件夹。

### PreToolUse 决策控制弃用

`PreToolUse` 钩子以前使用顶层 `decision` 和 `reason` 字段来阻止工具调用。这些现在已**弃用**。改用 `hookSpecificOutput.permissionDecision` 和 `hookSpecificOutput.permissionDecisionReason`：

| 已弃用 | 当前 |
|-----------|---------|
| `"decision": "approve"` | `"hookSpecificOutput": { "permissionDecision": "allow" }` |
| `"decision": "block"` | `"hookSpecificOutput": { "permissionDecision": "deny" }` |

这不会影响此项目，因为 `hooks.py` 使用异步音频播放，不使用决策控制。

## 决策控制模式

不同的钩子使用不同的输出模式来阻止或控制执行。此项目不使用决策控制（所有钩子都是异步音频播放），但供参考：

| 钩子 | 控制方法 | 值 |
|---------|---------------|--------|
| PreToolUse | `hookSpecificOutput.permissionDecision` | `allow`、`deny`、`ask` |
| PreToolUse | `hookSpecificOutput.autoAllow` | `true` — 自动批准此工具的未来使用（自 v2.0.76 起） |
| PermissionRequest | `hookSpecificOutput.decision.behavior` | `allow`、`deny` |
| PostToolUse, PostToolUseFailure, Stop, SubagentStop, ConfigChange | 顶层 `decision` | `block` |
| TeammateIdle, TaskCompleted | 仅退出码 2 | 无 JSON 决策控制 |
| UserPromptSubmit | 可以修改 `prompt` 字段 | 通过 stdout 返回修改后的提示 |
| WorktreeCreate | 非零退出 + stdout 路径 | 非零退出导致创建失败；stdout 提供 worktree 路径 |

### 通用 JSON 输出字段

所有钩子都可以通过 stdout JSON 返回这些字段：

| 字段 | 类型 | 描述 |
|-------|------|-------------|
| `continue` | bool | 如果为 `false`，完全停止 Claude |
| `stopReason` | string | 当 `continue` 为 false 时显示的消息 |
| `suppressOutput` | bool | 从详细模式隐藏 stdout |
| `systemMessage` | string | 向用户显示的警告消息 |
| `additionalContext` | string | 添加到 Claude 对话的上下文 |

## 钩子去重与外部更改

- **钩子去重：** 在多个设置位置定义的相同钩子处理器只并行运行一次，防止重复执行。
- **外部更改检测：** 当钩子在活动会话期间被外部修改（例如由另一个进程编辑设置文件）时，Claude Code 会发出警告。