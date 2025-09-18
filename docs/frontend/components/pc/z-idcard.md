# ZIdcard-身份证输入框
## 组件介绍
ZIdcard是一个专门用于身份证号码输入的组件，基于Element Plus的Input组件封装。组件会自动过滤非法字符，确保只能输入符合身份证号码格式的字符，并提供了清除、禁用、只读等状态控制，适用于需要输入身份证号码的场景。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-idcard v-model="idcard" placeholder="请输入身份证号码" />
</template>
<script setup>
import { ref } from 'vue'

const idcard = ref('')
</script>

```

### 设置最大长度
```vue
<template>
  <z-idcard v-model="userIdcard" :max-length="18" placeholder="请输入18位身份证号码" />
</template>
<script setup>
import { ref } from 'vue'

const userIdcard = ref('')
</script>

```

### 可清空的身份证输入框
```vue
<template>
  <z-idcard v-model="idNumber" :clearable="true" placeholder="请输入身份证号码" />
</template>
<script setup>
import { ref } from 'vue'

const idNumber = ref('')
</script>

```

### 禁用和只读状态
```vue
<template>
  <div>
    <z-idcard v-model="id1" :disabled="true" placeholder="禁用状态" />
    <z-idcard v-model="id2" :readonly="true" placeholder="只读状态" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const id1 = ref('110101199001011234')
const id2 = ref('220101199001015678')
</script>

```

### 事件监听
```vue
<template>
  <z-idcard v-model="idcard" placeholder="请输入身份证号码" @change="handleChange" @press-enter="handleSubmit" />
</template>
<script setup>
import { ref } from 'vue'

const idcard = ref('')

const handleChange = (value) => {
  console.log('身份证号码变化:', value)
}

const handleSubmit = (value) => {
  console.log('按下回车键:', value)
}
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 输入框的值 | string | undefined | v6.0 |
| maxLength | 最大输入长度 | number | undefined | v6.0 |
| placeholder | 输入框占位文本 | string | '请输入身份证号码' | v6.0 |
| clearable | 是否可清空 | boolean | false | v6.0 |
| disabled | 是否禁用 | boolean | false | v6.0 |
| readonly | 是否只读 | boolean | false | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 输入值变化时触发 | value | string | v6.0 |
| change | 输入值变化时触发 | value | string | v6.0 |
| pressEnter | 按下回车键时触发 | value | string | v6.0 |


## 方法
组件没有暴露公共方法。

## 插槽
组件没有提供自定义插槽。

## 注意事项
1. 组件会自动过滤非法字符，只允许输入数字和字母X（用于18位身份证的校验位）
2. 输入过程中会实时过滤不符合身份证号码格式的字符
3. 组件不包含身份证号码格式验证功能，建议配合表单验证规则使用
4. 支持change和pressEnter事件，方便进行输入验证或提交操作
5. 组件依赖于Element Plus的Input组件

