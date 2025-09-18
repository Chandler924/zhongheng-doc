# ZInputs 输入组件集

## 组件介绍
ZInputs是纵横框架提供的一系列特殊输入组件，包括邮箱输入框、身份证输入框、金额输入框、数字输入框、电话输入框和文本域。这些组件基于Element Plus的Input组件封装，提供了针对特定数据类型的格式校验和输入限制，使开发者可以快速实现符合业务需求的表单输入控件。

## 输入组件列表
| 组件名称 | 说明 | 特性 | 版本号 |
| --- | --- | --- | --- |
| ZEmail | 邮箱输入框 | 内置邮箱格式校验 | v6.0 |
| ZIdcard | 身份证输入框 | 限制长度和格式，支持校验 | v6.0 |
| ZMoney | 金额输入框 | 自动格式化为货币格式，支持精度控制 | v6.0 |
| ZNumber | 数字输入框 | 只允许输入数字，支持范围限制 | v6.0 |
| ZPhone | 电话输入框 | 限制长度和格式，支持校验 | v6.0 |
| ZTextarea | 文本域 | 支持自动调整高度和字数统计 | v6.0 |


## 用法及示例代码
### 基本用法
```vue
<template>
  <div class="input-demo">
    <z-email v-model="email" placeholder="请输入邮箱" />
    <z-phone v-model="phone" placeholder="请输入手机号" />
    <z-idcard v-model="idcard" placeholder="请输入身份证号" />
  </div>

</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const phone = ref('')
const idcard = ref('')
</script>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

```

### 金额输入框
```vue
<template>
  <z-money v-model="amount" :precision="2" placeholder="请输入金额" />
</template>

<script setup>
import { ref } from 'vue'

const amount = ref('')
</script>

```

### 数字输入框
```vue
<template>
  <z-number v-model="number" :min="0" :max="100" placeholder="请输入0-100的数字" />
</template>

<script setup>
import { ref } from 'vue'

const number = ref('')
</script>

```

### 文本域
```vue
<template>
  <z-textarea 
    v-model="content" 
    :autosize="{ minRows: 3, maxRows: 6 }"
    :maxlength="200"
    show-word-limit
    placeholder="请输入内容"
  />
</template>

<script setup>
import { ref } from 'vue'

const content = ref('')
</script>

```

### 在表单中使用
```vue
<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="手机号">
      <z-phone v-model="form.phone" />
    </el-form-item>

    <el-form-item label="邮箱">
      <z-email v-model="form.email" />
    </el-form-item>

    <el-form-item label="身份证号">
      <z-idcard v-model="form.idcard" />
    </el-form-item>

    <el-form-item label="月收入">
      <z-money v-model="form.income" :precision="2" />
    </el-form-item>

    <el-form-item label="备注">
      <z-textarea v-model="form.remark" :maxlength="500" show-word-limit />
    </el-form-item>

  </el-form>

</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  idcard: '',
  income: '',
  remark: ''
})
</script>

```

## 属性
所有输入组件都继承了Element Plus的Input或InputNumber组件的所有属性，主要包括：

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | String / Number | '' | v6.0 |
| placeholder | 占位文本 | String | 根据组件类型不同 | v6.0 |
| disabled | 是否禁用 | Boolean | false | v6.0 |
| clearable | 是否可清空 | Boolean | true | v6.0 |
| size | 尺寸，可选值为large、default、small | String | 'default' | v6.0 |
| maxlength | 最大输入长度 | Number | - | v6.0 |
| show-word-limit | 是否显示输入字数统计 | Boolean | false | v6.0 |


### ZMoney特有属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| precision | 数值精度(小数位数) | Number | 2 | v6.0 |
| prefix | 前缀符号 | String | ¥ | v6.0 |


### ZNumber特有属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| min | 最小值 | Number | -Infinity | v6.0 |
| max | 最大值 | Number | Infinity | v6.0 |
| step | 步长 | Number | 1 | v6.0 |


### ZTextarea特有属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| autosize | 自适应内容高度 | Boolean / Object | false | v6.0 |
| rows | 输入框行数 | Number | 2 | v6.0 |


## 事件
所有输入组件都继承了Element Plus的Input或InputNumber组件的所有事件，主要包括：

| 事件名称 | 说明 | 回调参数 | 版本号 |
| --- | --- | --- | --- |
| update:modelValue | 值变化时触发 | value | v6.0 |
| input | 输入时触发 | value | v6.0 |
| change | 值变化时触发 | value | v6.0 |
| focus | 获取焦点时触发 | event | v6.0 |
| blur | 失去焦点时触发 | event | v6.0 |
| clear | 点击清除按钮时触发 | - | v6.0 |


## 方法
所有输入组件都继承了Element Plus的Input或InputNumber组件的所有方法，主要包括：

| 方法名 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| focus | 使输入框获取焦点 | - | v6.0 |
| blur | 使输入框失去焦点 | - | v6.0 |
| select | 选中输入框中的文字 | - | v6.0 |


## 注意事项
1. 这些输入组件主要是为了简化特定类型数据的输入和验证
2. 所有组件都基于Element Plus的Input或InputNumber组件，因此支持这些组件的大部分属性和事件
3. ZEmail、ZIdcard和ZPhone组件内置了格式校验，可以直接用于表单验证
4. ZMoney组件会自动格式化为货币格式，支持设置精度和前缀符号
5. ZNumber组件只允许输入数字，可以设置最大值、最小值和步长
6. ZTextarea组件支持自动调整高度和字数统计功能
7. 这些组件适合在表单中使用，可以提高用户输入体验和数据质量

