import Tooltip from "../packages/Tooltip/index.js";

const components = [Tooltip];

const install = function(Vue) {
  if (install.installed) {
    return;
  }
  components.forEach(component => {
    Vue.component(component.name, component);
  });

};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
  window.Vue.use(QUI);
}

export default {
  Tooltip,
  install,
};
