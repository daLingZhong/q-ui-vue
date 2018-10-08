import Vue from 'vue'
// import 'q-theme-default'

import App from './App.vue'
import router from './router'
import QUI from '../'

Vue.use(QUI)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
