# VSelectCheckbox 多选选择器

## 组件介绍

VSelectCheckbox 是纵横框架移动端的多选选择器组件，支持多选功能。

## 基础用法

```vue
<template>
  <v-select-checkbox 
    v-model="selectedItems" 
    :options="options"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedItems = ref([])
const options = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' }
]
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | Array | [] | 绑定值 |
| options | Array | [] | 选项列表 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: Array) |
| change | 变化事件 | (value: Array) |
