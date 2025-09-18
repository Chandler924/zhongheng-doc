# VAddButton 新增按钮

## 组件介绍

VAddButton 是纵横框架移动端的新增按钮组件，提供统一的新增操作按钮样式和交互。

## 基础用法

```vue
<template>
  <v-add-button @click="handleAdd" />
</template>

<script setup>
const handleAdd = () => {
  console.log('新增操作')
}
</script>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | (event: Event) |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |

## 样式定制

组件支持通过 CSS 变量进行样式定制：

```css
.v-add-button {
  --button-bg-color: #409eff;
  --button-text-color: #ffffff;
  --button-border-radius: 4px;
}
```
