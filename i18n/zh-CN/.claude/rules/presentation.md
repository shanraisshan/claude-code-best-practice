# Glob: presentation/**

## 委托规则

任何更新、修改或修复演示文稿（`presentation/index.html`）的请求都必须由 `presentation-curator` 代理处理。始终通过 Task 工具将演示工作委托给此代理 — 切勿直接编辑演示文稿。

```
Task(subagent_type="presentation-curator", description="...", prompt="...")
```

## 原因

presentation-curator 代理预加载了三个技能，使其与演示文稿的结构、样式和概念框架保持同步。它在每次执行后也会自我演化，更新自己的技能以防止知识漂移。绕过代理可能会破坏幻灯片编号、级别过渡或样式一致性。