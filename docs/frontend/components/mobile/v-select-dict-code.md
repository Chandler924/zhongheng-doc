# VSelectDictCode 字典选择

## 组件介绍

VSelectDictCode 是纵横框架移动端的字典选择组件，支持字典数据选择。

## 基础用法

```vue
<template>
  <v-select-dict-code 
    v-model="selectedCode" 
    dict-type="status"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedCode = ref('')
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | string | - | 绑定值 |
| dict-type | string | - | 字典类型 |
| disabled | boolean | false | 是否禁用 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 值变化事件 | (value: string) |
| change | 变化事件 | (value: string) |
