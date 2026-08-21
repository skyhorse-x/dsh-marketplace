# DSH Marketplace

> DeepSeek Harness 插件市场 — 发现、安装和管理 DSH 插件

## 安装方式

### 作为 DSH 插件安装（推荐）

```bash
# 从 GitHub 安装
dsh plugin --profile web add github:skyhorse-x/dsh-marketplace

# 从 Git URL 安装
dsh plugin --profile web add git+https://github.com/skyhorse-x/dsh-marketplace.git

# 从本地路径安装（开发模式）
dsh plugin --profile web add ./dsh-marketplace
```

安装后重启 DSH 即可使用。

### 源码安装（开发模式）

```bash
git clone git@github.com:skyhorse-x/dsh-marketplace.git
cd dsh-marketplace
pnpm install
pnpm run dev
```

默认访问地址：`http://localhost:5173`

### 构建生产版本

```bash
pnpm run build
```

## 功能介绍

### 插件浏览

卡片式布局展示插件，包含图标、评分、下载量等关键信息。

### 分类筛选

支持推荐、已安装、更新三种标签页切换，快速筛选目标插件。

### 实时搜索

按名称、描述、作者快速搜索插件。

### 插件详情

右侧面板展示完整插件信息：功能介绍、版本信息、用户评价。

### 一键安装

支持插件的安装与卸载操作。

### 响应式布局

三栏自适应布局，侧边栏可折叠。

### 暗色主题

默认深色界面，视觉风格与 DSH 桌面端统一。

## 许可证

[MIT](LICENSE) © 2025 DSH Marketplace Contributors
