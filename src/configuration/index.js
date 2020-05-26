export const getConfig = (attr = "") => {
  try {
    const value = process.env.config[attr];
    if (value) {
      return value;
    } else {
      console.log(`没找到"${attr}"的配置信息`);
      return "";
    }
  } catch (e) {
    console.log("配置文件读取错误");
    return "";
  }
};

const logEnverniment = () => {
  console &&
    console.log(
      `%c ${getConfig("des")} %c`,
      "background: #EA4949; font-size: 30px; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
      "background:#007aff ; padding: 1px; border-radius: 0 3px 3px 0; font-size: 20px;  color: #fff"
    );
};
const logVersion = () => {
  console &&
    console.log(
      `%c ${getConfig("version")} %c`,
      "background: green; font-size: 20px; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
      "background:#007aff ; padding: 1px; border-radius: 0 3px 3px 0; font-size: 20px;  color: #fff"
    );
};
export const getEnvironment = () => {
  return process.env.NODE_ENV;
};
export const log = () => {
  logEnverniment();
  logVersion();
};
