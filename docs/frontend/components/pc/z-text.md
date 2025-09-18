# ZText-文本
## 组件介绍
ZText是一个基础文本组件，用于展示普通文本内容。组件遵循Element Plus的设计规范，使用了Element Plus的文本颜色和字体大小变量，确保与整体UI风格保持一致。组件支持行内和块级两种显示模式，方便在不同场景下使用。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-text>这是一段普通文本</z-text>
</template>

```

### 块级显示
```vue
<template>
  <z-text :block="true">这是一段块级文本，会占据整行</z-text>
  <z-text>这是一段行内文本</z-text>
  <span>紧跟在行内文本后面的内容</span>
</template>

```

### 在表单中使用
```vue
<template>
  <el-form label-width="120px">
    <el-form-item label="用户名">
      <z-text>张三</z-text>
    </el-form-item>
    <el-form-item label="邮箱">
      <z-text>zhangsan@example.com</z-text>
    </el-form-item>
    <el-form-item label="备注">
      <z-text :block="true">这是一段较长的备注信息，使用块级显示可以更好地展示长文本内容。</z-text>
    </el-form-item>
  </el-form>
</template>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| block | 是否为块级元素 | boolean | false | v6.0 |


## 事件
组件没有提供特定事件。

## 方法
组件没有暴露公共方法。

## 插槽
| 插槽名 | 说明 | 版本号 |
| --- | --- | --- |
| default | 文本内容 | v6.0 |


## 注意事项
1. 组件默认为行内元素（span），可以通过`block`属性设置为块级显示
2. 组件使用Element Plus的设计变量，自动适应主题变化
3. 组件仅控制文本的显示方式，不包含其他样式如边距、边框等
4. 组件适合用于表单项内容、信息展示、描述文本等场景
5. 与ZTitle组件搭配使用，可以构建结构化的信息展示区域

