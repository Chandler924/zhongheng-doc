# ZSelectApplication-应用选择器
## 组件介绍
ZSelectApplication是一个基于Element Plus的应用选择器组件，用于在表单中选择系统内的应用。组件支持单选和多选模式，支持搜索功能，可配置清空按钮等样式特性。组件会自动从后端接口获取应用列表数据，并提供多种事件以便开发者对选择过程进行控制。

## 用法及示例代码
### 基本用法 - 多选模式
```vue
<template>
  <z-select-application v-model="selectedApps" @change="handleAppChange" />
</template>
<script setup>
import { ref } from 'vue'

const selectedApps = ref([])

const handleAppChange = (value, options) => {
  console.log('选中的应用ID:', value)
  console.log('选中的应用详情:', options)
}
</script>

```

### 单选模式
```vue
<template>
  <z-select-application v-model="selectedApp" mode="single" placeholder="请选择一个应用" />
</template>
<script setup>
import { ref } from 'vue'

const selectedApp = ref('')
</script>

```

### 可搜索和可清空
```vue
<template>
  <z-select-application v-model="selectedApps" :show-search="true" :allow-clear="true" />
</template>
<script setup>
import { ref } from 'vue'

const selectedApps = ref([])
</script>

```

### 不同尺寸
```vue
<template>
  <div class="select-size-demo">
    <z-select-application v-model="apps1" size="small" />
    <z-select-application v-model="apps2" />
    <z-select-application v-model="apps3" size="large" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const apps1 = ref([])
const apps2 = ref([])
const apps3 = ref([])
</script>
<style scoped>
.select-size-demo > * {
  margin-bottom: 16px;
}
</style>

```

### 禁用状态
```vue
<template>
  <z-select-application v-model="selectedApps" disabled />
</template>
<script setup>
import { ref } from 'vue'

// 初始化已选应用
const selectedApps = ref(['app1', 'app2'])
</script>

```

### 监听事件
```vue
<template>
  <z-select-application
    v-model="selectedApps"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    @dropdownVisibleChange="handleVisibleChange" />
</template>
<script setup>
import { ref } from 'vue'

const selectedApps = ref([])

const handleChange = (value, selectedOptions) => {
  console.log('选中值变化:', value)
  console.log('选中应用详情:', selectedOptions)
}

const handleFocus = (event) => {
  console.log('获得焦点')
}

const handleBlur = (event) => {
  console.log('失去焦点')
}

const handleVisibleChange = (visible) => {
  console.log('下拉菜单状态变化:', visible)
}
</script>

```

### 自定义下拉菜单样式
```vue
<template>
  <z-select-application v-model="selectedApps" popper-class="custom-select-dropdown" />
</template>
<script setup>
import { ref } from 'vue'

const selectedApps = ref([])
</script>
<style>
.custom-select-dropdown {
  max-height: 200px;
}
</style>

```

## 数据结构
### ApplicationOption接口
```typescript
interface ApplicationOption {
  id: string | number // 应用ID
  name: string // 应用名称
  [key: string]: any // 其他扩展字段
}
```

### API接口说明
组件使用的API接口：

+ **接口地址**: `/adapter/app/user/list`
+ **请求方法**: GET
+ **请求参数**: `applicationName` (string) - 应用名称，用于搜索过滤
+ **返回数据**: `ApplicationOption[]` - 应用列表数组

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值，单选模式为字符串，多选模式为数组 | string / string[] | '' | v6.0 |
| placeholder | 占位文本 | string | '请选择应用' | v6.0 |
| mode | 选择模式，'single'为单选，'multiple'为多选 | 'multiple' / 'single' | 'multiple' | v6.0 |
| allowClear | 是否显示清除按钮 | boolean | false | v6.0 |
| disabled | 是否禁用 | boolean | false | v6.0 |
| showSearch | 是否可搜索 | boolean | false | v6.0 |
| size | 选择框大小 | 'large' / 'default' / 'small' | 'default' | v6.0 |
| notFoundContent | 当下拉列表为空时显示的内容 | string | '暂无数据' | v6.0 |
| popperClass | 下拉菜单的自定义类名 | string | '' | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 绑定值变化时触发 | value | 选中的应用ID(单个或数组) | v6.0 |
| change | 选择值变化时触发 | value, selectedOptions | `value: string | string[], selectedOptions: object[]` | v6.0 |
| select | 选项被选中时触发 | value, selectedOptions | `value: string | string[], selectedOptions: object[]` | v6.0 |
| blur | 失去焦点时触发 | event | `event: FocusEvent` | v6.0 |
| deselect | 取消选择时触发 | value | 取消选择的值 | v6.0 |
| focus | 获得焦点时触发 | event | `event: FocusEvent` | v6.0 |
| dropdownVisibleChange | 下拉菜单显示状态变化时触发 | visible | `visible: boolean` | v6.0 |
| search | 搜索时触发 | query | `query: string` | v6.0 |
| popupScroll | 下拉列表滚动时触发 | event | `event: Event` | v6.0 |
| mouseenter | 鼠标进入选择框时触发 | event | `event: MouseEvent` | v6.0 |
| mouseleave | 鼠标离开选择框时触发 | event | `event: MouseEvent` | v6.0 |


## 方法
| 方法名 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| getObject | 根据选中值获取对应的应用对象信息 | value | v6.0 |


## 插槽
组件没有提供自定义插槽。

## 注意事项
1. 组件在挂载后会自动调用后端接口获取应用列表
2. 默认为多选模式，可以通过将`mode`设置为'single'来启用单选模式
3. 当使用多选模式时，选择多个应用会以标签形式显示
4. 可以通过`showSearch`属性启用搜索功能，支持按应用名称筛选
5. 组件依赖于Element Plus的Select和Option组件
6. 组件使用了`@zhv3/common-utils/http`进行API调用，需确保该依赖可用
7. 当使用单选模式时，`modelValue`的类型应为字符串

