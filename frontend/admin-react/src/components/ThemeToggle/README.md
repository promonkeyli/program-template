# ThemeToggle 组件

主题切换组件，支持浅色、深色和跟随系统三种模式。

## 文件结构

- `index.tsx` - 主组件文件
- `types.ts` - TypeScript 类型定义
- `hooks.ts` - 自定义 hooks
- `README.md` - 组件说明文档

## 功能特性

- 支持浅色、深色、跟随系统三种主题模式
- 自动监听系统主题变化
- 状态持久化存储
- 国际化支持

## 使用方式

```tsx
import { ThemeToggle } from '@/components/ThemeToggle'

<ThemeToggle className="custom-class" />
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| className | string | - | 自定义样式类名 |
