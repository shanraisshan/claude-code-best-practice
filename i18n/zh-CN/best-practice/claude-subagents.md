# 子代理最佳实践

![最后更新](https://img.shields.io/badge/Last_Updated-Mar%2007%2C%202026%203%3A14%20PM%20PKT-white?style=flat&labelColor=555)<br>
[![已实现](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../implementation/claude-subagents-implementation.md)

Claude Code 子代理 —— 前置字段和官方内置代理类型。

<table width="100%">
<tr>
<td><a href="../">← 返回 Claude Code 最佳实践</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 前置字段

| 字段 | 类型 | 必需 | 描述 |
|-------|------|----------|-------------|
| `name` | string | 是 | 使用小写字母和连字符的唯一标识符 |
| `description` | string | 是 | 何时调用。使用 `"PROACTIVELY"` 实现 Claude 自动调用 |
| `tools` | string/list | 否 | 逗号分隔的工具白名单（如 `Read, Write, Edit, Bash`）。省略则继承所有工具。支持 `Agent(agent_type)` 语法限制可生成的子代理；旧版 `Task(agent_type)` 别名仍然有效 |
| `disallowedTools` | string/list | 否 | 禁止的工具，从继承或指定列表中移除 |
| `model` | string | 否 | 模型别名：`haiku`、`sonnet`、`opus` 或 `inherit`（默认：`inherit`） |
| `permissionMode` | string | 否 | 权限模式：`default`、`acceptEdits`、`dontAsk`、`bypassPermissions` 或 `plan` |
| `maxTurns` | integer | 否 | 子代理停止前的最大代理轮数 |
| `skills` | list | 否 | 启动时预加载到代理上下文的技能名称（注入完整内容，不仅是可用） |
| `mcpServers` | list | 否 | 此子代理的 MCP 服务器 —— 服务器名称字符串或内联 `{name: config}` 对象 |
| `hooks` | object | 否 | 作用于该子代理的生命周期钩子。支持所有钩子事件；`PreToolUse`、`PostToolUse` 和 `Stop` 最常用 |
| `memory` | string | 否 | 持久记忆范围：`user`、`project` 或 `local` |
| `background` | boolean | 否 | 设为 `true` 始终作为后台任务运行（默认：`false`） |
| `isolation` | string | 否 | 设为 `"worktree"` 在临时 git worktree 中运行（无更改时自动清理） |
| `color` | string | 否 | CLI 输出颜色，用于视觉区分（如 `green`、`magenta`）。功能可用但未出现在官方前置字段表中 —— 仅在交互式快速入门中记录 |

---

![官方](../!/tags/official.svg)

| # | 代理 | 模型 | 工具 | 描述 |
|---|-------|-------|-------|-------------|
| 1 | `general-purpose` | inherit | 所有 | 复杂多步骤任务 —— 研究、代码搜索和自主工作的默认代理类型 |
| 2 | `Explore` | haiku | 只读（无 Write、Edit） | 快速代码库搜索和探索 —— 针对查找文件、搜索代码和回答代码库问题进行优化 |
| 3 | `Plan` | inherit | 只读（无 Write、Edit） | 计划模式下的预规划研究 —— 在编写代码前探索代码库并设计实现方案 |
| 4 | `Bash` | inherit | Bash | 在独立上下文中运行终端命令 |
| 5 | `statusline-setup` | sonnet | Read, Edit | 配置用户的 Claude Code 状态栏设置 |
| 6 | `claude-code-guide` | haiku | Glob, Grep, Read, WebFetch, WebSearch | 回答关于 Claude Code 功能、Agent SDK 和 Claude API 的问题 |

---

## 来源

- [创建自定义子代理 — Claude Code 文档](https://code.claude.com/docs/en/sub-agents)
- [CLI 参考 — Claude Code 文档](https://code.claude.com/docs/en/cli-reference)
- [Claude Code 变更日志](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)