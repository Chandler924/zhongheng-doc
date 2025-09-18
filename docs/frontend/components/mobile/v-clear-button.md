# VClearButton 清空按钮

## 组件介绍

VClearButton 是纵横框架移动端的清空按钮组件，提供统一的清空操作按钮。

## 基础用法

```vue
<template>
  <v-clear-button @click="handleClear" />
</template>

<script setup>
const handleClear = () => {
  console.log('清空操作')
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
