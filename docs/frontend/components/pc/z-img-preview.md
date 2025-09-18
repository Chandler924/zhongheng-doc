# ZImagePreview-图片预览
## 组件介绍
ZImgPreview是一个图片预览组件，提供了丰富的图片交互功能。组件支持图片放大、缩小、旋转和拖动等操作，可以通过鼠标滚轮控制缩放比例，通过拖拽移动图片位置。组件还提供了图片删除功能，适用于各种需要图片预览的场景。

## 用法及示例代码
### 基本用法
```vue
<template>
  <div>
    <el-button @click="openPreview">打开图片预览</el-button>
    <z-image-preview ref="imgPreviewRef" url="https://example.com/path/to/image.jpg" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const imgPreviewRef = ref(null)

const openPreview = () => {
  imgPreviewRef.value.open()
}
</script>

```

### 带删除功能
```vue
<template>
  <div>
    <div class="image-list">
      <div v-for="(img, index) in images" :key="index" class="image-item">
        <img :src="img" @click="previewImage(img, index)" />
      </div>
    </div>
    <z-image-preview ref="previewRef" :url="currentImage" @delete="handleDelete" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const previewRef = ref(null)
const images = ref([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
])
const currentImage = ref('')
const currentIndex = ref(-1)

const previewImage = (img, index) => {
  currentImage.value = img
  currentIndex.value = index
  previewRef.value.open()
}

const handleDelete = () => {
  if (currentIndex.value !== -1) {
    images.value.splice(currentIndex.value, 1)
    // 关闭预览
    previewRef.value.closable()
  }
}
</script>
<style scoped>
.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.image-item {
  width: 100px;
  height: 100px;
  cursor: pointer;
}
.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

```

### 自定义操作按钮
```vue
<template>
  <div>
    <el-button @click="openPreview">预览图片</el-button>
    <z-image-preview ref="previewRef" :url="imageUrl">
      <template #addIcon>
        <el-icon @click="downloadImage"><Download /></el-icon>
      </template>
    </z-image-preview>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { Download } from '@element-plus/icons-vue'

const previewRef = ref(null)
const imageUrl = ref('https://example.com/path/to/image.jpg')

const openPreview = () => {
  previewRef.value.open()
}

const downloadImage = () => {
  // 下载图片的逻辑
  const link = document.createElement('a')
  link.href = imageUrl.value
  link.download = 'image.jpg'
  link.click()
}
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| url | 图片URL地址 | string | '' | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| delete | 点击删除按钮时触发 | - | - | v6.0 |


## 方法
| 方法名 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| open | 打开图片预览 | - | v6.0 |
| closable | 关闭图片预览 | - | v6.0 |
| originalFunc | 将图片放大到2倍大小 | - | v6.0 |
| restImg | 重置图片到初始状态 | - | v6.0 |


## 插槽
| 插槽名 | 说明 | 版本号 |
| --- | --- | --- |
| addIcon | 自定义操作按钮，显示在工具栏末尾 | v6.0 |


## 注意事项
1. 组件必须通过ref引用并调用`open()`方法来显示图片预览，不会自动显示
2. 组件默认会在图片预览时禁用页面滚动，关闭预览后会恢复
3. 可以通过鼠标滚轮控制图片缩放，也可以使用放大和缩小按钮
4. 图片可以通过拖拽移动位置
5. 组件提供了左右旋转功能，每次旋转90度
6. 当需要删除图片时，可以监听`delete`事件并在处理完成后调用`closable()`方法关闭预览

