# VPhone 手机号输入

## 组件介绍

VPhone 是纵横框架移动端的手机号输入组件，提供手机号格式验证。

## 基础用法

```vue
<template>
  <v-phone v-model="phone" placeholder="请输入手机号" />
</template>

<script setup>
import { ref } from 'vue'

const phone = ref('')
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | string | - | 绑定值 |
| placeholder | string | '请输入手机号' | 占位符 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: string) |
| blur | 失焦事件 | (event: Event) |