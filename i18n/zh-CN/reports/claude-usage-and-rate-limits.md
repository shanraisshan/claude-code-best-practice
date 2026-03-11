# Claude Code: 使用量、速率限制与额外用量

了解 Claude Code 中的使用限制如何工作，以及如何在达到限制时继续工作。

<table width="100%">
<tr>
<td><a href="../">← 返回 Claude Code 最佳实践</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## 概述

订阅计划（Pro、Max 5x、Max 20x）上的 Claude Code 有使用限制，在滚动窗口内重置。三个内置斜杠命令帮助你监控和管理使用量：

| 命令 | 描述 | 可用于 |
|---------|-------------|--------------|
| `/usage` | 检查计划限制和速率限制状态 | Pro、Max 5x、Max 20x |
| `/extra-usage` | 配置达到限制时的按需付费溢出计费 | Pro、Max 5x、Max 20x |
| `/cost` | 显示当前会话的 Token 使用量和花费 | API 密钥用户 |

---

## `/usage` — 检查你的限制

显示你当前计划的使用限制和速率限制状态。用于在达到限制前检查还有多少容量。

---

## `/extra-usage` — 超过限制后继续工作

`/extra-usage` 命令配置**按需付费溢出计费**，这样当你达到计划的速率限制时，Claude Code 会无缝继续工作，而不是阻止你。

### 工作原理

1. 你达到计划的速率限制（限制每 5 小时重置）
2. 如果额外用量已启用且有可用资金，Claude Code 无中断继续
3. 溢出 Token 按**标准 API 费率**计费，与订阅费用分开

### 设置

CLI 中的 `/extra-usage` 命令会引导你完成配置。你也可以在 claude.ai 的 **Settings > Usage** 网页上配置：

1. 启用额外用量
2. 添加支付方式
3. 设置**月度消费上限**（或选择无限制）
4. 可选添加**预付资金**，当余额低于阈值时自动充值

### 关键详情

| 详情 | 值 |
|--------|-------|
| 每日兑换限制 | $2,000/天 |
| 计费 | 与订阅分开，按标准 API 费率 |
| 限制重置窗口 | 每 5 小时 |

### 已知问题

截至 2026 年 2 月，`/extra-usage` CLI 命令[未记录](https://github.com/anthropics/claude-code/issues/12396)，可能会打开登录窗口但没有清晰的配置选项。目前通过 **claude.ai 网页界面**配置是更可靠的途径。

---

## `/cost` — 会话花费（API 用户）

对于使用 API 密钥认证的用户（非订阅计划），`/cost` 显示：

- 当前会话的总成本
- API 时长和实际耗时
- Token 使用分解
- 所做的代码更改

此命令与 Pro/Max 订阅用户无关。

---

## 快速模式和额外用量

快速模式（`/fast`）使用输出更快的 Claude Opus 4.6。它与额外用量有特殊的计费关系：

- 快速模式使用量**始终从第一个 Token 就计费到额外用量**
- 即使你的订阅计划还有剩余使用量也是如此
- 快速模式不消耗你计划的包含速率限制

这意味着你需要启用并充值额外用量才能使用 `/fast`。

---

## CLI 启动标志

两个启动标志与使用预算相关（仅限 API 密钥用户，打印模式）：

| 标志 | 描述 |
|------|-------------|
| `--max-budget-usd <金额>` | 停止前 API 调用的最大美元金额 |
| `--max-turns <次数>` | 限制 Agent 转数 |

完整列表请参阅 [CLI 启动标志参考](claude-cli-startup-flags.md)。

---

## 来源

- [Extra usage for paid Claude plans — Claude Help Center](https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans)
- [Using Claude Code with your Pro or Max plan — Claude Help Center](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)
- [/extra-usage slash command is undocumented — GitHub Issue #12396](https://github.com/anthropics/claude-code/issues/12396)
- [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)