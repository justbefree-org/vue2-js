// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { log } from "@/configuration";
log();
// 公共模块
const PROJECTS = [
  "common"
];
import ProjectManager from "@/utils/projectManager";
const projectManager = new ProjectManager();
projectManager.startUp(PROJECTS);
