# ZRouterView-路由视图
## 组件介绍
ZRouterView是一个基于Vue Router的路由视图组件，用于在应用中展示当前路由对应的组件内容。组件提供了统一的样式和布局，并支持页面缓存功能，可以保留页面状态，提高用户体验。组件适用于构建单页应用(SPA)的主内容区域。

## 用法及示例代码
### 基本用法
```vue
<template>
  <div class="app-layout">
    <header class="app-header">
      <!-- 页面头部内容 -->
    </header>
    <aside class="app-sidebar">
      <!-- 侧边栏菜单 -->
    </aside>
    <main class="app-main">
      <z-router-view />
    </main>
  </div>
</template>
<style scoped>
.app-layout {
  display: grid;
  grid-template-areas:
    'header header'
    'sidebar main';
  grid-template-rows: 60px 1fr;
  grid-template-columns: 220px 1fr;
  height: 100vh;
}

.app-header {
  grid-area: header;
  border-bottom: 1px solid #eee;
}

.app-sidebar {
  grid-area: sidebar;
  border-right: 1px solid #eee;
}

.app-main {
  grid-area: main;
  overflow: hidden;
}
</style>

```

### 在嵌套路由中使用
```vue
<template>
  <div class="nested-layout">
    <div class="nested-tabs">
      <!-- 子路由标签页 -->
      <router-link to="/parent/child1">子页面1</router-link>
      <router-link to="/parent/child2">子页面2</router-link>
    </div>
    <div class="nested-content">
      <z-router-view />
    </div>
  </div>
</template>

```

### 使用插槽添加额外内容
```vue
<template>
  <z-router-view>
    <!-- 插槽内容会显示在路由视图上方 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </z-router-view>
</template>
<style scoped>
.breadcrumb {
  padding: 16px 0;
  border-bottom: 1px solid #eee;
}
</style>

```

### 支持iframe页面
```vue
<template>
  <!-- 组件会自动处理iframe类型的路由 -->
  <z-router-view />
</template>
<script setup>
// 路由配置示例，包含iframe页面
const routes = [
  {
    path: '/external',
    name: 'External',
    meta: {
      title: '外部页面',
      target: 'iframe', // 标记为iframe类型
      active: true // 是否为当前激活的iframe
    },
    // iframe路由使用path作为iframe的src
    path: 'https://www.example.com'
  },
  {
    path: '/normal',
    name: 'Normal',
    meta: {
      title: '普通页面'
    },
    component: () => import('@/views/Normal.vue')
  }
]
</script>

```

### 配合KeepAlive状态管理
```vue
<template>
  <z-router-view />
</template>
<script setup>
import { useKeepAliveStore } from '@zhv3/common-utils'

// 获取KeepAlive状态管理
const keepAliveStore = useKeepAliveStore()

// 手动添加需要缓存的路由
const addKeepAlive = (route) => {
  keepAliveStore.put(route)
}

// 移除缓存的路由
const removeKeepAlive = (fullPath) => {
  keepAliveStore.remove(fullPath)
}

// 清空所有缓存
const clearKeepAlive = () => {
  keepAliveStore.clear()
}
</script>

```

## 属性
组件没有提供特定属性。

## 事件
组件没有提供特定事件。

## 方法
组件没有暴露公共方法。

## 插槽
| 插槽名 | 说明 | 版本号 |
| --- | --- | --- |
| default | 默认插槽，内容会显示在路由视图上方 | v6.0 |


## 注意事项
1. 组件内部使用了`<router-view>`和`<keep-alive>`，支持页面缓存功能
2. 组件应用了预设的样式，包括内边距、背景色、溢出处理等
3. 组件会自动适应暗黑模式，根据系统主题切换背景色
4. 组件占用了父容器的全部高度和宽度，并设置了`overflow-auto`，允许内容滚动
5. 组件预留了缓存视图的功能接口，但需要配合应用的状态管理系统使用
6. 组件适合作为应用的主内容区域，展示当前路由对应的页面内容

