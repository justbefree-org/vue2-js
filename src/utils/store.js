/*
 * @Author: Just be free
 * @Date:   2019-12-12 18:28:54
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-05-08 10:11:55
 */
import { getType } from "@/utils/mutationTypes";
const http = require("@/lib/http")["default"];
class SingleStore {
  constructor(args = {}) {
    const { moduleName } = args;
    this.moduleName = moduleName;
    this.actionName = "";
    try {
      this.API = require(`@/store/${moduleName}/index.js`)["API"];
    } catch (err) {
      this.API = {};
    }
    let _state = {};
    this.setState = (state = {}) => {
      _state = { ..._state, ...state };
    };
    this.getState = () => {
      return _state;
    };
    let _mutation = {};
    this.setMutation = callback => {
      _mutation = {
        [getType(this.moduleName, this.actionName)](state, payload) {
          callback({ state, payload });
        }
      };
    };
    this.getMutation = () => {
      return _mutation;
    };
    const _action = {};
    this.setAction = (actionName, async, method) => {
      this.actionName = actionName;
      _action[actionName] = ({ commit, state }, args) => {
        if (async) {
          const { params } = args;
          return http[method](this.API[actionName], params).then(res => {
            commit(getType(this.moduleName, actionName), { ...args, res });
          });
        } else {
          commit(getType(this.moduleName, actionName), { ...args });
        }
      };
    };
    this.getAction = () => {
      return _action;
    };
    const _getters = {};
    this.setGetter = (getterName, callback) => {
      _getters[getterName] = (state, getters, rootState, rootGetters) => {
        return callback({ state, getters, rootState, rootGetters });
      };
    };
    this.getGetter = () => {
      return _getters;
    };
  }
  register(args = {}) {
    const { state } = args;
    this.setState(state);
    return this;
  }
  action(args = {}) {
    const { actionName, async = true, method = "get" } = args;
    this.setAction(actionName, async, method);
    return this;
  }
  mutation(callback) {
    this.setMutation(callback);
    return this;
  }
  getters(args = {}) {
    const { getterName, callback } = args;
    this.setGetter(getterName, callback);
    return this;
  }
}
export default SingleStore;
