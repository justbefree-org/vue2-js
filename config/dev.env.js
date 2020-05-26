var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var conf = require('../src/configuration/export')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  config: `${conf.dev}`
})
