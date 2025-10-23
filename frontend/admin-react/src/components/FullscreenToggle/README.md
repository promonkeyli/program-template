# FullscreenToggle 组件

全屏切换组件，支持进入和退出全屏模式。

## 文件结构

- `index.tsx` - 主组件文件
- `types.ts` - TypeScript 类型定义
- `README.md` - 组件说明文档

## 功能特性

- 支持进入和退出全屏模式
- 兼容不同浏览器的全屏 API
- 实时显示当前全屏状态
- 国际化支持

## 使用方式

```tsx
import { FullscreenToggle } from '@/components/FullscreenToggle'

<FullscreenToggle className="custom-class" />
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| className | string | - | 自定义样式类名 |
