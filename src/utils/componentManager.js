/*
 * @Author: Just be free
 * @Date:   2019-11-19 21:04:54
 * @Last Modified by:   Lizhuang
 * @Last Modified time: 2019-11-20 19:19:47
 */
import { loadComponent, loadI18n } from "./load";
class ComponentManager {
  constructor() {
    let _components = {};
    this.getComponents = () => {
      return _components;
    };
    this.addComponent = (component, name) => {
      _components[name] = component;
    };
    // 存储所有注册的组件的多语言
    let _i18n = {};
    this.addI18n = (i18n, name) => {
      // 设置语言种类
      if (!this.languages || (this.languages && this.languages.length === 0)) {
        this.languages = Object.keys(i18n);
      }
      if (!_i18n[name]) {
        _i18n[name] = i18n;
      }
    };
    this.getI18n = () => {
      return _i18n;
    };
    this.languages = [];
    this.pluginName = "";
  }
  setPluginName(pluginName = "common") {
    this.pluginName = pluginName;
  }
  getPluginName() {
    return this.pluginName;
  }
  getLanguages() {
    return this.languages;
  }
  add(floderName = "", name, onlyI18n = false) {
    // 考虑到部分组件是通过组件直接引入，针对这部分的组件也要把多语言统一起来
    const path = this.pluginName + "/" + floderName;
    if (!onlyI18n) {
      this.addComponent(loadComponent(path), name);
    }
    this.addI18n(loadI18n(path), name);
    return this;
  }
}
export default ComponentManager;
