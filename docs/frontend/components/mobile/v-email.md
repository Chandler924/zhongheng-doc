# VEmail 邮箱输入

## 组件介绍

VEmail 是纵横框架移动端的邮箱输入组件，提供邮箱格式验证。

## 基础用法

```vue
<template>
  <v-email v-model="email" placeholder="请输入邮箱" />
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | string | - | 绑定值 |
| placeholder | string | '请输入邮箱' | 占位符 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: string) |
| blur | 失焦事件 | (event: Event) |