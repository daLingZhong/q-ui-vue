import TabPane from "../Tabs/components/TabPane.vue";

TabPane.install = function(Vue) {
  Vue.component(TabPane.name, Tabs);
};

export default TabPane;
