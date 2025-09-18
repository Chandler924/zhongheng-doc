# v-description 描述文本组件

## 组件介绍

VDescription 是纵横框架移动端的描述文本组件，用于展示描述性文本内容。

## 基础用法

```vue
<template>
  <v-description 
    title="标题"
    content="这是描述内容"
  />
</template>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | string | - | 标题文本 |
| content | string | - | 描述内容 |
| show-title | boolean | true | 是否显示标题 |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| title | 标题内容 |
| content | 描述内容 |
| default | 默认内容 |
