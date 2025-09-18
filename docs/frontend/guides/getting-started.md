# 前端框架快速开始

欢迎使用纵横前端框架！本指南将帮助你在5分钟内搭建你的第一个应用。

## 安装

### 使用 npm
```bash
npm install @zongheng/frontend
```

### 使用 yarn
```bash
yarn add @zongheng/frontend
```

### 使用 pnpm
```bash
pnpm add @zongheng/frontend
```

## 创建应用

### 1. 初始化项目

```bash
npx create-zongheng-app my-app
cd my-app
```

### 2. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

## 基本使用

### 创建组件

```vue
<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <z-button @click="handleClick">点击我</z-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ZButton } from '@zongheng/frontend'

const message = ref('Hello Zongheng!')

const handleClick = () => {
  message.value = '按钮被点击了!'
}
</script>
```

### 配置路由

```typescript
// router/index.ts
import { createRouter, createWebHistory } from '@zongheng/frontend/router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### 状态管理

```typescript
// stores/user.ts
import { defineStore } from '@zongheng/frontend/store'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: ''
  }),
  
  actions: {
    setUser(user: { name: string; email: string }) {
      this.name = user.name
      this.email = user.email
    }
  }
})
```

## 项目结构

```
my-app/
├── src/
│   ├── components/     # 组件
│   ├── views/         # 页面
│   ├── stores/        # 状态管理
│   ├── router/        # 路由配置
│   ├── utils/         # 工具函数
│   └── main.ts        # 入口文件
├── public/            # 静态资源
└── package.json
```

## 下一步

- 查看 [组件库文档](/frontend/components) 了解可用组件
- 学习 [状态管理](/frontend/state-management) 的最佳实践
- 配置 [路由系统](/frontend/routing) 实现页面导航

## 常见问题

### Q: 如何自定义主题？
A: 可以通过修改 `src/styles/theme.css` 文件来自定义主题变量。

### Q: 支持TypeScript吗？
A: 是的，框架完全支持TypeScript，并提供完整的类型定义。

### Q: 如何添加新的组件？
A: 在 `src/components` 目录下创建新的Vue组件即可。
