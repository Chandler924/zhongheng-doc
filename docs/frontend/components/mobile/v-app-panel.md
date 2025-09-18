# VAppPanel 图标面板

## 组件介绍

VAppPanel 是纵横框架移动端的图标面板组件，用于展示应用图标网格。

## 基础用法

```vue
<template>
  <v-app-panel :apps="appList" @app-click="handleAppClick" />
</template>

<script setup>
const appList = [
  { id: 1, name: '应用1', icon: '/icon1.png' },
  { id: 2, name: '应用2', icon: '/icon2.png' }
]

const handleAppClick = (app) => {
  console.log('点击应用:', app)
}
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| apps | Array | [] | 应用列表 |
| columns | number | 4 | 每行显示数量 |
| gap | number | 16 | 间距 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| app-click | 应用点击事件 | (app: Object) |
