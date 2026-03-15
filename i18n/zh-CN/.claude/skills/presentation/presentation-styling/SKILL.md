---
name: presentation-styling
description: 关于演示文稿中 CSS 类、组件模式和语法高亮的知识
---

# Presentation Styling Skill（演示样式技能）

`presentation/index.html` 中使用的 CSS 类和 HTML 模式。

## CSS 组件类

### 布局

- `.two-col` — 24px 间隙的 2 列网格布局
- `.info-grid` — 信息卡片的 2 列网格
- `.col-card` — 列内卡片（添加 `.good` 为绿色边框，`.bad` 为红色边框）
- `.info-card` — 信息网格中的卡片

### 内容块

- `.trigger-box` — 带深色左边框的灰色框（用于关键概念、先决条件）
- `.how-to-trigger` — 带绿色边框的绿色框（用于"尝试此操作"）
- `.warning-box` — 带警告边框的橙色框（用于重要警告）
- `.code-block` — 带等宽字体的深色代码显示块

### 列表

- `.use-cases` — 图标+文本列表项的容器
- `.use-case-item` — 带图标和文本的单个项目
- `.feature-list` — 简单的带边框列表

### 标签与徽章

- `.matcher-tag` — 灰色内联药丸标签
- `.weight-badge` — 绿色药丸徽章（由 JS 为加权幻灯片自动注入）

## 代码块语法高亮

在 `.code-block` 内，使用这些 span 进行语法着色：

```html
<div class="code-block">
<span class="comment"># 这是注释</span>
<span class="key">字段名</span>: <span class="string">值</span>
<span class="cmd">&gt;</span> 要运行的命令
</div>
```

- `.comment` — 绿色 (#6a9955) 用于注释
- `.key` — 蓝色 (#9cdcfe) 用于属性名/键
- `.string` — 橙色 (#ce9178) 用于字符串值
- `.cmd` — 黄色 (#dcdcaa) 用于命令/提示

## 幻灯片类型模式

### 双列内容幻灯片（好 vs 坏）
```html
<div class="slide" data-slide="N" data-weight="5">
    <h1>标题</h1>
    <div class="two-col">
        <div class="col-card bad">
            <h4>之前（Vibe Coding）</h4>
            <!-- 坏示例 -->
        </div>
        <div class="col-card good">
            <h4>之后（Agentic）</h4>
            <!-- 好示例 -->
        </div>
    </div>
</div>
```

不要在幻灯片 HTML 中硬编码 `<span class="weight-badge">`。演示 JavaScript 自动注入和移除权重徽章。

### 带代码示例的内容幻灯片
```html
<div class="slide" data-slide="N">
    <h1>标题</h1>
    <div class="trigger-box">
        <h4>关键概念</h4>
        <p>描述</p>
    </div>
    <div class="code-block"><span class="comment"># 示例</span>
<span class="key">字段</span>: <span class="string">值</span></div>
</div>
```

### 图标列表模式
```html
<div class="use-cases">
    <div class="use-case-item">
        <span class="use-case-icon">EMOJI</span>
        <div class="use-case-text">
            <strong>标题</strong>
            <span>描述文本</span>
        </div>
    </div>
</div>
```

## 旅程栏专用

- `.journey-bar` — 进度栏下方的固定栏
- `.journey-bar.hidden` — 标题幻灯片上隐藏
- 旅程栏颜色通过 HSL 插值从红色 (0%) 过渡到绿色 (100%)
- 权重徽章由 JS 自动注入到加权幻灯片的 `h1` 元素中