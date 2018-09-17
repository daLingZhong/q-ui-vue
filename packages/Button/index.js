import Button from "./components/Button.vue";

Button.install = function(Vue) {
  Vue.component(Button.name, Button);
};

export default Button;
