# 中文翻译贡献指南

欢迎帮助我们将 Claude Code 最佳实践翻译成中文！本指南为所有翻译贡献者提供标准和约定。

## 📋 术语映射表

为确保整个翻译的一致性，请使用以下标准术语映射：

### 核心概念

| English | 中文 | 备注 |
|---------|------|------|
| Agent / Sub-agent | 代理 / 子代理 | 不翻译为"智能体"或"探测器" |
| Command | 命令 | 如 `/weather` 命令 |
| Skill | 技能 | 可复用的功能模块 |
| Hook | 钩子 | 事件触发的自动化 |
| Workflow | 工作流 | 多步骤的流程 |
| MCP (Model Context Protocol) | MCP (模型上下文协议) | 保留英文缩写 |
| Session | 会话 | Claude的对话会话 |
| Context | 上下文 | 模型的上下文窗口 |
| Token | Token | 保留英文 |
| Prompt | 提示 | 用户的输入提示 |
| Plan Mode | 规划模式 | `/plan` 命令 |
| Thinking Mode | 思考模式 | 扩展思考功能 |

### 工作流相关

| English | 中文 | 备注 |
|---------|------|------|
| Research | 研究 | 第一步 |
| Plan | 规划 | 第二步 |
| Execute | 执行 | 第三步 |
| Review | 审查 | 第四步 |
| Ship | 发布 | 第五步 |
| Feature | 功能 | 新功能 |
| Spec | 规范 | 需求规范 |
| PR (Pull Request) | PR (拉取请求) | 保留缩写 |
| Merge | 合并 | Git操作 |
| Commit | 提交 | Git操作 |

### 功能和设置

| English | 中文 | 备注 |
|---------|------|------|
| Settings | 设置 | 配置文件 |
| Rules | 规则 | `.claude/rules/` |
| Memory | 记忆 | `CLAUDE.md` |
| Checkpoint | 检查点 | Git基于的 |
| Permission | 权限 | 命令执行权限 |
| Sandbox | 沙盒 | 隔离环境 |
| Auto Mode | 自动模式 | 自动权限 |
| Fast Mode | 快速模式 | `/fast` 模式 |

### 用户操作

| English | 中文 | 备注 |
|---------|------|------|
| Fork | Fork | 保留英文或"克隆分支" |
| Clone | 克隆 | Git操作 |
| Push | 推送 | Git操作 |
| Pull | 拉取 | Git操作 |
| Branch | 分支 | Git分支 |
| Rewind | 回退 | `/rewind` 命令 |
| Compact | 压缩 | `/compact` 上下文 |
| Clear | 清除 | `/clear` 会话 |

---

## 🎯 格式规则

### Markdown 格式

1. **标题级别** - 保持与英文原文相同的级别
   ```markdown
   # 一级标题
   ## 二��标题
   ### 三级标题
   ```

2. **代码块** - 保留编程相关的代码和命令
   ```markdown
   ✅ 正确:
   运行 `claude --version` 检查版本
   
   ❌ 错误:
   运行 `claude --version`（克劳德 - 版本）检查版本
   ```

3. **链接** - 保留所有原始链接
   ```markdown
   ✅ 正确:
   查看[官方文档](https://code.claude.com/docs)
   
   ❌ 错误:
   查看[官方文档](https://code.claude.com/docs-中文)
   ```

4. **代码变量和命令** - 保留英文
   ```markdown
   ✅ 正确:
   创建名为 `.claude/settings.json` 的文件
   
   ❌ 错误:
   创建名为 `.claude/设置.json` 的文件
   ```

### 表格

表格内容需要翻译，但保留表格结构：

```markdown
✅ 正确:
| 功能 | 位置 | 说明 |
|------|------|------|
| 代理 | `.claude/agents/` | 特定角色的AI |

❌ 错误:
| Feature | Location | Description |
|---------|----------|-------------|
| 代理 | `.claude/agents/` | 特定角色的AI |
```

### 列表

- 保留原始编号和符号
- 翻译文本内容
- 保留技术术语

```markdown
✅ 正确:
1. 运行 `claude` 启动会话
2. 输入你的提示
3. 等待 Claude 响应

❌ 错误:
1. 运行Claude启动会话
2. 输入你的提示
3. 等待克劳德响应
```

---

## 📁 文件组织约定

### 命名规则

中文翻译文件使用以下命名约定：

```
原始文件: README.md
中文文件: README.zh-CN.md

原始文件: docs/setup.md
中文文件: docs/setup.zh-CN.md

原始文件: tutorial/day1/README.md
中文文件: tutorial/day1/README.zh-CN.md
```

### 目录结构

```
lookphp/claude-code-best-practice/
├── README.md (原始英文)
├── README.zh-CN.md (中文版本)
├── tutorial/
│   ├── day0/
│   │   ├── README.md
│   │   └── README.zh-CN.md
│   └── day1/
│       ├── README.md
│       └── README.zh-CN.md
└── TRANSLATION_GUIDE.zh-CN.md (此文件)
```

---

## ✅ 质量检查清单

提交翻译前，请检查以下项目：

### 语言检查
- [ ] 术语使用一致（参考上面的术语映射表）
- [ ] 没有拼写错误
- [ ] 语法正确
- [ ] 标点符号正确使用
- [ ] 避免机器翻译的生硬表达

### 格式检查
- [ ] 所有markdown格式保持一致
- [ ] 代码块正确显示
- [ ] 表格对齐
- [ ] 链接正常工作
- [ ] 列表格式正确

### 内容检查
- [ ] 没有遗漏任何原始内容
- [ ] 技术术语准确
- [ ] 代码命令保留原状
- [ ] 所有文件路径正确
- [ ] 用户界面元素正确翻译

### GitHub检查
- [ ] 文件在正确的目录位置
- [ ] 文件名遵循 `.zh-CN` 约定
- [ ] 提交信息清晰（例如：`docs: add Chinese translation of README.md`）
- [ ] PR描述包含翻译文件列表

---

## 🤝 贡献流程

### 第一步：选择要翻译的文件

查看[翻译优先级](#翻译优先级)部分并选择一个文件。

### 第二步：创建分支

```bash
git checkout -b translate/filename
# 例如：git checkout -b translate/best-practice-settings
```

### 第三步：翻译文件

1. 复制原始文件内容
2. 使用上面的术语映射表进行翻译
3. 遵循格式规则
4. 完成质量检查

### 第四步：提交更改

```bash
git add docs/setup.zh-CN.md
git commit -m "docs: add Chinese translation of setup.md"
git push origin translate/filename
```

### 第五步：创建 Pull Request

1. 在GitHub上创建PR
2. 标题格式：`docs: add Chinese translation of [filename]`
3. 描述中包含：
   - 翻译的文件列表
   - 翻译时间预计
   - 任何特殊注意事项

示例PR描述：
```markdown
## 翻译内容
- best-practice/claude-settings.md

## 质量检查
- [x] 术语一致
- [x] 格式正确
- [x] 没有遗漏内容
- [x] 链接有效

## 注意
这个文件涉及很多配置选项，确保保留了所有默认值。
```

---

## 📊 翻译优先级

### Phase 1：核心内容（高优先级）
这些文件是最常被阅读的，应该首先翻译：

```
□ README.md (主文档)
□ tutorial/day0/README.md (安装教程)
□ tutorial/day1/README.md (第一次对话)
□ best-practice/claude-settings.md (设置指南)
□ best-practice/claude-memory.md (记忆管理)
```

### Phase 2：参考资料（中优先级）
这些是深度参考资料，第二阶段翻译：

```
□ tips/claude-boris-13-tips-03-jan-26.md
□ reports/claude-global-vs-project-settings.md
□ best-practice/claude-skills.md
□ development-workflows/rpi/rpi-workflow.md
```

### Phase 3：高级内容（低优先级）
这些是高级主题，最后翻译：

```
□ development-workflows/cross-model-workflow/
□ orchestration-workflow/
□ 具体实现代码
□ 视频脚本
```

---

## 🎓 翻译建议

### 通用建议

1. **保持简洁** - 中文可以比英文更简洁
   ```
   ❌ 长: 你需要创建一个名为 .claude/settings.json 的文件，然后在其中添加你的配置
   ✅ 短: 创建 .claude/settings.json 文件并添加配置
   ```

2. **使用主动语态** - 让指导更清晰
   ```
   ❌ 被动: Claude 被配置为使用这个技能
   ✅ 主动: 配置 Claude 使用这个技能
   ```

3. **保留英文缩写** - 某些缩写直接保留
   ```
   ✅ PR (拉取请求)
   ✅ MCP (模型上下文协议)
   ✅ API
   ```

### 技术术语建议

使用这些约定来翻译技术术语：

```
直接保留: CLI, API, URL, JSON, YAML, bash, Python, JavaScript
翻译但保留英文: API (应用编程接口)、CLI (命令行界面)
完全翻译: function → 函数, variable → 变量, loop → 循环
```

---

## 🐛 常见问题

**Q：如何处理括号内的英文解释？**
```
原始: MCP (Model Context Protocol)
翻译: MCP (模型上下文协议)
```

**Q：代码注释需要翻译吗？**
```
❌ 不要翻译代码内的注释
✅ 翻译markdown中的代码说明
```

**Q：如何处理专有名词（如"Claude Code"）？**
```
✅ 保留: Claude Code、Anthropic、GitHub
❌ 不翻译成: 克劳德代码、人类智能公司等
```

**Q：如何处理链接中的锚点？**
```
✅ 保留原始锚点: [查看](#core-concepts)
❌ 不翻译锚点ID
```

---

## 📞 获取帮助

如果你在翻译过程中有任何问题：

1. 检查上面的术语映射表
2. 查看已翻译的文件作为参考
3. 在PR中提出问题
4. 阅读原始英文文件了解上下文

---

## 🎉 致谢

感谢所有帮助翻译 Claude Code 最佳实践的贡献者！

你的贡献帮助中文用户社区更好地理解和使用 Claude Code。

---

**最后更新**: 2026年5月13日

