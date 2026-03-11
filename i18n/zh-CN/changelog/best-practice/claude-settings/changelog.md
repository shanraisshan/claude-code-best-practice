# Settings 报告 — 变更日志历史

## 状态图例

| 状态 | 含义 |
|--------|---------|
| COMPLETE (reason) | 已执行操作并成功解决 |
| INVALID (reason) | 发现不正确、不适用或故意为之 |
| ON HOLD (reason) | 操作延迟 — 等待外部依赖或用户决策 |

---

## [2026-03-05 06:18 AM PKT] Claude Code v2.1.69

| # | 优先级 | 类型 | 操作 | 状态 |
|---|----------|------|--------|--------|
| 1 | HIGH | 缺失设置 | 添加 13 个非 hook 缺失设置键（`$schema`、`availableModels`、`fastModePerSessionOptIn`、`teammateMode`、`prefersReducedMotion`、`sandbox.filesystem.*`、`sandbox.network.allowManagedDomainsOnly`、`sandbox.enableWeakerNetworkIsolation`、`allowManagedMcpServersOnly`、`blockedMarketplaces`、`includeGitInstructions`、`pluginTrustMessage`、`fileSuggestion` 表项） | COMPLETE (已添加到报告) |
| 2 | HIGH | 缺失环境变量 | 添加缺失的环境变量，包括 `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING`、`CLAUDE_CODE_DISABLE_1M_CONTEXT`、`CLAUDE_CODE_ACCOUNT_UUID`、`CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS`、`ENABLE_CLAUDEAI_MCP_SERVERS` 等 | COMPLETE (已添加 13 个缺失环境变量到报告) |
| 3 | HIGH | Effort 默认值 | 更新 effort 级别默认值从 "High" 到 "Medium"（适用于 Max/Team 订阅者）；添加 Sonnet 4.6 支持（v2.1.68 变更） | COMPLETE (已更新默认值并添加 Sonnet 说明) |
| 4 | MED | 设置层级 | 添加通过 macOS plist/Windows Registry 的托管设置（v2.1.61/v2.1.69）；记录跨作用域的数组合并行为 | COMPLETE (已添加 plist/registry 和合并说明) |
| 5 | MED | 沙盒文件系统 | 添加 `sandbox.filesystem.allowWrite`、`denyWrite`、`denyRead` 及路径前缀语义（`//`、`~/`、`/`、`./`） | COMPLETE (已添加到沙盒表) |
| 6 | MED | 权限语法 | 添加 `Agent(name)` 权限模式；记录 `MCP(server:tool)` 语法形式 | COMPLETE (已添加到工具语法表) |
| 7 | MED | 插件缺口 | 添加 `blockedMarketplaces`、`pluginTrustMessage` | COMPLETE (已添加到插件表) |
| 8 | MED | 模型配置 | 添加 `availableModels` 设置 | COMPLETE (已添加到通用设置表) |
| 9 | MED | 可疑键 | 验证 `sandbox.network.deniedDomains`、`sandbox.ignoreViolations`、`pluginConfigs` — 存在于报告中但不在官方文档中 | ON HOLD (保留在报告中待验证) |
| 10 | LOW | 标题计数 | 更新标题从 "38 settings and 84 env vars" 以反映实际数量（约 55+ 设置，约 110+ 环境变量） | COMPLETE (已更新标题) |
| 11 | LOW | CLAUDE.md 同步 | 更新 CLAUDE.md 配置层级（添加托管/CLI/用户级别） | ON HOLD (等待用户批准) |
| 12 | LOW | 示例更新 | 更新快速参考示例，添加 `$schema`、沙盒文件系统、`Agent(*)`，移除 hooks 示例 | COMPLETE (已更新示例) |
| 13 | MED | Hooks 重定向 | 用重定向到 claude-code-voice-hooks 仓库替换 hooks 部分 | COMPLETE (hooks 已外部化到专用仓库) |

---

## [2026-03-07 02:17 PM PKT] Claude Code v2.1.71

| # | 优先级 | 类型 | 操作 | 状态 |
|---|----------|------|--------|--------|
| 1 | HIGH | 行为变更 | 修复 `teammateMode`：类型 `boolean` → `string`，默认值 `false` → `"auto"`，描述 → "Agent team display: auto, in-process, tmux" | COMPLETE (类型、默认值和描述已更新) |
| 2 | HIGH | 新设置 | 添加 `allowManagedPermissionRulesOnly` 到权限表（布尔值，仅托管） | COMPLETE (已添加到权限键表) |
| 3 | HIGH | 缺失环境变量 | 添加约 31 个缺失环境变量，包括已确认的（`CLAUDE_CODE_MAX_OUTPUT_TOKENS`、`CLAUDE_CODE_DISABLE_FAST_MODE`、`CLAUDE_CODE_DISABLE_AUTO_MEMORY`、`CLAUDE_CODE_USER_EMAIL`、`CLAUDE_CODE_ORGANIZATION_UUID`、`CLAUDE_CONFIG_DIR`）和 agent 报告的（Foundry、Bedrock、mTLS、shell 前缀等） | COMPLETE (已添加 31 个环境变量到表) |
| 4 | MED | 默认值变更 | 修复 `plansDirectory` 默认值从 `.claude/plans/` 到 `~/.claude/plans` | COMPLETE (默认值已更新) |
| 5 | MED | 描述变更 | 修复 `sandbox.enableWeakerNetworkIsolation` 描述为 "(macOS only) Allow access to system TLS trust; reduces security" | COMPLETE (描述已更新) |
| 6 | MED | 作用域修复 | 修复 `extraKnownMarketplaces` 作用域从 "Any" 到 "Project" | COMPLETE (作用域和描述已更新) |
| 7 | MED | 边界违规 | 在 `claude-cli-startup-flags.md` 中用交叉引用到设置报告替换 `CLAUDE_CODE_EFFORT_LEVEL` | COMPLETE (已替换为链接) |
| 8 | MED | 版本徽章 | 更新报告版本从 v2.1.69 到 v2.1.71 | COMPLETE (徽章和标题已更新) |
| 9 | LOW | 可疑键 | 验证 `skipWebFetchPreflight`、`sandbox.ignoreViolations`、`sandbox.network.deniedDomains`、`skippedMarketplaces`、`skippedPlugins`、`pluginConfigs` | ON HOLD (保留在报告中待验证 — 从 2026-03-05 反复出现) |
| 10 | LOW | CLAUDE.md 同步 | 更新 CLAUDE.md 配置层级（3 级 → 5+） | COMPLETE (已更新为带托管层的 5 级层级) |