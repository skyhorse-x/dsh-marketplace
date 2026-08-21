# DSH Marketplace

> DeepSeek Harness 插件市场 — 发现、安装和管理 DSH 插件

DSH Marketplace 是 DeepSeek Harness 桌面端的插件市场应用，提供插件浏览、搜索、安装和管理功能。采用 React + TypeScript + Vite 构建，界面风格与 DSH 桌面端保持一致。

## 功能特性

- **插件浏览** — 卡片式布局展示插件，包含图标、评分、下载量等关键信息
- **分类筛选** — 支持推荐、已安装、更新三种标签页切换
- **实时搜索** — 按名称、描述、作者快速搜索插件
- **插件详情** — 右侧面板展示完整插件信息：功能介绍、版本变更、用户评价
- **一键安装** — 支持插件的安装与卸载操作
- **响应式布局** — 三栏自适应布局，侧边栏可折叠
- **暗色主题** — 默认深色界面，视觉风格与 DSH 桌面端统一

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | React 18 |
| 开发语言 | TypeScript |
| 构建工具 | Vite 6 |
| 图标库 | Lucide React |
| 样式方案 | CSS-in-JS |
| 包管理器 | pnpm |

## 项目结构

```
dsh-market/
├── index.html              # 应用入口
├── package.json            # 依赖配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 构建配置
├── .gitignore              # Git 忽略规则
├── public/
│   └── vite.svg            # 应用图标
└── src/
    ├── main.tsx            # React 挂载入口
    ├── App.tsx             # 根组件（三栏布局）
    ├── index.css           # 全局样式 & 滚动条主题
    ├── components/         # UI 组件目录
    │   ├── Sidebar.tsx     # 侧边栏导航
    │   ├── PluginList.tsx  # 插件列表
    │   ├── PluginCard.tsx  # 插件卡片
    │   ├── PluginDetail.tsx# 插件详情面板
    │   └── SearchBar.tsx   # 搜索栏
    ├── data/
    │   └── plugins.ts      # 插件数据源
    ├── types/
    │   └── plugin.ts       # TypeScript 类型定义
    └── hooks/
        └── usePlugins.ts   # 插件数据管理 Hook
```

## 安装方式

### 作为 DSH 插件安装（推荐）

使用 `dsh plugin` 命令将插件安装到 DSH 的 web profile 中：

```bash
# 从 GitHub 安装
dsh plugin --profile web add github:skyhorse-x/dsh-marketplace

# 从 Git URL 安装
dsh plugin --profile web add git+https://github.com/skyhorse-x/dsh-marketplace.git

# 从本地路径安装（开发模式）
dsh plugin --profile web add ./dsh-marketplace
```

安装后重启 DSH 即可在插件市场中浏览和管理插件。

### 源码安装（开发模式）

#### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

#### 安装与运行

```bash
# 克隆仓库
git clone git@github.com:skyhorse-x/dsh-marketplace.git
cd dsh-marketplace

# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev
```

默认访问地址：`http://localhost:5173`

### 构建生产版本

```bash
pnpm run build
```

构建产物输出到 `dist/` 目录。

### 本地预览构建产物

```bash
pnpm run preview
```

## 插件数据格式

```typescript
interface Plugin {
  id: string               // 唯一标识
  name: string             // 插件名称
  description: string      // 简短描述
  author: string           // 开发者/组织
  version: string          // 当前版本（SemVer）
  downloads: string        // 下载量（格式：12.5k）
  icon: string             // 图标（Emoji 或 URL）
  installed: boolean       // 是否已安装
  rating: number           // 评分（0 - 5）
  category?: PluginCategory // 分类
  tags?: string[]          // 标签
  repository?: string       // 源码地址
  homepage?: string        // 主页链接
  changelog?: string       // 版本变更记录
}

type PluginCategory =
  | 'development'    // 开发工具
  | 'productivity'   // 效率工具
  | 'data'           // 数据分析
  | 'integration'    // 第三方集成
  | 'theme'          // 主题外观
  | 'other'          // 其他
```

## 页面布局

```
┌──────────┬──────────────────────────┬──────────────────────┐
│  Sidebar │      Plugin List         │    Plugin Detail     │
│          │                          │                      │
│  🏠 首页  │  ┌────────────────────┐  │  ┌──────────────────┐ │
│  💬 对话  │  │ 🔍 搜索插件...     │  │  │ 💻 代码助手      │ │
│  🧩 市场  │  └────────────────────┘  │  │ DSH Team         │ │
│  ⚙️ 设置  │                          │  │ v1.2.0 · ⭐ 4.8  │ │
│          │  ┌──────┬──────┬──────┐  │  └──────────────────┘ │
│          │  │ 推荐 │已安装│ 更新 │  │                      │
│          │  └──────┴──────┴──────┘  │  [安装] [查看源码]    │
│          │                          │                      │
│          │  ┌────────────────────┐  │  功能介绍             │
│          │  │ 💻 代码助手  已安装│  │  ─────────────────── │
│          │  │ 智能代码补全...    │  │  代码助手是一个强大...│
│          │  │ ⭐4.8 ⬇️12.5k     │  │                      │
│          │  └────────────────────┘  │  版本信息             │
│          │                          │  当前版本: 1.2.0     │
│          │  ┌────────────────────┐  │  更新时间: 2025-01-15│
│          │  │ 📚 知识库管理      │  │  下载次数: 12,543    │
│          │  │ 管理和搜索...      │  │  评分: 4.8 / 5.0    │
│          │  │ ⭐4.5 ⬇️8.3k      │  │                      │
│          │  └────────────────────┘  │  用户评价             │
│          │                          │  ★★★★★ 张三          │
│          │                          │  非常好用的插件...     │
└──────────┴──────────────────────────┴──────────────────────┘
```

## 开发指南

### 添加新插件

1. 在 `src/data/plugins.ts` 数组中追加新的插件对象
2. 确保 `id` 唯一
3. 图标可使用 Emoji 或图片 URL

```typescript
{
  id: 'my-plugin',
  name: '我的插件',
  description: '这是一个示例插件',
  author: 'Your Name',
  version: '1.0.0',
  downloads: '0',
  icon: '🚀',
  installed: false,
  rating: 5.0,
  category: 'development',
  tags: ['tool', 'productivity'],
}
```

### 新增分类

在 `src/types/plugin.ts` 中扩展 `PluginCategory` 联合类型，并在分类标签页中注册。

### 自定义主题

全局样式变量集中在 `src/index.css` 顶部，修改以下 CSS 变量即可调整主题色：

```css
:root {
  --color-bg-primary: #0f0f1a;
  --color-bg-secondary: #1a1a2e;
  --color-bg-tertiary: #2a2a3e;
  --color-accent: #667eea;
  --color-text-primary: #e0e0e0;
  --color-text-secondary: #888;
}
```

## 许可证

[MIT](LICENSE) © 2025 DSH Marketplace Contributors
