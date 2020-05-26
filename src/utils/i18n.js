/*
 * @Author: Just be free
 * @Date:   2019-11-21 15:54:03
 * @Last Modified by:   Lizhuang
 * @Last Modified time: 2019-11-22 14:34:42
 */
import Vue from "vue";
import VueI18n from "vue-i18n";
import { acceptLanguage } from "@/lib/axios";
Vue.use(VueI18n);
class I18n {
  constructor() {
    this.router = null;
    this.pluginManager = null;
    this.loadedLanguages = ["zh-CN"];
    this.i18n = null;
  }
  setI18nLanguage(lang) {
    this.i18n.locale = lang;
    acceptLanguage(lang);
    document.querySelector("html").setAttribute("lang", lang);
    return lang;
  }
  loadLanguageAsync(lang) {
    if (this.i18n.locale !== lang) {
      if (!this.loadedLanguages.includes(lang)) {
        this.i18n.setLocaleMessage(lang, this.pluginManager.getLanguage(lang));
        this.loadedLanguages.push(lang);
        return Promise.resolve(this.setI18nLanguage(lang));
      }
      return Promise.resolve(this.setI18nLanguage(lang));
    }
    return Promise.resolve(lang);
  }
  beforeEach() {
    this.router.beforeEach((to, from, next) => {
      const { lang = "zh-CN" } = to.query;
      acceptLanguage(lang);
      this.loadLanguageAsync(lang).then(() => next());
    });
  }
  setup(pluginManager, router, messages = {}) {
    // http://kazupon.github.io/vue-i18n/guide/fallback.html
    this.i18n = new VueI18n({
      locale: "zh-CN",
      fallbackLocale: "zh-CN",
      messages: { "zh-CN": messages }
    });
    this.pluginManager = pluginManager;
    this.router = router;
    this.beforeEach();
    return this.i18n;
  }
}
export default I18n;
