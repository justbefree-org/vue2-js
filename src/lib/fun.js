import clone from "lodash.clonedeep";
// 节流
export const throttle = (callback, delay = 800) => {
  return function() {
    clearTimeout(callback.id);
    callback.id = setTimeout(() => {
      callback.apply(this, arguments);
    }, delay);
  };
};
// 判断是否是对象
export const isObject = value => {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
};
// 判断是否是字符串
export const isString = value => {
  return Object.prototype.toString.call(value) === "[object String]";
};
// 判断是否为空数组，空对象，空字符串等
export const isEmpty = obj =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

// 深拷贝，简单实现
export const cloneDeep = obj => {
  return clone(obj);
};
// 去重
export const uniqBy = (arr, by) => {
  if (arr && arr.length) {
    const result = [];
    const compare = {};
    arr.forEach(item => {
      if (!compare[item[by]]) {
        compare[item[by]] = item[by];
        result.push(item);
      }
    });
    return result;
  } else {
    return [];
  }
};
// 删除数组内符合条件的元素
export const remove = (arr, callback) => {
  if (arr && arr.length) {
    arr.forEach((item, index) => {
      if (callback(item)) {
        arr.splice(index, 1);
      }
    });
    return arr;
  } else {
    return [];
  }
};
// 排序
export const sortBy = (key, positive = 1) => {
  return (a, b) =>
    a[key] > b[key] ? positive * 1 : b[key] > a[key] ? positive * -1 : 0;
};
// Grou items by key
export const groupBy = (arr, attr) => {
  if (arr && arr.length) {
    const result = {};
    arr.forEach(item => {
      if (item[attr]) {
        if (!result[item[attr]]) {
          result[item[attr]] = [];
        }
        result[item[attr]].push(item);
      }
    });
    return result;
  } else {
    return {};
  }
};
// 检查给定字符串里面是否含有某个字符串，用于检验dom元素上是否含有某个className
export const hasClass = (str = "", target = "") => {
  str = str.split(" ");
  for (let i = 0; i < str.length; i++) {
    if (str[i] === target) {
      return true;
    }
  }
  return false;
};
export const functionCollection = (arr, args) => {
  let result = false;
  if (arr.length === 0) {
    return true;
  }
  arr.forEach(item => {
    if (item(args)) {
      result = true;
    }
  });
  return result;
};
// 校验身份证是否合法
export const checkID = socialNo => {
  if (socialNo === "") {
    return false;
  }
  if (socialNo.length !== 15 && socialNo.length !== 18) {
    return false;
  }
  const area = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };
  if (area[parseInt(socialNo.substr(0, 2))] === null) {
    return false;
  }
  if (socialNo.length === 15) {
    const pattern = /^\d{15}$/;
    if (pattern.exec(socialNo) === null) {
      return false;
    }
    const birth = parseInt("19" + socialNo.substr(6, 2));
    const month = socialNo.substr(8, 2);
    const day = parseInt(socialNo.substr(10, 2));
    switch (month) {
      case "01":
      case "03":
      case "05":
      case "07":
      case "08":
      case "10":
      case "12":
        if (day > 31) {
          return false;
        }
        break;
      case "04":
      case "06":
      case "09":
      case "11":
        if (day > 30) {
          return false;
        }
        break;
      case "02":
        if ((birth % 4 === 0 && birth % 100 !== 0) || birth % 400 === 0) {
          if (day > 29) {
            return false;
          }
        } else {
          if (day > 28) {
            return false;
          }
        }
        break;
      default:
        return false;
    }
    const nowYear = new Date().getYear();
    if (nowYear - parseInt(birth) < 15 || nowYear - parseInt(birth) > 100) {
      return false;
    }
    return true;
  }
  const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
  let lSum = 0;
  let nNum = 0;
  for (let i = 0; i < 17; ++i) {
    if (socialNo.charAt(i) < "0" || socialNo.charAt(i) > "9") {
      return false;
    } else {
      nNum = socialNo.charAt(i) - "0";
    }
    lSum += nNum * Wi[i];
  }
  if (socialNo.charAt(17) === "X" || socialNo.charAt(17) === "x") {
    lSum += 10 * Wi[17];
  } else if (socialNo.charAt(17) < "0" || socialNo.charAt(17) > "9") {
    return false;
  } else {
    lSum += (socialNo.charAt(17) - "0") * Wi[17];
  }
  if (lSum % 11 === 1) {
    return true;
  } else {
    return false;
  }
};
// 身份证号码中间加星
export const encryptIDNo = idno => {
  const reg = /x$/i;
  if (idno.length === 18) {
    if (reg.test(idno)) {
      // 如果末尾是X
      return idno.replace(/^(\d{4})(\d+)(\d{3})(\D{1})$/, "$1**********$3$4");
    } else {
      return idno.replace(/^(\d{4})(\d+)(\d{4})$/, "$1**********$3");
    }
  } else {
    return idno.replace(/^(\S{2})(\S+)(\S{2})$/, "$1******$3");
  }
};
// 手机号码中间加星
export const encryptPhoneNo = no => {
  return no.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
};
export const checkCreditCardValiDate = date => {
  const reg = /^\d{2}\/\d{2}$/;
  return reg.test(date);
};
// 判断是否是微信
export const isWechat = _ => {
  const ua = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
  return ua && ua[0] === "micromessenger";
};
// 判断是否是企业微信
export const isWechatWork = _ => {
  const ua = window.navigator.userAgent.toLowerCase().match(/wxwork/i);
  return ua && ua[0] === "wxwork";
};
// 判断是否是Android
export const isAndroid = _ => {
  const ua = window.navigator.userAgent.toLowerCase().match(/android/i);
  return ua && ua[0] === "android";
};
// 判断手机号码是否符合手机号规则
export const checkMobile = mobile => {
  // 如果手机号不为空，且必须为数字验证
  const reg = /^\d+$/;
  return reg.test(mobile);
};
// 判断输入的是否是中文汉字
export const isChineseCharacters = str => {
  return /^[\u4e00-\u9fa5]+$/i.test(str);
};
// 判断输入的是否是数字
export const isNumber = num => {
  num = parseInt(num);
  return /^\d{1,}$/i.test(num);
};
export const birthdayFromat = birthday => {
  // 19950308
  return birthday.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
};
// 校验特殊字符串
export const evil = str => {
  const regen = /[`~!@#$%^&*()_+<>?:"{},./;'[\]]/im;
  const regcn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
  return regcn.test(str) && regen.test(str);
};
// 校验是否是拼音
export const isPinyin = str => {
  return /^[a-zA-Z]+$/.test(str);
};
// 校验出生年月日，格式YYYY-MM-DD,例如1995-03-08
export const isValidateBirthday = date => {
  return /^((19[2-9]\d{1})|(20((0[0-9])|(1[0-9]))))-((0?[1-9])|(1[0-2]))-((0?[1-9])|([1-2][0-9])|30|31)$/.test(
    date
  );
};
// 校验有效日期格式，格式YYYY-MM-DD,例如1995-03-08
export const isValidateExpire = date => {
  return /^((19[2-9]\d{1})|(20((19)|([2-9][0-9]))))-((0?[1-9])|(1[0-2]))-((0?[1-9])|([1-2][0-9])|30|31)$/.test(
    date
  );
};
// 修改深度树状结构的数据快速查找
export const changeDeepTreeNode = (
  arr,
  cycleNode,
  checkNode,
  key,
  value,
  fn
) => {
  arr.forEach(e => {
    e[checkNode].forEach(a => {
      if (a[key] === value) {
        fn(a);
        // 查找到元素以后立即跳出循环，减少不必要的性能开支
        return false;
      }
    });
    if (e[cycleNode]) {
      changeDeepTreeNode(e[cycleNode], cycleNode, checkNode, key, value, fn);
    }
  });
};
// 获取offset值
export const getOffsetTop = element => {
  let t = element.scrollTop;
  while (element.offsetParent) {
    element = element.offsetParent;
    t += element.scrollTop;
  }
  return t;
};
// 百度坐标转换成高德坐标
export const Baidu2AMap = (bdLng, bdLat) => {
  const PI = (Math.PI * 3000.0) / 180.0;
  const x = bdLng - 0.0065;
  const y = bdLat - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * PI);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * PI);
  return { lng: z * Math.cos(theta), lat: z * Math.sin(theta) };
};
export const replaceEmojiwithEmptyString = str => {
  if (typeof str !== "string") {
    return str;
  }
  const reg = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return str.replace(reg, "");
};
export const freeStyleLog = () => {
  console &&
    console.log(
      "%c",
      "margin: 30px; padding:30px 120px;background: url('http://www.51ykb.com/Content/themes/default/images/Logon/logo_anti.svg') no-repeat;"
    );
  console &&
    console.log(
      "%c 元年出品 %c 小样我就知道你进来偷看人家代码 - ECS2.0 vue前端组 %c",
      "background:#35495e ; font-size: 20px; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
      "background:#007aff ; padding: 1px; border-radius: 0 3px 3px 0; font-size: 20px;  color: #fff",
      "background:transparent"
    );
};
export const isMobile = () => {
  return /Android|webOS|iPhone|Windows Phone|iPod|BlackBerry/i.test(
    navigator.userAgent
  );
};
