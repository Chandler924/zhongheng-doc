# VSelect 选择器

## 组件介绍

VSelect 是纵横框架移动端的选择器组件，支持单选和多选功能。

## 基础用法

```vue
<template>
  <v-select 
    v-model="selected" 
    :options="options"
    placeholder="请选择"
  />
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('')
const options = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' }
]
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | string/Array | - | 绑定值 |
| options | Array | [] | 选项列表 |
| placeholder | string | '请选择' | 占位符 |
| multiple | boolean | false | 是否多选 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: string/Array) |
| change | 变化事件 | (value: string/Array) |
