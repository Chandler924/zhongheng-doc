# 移动端组件概览

纵横框架移动端组件库，专为移动端应用设计，提供优化的移动端交互体验。

## 组件分类

### 按钮组件
- [VAddButton 新增按钮](./v-add-button.md) - 新增操作按钮
- [VBackButton 返回按钮](./v-back-button.md) - 返回操作按钮
- [VBatchDeleteButton 批量删除按钮](./v-batch-delete-button.md) - 批量删除操作按钮
- [VCancelButton 取消按钮](./v-cancel-button.md) - 取消操作按钮
- [VClearButton 清空按钮](./v-clear-button.md) - 清空操作按钮
- [VExportButton 导出按钮](./v-export-button.md) - 导出操作按钮
- [VImportButton 导入按钮](./v-import-button.md) - 导入操作按钮
- [VOkButton 确认按钮](./v-ok-button.md) - 确认操作按钮
- [VResetButton 重置按钮](./v-reset-button.md) - 重置操作按钮
- [VSearchButton 查询按钮](./v-search-button.md) - 查询操作按钮

### 输入组件
- [VEmail 邮箱输入](./v-email.md) - 邮箱格式验证的输入框
- [VIdcard 身份证输入](./v-idcard.md) - 身份证号码输入框
- [VInput 通用文本输入](./v-input.md) - 通用文本输入框
- [VMoney 金额输入](./v-money.md) - 金额格式化的输入框
- [VNumber 数字输入](./v-number.md) - 数字输入框
- [VPhone 手机号输入](./v-phone.md) - 手机号输入框
- [VTextarea 多行文本输入](./v-textarea.md) - 多行文本输入框

### 选择组件
- [VCheckbox 复选框组件](./v-checkbox.md) - 复选框组件
- [VRadio 单选框组件](./v-radio.md) - 单选框组件
- [VSelect 选择器](./v-select.md) - 选择器组件
- [VSelectCheckbox 多选选择器](./v-select-checkbox.md) - 多选选择器组件

### 选择器组件
- [VCheckRole 角色选择](./v-check-role.md) - 角色选择器
- [VCheckUnit 部门选择](./v-check-unit.md) - 部门选择器
- [VCheckUser 用户选择](./v-check-user.md) - 用户选择器
- [VRegion 地区选择组件](./v-region.md) - 省市区三级联动选择

### 字典选择组件
- [VSelectDictCode 字典选择](./v-select-dict-code.md) - 字典选择器
- [VSelectDictList 字典列表选择](./v-select-dict-list.md) - 字典列表选择器

### 业务组件
- [VDate 日期选择](./v-date.md) - 日期选择组件
- [VFileUpload 文件上传](./v-file-upload.md) - 文件上传组件
- [VImageUpload 图片上传](./v-image-upload.md) - 图片上传组件
- [VPageCard 页面卡片](./v-page-card.md) - 页面卡片组件

### 应用组件
- [VAppIcon 应用图标](./v-app-icon.md) - 应用图标组件
- [VAppPanel 图标面板](./v-app-panel.md) - 图标面板组件
- [VAppTitleBar 应用标题栏](./v-app-title-bar.md) - 应用标题栏组件

### 其他组件
- [VDescription 描述文本组件](./v-description.md) - 描述文本组件

## 快速开始

### 安装

```bash
npm install @zongheng-mcp/frontend
```

### 基础用法

```vue
<template>
  <div>
    <!-- 应用标题栏 -->
    <v-app-title-bar title="页面标题" :show-back="true" />
    
    <!-- 页面卡片 -->
    <v-page-card>
      <!-- 输入组件 -->
      <v-input v-model="inputValue" placeholder="请输入内容" />
      
      <!-- 按钮组件 -->
      <v-add-button @click="handleAdd" />
      <v-ok-button @click="handleOk" />
    </v-page-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')

const handleAdd = () => {
  console.log('添加操作')
}

const handleOk = () => {
  console.log('确认操作')
}
</script>
```

## 设计原则

- **移动优先**：专为移动端交互设计
- **触摸友好**：优化触摸操作体验
- **性能优化**：轻量级设计，快速加载
- **响应式**：适配不同屏幕尺寸
- **一致性**：统一的移动端设计语言

## 最佳实践

1. **触摸优化**：确保按钮和交互元素有足够的触摸区域
2. **加载优化**：使用懒加载和虚拟滚动提升性能
3. **手势支持**：合理使用滑动、长按等手势操作
4. **键盘适配**：优化软键盘弹出时的布局
5. **主题适配**：支持深色模式和系统主题
