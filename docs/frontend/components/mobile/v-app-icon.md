# VAppIcon 应用图标

## 组件介绍

VAppIcon 是纵横框架移动端的应用图标组件，用于显示应用图标。

## 基础用法

```vue
<template>
  <v-app-icon :src="iconSrc" :size="48" />
</template>

<script setup>
const iconSrc = '/path/to/icon.png'
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| src | string | - | 图标地址 |
| size | number | 32 | 图标大小 |
| alt | string | - | 替代文本 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | (event: Event) |
| error | 加载错误 | (error: Error) |
