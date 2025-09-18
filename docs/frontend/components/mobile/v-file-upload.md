# VFileUpload 文件上传

## 组件介绍

VFileUpload 是纵横框架移动端的文件上传组件，支持文件选择和上传功能。

## 基础用法

```vue
<template>
  <v-file-upload 
    v-model="files" 
    :limit="5"
    accept="image/*"
  />
</template>

<script setup>
import { ref } from 'vue'

const files = ref([])
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | Array | [] | 文件列表 |
| limit | number | 1 | 最大上传数量 |
| accept | string | - | 接受的文件类型 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 文件变化事件 | (files: Array) |
| success | 上传成功 | (file: Object) |
| error | 上传失败 | (error: Error) |