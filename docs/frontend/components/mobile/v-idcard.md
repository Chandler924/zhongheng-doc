# VIdcard 身份证输入

## 组件介绍

VIdcard 是纵横框架移动端的身份证输入组件，提供身份证号码格式验证。

## 基础用法

```vue
<template>
  <v-idcard v-model="idcard" placeholder="请输入身份证号" />
</template>

<script setup>
import { ref } from 'vue'

const idcard = ref('')
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | string | - | 绑定值 |
| placeholder | string | '请输入身份证号' | 占位符 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: string) |
| blur | 失焦事件 | (event: Event) |
