# 子代理实现

![最后更新](https://img.shields.io/badge/Last_Updated-Mar_02%2C_2026_07%3A59_PM_PKT-white?style=flat&labelColor=555)

<table width="100%">
<tr>
<td><a href="../">← 返回 Claude Code 最佳实践</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<a href="#weather-agent"><img src="../!/tags/implemented-hd.svg" alt="已实现"></a>

天气代理在本仓库中作为 **Command → Agent → Skill** 架构模式的示例实现，演示了两种不同的技能模式。

---

## Weather Agent

**文件**：[`.claude/agents/weather-agent.md`](../.claude/agents/weather-agent.md)

```yaml
---
name: weather-agent
description: 当需要获取迪拜（阿联酋）天气数据时主动使用此代理。
  该代理使用预加载的 weather-fetcher 技能从 Open-Meteo 获取实时温度。
tools: WebFetch, Read, Write, Edit
model: sonnet
color: green
maxTurns: 5
permissionMode: acceptEdits
memory: project
skills:
  - weather-fetcher
---

# Weather Agent

你是一个专门获取迪拜（阿联酋）天气数据的天气代理。

## 你的任务

按照预加载技能的指令执行天气工作流：

1. **获取**：按照 `weather-fetcher` 技能指令获取当前温度
2. **报告**：将温度值和单位返回给调用者
3. **记忆**：将读取详情更新到代理记忆中以进行历史追踪

...
```

该代理有一个预加载技能（`weather-fetcher`），提供从 Open-Meteo 获取数据的指令。它将温度值和单位返回给调用命令。

---

## ![如何使用](../!/tags/how-to-use.svg)

```bash
$ claude
> what is the weather in dubai?
```

---

## ![如何实现](../!/tags/how-to-implement.svg)

你可以使用 `/agents` 命令创建代理：
```bash
$ claude
> /agents
```

或者让 Claude 为你创建一个 —— 它会在 `.claude/agents/<name>.md` 中生成包含 YAML 前置字段和正文的 markdown 文件

---

<a href="https://github.com/shanraisshan/claude-code-best-practice#orchestration-workflow"><img src="../!/tags/orchestration-workflow-hd.svg" alt="编排工作流"></a>

天气代理是 Command → Agent → Skill 编排模式中的 **代理**。它从 `/weather-orchestrator` 命令接收工作流，使用预加载技能（`weather-fetcher`）获取温度。然后命令调用独立的 `weather-svg-creator` 技能创建可视化输出。

<p align="center">
  <img src="../orchestration-workflow/orchestration-workflow.svg" alt="命令技能代理架构流程" width="100%">
</p>

| 组件 | 角色 | 本仓库 |
|-----------|------|-----------|
| **命令** | 入口点，用户交互 | [`/weather-orchestrator`](../.claude/commands/weather-orchestrator.md) |
| **代理** | 使用预加载技能（代理技能）获取数据 | [`weather-agent`](../.claude/agents/weather-agent.md) 配合 [`weather-fetcher`](../.claude/skills/weather-fetcher/SKILL.md) |
| **技能** | 独立创建输出 | [`weather-svg-creator`](../.claude/skills/weather-svg-creator/SKILL.md) |