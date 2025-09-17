# 组件库

纵横前端框架提供了丰富的UI组件，帮助你快速构建现代化的用户界面。

## 基础组件

### Button 按钮

```vue
<template>
  <div>
    <!-- 基础按钮 -->
    <z-button>默认按钮</z-button>
    <z-button type="primary">主要按钮</z-button>
    <z-button type="success">成功按钮</z-button>
    <z-button type="warning">警告按钮</z-button>
    <z-button type="danger">危险按钮</z-button>
    
    <!-- 不同尺寸 -->
    <z-button size="small">小按钮</z-button>
    <z-button size="medium">中等按钮</z-button>
    <z-button size="large">大按钮</z-button>
    
    <!-- 禁用状态 -->
    <z-button disabled>禁用按钮</z-button>
  </div>
</template>
```

### Input 输入框

```vue
<template>
  <div>
    <z-input 
      v-model="value" 
      placeholder="请输入内容"
      clearable
    />
    
    <!-- 不同尺寸 -->
    <z-input size="small" placeholder="小尺寸" />
    <z-input size="large" placeholder="大尺寸" />
    
    <!-- 密码输入 -->
    <z-input 
      type="password" 
      v-model="password"
      show-password
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const password = ref('')
</script>
```

### Card 卡片

```vue
<template>
  <z-card title="卡片标题" shadow="hover">
    <p>这是卡片的内容</p>
    <template #footer>
      <z-button type="primary">操作</z-button>
    </template>
  </z-card>
</template>
```

## 布局组件

### Container 容器

```vue
<template>
  <z-container>
    <z-header>头部</z-header>
    <z-main>主要内容</z-main>
    <z-footer>底部</z-footer>
  </z-container>
</template>
```

### Grid 栅格

```vue
<template>
  <z-row :gutter="20">
    <z-col :span="8">
      <div class="grid-content">列1</div>
    </z-col>
    <z-col :span="8">
      <div class="grid-content">列2</div>
    </z-col>
    <z-col :span="8">
      <div class="grid-content">列3</div>
    </z-col>
  </z-row>
</template>

<style>
.grid-content {
  background: #f0f2f5;
  padding: 20px;
  text-align: center;
}
</style>
```

## 数据展示组件

### Table 表格

```vue
<template>
  <z-table :data="tableData" :columns="columns">
    <template #actions="{ row }">
      <z-button size="small" @click="edit(row)">编辑</z-button>
      <z-button size="small" type="danger" @click="delete(row)">删除</z-button>
    </template>
  </z-table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' }
])

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'email', label: '邮箱' },
  { prop: 'actions', label: '操作', slot: 'actions' }
]

const edit = (row) => {
  console.log('编辑', row)
}

const delete = (row) => {
  console.log('删除', row)
}
</script>
```

### Pagination 分页

```vue
<template>
  <z-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    :page-sizes="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
  />
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)
</script>
```

## 反馈组件

### Message 消息提示

```vue
<template>
  <div>
    <z-button @click="showSuccess">成功消息</z-button>
    <z-button @click="showError">错误消息</z-button>
    <z-button @click="showWarning">警告消息</z-button>
    <z-button @click="showInfo">信息消息</z-button>
  </div>
</template>

<script setup>
import { Message } from '@zongheng/frontend'

const showSuccess = () => {
  Message.success('操作成功！')
}

const showError = () => {
  Message.error('操作失败！')
}

const showWarning = () => {
  Message.warning('请注意！')
}

const showInfo = () => {
  Message.info('这是一条信息')
}
</script>
```

### Loading 加载

```vue
<template>
  <div>
    <z-button @click="showLoading">显示加载</z-button>
    <z-button @click="hideLoading">隐藏加载</z-button>
  </div>
</template>

<script setup>
import { Loading } from '@zongheng/frontend'

const showLoading = () => {
  Loading.service({
    text: '加载中...',
    spinner: 'el-icon-loading'
  })
}

const hideLoading = () => {
  Loading.service().close()
}
</script>
```

## 表单组件

### Form 表单

```vue
<template>
  <z-form :model="form" :rules="rules" ref="formRef">
    <z-form-item label="用户名" prop="username">
      <z-input v-model="form.username" />
    </z-form-item>
    
    <z-form-item label="邮箱" prop="email">
      <z-input v-model="form.email" />
    </z-form-item>
    
    <z-form-item>
      <z-button type="primary" @click="submit">提交</z-button>
      <z-button @click="reset">重置</z-button>
    </z-form-item>
  </z-form>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formRef = ref()
const form = reactive({
  username: '',
  email: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('表单验证通过', form)
    }
  })
}

const reset = () => {
  formRef.value.resetFields()
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

## 组件API

每个组件都提供了完整的TypeScript类型定义，你可以在IDE中获得完整的智能提示和类型检查。

## 最佳实践

1. **按需引入**：只引入你需要的组件，减少打包体积
2. **主题定制**：使用CSS变量进行主题定制
3. **响应式设计**：合理使用栅格系统实现响应式布局
4. **表单验证**：使用Form组件的验证功能确保数据质量
