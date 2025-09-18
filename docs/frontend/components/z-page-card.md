# ZPageCard 页面卡片组件

## 组件介绍
ZPageCard是一个基于Element Plus的Card组件封装，用于页面内容的展示。组件支持标题、副标题、返回按钮等功能，适用于各种页面内容的卡片式布局。组件可以通过事件向父组件传递标题信息，便于实现动态页面标题。

## 基础用法

```vue
<template>
  <z-page-card title="用户管理">
    <div>页面内容区域</div>
  </z-page-card>
</template>
```

## 带副标题和返回按钮

```vue
<template>
  <z-page-card title="用户详情" sub-title="查看用户的详细信息" :need-back="true">
    <div>用户详情内容</div>
  </z-page-card>
</template>
```

## 自定义返回逻辑

```vue
<template>
  <z-page-card title="编辑表单" :need-back="true" :back="handleBack">
    <div>表单内容</div>
  </z-page-card>
</template>

<script setup>
const handleBack = () => {
  // 自定义返回逻辑
  if (hasUnsavedChanges) {
    // 显示确认对话框
    showConfirmDialog()
  } else {
    // 直接返回
    router.go(-1)
  }
}
</script>
```

## 不同阴影类型

```vue
<template>
  <div>
    <z-page-card title="无阴影" :shadow="false">
      <div>无阴影的卡片内容</div>
    </z-page-card>
    <z-page-card title="鼠标悬停阴影" shadow="hover">
      <div>悬停时显示阴影的卡片内容</div>
    </z-page-card>
    <z-page-card title="始终显示阴影" shadow="always">
      <div>始终显示阴影的卡片内容</div>
    </z-page-card>
  </div>
</template>
```

## 使用右侧操作区和页脚

```vue
<template>
  <z-page-card title="数据统计">
    <template #header-right>
      <el-button type="primary" size="small">导出</el-button>
      <el-button size="small">刷新</el-button>
    </template>
    <div>统计图表内容</div>
    <template #footer>
      <div class="footer-content">
        <span>最后更新时间: 2023-06-01 12:00:00</span>
        <el-button type="text">查看更多</el-button>
      </div>
    </template>
  </z-page-card>
</template>

<style scoped>
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```

## 监听标题变化事件

```vue
<template>
  <z-page-card :title="currentTitle" :sub-title="currentSubTitle" @title="handleTitleChange">
    <div>
      <el-button @click="changeTitle">更改标题</el-button>
      <p>当前页面标题: {{ pageTitle }}</p>
    </div>
  </z-page-card>
</template>

<script setup>
import { ref } from 'vue'

const currentTitle = ref('初始标题')
const currentSubTitle = ref('初始副标题')
const pageTitle = ref('')

const handleTitleChange = (title, subTitle) => {
  pageTitle.value = `${title} - ${subTitle}`
  // 可以在这里更新浏览器标题
  document.title = pageTitle.value
}

const changeTitle = () => {
  currentTitle.value = '新的标题'
  currentSubTitle.value = '新的副标题'
}
</script>
```

## 隐藏导航栏

```vue
<template>
  <z-page-card :show-nav-bar="false">
    <div>没有标题栏的卡片内容</div>
  </z-page-card>
</template>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| title | 卡片标题 | string | '' | v6.0 |
| subTitle | 卡片副标题 | string | '' | v6.0 |
| shadow | 卡片阴影显示时机，可选值为 always、hover、never，也可以使用布尔值 | boolean \| string | false | v6.0 |
| needBack | 是否显示返回按钮 | boolean | false | v6.0 |
| back | 自定义返回按钮点击事件 | Function | null | v6.0 |
| showNavBar | 是否显示导航栏（标题区域） | boolean | true | v6.0 |

### 事件

| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| title | 标题变化时触发 | title, subTitle | `title: string, subTitle: string` | v6.0 |

### 插槽

| 插槽名 | 说明 | 版本号 |
| --- | --- | --- |
| default | 卡片内容 | v6.0 |
| header-right | 标题栏右侧内容 | v6.0 |
| footer | 卡片底部内容 | v6.0 |

## 注意事项

1. 当`needBack`为`true`时，如果没有提供`back`属性，点击返回按钮将默认调用`router.go(-1)`
2. 组件会在挂载时和标题/副标题变化时触发`title`事件，可用于动态更新页面标题
3. 组件依赖于Element Plus的Card组件和@zhv3/common-utils库
4. `shadow`属性可以接受布尔值或字符串，当为布尔值时，`true`对应`'always'`，`false`对应`'never'`
