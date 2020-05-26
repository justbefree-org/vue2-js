/*
 * @Author: Just be free
 * @Date:   2019-11-22 13:47:44
 * @Last Modified by:   Lizhuang
 * @Last Modified time: 2019-11-22 14:37:24
 */
import axios from "axios";
export const acceptLanguage = lang => {
  axios.defaults.headers.common["Accept-Language"] = lang;
};

export const formData = () => {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
  });
  return instance;
};

export const json = () => {
  const instance = axios.create({
    headers: { "Content-Type": "application/json;charset=utf-8" }
  });
  // 请求拦截器
  instance.interceptors.request.use(
    config => {
      let { url } = config;
      const urls = ["/schedule/getStandardV2", "/schedule/getStandard"];
      if (urls.includes(url)) {
        config.timeout = 60 * 1000;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  return instance;
};
