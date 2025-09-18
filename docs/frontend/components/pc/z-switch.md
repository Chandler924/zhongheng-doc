# ZSwitch-开关
## 组件介绍
ZSwitch是一个基于Element Plus的开关组件封装，用于在两种状态之间进行切换。组件将状态值规范为字符串'1'（开启）和'0'（关闭），与原生Element Plus的Switch组件使用布尔值不同。组件支持自定义开启和关闭时显示的文本，提供了禁用和加载状态，以及不同的尺寸选择。

## 用法及示例代码
### 基本用法
```vue
<template>
  <div>
    <z-switch v-model="status" />
    <div>当前值: {{ status }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const status = ref('0') // '0'表示关闭，'1'表示开启
</script>

```

### 与Element Plus原生开关对比
```vue
<template>
  <div>
    <div>自定义开关组件 (使用字符串'0'|'1')</div>
    <z-switch v-model="customValue" />
    <div>当前值: {{ customValue }}</div>
    <div>原生开关组件 (使用布尔值)</div>
    <el-switch v-model="nativeValue" />
    <div>当前值: {{ nativeValue }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const customValue = ref('0') // ZSwitch使用字符串'0'和'1'
const nativeValue = ref(false) // Element Plus原生Switch使用布尔值
</script>

```

### 自定义文本
```vue
<template>
  <z-switch v-model="enabled" checked-children="启用" un-checked-children="禁用" />
</template>
<script setup>
import { ref } from 'vue'

const enabled = ref('0')
</script>

```

### 不同尺寸
```vue
<template>
  <div>
    <z-switch v-model="switch1" size="small" />
    <z-switch v-model="switch2" />
    <z-switch v-model="switch3" size="large" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const switch1 = ref('0')
const switch2 = ref('0')
const switch3 = ref('0')
</script>

```

### 禁用状态
```vue
<template>
  <div>
    <z-switch v-model="disabled1" disabled />
    <z-switch v-model="disabled2" disabled />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const disabled1 = ref('0')
const disabled2 = ref('1')
</script>

```

### 加载状态
```vue
<template>
  <z-switch v-model="loading" :loading="true" />
</template>
<script setup>
import { ref } from 'vue'

const loading = ref('0')
</script>

```

### 监听值变化
```vue
<template>
  <div>
    <z-switch v-model="switchValue" @update:modelValue="handleChange" />
    <div>当前状态: {{ switchValue === '1' ? '开启' : '关闭' }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const switchValue = ref('0')

const handleChange = (value) => {
  console.log('开关状态变化:', value)
  console.log('是否开启:', value === '1')
}
</script>

```

### 自定义长文本
```vue
<template>
  <div>
    <z-switch v-model="feature" checked-children="已启用" un-checked-children="已禁用" />
    <z-switch v-model="notification" checked-children="ON" un-checked-children="OFF" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const feature = ref('1')
const notification = ref('0')
</script>

```

### 表单中的应用
```vue
<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="接收通知">
      <z-switch v-model="form.notification" />
    </el-form-item>
    <el-form-item label="自动保存">
      <z-switch v-model="form.autoSave" checked-children="开启" un-checked-children="关闭" />
    </el-form-item>
    <el-form-item label="高级功能">
      <z-switch v-model="form.advanced" :disabled="form.notification === '0'" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref } from 'vue'

const form = ref({
  notification: '1',
  autoSave: '0',
  advanced: '0'
})
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值，'1'表示开启，'0'表示关闭 | string | '0' | v6.0 |
| checkedChildren | 开启时显示的文本 | string | '开' | v6.0 |
| unCheckedChildren | 关闭时显示的文本 | string | '关' | v6.0 |
| disabled | 是否禁用开关 | boolean | false | v6.0 |
| loading | 是否显示加载状态 | boolean | false | v6.0 |
| size | 开关的大小 | '' / 'small' / 'default' / 'large' | undefined | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 值变化时触发 | value | `value: string`（'1'或'0'） | v6.0 |


## 方法
组件没有暴露公共方法。

## 插槽
组件没有提供自定义插槽。

## 注意事项
1. 组件的`modelValue`值是字符串类型，'1'表示开启，'0'表示关闭，而不是布尔值
2. 这与Element Plus原生的Switch组件使用布尔值不同，请注意区分
3. 组件内部会自动将字符串值转换为布尔值进行处理，然后在发出事件时再转回字符串值
4. 组件使用`inline-prompt`属性，文本显示在开关内部
5. 组件依赖于Element Plus的Switch组件

