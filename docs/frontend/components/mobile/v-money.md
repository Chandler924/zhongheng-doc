# VMoney 金额输入

## 组件介绍

VMoney 是纵横框架移动端的金额输入组件，提供金额格式化和验证功能。

## 基础用法

```vue
<template>
  <v-money v-model="amount" placeholder="请输入金额" />
</template>

<script setup>
import { ref } from 'vue'

const amount = ref('')
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | string | - | 绑定值 |
| placeholder | string | '请输入金额' | 占位符 |
| precision | number | 2 | 小数位数 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: string) |
| blur | 失焦事件 | (event: Event) |
