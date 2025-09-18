# ZSelectUnit-部门选择器
## 组件介绍
ZSelectUnit是一个部门/机构选择器组件，用于在表单中选择系统中的组织机构。组件支持单选和多选模式，可以按组织机构层级浏览和选择，支持搜索功能。组件通过弹出对话框的方式进行选择，并在输入框中显示已选择的机构名称。

## 用法及示例代码
### 基本用法
```vue
<template>
  <ZSelectUnit
    v-model="unitPickerValue"
    :limit="10"
    @change="handleUnitPickerChange"
    @confirm="handleUnitPickerConfirm" />
</template>
<script setup>
import { ref } from 'vue'

const unitPickerValue = ref<string[]>([])

const handleUnitPickerChange = (unitIds, unitData) => {
  console.log('选中的机构ID:', unitIds)
  console.log('选中的机构数据:', unitData)
}

const handleUnitPickerConfirm = (unitIds, unitData) => {
  console.log('确认选择的机构:', unitData)
}
</script>

```

### 限制选择数量
```vue
<template>
  <ZSelectUnit v-model="selectedUnit" :limit="1" placeholder="请选择所属部门" @confirm="handleConfirm" />
</template>
<script setup>
import { ref } from 'vue'

const selectedUnit = ref<string[]>([])

const handleConfirm = (unitIds, unitData) => {
  console.log('确认选择的部门:', unitData[0])
}
</script>

```

### 指定顶级组织
```vue
<template>
  <ZSelectUnit v-model="selectedUnits" top-unit-id="dept001" top-unit-name="技术中心" :is-include-children="1" />
</template>
<script setup>
import { ref } from 'vue'

const selectedUnits = ref<string[]>([])
</script>

```

### 显示全称
```vue
<template>
  <ZSelectUnit v-model="selectedUnits" :short-name="false" />
</template>
<script setup>
import { ref } from 'vue'

const selectedUnits = ref<string[]>([])
</script>

```

### 禁用状态
```vue
<template>
  <ZSelectUnit v-model="selectedUnits" disabled />
</template>
<script setup>
import { ref } from 'vue'

// 初始化已选部门
const selectedUnits = ref<string[]>([])
</script>

```

### 监听事件变化
```vue
<template>
  <ZSelectUnit v-model="selectedUnits" @change="handleChange" @confirm="handleConfirm" />
</template>
<script setup>
import { ref } from 'vue'

const selectedUnits = ref<string[]>([])

const handleChange = (unitIds, unitData) => {
  console.log('机构ID:', unitIds)
  console.log('机构数据:', unitData)
}

const handleConfirm = (unitIds, unitData) => {
  console.log('确认选择:', unitData)
}
</script>

```

### 使用组件方法
```vue
<template>
  <div>
    <ZSelectUnit ref="unitSelectRef" v-model="selectedUnits" />
    <el-button @click="clearSelection">清空选择</el-button>
    <el-button @click="openDialog">打开选择器</el-button>
    <el-button @click="getUnitData">获取机构数据</el-button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const unitSelectRef = ref()
const selectedUnits = ref<string[]>([])

const clearSelection = () => {
  unitSelectRef.value.clear()
}

const openDialog = () => {
  unitSelectRef.value.openDialog()
}

const getUnitData = async () => {
  const data = await unitSelectRef.value.getReverseData()
  console.log('机构数据:', data)
}
</script>

```

### 设置查询条件
```vue
<template>
  <ZSelectUnit v-model="selectedUnits" need-unit-type="2" auth="1" :is-include-children="0" deep="3" />
</template>
<script setup>
import { ref } from 'vue'

const selectedUnits = ref<string[]>([])
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 选中的机构ID数组 | Array | [] | v6.0 |
| placeholder | 输入框占位文本 | String | '请选择机构' | v6.0 |
| needUnitType | <font style="color:rgb(64, 64, 64);">查询机构类型，1: 全部; 2: 查询单位; 3: 查询部门</font> | String | '1' | v6.0 |
| limit | 最多可选择的机构数量，0表示不限制 | Number | 0 | v6.0 |
| disabled | 是否禁用 | Boolean | false | v6.0 |
| topUnitId | 顶级组织机构ID | String | '0' | v6.0 |
| topUnitName | 顶级组织机构名称 | String | '最顶级' | v6.0 |
| auth | 权限控制参数 | String | '0' | v6.0 |
| label | 标签名称 | String | '' | v6.0 |
| extend | 扩展参数 | String | '' | v6.0 |
| deep | 查询深度 | String | '1' | v6.0 |
| shortName | 是否显示机构简称，false则显示全称 | Boolean | true | v6.0 |
| isIncludeChildren | 是否包含子级 | String | '1' | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 选中值变化时触发 | unitIds | 选中的机构ID数组 | v6.0 |
| change | 选择变化时触发 | unitIds, unitData | `unitIds: string[], unitData: object[]` | v6.0 |
| confirm | 确认选择时触发 | unitIds, unitData | `unitIds: string[], unitData: object[]` | v6.0 |


## 方法
| 方法名 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| clear | 清空选择 | - | v6.0 |
| openDialog | 打开选择对话框 | - | v6.0 |
| getReverseData | 根据当前选中ID获取机构数据 | - | v6.0 |


## 插槽
组件没有提供自定义插槽。

## 数据结构
### UnitItem 机构项接口
```typescript
interface UnitItem {
  id: string // 机构ID
  name: string // 机构简称
  fullName?: string // 机构全称
  [key: string]: any // 其他扩展字段
}
```

## API 接口
组件内部使用以下API接口：

+ `getTreeUnitListByUserIds(userIds: string, deep: string)` - 根据机构ID获取机构信息

## 注意事项
1. 组件内部会缓存已查询的机构数据，减少重复请求
2. 当设置`limit`为1时，组件会以单选模式运行
3. 组件支持通过`shortName`属性控制显示机构的简称或全称
4. 组件依赖于Element Plus的Input和Button组件
5. 组件使用UnitDialog子组件实现选择对话框，需要确保该组件可用
6. 默认情况下，顶级节点为ID为"0"、名称为"最顶级"的虚拟节点

