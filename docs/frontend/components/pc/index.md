# PC端组件概览

纵横框架PC端组件库，基于 Element Plus 构建，提供丰富的企业级组件。

## 组件分类

### 基础组件
- [ZButtons 按钮组件集](./z-buttons.md) - 一系列预设按钮组件，包括添加、返回、删除、保存等常用操作按钮
- [ZSelect 选择器](./z-select.md) - 基于 Element Plus 的选择器组件，支持单选和多选
- [ZInputs 输入组件集](./z-inputs.md) - 各种输入框组件集合
- [ZCheckbox 复选框](./z-checkbox.md) - 复选框组件
- [ZRadio 单选框](./z-radio.md) - 单选框组件
- [ZSwitch 开关](./z-switch.md) - 开关组件
- [ZText 文本](./z-text.md) - 文本显示组件
- [ZTitle 标题](./z-title.md) - 标题组件
- [ZIcon 图标](./z-icon.md) - 图标组件

### 表单组件
- [ZEmail 邮箱输入框](./z-email.md) - 邮箱格式验证的输入框
- [ZIdcard 身份证输入框](./z-idcard.md) - 身份证号码输入框
- [ZDateTime 日期时间选择器](./z-date-time.md) - 日期时间选择组件
- [ZColorPicker 颜色选择器](./z-color-picker.md) - 颜色选择组件

### 业务组件
- [ZFileUploader 文件上传](./z-file-uploader.md) - 基于 Element Plus 的文件上传组件，支持多文件上传、文件预览、下载和删除功能
- [ZPageCard 页面卡片](./z-page-card.md) - 基于 Element Plus 的页面卡片组件，支持标题、副标题、返回按钮等功能
- [ZImageUploader 图片上传](./z-image-uploader.md) - 图片上传组件
- [ZImgPreview 图片预览](./z-img-preview.md) - 图片预览组件

### 选择器组件
- [ZSelectUser 人员选择](./z-select-user.md) - 人员选择器
- [ZSelectUnit 部门选择](./z-select-unit.md) - 部门选择器
- [ZSelectRole 角色选择](./z-select-role.md) - 角色选择器
- [ZSelectApplication 应用选择器](./z-select-application.md) - 应用选择器
- [ZSelectDictCode 字典选择器](./z-select-dict-code.md) - 字典选择器
- [ZSelectConnectorApi 连接器](./z-select-connector-api.md) - 连接器选择器
- [ZBusinessLine 业务线选择器](./z-business-line.md) - 业务线选择器
- [ZJob 岗位选择器](./z-job.md) - 岗位选择器
- [ZRank 职级选择](./z-rank.md) - 职级选择器

### 功能组件
- [ZDialog 对话框](./z-dialog.md) - 对话框组件
- [ZLoading 加载中](./z-loading.md) - 加载状态组件
- [ZOperateButton 操作按钮](./z-operate-button.md) - 操作按钮组件
- [ZRouterView 路由视图](./z-router-view.md) - 路由视图组件
- [ZHelper 帮助中心](./z-helper.md) - 帮助中心组件
- [ZConditions 条件组件集](./z-conditions.md) - 条件查询组件集合
- [ZAppIcons 应用图标组件集](./z-app-icons.md) - 应用图标组件集合
- [ZUserUnitRoleAuthority 权限设置](./z-user-unit-role-authority.md) - 权限设置组件

## 快速开始

### 安装

```bash
npm install @zongheng-mcp/frontend
```

### 基础用法

```vue
<template>
  <div>
    <!-- 基础按钮 -->
    <z-buttons type="add" @click="handleAdd" />
    
    <!-- 文件上传 -->
    <z-file-uploader v-model="files" />
    
    <!-- 页面卡片 -->
    <z-page-card title="页面标题" :show-back="true">
      <p>页面内容</p>
    </z-page-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const files = ref([])

const handleAdd = () => {
  console.log('添加操作')
}
</script>
```

## 设计原则

- **一致性**：所有组件遵循统一的设计语言
- **可复用性**：组件设计注重通用性和可配置性
- **易用性**：提供简洁的API和丰富的文档
- **可扩展性**：支持主题定制和功能扩展

## 最佳实践

1. **组件选择**：根据业务需求选择合适的组件
2. **属性配置**：充分利用组件的配置属性
3. **事件处理**：正确处理组件的事件回调
4. **样式定制**：使用CSS变量进行样式定制
5. **性能优化**：合理使用组件的懒加载和虚拟滚动功能
