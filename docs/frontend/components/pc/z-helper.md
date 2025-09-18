# ZHelper-帮助中心
## 组件介绍
ZHelper是一个帮助中心组件，用于在应用程序中显示与当前页面相关的帮助信息。组件以抽屉形式展示，可以显示帮助内容或提供帮助链接。组件会根据当前路由自动获取相关的帮助信息，也支持通过URL参数手动指定帮助内容来源。

## 用法及示例代码
### 基本用法
```vue
<template>
  <div class="helper-demo">
    <el-card class="helper-card">
      <template #header>
        <div class="card-header">
          <span>帮助中心示例</span>
          <el-button type="primary" @click="openHelper">查看帮助</el-button>
        </div>
      </template>
      <div class="card-content">
        <p>这是一个帮助中心组件的示例页面。</p>
        <p>点击右上角的"查看帮助"按钮可以打开帮助中心。</p>
      </div>
    </el-card>
    <ZHelper v-model="showHelper" ref="helperRef" title="帮助中心示例" url="/helper/demo" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const showHelper = ref(false)
const helperRef = ref()

const openHelper = () => {
  showHelper.value = true
}
</script>

```

### 自定义标题和帮助内容来源
```vue
<template>
  <div>
    <el-button @click="showHelp">查看使用指南</el-button>
    <ZHelper v-model="helpVisible" title="系统使用指南" url="/system/user/guide" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const helpVisible = ref(false)

const showHelp = () => {
  helpVisible.value = true
}
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 是否显示帮助抽屉 | boolean | false | v6.0 |
| title | 帮助抽屉的标题 | string | '帮助中心' | v6.0 |
| url | 指定获取帮助信息的URL路径，不设置时使用当前路由路径 | string | undefined | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 抽屉显示状态变化时触发 | visible | boolean | v6.0 |


## 方法
组件没有暴露公共方法。

## 插槽
组件没有提供自定义插槽。

## 注意事项
1. 组件会自动根据当前路由路径从后端API获取帮助信息
2. 帮助内容支持纯文本和链接两种形式
3. 链接如果不是以http://或https://开头，会自动添加环境变量VITE_APP_HELPER_LINK_BASE_URL作为前缀
4. 组件依赖于Element Plus的Drawer组件和@zhv3/common-utils库

