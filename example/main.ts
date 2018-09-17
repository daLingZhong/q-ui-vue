import Vue from 'vue'
import 'q-theme-default'

import App from './App.vue'
import QUI from '../src/index'
import router from './router'

Vue.config.productionTip = false
Vue.use(QUI)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
