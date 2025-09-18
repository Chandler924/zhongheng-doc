# VSelectDictList 字典列表选择

## 组件介绍

VSelectDictList 是纵横框架移动端的字典列表选择组件，支持字典列表数据选择。

## 基础用法

```vue
<template>
  <v-select-dict-list 
    v-model="selectedList" 
    dict-type="category"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedList = ref([])
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | Array | [] | 绑定值 |
| dict-type | string | - | 字典类型 |
| multiple | boolean | false | 是否多选 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: Array) |
| change | 变化事件 | (value: Array) |
