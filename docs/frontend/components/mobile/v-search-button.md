# VSearchButton 查询按钮

## 组件介绍

VSearchButton 是纵横框架移动端的查询按钮组件，提供统一的查询操作按钮。

## 基础用法

```vue
<template>
  <v-search-button @click="handleSearch" />
</template>

<script setup>
const handleSearch = () => {
  console.log('查询操作')
}
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | (event: Event) |
