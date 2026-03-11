---
name: presentation-structure
description: 关于演示幻灯片格式、权重系统、导航和章节结构的知识
---

# Presentation Structure Skill（演示结构技能）

关于 `presentation/index.html` 演示文稿结构的知识。

## 文件位置

`presentation/index.html` — 包含内联 CSS 和 JS 的单文件 HTML 演示文稿。

## 幻灯片格式

每张幻灯片是一个带有 `data-slide`（序号）和可选 `data-level`（过渡点的旅程级别）的 div：

```html
<!-- 常规幻灯片 — 继承前一个 data-level 幻灯片的级别 -->
<div class="slide" data-slide="12">
    <h1>幻灯片标题</h1>
    <!-- 内容 -->
</div>

<!-- 级别过渡幻灯片 — 为此幻灯片及之后所有幻灯片设置新级别 -->
<div class="slide section-slide" data-slide="10" data-level="low">
    <h1>章节名称</h1>
    <p class="section-desc">Level: Low — 此章节描述</p>
</div>

<!-- 标题幻灯片（居中） -->
<div class="slide title-slide" data-slide="1">
    <h1>演示文稿标题</h1>
    <p class="subtitle">副标题文本</p>
</div>
```

## 旅程栏级别系统

演示文稿使用 4 级系统而非累积百分比：

- 级别通过关键过渡幻灯片（章节分隔符）上的 `data-level` 属性设置
- `data-level` 幻灯片后的所有幻灯片继承该级别，直到下一个过渡
- 旅程栏分别填充到 Low / Medium / High / Pro 的 25% / 50% / 75% / 100%
- 栏在第 1 张幻灯片（标题幻灯片）隐藏；从第 2 张开始显示栏
- 第一个 `data-level` 之前的幻灯片（第 2-9 张）显示空栏（尚未设置级别）
- `.level-badge` 由 JS 在带有 `data-level` 的幻灯片的 `<h1>` 上注入 — 切勿在 HTML 中硬编码

### 按章节的级别过渡

| 章节 | 幻灯片范围 | data-level | 栏高度 |
|---------|-------------|------------|------------|
| 第 0 部分：介绍 | 第 1-4 张 | (无) | 隐藏 / 空 |
| 第 1 部分：先决条件 | 第 5-9 张 | (无) | 空 |
| 第 2 部分：更好的提示 | 第 10-17 张 | `low` | 25% |
| 第 3 部分：项目记忆 | 第 18-24 张 | `medium` | 50% |
| 第 4 部分：结构化工作流 | 第 25-28 张 | (继承 medium) | 50% |
| 第 5 部分：领域知识 | 第 29-33 张 | `high` | 75% |
| 第 6 部分：代理工程 | 第 34-46 张 | `high` | 75% |
| 附录 | 第 47+ 张 | (继承 high) | 75% |

## 导航系统

- `goToSlide(n)` — 用于 TOC 链接，必须与实际 `data-slide` 编号匹配
- `totalSlides` 从 DOM 自动计算（`document.querySelectorAll('[data-slide]').length`）
- 箭头键、空格键和触摸滑动用于导航
- 幻灯片计数器在左下角显示 `当前 / 总计`

## 重新编号规则

添加、删除或重新排序幻灯片后：
1. 从 1 开始按顺序重新编号所有 `data-slide` 属性
2. 更新 TOC/Journey Map 幻灯片中的所有 `goToSlide()` 调用
3. JS `totalSlides` 自动计算 — 无需手动更新
4. 验证不存在间隙或重复

## 章节分隔符格式

章节分隔符使用 `section-slide` 类。级别过渡章节分隔符带有 `data-level` 并在描述中显示级别名称：

```html
<div class="slide section-slide" data-slide="10" data-level="low">
    <p class="section-number">Part 2</p>
    <h1>Better Prompting</h1>
    <p class="section-desc">Level: Low — effective prompting for real results.</p>
</div>
```

JS 将在级别过渡时运行时向 `<h1>` 注入 `.level-badge`（例如 "→ Low"）— 不要在 HTML 中手动添加这些。