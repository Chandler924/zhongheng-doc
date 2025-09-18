# ZEmail-邮箱输入框
## 组件介绍
ZEmail是一个专门用于邮箱地址输入的组件，基于Element Plus的Input组件封装。组件提供了邮箱输入的基本功能，包括清除、禁用、只读等状态控制，适用于需要输入邮箱地址的场景，如用户注册、联系方式录入等。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-email v-model="email" placeholder="请输入邮箱地址" />
</template>
<script setup>
import { ref } from 'vue'

const email = ref('')
</script>

```

### 设置最大长度
```vue
<template>
  <z-email v-model="userEmail" :max-length="50" placeholder="请输入邮箱（最多50字符）" />
</template>
<script setup>
import { ref } from 'vue'

const userEmail = ref('')
</script>

```

### 可清空的邮箱输入框
```vue
<template>
  <z-email v-model="contactEmail" :clearable="true" placeholder="请输入联系邮箱" />
</template>
<script setup>
import { ref } from 'vue'

const contactEmail = ref('')
</script>

```

### 禁用和只读状态
```vue
<template>
  <div>
    <z-email v-model="email1" :disabled="true" placeholder="禁用状态" />
    <z-email v-model="email2" :readonly="true" placeholder="只读状态" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const email1 = ref('user@example.com')
const email2 = ref('admin@company.com')
</script>

```

### 事件监听
```vue
<template>
  <z-email v-model="email" placeholder="请输入邮箱" @blur="handleBlur" @press-enter="handleSubmit" />
</template>
<script setup>
import { ref } from 'vue'

const email = ref('')

const handleBlur = (value) => {
  console.log('邮箱失去焦点:', value)
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
| placeholder | 输入框占位文本 | string | undefined | v6.0 |
| clearable | 是否可清空 | boolean | false | v6.0 |
| disabled | 是否禁用 | boolean | false | v6.0 |
| readonly | 是否只读 | boolean | false | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 输入值变化时触发 | value | string | v6.0 |
| blur | 输入框失去焦点时触发 | value | string | v6.0 |
| pressEnter | 按下回车键时触发 | value | string | v6.0 |


## 方法
组件没有暴露公共方法。

## 插槽
组件没有提供自定义插槽。

## 注意事项
1. 组件专门用于邮箱地址输入，但不包含邮箱格式验证功能
2. 建议配合表单验证规则使用，确保输入的邮箱格式正确
3. 组件支持失去焦点和回车键事件，方便进行输入验证或提交操作
4. 可以通过maxLength属性限制邮箱地址的最大长度
5. 组件依赖于Element Plus的Input组件

