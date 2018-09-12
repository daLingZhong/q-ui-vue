import Tooltip from "./components/Tooltip.vue";

Tooltip.install = function(Vue) {
  Vue.component(Tooltip.name, Tooltip);
};

export default Tooltip;
