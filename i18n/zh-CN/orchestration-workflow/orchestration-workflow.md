# 编排工作流

本文档描述 **命令 → 代理（含技能）→ 技能** 编排工作流，通过天气数据获取和 SVG 渲染系统进行演示。

<table width="100%">
<tr>
<td><a href="../">← 返回 Claude Code 最佳实践</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

## 系统概述

天气系统在单一编排工作流中演示了两种不同的技能模式：
- **代理技能**（预加载）：`weather-fetcher` 在启动时作为领域知识注入到 `weather-agent` 中
- **技能**（独立）：`weather-svg-creator` 通过 Skill 工具由命令直接调用

这展示了 **命令 → 代理 → 技能** 架构模式，其中：
- 命令编排工作流并处理用户交互
- 代理使用预加载技能获取数据
- 技能独立创建可视化输出

## 流程图

```
╔══════════════════════════════════════════════════════════════════╗
║                      编排工作流                                   ║
║              命令  →  代理  →  技能                               ║
╚══════════════════════════════════════════════════════════════════╝

                         ┌───────────────────┐
                         │    用户交互       │
                         └─────────┬─────────┘
                                   │
                                   ▼
         ┌─────────────────────────────────────────────────────┐
         │  /weather-orchestrator — 命令（入口点）              │
         └─────────────────────────┬───────────────────────────┘
                                   │
                              步骤 1
                                   │
                                   ▼
                      ┌────────────────────────┐
                      │  AskUser — 摄氏度还是华氏度？│
                      └────────────┬───────────┘
                                   │
                         步骤 2 — Agent 工具
                                   │
                                   ▼
         ┌─────────────────────────────────────────────────────┐
         │  weather-agent — 代理 ● 技能: weather-fetcher       │
         └─────────────────────────┬───────────────────────────┘
                                   │
                          返回: 温度 + 单位
                                   │
                         步骤 3 — Skill 工具
                                   │
                                   ▼
         ┌─────────────────────────────────────────────────────┐
         │  weather-svg-creator — 技能 ● SVG 卡片 + 输出       │
         └─────────────────────────┬───────────────────────────┘
                                   │
                          ┌────────┴────────┐
                          │                 │
                          ▼                 ▼
                   ┌────────────┐    ┌────────────┐
                   │weather.svg │    │ output.md  │
                   └────────────┘    └────────────┘
```

## 组件详情

### 1. 命令

#### `/weather-orchestrator`（命令）
- **位置**：`.claude/commands/weather-orchestrator.md`
- **用途**：入口点 — 编排工作流并处理用户交互
- **操作**：
  1. 询问用户温度单位偏好（摄氏度/华氏度）
  2. 通过 Agent 工具调用 weather-agent
  3. 通过 Skill 工具调用 weather-svg-creator
- **模型**：haiku

### 2. 含预加载技能的代理（代理技能）

#### `weather-agent`（代理）
- **位置**：`.claude/agents/weather-agent.md`
- **用途**：使用预加载技能获取天气数据
- **技能**：`weather-fetcher`（预加载为领域知识）
- **可用工具**：WebFetch, Read
- **模型**：sonnet
- **颜色**：green
- **记忆**：project

代理在启动时将 `weather-fetcher` 预加载到其上下文中。它按照技能指令获取温度并将值返回给命令。

### 3. 技能

#### `weather-svg-creator`（技能）
- **位置**：`.claude/skills/weather-svg-creator/SKILL.md`
- **用途**：创建可视化的 SVG 天气卡片并写入输出文件
- **调用方式**：通过 Skill 工具由命令调用（未预加载到任何代理中）
- **输出**：
  - `orchestration-workflow/weather.svg` — SVG 天气卡片
  - `orchestration-workflow/output.md` — 天气摘要

### 4. 预加载技能

#### `weather-fetcher`（技能）
- **位置**：`.claude/skills/weather-fetcher/SKILL.md`
- **用途**：获取实时温度数据的指令
- **数据源**：迪拜（阿联酋）的 Open-Meteo API
- **输出**：温度值和单位（摄氏度或华氏度）
- **注意**：这是一个代理技能 — 预加载到 `weather-agent` 中，而非直接调用

## 执行流程

1. **用户调用**：用户运行 `/weather-orchestrator` 命令
2. **用户提示**：命令询问用户首选温度单位（摄氏度/华氏度）
3. **代理调用**：命令通过 Agent 工具调用 `weather-agent`
4. **技能执行**（在代理上下文内）：
   - 代理按照 `weather-fetcher` 技能指令从 Open-Meteo 获取温度
   - 代理将温度值和单位返回给命令
5. **SVG 创建**：命令通过 Skill 工具调用 `weather-svg-creator`
   - 技能在 `orchestration-workflow/weather.svg` 创建 SVG 天气卡片
   - 技能将摘要写入 `orchestration-workflow/output.md`
6. **结果显示**：向用户显示摘要，包含：
   - 请求的温度单位
   - 获取的温度值
   - SVG 卡片位置
   - 输出文件位置

## 示例执行

```
输入: /weather-orchestrator
├─ 步骤 1: 询问：摄氏度还是华氏度？
│  └─ 用户：摄氏度
├─ 步骤 2: Agent 工具 → weather-agent
│  ├─ 预加载技能:
│  │  └─ weather-fetcher（领域知识）
│  ├─ 从 Open-Meteo 获取 → 26°C
│  └─ 返回: temperature=26, unit=Celsius
├─ 步骤 3: Skill 工具 → /weather-svg-creator
│  ├─ 创建: orchestration-workflow/weather.svg
│  └─ 写入: orchestration-workflow/output.md
└─ 输出:
   ├─ 单位: 摄氏度
   ├─ 温度: 26°C
   ├─ SVG: orchestration-workflow/weather.svg
   └─ 摘要: orchestration-workflow/output.md
```

## 关键设计原则

1. **两种技能模式**：演示代理技能（预加载）和技能（直接调用）
2. **命令作为编排者**：命令处理用户交互并协调工作流
3. **代理负责数据获取**：代理使用预加载技能获取数据，然后返回
4. **技能负责输出**：SVG 创建器独立运行，从命令上下文接收数据
5. **清晰分离**：获取（代理）→ 渲染（技能）— 每个组件有单一职责

## 架构模式

### 代理技能（预加载）

```yaml
# 在代理定义中 (.claude/agents/weather-agent.md)
---
name: weather-agent
skills:
  - weather-fetcher    # 启动时预加载到代理上下文
---
```

- **技能被预加载**：完整技能内容在启动时注入代理上下文
- **代理使用技能知识**：代理按照预加载技能的指令执行
- **无动态调用**：技能是参考材料，不单独调用

### 技能（直接调用）

```yaml
# 在技能定义中 (.claude/skills/weather-svg-creator/SKILL.md)
---
name: weather-svg-creator
description: 创建 SVG 天气卡片...
---
```

- **通过 Skill 工具调用**：命令调用 `Skill(skill: "weather-svg-creator")`
- **独立执行**：在命令上下文中运行，而非代理内
- **从上下文接收数据**：使用对话中已有的温度数据