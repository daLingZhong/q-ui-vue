import Vue from 'vue'
import App from './App.vue'
import QUI from '../src/index'
console.log(QUI)

Vue.config.productionTip = false
Vue.use(QUI)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
