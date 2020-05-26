/*
 * @Author: Just be free
 * @Date:   2019-11-28 10:40:24
 * @Last Modified by:   Lizhuang
 * @Last Modified time: 2019-11-28 14:21:30
 */
import Vue from "vue";
import notFound from "@/plugins/common/layout/404";
console.log("偷窥别人网站是很忌讳的知道吗？");
new Vue({
  render: h => h(notFound)
}).$mount("#app");
