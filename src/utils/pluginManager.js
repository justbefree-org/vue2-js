/*
 * @Author: Just be free
 * @Date:   2019-11-05 12:15:37
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-08 10:11:49
 */
import { getEnvironment } from "@/configuration";
const debug = getEnvironment() !== "production";
import { loadPlugin } from "./load";
import { print } from "@/lib/console";
class pluginManager {
  constructor(args = {}) {
    const _Vue = args.Vue;
    this.getVueInstance = () => {
      return _Vue;
    };
    let _store = {};
    this.getStoreObject = () => {
      return _store;
    };
    this.tempModules = {};
    this.registerModule = (name, module, isGlobal = false) => {
      if (isGlobal) {
        _store = module;
        // 这行代码必须加
        // 极少数情况下所有子节点先加载完毕，最后加载根节点后导致根节点上并未挂载子节点
        _store["modules"] = { ..._store["modules"], ...this.tempModules };
        print("The root store has been registered");
      } else {
        // 由于每个模块是异步加载，所以防止根模块节点不存在，需要临时存储子模块，然后待根模块加载进来再进行子模块挂载
        if (!_store["modules"]) {
          this.tempModules[name] = module;
          print(`The ${name} module has been registered`);
        } else {
          _store["modules"] = { ..._store["modules"], ...this.tempModules };
          _store["modules"][name] = module;
          // 用完之后记得清除掉
          this.tempModules = {};
          print(`The ${name} module has been registered`);
        }
      }
    };
    this.processingModule = (name, singleStoreArr = [], isGlobal = false) => {
      const store = {
        namespaced: true,
        state: {},
        actions: {},
        mutations: {},
        getters: {}
      };
      if (isGlobal) {
        delete store["namespaced"];
        store["modules"] = {};
        store["strict"] = debug;
      }
      singleStoreArr.forEach(singleStore => {
        store["state"] = { ...store["state"], ...singleStore.getState() };
        store["mutations"] = {
          ...store["mutations"],
          ...singleStore.getMutation()
        };
        store["actions"] = { ...store["actions"], ...singleStore.getAction() };
        store["getters"] = { ...store["getters"], ...singleStore.getGetter() };
      });
      this.registerModule(name, store, isGlobal);
    };
    const _plugins = [];
    this.addPlugin = plugin => {
      _plugins.push(plugin);
    };
    let _components = [];
    this.setComponents = (components = []) => {
      _components = components;
    };
    this.getComponents = () => {
      return _components;
    };
    let _lazyLoadComponents = {};
    this.getLazyLoadComponents = () => {
      return _lazyLoadComponents;
    };
    this.getLazyLoadComponent = key => {
      if (!key) {
        return {};
      }
      return _lazyLoadComponents[key];
    };
    this.setLazyLoadComponents = (lazyLoadCoponents = {}) => {
      _lazyLoadComponents = lazyLoadCoponents;
    };
    let _routers = [];
    this.getRoutes = () => {
      return _routers;
    };
    this.setRoutes = (routes = []) => {
      _routers = routes;
    };
    let _i18n = {};
    this.setI18n = (pluginName, i18n = {}, languages = []) => {
      const componentName = Object.keys(i18n);
      languages.forEach(lang => {
        if (!_i18n[lang]) {
          _i18n[lang] = { language: {} };
        }
        if (!_i18n[lang]["language"][pluginName]) {
          _i18n[lang]["language"][pluginName] = {};
        }
        componentName.forEach(name => {
          if (!_i18n[lang]["language"][pluginName][name]) {
            _i18n[lang]["language"][pluginName][name] = i18n[name][lang];
          }
        });
      });
    };
    this.getI18n = () => {
      return _i18n;
    };
    this.getLanguage = (lang = "zh-CN") => {
      return _i18n[lang];
    };
    this.VueRouter = args.Router;
    this.Vuex = args.Vuex;
    this.callbackForEveryComponent = () => {};
    this.installVueRouter();
    this.installVuex();
  }

  installVueRouter() {
    this.getVueInstance().use(this.VueRouter);
    this.polyfill();
  }

  installVuex() {
    this.getVueInstance().use(this.Vuex);
  }

  polyfill() {
    // NavigationDuplicated
    // https://github.com/vuejs/vue-router/issues/2881
    const originalPush = this.VueRouter.prototype.push;
    this.VueRouter.prototype.push = function push(
      location,
      onResolve,
      onReject
    ) {
      if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
      }
      return originalPush.call(this, location).catch(err => err);
    };
    const originalReplace = this.VueRouter.prototype.replace;
    this.VueRouter.prototype.replace = function replace(
      location,
      onResolve,
      onReject
    ) {
      if (onResolve || onReject) {
        return originalReplace.call(this, location, onResolve, onReject);
      }
      return originalReplace.call(this, location).catch(err => err);
    };
  }

  register(pluginName) {
    if (!pluginName) {
      return false;
    }
    return loadPlugin(pluginName)
      .then(module => {
        const plugin = module.default;
        this.registerStore(plugin.name, plugin.global);
        this.addPlugin(plugin);
        this.setI18n(plugin.name, plugin.i18n, plugin.languages);
        if (
          Object.prototype.toString.call(plugin.components) === "[object Array]"
        ) {
          const components = [...plugin.components, ...this.getComponents()];
          this.setComponents(components);
        } else {
          const lazyLoadCoponents = {
            ...plugin.components,
            ...this.getLazyLoadComponents()
          };
          this.setLazyLoadComponents(lazyLoadCoponents);
        }
        const routes = [...this.getRoutes(), ...plugin.routes];
        this.setRoutes(routes);
        return Promise.resolve(plugin);
      })
      .catch(err => {
        print("load plugin fail ", err);
        return Promise.reject(err);
      });
  }

  registerStore(moduleName, isGlobal = false) {
    const name = moduleName.toLocaleLowerCase();
    try {
      const pluginStore = require(`@/store/${name}/index.js`)["default"];
      this.processingModule(name, pluginStore, isGlobal);
    } catch (err) {
      print(err);
    }
  }

  getStore() {
    const store = this.getStoreObject();
    return new this.Vuex.Store({
      ...store
    });
  }

  getRouter() {
    const routes = this.getRoutes();
    return new this.VueRouter({ routes });
  }

  every(callback) {
    if (callback && typeof callback === "function") {
      this.callbackForEveryComponent = callback;
    }
  }

  install() {
    // 同步加载所有注册组件
    this.getComponents().map(component => {
      this.callbackForEveryComponent(component);
      this.getVueInstance().use(component);
    });
    // 异步按需加载组件
    Object.keys(this.getLazyLoadComponents()).forEach(key => {
      this.callbackForEveryComponent({
        key,
        component: this.getLazyLoadComponent(key)
      });
      this.getVueInstance().component(key, this.getLazyLoadComponent(key));
    });
  }
}

export default pluginManager;
