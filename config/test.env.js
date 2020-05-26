var merge = require('webpack-merge')
var devEnv = require('./dev.env')
var conf = require('../src/configuration/export')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  ENV_CONFIG: '"test"',
  config: `${conf.test}`
})
