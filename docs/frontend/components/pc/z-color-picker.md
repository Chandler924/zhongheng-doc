# ZColorPicker-颜色选择器
## 组件介绍
ZColorPicker是一个基于Element Plus的颜色选择器组件，用于在表单中选择颜色值。组件默认启用透明度调节功能，内置了13种预定义颜色（包括HEX、RGB、HSV、HSL、RGBA、HSVA、HSLA等多种格式），支持各种颜色格式的输入和输出。组件提供了简洁的接口，易于集成和使用，并自定义了触发器样式以保持设计的一致性。

## 用法及示例代码
### 基本用法
```vue
<template>
  <z-color-picker v-model="color" @change="handleColorChange" />
</template>
<script setup>
import { ref } from 'vue'

const color = ref('#000000')

const handleColorChange = (value) => {
  console.log('选择的颜色:', value)
}
</script>

```

### 不同尺寸
```vue
<template>
  <div class="color-picker-demo">
    <z-color-picker v-model="color1" size="small" />
    <z-color-picker v-model="color2" size="default" />
    <z-color-picker v-model="color3" size="large" />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const color1 = ref('#ff4500')
const color2 = ref('#1e90ff')
const color3 = ref('#90ee90')
</script>
<style scoped>
.color-picker-demo {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>

```

### 默认颜色值
```vue
<template>
  <z-color-picker v-model="selectedColor" />
</template>
<script setup>
import { ref } from 'vue'

// 设置初始颜色为半透明红色
const selectedColor = ref('rgba(255, 0, 0, 0.5)')
</script>

```

### 在表单中使用
```vue
<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="主题颜色">
      <z-color-picker v-model="form.themeColor" />
    </el-form-item>
    <el-form-item label="背景颜色">
      <z-color-picker v-model="form.backgroundColor" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive } from 'vue'

const form = reactive({
  themeColor: '#1e90ff',
  backgroundColor: '#ffffff'
})

const submitForm = () => {
  console.log('表单数据:', form)
}
</script>

```

## 属性
| 参数 | 说明 | 类型 | 默认值 | 版本号 |
| --- | --- | --- | --- | --- |
| modelValue | 绑定值，颜色值 | String | '#000000' | v6.0 |
| size | 颜色选择器大小，可选值为large、default、small | String | 'default' | v6.0 |


## 事件
| 事件名称 | 说明 | 回调参数 | 参数结构 | 版本号 |
| --- | --- | --- | --- | --- |
| update:modelValue | 颜色值变化时触发 | value | 更新后的颜色值（String） | v6.0 |
| change | 颜色值变化时触发 | value | 更新后的颜色值（String） | v6.0 |


## 方法
组件没有暴露公共方法。

## 插槽
组件没有提供自定义插槽。

## 注意事项
1. 组件默认启用透明度调节功能（show-alpha=true）
2. 组件内置了13种预定义颜色，包含多种颜色格式示例：
    - HEX格式：#ff4500、#ff8c00、#ffd700、#90ee90、#00ced1、#1e90ff、#c71585
    - RGBA格式：rgba(255, 69, 0, 0.68)
    - RGB格式：rgb(255, 120, 0)
    - HSV格式：hsv(51, 100, 98)
    - HSVA格式：hsva(120, 40, 94, 0.5)
    - HSL格式：hsl(181, 100%, 37%)
    - HSLA格式：hsla(209, 100%, 56%, 0.73)
3. 支持多种颜色格式的输入和输出
4. 组件默认颜色值为黑色（#000000）
5. 组件依赖于Element Plus的ColorPicker组件
6. 自定义了触发器样式：宽度50px，高度27px，内边距2px
7. 组件支持v-model双向绑定
8. 同时触发update:modelValue和change事件，两个事件的回调参数相同

