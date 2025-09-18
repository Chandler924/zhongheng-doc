# ZFileUploader 文件上传组件

## 组件说明
ZFileUploader 是一个基于 Element Plus 的文件上传组件，支持多文件上传、文件预览、下载和删除功能。组件提供了自定义的文件列表展示，支持文件类型限制、大小限制、数量限制等配置。

## 基础用法

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <z-file-uploader v-model="files" />

    <!-- 限制文件数量 -->
    <z-file-uploader v-model="files" :limit="5" />

    <!-- 限制文件类型 -->
    <z-file-uploader v-model="files" accept=".pdf,.doc,.docx,.xls,.xlsx" />

    <!-- 限制文件大小 -->
    <z-file-uploader v-model="files" :file-size="10" />

    <!-- 只读模式 -->
    <z-file-uploader v-model="files" :is-query="true" />

    <!-- 禁用状态 -->
    <z-file-uploader v-model="files" :disabled="true" />

    <!-- 自定义配置 -->
    <z-file-uploader
      v-model="files"
      :limit="5"
      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
      :file-size="20"
      bucket-name="my-bucket"
      system-name="my-system"
      config-group="my-config"
      :show-preview="true"
      :show-download="true"
      :show-delete="true"
      @update:model-value="handleFileChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const files = ref([])

const handleFileChange = (newFiles) => {
  console.log('文件列表变化:', newFiles)
}
</script>
```

## API

### 属性（Attributes）

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 绑定值，文件列表 | Array | - | [] |
| accept | 接受上传的文件类型 | string | - | '' |
| is-query | 是否为只读模式 | boolean | true / false | false |
| config-group | 配置组名称 | string | - | '' |
| show-upload-list | 是否显示上传列表 | boolean | true / false | true |
| list-type | 文件列表的类型 | string | text / picture / picture-card | text |
| parent-id | 父级 ID | string | - | '' |
| limit | 最大上传数量 | number | - | 200 |
| file-size | 文件大小限制（MB） | number | - | 200 |
| bucket-name | 存储桶名称 | string | - | zongheng |
| system-name | 系统名称 | string | - | zongheng |
| mark-text | 标记文本 | string | - | markText |
| headers | 设置上传的请求头部 | object | - | {} |
| mode | 预览模式 | string | download / preview | download |
| show-preview | 是否显示预览按钮 | boolean | true / false | true |
| show-download | 是否显示下载按钮 | boolean | true / false | true |
| show-delete | 是否显示删除按钮 | boolean | true / false | true |

### 插槽（Slots）

| 插槽名称 | 说明 | 作用域参数 |
| --- | --- | --- |
| action-buttons | 自定义操作按钮 | { file } |
| tip | 上传按钮末尾插槽 | fileList |
| upload-button | 上传按钮插槽 |  |

### 事件（Events）

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| update:model-value | 文件列表变化时触发 | (files: FileItem[]) |
| FileBeforeUpload | 文件上传前触发 | (file: File) |
| FileSuccessUpload | 文件上传成功时触发 | (response: any, file: FileItem) |
| FileDownloadSuccess | 文件下载成功时触发 | (file: FileItem) |
| FileDownloadError | 文件下载失败时触发 | (error: any) |

### 方法（Methods）

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| customPreview | 预览方法 | (callback: Function) |
| beforeDownload | 下载前方法 | (callback: Function) |
| beforeUpload | 上传前方法 | (callback: Function) |
| handleRemove | 删除方法 | (callback: Function) |
| validator | 表单验证方法 | (callback: Function) |

## 自定义预览方法

```vue
<template>
  <ZFileUploader
    v-model="fileValue"
    @update:modelValue="handleFileUploadChange"
    :configGroup="'yunfeng'"
    :customPreview="customPreview"
    @FileDownloadSuccess="handleFileDownloadSuccess"
    @FileDownloadError="handleFileDownloadError">
    <template #action-buttons="{ file }">
      <el-button type="text" size="small" title="自定义操作">自定义</el-button>
    </template>
    <template #upload-button>
      <el-button type="primary">
        <el-icon><Upload /></el-icon>
        文件上传
      </el-button>
    </template>
  </ZFileUploader>
</template>

<script setup>
const customPreview = (file: any) => {
  // 自定义预览处理
  console.log('自定义预览处理', file)
  alert('自定义预览处理')
}
</script>
```

## 类型定义

```typescript
interface FileItem {
  uid: string
  name: string
  status?: 'ready' | 'uploading' | 'success' | 'fail'
  parentId?: string
  configGroup?: string
  url?: string
  response?: any
}

interface StorageConfig {
  uploadURL: string
  downloadURL: string
  openOrDownload: string
  base64DownloadURL: string
}
```

## 功能特性

- **多文件上传**：支持同时上传多个文件
- **文件类型限制**：通过 `accept` 属性限制上传文件类型
- **文件大小限制**：通过 `file-size` 属性限制单个文件大小
- **文件数量限制**：通过 `limit` 属性限制上传文件数量
- **自定义文件列表**：提供美观的文件列表展示
- **文件操作**：支持预览、下载、删除等操作
- **只读模式**：支持只读模式，用于展示已上传的文件
- **表单验证**：提供表单验证方法，支持必填校验
- **自定义操作**：支持通过插槽添加自定义操作按钮

## 使用注意事项

1. **文件大小限制**：默认文件大小限制为 200MB，可通过 `file-size` 属性调整
2. **文件数量限制**：默认最大上传数量为 200 个，可通过 `limit` 属性调整
3. **文件类型验证**：通过 `accept` 属性设置允许的文件类型，如 `.pdf,.doc,.docx`
4. **存储配置**：需要正确配置 `bucket-name`、`system-name` 和 `config-group` 属性
5. **API 地址**：组件会自动从 Pinia store 中获取 API 基础地址
6. **文件名处理**：长文件名会自动截断并保留文件扩展名
7. **图片预览**：图片文件支持预览功能，其他文件类型支持下载功能

## 样式定制

组件提供了以下 CSS 类名用于样式定制：

- `.custom-file-list`：文件列表容器
- `.file-item`：单个文件项
- `.file-item-disabled`：禁用状态的文件项
- `.file-info`：文件信息区域
- `.file-name`：文件名
- `.file-actions`：文件操作区域

## 示例场景

### 场景一：表单中的文件上传

```vue
<template>
  <el-form :model="form" :rules="rules" ref="formRef">
    <el-form-item label="附件" prop="attachments">
      <z-file-uploader
        v-model="form.attachments"
        :limit="5"
        accept=".pdf,.doc,.docx,.xls,.xlsx"
        @update:model-value="handleFileChange"
      />
    </el-form-item>
  </el-form>
</template>
```

### 场景二：只读文件展示

```vue
<template>
  <z-file-uploader v-model="files" :is-query="true" :show-upload-list="true" />
</template>
```

### 场景三：自定义操作按钮

```vue
<template>
  <z-file-uploader v-model="files">
    <template #action-buttons="{ file }">
      <el-button type="text" size="small" @click="handleCustomAction(file)">
        自定义操作
      </el-button>
    </template>
  </z-file-uploader>
</template>
```
