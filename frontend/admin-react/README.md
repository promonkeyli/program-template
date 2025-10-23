# Admin React - 现代化管理后台

一个基于 React 19 + TypeScript + Vite 构建的现代化管理后台系统，集成了主题切换、国际化、全屏等实用功能。

## ✨ 特性

- 🚀 **现代化技术栈**: React 19 + TypeScript + Vite
- 🎨 **美观的 UI**: 基于 Radix UI + Tailwind CSS 4.0
- 🌙 **主题切换**: 支持浅色/深色/跟随系统主题
- 🌍 **国际化**: 支持中文/英文切换
- 📱 **全屏功能**: 支持进入/退出全屏模式
- 🛡️ **类型安全**: 完整的 TypeScript 支持
- 🔄 **状态管理**: 使用 Zustand 进行轻量级状态管理
- 🚦 **路由管理**: 基于 TanStack Router 的文件路由系统
- 📡 **数据请求**: 集成 TanStack Query 进行服务端状态管理
- 🎯 **代码质量**: 集成 Biome 进行代码格式化和检查
- 📝 **提交规范**: 使用 Commitizen 和 Commitlint 规范提交信息

## 🏗️ 项目结构

```
src/
├── assets/                 # 静态资源
│   ├── images/            # 图片资源
│   └── styles/            # 样式文件
├── components/            # 组件库
│   ├── FullscreenToggle/  # 全屏切换组件
│   ├── LanguageToggle/    # 语言切换组件
│   ├── Layout/           # 布局组件
│   ├── RouteGuard/       # 路由守卫
│   ├── ThemeToggle/      # 主题切换组件
│   └── ui/               # 基础 UI 组件
├── hooks/                # 自定义 Hooks
├── i18n/                 # 国际化配置
├── lib/                  # 工具函数
├── pages/                # 页面组件
├── routes/               # 路由配置
├── services/             # API 服务
└── stores/               # 状态管理
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
pnpm install
```

### 开发环境

```bash
pnpm dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

### 构建生产版本

```bash
pnpm build
```

### 预览生产版本

```bash
pnpm preview
```

## 🛠️ 技术栈

### 核心框架
- **React 19** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 快速的前端构建工具

### UI 组件
- **Radix UI** - 无样式的可访问组件
- **Tailwind CSS 4.0** - 实用优先的 CSS 框架
- **Lucide React** - 美观的图标库

### 状态管理
- **Zustand** - 轻量级状态管理
- **TanStack Query** - 服务端状态管理

### 路由
- **TanStack Router** - 类型安全的路由

### 国际化
- **react-i18next** - React 国际化解决方案
- **i18next** - 国际化框架

### 开发工具
- **Biome** - 代码格式化和检查
- **Commitizen** - 提交信息规范
- **Lefthook** - Git hooks 管理

## 🎨 功能特性

### 主题切换
- 支持浅色、深色、跟随系统三种模式
- 状态持久化存储
- 自动监听系统主题变化

### 国际化
- 支持中文和英文
- 动态语言切换
- 状态持久化存储

### 全屏功能
- 支持进入和退出全屏模式
- 兼容不同浏览器的全屏 API
- 实时状态显示

### 响应式设计
- 移动端友好的响应式布局
- 自适应侧边栏
- 灵活的网格系统

## 📦 可用脚本

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm preview` - 预览生产版本
- `pnpm commit` - 使用 Commitizen 提交代码
- `pnpm prepare` - 安装 Git hooks

## 🔧 配置说明

### 环境变量
项目使用 Vite 的环境变量系统，环境文件位于 `env/` 目录下。

### 路径别名
- `@` - 指向 `src/` 目录

### 代码规范
- 使用 Biome 进行代码格式化和检查
- 使用 Commitizen 规范提交信息
- 使用 Lefthook 管理 Git hooks

## 🎯 组件开发

### 组件结构
每个功能组件都采用文件夹结构，包含：
- `index.tsx` - 主组件文件
- `types.ts` - TypeScript 类型定义
- `hooks.ts` - 自定义 hooks（可选）
- `README.md` - 组件说明文档

### 组件示例
```tsx
import { ThemeToggle } from '@/components/ThemeToggle'

<ThemeToggle className="custom-class" />
```

## 🌍 国际化

### 添加新语言
1. 在 `src/i18n/index.ts` 中添加新的翻译资源
2. 更新 `LanguageToggle` 组件支持新语言
3. 更新 `useI18nStore` 类型定义

### 添加新翻译
在 `src/i18n/index.ts` 中的翻译对象中添加新的键值对。

## 🎨 主题定制

### 自定义主题
项目使用 CSS 变量系统，可以在 `src/assets/styles/index.css` 中自定义主题变量。

### 添加新主题
1. 在 CSS 中定义新的主题变量
2. 更新 `useThemeStore` 支持新主题
3. 更新 `ThemeToggle` 组件

## 📱 响应式设计

项目使用 Tailwind CSS 的响应式工具类，支持：
- 移动端 (< 768px)
- 平板端 (768px - 1024px)
- 桌面端 (> 1024px)

## 🔒 路由守卫

项目集成了路由守卫功能，支持：
- 登录状态检查
- 权限验证
- 重定向处理

## 📊 状态管理

### 全局状态
- `auth` - 用户认证状态
- `theme` - 主题设置
- `i18n` - 国际化设置

### 本地状态
使用 React 的 `useState` 和 `useReducer` 管理组件内部状态。

## 🚀 性能优化

- 使用 React 19 的编译器优化
- 代码分割和懒加载
- 图片优化
- 缓存策略

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目的支持：
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TanStack](https://tanstack.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

如有问题或建议，欢迎提交 Issue 或 Pull Request！