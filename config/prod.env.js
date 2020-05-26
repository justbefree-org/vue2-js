var conf = require('../src/configuration/export')
module.exports = {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"',
  config: `${conf.release}`
}
