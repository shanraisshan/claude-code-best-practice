---
description: 获取迪拜天气数据并创建 SVG 天气卡片
model: haiku
---

# Weather Orchestrator Command（天气编排命令）

获取迪拜（阿联酋）当前温度并创建可视化的 SVG 天气卡片。

## 工作流

### 步骤 1：询问用户偏好

使用 AskUserQuestion 工具询问用户希望温度以摄氏度还是华氏度显示。

### 步骤 2：获取天气数据

使用 Task 工具调用天气代理：
- subagent_type: weather-agent
- description: Fetch Dubai weather data
- prompt: Fetch the current temperature for Dubai, UAE in [unit requested by user]. Return the numeric temperature value and unit. The agent has a preloaded skill (weather-fetcher) that provides the detailed instructions.
- model: haiku

等待代理完成并获取返回的温度值和单位。

### 步骤 3：创建 SVG 天气卡片

使用 Skill 工具调用 weather-svg-creator 技能：
- skill: weather-svg-creator

技能将使用步骤 2 中的温度值和单位（在当前上下文中可用）创建 SVG 卡片并写入输出文件。

## 关键要求

1. **使用 Task 工具调用代理**：不要使用 bash 命令调用代理。必须使用 Task 工具。
2. **使用 Skill 工具调用 SVG 创建器**：通过 Skill 工具调用 SVG 创建器，而不是 Task 工具。
3. **传递用户偏好**：调用代理时包含用户的温度单位偏好。
4. **顺序流程**：完成每一步后再进入下一步。

## 输出摘要

向用户提供清晰的摘要，显示：
- 请求的温度单位
- 从迪拜获取的温度
- SVG 卡片创建于 `orchestration-workflow/weather.svg`
- 摘要写入 `orchestration-workflow/output.md`