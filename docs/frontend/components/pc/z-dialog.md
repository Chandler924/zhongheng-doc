# ZDialog-对话框
## 组件介绍
ZDialog是一个基于Element Plus的对话框组件封装，提供更简洁的API和更灵活的内容展示方式。支持字符串内容和组件内容两种模式，并提供确定和取消按钮的回调处理。

## 用法及示例代码
### 基本用法
```vue
<template>
  <el-button @click="show1">打开对话框</el-button>
</template>
<script setup>
import { createApp } from 'vue'
import ZDialog from '@zhv3/components-el/lib/dialog/ZDialog.vue'

const dialog = (options) => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const app = createApp(ZDialog, options)
  const instance = app.mount(div)
  return instance
}

const show1 = () => {
  dialog({
    title: '提示',
    body: '这是一个简单的对话框内容',
    ok: () => {
      console.log('点击了确定按钮')
    },
    cancel: () => {
      console.log('点击了取消按钮')
    }
  })
}
</script>

```

### 使用组件作为对话框内容
```vue
<template>
  <el-button @click="showComponentDialog">打开组件对话框</el-button>
</template>
<script setup>
import { createApp } from 'vue'
import ZDialog from '@zhv3/components-el/lib/dialog/ZDialog.vue'
import UserForm from './UserForm.vue'

const dialog = (options) => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const app = createApp(ZDialog, options)
  const instance = app.mount(div)
  return instance
}

const showComponentDialog = () => {
  dialog({
    title: '用户表单',
    body: UserForm,
    bodyProps: {
      userId: 1001
    },
    width: '500px',
    ok: async (instance) => {
      // 获取表单组件实例
      const formInstance = instance.bodyRef
      // 验证表单
      const valid = await formInstance.validate()
      if (valid) {
        // 提交表单
        await formInstance.submitForm()
        return true // 关闭对话框
      }
      return false // 不关闭对话框
    }
  })
}
</script>

```

### 自定义按钮文本和禁止点击遮罩关闭
```vue
<template>
  <el-button @click="showCustomDialog">自定义对话框</el-button>
</template>
<script setup>
import { createApp } from 'vue'
import ZDialog from '@zhv3/components-el/lib/dialog/ZDialog.vue'

const dialog = (options) => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const app = createApp(ZDialog, options)
  const instance = app.mount(div)
  return instance
}

const showCustomDialog = () => {
  dialog({
    title: '自定义对话框',
    body: '禁止点击遮罩层关闭对话框',
    confirmButtonText: '确认操作',
    cancelButtonText: '放弃操作',
    closeOnClickModal: false
  })
}
</script>

```

### 事件监听
```vue
<template>
  <el-button @click="showEventDialog">事件监听对话框</el-button>
</template>
<script setup>
import { createApp } from 'vue'
import ZDialog from '@zhv3/components-el/lib/dialog/ZDialog.vue'

const dialog = (options) => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const app = createApp(ZDialog, options)
  const instance = app.mount(div)
  return instance
}

const showEventDialog = () => {
  dialog({
    title: '事件监听',
    body: '点击确定按钮将阻止对话框关闭',
    ok(zdialog) {
      // 返回false阻止对话框关闭
      return false
    },
    cancel(zdialog) {
      // 返回true允许对话框关闭
      return true
    }
  })
}
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| body | 对话框内容，可以是字符串或组件 | string | object | '' | v6.0 |
| bodyProps | 当body为组件时传递给组件的属性 | Record<string, any> | {} | v6.0 |
| destroyOnClose | 关闭时销毁组件 | boolean | true | v6.0 |
| ok | 点击确定按钮的回调函数 | (instance: any) => Promise | boolean | void | undefined | v6.0 |
| cancel | 点击取消按钮的回调函数 | (instance: any) => Promise | boolean | void | undefined | v6.0 |
| confirmButtonText | 确认按钮文字 | string | '确定' | v6.0 |
| cancelButtonText | 取消按钮文字 | string | '取消' | v6.0 |


除以上属性外，组件还支持所有Element Plus的Dialog组件属性，如width、top、modal等。

## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| close | 对话框关闭时触发 | - | - | v6.0 |


组件还支持Element Plus Dialog的所有原生事件。

## 方法
| 方法名 | 说明 | 参数 | 版本号 |
| --- | --- | --- | --- |
| close | 关闭对话框 | - | v6.0 |


通过defineExpose暴露的方法还包括：

+ `bodyRef`: 获取内容组件的引用

## 插槽
组件没有提供自定义插槽。

## 注意事项
1. 对话框是通过动态创建和挂载Vue组件实现的，使用完成后会自动销毁
2. 在`ok`和`cancel`回调函数中，可以返回`false`阻止对话框关闭
3. 可以通过回调函数的`instance`参数访问对话框实例，通过`instance.bodyRef`访问内容组件的实例
4. 自定义组件可以通过inject注入获取对话框的属性，如示例中的自定义内容组件
5. 组件依赖于Element Plus的Dialog组件

