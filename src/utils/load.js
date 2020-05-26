/*
 * @Author: Just be free
 * @Date:   2019-11-19 21:10:29
 * @Last Modified by:   Lizhuang
 * @Last Modified time: 2019-11-29 01:06:43
 */
export const loadPlugin = (path = "", callback, errcallback) => {
  return import(`@/plugins/${path}/index.js`);
};

export const loadComponent = (path = "") => {
  // const com = () => import( webpackChunkName: "index" `@/plugins/common/${path}/index.js`)
  // 使用[request]来告诉webpack，这里的值是根据后面传入的字符串来决定，本例中就是变量path的值
  return () =>
    import(/* webpackChunkName: "[request]" */ `@/plugins/${path}/index.js`);
};

export const loadI18n = (path = "") => {
  let i18n = {};
  try {
    i18n = {
      "zh-CN": require(`@/plugins/${path}/locale/zh-CN.js`)["default"],
      en: require(`@/plugins/${path}/locale/en.js`)["default"]
    };
  } catch (err) {
    i18n = {
      "zh-CN": {},
      en: {}
    };
  }
  return i18n;
};
