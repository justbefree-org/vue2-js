/*
 * @Author: Just be free
 * @Date:   2019-11-29 00:41:40
 * @Last Modified by:   Lizhuang
 * @Last Modified time: 2019-12-02 11:00:33
 */
import { loadComponent } from "./load";
class Router {
  constructor(args = {}) {
    const { baseDir } = args;
    this.getBaseDir = () => {
      return baseDir;
    };
    const _routes = [];
    this.pushRoutes = route => {
      _routes.push(route);
    };
    this.getRoutes = () => {
      return _routes;
    };
  }
  register(routes = []) {
    routes.forEach(route => {
      if (route.pathName) {
        let path = this.getBaseDir() + "/" + route.pathName;
        route.component = loadComponent(path);
        if (route.children && route.children.length > 0) {
          this.register(route.children);
        }
      }
      // 注册一级路由，以及404页面
      if (route.path.startsWith("/") || route.path === "*") {
        this.pushRoutes(route);
      }
    });
  }
}
export default Router;
