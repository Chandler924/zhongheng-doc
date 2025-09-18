# ZDateTime-日期时间选择器
## 组件介绍
ZDateTime是一个基于Element Plus的日期时间选择器组件封装，提供了更简洁的API和更灵活的使用方式。组件支持多种日期时间选择类型，包括日期、日期时间、日期范围和日期时间范围等。组件还支持自定义格式化、禁用日期、快捷选项等功能。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-date-time v-model="dateTime" />
</template>
<script setup>
import { ref } from 'vue'

const dateTime = ref('')
</script>

```

### 选择不同类型
```vue
<template>
  <div>
    <div class="item">
      <span class="label">日期：</span>
      <z-date-time v-model="date" type="date" />
    </div>
    <div class="item">
      <span class="label">日期时间：</span>
      <z-date-time v-model="datetime" type="datetime" />
    </div>
    <div class="item">
      <span class="label">日期范围：</span>
      <z-date-time v-model="daterange" type="daterange" />
    </div>
    <div class="item">
      <span class="label">日期时间范围：</span>
      <z-date-time v-model="datetimerange" type="datetimerange" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const date = ref('')
const datetime = ref('')
const daterange = ref(['', ''])
const datetimerange = ref(['', ''])
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

### 自定义格式
```vue
<template>
  <z-date-time
    v-model="dateTime"
    type="datetime"
    format="YYYY年MM月DD日 HH时mm分ss秒"
    value-format="YYYY-MM-DD HH:mm:ss" />
</template>
<script setup>
import { ref } from 'vue'

const dateTime = ref('')
</script>

```

### 禁用状态和只读状态
```vue
<template>
  <div>
    <div class="item">
      <span class="label">禁用：</span>
      <z-date-time v-model="date1" disabled />
    </div>
    <div class="item">
      <span class="label">只读：</span>
      <z-date-time v-model="date2" readonly />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const date1 = ref('')
const date2 = ref('2023-06-01')
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

### 不同尺寸
```vue
<template>
  <div>
    <div class="item">
      <span class="label">小：</span>
      <z-date-time v-model="date1" size="small" />
    </div>
    <div class="item">
      <span class="label">默认：</span>
      <z-date-time v-model="date2" />
    </div>
    <div class="item">
      <span class="label">大：</span>
      <z-date-time v-model="date3" size="large" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const date1 = ref('')
const date2 = ref('')
const date3 = ref('')
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

### 禁用特定日期
```vue
<template>
  <z-date-time v-model="date" :disabled-date="disabledDate" />
</template>
<script setup>
import { ref } from 'vue'

const date = ref('')

// 禁用今天之前的日期
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7
}
</script>

```

### 使用快捷选项
```vue
<template>
  <z-date-time v-model="dateRange" type="daterange" :shortcuts="shortcuts" />
</template>
<script setup>
import { ref } from 'vue'

const dateRange = ref(['', ''])

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    }
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 3)
      return [start, end]
    }
  }
]
</script>

```

### 在表单中使用
```vue
<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <el-form-item label="日期时间" prop="datetime">
      <z-date-time v-model="form.datetime" type="datetime" />
    </el-form-item>
    <el-form-item label="日期范围" prop="daterange">
      <z-date-time v-model="form.daterange" type="daterange" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive } from 'vue'

const formRef = ref(null)
const form = reactive({
  datetime: '',
  daterange: ['', '']
})

const rules = {
  datetime: [{ required: true, message: '请选择日期时间', trigger: 'change' }],
  daterange: [
    {
      required: true,
      message: '请选择日期范围',
      trigger: 'change',
      validator: (rule, value, callback) => {
        if (!value || value.length !== 2 || !value[0] || !value[1]) {
          callback(new Error('请选择完整的日期范围'))
        } else {
          callback()
        }
      }
    }
  ]
}

const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    console.log('表单验证通过，提交数据:', form)
    // 提交表单逻辑
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值 | string | number | Date | [DateValue, DateValue] | undefined | - | v6.0 |
| type | 日期类型 | DatePickType ('year' | 'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange') | 'datetime' | v6.0 |
| placeholder | 非范围选择时的占位内容 | string | '请选择日期时间' | v6.0 |
| disabled | 是否禁用 | boolean | false | v6.0 |
| clearable | 是否显示清除按钮 | boolean | true | v6.0 |
| size | 输入框尺寸 | 'large' | 'default' | 'small' | 'default' | v6.0 |
| format | 显示在输入框中的格式 | string | 根据type自动设置 | v6.0 |
| valueFormat | 绑定值的格式，不指定则绑定值为Date对象 | string | - | v6.0 |
| readonly | 是否只读 | boolean | false | v6.0 |
| disabledDate | 禁用日期的函数，参数为当前日期，返回true表示禁用 | (date: Date) => boolean | - | v6.0 |
| shortcuts | 快捷选项 | Array<{text: string, value: Date | Function | [Date, Date]}> | - | v6.0 |
| startPlaceholder | 范围选择时开始日期的占位内容 | string | '开始日期' | v6.0 |
| endPlaceholder | 范围选择时结束日期的占位内容 | string | '结束日期' | v6.0 |
| rangeSeparator | 选择范围时的分隔符 | string | '至' | v6.0 |
| defaultTime | 选中日期后的默认具体时刻 | Date | [Date, Date] | - | v6.0 |
| defaultValue | 选择器打开时默认显示的时间 | Date | [Date, Date] | - | v6.0 |
| popperClass | 弹出框的自定义类名 | string | - | v6.0 |
| popperOptions | 弹出框的自定义配置 | object | - | v6.0 |
| editable | 文本框是否可输入 | boolean | true | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 值变化时触发 | value | ModelValue (string | number | Date | [DateValue, DateValue] | undefined) | v6.0 |
| change | 值变化时触发 | value | ModelValue (string | number | Date | [DateValue, DateValue] | undefined) | v6.0 |
| blur | 当输入框失去焦点时触发 | event | FocusEvent | v6.0 |
| focus | 当输入框获得焦点时触发 | event | FocusEvent | v6.0 |
| calendar-change | 日历面板改变时触发 | value | [Date, Date] | v6.0 |
| visible-change | 日历面板显示或隐藏时触发 | visibility | boolean | v6.0 |


## 方法
组件没有暴露公共方法。

## 插槽
组件没有提供自定义插槽。

## 注意事项
1. 当使用日期范围或日期时间范围类型时，`v-model`绑定值需要是数组类型
2. `format`属性指定显示在输入框中的格式，而`valueFormat`属性指定绑定值的格式
3. 如果不指定`valueFormat`，则绑定值为JavaScript的Date对象
4. 组件依赖于Element Plus的DatePicker组件
5. 使用`disabledDate`函数可以灵活控制哪些日期不可选择
6. 使用`shortcuts`属性可以快速选择常用的日期范围，提高用户体验
7. 组件可以与Element Plus的Form组件结合使用，支持表单验证

