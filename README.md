# q-ui-vue

Q UI component for Vue.js

# Installation
npm install q-ui-vue

# Usage
```
import QUI from 'q-ui-vue'  
Vue.use(QUI)
```

# License
MIT

# Example
npm install  
npm run serve  
localhost:8080

## Demo

online example:    [https://dalingzhong.github.io/q-ui-vue/](https://dalingzhong.github.io/q-ui-vue/)

## Tooltip
|参数|说明|类型|可选值|默认值|
|-|-|-|-|-|
|position|Tooltip出现的位置|string|top/bottom/left/right|top|
|content|显示的内容，也可以通过 `slot#content` 传入 DOM| string | / | / |
|theme|默认提供的主题|string|Dark/Light|Dark|
|trigger|触发方式|string|click/hover|hover|

## Button
|参数|说明|类型|可选值|默认值|
|-|-|-|-|-|
|size|尺寸|string|large/small/mini|/|
|type|类型|string|primary/success/warning/danger/dashed/text|/|
|loading|是否加载中状态|boolean|/|false|
|disabled|是否禁用状态|boolean|/|false|
|icon|图标类名|string|/|/|

注：如果在button中使用自己的图标`<i></i>`需要自行调整图标的`margin`属性

### ButtonGroup
```
  <q-button-group>
    <q-button icon="search" type="primary"></q-button>
    <q-button icon="search" type="primary"></q-button>
    <q-button icon="search" type="primary"></q-button>
  </q-button-group>
```

## Tabs
### Tab
|参数|说明|类型|可选值|默认值|
|-|-|-|-|-|
|type|标签页的主题|string|card|null|
|position|布局方向|string|top/bottom/left/right|top|
|editable|是否编辑|boolean|/|false|
### Tab Event
|事件名称|说明|回调参数|
|-|-|-|-|-|
|tab-add|点击tab新增按钮后触发|/|
|tab-selected|tab 被选中时触发|被选中的标签 tab 实例|
|tab-remove|点击 tab 移除按钮后触发|被删除的标签的 label|
### TabPane
|参数|说明|类型|可选值|默认值|
|-|-|-|-|-|
|label|标签页名|string|/|/|
|active|默认选中|boolean|/|false|
|disabled|是否禁用|boolean|/|false|
|icon|图标|string|/|/|