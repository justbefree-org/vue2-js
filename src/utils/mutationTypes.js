/*
 * @Author: Just be free
 * @Date:   2019-12-12 18:39:04
 * @Last Modified by:   Lizhuang
 * @Last Modified time: 2019-12-12 18:43:25
 */
export const getType = (nameSpace = "@root", type = "") => {
  return `${nameSpace}/${type}`;
};
