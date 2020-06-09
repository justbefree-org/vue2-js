const Base64 = require("js-base64")["Base64"];
if (!global.localStorage) {
  const Fn = () => {
    const aKeys = [];
    const oStorage = {};
    Object.defineProperty(oStorage, "getItem", {
      value: function(sKey) {
        return sKey ? this[sKey] : null;
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "key", {
      value: function(nKeyId) {
        return aKeys[nKeyId];
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "setItem", {
      value: function(sKey, sValue) {
        if (!sKey) {
          return;
        }
        document.cookie =
          escape(sKey) +
          "=" +
          escape(sValue) +
          "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "length", {
      get: function() {
        return aKeys.length;
      },
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "removeItem", {
      value: function(sKey) {
        if (!sKey) {
          return;
        }
        document.cookie =
          escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    this.get = function() {
      let iThisIndx;
      for (const sKey in oStorage) {
        iThisIndx = aKeys.indexOf(sKey);
        if (iThisIndx === -1) {
          oStorage.setItem(sKey, oStorage[sKey]);
        } else {
          aKeys.splice(iThisIndx, 1);
        }
        delete oStorage[sKey];
      }
      for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) {
        oStorage.removeItem(aKeys[0]);
      }
      for (
        let aCouple,
          iKey,
          nIdx = 0,
          aCouples = document.cookie.split(/\s*;\s*/);
        nIdx < aCouples.length;
        nIdx++
      ) {
        aCouple = aCouples[nIdx].split(/\s*=\s*/);
        if (aCouple.length > 1) {
          oStorage[(iKey = unescape(aCouple[0]))] = unescape(aCouple[1]);
          aKeys.push(iKey);
        }
      }
      return oStorage;
    };
    this.configurable = false;
    this.enumerable = true;
  };
  Object.defineProperty(global, "localStorage", new Fn());
}
const getKey = key => {
  return Base64.encode(key);
};
class LocalStorage {
  constructor(prefix = "mobile") {
    this._prefix = prefix;
    this._version = "20190906";
    this._store = global.localStorage;
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
const store = new LocalStorage();
export default store;
