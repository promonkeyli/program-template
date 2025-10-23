# LanguageToggle 组件

语言切换组件，支持中文和英文切换。

## 文件结构

- `index.tsx` - 主组件文件
- `types.ts` - TypeScript 类型定义
- `hooks.ts` - 自定义 hooks
- `README.md` - 组件说明文档

## 功能特性

- 支持中文和英文切换
- 状态持久化存储
- 国际化支持
- 自动同步 i18n 语言设置

## 使用方式

```tsx
import { LanguageToggle } from '@/components/LanguageToggle'

<LanguageToggle className="custom-class" />
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| className | string | - | 自定义样式类名 |
