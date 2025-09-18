# ZCheckbox-复选框
## 组件介绍
ZCheckbox是一个基于Element Plus的复选框组件封装，提供了更简洁的API和更灵活的使用方式。组件支持两种模式：

1. **单个复选框模式**：通过 `single` 属性启用，适用于单一选择场景
2. **复选框组模式**：默认模式，通过 `options` 属性传入选项数据，支持多选和按钮样式

## 用法及示例代码
### 单个复选框模式
```vue
<template>
  <div>
    <!-- 基础单个复选框 -->
    <z-checkbox v-model="agree" single label="我同意用户协议" />

    <!-- 带值标签的单个复选框 -->
    <z-checkbox v-model="subscribe" single label="是否订阅邮件通知" true-label="yes" false-label="no" />

    <!-- 不确定状态的单个复选框 -->
    <z-checkbox
      v-model="selectAll"
      single
      label="全选"
      :indeterminate="isIndeterminate"
      @change="handleSelectAllChange" />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

// 简单布尔值
const agree = ref(false)

// 自定义值标签
const subscribe = ref('no')

// 全选控制示例
const selectAll = ref(false)
const selectedItems = ref(['item1'])
const allItems = ['item1', 'item2', 'item3']

const isIndeterminate = computed(() => {
  const selectedCount = selectedItems.value.length
  return selectedCount > 0 && selectedCount < allItems.length
})

const handleSelectAllChange = (val) => {
  selectedItems.value = val ? [...allItems] : []
}
</script>

```

### 基本用法 - 复选框组
```vue
<template>
  <z-checkbox
    v-model="checkboxGroup"
    :options="[
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' }
    ]" />
</template>
<script setup>
import { ref } from 'vue'

// 注意：复选框组的值必须是数组类型
const checkboxGroup = ref([])
</script>

```

### 复选框组 - 预选值
```vue
<template>
  <z-checkbox
    v-model="checkboxGroup"
    :options="[
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' }
    ]" />
</template>
<script setup>
import { ref } from 'vue'

// 预先选中"选项1"
const checkboxGroup = ref(['1'])
</script>

```

### 禁用状态
```vue
<template>
  <z-checkbox v-model="checkboxGroup" :options="[{ label: '禁用选项', value: '1' }]" disabled />
</template>
<script setup>
import { ref } from 'vue'

const checkboxGroup = ref([])
</script>

```

### 不确定状态
```vue
<template>
  <z-checkbox v-model="checkboxGroup" :options="[{ label: '中间状态', value: '1' }]" :indeterminate="true" />
</template>
<script setup>
import { ref } from 'vue'

const checkboxGroup = ref(['1'])
</script>

```

### 不同尺寸
```vue
<template>
  <div>
    <z-checkbox v-model="smallGroup" :options="[{ label: '小尺寸', value: '1' }]" size="small" />
    <z-checkbox v-model="defaultGroup" :options="[{ label: '默认尺寸', value: '2' }]" />
    <z-checkbox v-model="largeGroup" :options="[{ label: '大尺寸', value: '3' }]" size="large" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const smallGroup = ref([])
const defaultGroup = ref([])
const largeGroup = ref([])
</script>

```

### 按钮样式的复选框组
```vue
<template>
  <z-checkbox v-model="roles" :options="roleOptions" button />
</template>
<script setup>
import { ref } from 'vue'

const roles = ref([])
const roleOptions = ref([
  { label: '管理员', value: 'admin' },
  { label: '编辑', value: 'editor' },
  { label: '访客', value: 'visitor' }
])
</script>

```

### 带边框的复选框
```vue
<template>
  <z-checkbox v-model="features" :options="featureOptions" border />
</template>
<script setup>
import { ref } from 'vue'

const features = ref([])
const featureOptions = ref([
  { label: '功能1', value: 'feature1' },
  { label: '功能2', value: 'feature2' },
  { label: '功能3', value: 'feature3' }
])
</script>

```

### 设置选择限制
```vue
<template>
  <z-checkbox v-model="selectedDays" :options="days" :min="1" :max="3" />
</template>
<script setup>
import { ref } from 'vue'

const selectedDays = ref([])
const days = ref([
  { label: '周一', value: 'Monday' },
  { label: '周二', value: 'Tuesday' },
  { label: '周三', value: 'Wednesday' },
  { label: '周四', value: 'Thursday' },
  { label: '周五', value: 'Friday' },
  { label: '周六', value: 'Saturday' },
  { label: '周日', value: 'Sunday' }
])
</script>

```

## 属性
### 通用属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值，复选框组模式为数组，单个模式为基本类型 | Array / String / Number / Boolean / undefined | undefined | v6.0 |
| disabled | 是否禁用 | Boolean | false | v6.0 |
| size | 尺寸大小，可选值为large、default、small | String | 'default' | v6.0 |
| border | 是否显示边框 | Boolean | false | v6.0 |


### 复选框组模式属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| options | 选项数组，每个选项包含label、value和disabled属性 | Array | [] | v6.0 |
| button | 是否使用按钮样式 | Boolean | false | v6.0 |
| min | 可被勾选的最小数量 | Number | - | v6.0 |
| max | 可被勾选的最大数量 | Number | - | v6.0 |


### 单个复选框模式属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| single | 是否启用单个复选框模式 | Boolean | false | v6.0 |
| label | 单个复选框的标签文本 | String | '' | v6.0 |
| trueLabel | 选中时的值 | String / Number | undefined | v6.0 |
| falseLabel | 未选中时的值 | String / Number | undefined | v6.0 |
| indeterminate | 是否为不确定状态（仅单个模式） | Boolean | false | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 值变化时触发 | value | 复选框组：数组；单个复选框：string/number/boolean/undefined | v6.0 |
| change | 值变化时触发 | value | 复选框组：数组；单个复选框：string/number/boolean/undefined | v6.0 |


## 方法
组件没有暴露公共方法。

## 插槽
组件没有提供自定义插槽。

## 注意事项
1. **双模式支持**：
    - **单个复选框模式**：设置 `single` 属性为 `true`，`modelValue` 为 boolean/string/number 类型
    - **复选框组模式**：默认模式，`modelValue` 必须为数组类型，通过 `options` 属性传入选项
2. **数据绑定**：
    - 复选框组模式：`modelValue` 绑定值必须是数组类型
    - 单个复选框模式：`modelValue` 可以是 boolean、string、number 或 undefined
3. **选项配置**：
    - 复选框组模式通过 `options` 属性传入选项数据，不是通过子组件
    - 每个选项对象包含 `label`、`value` 和可选的 `disabled` 属性
    - 每个选项可以通过 `disabled` 属性单独设置禁用状态
4. **功能特性**：
    - 使用 `min` 和 `max` 可以限制复选框组可选中的最小和最大数量
    - 单个复选框支持 `trueLabel` 和 `falseLabel` 自定义选中/未选中的值
    - 支持 `indeterminate` 不确定状态，常用于全选/部分选中场景

