# ZSelectUser-人员选择器
## 组件介绍
ZSelectUser是一个人员选择器组件，用于在表单中选择系统用户。组件支持单选和多选模式，可以按组织机构层级浏览和选择用户，支持搜索功能。组件通过弹出对话框的方式进行选择，并在输入框中显示已选择的用户名称。

## 用法及示例代码
### 基本用法
```vue
<template>
  <ZSelectUser v-model="userPickerValue" @change="handleUserPickerChange" @confirm="handleUserPickerConfirm" />
</template>
<script setup>
import { ref } from 'vue'

const userPickerValue = ref<string[]>([])

const handleUserPickerChange = (userIds, userData) => {
  console.log('选中的用户ID:', userIds)
  console.log('选中的用户数据:', userData)
}

const handleUserPickerConfirm = (userIds, userData) => {
  console.log('确认选择的用户:', userData)
}
</script>

```

### 限制选择数量
```vue
<template>
  <ZSelectUser v-model="selectedUser" :limit="1" placeholder="请选择审批人" @confirm="handleConfirm" />
</template>
<script setup>
import { ref } from 'vue'

const selectedUser = ref<string[]>([])

const handleConfirm = (userIds, userData) => {
  console.log('确认选择的用户:', userData[0])
}
</script>

```

### 指定顶级组织
```vue
<template>
  <ZSelectUser v-model="selectedUsers" top-unit-id="dept001" top-unit-name="技术部" :is-include-children="1" />
</template>
<script setup>
import { ref } from 'vue'

const selectedUsers = ref<string[]>([])
</script>

```

### 禁用状态
```vue
<template>
  <ZSelectUser v-model="selectedUsers" disabled />
</template>
<script setup>
import { ref } from 'vue'

// 初始化已选用户
const selectedUsers = ref<string[]>([])
</script>

```

### 监听事件变化
```vue
<template>
  <ZSelectUser v-model="selectedUsers" @change="handleChange" @confirm="handleConfirm" />
</template>
<script setup>
import { ref } from 'vue'

const selectedUsers = ref<string[]>([])

const handleChange = (userIds, userData) => {
  console.log('用户ID:', userIds)
  console.log('用户数据:', userData)
}

const handleConfirm = (userIds, userData) => {
  console.log('确认选择:', userData)
}
</script>

```



### 设置查询条件
```vue
<template>
  <ZSelectUser
    v-model="selectedUsers"
    contain-self="1"
    :is-include-children="0"
    deep="3"
    :not-allowed="['user1', 'user2']"
    :is-leader="true"
    exist-top-leader="1" />
</template>
<script setup>
import { ref } from 'vue'

const selectedUsers = ref<string[]>([])
</script>

```

### 仅显示领导人员
```vue
<template>
  <ZSelectUser v-model="selectedLeaders" :is-leader="true" placeholder="请选择审批领导" />
</template>
<script setup>
import { ref } from 'vue'

const selectedLeaders = ref<string[]>([])
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 选中的用户ID数组 | Array | [] | v6.0 |
| placeholder | 输入框占位文本 | String | '请选择人员' | v6.0 |
| limit | 最多可选择的用户数量，0表示不限制 | Number | 0 | v6.0 |
| disabled | 是否禁用 | Boolean | false | v6.0 |
| topUnitId | 顶级组织机构ID | String | '0' | v6.0 |
| topUnitName | 顶级组织机构名称 | String | '最顶级' | v6.0 |
| containSelf | 是否包含自己 | String | '0'表示不包含，'1'表示包含 | v6.0 |
| isIncludeChildren | 是否包含子级 | String | '1'表示包含，'0表示不包含' | v6.0 |
| label | 标签名称 | String | '' | v6.0 |
| extend | 扩展参数 | String | '' | v6.0 |
| deep | 查询深度 | String | '1' | v6.0 |
| notAllowed | 不允许选择的用户ID列表 | Array | [] | v6.0 |
| isLeader | 是否只显示领导 | Boolean | false | v6.0 |
| existTopLeader | 是否包含顶级领导 | String | '0'表示不包含，'1表示包含' | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 选中值变化时触发 | userIds | 选中的用户ID数组 | v6.0 |
| change | 选择变化时触发 | userIds, userData | `userIds: string[], userData: object[]` | v6.0 |
| confirm | 确认选择时触发 | userIds, userData | `userIds: string[], userData: object[]` | v6.0 |


## 方法
| 方法名 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| clear | 清空选择 | - | v6.0 |
| openDialog | 打开选择对话框 | - | v6.0 |
| getReverseData | 根据当前选中ID获取用户数据 | - | v6.0 |


## 插槽
组件没有提供自定义插槽。

## 数据结构
### UserItem 用户项接口
```typescript
interface UserItem {
  id: string // 用户ID
  name: string // 用户姓名
  fullName?: string // 用户全名
  type?: string // 用户类型，'1'表示机构
  [key: string]: any // 其他扩展字段
}
```

## API 接口
组件内部使用以下API接口：

+ `getTreeUnitUsersByUserIds(userIds: string, deep: string)` - 根据用户ID获取用户信息
+ `getCrumbsByTopUnit(topUnitId: string, topUnitName: string)` - 获取机构面包屑路径
+ `getTreeUserListByUnitIds(unitIds: string)` - 根据机构ID获取机构下的用户列表

## 注意事项
1. 组件支持选择组织机构，选择机构后会自动获取该机构下的所有用户
2. 当设置`limit`为1时，组件会以单选模式运行
3. 组件内部会缓存已查询的用户数据，减少重复请求
4. 组件会自动处理组织机构ID和用户ID的区分，组织机构ID会以"UNIT"为前缀
5. 组件依赖于Element Plus的Input和Button组件
6. 组件使用UserDialog子组件实现选择对话框，需要确保该组件可用

