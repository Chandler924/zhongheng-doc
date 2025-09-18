# VResetButton 重置按钮

## 组件介绍

VResetButton 是纵横框架移动端的重置按钮组件，提供统一的重置操作按钮。

## 基础用法

```vue
<template>
  <v-reset-button @click="handleReset" />
</template>

<script setup>
const handleReset = () => {
  console.log('重置操作')
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
