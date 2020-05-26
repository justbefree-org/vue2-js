var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// var env = process.env.NODE_ENV === 'testing'
//   ? require('../config/test.env')
//   : config.build.env
var cssPath = '__css/[name].[contenthash].css'
var jsNamePath = '__js/[name].[chunkHash:6].js'
var jsIdPath = '__js/[id].[chunkHash:6].js'

if (config.manulConfig.multipleTestingModel && config.tagName) {
  cssPath = cssPath.replace('__', config.tagName + '/')
  jsNamePath = jsNamePath.replace('__', config.tagName + '/')
  jsIdPath = jsIdPath.replace('__', config.tagName + '/')
} else {
  cssPath = cssPath.replace('__', '')
  jsNamePath = jsNamePath.replace('__', '')
  jsIdPath = jsIdPath.replace('__', '')
}

var env = config.build[process.env.env_config+'Env']

const generateProgress = (percentage, message) => {
  const total = 60;
  let progress = 100 * percentage;
  let str = '';
  for (let i = 0; i < total; i ++) {
    if (i < Math.floor(percentage * total)) {
      str += '=';
    } else {
      str += '-';
    }
  }
  return str + '  ' + parseFloat(progress).toFixed(2) +'%' + '\n' + message + '\n';
}

const handler = (percentage, message, ...args) => {
  console.info(generateProgress(percentage, message), ...args);
}

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(jsNamePath),
    // filename: utils.assetsPath('js/[name].[chunkHash:6].js'),
    // filename: utils.assetsPath('js/[name].[hash].js'),
    // chunkFilename: utils.assetsPath('js/[id].[hash].js')
    chunkFilename: utils.assetsPath(jsIdPath)
    // chunkFilename: utils.assetsPath('js/[id].[chunkHash:6].js')
  },
  // added by just be free
  externals: {
    // lodash: '_'
  },
  // added by just be free - ends
  plugins: [
    new webpack.ProgressPlugin(handler),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath(cssPath)
      // filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      favicon: 'favicon.ico',
      inject: true,
      chunks: ['manifest', 'vendor', 'app'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
      ? 'page-was-not-found.html'
      : config.build.notfound,
      template: '404.html',
      favicon: 'favicon.ico',
      inject: true,
      chunks: ['manifest', 'vendor', 'notfound']
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new webpack.ContextReplacementPlugin( // 语言包只加载需要的需要
      /moment[/\\]locale$/,
      /en|zh-cn/
    )
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
