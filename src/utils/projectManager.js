/*
 * @Author: Just be free
 * @Date:   2019-11-21 21:40:24
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-08 09:56:19
 */
import "babel-polyfill";
import Vue from "vue";
import Router from "vue-router";
import Vuex from "vuex";
import App from "@/App";
import "normalize.css/normalize.css";
import "@/less/base.less";
import "@/lib/print.js";
import PluginManager from "@/utils/pluginManager";
const pluginManager = new PluginManager({ Vue, Router, Vuex });
import I18n from "@/utils/i18n";
const i18nInstance = new I18n();

class ProjectManager {
  constructor() {
    let _pluginManagerStack = [];
    this.getPluginManagerStack = () => {
      return _pluginManagerStack;
    };
    this.pushStack = pluginManager => {
      _pluginManagerStack.push(pluginManager);
    };
  }
  registerPluginManager(pluginManager) {
    this.pushStack(pluginManager);
    return this;
  }
  startUp(projects = []) {
    projects.forEach(pluginName => {
      this.registerPluginManager(pluginManager.register(pluginName));
    });
    const pluginManagers = this.getPluginManagerStack();
    Promise.all(pluginManagers).then(res => {
      pluginManager.install();
      const language = pluginManager.getLanguage("zh-CN");
      const router = pluginManager.getRouter();
      const store = pluginManager.getStore();
      const i18n = i18nInstance.setup(pluginManager, router, language);
      Vue.config.productionTip = false;
      /* eslint-disable no-new */
      new Vue({
        store,
        router,
        i18n,
        render: h => h(App)
      }).$mount("#app");
    });
  }
}
export default ProjectManager;
