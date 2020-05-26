import Router from "@/utils/routerManager.js";
const router = new Router({ baseDir: "common/layout" });
router.register([
  {
    path: "*",
    name: "noPageWasFound",
    meta: { title: { en: "404", "zh-CN": "404" } },
    beforeEnter: (to, from, next) => {
      const origin = window.location.origin;
      window.location.href = origin + "/page-was-not-found.html";
      next();
    }
  }
]);
export default router.getRoutes();
