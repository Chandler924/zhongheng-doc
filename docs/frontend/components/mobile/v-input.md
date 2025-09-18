# VInput 通用文本输入

## 组件介绍

VInput 是纵横框架移动端的通用文本输入组件，提供统一的输入框样式和功能。

## 基础用法

```vue
<template>
  <v-input 
    v-model="value" 
    placeholder="请输入内容"
    type="text"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | string | - | 绑定值 |
| placeholder | string | - | 占位符 |
| type | string | 'text' | 输入类型 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: string) |
| focus | 聚焦事件 | (event: Event) |
| blur | 失焦事件 | (event: Event) |