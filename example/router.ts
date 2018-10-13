import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue'
import ButtonDemo from './views/components/ButtonDemo.vue'
import Tooltip from './views/components/Tooltip.vue'
import Tabs from './views/components/Tabs.vue'
import Input from './views/components/Input.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/button',
      component: ButtonDemo,
    },
    {
      path: '/tabs',
      component: Tabs,
    },
    {
      path: '/tooltip',
      component: Tooltip,
    },
    {
      path: '/input',
      component: Input,
    },
  ],
});
