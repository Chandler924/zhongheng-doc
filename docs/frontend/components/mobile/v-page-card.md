# VPageCard 页面卡片

## 组件介绍

VPageCard 是纵横框架移动端的页面卡片组件，用于页面内容展示。

## 基础用法

```vue
<template>
  <v-page-card title="页面标题" :show-back="true">
    <p>页面内容</p>
  </v-page-card>
</template>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | string | - | 页面标题 |
| show-back | boolean | false | 是否显示返回按钮 |
| show-menu | boolean | false | 是否显示菜单按钮 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| back | 返回事件 | - |
| menu | 菜单事件 | - |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 页面内容 |
| header | 头部内容 |
| footer | 底部内容 |