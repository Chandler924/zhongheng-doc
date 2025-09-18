# ZSelectConnectorApi-连接器接口选择器
## 组件介绍
ZSelectConnectorApi是一个用于选择连接器接口的级联选择器组件，基于Element Plus的Cascader组件封装。组件支持懒加载方式获取连接器及其接口数据，支持单选和多选模式。组件会自动从后端接口获取连接器树形数据和接口列表，便于用户在复杂的接口层次结构中快速选择所需的接口。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-select-connector-api v-model="selectedApi" @change="handleApiChange" />
</template>
<script setup>
import { ref } from 'vue'

const selectedApi = ref('')

const handleApiChange = (value) => {
  console.log('选中的接口ID:', value)
}
</script>

```

### 多选模式
```vue
<template>
  <z-select-connector-api v-model="selectedApis" :multiple="true" placeholder="请选择多个接口" />
</template>
<script setup>
import { ref } from 'vue'

const selectedApis = ref([])
</script>

```

### 自定义宽度
```vue
<template>
  <z-select-connector-api v-model="selectedApi" :width="300" />
</template>
<script setup>
import { ref } from 'vue'

const selectedApi = ref('')
</script>

```

### 禁用状态
```vue
<template>
  <z-select-connector-api v-model="selectedApi" disabled />
</template>
<script setup>
import { ref } from 'vue'

const selectedApi = ref('api_001')
</script>

```

### 不同尺寸
```vue
<template>
  <div class="size-demo">
    <z-select-connector-api v-model="api1" size="small" />
    <z-select-connector-api v-model="api2" />
    <z-select-connector-api v-model="api3" size="large" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const api1 = ref('')
const api2 = ref('')
const api3 = ref('')
</script>
<style scoped>
.size-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

```

### 手动刷新数据
```vue
<template>
  <div>
    <z-select-connector-api ref="apiSelectorRef" v-model="selectedApi" />
    <el-button @click="refreshData" :icon="Refresh">刷新数据</el-button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { Refresh } from '@element-plus/icons-vue'

const selectedApi = ref('')
const apiSelectorRef = ref(null)

const refreshData = () => {
  apiSelectorRef.value.refresh()
}
</script>

```

### 监听数据加载事件
```vue
<template>
  <z-select-connector-api v-model="selectedApi" @change="handleChange" @load-data="handleLoadData" />
</template>
<script setup>
import { ref } from 'vue'

const selectedApi = ref('')

const handleChange = (value) => {
  console.log('选中的接口ID:', value)
}

const handleLoadData = (success, data) => {
  if (success) {
    console.log('数据加载成功:', data)
  } else {
    console.error('数据加载失败:', data)
  }
}
</script>

```

### 设置组件样式
```vue
<template>
  <div class="api-selector-container">
    <z-select-connector-api v-model="selectedApi" :width="400" size="large" placeholder="请选择连接器接口" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const selectedApi = ref('')
</script>
<style scoped>
.api-selector-container {
  margin: 20px 0;
}
</style>

```

## 数据结构
### 连接器树节点接口
```typescript
interface ConnectorNode {
  id: string | number // 节点ID
  name: string // 节点名称
  type?: string // 节点类型（如'group'表示分组）
  children?: ConnectorNode[] // 子节点
  isLeaf?: boolean // 是否为叶子节点
  [key: string]: any // 其他扩展字段
}
```



## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值，单选为字符串，多选为数组 | string / string[] | '' | v6.0 |
| disabled | 是否禁用 | boolean | false | v6.0 |
| placeholder | 占位文本 | string | '请选择接口' | v6.0 |
| clearable | 是否可清空 | boolean | true | v6.0 |
| size | 尺寸 | 'large' / 'default' / 'small' | 'default' | v6.0 |
| width | 组件宽度，可以是数字（像素）或字符串 | string / number | '100%' | v6.0 |
| multiple | 是否多选 | boolean | false | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 绑定值变化时触发 | value | 选中的接口ID(单个或数组) | v6.0 |
| change | 选择值变化时触发 | value | 选中的接口ID(单个或数组) | v6.0 |
| load-data | 数据加载完成时触发 | success, data | `success: boolean, data: object` | v6.0 |


## 方法
| 方法名 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| refresh | 刷新连接器数据 | - | v6.0 |


## 插槽
| 插槽名 | 说明 | 版本号 |
| --- | --- | --- |
| default | 自定义级联选择器选项的显示内容 | v6.0 |


## 级联选择器配置
组件内部使用了以下级联选择器配置：

```typescript
const cascaderProps = {
  checkStrictly: false, // 是否可以选择任意级别的节点
  lazy: true, // 是否懒加载子节点
  lazyLoad: loadChildrenData, // 加载子节点的方法
  value: 'id', // 指定选项的值为节点对象的某个属性值
  label: 'name', // 指定选项标签为节点对象的某个属性值
  children: 'children', // 指定子选项为节点对象的某个属性值
  leaf: 'isLeaf', // 指定子节点是否为叶子节点
  multiple: props.multiple, // 是否多选
  emitPath: false // 是否返回路径数组（false表示只返回选中节点的值）
}
```

## 注意事项
1. 组件使用懒加载方式获取数据，只有展开节点时才会请求该节点的子节点数据
2. 组件默认返回选中节点的ID，不会返回完整的路径
3. 组件会自动处理连接器树形结构，用户可以方便地选择特定连接器下的接口
4. 当使用多选模式时，可以同时选择多个接口
5. 组件依赖于Element Plus的Cascader组件
6. 组件使用了`@zhv3/common-utils/http`进行API调用，需确保该依赖可用

