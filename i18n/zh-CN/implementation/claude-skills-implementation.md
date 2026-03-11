# 技能实现

![最后更新](https://img.shields.io/badge/Last_Updated-Mar_02%2C_2026-white?style=flat&labelColor=555)

<table width="100%">
<tr>
<td><a href="../">← 返回 Claude Code 最佳实践</a></td>
<td align="right"><img src="../!/claude-jumping.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<a href="#weather-svg-creator"><img src="../!/tags/implemented-hd.svg" alt="已实现"></a>

本仓库实现了两个技能作为 **Command → Agent → Skill** 架构模式的一部分，演示了两种不同的技能调用模式：**代理技能**（预加载）和**技能**（直接调用）。

---

## Weather SVG Creator（技能）

**文件**：[`.claude/skills/weather-svg-creator/SKILL.md`](../.claude/skills/weather-svg-creator/SKILL.md)

```yaml
---
name: weather-svg-creator
description: 创建显示迪拜当前温度的 SVG 天气卡片。
  将 SVG 写入 orchestration-workflow/weather.svg 并更新
  orchestration-workflow/output.md。
---

# Weather SVG Creator 技能

此技能创建可视化的 SVG 天气卡片并写入输出文件。

## 任务
创建显示迪拜（阿联酋）温度的 SVG 天气卡片，
并将其与摘要一起写入输出文件。

## 指令
你将从调用上下文接收温度值和单位（摄氏度或华氏度）。

### 1. 创建 SVG 天气卡片
生成一个简洁的 SVG 天气卡片...

### 2. 写入 SVG 文件
将 SVG 内容写入 `orchestration-workflow/weather.svg`。

### 3. 写入输出摘要
写入 `orchestration-workflow/output.md`...

...
```

这是一个**技能** —— 通过 Skill 工具由命令直接调用。它从对话上下文接收温度数据，创建 SVG 天气卡片和输出摘要。

---

## Weather Fetcher（代理技能）

**文件**：[`.claude/skills/weather-fetcher/SKILL.md`](../.claude/skills/weather-fetcher/SKILL.md)

```yaml
---
name: weather-fetcher
description: 从 Open-Meteo API 获取迪拜（阿联酋）当前天气温度数据的指令
user-invocable: false
---

# Weather Fetcher 技能

此技能提供获取当前天气数据的指令。

## 任务
获取迪拜（阿联酋）的当前温度，按请求的单位
（摄氏度或华氏度）。

## 指令
1. 获取天气数据：使用 WebFetch 工具获取当前天气数据
   - 摄氏度 URL：https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m&temperature_unit=celsius
   - 华氏度 URL：https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&current=temperature_2m&temperature_unit=fahrenheit
2. 提取温度：从 JSON 响应中提取 `current.temperature_2m`
3. 返回结果：清晰地返回温度值和单位。

...
```

这是一个**代理技能** —— 通过 `skills:` 前置字段在启动时预加载到 `weather-agent` 中。它不直接调用，而是作为领域知识注入到代理的上下文中。注意 `user-invocable: false` 会将其从 `/` 命令菜单中隐藏。

---

## 两种技能模式

| 模式 | 调用方式 | 示例 | 关键区别 |
|---------|-----------|---------|----------------|
| **技能** | `Skill(skill: "name")` | `weather-svg-creator` | 通过 Skill 工具直接调用 |
| **代理技能** | 通过 `skills:` 字段预加载 | `weather-fetcher` | 启动时注入代理上下文 |

---

## ![如何使用](../!/tags/how-to-use.svg)

**技能** —— 通过斜杠命令直接调用：
```bash
$ claude
> /weather-svg-creator
```

---

## ![如何实现](../!/tags/how-to-implement.svg)

让 Claude 为你创建一个 —— 它会在 `.claude/skills/my-skill/SKILL.md` 中生成包含 YAML 前置字段和正文的 markdown 文件

```yaml
---
name: my-skill
description: 技能功能的描述
---

# 我的技能

技能功能的指令。
```