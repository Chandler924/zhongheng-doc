# VBackButton 返回按钮

## 组件介绍

VBackButton 是纵横框架移动端的返回按钮组件，提供统一的返回操作按钮。

## 基础用法

```vue
<template>
  <v-back-button @click="handleBack" />
</template>

<script setup>
const handleBack = () => {
  history.back()
}
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | (event: Event) |
