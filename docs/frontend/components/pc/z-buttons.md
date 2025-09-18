# ZButtons-按钮组件集
## 组件介绍
ZButtons是纵横框架提供的一系列预设按钮组件，包括添加、返回、批量删除、取消、清空、删除、导出、导入、链接、确定、重置、保存、搜索和提交按钮。这些按钮组件基于Element Plus的Button组件封装，提供了统一的样式、预设的文本内容和类型，并内置了节流防抖和二次确认等实用功能，使开发者可以快速构建具有一致UI风格和良好用户体验的操作界面。

### 核心特性
+ **统一样式**：每个按钮都有预设的文本、类型和样式
+ **节流保护**：内置500ms节流机制，防止重复点击
+ **二次确认**：删除类按钮自动弹出确认对话框
+ **完全兼容**：支持Element Plus Button的所有原生属性和事件
+ **灵活定制**：支持通过属性和插槽自定义按钮内容和行为

## 按钮组件列表
| 组件名称 | 说明 | 默认文本 | 默认类型 | 特殊功能 | 版本号 |
| --- | --- | --- | --- | --- | --- |
| ZAddButton | 添加按钮 | 新增 | primary | 节流控制 | v6.0 |
| ZBackButton | 返回按钮 | 返回 | default | 节流控制 | v6.0 |
| ZBatchDeleteButton | 批量删除按钮 | 批量删除 | danger | 二次确认 + 节流控制 | v6.0 |
| ZCancelButton | 取消按钮 | 取消 | info | 节流控制 | v6.0 |
| ZClearButton | 清空按钮 | 清除 | warning | 节流控制 | v6.0 |
| ZDeleteButton | 删除按钮 | 删除 | danger | 二次确认 + 节流控制 | v6.0 |
| ZExportButton | 导出按钮 | 导出 | success | 节流控制 | v6.0 |
| ZImportButton | 导入按钮 | 导入 | success | 节流控制 | v6.0 |
| ZLinkButton | 链接按钮 | 链接 | text | 节流控制 | v6.0 |
| ZOkButton | 确定按钮 | 确定 | primary | 节流控制 | v6.0 |
| ZResetButton | 重置按钮 | 重置 | info | 节流控制 | v6.0 |
| ZSaveButton | 保存按钮 | 保存 | primary | 节流控制 | v6.0 |
| ZSearchButton | 搜索按钮 | 查询 | primary | 节流控制 | v6.0 |
| ZSubmitButton | 提交按钮 | 提交 | primary | 节流控制 | v6.0 |


## 用法及示例代码
### 基本用法
```vue
<template>
  <div class="button-demo">
    <z-add-button @click="handleAdd" />
    <z-delete-button @click="handleDelete" />
    <z-save-button @click="handleSave" />
    <z-cancel-button @click="handleCancel" />
  </div>
</template>
<script setup>
const handleAdd = () => {
  console.log('添加操作')
}

const handleDelete = () => {
  console.log('删除操作')
}

const handleSave = () => {
  console.log('保存操作')
}

const handleCancel = () => {
  console.log('取消操作')
}
</script>
<style scoped>
.button-demo {
  display: flex;
  gap: 16px;
}
</style>

```

### 自定义按钮文本
```vue
<template>
  <div class="button-demo">
    <z-add-button>新增用户</z-add-button>
    <z-export-button>导出数据</z-export-button>
    <z-import-button>导入数据</z-import-button>
  </div>
</template>

```

### 不同尺寸
```vue
<template>
  <div class="button-demo">
    <z-search-button size="small" />
    <z-search-button />
    <z-search-button size="large" />
  </div>
</template>

```

### 禁用状态
```vue
<template>
  <div class="button-demo">
    <z-save-button :disabled="!formValid" />
    <z-delete-button :disabled="!hasSelection" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const formValid = ref(false)
const hasSelection = ref(false)
</script>

```

### 节流功能示例
所有按钮都内置了节流功能，防止重复点击：

```vue
<template>
  <div class="throttle-demo">
    <!-- 默认500ms节流时间 -->
    <z-save-button @click="handleSave" :loading="isLoading">保存数据</z-save-button>
    <!-- 自定义节流时间为1000ms -->
    <z-submit-button @click="handleSubmit" :throttle-time="1000">提交表单</z-submit-button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const isLoading = ref(false)

const handleSave = async () => {
  console.log('保存数据...')
  isLoading.value = true

  // 模拟API调用
  setTimeout(() => {
    isLoading.value = false
    console.log('保存完成')
  }, 2000)
}

const handleSubmit = () => {
  console.log('提交表单...')
  // 由于设置了1000ms节流时间，1秒内多次点击只会执行一次
}
</script>

```

### 删除按钮二次确认
删除类按钮具有内置的二次确认功能：

```vue
<template>
  <div class="delete-demo">
    <!-- 单个删除 -->
    <z-delete-button
      @click="handleDelete"
      :disabled="!selectedId"
      confirm-text="确定要删除这条记录吗？删除后无法恢复！">
      删除记录
    </z-delete-button>
    <!-- 批量删除 -->
    <z-batch-delete-button
      @click="handleBatchDelete"
      :disabled="selectedIds.length === 0"
      confirm-text="确定要删除选中的 {{ selectedIds.length }} 条记录吗？">
      批量删除 ({{ selectedIds.length }})
    </z-batch-delete-button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const selectedId = ref(null)
const selectedIds = ref([])

const handleDelete = () => {
  console.log('删除记录ID:', selectedId.value)
  // 执行删除逻辑
}

const handleBatchDelete = () => {
  console.log('批量删除记录IDs:', selectedIds.value)
  // 执行批量删除逻辑
}
</script>

```

### 在表单中使用
```vue
<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item>
      <z-save-button @click="submitForm" :loading="isSubmitting" />
      <z-reset-button @click="resetForm" :disabled="isSubmitting" />
      <z-cancel-button @click="cancel" :disabled="isSubmitting" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  username: '',
  email: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  try {
    // 模拟表单提交
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('表单提交成功', form)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  form.username = ''
  form.email = ''
}

const cancel = () => {
  console.log('取消操作')
}
</script>

```

## 属性
### 通用属性
所有按钮组件都支持以下属性：

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| size | 尺寸，可选值为large、default、small | String | 'default' | v6.0 |
| disabled | 是否禁用状态 | Boolean | false | v6.0 |
| loading | 是否加载中状态 | Boolean | false | v6.0 |
| icon | 自定义图标组件 | Component | undefined | v6.0 |
| text | 按钮文本内容 | String | 根据按钮类型不同 | v6.0 |
| throttleTime | 节流时间（毫秒），防止重复点击 | Number | 500 | v6.0 |


### Element Plus Button 属性
所有按钮组件都继承了Element Plus的Button组件的属性，包括：

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| type | 类型，可选值为primary、success、warning、danger、info、text | String | 根据按钮类型不同 | v6.0 |
| plain | 是否为朴素按钮 | Boolean | false | v6.0 |
| round | 是否为圆角按钮 | Boolean | false | v6.0 |
| circle | 是否为圆形按钮 | Boolean | false | v6.0 |
| autofocus | 是否默认聚焦 | Boolean | false | v6.0 |


### 删除按钮特有属性
ZDeleteButton 和 ZBatchDeleteButton 组件额外支持：

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| confirmText | 二次确认提示文本 | String | '确定要删除吗？' / '确定要批量删除吗？' | v6.0 |


## 事件
所有按钮组件都继承了Element Plus的Button组件的所有事件，主要包括：

| 事件名称 | 说明 | 回调参数 | 版本号 |
| --- | --- | --- | --- |
| click | 点击按钮时触发 | Event | v6.0 |


## 插槽
所有按钮组件都继承了Element Plus的Button组件的插槽，主要包括：

| 插槽名 | 说明 | 版本号 |
| --- | --- | --- |
| default | 按钮文本内容 | v6.0 |


## 注意事项
1. **统一设计**：这些按钮组件主要是为了统一UI风格和减少重复代码而设计的
2. **基于Element Plus**：所有按钮组件都基于Element Plus的Button组件，完全支持Button组件的所有属性和事件
3. **默认配置**：每种按钮都有预设的文本、类型和样式，但可以通过属性进行覆盖
4. **文本自定义**：按钮文本可以通过 `text` 属性或默认插槽自定义
5. **节流保护**：所有按钮都内置了节流功能（默认500ms），防止用户重复点击，可通过 `throttleTime` 属性调整
6. **二次确认**：删除类按钮（ZDeleteButton、ZBatchDeleteButton）具有内置的二次确认功能，使用 ElPopconfirm 组件实现
7. **状态管理**：建议配合 `loading` 和 `disabled` 属性使用，提供更好的用户体验

