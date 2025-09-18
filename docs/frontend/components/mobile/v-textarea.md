# VTextarea 多行文本输入

## 组件介绍

VTextarea 是纵横框架移动端的多行文本输入组件，支持多行文本输入和自动调整高度。

## 基础用法

```vue
<template>
  <v-textarea 
    v-model="content" 
    placeholder="请输入内容"
    :rows="4"
  />
</template>

<script setup>
import { ref } from 'vue'

const content = ref('')
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | string | - | 绑定值 |
| placeholder | string | '请输入内容' | 占位符 |
| rows | number | 3 | 行数 |
| maxlength | number | - | 最大长度 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: string) |
| focus | 聚焦事件 | (event: Event) |
| blur | 失焦事件 | (event: Event) |
