# VCancelButton 取消按钮

## 组件介绍

VCancelButton 是纵横框架移动端的取消按钮组件，提供统一的取消操作按钮。

## 基础用法

```vue
<template>
  <v-cancel-button @click="handleCancel" />
</template>

<script setup>
const handleCancel = () => {
  console.log('取消操作')
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
