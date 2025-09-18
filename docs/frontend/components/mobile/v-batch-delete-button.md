# VBatchDeleteButton 批量删除按钮

## 组件介绍

VBatchDeleteButton 是纵横框架移动端的批量删除按钮组件，提供统一的批量删除操作按钮。

## 基础用法

```vue
<template>
  <v-batch-delete-button 
    :disabled="selectedItems.length === 0"
    @click="handleBatchDelete"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedItems = ref([])

const handleBatchDelete = () => {
  console.log('批量删除操作')
}
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | (event: Event) |
