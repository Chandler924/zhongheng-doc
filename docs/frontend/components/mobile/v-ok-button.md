# VOkButton 确认按钮

## 组件介绍

VOkButton 是纵横框架移动端的确认按钮组件，提供统一的确认操作按钮。

## 基础用法

```vue
<template>
  <v-ok-button @click="handleOk" />
</template>

<script setup>
const handleOk = () => {
  console.log('确认操作')
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
