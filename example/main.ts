import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' // 样式文件
// import javascript from 'highlight.js/lib/languages/javascript';

import App from './App.vue'
import router from './router'
import QUI from '../'
import '../theme-chalk/lib/index.css'

Vue.use(QUI)
// hljs.registerLanguage('javascript', javascript);

Vue.directive('highlight',(el) => {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=> {
    hljs.highlightBlock(block)
  })
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
