# ZConditions-条件组件集
## 组件介绍
ZConditions是纵横框架提供的一系列条件设置组件，包括条件组、条件项和条件组件选择器。这些组件基于Element Plus的表单组件封装，提供了灵活的条件构建和管理功能，支持复杂的业务逻辑判断。组件支持动态添加条件、逻辑运算符设置（与/或）、多种条件类型和自定义组件扩展，使开发者可以快速实现复杂的条件筛选和业务规则配置功能。

## 条件组件列表
| 组件名称 | 说明 | 特性 | 版本号 |
| --- | --- | --- | --- |
| ZConditionGroup | 条件组 | 支持多条件组合，逻辑运算符设置，条件分组管理 | v6.0 |
| ZConditionItem | 条件项 | 单个条件配置，支持组件选择、操作符设置、条件值输入 | v6.0 |
| ZConditionWidgetSelect | 条件组件选择器 | 树形或下拉方式选择目标组件，支持组件分组显示 | v6.0 |


## 用法及示例代码
### 基本用法
```vue
<template>
  <div class="condition-demo">
    <z-condition-group
      :group-index="0"
      :group="conditionGroup"
      :widgets="widgets"
      :operators="operators"
      @init="handleInit"
      @remove="handleRemoveGroup"
      @widget-changed="handleWidgetChanged" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const conditionGroup = ref({
  conditions: [
    {
      operator: '||',
      targetKey: '',
      value: '',
      targetValue: ''
    }
  ]
})

const widgets = ref([
  {
    key: 'name',
    type: 'input',
    label: '姓名',
    field: 'name',
    children: []
  },
  {
    key: 'age',
    type: 'number',
    label: '年龄',
    field: 'age',
    children: []
  }
])

const operators = ref({
  input: [
    { value: 'eq', label: '等于' },
    { value: 'ne', label: '不等于' },
    { value: 'like', label: '包含' }
  ],
  number: [
    { value: 'eq', label: '等于' },
    { value: 'gt', label: '大于' },
    { value: 'lt', label: '小于' }
  ]
})

const handleInit = () => {
  console.log('条件初始化')
}

const handleRemoveGroup = () => {
  console.log('移除条件组')
}

const handleWidgetChanged = (condition, data, groupIndex, conditionIndex) => {
  console.log('组件变化:', condition, data)
}
</script>
<style scoped>
.condition-demo {
  padding: 20px;
}
</style>

```

### 单个条件项
```vue
<template>
  <z-condition-item
    :condition-index="0"
    :group-index="0"
    :condition="condition"
    :widgets="widgets"
    :get-operators="getOperators"
    :get-widget="getWidget"
    @init="handleInit"
    @remove="handleRemove"
    @widget-changed="handleWidgetChanged" />
</template>
<script setup>
import { ref } from 'vue'

const condition = ref({
  operator: '||',
  targetKey: 'name',
  value: 'eq',
  targetValue: '张三'
})

const widgets = ref([
  {
    key: 'name',
    type: 'input',
    label: '姓名',
    field: 'name'
  }
])

const getOperators = (widgetKey) => {
  const operatorMap = {
    input: [
      { value: 'eq', label: '等于' },
      { value: 'ne', label: '不等于' }
    ]
  }
  const widget = widgets.value.find((w) => w.key === widgetKey)
  return widget ? operatorMap[widget.type] || [] : []
}

const getWidget = (widgetKey) => {
  return widgets.value.find((w) => w.key === widgetKey)
}

const handleInit = () => {
  console.log('条件项初始化')
}

const handleRemove = () => {
  console.log('移除条件项')
}

const handleWidgetChanged = (condition, data) => {
  console.log('条件项组件变化:', condition, data)
}
</script>

```

### 条件组件选择器
```vue
<template>
  <z-condition-widget-select v-model="selectedWidget" :widgets="widgets" @change="handleWidgetChange" />
</template>
<script setup>
import { ref } from 'vue'

const selectedWidget = ref('')

const widgets = ref([
  {
    key: 'group1',
    label: '基础信息',
    children: [
      {
        key: 'name',
        label: '姓名',
        type: 'input'
      },
      {
        key: 'age',
        label: '年龄',
        type: 'number'
      }
    ]
  },
  {
    key: 'group2',
    label: '联系信息',
    children: [
      {
        key: 'phone',
        label: '手机号',
        type: 'input'
      },
      {
        key: 'email',
        label: '邮箱',
        type: 'input'
      }
    ]
  }
])

const handleWidgetChange = (key, label, extra) => {
  console.log('选择组件:', key, label, extra)
}
</script>

```

### 完整条件设置示例
```vue
<template>
  <div class="condition-builder">
    <el-button type="primary" @click="addConditionGroup">添加条件组</el-button>
    <z-condition-group
      v-for="(group, index) in conditionGroups"
      :key="index"
      :group-index="index"
      :group="group"
      :widgets="widgets"
      :operators="operators"
      :show-remove-button="conditionGroups.length > 1"
      @init="handleInit"
      @remove="removeConditionGroup(index)"
      @widget-changed="handleWidgetChanged" />

    <div class="condition-result">
      <h3>条件结果:</h3>
      <pre>{{ JSON.stringify(conditionGroups, null, 2) }}</pre>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const conditionGroups = ref([
  {
    conditions: [
      {
        operator: '||'
      }
    ]
  }
])

const widgets = ref([
  {
    key: 'basic',
    label: '基础信息',
    children: [
      {
        key: 'name',
        type: 'input',
        label: '姓名',
        field: 'name'
      },
      {
        key: 'age',
        type: 'number',
        label: '年龄',
        field: 'age'
      },
      {
        key: 'status',
        type: 'select',
        label: '状态',
        field: 'status'
      }
    ]
  }
])

const operators = ref({
  input: [
    { value: 'eq', label: '等于' },
    { value: 'ne', label: '不等于' },
    { value: 'like', label: '包含' },
    { value: 'notlike', label: '不包含' },
    { value: 'null', label: '为空' },
    { value: 'notnull', label: '不为空' }
  ],
  number: [
    { value: 'eq', label: '等于' },
    { value: 'ne', label: '不等于' },
    { value: 'gt', label: '大于' },
    { value: 'ge', label: '大于等于' },
    { value: 'lt', label: '小于' },
    { value: 'le', label: '小于等于' },
    { value: 'null', label: '为空' },
    { value: 'notnull', label: '不为空' }
  ],
  select: [
    { value: 'eq', label: '等于' },
    { value: 'ne', label: '不等于' },
    { value: 'in', label: '包含于' },
    { value: 'notin', label: '不包含于' }
  ]
})

const addConditionGroup = () => {
  conditionGroups.value.push({
    conditions: [
      {
        operator: '||'
      }
    ]
  })
}

const removeConditionGroup = (index) => {
  conditionGroups.value.splice(index, 1)
}

const handleInit = () => {
  console.log('条件初始化完成')
}

const handleWidgetChanged = (condition, data, groupIndex, conditionIndex) => {
  console.log('条件变化:', {
    condition,
    data,
    groupIndex,
    conditionIndex
  })
}
</script>
<style scoped>
.condition-builder {
  padding: 20px;
}

.condition-result {
  margin-top: 20px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.condition-result pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>

```

### 自定义操作符和组件
```vue
<template>
  <z-condition-group
    :group-index="0"
    :group="conditionGroup"
    :widgets="customWidgets"
    :operators="customOperators"
    :custom-components="customComponents"
    @widget-changed="handleWidgetChanged" />
</template>
<script setup>
import { ref } from 'vue'
import CustomDateRange from './CustomDateRange.vue'

const conditionGroup = ref({
  conditions: [
    {
      operator: '||'
    }
  ]
})

const customWidgets = ref([
  {
    key: 'daterange',
    type: 'custom-date-range',
    label: '日期范围',
    field: 'dateRange'
  }
])

const customOperators = ref({
  'custom-date-range': [
    {
      value: 'between',
      label: '介于',
      widget: {
        type: 'custom-date-range'
      }
    }
  ]
})

const customComponents = ref({
  'custom-date-range': CustomDateRange
})

const handleWidgetChanged = (condition, data) => {
  console.log('自定义组件变化:', condition, data)
}
</script>

```

## 属性
### ZConditionGroup 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| groupIndex | 条件组索引 | Number | - | v6.0 |
| group | 条件组数据对象 | Object | - | v6.0 |
| widgets | 可选择的组件列表 | Array | [] | v6.0 |
| operators | 操作符配置对象 | Object | - | v6.0 |
| customComponents | 自定义组件映射 | Object | {} | v6.0 |
| showRemoveButton | 是否显示移除按钮 | Boolean | true | v6.0 |
| showRemoveConditionItemButtonFn | 控制条件项移除按钮显示的函数 | Function | () => true | v6.0 |
| currentWidgetKey | 当前组件的key（用于过滤） | String | - | v6.0 |
| hideLogic | 是否隐藏逻辑操作符选择 | Boolean | false | v6.0 |


### ZConditionItem 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| groupIndex | 所属条件组索引 | Number | - | v6.0 |
| conditionIndex | 条件项索引 | Number | - | v6.0 |
| condition | 条件数据对象 | Object | - | v6.0 |
| widgets | 可选择的组件列表 | Array | - | v6.0 |
| getOperators | 获取操作符的函数 | Function | - | v6.0 |
| getWidget | 获取组件的函数 | Function | - | v6.0 |
| customComponents | 自定义组件映射 | Object | {} | v6.0 |
| showRemoveButton | 是否显示移除按钮 | Boolean | true | v6.0 |


### ZConditionWidgetSelect 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| value / v-model | 选中的组件key | String | '' | v6.0 |
| widgets | 可选择的组件列表 | Array | - | v6.0 |


## 事件
### ZConditionGroup 事件
| 事件名称 | 说明 | 回调参数 | 版本号 |
| --- | --- | --- | --- |
| init | 条件组初始化完成时触发 | - | v6.0 |
| remove | 移除条件组时触发 | - | v6.0 |
| widget-changed | 条件组件变化时触发 | condition, data, groupIndex, conditionIndex | v6.0 |


### ZConditionItem 事件
| 事件名称 | 说明 | 回调参数 | 版本号 |
| --- | --- | --- | --- |
| init | 条件项初始化完成时触发 | - | v6.0 |
| remove | 移除条件项时触发 | - | v6.0 |
| widget-changed | 条件组件变化时触发 | condition, data, groupIndex, conditionIndex | v6.0 |


### ZConditionWidgetSelect 事件
| 事件名称 | 说明 | 回调参数 | 版本号 |
| --- | --- | --- | --- |
| change | 选择组件变化时触发 | key, label, extra | v6.0 |


## 方法
### ZConditionItem 方法
| 方法名 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| remove | 移除当前条件项 | - | v6.0 |


## 插槽
### ZConditionGroup 插槽
| 插槽名称 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| groupTop | 条件组顶部内容 | - | v6.0 |
| groupLeft | 条件组左侧内容（默认为删除按钮） | - | v6.0 |
| [dynamic] | 动态插槽，根据组件配置的slot属性 | { data, index } | v6.0 |


### ZConditionItem 插槽
| 插槽名称 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| [dynamic] | 动态插槽，根据组件配置的slot属性 | { data, index } | v6.0 |


## 数据结构
### Condition 条件接口
```typescript
interface Condition {
  targetKey?: string // 目标组件key
  value?: string // 操作符值
  targetValue?: any // 条件值
  targetValue1?: any // 条件值1（范围查询时使用）
  targetField?: string // 目标字段
  label?: string // 操作符标签
  type?: string // 组件类型
  operator?: string // 逻辑操作符（||或&&）
  extends?: any // 扩展数据
  [key: string]: any // 其他属性
}
```

### Operator 操作符接口
```typescript
interface Operator {
  value: string // 操作符值
  label: string // 操作符显示标签
  widget?: Partial<any> // 关联的组件配置
  conditionValueChanged?: (value: any, condition: Condition, widget: any, object: any) => void // 条件值变化回调
}
```

### Widget 组件接口
```typescript
interface Widget {
  key: string // 组件唯一标识
  type: string // 组件类型
  label: string // 组件标签
  field?: string // 绑定字段
  children?: Widget[] // 子组件列表
  disabled?: boolean // 是否禁用
  slot?: string // 自定义插槽名
  [key: string]: any // 其他属性
}
```

## 注意事项
1. 条件组件主要用于构建复杂的查询条件和业务规则，支持多层级的条件组合
2. ZConditionGroup 支持"与"和"或"两种逻辑关系，同一组内的条件使用相同的逻辑关系
3. ZConditionItem 会根据选择的组件类型动态显示对应的操作符和条件值输入控件
4. ZConditionWidgetSelect 支持树形结构和平铺结构，会根据数据自动判断使用哪种显示方式
5. 组件支持自定义操作符和自定义组件，可以通过 customComponents 属性注册自定义组件
6. 条件值为"为空"和"不为空"时，不需要输入条件值
7. 组件内置了表单验证规则，确保条件配置的完整性
8. 支持动态插槽，可以为特定组件类型提供自定义的条件值输入界面
9. 组件依赖于Element Plus的Form、Select、TreeSelect等组件
10. 建议在使用前先定义好 widgets 和 operators 配置，确保条件组件的正常工作

