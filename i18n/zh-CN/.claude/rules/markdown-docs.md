# Glob: **/*.md

## 文档标准

- 保持文件专注简洁 — 每个文件一个主题
- 文档之间使用相对链接（例如 `../best-practice/claude-memory.md`），而非绝对 GitHub URL
- 最佳实践和报告类文档在顶部包含返回链接（参见现有文件的模式）
- 添加新概念或报告时，更新 README.md 中相应的表格（CONCEPTS 或 REPORTS）

## 结构约定

- 最佳实践文档放在 `best-practice/`
- 实现文档放在 `implementation/`
- 报告文档放在 `reports/`
- 技巧文档放在 `tips/`
- Changelog 追踪放在 `changelog/<category>/`

## 格式

- 使用表格进行结构化比较（参见 README CONCEPTS 表格作为参考）
- 链接最佳实践或实现文档时使用 `!/tags/` 中的徽章图片以保持视觉一致性
- 保持标题层级 — 不要跳级（例如不要从 `##` 直接跳到 `####`）