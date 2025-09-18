# VCheckbox 复选框组件

## 组件介绍

VCheckbox 是纵横框架移动端的复选框组件，基于移动端UI库构建。

## 基础用法

```vue
<template>
  <v-checkbox v-model="checked" label="选项1" />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | boolean | false | 绑定值 |
| label | string | - | 标签文本 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: boolean) |
| change | 变化事件 | (value: boolean) |
