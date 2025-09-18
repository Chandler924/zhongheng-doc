# ZLoading-加载中
## 组件介绍
ZLoading是一个全局加载提示组件，基于Element Plus的Loading服务封装。它提供了简单的API来显示和隐藏全屏加载状态，适用于异步操作、数据加载等需要阻止用户交互的场景。组件会在页面上显示一个带有加载动画的遮罩层，提示用户当前操作正在进行中。

## 用法及示例代码
### 基本用法
```javascript
import { ZLoading } from '@zhv3/components-el'

// 显示加载中
ZLoading.show()

// 模拟异步操作
setTimeout(() => {
  // 隐藏加载中
  ZLoading.hide()
}, 2000)
```

### 在异步请求中使用
```javascript
import { ZLoading } from '@zhv3/components-el'
import axios from 'axios'

const fetchData = async () => {
  try {
    // 显示加载中
    ZLoading.show()
    
    // 发起请求
    const response = await axios.get('/api/data')
    
    // 处理响应数据
    return response.data
  } catch (error) {
    console.error('请求失败:', error)
    throw error
  } finally {
    // 无论成功或失败，都需要隐藏加载中
    ZLoading.hide()
  }
}
```

### 在Vue组件中使用
```vue
<template>
  <div>
    <el-button @click="loadData">加载数据</el-button>

    <div v-if="data.length > 0">
      <!-- 数据展示 -->
    </div>

  </div>

</template>

<script setup>
import { ref } from 'vue'
import { ZLoading } from '@zhv3/components-el'

const data = ref([])

const loadData = async () => {
  ZLoading.show()
  
  try {
    // 模拟异步请求
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 设置数据
    data.value = [
      { id: 1, name: '数据1' },
      { id: 2, name: '数据2' },
      { id: 3, name: '数据3' }
    ]
  } catch (error) {
    console.error(error)
  } finally {
    ZLoading.hide()
  }
}
</script>

```

### 在路由导航守卫中使用
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import { ZLoading } from '@zhv3/components-el'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 路由配置
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 显示加载状态
  ZLoading.show()
  next()
})

// 全局后置钩子
router.afterEach(() => {
  // 隐藏加载状态
  ZLoading.hide()
})

export default router
```

## 方法
| 方法名 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| show | 显示全屏加载中状态 | - | v6.0 |
| hide | 隐藏全屏加载中状态 | - | v6.0 |


## 注意事项
1. ZLoading是一个全局单例服务，调用`show()`方法会在整个页面上显示加载状态
2. 每次调用`show()`方法后，必须确保最终调用`hide()`方法来关闭加载状态
3. 推荐在`try/finally`块中使用，确保即使发生错误也能关闭加载状态
4. 组件内部使用了Element Plus的Loading服务，默认配置为锁定背景、显示"加载中"文本、透明背景
5. 多次调用`show()`方法不会创建多个加载实例，但需要对应调用相同次数的`hide()`方法才能完全关闭
6. 组件适用于全局性的加载状态，如果只需要局部加载，建议直接使用Element Plus的v-loading指令
7. 在路由导航守卫中使用时，需要确保在路由跳转完成后调用`hide()`方法

