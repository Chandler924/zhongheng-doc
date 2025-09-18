# 组件库

纵横前端框架提供了丰富的UI组件，帮助你快速构建现代化的用户界面。

## 组件分类

### 基础组件
- [Button 按钮](./button.md) - 基础按钮组件
- [Input 输入框](./input.md) - 输入框组件
- [Card 卡片](./card.md) - 卡片容器组件

### 业务组件
- [ZFileUploader 文件上传](./z-file-uploader.md) - 文件上传组件
- [ZPageCard 页面卡片](./z-page-card.md) - 页面卡片组件

### 布局组件
- [Container 容器](./container.md) - 页面容器组件
- [Grid 栅格](./grid.md) - 栅格布局组件

### 数据展示组件
- [Table 表格](./table.md) - 数据表格组件
- [Pagination 分页](./pagination.md) - 分页组件

### 反馈组件
- [Message 消息提示](./message.md) - 消息提示组件
- [Loading 加载](./loading.md) - 加载状态组件

### 表单组件
- [Form 表单](./form.md) - 表单组件
- [FormItem 表单项](./form-item.md) - 表单项组件

## 快速开始

### 安装

```bash
npm install @zongheng/frontend
```

### 引入组件

```javascript
import { ZButton, ZInput, ZCard } from '@zongheng/frontend'
```

### 使用组件

```vue
<template>
  <z-card title="示例">
    <z-input v-model="value" placeholder="请输入内容" />
    <z-button type="primary" @click="handleClick">提交</z-button>
  </z-card>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')

const handleClick = () => {
  console.log('按钮被点击')
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

## 最佳实践

1. **按需引入**：只引入你需要的组件，减少打包体积
2. **主题定制**：使用CSS变量进行主题定制
3. **响应式设计**：合理使用栅格系统实现响应式布局
4. **表单验证**：使用Form组件的验证功能确保数据质量
