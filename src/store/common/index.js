/*
 * @Author: Just be free
 * @Date:   2019-12-12 18:29:58
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-08 10:16:19
 */
export const API = {
};
const stores = [];
const requireComponent = require.context("@/store/common", false, /\.js$/);
requireComponent.keys().forEach(fileName => {
  if (fileName !== "./index.js" && fileName !== "./default.js") {
    const componentConfig = requireComponent(fileName)["default"];
    stores.push(componentConfig);
  }
});
export default stores;
