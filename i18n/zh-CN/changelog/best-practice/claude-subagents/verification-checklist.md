# 验证清单 — Subagents 报告

规则随时间累积。每次 workflow-changelog 运行必须在指定深度执行所有规则。当发现现有规则应该捕获但未捕获（因为不存在或深度不足）的新类型偏差时，在此追加新规则。

## 深度级别

| 深度 | 含义 | 示例 |
|-------|---------|---------|
| `exists` | 检查节/表/文件是否存在 | "报告中是否有 Memory Scopes 表？" |
| `presence-check` | 检查特定项是否存在或缺失 | "`color` 字段是否在 Frontmatter Fields 表中？" |
| `content-match` | 逐词比较实际值与源文档 | "`model` 字段描述是否与官方文档匹配？" |
| `field-level` | 验证每个单独字段都已涵盖 | "官方文档中的每个 frontmatter 字段是否都出现在表中？" |
| `cross-file` | 相同值必须在多个文件中匹配 | "CLAUDE.md agent 部分是否与报告的字段列表匹配？" |

---

## 1. Frontmatter 字段表

验证 Frontmatter Fields 表与官方文档的规则。

| # | 类别 | 检查 | 深度 | 对比来源 | 添加日期 | 来源 |
|---|----------|-------|-------|-----------------|-------|--------|
| 1A | 字段完整性 | 对于官方文档中的每个 agent frontmatter 字段，验证它出现在报告的 Frontmatter Fields 表中 | field-level | sub-agents 参考页面 | 2026-02-28 | 初始清单 — 确保不遗漏新字段 |
| 1B | 字段类型 | 对于表中的每个字段，验证 Type 列与官方文档匹配 | content-match | sub-agents 参考页面 | 2026-02-28 | 初始清单 — 类型不匹配会导致用户困惑 |
| 1C | 必填状态 | 对于每个字段，验证 Required 列与官方文档匹配 | content-match | sub-agents 参考页面 | 2026-02-28 | 初始清单 — 错误必填状态会导致 agent 损坏 |
| 1D | 字段描述 | 对于每个字段，验证 Description 列准确反映官方文档行为 | content-match | sub-agents 参考页面 | 2026-02-28 | 初始清单 — 过时描述会误导用户 |

---

## 2. Memory Scopes

验证 Memory Scopes 表的规则。

| # | 类别 | 检查 | 深度 | 对比来源 | 添加日期 | 来源 |
|---|----------|-------|-------|-----------------|-------|--------|
| 2A | 作用域完整性 | 验证官方文档中的所有 memory scopes 都出现在 Memory Scopes 表中 | field-level | sub-agents 参考页面 | 2026-02-28 | 初始清单 — 可能添加新作用域 |
| 2B | 存储位置 | 对于每个作用域，验证 Storage Location 列与官方文档匹配 | content-match | sub-agents 参考页面 | 2026-02-28 | 初始清单 — 错误路径会导致数据丢失 |

---

## 3. 示例

验证示例准确性的规则。

| # | 类别 | 检查 | 深度 | 对比来源 | 添加日期 | 来源 |
|---|----------|-------|-------|-----------------|-------|--------|
| 3A | 最小示例 | 验证最小示例仅使用必填字段且语法有效 | content-match | sub-agents 参考页面 | 2026-02-28 | 初始清单 — 最小示例应保持最小 |
| 3B | 完整功能示例 | 验证完整功能示例展示所有可用的 frontmatter 字段 | field-level | sub-agents 参考页面 | 2026-02-28 | 初始清单 — 完整示例必须展示每个字段 |

---

## 4. 作用域与优先级

验证作用域和优先级信息的规则。

| # | 类别 | 检查 | 深度 | 对比来源 | 添加日期 | 来源 |
|---|----------|-------|-------|-----------------|-------|--------|
| 4A | 优先级顺序 | 验证 Scope and Priority 表按正确优先级顺序列出所有 agent 位置 | content-match | sub-agents 参考页面 + CLI 参考页面 | 2026-02-28 | 初始清单 — 错误优先级顺序会导致解析错误 |
| 4B | 调用方法 | 验证调用方法表列出 CLI reference 和 sub-agents 文档中的所有调用方法，包括 `--agent`（单数）、`--agents`（复数）、`/agents`、`claude agents`、Agent 工具和 agent 恢复 | field-level | CLI 参考页面 + sub-agents 参考页面 | 2026-03-07 | `--agent` CLI 标志在调用表中缺失 — 这是一种独特的调用方法，用于将 Claude 作为特定 agent 运行 |

---

## 5. 跨文件一致性

验证报告与其他仓库文件一致性的规则。

| # | 类别 | 检查 | 深度 | 对比来源 | 添加日期 | 来源 |
|---|----------|-------|-------|-----------------|-------|--------|
| 5A | CLAUDE.md 同步 | 验证 CLAUDE.md 的 Subagent Definition Structure 部分列出与报告 Frontmatter Fields 表相同的字段 | cross-file | CLAUDE.md vs 报告 | 2026-02-28 | 初始清单 — CLAUDE.md 可能与报告产生偏差 |

---

## 6. 流程

关于工作流验证流程本身的元规则。

| # | 类别 | 检查 | 深度 | 对比来源 | 添加日期 | 来源 |
|---|----------|-------|-------|-----------------|-------|--------|
| 6A | 来源可信度守护 | 只有经官方来源（sub-agents 参考页面、CLI 参考页面、GitHub changelog）确认的项目才标记为偏差。第三方博客来源可能过时或错误 — 仅用于线索，标记前必须对照官方文档验证 | content-match | 仅官方文档 | 2026-02-28 | 采纳自 voice-hooks 工作流 — 防止博客来源的误报 |

---

## 7. Agent 表

验证 Official Claude Agents 和 Agents in This Repository 表的规则。

| # | 类别 | 检查 | 深度 | 对比来源 | 添加日期 | 来源 |
|---|----------|-------|-------|-----------------|-------|--------|
| 7A | 内置 Agent 完整性 | 验证 "Official Claude Agents" 表列出所有内置 agent 类型，并具有正确的 model、tools 和 description | field-level | sub-agents 参考页面 + changelog | 2026-02-28 | 报告仅包含 5 个内置 agent 中的 3 个 — 缺少 `claude-code-guide` 和 `statusline-setup` |
| 7B | 仓库 Agent 完整性 | 扫描 `.claude/agents/**/*.md` 并验证每个 agent 文件出现在 "Agents in This Repository" 表中，并具有正确的 model、color、tools、skills 和 memory 列 | field-level | `.claude/agents/**/*.md` 文件 frontmatter | 2026-02-28 | 仓库 agent 手动维护 — 添加到仓库的新 agent 未反映在报告中 |
| 7C | 仓库 Agent 链接 | 验证 "Agents in This Repository" 表中的每个 agent 名称都有可点击链接，链接解析到正确的 `.md` 文件 | exists | 从 `best-practice/` 解析的文件路径 | 2026-02-28 | Agent 名称已可点击 — 文件移动后链接必须保持有效 |

---

## 8. 超链接

验证报告中所有超链接有效的规则。

| # | 类别 | 检查 | 深度 | 对比来源 | 添加日期 | 来源 |
|---|----------|-------|-------|-----------------|-------|--------|
| 8A | 本地文件链接 | 验证所有相对文件链接（如 `../.claude/agents/weather-agent.md`）解析到现有文件 | exists | 本地文件系统 | 2026-02-28 | 文件移动（reports/ → best-practice/）破坏了相对链接 — 必须捕获未来的破坏 |
| 8B | 外部 URL 链接 | 验证所有外部 URL（如 `https://code.claude.com/docs/en/sub-agents`）返回有效页面 | exists | HTTP 响应 | 2026-02-28 | 外部文档页面可能被重构或删除 — 每次运行必须验证 |
| 8C | 跨文件引用链接 | 验证指向其他报告文件的链接（如 `../reports/claude-agent-memory.md`）解析到现有文件 | exists | 本地文件系统 | 2026-02-28 | 报告可能被移动或重命名 — 交叉引用必须保持同步 |