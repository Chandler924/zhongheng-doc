# VDate 日期选择

## 组件介绍

VDate 是纵横框架移动端的日期选择组件，支持日期选择功能。

## 基础用法

```vue
<template>
  <v-date v-model="selectedDate" />
</template>

<script setup>
import { ref } from 'vue'

const selectedDate = ref('')
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | string | - | 绑定值 |
| placeholder | string | '请选择日期' | 占位符 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: string) |
| change | 变化事件 | (value: string) |
