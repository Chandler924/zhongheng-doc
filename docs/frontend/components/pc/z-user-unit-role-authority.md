# ZUserUnitRoleAuthority-权限设置
## 组件介绍
ZUserUnitRoleAuthority是一个权限设置组件，用于选择和管理机构、人员和角色权限。组件提供了树形结构的选择界面，支持搜索功能，可以同时管理三种不同类型的权限主体。组件适用于系统中需要配置权限的场景，如应用权限设置、表单权限设置等。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-user-unit-role-authority v-model="authorityValue" />
</template>
<script setup>
import { ref } from 'vue'

const authorityValue = ref({
  unit: [], // 机构ID数组
  user: [], // 用户ID数组
  role: [] // 角色ID数组
})
</script>

```

### 与应用关联
```vue
<template>
  <z-user-unit-role-authority v-model="authorityValue" application-id="app_123" service="application" />
</template>
<script setup>
import { ref } from 'vue'

const authorityValue = ref({
  unit: [],
  user: [],
  role: []
})
</script>

```

### 与表单关联
```vue
<template>
  <z-user-unit-role-authority v-model="authorityValue" form-id="form_123" service="form" />
</template>
<script setup>
import { ref } from 'vue'

const authorityValue = ref({
  unit: [],
  user: [],
  role: []
})
</script>

```

### 禁用状态
```vue
<template>
  <z-user-unit-role-authority v-model="authorityValue" :disabled="true" />
</template>
<script setup>
import { ref } from 'vue'

const authorityValue = ref({
  unit: ['UNIT100001'],
  user: ['1760504198283182082'],
  role: ['role_123']
})
</script>

```

### 监听变化事件
```vue
<template>
  <z-user-unit-role-authority v-model="authorityValue" @change="handleAuthorityChange" />
</template>
<script setup>
import { ref } from 'vue'

const authorityValue = ref({
  unit: [],
  user: [],
  role: []
})

const handleAuthorityChange = (value, data) => {
  console.log('权限值变化:', value)
  console.log('权限数据详情:', data)
}
</script>

```

### 使用搜索功能
组件内置了搜索功能，可以通过搜索框快速查找机构、人员或角色。

```vue
<template>
  <z-user-unit-role-authority v-model="authorityValue" />
</template>
<script setup>
import { ref } from 'vue'

const authorityValue = ref({
  unit: [],
  user: [],
  role: []
})

// 组件内部搜索功能说明：
// 1. 点击输入框打开权限设置对话框
// 2. 在对话框顶部的搜索框中输入关键词
// 3. 搜索结果会显示匹配的机构、人员和角色
// 4. 点击搜索结果项会自动添加到对应的权限列表中
</script>

```

### 监听输入事件
```vue
<template>
  <z-user-unit-role-authority v-model="authorityValue" @input="handleInput" @change="handleChange" />
</template>
<script setup>
import { ref } from 'vue'

const authorityValue = ref({
  unit: [],
  user: [],
  role: []
})

const handleInput = (value, data) => {
  console.log('权限值输入变化:', value)
  console.log('详细数据:', data)
}

const handleChange = (value, data) => {
  console.log('权限值确认变化:', value)
  console.log('详细数据:', data)
}
</script>

```

### 表单中使用
```vue
<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="权限设置">
      <z-user-unit-role-authority v-model="form.authority" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref } from 'vue'

const form = ref({
  authority: {
    unit: [],
    user: [],
    role: []
  }
})

const submitForm = () => {
  console.log('提交表单:', form.value)
}
</script>

```

### 显示只读权限信息
```vue
<template>
  <z-user-unit-role-authority v-model="readonlyAuthority" :disabled="true" />
</template>
<script setup>
import { ref } from 'vue'

const readonlyAuthority = ref({
  unit: ['UNIT100001', 'UNIT100002'],
  user: ['1760504198283182082', '1760504198283182083'],
  role: ['role_admin', 'role_user']
})
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值，包含unit、user和role三个数组 | Object | {} | v6.0 |
| service | 服务类型，用于指定API调用的服务 | String | 'application' | v6.0 |
| applicationId | 应用ID，与应用关联时使用 | String | '' | v6.0 |
| formId | 表单ID，与表单关联时使用 | String | '' | v6.0 |
| disabled | 是否禁用 | Boolean | false | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 值变化时触发 | value | `{unit: string[], user: string[], role: string[]}` | v6.0 |
| input | 输入值变化时触发 | value, data | `value: {unit: string[], user: string[], role: string[]}, data: {unitList: object[], userList: object[], roleList: object[]}` | v6.0 |
| change | 值变化时触发 | value, data | `value: {unit: string[], user: string[], role: string[]}, data: {unitList: object[], userList: object[], roleList: object[]}` | v6.0 |


## 方法
组件没有暴露公共方法。

## 插槽
组件没有提供自定义插槽。

## 数据结构
### AuthorityValue 权限值接口
```typescript
interface AuthorityValue {
  unit: string[] // 机构ID数组
  user: string[] // 用户ID数组
  role: string[] // 角色ID数组
}
```

### AuthorityData 权限数据接口
```typescript
interface AuthorityData {
  unitList: UnitInfo[] // 机构信息列表
  userList: UserInfo[] // 用户信息列表
  roleList: RoleInfo[] // 角色信息列表
}
```

### UnitInfo 机构信息接口
```typescript
interface UnitInfo {
  id: string // 机构ID
  name: string // 机构名称
  fullUnitName?: string // 机构全名
  [key: string]: any // 其他扩展字段
}
```

### UserInfo 用户信息接口
```typescript
interface UserInfo {
  id: string // 用户ID
  name: string // 用户名称
  fullUserName?: string // 用户全名
  [key: string]: any // 其他扩展字段
}
```

### RoleInfo 角色信息接口
```typescript
interface RoleInfo {
  id: string // 角色ID
  name: string // 角色名称
  [key: string]: any // 其他扩展字段
}
```

## 注意事项
1. 组件的`modelValue`需要是一个包含unit、user和role三个数组的对象
2. 当设置了`applicationId`时，组件会自动从服务器获取该应用相关的权限数据
3. 当设置了`formId`时，组件会自动从服务器获取该表单相关的权限数据
4. 组件内部使用树形结构展示机构、人员和角色数据，支持搜索功能
5. 组件依赖于Element Plus的Dialog、Input、Tag等组件
6. 组件依赖后端API接口获取机构、用户和角色数据
7. 机构ID通常以"UNIT"开头，用于区分用户ID
8. 搜索功能支持按名称搜索机构、人员和角色，搜索结果会显示在下拉列表中

