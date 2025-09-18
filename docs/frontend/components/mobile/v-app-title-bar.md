# VAppTitleBar 应用标题栏

## 组件介绍

VAppTitleBar 是纵横框架移动端的应用标题栏组件，提供统一的标题栏样式和功能。

## 基础用法

```vue
<template>
  <v-app-title-bar 
    title="页面标题" 
    :show-back="true"
    @back="handleBack"
  />
</template>

<script setup>
const handleBack = () => {
  console.log('返回操作')
}
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | string | - | 标题文本 |
| show-back | boolean | false | 是否显示返回按钮 |
| show-menu | boolean | false | 是否显示菜单按钮 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| back | 返回事件 | - |
| menu | 菜单事件 | - |
