# ZImageUploader-图片上传器
## 组件介绍
ZImageUploader是一个功能丰富的图片上传组件，基于Element Plus的Upload组件封装。支持图片预览、限制上传数量和大小、粘贴上传等功能。组件可以与后端存储服务集成，自动处理图片的上传、删除和预览。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-image-uploader v-model="imageList" />
</template>
<script setup>
import { ref } from 'vue'

const imageList = ref([])
</script>

```

### 设置上传限制
```vue
<template>
  <z-image-uploader v-model="imageList" :limit="5" :file-size="5" accept="image/png,image/jpeg" />
</template>
<script setup>
import { ref } from 'vue'

const imageList = ref([])
</script>

```

### 与业务ID关联
```vue
<template>
  <z-image-uploader v-model="imageList" parent-id="user_123" config-group="avatar" />
</template>
<script setup>
import { ref } from 'vue'

const imageList = ref([])
</script>

```

### 开启粘贴上传功能
```vue
<template>
  <z-image-uploader v-model="imageList" :allow-paste="true" />
</template>
<script setup>
import { ref } from 'vue'

const imageList = ref([])
</script>

```

### 只读模式
```vue
<template>
  <z-image-uploader v-model="imageList" :is-query="true" />
</template>
<script setup>
import { ref } from 'vue'

// 初始化已有图片数据
const imageList = ref([
  {
    uid: 1001,
    name: 'example.jpg',
    url: 'https://example.com/api/storage/download/1001'
  }
])
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 图片文件列表 | Array | [] | v6.0 |
| isQuery | 是否为只读模式 | boolean | false | v6.0 |
| disabled | 是否禁用 | boolean | false | v6.0 |
| limitSize | 文件大小限制(已废弃，使用fileSize) | number | null | v6.0 |
| accept | 接受上传的文件类型 | string | 'image/*' | v6.0 |
| configGroup | 附件分组标识 | string | null | v6.0 |
| showUploadList | 是否显示已上传文件列表 | boolean | true | v6.0 |
| listType | 上传列表的内建样式 | string | 'picture-card' | v6.0 |
| parentId | 业务ID，用于关联上传的图片 | string | '' | v6.0 |
| limit | 最大允许上传图片数量 | number | 200 | v6.0 |
| fileSize | 单个文件大小限制(MB) | number | 200 | v6.0 |
| bucketName | 存储空间名称 | string | 'zongheng' | v6.0 |
| systemName | 系统名称 | string | 'zongheng' | v6.0 |
| markText | 附件备注说明 | string | 'markText' | v6.0 |
| headers | 上传请求头 | object | {} | v6.0 |
| beforeUpload | 上传前钩子函数 | Function | null | v6.0 |
| allowPaste | 是否允许粘贴上传图片 | boolean | false | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 图片列表变化时触发 | fileList | Array | v6.0 |
| change | 图片列表变化时触发 | fileList, status | fileList: Array, status?: string | v6.0 |
| input | 图片列表初始化或变化时触发 | fileList | Array | v6.0 |


## 方法
| 方法名 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| imageValidator | 验证是否有上传图片 | - | v6.0 |
| validator | 验证图片是否符合要求 | callback(message: string) => void | v6.0 |


## 插槽
组件没有提供自定义插槽。

## 注意事项
1. 组件默认限制上传2张图片，每张图片大小不超过2MB
2. 当设置了`parentId`时，组件会自动从服务器获取关联的图片列表
3. 上传成功后，如果设置了`parentId`，组件会自动调用保存接口将图片与业务ID关联
4. 开启粘贴上传功能后，点击粘贴区域激活，然后可以通过Ctrl+V粘贴剪贴板中的图片
5. 组件依赖于Element Plus的Upload组件和@zhv3/common-utils库
6. 删除图片时会弹出确认对话框，确认后才会执行删除操作

