# ZSelect-选择器
## 组件介绍
ZSelect是一个基于Element Plus的Select组件封装，提供了更便捷的数据源配置方式和更符合业务需求的API。组件支持单选和多选，可以通过options属性直接传入选项数据，并支持自定义选项的键名。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-select v-model="selected" :options="options" placeholder="请选择" />
</template>
<script setup>
import { ref } from 'vue'

const selected = ref('')
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' }
])
</script>

```

### 自定义选项键名
```vue
<template>
  <z-select v-model="selected" :options="users" option-label="name" option-value="id" option-key="id" />
</template>
<script setup>
import { ref } from 'vue'

const selected = ref('')
const users = ref([
  { id: 1, name: '张三', age: 25 },
  { id: 2, name: '李四', age: 30 },
  { id: 3, name: '王五', age: 28 }
])
</script>

```

### 多选模式
```vue
<template>
  <z-select v-model="selectedValues" :options="options" multiple collapse-tags placeholder="请选择多个选项" />
</template>
<script setup>
import { ref } from 'vue'

const selectedValues = ref([])
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' }
])
</script>

```

### 禁用状态
```vue
<template>
  <div>
    <!-- 整体禁用 -->
    <z-select v-model="disabledValue" :options="options" disabled placeholder="禁用状态" />

    <!-- 部分选项禁用 -->
    <z-select v-model="selectedValue" :options="disabledOptions" placeholder="部分选项禁用" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const disabledValue = ref('')
const selectedValue = ref('')

const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])

const disabledOptions = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2', disabled: true },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4', disabled: true }
])
</script>

```

### 可搜索和可清空
```vue
<template>
  <div>
    <!-- 可清空 -->
    <z-select v-model="clearableValue" :options="options" clearable placeholder="可清空" />

    <!-- 可搜索 -->
    <z-select v-model="filterableValue" :options="options" filterable placeholder="可搜索" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const clearableValue = ref('')
const filterableValue = ref('')
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' }
])
</script>

```

### 不同尺寸
```vue
<template>
  <div class="size-demo">
    <z-select v-model="sizeValue.small" :options="options" size="small" placeholder="小尺寸" />
    <z-select v-model="sizeValue.default" :options="options" placeholder="默认尺寸" />
    <z-select v-model="sizeValue.large" :options="options" size="large" placeholder="大尺寸" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const sizeValue = ref({
  small: '',
  default: '',
  large: ''
})

const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
  { label: '选项4', value: '4' }
])
</script>
<style scoped>
.size-demo {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>

```

### 自定义选项内容
```vue
<template>
  <z-select v-model="customValue" :options="customOptions" placeholder="请选择">
    <template #option="{ item }">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">
        {{ item.description }}
      </span>
    </template>
  </z-select>
</template>
<script setup>
import { ref } from 'vue'

const customValue = ref('')
const customOptions = ref([
  { label: '选项1', value: '1', description: '描述1' },
  { label: '选项2', value: '2', description: '描述2' },
  { label: '选项3', value: '3', description: '描述3' }
])
</script>

```

### 远程搜索
```vue
<template>
  <z-select
    v-model="remoteValue"
    :options="remoteOptions"
    remote
    filterable
    :remote-method="remoteSearch"
    :loading="loading"
    placeholder="请输入关键词进行搜索" />
</template>
<script setup>
import { ref } from 'vue'

const remoteValue = ref('')
const remoteOptions = ref([])
const loading = ref(false)

const remoteSearch = (query) => {
  if (query !== '') {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      remoteOptions.value = [
        { label: query + ' 选项1', value: query + '1' },
        { label: query + ' 选项2', value: query + '2' },
        { label: query + ' 选项3', value: query + '3' }
      ]
    }, 200)
  } else {
    remoteOptions.value = []
  }
}
</script>

```

### 监听变化事件
```vue
<template>
  <z-select
    v-model="eventValue"
    :options="options"
    @change="handleChange"
    @visible-change="handleVisibleChange"
    @clear="handleClear"
    clearable />
</template>
<script setup>
import { ref } from 'vue'

const eventValue = ref('')
const options = ref([
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' }
])

const handleChange = (value) => {
  console.log('选中值变化:', value)
}

const handleVisibleChange = (visible) => {
  console.log('下拉框状态变化:', visible)
}

const handleClear = () => {
  console.log('清空选项')
}
</script>

```

## 数据结构
### SelectOption接口
```typescript
interface SelectOption {
  [key: string]: any // 支持任意字段
  disabled?: boolean // 是否禁用该选项
}
```

### 常用选项格式
```typescript
// 基本格式
const options = [
  { label: '显示文本', value: '值' },
  { label: '显示文本2', value: '值2', disabled: true }
]

// 自定义字段名
const customOptions = [
  { name: '张三', id: 1, age: 25 },
  { name: '李四', id: 2, age: 30 }
]
// 使用 option-label="name" option-value="id"

// 兼容多种字段名（组件会自动识别）
const flexibleOptions = [
  { title: '标题1', value: '1' }, // 使用 title 作为显示文本
  { label: '标题2', value: '2' } // 使用 label 作为显示文本
]
```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值 | any | - | v6.0 |
| options | 选项数据源 | Array | [] | v6.0 |
| optionKey | 选项数据的唯一标识字段 | String | 'value' | v6.0 |
| optionLabel | 选项标签对应的字段名 | String | 'label' | v6.0 |
| optionValue | 选项值对应的字段名 | String | 'value' | v6.0 |
| multiple | 是否多选 | Boolean | false | v6.0 |
| disabled | 是否禁用 | Boolean | false | v6.0 |
| valueKey | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | String | 'value' | v6.0 |
| size | 输入框尺寸 | 'large' / 'default' / 'small' | 'default' | v6.0 |
| clearable | 是否可以清空选项 | Boolean | false | v6.0 |
| collapseTags | 多选时是否将选中值按文字的形式展示 | Boolean | false | v6.0 |
| collapseTagsTooltip | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签 | Boolean | false | v6.0 |
| multipleLimit | 多选时用户最多可以选择的项目数，为 0 则不限制 | Number | 0 | v6.0 |
| placeholder | 占位符 | String | '请选择' | v6.0 |
| filterable | 是否可搜索 | Boolean | false | v6.0 |
| allowCreate | 是否允许用户创建新条目 | Boolean | false | v6.0 |
| filterMethod | 自定义搜索方法 | Function | - | v6.0 |
| remote | 是否为远程搜索 | Boolean | false | v6.0 |
| remoteMethod | 远程搜索方法 | Function | - | v6.0 |
| loading | 是否正在从远程获取数据 | Boolean | false | v6.0 |
| loadingText | 远程加载时显示的文字 | String | '加载中' | v6.0 |
| noMatchText | 搜索条件无匹配时显示的文字 | String | '无匹配数据' | v6.0 |
| noDataText | 选项为空时显示的文字 | String | '无数据' | v6.0 |
| reserveKeyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | Boolean | true | v6.0 |
| defaultFirstOption | 在输入框按下回车，选择第一个匹配项 | Boolean | false | v6.0 |
| teleported | 是否将弹出层插入至 body 元素 | Boolean | true | v6.0 |
| persistent | 当下拉选择器未被激活并且 persistent 设置为 false 时，选择器会被删除 | Boolean | true | v6.0 |
| automaticDropdown | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 | Boolean | false | v6.0 |
| clearIcon | 自定义清空图标 | String / Component | - | v6.0 |
| arrowIcon | 自定义箭头图标 | String / Component | - | v6.0 |
| validateEvent | 输入时是否触发表单的校验 | Boolean | true | v6.0 |
| placement | 下拉框出现的位置 | String | 'bottom-start' | v6.0 |
| name | 原生 name 属性 | String | '' | v6.0 |
| effect | Tooltip 主题 | 'dark' / 'light' | 'light' | v6.0 |
| autocomplete | 原生 autocomplete 属性 | String | 'off' | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 选中值变化时触发 | value | 选中项的值 | v6.0 |
| change | 选中值变化时触发 | value | 选中项的值 | v6.0 |
| visible-change | 下拉框出现/隐藏时触发 | visible | `visible: boolean` | v6.0 |
| remove-tag | 多选模式下移除tag时触发 | value | 移除的tag值 | v6.0 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | - | - | v6.0 |
| blur | 当选择器的输入框失去焦点时触发 | event | `event: FocusEvent` | v6.0 |
| focus | 当选择器的输入框获得焦点时触发 | event | `event: FocusEvent` | v6.0 |


## 方法
组件没有暴露公共方法。

## 插槽
| 插槽名 | 说明 | 版本号 |
| --- | --- | --- |
| default | 自定义 Option 组件 | v6.0 |
| option | 自定义选项内容，参数为 { item } | v6.0 |


## 注意事项
1. 组件默认宽度为100%，可以通过外层容器控制宽度
2. 使用`multiple`属性开启多选模式时，`v-model`绑定值需要是数组类型
3. 当选项数据中的某一项有`disabled: true`属性时，该选项将被禁用
4. 自定义选项内容时，可以通过`option`插槽获取当前选项数据
5. 组件支持字段名自动识别：显示文本优先级为 `optionLabel指定字段` > `label` > `title`，值优先级为 `optionValue指定字段` > `value`
6. 远程搜索时，需要配合`remote`、`filterable`和`remote-method`属性使用
7. 组件依赖于Element Plus的Select和Option组件

