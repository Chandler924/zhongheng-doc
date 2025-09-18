# VRegion 地区选择组件

## 组件介绍

VRegion 是纵横框架移动端的地区选择组件，支持省市区三级联动选择。

## 基础用法

```vue
<template>
  <v-region v-model="selectedRegion" />
</template>

<script setup>
import { ref } from 'vue'

const selectedRegion = ref({
  province: '',
  city: '',
  district: ''
})
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | Object | {} | 绑定值 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: Object) |
| change | 变化事件 | (value: Object) |
