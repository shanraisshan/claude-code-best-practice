# 命令最佳实践

![最后更新](https://img.shields.io/badge/Last_Updated-Mar_2%2C_2026-white?style=flat&labelColor=555)<br>
[![已实现](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../implementation/claude-commands-implementation.md)

Claude Code 命令完整参考 —— 命令定义、前置字段和当前内置斜杠命令。

<table width="100%">
<tr>
<td><a href="../">← 返回 Claude Code 最佳实践</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 前置字段

自定义命令定义在 `.claude/commands/<name>.md` 中，包含可选的 YAML 前置字段。

| 字段 | 类型 | 必需 | 描述 |
|-------|------|----------|-------------|
| `description` | string | 推荐 | 命令的功能。显示在自动补全中，并由 Claude 用于自动发现 |
| `argument-hint` | string | 否 | 自动补全过程中显示的提示（例如 `[issue-number]`、`[filename]`） |
| `allowed-tools` | string | 否 | 当此命令激活时，无需权限提示即可使用的工具 |
| `model` | string | 否 | 此命令运行时使用的模型（例如 `haiku`、`sonnet`、`opus`） |

---

## 字符串替换

命令 markdown 中可用的动态值变量：

| 变量 | 描述 |
|----------|-------------|
| `$ARGUMENTS` | 调用命令时传递的所有参数 |
| `$ARGUMENTS[N]` | 通过从 0 开始的索引访问特定参数 |
| `$N` | `$ARGUMENTS[N]` 的简写（例如 `$0`、`$1`） |
| `${CLAUDE_SESSION_ID}` | 当前会话标识符 |
| `` !`command` `` | 动态上下文注入 —— shell 命令的输出在 Claude 看到之前替换占位符 |

---

## 调用方式

在 Claude Code 交互模式下输入 `/command-name` 来调用自定义命令：

| 方式 | 描述 |
|--------|-------------|
| `/command-name` | 从命令菜单直接调用 |
| `/command-name [args]` | 传递映射到 `$ARGUMENTS` 的参数 |
| 自动补全 | 输入 `/` 查看所有可用命令及其描述 |
| 子目录 | 子目录中的命令使用 `/subdir:command-name` |

---

## 示例：最小命令

```yaml
---
description: 获取迪拜天气数据并创建 SVG 天气卡片
model: haiku
---

获取迪拜（阿联酋）的当前温度并创建可视化的 SVG 天气卡片。
```

## 示例：完整功能命令（所有字段）

```yaml
---
description: 按编号修复 GitHub issue，遵循团队编码规范
argument-hint: [issue-number]
allowed-tools: Read, Edit, Write, Bash(gh *), Bash(npm test *)
model: sonnet
---

遵循我们的编码规范修复 GitHub issue $0。

## 上下文
- PR diff: !`gh pr diff`
- Issue 详情: !`gh issue view $0`

## 步骤
1. 阅读 issue 描述
2. 理解需求
3. 实现修复
4. 编写测试
5. 创建提交

会话: ${CLAUDE_SESSION_ID}
```

---

## 作用域与优先级

当多个命令共享相同名称时，优先级较高的位置生效：

| 位置 | 作用域 | 优先级 |
|----------|-------|----------|
| 项目（`.claude/commands/`） | 仅此项目 | 1（最高） |
| 个人（`~/.claude/commands/`） | 所有你的项目 | 2 |
| 插件（`<plugin>/commands/`） | 启用插件的场所 | 3（最低） |

---

## Claude 命令

### 所有命令

Claude Code 交互模式中可用的内置斜杠命令：

| 命令 | 标签 | 描述 |
|---------|-----|-------------|
| `/add-dir` | ![项目](https://img.shields.io/badge/Project-27AE60?style=flat) | 向当前会话添加额外的工作目录 |
| `/agents` | ![扩展](https://img.shields.io/badge/Extensions-16A085?style=flat) | 管理自定义子代理 —— 查看、创建、编辑、删除 |
| `/bug [description]` | ![调试](https://img.shields.io/badge/Debug-E74C3C?style=flat) | `/feedback` 的别名 |
| `/chrome` | ![扩展](https://img.shields.io/badge/Extensions-16A085?style=flat) | 管理 Claude in Chrome 浏览器集成 |
| `/clear` | ![会话](https://img.shields.io/badge/Session-4A90D9?style=flat) | 清除对话历史并重新开始 |
| `/compact [prompt]` | ![会话](https://img.shields.io/badge/Session-4A90D9?style=flat) | 压缩对话以释放上下文窗口。可选 prompt 用于聚焦压缩内容 |
| `/config` | ![配置](https://img.shields.io/badge/Config-F39C12?style=flat) | 打开支持搜索的交互式设置界面 |
| `/context` | ![上下文](https://img.shields.io/badge/Context-8E44AD?style=flat) | 将当前上下文使用情况可视化为带有 token 计数的彩色网格 |
| `/copy` | ![导出](https://img.shields.io/badge/Export-7F8C8D?style=flat) | 将最后一次助手回复复制到剪贴板 |
| `/cost` | ![上下文](https://img.shields.io/badge/Context-8E44AD?style=flat) | 显示当前会话的 token 使用统计 |
| `/desktop` | ![远程](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | 连接或管理桌面伴侣应用 |
| `/diff` | ![项目](https://img.shields.io/badge/Project-27AE60?style=flat) | 查看当前仓库中的 git diff |
| `/doctor` | ![调试](https://img.shields.io/badge/Debug-E74C3C?style=flat) | 检查 Claude Code 安装的健康状态 |
| `/exit` | ![会话](https://img.shields.io/badge/Session-4A90D9?style=flat) | 退出 REPL |
| `/export [filename]` | ![导出](https://img.shields.io/badge/Export-7F8C8D?style=flat) | 将当前对话导出到文件或剪贴板 |
| `/extra-usage` | ![上下文](https://img.shields.io/badge/Context-8E44AD?style=flat) | 为订阅计划配置按量付费溢出计费 |
| `/fast` | ![模型](https://img.shields.io/badge/Model-E67E22?style=flat) | 切换快速模式 —— 相同的 Opus 4.6 模型，输出更快 |
| `/feedback [description]` | ![调试](https://img.shields.io/badge/Debug-E74C3C?style=flat) | 生成用于报告 bug 或反馈的 GitHub issue URL |
| `/fork` | ![会话](https://img.shields.io/badge/Session-4A90D9?style=flat) | 将当前对话分叉到新会话 |
| `/help` | ![调试](https://img.shields.io/badge/Debug-E74C3C?style=flat) | 显示斜杠命令帮助 |
| `/ide` | ![扩展](https://img.shields.io/badge/Extensions-16A085?style=flat) | 连接到 IDE 集成 |
| `/init [prompt]` | ![项目](https://img.shields.io/badge/Project-27AE60?style=flat) | 使用 CLAUDE.md 指南初始化新项目 |
| `/install-github-app` | ![远程](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | 安装 GitHub 应用以进行 PR 关联工作流 |
| `/install-slack-app` | ![远程](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | 安装 Slack 应用以接收通知和分享 |
| `/keybindings` | ![配置](https://img.shields.io/badge/Config-F39C12?style=flat) | 按上下文自定义键盘快捷键并创建组合键序列 |
| `/login` | ![认证](https://img.shields.io/badge/Auth-2980B9?style=flat) | 通过 OAuth 进行 Claude Code 认证 |
| `/logout` | ![认证](https://img.shields.io/badge/Auth-2980B9?style=flat) | 从 Claude Code 登出 |
| `/mcp` | ![扩展](https://img.shields.io/badge/Extensions-16A085?style=flat) | 管理 MCP 服务器连接 |
| `/memory` | ![记忆](https://img.shields.io/badge/Memory-3498DB?style=flat) | 查看和编辑记忆文件 |
| `/mobile` | ![远程](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | 连接或管理移动伴侣应用 |
| `/model` | ![模型](https://img.shields.io/badge/Model-E67E22?style=flat) | 切换模型（haiku、sonnet、opus）并调整努力程度 |
| `/output-style` | ![配置](https://img.shields.io/badge/Config-F39C12?style=flat) | 选择输出风格预设 |
| `/passes [number]` | ![模型](https://img.shields.io/badge/Model-E67E22?style=flat) | 设置某些工作流的审查轮次 |
| `/permissions` | ![配置](https://img.shields.io/badge/Config-F39C12?style=flat) | 查看或更新工具权限 |
| `/plan` | ![模型](https://img.shields.io/badge/Model-E67E22?style=flat) | 进入只读规划模式 —— 建议方案而不做更改 |
| `/pr-comments` | ![项目](https://img.shields.io/badge/Project-27AE60?style=flat) | 审查或回复拉取请求评论 |
| `/privacy-settings` | ![配置](https://img.shields.io/badge/Config-F39C12?style=flat) | 管理隐私和遥测偏好 |
| `/release-notes` | ![调试](https://img.shields.io/badge/Debug-E74C3C?style=flat) | 显示最近的 Claude Code 发布说明 |
| `/reload-plugins` | ![扩展](https://img.shields.io/badge/Extensions-16A085?style=flat) | 重新加载已安装的插件而无需重启 |
| `/remote-control` | ![远程](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | 从其他设备继续当前会话 |
| `/remote-env` | ![远程](https://img.shields.io/badge/Remote-5D6D7E?style=flat) | 检查或复制远程控制环境设置 |
| `/rename <name>` | ![会话](https://img.shields.io/badge/Session-4A90D9?style=flat) | 重命名当前会话以便识别 |
| `/resume [session]` | ![会话](https://img.shields.io/badge/Session-4A90D9?style=flat) | 通过 ID 或名称恢复之前的对话，或打开会话选择器 |
| `/review` | ![项目](https://img.shields.io/badge/Project-27AE60?style=flat) | 审查当前代码更改 |
| `/rewind` | ![会话](https://img.shields.io/badge/Session-4A90D9?style=flat) | 将对话和/或代码回退到较早的时间点 |
| `/sandbox` | ![配置](https://img.shields.io/badge/Config-F39C12?style=flat) | 配置沙箱及依赖状态 |
| `/security-review` | ![项目](https://img.shields.io/badge/Project-27AE60?style=flat) | 对当前更改运行针对性的安全审查 |
| `/status` | ![上下文](https://img.shields.io/badge/Context-8E44AD?style=flat) | 显示简洁的会话状态摘要 |
| `/stats` | ![上下文](https://img.shields.io/badge/Context-8E44AD?style=flat) | 可视化每日使用量、会话历史、连续使用天数和模型偏好 |
| `/statusline` | ![配置](https://img.shields.io/badge/Config-F39C12?style=flat) | 设置 Claude Code 的状态栏 UI |
| `/stickers` | ![配置](https://img.shields.io/badge/Config-F39C12?style=flat) | 选择 UI 中显示的贴纸包 |
| `/tasks` | ![调试](https://img.shields.io/badge/Debug-E74C3C?style=flat) | 列出和管理后台任务 |
| `/terminal-setup` | ![配置](https://img.shields.io/badge/Config-F39C12?style=flat) | 在 IDE 终端中启用 shift+enter 换行 |
| `/theme` | ![配置](https://img.shields.io/badge/Config-F39C12?style=flat) | 更改颜色主题 |
| `/usage` | ![上下文](https://img.shields.io/badge/Context-8E44AD?style=flat) | 显示计划使用限制和速率限制状态（仅限订阅计划） |
| `/vim` | ![配置](https://img.shields.io/badge/Config-F39C12?style=flat) | 启用 vim 风格编辑模式 |

打包的技能如 `/debug` 也可能出现在斜杠命令菜单中，但它们不是内置命令。

### 本仓库中的命令

此项目在 `.claude/commands/` 中定义的自定义命令：

| 命令 | 描述 | 模型 |
|---------|-------------|-------|
| [`weather-orchestrator`](../.claude/commands/weather-orchestrator.md) | 获取迪拜天气数据并创建 SVG 天气卡片 | haiku |
| [`workflows/best-practice/workflow-claude-settings`](../.claude/commands/workflows/best-practice/workflow-claude-settings.md) | 跟踪 Claude Code 设置报告变更并查找需要更新的内容 | — |
| [`workflows/best-practice/workflow-claude-subagents`](../.claude/commands/workflows/best-practice/workflow-claude-subagents.md) | 跟踪 Claude Code 子代理报告变更并查找需要更新的内容 | — |
| [`workflows/best-practice/workflow-concepts`](../.claude/commands/workflows/best-practice/workflow-concepts.md) | 使用最新的 Claude Code 功能和概念更新 README CONCEPTS 部分 | — |

---

## 来源

- [Claude Code 斜杠命令](https://code.claude.com/docs/en/slash-commands)
- [Claude Code 交互模式](https://code.claude.com/docs/en/interactive-mode)
- [Claude Code 变更日志](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)