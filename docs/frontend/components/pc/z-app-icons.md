# ZAppIcons-应用图标组件集
## 组件介绍
ZAppIcons是纵横框架提供的一系列应用图标相关组件，包括ZAppIcon（应用图标）、ZAppShow（应用展示）和ZAppIconList（应用图标列表）。这些组件用于在系统中展示和管理应用图标，适用于应用市场、工作台、应用导航等场景。

## 应用图标组件列表
| 组件名称 | 说明 | 主要功能 | 版本号 |
| --- | --- | --- | --- |
| ZAppIcon | 应用图标选择器组件 | 选择和配置应用图标，支持图标选择、颜色配置等功能 | v6.0 |
| ZAppShow | 应用图标展示组件 | 纯展示图标组件，支持本地图标和上传图片两种类型 | v6.0 |
| ZAppIconList | 图标选择列表组件 | 提供图标网格选择界面，支持本地图标和上传图片 | v6.0 |


## 用法及示例代码
### 基本用法 - ZAppIcon
```vue
<template>
  <z-app-icon
    v-model="iconData"
    :imgSize="50"
    :iconType="'app'"
    :isSelectColor="true"
    @handleAppIcon="handleIconChange" />
</template>
<script setup>
import { ref } from 'vue'

// 图标数据对象
const iconData = ref({
  icon: '', // 图标
  iconType: 'app', // 图标类型：app(应用图标), form(表单图标), menu(菜单图标)
  iconColor: '', // 背景颜色
  color: '' // 图标颜色
})

// 处理图标变化
const handleIconChange = (newIconData) => {
  console.log('图标已更改:', newIconData)
}
</script>

```

### 应用展示 - ZAppShow
```vue
<template>
  <z-app-show :iconData="iconData" :imgSize="60" :iconType="'app'" :iconOwnList="[]" />
</template>
<script setup>
import { reactive } from 'vue'

// 图标数据对象
const iconData = reactive({
  icon: 'app-workflow', // 图标名称或图片路径
  iconType: '0', // 图标类型：'0'本地图标，'1'上传图片
  iconColor: '#1890ff', // 背景颜色
  color: '#ffffff' // 图标颜色
})
</script>

```

### 图标选择列表 - ZAppIconList
```vue
<template>
  <z-app-icon-list
    v-model="selectedIcon"
    :size="5"
    :iconType="'app'"
    :hideUploadIcon="false"
    :isSelectColor="true"
    :iconColor="colorList" />
</template>
<script setup>
import { ref } from 'vue'

// 选中的图标数据
const selectedIcon = ref({
  icon: '', // 图标名称或图片路径
  iconType: '', // 图标类型：'0'本地图标，'1'上传图片
  iconColor: '#0089ff', // 背景颜色
  color: '' // 图标颜色
})

// 自定义颜色列表
const colorList = ref([
  '#0089ff',
  '#00b853',
  '#ffa200',
  '#ff7357',
  '#5c72ff',
  '#85c700',
  '#ffc505',
  '#ff6b7a',
  '#8f66ff',
  '#14a9ff'
])
</script>

```

### 自定义样式
```vue
<template>
  <z-app-icon-list :apps="appList" :columns="3" layout="grid" class="custom-app-list" />
</template>
<style scoped>
.custom-app-list {
  --app-icon-size: 64px;
  --app-item-gap: 24px;
  --app-item-bg: #f5f7fa;
  --app-item-hover-bg: #e6f7ff;
}
</style>

```

## IconData 数据结构
ZAppIcon 组件使用 IconData 对象来管理图标数据，该对象包含以下字段：

| 字段 | 说明 | 类型 | 示例值 |
| --- | --- | --- | --- |
| icon | 图标名称或图标路径 | String | 'app-icon' |
| iconType | 图标类型，可选值：'app'、'form'、'menu' | String | 'app' |
| iconColor | 图标背景颜色 | String | '#1890ff' |
| color | 图标颜色 | String | '#ffffff' |


## ZAppIcon属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 图标数据对象，包含icon、iconType、iconColor、color字段 | Object | { icon: '', iconType: '', iconColor: '', color: '' } | v6.0 |
| imgSize | 图标的大小（像素） | Number | 50 | v6.0 |
| hideUploadIcon | 是否隐藏上传图标 | Boolean | true | v6.0 |
| iconType | 图标类型，可选值为'app'、'form'、'menu' | String | '' | v6.0 |
| iconList | 图标列表 | Array | [] | v6.0 |
| isSelectColor | 是否显示颜色选择 | Boolean | true | v6.0 |


### 不同图标类型示例 - ZAppShow
```vue
<template>
  <div>
    <!-- 本地图标 -->
    <z-app-show :iconData="localIconData" :imgSize="50" :iconType="'app'" />

    <!-- 上传图片 -->
    <z-app-show :iconData="uploadImageData" :imgSize="50" :iconType="''" />

    <!-- 空图标（显示加号） -->
    <z-app-show :iconData="emptyIconData" :imgSize="50" />
  </div>
</template>
<script setup>
import { reactive } from 'vue'

// 本地图标数据
const localIconData = reactive({
  icon: 'app-workflow',
  iconType: '0', // 或者 0
  iconColor: '#1890ff',
  color: '#ffffff'
})

// 上传图片数据
const uploadImageData = reactive({
  icon: 'uploads/image.png',
  iconType: '1', // 或者 1
  iconColor: '',
  color: ''
})

// 空图标数据
const emptyIconData = reactive({
  icon: '',
  iconType: '',
  iconColor: '',
  color: ''
})
</script>

```

## ZAppShow属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| iconData | 图标数据对象，包含icon、iconType、iconColor、color字段 | Object | { icon: '', iconType: '', iconColor: '', color: '' } | v6.0 |
| imgSize | 图标大小（像素） | Number | 50 | v6.0 |
| iconType | 图标类型，用于判断渲染方式 | String | '' | v6.0 |
| iconOwnList | 图标列表，影响图标渲染组件的选择 | Array | [] | v6.0 |


### 不同图标类型示例 - ZAppIconList
```vue
<template>
  <div>
    <!-- 应用图标选择 -->
    <h3>应用图标</h3>
    <z-app-icon-list v-model="appIcon" :size="5" :iconType="'app'" :hideUploadIcon="false" :isSelectColor="true" />

    <!-- 表单图标选择 -->
    <h3>表单图标</h3>
    <z-app-icon-list v-model="formIcon" :size="4" :iconType="'form'" :hideUploadIcon="true" :isSelectColor="true" />

    <!-- 菜单图标选择（不显示颜色） -->
    <h3>菜单图标</h3>
    <z-app-icon-list v-model="menuIcon" :size="6" :iconType="'menu'" :hideUploadIcon="true" :isSelectColor="false" />

    <!-- 自定义图标列表 -->
    <h3>自定义图标</h3>
    <z-app-icon-list v-model="customIcon" :size="3" :iconOwnList="customIconList" :isSelectColor="true" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

// 不同类型的图标数据
const appIcon = ref({ icon: '', iconType: '', iconColor: '', color: '' })
const formIcon = ref({ icon: '', iconType: '', iconColor: '', color: '' })
const menuIcon = ref({ icon: '', iconType: '', iconColor: '', color: '' })
const customIcon = ref({ icon: '', iconType: '', iconColor: '', color: '' })

// 自定义图标列表
const customIconList = ref([
  'icon-custom-1',
  'icon-custom-2',
  'icon-custom-3',
  'icon-custom-4',
  'icon-custom-5',
  'icon-custom-6'
])
</script>

```

## ZAppIconList属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 图标数据对象，包含icon、iconType、iconColor、color字段 | Object | { icon: '', iconType: '', iconColor: '', color: '' } | v6.0 |
| hideUploadIcon | 是否隐藏上传图标 | Boolean | false | v6.0 |
| size | 每行显示的图标数量 | Number | 5 | v6.0 |
| iconColor | 可选颜色列表 | Array | 10种预设颜色 | v6.0 |
| iconType | 图标类型，可选值为'app'、'form'、'menu' | String | '' | v6.0 |
| parentId | 父级ID（上传相关） | String | '' | v6.0 |
| headers | 上传请求头 | Object | {} | v6.0 |
| bucketName | 上传存储桶名 | String | 'moli_app_bucket' | v6.0 |
| systemName | 系统名称 | String | 'moli_app_setting' | v6.0 |
| configGroup | 配置组名 | String | 'moli_app_config' | v6.0 |
| iconOwnList | 自定义图标列表 | Array | [] | v6.0 |
| isSelectColor | 是否显示颜色选择 | Boolean | true | v6.0 |


## 事件
### ZAppIcon事件
| 事件名称 | 说明 | 回调参数 | 版本号 |
| --- | --- | --- | --- |
| update:modelValue | v-model 双向绑定更新 | IconData | v6.0 |
| handleAppIcon | 图标数据变化时触发 | IconData | v6.0 |


### ZAppShow事件
ZAppShow 组件为纯展示组件，不触发任何事件。

### ZAppIconList事件
| 事件名称 | 说明 | 回调参数 | 版本号 |
| --- | --- | --- | --- |
| update:modelValue | v-model 双向绑定更新 | IconData | v6.0 |


## 插槽
### ZAppShow插槽
ZAppShow 组件不提供插槽，为纯展示组件。

### ZAppIconList插槽
ZAppIconList 组件不提供插槽，为功能完整的图标选择组件。

## 注意事项
1. 这些组件主要用于展示和管理应用图标，适用于应用市场、工作台等场景
2. ZAppIcon 组件是一个图标选择器，支持通过弹出框选择图标和配置颜色，支持 v-model 双向绑定
3. ZAppIcon 组件的数据结构为 IconData 对象，包含图标、图标类型、背景颜色和图标颜色等字段
4. ZAppIcon 支持多种图标类型：app（应用图标）、form（表单图标）、menu（菜单图标）
5. ZAppShow 组件是纯展示组件，用于展示图标，支持本地图标（iconType='0'）和上传图片（iconType='1'）两种类型
6. ZAppShow 组件当没有图标时会显示加号图标，当有图标时根据 iconType 决定渲染方式
7. ZAppIconList 组件是一个图标选择组件，提供网格布局的图标选择界面，支持 v-model 双向绑定
8. ZAppIconList 支持三种预设图标类型：app（应用图标）、form（表单图标）、menu（菜单图标），也支持自定义图标列表
9. ZAppIconList 支持上传自定义图片作为图标，可通过 hideUploadIcon 控制是否显示上传功能
10. ZAppIconList 的颜色选择功能可通过 isSelectColor 控制，菜单图标类型默认不显示颜色选择
11. 所有组件都支持自定义样式，可以通过CSS变量进行定制
12. 使用 ZAppIcon 时，建议通过 v-model 进行双向绑定，并监听 handleAppIcon 事件来处理图标变化

