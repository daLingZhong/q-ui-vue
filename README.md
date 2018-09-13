# q-ui-vue

Q UI component for Vue.js

# Installation
npm install q-ui-vue

# Usage
import QUI from 'q-ui-vue'  
Vue.use(QUI)

# License
MIT

# Example
npm install  
npm run serve
localhost:8080

## Tooltip
|参数|说明|类型|可选值|默认值|
|-|-|-|-|-|
|position|Tooltip出现的位置|String|top/bottom/left/right|top|
|content|显示的内容，也可以通过 `slot#content` 传入 DOM| String | / | / |
|theme|默认提供的主题|String|Dark/Light|Dark|
