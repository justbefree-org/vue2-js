const dev = require("./dev");
const test = require("./test");
const release = require("./release");

module.exports = {
  dev: JSON.stringify(dev),
  test: JSON.stringify(test),
  release: JSON.stringify(release)
};
