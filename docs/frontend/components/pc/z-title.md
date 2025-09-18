# ZTitle-标题
## 组件介绍
ZTitle是一个标题文本组件，用于展示不同级别的标题文本。组件支持三种不同的标题级别，可以控制标题的大小和显示方式。组件遵循Element Plus的设计规范，使用了Element Plus的文本颜色和字体大小变量，确保与整体UI风格保持一致。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-title>默认标题</z-title>
</template>

```

### 不同级别的标题
```vue
<template>
  <div class="title-demo">
    <z-title :level="1">一级标题</z-title>
    <z-title :level="2">二级标题</z-title>
    <z-title :level="3">三级标题</z-title>
  </div>
</template>
<style scoped>
.title-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

```

### 块级显示
```vue
<template>
  <z-title :block="true">这是一个块级标题，会占据整行</z-title>
  <z-title>这是一个行内标题</z-title>
  <span>紧跟在行内标题后面的文本</span>
</template>

```

### 在卡片中使用
```vue
<template>
  <el-card>
    <template #header>
      <z-title :level="1">卡片标题</z-title>
    </template>
    <div>
      <z-title :level="2">内容标题</z-title>
      <p>卡片内容区域</p>
    </div>
  </el-card>
</template>

```

### 标题大小对比
```vue
<template>
  <div class="title-size-demo">
    <z-title :level="1">一级标题 (最大)</z-title>
    <z-title :level="2">二级标题 (默认)</z-title>
    <z-title :level="3">三级标题 (最小)</z-title>
  </div>
</template>
<style scoped>
.title-size-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

```

### 标题与文本组合
```vue
<template>
  <div class="content-section">
    <z-title :level="1" :block="true">主标题</z-title>
    <p>这是主标题下的内容段落...</p>
    <z-title :level="2" :block="true">副标题</z-title>
    <p>这是副标题下的内容段落...</p>
    <z-title :level="3" :block="true">小标题</z-title>
    <p>这是小标题下的内容段落...</p>
  </div>
</template>
<style scoped>
.content-section p {
  margin: 8px 0 16px 0;
  color: var(--el-text-color-regular);
}
</style>

```

### 行内标题使用
```vue
<template>
  <div>
    <p>
      这段文字中包含一个
      <z-title :level="3">行内标题</z-title>
      ，标题后面继续其他文字内容。
    </p>
    <div>
      <z-title :level="2">分类：</z-title>
      <span>前端开发</span>
    </div>
  </div>
</template>

```

### 动态标题级别
```vue
<template>
  <div>
    <el-radio-group v-model="titleLevel">
      <el-radio :value="1">一级标题</el-radio>
      <el-radio :value="2">二级标题</el-radio>
      <el-radio :value="3">三级标题</el-radio>
    </el-radio-group>
    <z-title :level="titleLevel" :block="true">动态标题 (当前级别: {{ titleLevel }})</z-title>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const titleLevel = ref(2)
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| level | 标题级别，可选值为1、2、3 | number | 2 | v6.0 |
| block | 是否为块级元素 | boolean | false | v6.0 |


## 事件
组件没有提供特定事件。

## 方法
组件没有暴露公共方法。

## 插槽
| 插槽名 | 说明 | 版本号 |
| --- | --- | --- |
| default | 标题内容 | v6.0 |


## 注意事项
1. 组件默认为行内块级元素（inline-block），可以通过`block`属性设置为块级元素
2. 标题级别越小，字体大小越大，level=1表示最大的标题
3. 组件使用Element Plus的设计变量，自动适应主题变化
4. 组件仅控制文本的大小和显示方式，不包含其他样式如边距、边框等
5. 组件适合用于页面标题、卡片标题、表单分组标题等场景

