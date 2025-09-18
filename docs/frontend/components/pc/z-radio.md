# ZRadio-单选框
## 组件介绍
ZRadio是一个基于Element Plus的单选框组件封装，提供了更简洁的API和更灵活的使用方式。组件支持通过options属性直接传入选项数据，可以选择普通单选框或按钮样式的单选框，支持禁用选项和不同尺寸。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-radio
    v-model="radio1"
    :options="[
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' }
    ]" />
</template>
<script setup>
import { ref } from 'vue'

const radio1 = ref('1') // 默认选中"选项1"
</script>

```

### 禁用状态
```vue
<template>
  <z-radio
    v-model="radio2"
    :options="[
      { label: '禁用选项1', value: '1' },
      { label: '禁用选项2', value: '2' }
    ]"
    disabled />
</template>
<script setup>
import { ref } from 'vue'

const radio2 = ref('1')
</script>

```

### 不同尺寸
```vue
<template>
  <div>
    <z-radio v-model="radio3" :options="[{ label: '小尺寸', value: '1' }]" size="small" />
    <z-radio v-model="radio3" :options="[{ label: '默认尺寸', value: '2' }]" />
    <z-radio v-model="radio3" :options="[{ label: '大尺寸', value: '3' }]" size="large" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const radio3 = ref('1')
</script>

```

### 按钮样式
```vue
<template>
  <z-radio v-model="gender" :options="genderOptions" button />
</template>
<script setup>
import { ref } from 'vue'

const gender = ref('male')
const genderOptions = ref([
  { label: '男', value: 'male' },
  { label: '女', value: 'female' }
])
</script>

```

### 不同尺寸的按钮样式
```vue
<template>
  <div class="radio-demo">
    <z-radio v-model="size1" :options="sizeOptions" size="small" button />
    <z-radio v-model="size2" :options="sizeOptions" button />
    <z-radio v-model="size3" :options="sizeOptions" size="large" button />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const size1 = ref('1')
const size2 = ref('1')
const size3 = ref('1')
const sizeOptions = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])
</script>
<style scoped>
.radio-demo > * {
  margin-bottom: 16px;
}
</style>

```

### 禁用选项
```vue
<template>
  <z-radio v-model="fruit" :options="fruitOptions" />
</template>
<script setup>
import { ref } from 'vue'

const fruit = ref('apple')
const fruitOptions = ref([
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange', disabled: true }
])
</script>

```

### 自定义字段名
```vue
<template>
  <z-radio v-model="selectedUser" :options="userOptions" option-label="name" option-value="id" />
</template>
<script setup>
import { ref } from 'vue'

const selectedUser = ref(1)
const userOptions = ref([
  { id: 1, name: '张三', disabled: false },
  { id: 2, name: '李四', disabled: false },
  { id: 3, name: '王五', disabled: true }
])
</script>

```

### 监听变化事件
```vue
<template>
  <z-radio v-model="selectedValue" :options="options" @change="handleChange" />
  <p>当前选中: {{ selectedValue }}</p>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const selectedValue = ref('1')
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])

const handleChange = (value) => {
  ElMessage.info(`选中了: ${value}`)
}
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值 | any | - | v6.0 |
| options | 选项数组，每个选项包含label、value和disabled属性 | Array | [] | v6.0 |
| optionLabel | 选项标签字段名 | string | 'label' | v6.0 |
| optionValue | 选项值字段名 | string | 'value' | v6.0 |
| disabled | 是否禁用整组 | boolean | false | v6.0 |
| size | 尺寸大小 | 'large' | 'default' | 'small' | 'default' | v6.0 |
| button | 是否使用按钮样式 | boolean | false | v6.0 |


## 数据结构
### Option 接口
```typescript
interface Option {
  [key: string]: any // 允许任意自定义属性
  disabled?: boolean // 是否禁用该选项
}
```

### 常用选项格式
```typescript
// 标准格式
{ label: '显示文本', value: '选项值', disabled?: boolean }

// 自定义字段名格式（需配合optionLabel和optionValue属性）
{ name: '显示文本', id: '选项值', disabled?: boolean }

// 兼容格式（组件会自动识别label/title字段作为显示文本）
{ title: '显示文本', value: '选项值', disabled?: boolean }
```

## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 值变化时触发 | value | 更新后的值 | v6.0 |
| change | 值变化时触发 | value | 更新后的值 | v6.0 |


## 方法
组件没有暴露公共方法。

## 插槽
组件没有提供自定义插槽。

## 注意事项
1. options属性为必填项，需要提供选项数据
2. 可以通过`button`属性切换普通单选框和按钮样式的单选框
3. 既可以通过组件的`disabled`属性禁用整组单选框，也可以通过选项的`disabled`属性禁用单个选项
4. 组件依赖于Element Plus的Radio、RadioGroup和RadioButton组件
5. 组件会自动识别选项的字段名：优先使用`optionLabel`/`optionValue`指定的字段，其次使用`label`/`value`字段，标签还会尝试`title`字段
6. 选项数据支持任意自定义属性，可以通过`optionLabel`和`optionValue`属性指定要使用的字段名

