# ZSelectRole-角色选择器
## 组件介绍
ZSelectRole是一个基于Element Plus的角色选择器组件，用于在表单中选择系统中的角色。组件支持单选和多选模式，支持搜索功能，可配置清空按钮、下拉箭头等样式特性。组件会自动从后端接口获取角色列表数据，并提供多种事件以便开发者对选择过程进行控制。

## 用法及示例代码
### 基本用法 - 多选模式
```vue
<template>
  <z-select-role v-model="selectedRoles" @change="handleRoleChange" />
</template>
<script setup>
import { ref } from 'vue'

const selectedRoles = ref([])

const handleRoleChange = (value, options) => {
  console.log('选中的角色ID:', value)
  console.log('选中的角色详情:', options)
}
</script>

```

### 单选模式
```vue
<template>
  <z-select-role v-model="selectedRole" mode="" placeholder="请选择一个角色" />
</template>
<script setup>
import { ref } from 'vue'

const selectedRole = ref('')
</script>

```

### 可搜索和可清空
```vue
<template>
  <z-select-role v-model="selectedRoles" :show-search="true" :allow-clear="true" />
</template>
<script setup>
import { ref } from 'vue'

const selectedRoles = ref([])
</script>

```

### 不同尺寸
```vue
<template>
  <div class="select-size-demo">
    <z-select-role v-model="roles1" size="small" />
    <z-select-role v-model="roles2" />
    <z-select-role v-model="roles3" size="large" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const roles1 = ref([])
const roles2 = ref([])
const roles3 = ref([])
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
  <z-select-role v-model="selectedRoles" disabled />
</template>
<script setup>
import { ref } from 'vue'

// 初始化已选角色
const selectedRoles = ref(['role1', 'role2'])
</script>

```

### 隐藏下拉箭头
```vue
<template>
  <z-select-role v-model="selectedRoles" :show-arrow="false" />
</template>
<script setup>
import { ref } from 'vue'

const selectedRoles = ref([])
</script>

```

### 监听事件
```vue
<template>
  <z-select-role
    v-model="selectedRoles"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    @dropdown-visible-change="handleVisibleChange" />
</template>
<script setup>
import { ref } from 'vue'

const selectedRoles = ref([])

const handleChange = (value, options) => {
  console.log('选中值变化:', value)
  console.log('选中角色详情:', options)
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

### 使用getObjects方法
```vue
<template>
  <div>
    <z-select-role ref="roleSelectRef" v-model="selectedRoles" />
    <el-button @click="getRoleDetails">获取选中角色详情</el-button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const selectedRoles = ref(['role1', 'role2'])
const roleSelectRef = ref(null)

const getRoleDetails = () => {
  const roleDetails = roleSelectRef.value.getObjects(selectedRoles.value)
  console.log('角色详情:', roleDetails)
}
</script>

```

## 数据结构
### RoleInfo接口
```typescript
interface RoleInfo {
  id: string // 角色ID
  name: string // 角色名称
  [key: string]: any // 其他扩展字段
}
```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值，单选模式为字符串，多选模式为数组 | string / string[] | [] | v6.0 |
| placeholder | 占位文本 | string | '请选择角色' | v6.0 |
| mode | 选择模式，设置为''时为单选，'multiple'为多选 | 'multiple' / 'tags' / '' | 'multiple' | v6.0 |
| allowClear | 是否显示清除按钮 | boolean | false | v6.0 |
| disabled | 是否禁用 | boolean | false | v6.0 |
| showSearch | 是否可搜索 | boolean | false | v6.0 |
| showArrow | 是否显示下拉箭头 | boolean | true | v6.0 |
| labelInValue | 是否将选项的label包装到值中 | boolean | false | v6.0 |
| size | 选择框大小 | 'large' / 'default' / 'small' | 'default' | v6.0 |
| notFoundContent | 当下拉列表为空时显示的内容 | string | '暂无数据' | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 绑定值变化时触发 | value | 选中的角色ID(单个或数组) | v6.0 |
| change | 选择值变化时触发 | value, options | `value: string | string[], options: RoleInfo[]` | v6.0 |
| select | 选项被选中时触发 | value, options | `value: string | string[], options: RoleInfo[]` | v6.0 |
| blur | 失去焦点时触发 | event | `event: FocusEvent` | v6.0 |
| deselect | 取消选择时触发 | value | `value: string | string[]` | v6.0 |
| focus | 获得焦点时触发 | event | `event: FocusEvent` | v6.0 |
| inputKeydown | 键盘按下时触发 | event | `event: KeyboardEvent` | v6.0 |
| dropdownVisibleChange | 下拉菜单显示状态变化时触发 | visible | `visible: boolean` | v6.0 |


## 方法
| 方法名 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| getObjects | 根据选中值获取对应的角色对象信息 | value | v6.0 |


## 插槽
组件没有提供自定义插槽。

## 注意事项
1. 组件在挂载后会自动调用后端接口获取角色列表
2. 默认为多选模式，可以通过将`mode`设置为空字符串来启用单选模式
3. 当使用多选模式时，会自动启用标签折叠功能，多个选择项会被折叠显示
4. 可以通过`showSearch`属性启用搜索功能，支持按角色名称筛选
5. 组件依赖于Element Plus的Select和Option组件
6. 组件使用了`@zhv3/common-utils/http`进行API调用，需确保该依赖可用

