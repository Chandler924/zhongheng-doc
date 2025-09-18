# ZOperateButton-操作按钮
## 组件介绍
ZOperateButton是一个用于表格行操作的按钮组件，可以展示多个操作选项。组件会自动处理按钮数量过多的情况，超出指定数量的按钮将放入"更多"下拉菜单中。支持为每个操作按钮设置颜色、禁用状态，以及是否需要二次确认等特性。特别适合用于表格的操作列，提供了统一的操作按钮布局和交互体验。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-operate-button :operate-data="operateButtons" :extraData="row" @operate-button-click="handleButtonClick" />
</template>
<script setup>
import { ref } from 'vue'

const row = ref({ id: '1001', name: '测试数据' })

const operateButtons = ref([
  { name: '编辑', code: 'edit' },
  { name: '删除', code: 'delete', color: '#F56C6C', needConfirm: true, confirmText: '确定要删除此记录吗？' }
])

const handleButtonClick = ({ item, index, extraData }) => {
  console.log('点击了按钮:', item.name)
  console.log('按钮代码:', item.code)
  console.log('行数据:', extraData)

  // 根据按钮代码执行不同操作
  if (item.code === 'edit') {
    // 处理编辑操作
  } else if (item.code === 'delete') {
    // 处理删除操作
  }
}
</script>

```

### 多个操作按钮
```vue
<template>
  <z-operate-button :operate-data="operateButtons" :extraData="row" :max-visible="3" />
</template>
<script setup>
import { ref } from 'vue'

const operateButtons = ref([
  { name: '查看', code: 'view' },
  { name: '编辑', code: 'edit' },
  { name: '复制', code: 'copy' },
  { name: '审核', code: 'review' },
  { name: '删除', code: 'delete', color: '#F56C6C', needConfirm: true }
])
</script>

```

### 自定义按钮颜色
```vue
<template>
  <z-operate-button :operate-data="coloredButtons" :extraData="row" />
</template>
<script setup>
import { ref } from 'vue'

const coloredButtons = ref([
  { name: '通过', code: 'approve', color: '#67C23A' },
  { name: '驳回', code: 'reject', color: '#F56C6C' },
  { name: '详情', code: 'detail', color: '#409EFF' }
])
</script>

```

### 使用按钮回调函数
```vue
<template>
  <z-operate-button :operate-data="buttonWithCallbacks" :extraData="row" />
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const buttonWithCallbacks = ref([
  {
    name: '启用',
    code: 'enable',
    fn: (data) => {
      ElMessage.success('已启用')
      console.log('行数据:', data)
    }
  },
  {
    name: '禁用',
    code: 'disable',
    needConfirm: true,
    fn: (data) => {
      ElMessage.warning('已禁用')
      console.log('行数据:', data)
    }
  }
])
</script>

```

### 禁用特定按钮
```vue
<template>
  <z-operate-button :operate-data="buttonsWithDisabled" :extraData="row" />
</template>
<script setup>
import { ref } from 'vue'

const row = ref({ id: '1001', name: '测试数据' })

const buttonsWithDisabled = ref([
  { name: '编辑', code: 'edit' },
  { name: '删除', code: 'delete', disabled: true },
  { name: '导出', code: 'export' }
])
</script>

```

### 在表格中使用
```vue
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="address" label="地址" />
    <el-table-column label="操作" width="200">
      <template #default="scope">
        <z-operate-button
          :operate-data="getOperateButtons(scope.row)"
          :extraData="scope.row"
          @operate-button-click="handleOperateClick" />
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const tableData = ref([
  {
    id: 1,
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    status: 'active'
  },
  {
    id: 2,
    date: '2016-05-04',
    name: '李小明',
    address: '上海市普陀区金沙江路 1517 弄',
    status: 'inactive'
  }
])

const getOperateButtons = (row) => {
  const buttons = [
    { name: '查看', code: 'view' },
    { name: '编辑', code: 'edit' }
  ]

  // 根据行数据动态设置按钮
  if (row.status === 'active') {
    buttons.push({
      name: '禁用',
      code: 'disable',
      color: '#F56C6C',
      needConfirm: true,
      confirmText: '确定要禁用该用户吗？'
    })
  } else {
    buttons.push({
      name: '启用',
      code: 'enable',
      color: '#67C23A'
    })
  }

  buttons.push({
    name: '删除',
    code: 'delete',
    color: '#F56C6C',
    needConfirm: true,
    confirmText: '删除后无法恢复，确定要删除吗？'
  })

  return buttons
}

const handleOperateClick = ({ item, index, extraData }) => {
  console.log('操作:', item.code, '行数据:', extraData)

  switch (item.code) {
    case 'view':
      ElMessage.info(`查看用户：${extraData.name}`)
      break
    case 'edit':
      ElMessage.info(`编辑用户：${extraData.name}`)
      break
    case 'enable':
      ElMessage.success(`已启用用户：${extraData.name}`)
      extraData.status = 'active'
      break
    case 'disable':
      ElMessage.warning(`已禁用用户：${extraData.name}`)
      extraData.status = 'inactive'
      break
    case 'delete':
      ElMessage.error(`已删除用户：${extraData.name}`)
      // 从表格数据中移除
      const tableIndex = tableData.value.findIndex((item) => item.id === extraData.id)
      if (tableIndex > -1) {
        tableData.value.splice(tableIndex, 1)
      }
      break
  }
}
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| operateData | 操作按钮数据数组 | Array | [] | v6.0 |
| extraData | 额外数据，通常用于传递行数据 | Record<string, any> | {} | v6.0 |
| maxVisible | 最大可见按钮数量，超出部分将显示在"更多"下拉菜单中 | number | 3 | v6.0 |


### operateData数组项属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| name | 按钮显示文本 | string | - | v6.0 |
| code | 按钮代码，用于识别按钮类型 | string | - | v6.0 |
| color | 按钮文本颜色 | string | - | v6.0 |
| disabled | 是否禁用 | boolean | false | v6.0 |
| needConfirm | 是否需要二次确认 | boolean | false | v6.0 |
| confirmText | 确认提示文本 | string | '确定要执行此操作吗？' | v6.0 |
| icon | 按钮图标 | string | - | v6.0 |
| iconColor | 图标颜色 | string | - | v6.0 |
| fn | 按钮点击回调函数 | Function(extraData) | - | v6.0 |


## 数据结构
### OperateItem 接口
```typescript
interface OperateItem {
  name: string // 按钮显示文本
  code?: string // 按钮代码，用于识别按钮类型
  color?: string // 按钮文本颜色
  disabled?: boolean // 是否禁用
  needConfirm?: boolean // 是否需要二次确认
  confirmText?: string // 确认提示文本
  icon?: string // 按钮图标
  iconColor?: string // 图标颜色
  fn?: Function // 按钮点击回调函数
  [key: string]: any // 其他自定义属性
}
```

## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| operate-button-click | 操作按钮点击时触发 | { item, index, extraData } | `item: OperateItem, index: number, extraData: any` | v6.0 |


## 方法
组件没有暴露公共方法。

## 插槽
组件没有提供自定义插槽。

## 注意事项
1. 当操作按钮数量超过`maxVisible`时，超出部分会自动放入"更多"下拉菜单中
2. 对于需要二次确认的按钮，组件会自动展示确认对话框
3. 按钮可以通过`color`属性自定义文本颜色，便于区分不同操作的重要性
4. 可以为每个按钮设置`fn`回调函数，直接处理点击事件，也可以通过`operate-button-click`事件统一处理
5. 组件依赖于Element Plus的Button、Popconfirm、Dropdown等组件
6. 组件适合在表格的操作列中使用，可以有效节省空间并保持界面整洁

