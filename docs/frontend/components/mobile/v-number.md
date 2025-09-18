# VNumber 数字输入

## 组件介绍

VNumber 是纵横框架移动端的数字输入组件，提供数字格式验证和输入限制。

## 基础用法

```vue
<template>
  <v-number v-model="number" placeholder="请输入数字" />
</template>

<script setup>
import { ref } from 'vue'

const number = ref('')
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | string | - | 绑定值 |
| placeholder | string | '请输入数字' | 占位符 |
| min | number | - | 最小值 |
| max | number | - | 最大值 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: string) |
| blur | 失焦事件 | (event: Event) |
