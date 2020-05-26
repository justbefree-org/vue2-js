/*
 * @Author: Just be free
 * @Date:   2020-02-10 17:53:33
 * @Last Modified by:   Just be free
 * @Last Modified time: 2020-02-11 21:54:39
 */
import { isObject, isString } from "@/lib/fun";
import { print } from "@/lib/console";
const getKey = (obj, cb) => {
  if (isString(obj)) {
    return obj;
  } else if (isObject(obj)) {
    if (obj.name && isString(obj.name)) {
      if (cb && typeof cb === "function") {
        cb(obj);
      }
      return obj.name;
    } else {
      throw new Error("The object should contain name attribute");
    }
  } else {
    throw new Error(
      "arguments error, the first argument must be a String or an Object"
    );
  }
};
class Notifier {
  constructor(args = { replace: false }) {
    this.replaceModel = args.replace;
    this.messages = {};
  }
  subscribe(event, fn, singleFunction = true) {
    const key = getKey(event, obj => {
      print("注册指令：", obj.describe);
    });
    if (this.replaceModel) {
      this.messages[key] = [fn];
    } else {
      (this.messages[key] || (this.messages[key] = [])).push(fn);
    }
    return this;
  }
  unsubscribe(event, fn) {
    const key = getKey(event);
    const fns = this.messages[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      let callback;
      for (let i = 0, len = fns.length; i < len; i++) {
        callback = fns[i];
        if (callback === fn || callback.fn === fn) {
          fns.splice(i, 1);
          break;
        }
      }
    }
    return this;
  }
  publish() {
    const event = [].shift.call(arguments);
    const key = getKey(event, obj => {
      print("指令发出：", obj.describe);
    });
    const fns = [...this.messages[key]];
    if (!fns || fns.length === 0) {
      return false;
    }
    fns.forEach(fn => {
      fn.apply(this, arguments);
    });
    return this;
  }
  once(event, fn) {
    const that = this;
    function on() {
      that.unsubscribe(event, on);
      fn.apply(that, arguments);
    }
    on.fn = fn;
    this.subscribe(event, on);
    return this;
  }
}

export default Notifier;
