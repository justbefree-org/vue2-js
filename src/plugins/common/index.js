const ComponentManager = require("@/utils/componentManager")["default"];
const componentManager = new ComponentManager();
componentManager.setPluginName("common");
componentManager
  .add("layout/404", "notFound", true);
import routes from "./router";
export default {
  components: componentManager.getComponents(),
  routes,
  languages: componentManager.getLanguages(),
  i18n: componentManager.getI18n(),
  name: componentManager.getPluginName(),
  global: true
};
