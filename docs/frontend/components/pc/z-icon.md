# ZIcon-图标
## 组件介绍
ZIcon是一个灵活的图标组件，支持多种图标来源，包括在线图标库（Iconify）、本地SVG图标和CSS图标。组件提供了统一的接口来使用不同来源的图标，支持自定义图标大小、颜色和悬停效果。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-icon icon="mdi:home" />
</template>

```

### 自定义大小和颜色
```vue
<template>
  <div class="icon-demo">
    <z-icon icon="mdi:star" :size="24" color="#FFD700" />
    <z-icon icon="mdi:heart" :size="32" color="#FF4500" />
    <z-icon icon="mdi:check-circle" :size="40" color="#4CAF50" />
  </div>

</template>

<style scoped>
.icon-demo {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>

```

### 使用本地SVG图标
```vue
<template>
  <z-icon icon="svg-icon:logo" :size="32" />
</template>

```

### 悬停效果
```vue
<template>
  <z-icon 
    icon="mdi:thumb-up" 
    :size="24" 
    color="#1E90FF" 
    hover-color="#FF4500" 
  />
</template>

```

### 在按钮中使用
```vue
<template>
  <el-button type="primary">
    <z-icon icon="mdi:plus" :size="16" />
    添加
  </el-button>

  
  <el-button type="danger">
    <z-icon icon="mdi:delete" :size="16" />
    删除
  </el-button>

</template>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| icon | 图标名称，支持Iconify格式或本地SVG格式（以'svg-icon:'为前缀） | String | '' | v6.0 |
| color | 图标颜色 | String | - | v6.0 |
| size | 图标大小（像素） | Number | 16 | v6.0 |
| hoverColor | 鼠标悬停时的图标颜色 | String | - | v6.0 |


## 事件
组件没有提供特定事件。

## 方法
组件没有暴露公共方法。

## 插槽
组件没有提供自定义插槽。

## 注意事项
1. 组件默认使用Iconify图标库，支持数千种图标
2. 使用本地SVG图标时，需要以'svg-icon:'为前缀，如'svg-icon:logo'
3. 组件内部会根据环境变量`VITE_USE_ONLINE_ICON`决定是否使用在线图标
4. 当使用在线图标时，需要确保网络可以访问Iconify CDN
5. 组件依赖于Element Plus的Icon组件和Iconify库
6. 可以通过hoverColor属性设置鼠标悬停时的图标颜色，增强交互体验

