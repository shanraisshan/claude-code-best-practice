# 技能最佳实践

![最后更新](https://img.shields.io/badge/Last_Updated-Mar_2%2C_2026-white?style=flat&labelColor=555)<br>
[![已实现](https://img.shields.io/badge/Implemented-2ea44f?style=flat)](../implementation/claude-skills-implementation.md)

Claude Code 技能完整参考 —— 技能定义、前置字段和调用模式。

<table width="100%">
<tr>
<td><a href="../">← 返回 Claude Code 最佳实践</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 前置字段

技能定义在 `.claude/skills/<name>/SKILL.md` 中，包含可选的 YAML 前置字段。

| 字段 | 类型 | 必需 | 描述 |
|-------|------|----------|-------------|
| `name` | string | 推荐 | 显示名称和 `/slash-command` 标识符。省略则默认为目录名 |
| `description` | string | 推荐 | 技能的功能。显示在自动补全中，并由 Claude 用于自动发现 |
| `argument-hint` | string | 否 | 自动补全过程中显示的提示（例如 `[issue-number]`、`[filename]`） |
| `disable-model-invocation` | boolean | 否 | 设为 `true` 阻止 Claude 自动调用此技能 |
| `user-invocable` | boolean | 否 | 设为 `false` 从 `/` 菜单隐藏 —— 技能变为仅作后台知识，用于代理预加载 |
| `allowed-tools` | string | 否 | 当此技能激活时，无需权限提示即可使用的工具 |
| `model` | string | 否 | 此技能运行时使用的模型（例如 `haiku`、`sonnet`、`opus`） |
| `context` | string | 否 | 设为 `fork` 在隔离的子代理上下文中运行技能 |
| `agent` | string | 否 | 设置 `context: fork` 时的子代理类型（默认：`general-purpose`） |
| `hooks` | object | 否 | 作用于该技能的生命周期钩子 |

---

## 两种技能模式

| 模式 | 加载方式 | 调用方式 | 用例 |
|---------|---------|-----------|----------|
| **技能** | 按需加载 | `/skill-name` 或 `Skill(skill: "name")` 工具 | 由命令或 Claude 调用的独立可复用工作流 |
| **代理技能** | 通过 `skills:` 字段在代理启动时预加载 | 自动 —— 完整内容注入代理上下文 | 内置到特定代理的领域知识或流程 |

---

## 字符串替换

技能 markdown 中可用的动态值变量：

| 变量 | 描述 |
|----------|-------------|
| `$ARGUMENTS` | 调用技能时传递的所有参数 |
| `$ARGUMENTS[N]` | 通过从 0 开始的索引访问特定参数 |
| `$N` | `$ARGUMENTS[N]` 的简写（例如 `$0`、`$1`） |
| `${CLAUDE_SESSION_ID}` | 当前会话标识符 |
| `` !`command` `` | 动态上下文注入 —— shell 命令的输出在 Claude 看到之前替换占位符 |

---

## 调用方式

| 方式 | 描述 |
|--------|-------------|
| `/skill-name` | 从斜杠命令菜单直接调用 |
| `/skill-name [args]` | 传递映射到 `$ARGUMENTS` 的参数 |
| `Skill(skill: "name")` | 通过 Skill 工具编程式调用（用于命令和代理中） |
| `skills: [name]` 在代理前置字段中 | 预加载到代理 —— 启动时注入完整技能内容，而非按需调用 |
| 子目录 | 子目录中的技能使用 `/subdir:skill-name` |

---

## 示例：最小技能

```yaml
---
description: 将暂存的更改总结为简洁的变更日志条目
---

将上下文中的 git diff 总结为一段式变更日志条目，
重点关注更改的内容和原因。
```

## 示例：最小代理技能

预加载到代理作为后台知识的技能 —— 从 `/` 菜单隐藏：

```yaml
---
name: deploy-checklist
description: 生产发布的部署前检查清单
user-invocable: false
---

# 部署检查清单

任何生产部署之前：
1. 运行所有测试：`npm test`
2. 检查未提交的更改：`git status`
3. 验证环境变量已设置
4. 确认数据库迁移已就绪
```

## 示例：完整功能技能（所有字段）

```yaml
---
name: code-review
description: 审查代码的质量、安全性和性能问题
argument-hint: [file-path]
allowed-tools: Read, Grep, Glob
model: sonnet
context: fork
agent: general-purpose
hooks:
  Stop:
    - hooks:
        - type: command
          command: "./scripts/log-review-complete.sh"
---

审查 $0 处的代码。

## 检查清单
- [ ] 安全性：注入、XSS、硬编码密钥
- [ ] 性能：N+1 查询、不必要的循环
- [ ] 质量：命名、复杂度、测试覆盖率
- [ ] 错误处理：边界情况、失败模式
```

---

## 作用域与优先级

当多个技能共享相同名称时，优先级较高的位置生效：

| 位置 | 作用域 | 优先级 |
|----------|-------|----------|
| 项目（`.claude/skills/`） | 仅此项目 | 1（最高） |
| 个人（`~/.claude/skills/`） | 所有你的项目 | 2 |
| 插件（`<plugin>/skills/`） | 启用插件的场所 | 3（最低） |

---

## 本仓库中的技能

此项目在 `.claude/skills/` 中定义的技能：

| 技能 | 用户可调用 | 预加载到 | 描述 |
|-------|----------------|----------------|-------------|
| [`weather-svg-creator`](../.claude/skills/weather-svg-creator/SKILL.md) | 是 | — | 创建 SVG 天气卡片并写入输出文件 |
| [`weather-fetcher`](../.claude/skills/weather-fetcher/SKILL.md) | 否 | `weather-agent` | 从 Open-Meteo 获取当前温度 |
| [`agent-browser`](../.claude/skills/agent-browser/SKILL.md) | 是 | — | AI 代理的浏览器自动化 CLI |
| [`presentation/vibe-to-agentic-framework`](../.claude/skills/presentation/vibe-to-agentic-framework/SKILL.md) | 是 | `presentation-curator` | 演示文稿背后的概念框架 |
| [`presentation/presentation-structure`](../.claude/skills/presentation/presentation-structure/SKILL.md) | 是 | `presentation-curator` | 幻灯片格式、权重系统和部分结构 |
| [`presentation/presentation-styling`](../.claude/skills/presentation/presentation-styling/SKILL.md) | 是 | `presentation-curator` | CSS 类、组件模式和语法高亮 |

---

## 来源

- [Claude Code 技能 — 文档](https://code.claude.com/docs/en/skills)
- [Monorepo 中的技能发现](../reports/claude-skills-for-larger-mono-repos.md)
- [Claude Code 变更日志](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)