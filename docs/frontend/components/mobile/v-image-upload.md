# VImageUpload 图片上传

## 组件介绍

VImageUpload 是纵横框架移动端的图片上传组件，专门用于图片选择和上传。

## 基础用法

```vue
<template>
  <v-image-upload 
    v-model="images" 
    :limit="3"
    :max-size="5"
  />
</template>

<script setup>
import { ref } from 'vue'

const images = ref([])
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| model-value | Array | [] | 图片列表 |
| limit | number | 1 | 最大上传数量 |
| max-size | number | 10 | 最大文件大小(MB) |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:model-value | 图片变化事件 | (images: Array) |
| success | 上传成功 | (image: Object) |
| error | 上传失败 | (error: Error) |