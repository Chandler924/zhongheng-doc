# VCheckUnit 部门选择

## 组件介绍

VCheckUnit 是纵横框架移动端的部门选择组件，支持单选和多选部门。

## 基础用法

```vue
<template>
  <v-check-unit 
    v-model="selectedUnits" 
    :multiple="true"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedUnits = ref([])
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | Array | [] | 绑定值 |
| multiple | boolean | false | 是否多选 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: Array) |
| change | 变化事件 | (value: Array) |
