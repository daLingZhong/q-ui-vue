import ButtonGroup from "./components/ButtonGroup.vue";

ButtonGroup.install = function(Vue) {
  Vue.component(ButtonGroup.name, ButtonGroup);
};

export default ButtonGroup;
