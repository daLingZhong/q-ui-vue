import Tooltip from "../packages/Tooltip/index.js";
import Button from "../packages/Button/index.js";
import ButtonGroup from "../packages/ButtonGroup/index.js";
import Tabs from "../packages/Tabs/index.js";
import TabPane from "../packages/TabPane/index.js";
import Input from "../packages/Input/index.js";

const components = [
  Tooltip,
  Button,
  ButtonGroup,
  Tabs,
  TabPane,
  Input,
];

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
  // window.Vue.use(QUI);
}

export default {
  install,
  Button,
  ButtonGroup,
  TabPane,
  Tabs,
  Tooltip,
  Input,
};
