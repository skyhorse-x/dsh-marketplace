# 贡献指南

感谢您对 DSH Market 的关注！我们欢迎各种形式的贡献。

## 开发流程

1. **Fork** 本仓库
2. 创建您的特性分支：`git checkout -b feature/my-feature`
3. 提交您的更改：`git commit -am 'Add some feature'`
4. 推送到分支：`git push origin feature/my-feature`
5. 提交 Pull Request

## 提交规范

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档变更
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `chore`: 构建过程或辅助工具的变动
- `test`: 增加测试

## 代码风格

- 使用 TypeScript，避免 `any` 类型
- 组件使用函数式组件 + Hooks
- 样式使用 CSS-in-JS（内联样式对象）
- 命名遵循 PascalCase（组件）和 camelCase（变量/函数）

## 本地开发

```bash
pnpm install    # 安装依赖
pnpm run dev    # 启动开发服务器
pnpm run build  # 构建生产版本
pnpm run preview  # 预览构建产物
```

## 报告问题

请在 [Issues](https://github.com/skyhorse-x/dsh-market/issues) 页面提交问题，并包含：

- 问题描述
- 复现步骤
- 期望行为
- 实际行为
- 操作系统和浏览器版本

## 许可证

参与贡献即表示您同意在 MIT 许可证下发布您的代码。
