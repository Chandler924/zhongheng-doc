# ZJob-岗位选择器
## 组件介绍
ZJob是一个岗位选择器组件，基于Element Plus的Select组件封装，用于从系统中选择岗位数据。组件会自动从后端API获取岗位列表，支持单选和多选模式，可以进行远程搜索，并提供了丰富的自定义选项。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-job v-model="selectedJob" />
</template>
<script setup>
import { ref } from 'vue'

const selectedJob = ref('')
</script>

```

### 多选模式
```vue
<template>
  <z-job v-model="selectedJobs" multiple collapse-tags />
</template>
<script setup>
import { ref } from 'vue'

const selectedJobs = ref([])
</script>

```

### 可搜索模式
```vue
<template>
  <z-job v-model="selectedJob" filterable />
</template>
<script setup>
import { ref } from 'vue'

const selectedJob = ref('')
</script>

```

### 远程搜索
```vue
<template>
  <z-job v-model="selectedJob" remote filterable />
</template>
<script setup>
import { ref } from 'vue'

const selectedJob = ref('')
</script>

```

### 不同尺寸
```vue
<template>
  <div>
    <div class="item">
      <span class="label">小：</span>
      <z-job v-model="job1" size="small" />
    </div>
    <div class="item">
      <span class="label">默认：</span>
      <z-job v-model="job2" />
    </div>
    <div class="item">
      <span class="label">大：</span>
      <z-job v-model="job3" size="large" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const job1 = ref('')
const job2 = ref('')
const job3 = ref('')
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
  <z-job v-model="selectedJob">
    <template #option="{ item }">
      <div style="display: flex; justify-content: space-between">
        <span>{{ item.jobName }}</span>
        <span style="color: #909399; font-size: 12px">ID: {{ item.id }}</span>
      </div>
    </template>
  </z-job>
</template>
<script setup>
import { ref } from 'vue'

const selectedJob = ref('')
</script>

```

### 设置初始值
```vue
<template>
  <z-job v-model="selectedJob" />
</template>
<script setup>
import { ref, onMounted } from 'vue'

const selectedJob = ref('')

onMounted(() => {
  // 设置初始值，可以从API获取或者从其他地方传入
  selectedJob.value = '1001' // 岗位ID
})
</script>

```

### 可清空的选择器
```vue
<template>
  <z-job v-model="selectedJob" clearable placeholder="请选择岗位，可清空" />
</template>
<script setup>
import { ref } from 'vue'

const selectedJob = ref('')
</script>

```

### 在表单中使用并验证
```vue
<template>
  <el-form ref="formRef" :model="form" :rules="rules">
    <el-form-item label="岗位" prop="jobId">
      <z-job v-model="form.jobId" />
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
  jobId: ''
})

const rules = {
  jobId: [{ required: true, message: '请选择岗位', trigger: 'change' }]
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
| modelValue | 绑定值 | any | - | v6.0 |
| optionKey | 选项数据的唯一标识字段 | String | 'id' | v6.0 |
| optionLabel | 选项标签对应的字段名 | String | 'jobName' | v6.0 |
| optionValue | 选项值对应的字段名 | String | 'id' | v6.0 |
| multiple | 是否多选 | Boolean | false | v6.0 |
| disabled | 是否禁用 | Boolean | false | v6.0 |
| valueKey | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | String | 'id' | v6.0 |
| size | 输入框尺寸 | 'large' / 'default' / 'small' | 'default' | v6.0 |
| clearable | 是否可以清空选项 | Boolean | false | v6.0 |
| collapseTags | 多选时是否将选中值按文字的形式展示 | Boolean | false | v6.0 |
| collapseTagsTooltip | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签 | Boolean | false | v6.0 |
| multipleLimit | 多选时用户最多可以选择的项目数，为 0 则不限制 | Number | 0 | v6.0 |
| placeholder | 占位符 | String | '请选择岗位' | v6.0 |
| filterable | 是否可搜索 | Boolean | false | v6.0 |
| allowCreate | 是否允许用户创建新条目 | Boolean | false | v6.0 |
| remote | 是否为远程搜索 | Boolean | false | v6.0 |
| loading | 是否正在从远程获取数据 | Boolean | false | v6.0 |
| loadingText | 远程加载时显示的文字 | String | '加载中' | v6.0 |
| noMatchText | 搜索条件无匹配时显示的文字 | String | '无匹配数据' | v6.0 |
| noDataText | 选项为空时显示的文字 | String | '无数据' | v6.0 |
| placement | 弹出框的展开方向 | String | 'bottom-start' | v6.0 |
| name | 选择器的 name 属性 | String | '' | v6.0 |
| effect | Tooltip 主题 | 'dark' / 'light' | 'light' | v6.0 |
| autocomplete | 自动补全 | String | 'off' | v6.0 |
| filterMethod | 自定义搜索方法 | Function | undefined | v6.0 |
| remoteMethod | 远程搜索方法 | Function | undefined | v6.0 |
| reserveKeyword | 是否在选中一个选项后保留当前的搜索关键词 | Boolean | true | v6.0 |
| defaultFirstOption | 在输入框按下回车，选择第一个匹配项 | Boolean | false | v6.0 |
| teleported | 是否将弹出框插入至 body 元素 | Boolean | true | v6.0 |
| persistent | 当下拉选择器未被激活并且 persistent 设置为 false 时，选择器会被删除 | Boolean | true | v6.0 |
| automaticDropdown | 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 | Boolean | false | v6.0 |
| clearIcon | 自定义清空图标 | String / Component | undefined | v6.0 |
| arrowIcon | 自定义箭头图标 | String / Component | undefined | v6.0 |
| validateEvent | 是否触发表单验证 | Boolean | true | v6.0 |


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


## 数据结构
### JobData 接口
```typescript
interface JobData {
  id: string // 岗位ID
  jobCode: string // 岗位编码
  jobName: string // 岗位名称
  name: string // 岗位名称(别名)
  orderNo: string // 排序号
  disabled?: boolean // 是否禁用该选项
  [key: string]: any // 其他自定义属性
}
```

## 注意事项
1. 组件会在挂载时自动从后端API获取岗位列表数据
2. 当开启`remote`属性时，组件会根据用户输入进行远程搜索
3. 默认情况下，组件使用`jobName`字段作为选项的显示文本，使用`id`字段作为选项的值
4. 组件宽度默认为100%，可以通过外层容器控制宽度
5. 组件依赖于Element Plus的Select和Option组件
6. 组件依赖后端API接口`getJobList`获取岗位数据，接口地址为`/system/SysJobRank/list`
7. 组件可以与Element Plus的Form组件结合使用，支持表单验证
8. 当设置初始值时，如果初始值在选项列表中不存在，组件会显示为空
9. 远程搜索时会将搜索关键词作为`jobName`参数传递给后端API
10. 选项数据中的`disabled`字段可以控制某个选项是否禁用

