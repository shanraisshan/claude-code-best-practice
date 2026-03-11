---
name: weather-svg-creator
description: 创建显示迪拜当前温度的 SVG 天气卡片。将 SVG 写入 orchestration-workflow/weather.svg 并更新 orchestration-workflow/output.md。
---

# Weather SVG Creator Skill（天气 SVG 创建技能）

此技能创建可视化的 SVG 天气卡片并写入输出文件。

## 任务

创建显示迪拜（阿联酋）温度的 SVG 天气卡片，并将其与摘要一起写入输出文件。

## 指令

你将从调用上下文接收温度值和单位（摄氏度或华氏度）。

### 1. 创建 SVG 天气卡片

生成具有以下结构的简洁 SVG 天气卡片：

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 160" width="300" height="160">
  <rect width="300" height="160" rx="12" fill="#1a1a2e"/>
  <text x="150" y="45" text-anchor="middle" fill="#8892b0" font-family="system-ui" font-size="14">Unit: [Celsius/Fahrenheit]</text>
  <text x="150" y="100" text-anchor="middle" fill="#ccd6f6" font-family="system-ui" font-size="42" font-weight="bold">[value]°[C/F]</text>
  <text x="150" y="140" text-anchor="middle" fill="#64ffda" font-family="system-ui" font-size="16">Dubai, UAE</text>
</svg>
```

将 `[Celsius/Fahrenheit]`、`[value]` 和 `[C/F]` 替换为实际值。

### 2. 写入 SVG 文件

首先，读取现有的 `orchestration-workflow/weather.svg` 文件（如果存在）。然后将 SVG 内容写入 `orchestration-workflow/weather.svg`。

### 3. 写入输出摘要

首先，读取现有的 `orchestration-workflow/output.md` 文件（如果存在）。然后写入 `orchestration-workflow/output.md`：

```markdown
# Weather Result

## Temperature
[value]°[C/F]

## Location
Dubai, UAE

## Unit
[Celsius/Fahrenheit]

## SVG Card
![Weather Card](weather.svg)
```

## 预期输入

来自 weather-agent 的温度值和单位：
```
Temperature: [X]°[C/F]
Unit: [Celsius/Fahrenheit]
```

## 注意事项

- 使用提供的精确温度值和单位 — 不要重新获取或修改
- SVG 应该是一个自包含的有效 SVG 文件
- 保持设计简洁
- 两个输出文件都放在 `orchestration-workflow/` 目录中