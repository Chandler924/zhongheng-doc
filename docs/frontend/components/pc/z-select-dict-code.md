# ZSelectDictCode-字典选择器
## 组件介绍
ZSelectDictCode是一个基于Element Plus的Select组件封装，专门用于字典数据的选择。组件通过dictCode属性自动获取字典数据，支持单选和多选模式，并提供了数据缓存功能以提升性能。组件还支持文本显示模式，可以在只读状态下显示选中的字典标签。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-select-dict-code v-model="selected" dict-code="user_status" placeholder="请选择用户状态" />
</template>
<script setup>
import { ref } from 'vue'

const selected = ref('')
</script>

```

### 多选模式
```vue
<template>
  <z-select-dict-code 
    v-model="selectedValues" 
    dict-code="user_roles" 
    mode="multiple" 
    placeholder="请选择用户角色" 
  />
</template>
<script setup>
import { ref } from 'vue'

const selectedValues = ref([])
</script>

```

### 文本显示模式
```vue
<template>
  <div>
    <!-- 选择模式 -->
    <z-select-dict-code v-model="statusValue" dict-code="user_status" />
    
    <!-- 文本显示模式 -->
    <z-select-dict-code v-model="statusValue" dict-code="user_status" type="text" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const statusValue = ref('1')
</script>

```

### 禁用状态
```vue
<template>
  <z-select-dict-code 
    v-model="disabledValue" 
    dict-code="user_status" 
    disabled 
    placeholder="禁用状态" 
  />
</template>
<script setup>
import { ref } from 'vue'

const disabledValue = ref('')
</script>

```

### 可清空
```vue
<template>
  <z-select-dict-code 
    v-model="clearableValue" 
    dict-code="user_status" 
    allow-clear 
    placeholder="可清空" 
  />
</template>
<script setup>
import { ref } from 'vue'

const clearableValue = ref('')
</script>

```

### 不同尺寸
```vue
<template>
  <div class="size-demo">
    <z-select-dict-code v-model="sizeValue.small" dict-code="user_status" size="small" placeholder="小尺寸" />
    <z-select-dict-code v-model="sizeValue.default" dict-code="user_status" placeholder="默认尺寸" />
    <z-select-dict-code v-model="sizeValue.large" dict-code="user_status" size="large" placeholder="大尺寸" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const sizeValue = ref({
  small: '',
  default: '',
  large: ''
})
</script>
<style scoped>
.size-demo {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>

```

### 监听变化事件
```vue
<template>
  <z-select-dict-code
    v-model="eventValue"
    dict-code="user_status"
    @change="handleChange"
    @select="handleSelect"
    allow-clear
  />
</template>
<script setup>
import { ref } from 'vue'

const eventValue = ref('')

const handleChange = (value, option) => {
  console.log('选中值变化:', value, option)
}

const handleSelect = (value, option) => {
  console.log('选择项:', value, option)
}
</script>

```

### 多选模式完整示例
```vue
<template>
  <div>
    <!-- 多选选择器 -->
    <z-select-dict-code 
      v-model="multipleValues" 
      dict-code="user_permissions" 
      mode="multiple" 
      allow-clear 
      placeholder="请选择权限" 
      @change="handleMultipleChange"
    />
    
    <!-- 多选文本显示 -->
    <z-select-dict-code 
      v-model="multipleValues" 
      dict-code="user_permissions" 
      type="text" 
    />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const multipleValues = ref(['read', 'write'])

const handleMultipleChange = (values, option) => {
  console.log('多选值变化:', values, option)
}
</script>

```

## 数据结构
### DictItem接口
```typescript
interface DictItem {
  id: string | number
  dictLabel: string // 字典标签（显示文本）
  dictValue: string | number // 字典值
  [key: string]: any // 支持其他字段
}
```

### 字典数据格式
```typescript
// API返回的字典数据格式
const dictData = [
  { id: 1, dictLabel: '启用', dictValue: '1' },
  { id: 2, dictLabel: '禁用', dictValue: '0' },
  { id: 3, dictLabel: '待审核', dictValue: '2' }
]
```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值 | string / string[] / number / number[] | '' | v6.0 |
| dictCode | 字典编码（必填） | string | - | v6.0 |
| placeholder | 占位符 | string | '请选择' | v6.0 |
| mode | 选择模式 | 'default' / 'multiple' | 'default' | v6.0 |
| allowClear | 是否可以清空选项 | boolean | false | v6.0 |
| disabled | 是否禁用 | boolean | false | v6.0 |
| labelInValue | 是否把每个选项的 label 包装到 value 中 | boolean | false | v6.0 |
| size | 输入框尺寸 | 'large' / 'default' / 'small' | 'default' | v6.0 |
| notFoundContent | 当下拉列表为空时显示的内容 | string | '无数据' | v6.0 |
| type | 组件类型 | 'select' / 'text' | 'select' | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| change | 选中值变化时触发 | value, option | `value: string/string[]/number/number[], option: {value, label}` | v6.0 |
| select | 选择项时触发 | value, option | `value: string/string[]/number/number[], option: {value, label}` | v6.0 |


## 方法
组件没有暴露公共方法。

## 插槽
组件没有提供插槽。

## 缓存机制
组件内置了字典数据缓存功能：

+ 使用 `sessionStorage` 存储字典数据
+ 缓存键格式：`dict_{dictCode}`
+ 同一个 `dictCode` 在会话期间只会请求一次API
+ 页面刷新后缓存失效，重新请求数据

## 注意事项
1. `dictCode` 属性是必填的，组件会根据此编码获取对应的字典数据
2. 组件默认宽度为100%，可以通过外层容器控制宽度
3. 使用 `mode="multiple"` 开启多选模式时，`v-model` 绑定值需要是数组类型
4. `type="text"` 模式下，组件只显示选中项的标签文本，不提供交互功能
5. 字典数据会自动缓存到 `sessionStorage` 中，提升页面性能
6. 组件依赖于 `getDictListByCode` API 方法获取字典数据
7. 多选模式下，文本显示时多个选项用"，"分隔
8. 组件会在 `onMounted` 生命周期中检查 `dictCode` 是否为空，为空时会输出错误信息
9. 支持数字和字符串类型的字典值，组件会自动处理类型转换
10. 组件依赖于Element Plus的Select和Option组件

