# VRadio 单选框组件

## 组件介绍

VRadio 是纵横框架移动端的单选框组件，用于单选选择。

## 基础用法

```vue
<template>
  <v-radio 
    v-model="selected" 
    value="option1" 
    label="选项1" 
  />
  <v-radio 
    v-model="selected" 
    value="option2" 
    label="选项2" 
  />
</template>

<script setup>
import { ref } from 'vue'

const selected = ref('option1')
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | string | - | 绑定值 |
| value | string | - | 选项值 |
| label | string | - | 标签文本 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: string) |
| change | 变化事件 | (value: string) |