# ZBusinessLine-业务线选择器
## 组件介绍
ZBusinessLine是一个业务线选择器组件，基于Element Plus的Select组件封装，用于从系统中选择业务线数据。组件会自动从后端API获取业务线列表，支持单选和多选模式，可以进行远程搜索，并提供了丰富的自定义选项。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-business-line v-model="selectedBusinessLine" />
</template>
<script setup>
import { ref } from 'vue'

const selectedBusinessLine = ref('')
</script>

```

### 多选模式
```vue
<template>
  <z-business-line v-model="selectedBusinessLines" multiple collapse-tags />
</template>
<script setup>
import { ref } from 'vue'

const selectedBusinessLines = ref([])
</script>

```

### 可搜索模式
```vue
<template>
  <z-business-line v-model="selectedBusinessLine" filterable />
</template>
<script setup>
import { ref } from 'vue'

const selectedBusinessLine = ref('')
</script>

```

### 可清空模式
```vue
<template>
  <z-business-line v-model="selectedBusinessLine" clearable />
</template>
<script setup>
import { ref } from 'vue'

const selectedBusinessLine = ref('')
</script>

```

### 远程搜索
```vue
<template>
  <z-business-line
    v-model="selectedBusinessLine"
    remote
    filterable
    :loading="isLoading"
    placeholder="输入关键词搜索业务线"
    reserve-keyword />
</template>
<script setup>
import { ref } from 'vue'

const selectedBusinessLine = ref('')
const isLoading = ref(false)

// 注意：组件内置了远程搜索逻辑，会自动调用 getBusinessLineList API
// 搜索关键词会作为 businessLineName 参数传递给后端
</script>

```

### 不同尺寸
```vue
<template>
  <div>
    <div class="item">
      <span class="label">小：</span>
      <z-business-line v-model="businessLine1" size="small" />
    </div>
    <div class="item">
      <span class="label">默认：</span>
      <z-business-line v-model="businessLine2" />
    </div>
    <div class="item">
      <span class="label">大：</span>
      <z-business-line v-model="businessLine3" size="large" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const businessLine1 = ref('')
const businessLine2 = ref('')
const businessLine3 = ref('')
</script>
<style scoped>
.item {
  margin-bottom: 20px;
}
.label {
  display: inline-block;
  width: 100px;
}
</style>

```

### 自定义选项显示
```vue
<template>
  <z-business-line v-model="selectedBusinessLine">
    <template #option="{ item }">
      <div style="display: flex; justify-content: space-between">
        <span>{{ item.businessLineName }}</span>
        <span style="color: #909399; font-size: 12px">ID: {{ item.id }}</span>
      </div>
    </template>
  </z-business-line>
</template>
<script setup>
import { ref } from 'vue'

const selectedBusinessLine = ref('')
</script>

```

### 综合示例：数据处理和错误处理
```vue
<template>
  <div>
    <z-business-line
      v-model="selectedBusinessLine"
      remote
      filterable
      clearable
      :loading="isLoading"
      placeholder="请选择或搜索业务线"
      @change="handleChange"
      @visible-change="handleVisibleChange"
      @clear="handleClear">
      <template #option="{ item }">
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>{{ item.businessLineName }}</span>
          <div style="display: flex; gap: 8px; align-items: center">
            <span style="color: #909399; font-size: 12px">ID: {{ item.id }}</span>
            <el-tag v-if="item.status" size="small" :type="getStatusType(item.status)">
              {{ item.status }}
            </el-tag>
          </div>
        </div>
      </template>
    </z-business-line>
    <!-- 错误信息显示 -->
    <div v-if="error" class="error-message">{{ error }}</div>
    <!-- 选中信息显示 -->
    <div v-if="selectedInfo" class="selected-info">
      已选择：{{ selectedInfo.businessLineName }} (ID: {{ selectedInfo.id }})
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'

const selectedBusinessLine = ref('')
const isLoading = ref(false)
const error = ref('')
const selectedInfo = ref(null)

// 状态类型映射
const getStatusType = (status) => {
  const typeMap = {
    正常: 'success',
    停用: 'danger',
    测试: 'warning'
  }
  return typeMap[status] || 'info'
}

// 处理选择变化
const handleChange = (value) => {
  error.value = ''

  if (!value) {
    selectedInfo.value = null
    return
  }

  // 这里可以添加业务逻辑验证
  console.log('选中的业务线ID:', value)
}

// 处理下拉框显示/隐藏
const handleVisibleChange = (visible) => {
  if (visible) {
    console.log('下拉框打开')
  } else {
    console.log('下拉框关闭')
  }
}

// 处理清空
const handleClear = () => {
  selectedInfo.value = null
  error.value = ''
  console.log('已清空选择')
}

// 监听选中值变化，获取完整信息
watch(selectedBusinessLine, (newValue) => {
  if (newValue) {
    // 注意：这里仅为示例，实际项目中可能需要从API获取完整信息
    // 或者修改组件返回完整的对象而不是仅ID
    selectedInfo.value = {
      id: newValue,
      businessLineName: '示例业务线名称'
    }
  }
})
</script>
<style scoped>
.error-message {
  color: #f56c6c;
  font-size: 12px;
  margin-top: 5px;
}

.selected-info {
  color: #67c23a;
  font-size: 12px;
  margin-top: 5px;
  background: #f0f9ff;
  padding: 8px;
  border-radius: 4px;
  border-left: 3px solid #67c23a;
}
</style>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值 | any | - | v6.0 |
| optionKey | 选项数据的唯一标识字段 | String | 'id' | v6.0 |
| optionLabel | 选项标签对应的字段名 | String | 'businessLineName' | v6.0 |
| optionValue | 选项值对应的字段名 | String | 'id' | v6.0 |
| multiple | 是否多选 | Boolean | false | v6.0 |
| disabled | 是否禁用 | Boolean | false | v6.0 |
| valueKey | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | String | 'id' | v6.0 |
| size | 输入框尺寸 | 'large' / 'default' / 'small' | 'default' | v6.0 |
| clearable | 是否可以清空选项 | Boolean | false | v6.0 |
| collapseTags | 多选时是否将选中值按文字的形式展示 | Boolean | false | v6.0 |
| collapseTagsTooltip | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签 | Boolean | false | v6.0 |
| multipleLimit | 多选时用户最多可以选择的项目数，为 0 则不限制 | Number | 0 | v6.0 |
| name | select input 的 name 属性 | String | '' | v6.0 |
| effect | tooltip 的主题 | 'dark' / 'light' | 'light' | v6.0 |
| autocomplete | select input 的 autocomplete 属性 | String | 'off' | v6.0 |
| placeholder | 占位符 | String | '请选择业务线' | v6.0 |
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
| teleported | 下拉框是否插入至 body 元素 | Boolean | true | v6.0 |
| persistent | 当下拉选择器未被激活并且persistent设置为false时，选择器会被删除 | Boolean | true | v6.0 |
| automaticDropdown | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 | Boolean | false | v6.0 |
| clearIcon | 自定义清空图标 | String / Component | - | v6.0 |
| arrowIcon | 自定义箭头图标 | String / Component | - | v6.0 |
| validateEvent | 输入时是否触发表单的校验 | Boolean | true | v6.0 |
| placement | 弹出框的展开方向 | String | 'bottom-start' | v6.0 |


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


## API 数据结构
组件依赖 `getBusinessLineList` API 获取业务线数据，API 的数据结构如下：

### 请求参数
```typescript
interface BusinessLineRequest {
  businessLineName?: string // 搜索关键词，用于远程搜索
}
```

### 响应数据
```typescript
interface BusinessLineData {
  id: string | number // 业务线ID，用作选项值
  businessLineName: string // 业务线名称，用作选项显示文本
  disabled?: boolean // 是否禁用该选项
  [key: string]: any // 其他自定义字段
}

type BusinessLineResponse = BusinessLineData[]
```

### 使用示例
```typescript
// API 调用示例
const response = await getBusinessLineList({ businessLineName: '搜索关键词' })
// 返回数据格式
const data = [
  { id: 1, businessLineName: '核心业务线', disabled: false },
  { id: 2, businessLineName: '创新业务线', disabled: false },
  { id: 3, businessLineName: '支撑业务线', disabled: true }
]
```

## 注意事项
1. **自动数据获取**：组件会在挂载时自动调用 `getBusinessLineList` API 获取业务线列表数据
2. **远程搜索功能**：当开启 `remote` 和 `filterable` 属性时，组件会根据用户输入进行远程搜索，搜索关键词会作为 `businessLineName` 参数传递给后端API
3. **数据字段映射**：
    - 默认使用 `businessLineName` 字段作为选项的显示文本
    - 默认使用 `id` 字段作为选项的值和唯一标识
    - 可通过 `optionLabel`、`optionValue`、`optionKey` 属性自定义字段映射
4. **样式和布局**：组件宽度默认为100%，可以通过外层容器控制宽度
5. **依赖要求**：
    - 依赖 Element Plus 的 Select 和 Option 组件
    - 需要引入 `element-plus/dist/index.css` 样式文件
    - 依赖后端API接口 `getBusinessLineList`
6. **错误处理**：如果后端API请求失败，组件会在控制台输出错误信息，并将选项列表设置为空数组
7. **性能优化**：组件内部使用了 `isLoading` 状态管理加载状态，避免重复请求
8. **事件传递**：组件完整支持 Element Plus Select 组件的所有原生事件
9. **插槽支持**：支持自定义选项内容显示，可通过 `option` 插槽自定义选项的展示格式

