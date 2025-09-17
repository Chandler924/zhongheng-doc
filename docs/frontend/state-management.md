# 状态管理

纵横前端框架提供了强大的状态管理解决方案，基于Vue 3的Composition API和Pinia。

## 快速开始

### 安装

```bash
npm install @zongheng/frontend
```

### 基本使用

```typescript
// stores/user.ts
import { defineStore } from '@zongheng/frontend/store'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: '',
    isLoggedIn: false
  }),
  
  getters: {
    userName: (state) => state.user?.name || '',
    userEmail: (state) => state.user?.email || ''
  },
  
  actions: {
    async login(credentials: LoginCredentials) {
      try {
        const response = await api.login(credentials)
        this.user = response.user
        this.token = response.token
        this.isLoggedIn = true
        
        // 持久化到本地存储
        localStorage.setItem('token', this.token)
      } catch (error) {
        throw new Error('登录失败')
      }
    },
    
    logout() {
      this.user = null
      this.token = ''
      this.isLoggedIn = false
      localStorage.removeItem('token')
    }
  }
})
```

## 在组件中使用

```vue
<template>
  <div>
    <div v-if="isLoggedIn">
      <h2>欢迎, {{ userName }}!</h2>
      <p>邮箱: {{ userEmail }}</p>
      <button @click="logout">退出登录</button>
    </div>
    <div v-else>
      <LoginForm @login="handleLogin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import LoginForm from '@/components/LoginForm.vue'

const userStore = useUserStore()
const { isLoggedIn, userName, userEmail, login, logout } = userStore

const handleLogin = async (credentials: LoginCredentials) => {
  try {
    await login(credentials)
  } catch (error) {
    console.error('登录失败:', error)
  }
}
</script>
```

## 模块化状态管理

### 用户模块

```typescript
// stores/modules/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as UserProfile | null,
    preferences: {
      theme: 'light',
      language: 'zh-CN'
    }
  }),
  
  actions: {
    async fetchProfile() {
      const profile = await api.getUserProfile()
      this.profile = profile
    },
    
    updatePreferences(preferences: Partial<UserPreferences>) {
      this.preferences = { ...this.preferences, ...preferences }
    }
  }
})
```

### 应用模块

```typescript
// stores/modules/app.ts
export const useAppStore = defineStore('app', {
  state: () => ({
    loading: false,
    error: null as string | null,
    notifications: [] as Notification[]
  }),
  
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
    
    setError(error: string | null) {
      this.error = error
    },
    
    addNotification(notification: Notification) {
      this.notifications.push(notification)
    },
    
    removeNotification(id: string) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    }
  }
})
```

## 持久化存储

### 自动持久化

```typescript
// stores/index.ts
import { createPinia } from 'pinia'
import { createPersistedState } from '@zongheng/frontend/store/plugins'

const pinia = createPinia()

pinia.use(createPersistedState({
  storage: localStorage,
  paths: ['user.token', 'user.preferences']
}))

export default pinia
```

### 手动持久化

```typescript
// stores/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    preferences: JSON.parse(localStorage.getItem('preferences') || '{}')
  }),
  
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    
    setPreferences(preferences: UserPreferences) {
      this.preferences = preferences
      localStorage.setItem('preferences', JSON.stringify(preferences))
    }
  }
})
```

## 异步操作

### 处理异步状态

```typescript
// stores/async-example.ts
export const useAsyncStore = defineStore('async', {
  state: () => ({
    data: null,
    loading: false,
    error: null
  }),
  
  actions: {
    async fetchData() {
      this.loading = true
      this.error = null
      
      try {
        const data = await api.getData()
        this.data = data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
```

### 使用组合式函数

```typescript
// composables/useAsync.ts
import { ref, computed } from 'vue'

export function useAsync<T>(asyncFn: () => Promise<T>) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const execute = async () => {
    loading.value = true
    error.value = null
    
    try {
      data.value = await asyncFn()
    } catch (err) {
      error.value = err instanceof Error ? err.message : '未知错误'
    } finally {
      loading.value = false
    }
  }
  
  const isReady = computed(() => !loading.value && !error.value && data.value !== null)
  
  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    execute,
    isReady
  }
}
```

## 状态订阅

### 监听状态变化

```typescript
// 在组件中
import { watch } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 监听用户状态变化
watch(
  () => userStore.isLoggedIn,
  (isLoggedIn) => {
    if (isLoggedIn) {
      console.log('用户已登录')
    } else {
      console.log('用户已退出')
    }
  }
)
```

### 跨组件通信

```typescript
// stores/events.ts
export const useEventStore = defineStore('events', {
  state: () => ({
    events: [] as Event[]
  }),
  
  actions: {
    emit(event: Event) {
      this.events.push(event)
      
      // 触发全局事件
      window.dispatchEvent(new CustomEvent('store-event', { detail: event }))
    },
    
    on(eventType: string, callback: (event: Event) => void) {
      window.addEventListener('store-event', (e: CustomEvent) => {
        if (e.detail.type === eventType) {
          callback(e.detail)
        }
      })
    }
  }
})
```

## 最佳实践

### 1. 状态结构设计

```typescript
// 好的状态结构
export const useGoodStore = defineStore('good', {
  state: () => ({
    // 扁平化结构
    users: [] as User[],
    currentUser: null as User | null,
    loading: {
      users: false,
      currentUser: false
    },
    errors: {
      users: null as string | null,
      currentUser: null as string | null
    }
  })
})

// 避免深层嵌套
export const useBadStore = defineStore('bad', {
  state: () => ({
    // 避免这样的深层嵌套
    app: {
      user: {
        profile: {
          settings: {
            theme: 'light'
          }
        }
      }
    }
  })
})
```

### 2. 操作分离

```typescript
// 将复杂操作分解为小函数
export const useUserStore = defineStore('user', {
  actions: {
    async updateProfile(profileData: Partial<UserProfile>) {
      // 验证数据
      this.validateProfileData(profileData)
      
      // 更新本地状态
      this.updateLocalProfile(profileData)
      
      // 同步到服务器
      await this.syncToServer(profileData)
    },
    
    validateProfileData(data: Partial<UserProfile>) {
      // 验证逻辑
    },
    
    updateLocalProfile(data: Partial<UserProfile>) {
      // 更新本地状态
    },
    
    async syncToServer(data: Partial<UserProfile>) {
      // 同步到服务器
    }
  }
})
```

### 3. 错误处理

```typescript
export const useUserStore = defineStore('user', {
  state: () => ({
    error: null as string | null
  }),
  
  actions: {
    async login(credentials: LoginCredentials) {
      try {
        this.error = null
        const response = await api.login(credentials)
        this.user = response.user
      } catch (error) {
        this.error = this.handleLoginError(error)
        throw error
      }
    },
    
    handleLoginError(error: any): string {
      if (error.status === 401) {
        return '用户名或密码错误'
      } else if (error.status === 429) {
        return '登录尝试次数过多，请稍后再试'
      } else {
        return '登录失败，请检查网络连接'
      }
    }
  }
})
```

## 性能优化

### 1. 计算属性缓存

```typescript
export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[]
  }),
  
  getters: {
    // 计算属性会被缓存
    activeUsers: (state) => state.users.filter(user => user.active),
    userCount: (state) => state.users.length
  }
})
```

### 2. 状态分片

```typescript
// 将大状态分解为小模块
export const useUserListStore = defineStore('userList', {
  state: () => ({
    users: [] as User[],
    pagination: {
      page: 1,
      pageSize: 20,
      total: 0
    }
  })
})

export const useUserDetailStore = defineStore('userDetail', {
  state: () => ({
    currentUser: null as User | null,
    loading: false
  })
})
```

## 测试

### 单元测试

```typescript
// stores/__tests__/user.test.ts
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../user'

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should login user', async () => {
    const store = useUserStore()
    
    await store.login({
      email: 'test@example.com',
      password: 'password'
    })
    
    expect(store.isLoggedIn).toBe(true)
    expect(store.user).toBeDefined()
  })
})
```

## 调试工具

### Vue DevTools

纵横框架完全支持Vue DevTools，你可以：

1. 查看所有store的状态
2. 跟踪状态变化
3. 时间旅行调试
4. 性能分析

### 日志记录

```typescript
// stores/plugins/logger.ts
export function createLoggerPlugin() {
  return ({ store }) => {
    store.$onAction(({ name, args, after, onError }) => {
      console.log(`Action ${name} called with args:`, args)
      
      after((result) => {
        console.log(`Action ${name} completed with result:`, result)
      })
      
      onError((error) => {
        console.error(`Action ${name} failed with error:`, error)
      })
    })
  }
}
```
