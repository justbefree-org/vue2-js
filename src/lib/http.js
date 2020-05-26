import { formData, json } from "@/lib/axios";
const qs = require("qs");
// import { getConfig } from "@/configuration";
/*
 more usage visit
 https://github.com/ljharb/qs
 可以参考https://segmentfault.com/q/1010000008698726/a-1020000008699952
 由于axios默认发送数据时是request payload，而并非我们常用的form data格式，所以发送之前需要使用qs模块对其进行处理
*/

const post = (url, params) => {
  return formData()
    .post(url, qs.stringify(params))
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(e => {
    });
};
const get = (url, params) => {
  return formData()
    .get(url + "?" + qs.stringify(params))
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(e => {
    });
};
const postJSON = (url, params) => {
  return json()
    .post(url, params)
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(e => {
    });
};
export default {
  post,
  get,
  postJSON
};
