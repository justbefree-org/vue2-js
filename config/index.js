// see http://vuejs-templates.github.io/webpack for documentation.
var fs = require('fs')
var path = require('path')
var manulConfig = require('./manul.config.js')
var tagName
try {
  tagName = fs.readFileSync('./build/tag.tmp', 'utf-8')
} catch (err) {
  console.log('Skiped')
}
var customeConfig = {}
try {
  customeConfig = require('./rewrite.js')
} catch (err) {
  console.log('自定义配置文件不存在')
}
var indexPath = '../dist__/index.html'
var notfoundPath = '../dist__/page-was-not-found.html'
var assetRootPath = '../dist__'
if (manulConfig.multipleTestingModel && tagName) {
  indexPath = indexPath.replace('__', '/' + tagName)
  notfoundPath = notfoundPath.replace('__', '/' + tagName)
  assetRootPath = assetRootPath.replace('__', '/' + tagName)
} else {
  indexPath = indexPath.replace('__', '')
  notfoundPath = notfoundPath.replace('__', '')
  assetRootPath = assetRootPath.replace('__', '')
}
module.exports = {
  manulConfig,
  tagName,
  build: {
    // env: require('./prod.env'),
    devEnv: require('./dev.env'),
    prodEnv: require('./prod.env'),
    testEnv: require('./test.env'),
    index: path.resolve(__dirname, indexPath),
    notfound: path.resolve(__dirname, notfoundPath),
    assetsRoot: path.resolve(__dirname, assetRootPath),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 12025,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      ...customeConfig
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
