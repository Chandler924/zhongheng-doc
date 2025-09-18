# 组件库

纵横前端框架提供了丰富的UI组件，帮助你快速构建现代化的用户界面。

## 组件分类

### 业务组件
- [ZFileUploader 文件上传](./z-file-uploader.md) - 基于 Element Plus 的文件上传组件，支持多文件上传、文件预览、下载和删除功能
- [ZPageCard 页面卡片](./z-page-card.md) - 基于 Element Plus 的页面卡片组件，支持标题、副标题、返回按钮等功能

## 快速开始

### 安装

```bash
npm install @zongheng/frontend
```

### 引入组件

```javascript
import { ZFileUploader, ZPageCard } from '@zongheng/frontend'
```

### 使用组件

```vue
<template>
  <z-page-card title="文件上传示例">
    <z-file-uploader 
      v-model="files" 
      :limit="5"
      accept=".pdf,.doc,.docx"
      @update:model-value="handleFileChange"
    />
  </z-page-card>
</template>

<script setup>
import { ref } from 'vue'

const files = ref([])

const handleFileChange = (newFiles) => {
  console.log('文件列表变化:', newFiles)
}
</script>
```

## 主题定制

### CSS变量

```css
:root {
  --z-primary-color: #409eff;
  --z-success-color: #67c23a;
  --z-warning-color: #e6a23c;
  --z-danger-color: #f56c6c;
  --z-info-color: #909399;
}
```

### 组件样式覆盖

```css
/* 自定义按钮样式 */
.z-button--primary {
  background-color: #your-color;
  border-color: #your-color;
}
```

## 组件特性

### ZFileUploader 文件上传组件
- ✅ **多文件上传**：支持同时上传多个文件
- ✅ **文件类型限制**：通过 `accept` 属性限制上传文件类型
- ✅ **文件大小限制**：通过 `file-size` 属性限制单个文件大小
- ✅ **文件数量限制**：通过 `limit` 属性限制上传文件数量
- ✅ **文件操作**：支持预览、下载、删除等操作
- ✅ **只读模式**：支持只读模式，用于展示已上传的文件
- ✅ **自定义操作**：支持通过插槽添加自定义操作按钮

### ZPageCard 页面卡片组件
- ✅ **标题支持**：支持主标题和副标题
- ✅ **返回按钮**：支持返回按钮和自定义返回逻辑
- ✅ **阴影效果**：支持多种阴影显示模式
- ✅ **插槽支持**：支持头部右侧操作区和页脚插槽
- ✅ **事件监听**：支持标题变化事件监听
- ✅ **导航控制**：支持隐藏导航栏

## 最佳实践

1. **按需引入**：只引入你需要的组件，减少打包体积
2. **主题定制**：使用CSS变量进行主题定制
3. **组件组合**：合理组合使用不同组件构建页面
4. **事件处理**：充分利用组件提供的事件进行业务逻辑处理
