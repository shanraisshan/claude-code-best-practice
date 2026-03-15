---
description: 追踪 Claude Code 设置报告更改并找出需要更新的内容
argument-hint: [要检查的版本数，默认 10]
---

# Workflow Changelog — Settings Report（设置报告）

你是 claude-code-best-practice 项目的协调员。你的工作是并行启动两个研究代理、等待结果、合并发现，并呈现关于**设置参考**报告（`best-practice/claude-settings.md`）漂移的统一报告。

**待检查版本：** `$ARGUMENTS`（如果为空或不是数字则默认：10）

这是一个**先读取后报告**的工作流。启动代理、合并结果并生成报告。仅在用户批准后采取行动。

---

## 阶段 0：并行启动两个代理

**立即**使用 Task 工具**在同一消息中**启动两个代理（并行启动）：

### Agent 1: workflow-claude-settings-agent

使用 `subagent_type: "workflow-claude-settings-agent"` 启动。给它以下提示：

> Research the claude-code-best-practice project for settings report drift. Check the last $ARGUMENTS versions (default: 10).
>
> Fetch these 3 external sources:
> 1. Settings Documentation: https://code.claude.com/docs/en/settings
> 2. CLI Reference: https://code.claude.com/docs/en/cli-reference
> 3. Changelog: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
>
> Then read the local report file (`best-practice/claude-settings.md`) and the CLAUDE.md file. Analyze differences between what the official docs say about settings keys, permission syntax, hook events, MCP configuration, sandbox options, plugin settings, model aliases, display settings, and environment variables versus what our report documents. Return a structured findings report covering missing settings, changed types/defaults, new settings additions, deprecated settings, permission syntax changes, hook event changes, MCP setting changes, sandbox setting changes, environment variable completeness, example accuracy, settings hierarchy accuracy, and sources validity.

### Agent 2: claude-code-guide

使用 `subagent_type: "claude-code-guide"` 启动。给它以下提示：

> Research the latest Claude Code settings system. I need you to find:
> 1. The complete list of all currently supported settings.json keys with their types, defaults, and descriptions
> 2. Any new settings keys introduced in recent Claude Code versions
> 3. Changes to existing settings behavior (e.g. new permission modes, new hook events, new sandbox options)
> 4. Changes to the settings hierarchy (new priority levels, new file locations)
> 5. Changes to permission syntax (new tool patterns, new wildcard behavior)
> 6. New hook events or changes to hook configuration structure
> 7. Changes to MCP server configuration (new matching fields, new settings)
> 8. Changes to sandbox settings (new network options, new commands)
> 9. Changes to plugin configuration (new fields, new marketplace options)
> 10. Changes to environment variables (new vars, deprecated vars, changed behavior)
> 11. Changes to model aliases or model configuration
> 12. Changes to display/UX settings (status line, spinners, progress bars)
> 13. Any deprecations or removals of settings keys
>
> Be thorough — search the web, fetch docs, and provide concrete version numbers and details for everything you find.

两个代理独立运行并返回其发现。

---

## 阶段 0.5：读取验证清单

**当代理运行时**，读取 `changelog/best-practice/claude-settings/verification-checklist.md`。此文件包含累积的验证规则 — 每个规则指定检查什么、在什么深度、以及与哪个源比较。每个规则必须在阶段 2 中执行。清单是项目的漂移检测回归测试套件。

---

## 阶段 1：读取以前的 Changelog 条目

**合并发现前**，读取文件 `changelog/best-practice/claude-settings/changelog.md` 获取最近 25 条 changelog 条目。每个条目由 `---` 分隔。从这些以前的条目中解析优先操作，以便与当前发现进行比较。这让你能识别：
- **重复项** — 以前出现过且仍未解决的问题
- **新解决的项** — 以前运行中的问题现已修复
- **新项** — 此次运行中首次出现的问题

---

## 阶段 2：合并发现并生成报告

**等待两个代理完成。** 一旦你有：
- **workflow-claude-settings-agent 发现** — 详细的报告分析，包含本地文件读取、外部文档获取和漂移检测
- **claude-code-guide 发现** — 关于最新 Claude Code 设置功能和更改的独立研究

交叉引用两者。专用代理提供报告特定的漂移分析，而 claude-code-guide 代理可能发现它遗漏的内容（例如非常最近的更改、未记录的功能或来自 web 搜索的上下文）。标记两者之间的任何矛盾，让用户解决。

**执行验证清单：** 对于 `changelog/best-practice/claude-settings/verification-checklist.md` 中的每个规则，以指定深度执行检查，使用代理发现作为源数据。在报告中包含**验证日志**部分，显示每个规则的结果：

```
Verification Log:
Rule # | Category              | Depth         | Result | Notes
1      | Settings Keys         | field-level   | PASS   | All keys match
2      | Permission Syntax     | content-match | FAIL   | New tool pattern added
...
```

**如果需要更新清单：** 如果发现揭示了现有清单规则未涵盖（或深度不足）的新类型漂移，向 `changelog/best-practice/claude-settings/verification-checklist.md` 追加新规则。规则必须包括：类别、检查什么、深度级别、与哪个源比较、添加日期和来源（什么错误促使此规则）。不要为不会重复的一次性问题添加规则。

还要将当前发现与以前的 changelog 条目（来自阶段 1）进行比较。对于每个优先操作，将其标记为：
- `NEW` — 此问题首次出现
- `RECURRING` — 在以前的运行中出现过且仍未解决（包括首次出现的运行日期）
- `RESOLVED` — 在以前的运行中出现过但现已修复（包括解决日期）

生成包含以下部分的结构化报告：

1. **新设置键** — 官方文档中存在但报告中缺失的键，及引入版本
2. **更改的设置行为** — 类型、默认值或描述已更改的设置
3. **弃用/移除的设置** — 报告中存在但官方文档中不再存在的设置
4. **权限语法更改** — 新工具模式、通配符行为或权限模式更改
5. **MCP 设置更改** — 新 MCP 配置键、匹配行为或服务器设置
6. **沙箱设置更改** — 新沙箱选项、网络设置或命令排除
7. **插件设置更改** — 新插件配置键或市场选项
8. **模型配置更改** — 新模型别名、努力级别或模型环境变量
9. **显示和 UX 更改** — 新状态栏字段、旋转器选项或显示设置
10. **环境变量完整性** — 官方文档中存在但报告中缺失的变量，或报告中存在但不再记录的变量
11. **设置层次结构准确性** — 验证优先级、文件位置和覆盖行为
12. **示例准确性** — 快速参考完整示例是否反映当前设置
13. **来源准确性** — 验证所有来源链接有效并指向正确的文档
14. **claude-code-guide 代理发现** — 该代理发现的专用代理未捕获的独特见解。仅包含添加新信息的发现。如果两个代理之间存在矛盾，标记它们让用户解决。不要列出"确认的一致"。

> **注意：** 与钩子相关的分析（事件、属性、匹配器、退出码、HTTP 钩子、钩子环境变量）在此工作流中**排除**。钩子在 [claude-code-voice-hooks](https://github.com/shanraisshan/claude-code-voice-hooks) 仓库中维护。

以优先的**行动项**摘要表结束。每个项目必须包含 `Status` 列，显示 `NEW`、`RECURRING (first seen: <date>)` 或 `RESOLVED`：

```
Priority Actions:
#  | Type                  | Action                                    | Status
1  | New Setting           | Add <key> to <section> table               | NEW
2  | Changed Behavior      | Update <key> description                   | NEW
3  | Deprecated Setting    | Remove <key> from table                    | RECURRING (first seen: 2026-03-05)
4  | Permission Syntax     | Add new tool pattern syntax                | NEW
5  | Env Variable          | Add <var> to environment variables table   | NEW
7  | Example Update        | Update Quick Reference example             | NEW
```

还包含**自上次运行以来已解决**部分，列出以前运行中不再是问题的任何项目。

---

## 阶段 2.5：将摘要追加到 Changelog

**此阶段是强制性的 — 始终在向用户展示报告之前执行。**

读取现有 `changelog/best-practice/claude-settings/changelog.md` 文件，然后**追加**（不要覆盖）一个新条目到末尾。条目格式必须精确为：

```markdown
---

## [<YYYY-MM-DD HH:MM AM/PM PKT>] Claude Code v<VERSION>

| # | Priority | Type | Action | Status |
|---|----------|------|--------|--------|
| 1 | HIGH/MED/LOW | <type> | <action description> | <status> |
| ... | ... | ... | ... | ... |
```

**状态格式 — 必须使用以下三种格式之一：**
- `COMPLETE (reason)` — 已采取行动并成功解决
- `INVALID (reason)` — 发现不正确、不适用或故意为之
- `ON HOLD (reason)` — 行动推迟，等待外部依赖或用户决定

`(reason)` 是强制性的，必须简要说明做了什么或原因。

**追加规则：**
- 始终追加 — 永远不要覆盖或替换以前的条目
- 日期和时间是命令在巴基斯坦标准时间（PKT, UTC+5）执行的时间；通过运行 `TZ=Asia/Karachi date "+%Y-%m-%d %I:%M %p PKT"` 获取。版本来自代理发现
- 如果 `changelog/best-practice/claude-settings/changelog.md` 不存在或为空，先创建状态图例表（见文件顶部），然后是第一个条目
- 每个条目由 `---` 分隔
- **仅包含 HIGH、MEDIUM 或 LOW 优先级的项目** — 省略 NONE 优先级项目（不需要行动的事项）

---

## 阶段 2.6：更新最后更新徽章

**此阶段是强制性的 — 始终在阶段 2.5 之后立即执行，在展示报告之前。**

更新 `best-practice/claude-settings.md` 顶部的"Last Updated"徽章。运行 `TZ=Asia/Karachi date "+%b %d, %Y %-I:%M %p PKT"` 获取时间，对其进行 URL 编码（空格为 `%20`，逗号为 `%2C`），并替换徽章中的日期部分。如果 Claude Code 版本已更改，也更新徽章中的版本。

**不要在 changelog 或报告中将徽章更新记录为行动项。** 徽章同步是每次运行的例行部分，不是发现。

---

## 阶段 2.7：验证所有超链接

**此阶段是强制性的 — 始终在阶段 2.6 之后执行，在展示报告之前。**

扫描 `best-practice/claude-settings.md` 中的每个超链接（markdown `[text](url)` 和内联 URL）。对于每个链接：

1. **本地文件链接**（相对路径）：使用 Read 工具验证文件在解析路径处存在。标记任何损坏的链接。
2. **外部 URL**（例如 `https://code.claude.com/docs/en/settings`）：使用 WebFetch 获取每个 URL 并验证它返回有效页面（不是 404 或重定向到错误页面）。标记任何死链或已移动的链接。
3. **锚点链接**（例如 `#section-name`）：验证目标标题在同一文件中存在。

在报告中包含**超链接验证日志**：

```
Hyperlink Validation Log:
#  | Type     | Link                                          | Status | Notes
1  | Local    | ../                                            | OK     |
2  | External | https://code.claude.com/docs/en/settings       | OK     |
3  | External | https://www.schemastore.org/claude-code-settings.json | BROKEN | 404
...
```

**如果有任何链接损坏**，将它们作为 HIGH 优先级行动项添加到报告中。损坏的链接会降低报告的有用性，必须在进行任何其他更改之前修复。

---

## 阶段 3：提供执行行动选项

展示报告后（并确认 changelog 和徽章都已更新），询问用户：

1. **执行所有行动** — 处理所有事项（添加缺失设置、更新描述、修复示例）
2. **执行特定行动** — 用户选择要执行的编号
3. **只保存报告** — 不做更改

执行时：
- **新设置**：添加到适当的章节表，包含正确的类型、默认值和描述
- **更改的行为**：更新表中设置的描述或默认值
- **弃用的设置**：移除前与用户确认
- **权限语法更改**：用新模式更新权限语法表
- **MCP 设置更改**：更新 MCP 设置部分
- **沙箱设置更改**：更新沙箱设置部分
- **插件设置更改**：更新插件设置部分
- **模型更改**：更新模型配置部分
- **显示更改**：更新显示和 UX 部分
- **环境变量更改**：在环境变量部分添加/更新/移除变量
- **设置层次结构更改**：更新设置层次结构表
- **示例更新**：更新快速参考完整示例以反映当前设置
- **损坏的链接**：修复或替换损坏的 URL
- 所有行动完成后，重新运行验证以确认一致性

---

## 关键规则

1. **在单条消息中并行启动两个代理** — 永远不要顺序启动
2. **生成报告前等待两个代理**
3. **永远不要猜测** 版本或日期 — 使用来自代理的数据
4. **新设置键是高优先级** — 它们需要表和示例更新
5. **交叉引用设置计数** — 每个表中的设置数量必须与官方文档匹配
6. **不要自动执行** — 始终先展示报告
7. **始终追加到 changelog** — 阶段 2.5 是强制性的。永远不要跳过。永远不要覆盖以前的条目。
8. **与以前的运行比较** — 读取 changelog 中最近 25 条条目，并将每个行动项标记为 NEW、RECURRING 或 RESOLVED。
9. **始终执行验证清单** — 读取 verification-checklist.md 并执行每个规则。在报告中包含验证日志。发现新类型漂移时追加新规则。
10. **清单规则只能追加** — 永远不要移除或削弱现有规则。只添加新规则或升级深度级别。
11. **始终更新最后更新徽章** — 阶段 2.6 是强制性的。永远不要跳过。
12. **始终验证所有超链接** — 阶段 2.7 是强制性的。永远不要跳过。损坏的链接是高优先级。
13. **环境变量分布在两个文件中** — `claude-settings.md` 拥有 `env` 可配置变量；`claude-cli-startup-flags.md` 拥有仅启动变量。如果环境变量属于 CLI 文件，不要将其标记为缺失。交叉引用 `best-practice/claude-cli-startup-flags.md` 验证所有权边界。
14. **验证设置层次结构** — 5 级覆盖链加上托管策略层必须与官方文档完全匹配。