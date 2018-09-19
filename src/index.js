import Tooltip from "../packages/Tooltip/index.js";
import Button from "../packages/Button/index.js";
import ButtonGroup from "../packages/ButtonGroup/index.js";

const components = [Tooltip, Button, ButtonGroup];

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
  Button,
  ButtonGroup,
  Tooltip,
  install,
};
