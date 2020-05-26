const Base64 = require("js-base64")["Base64"];
const getKey = key => {
  return Base64.encode(key);
};
class SessionStorage {
  constructor(prefix = "ykb-mobile") {
    this._prefix = prefix;
    this._version = "20190906";
    this._store = global.sessionStorage;
  }
  set(key = "", val) {
    key = this._prefix + "@" + this._version + "@" + String(key);
    this._store.setItem(getKey(key), JSON.stringify(val));
  }
  get(key) {
    key = this._prefix + "@" + this._version + "@" + String(key);
    return this._store.getItem(getKey(key));
  }
  setEvery(keyArr, valArr) {
    for (let i = 0; i < keyArr.length; i++) {
      this.set(keyArr[i], valArr[i]);
    }
  }
  clear(arr = [], isArryItem = false) {
    if (isArryItem) {
      for (let i = 0; i < arr.length; i++) {
        const key = this._prefix + "@" + this._version + "@" + String(arr[i]);
        this._store.removeItem(getKey(key));
      }
    } else {
      const key = this._prefix + "@" + this._version + "@" + String(arr);
      this._store.removeItem(getKey(key));
    }
  }
}
const store = new SessionStorage();
export default store;
