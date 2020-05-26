/*
 * @Author: Just be free
 * @Date:   2019-12-10 16:51:36
 * @Last Modified by:   Lizhuang
 * @Last Modified time: 2019-12-24 17:43:37
 */
import { getConfig } from "@/configuration";
export const print = (...args) => {
  const enverniment = getConfig("enverniment");
  if (enverniment === "dev" || enverniment === "test") {
    console && console.log(...args);
  }
};
