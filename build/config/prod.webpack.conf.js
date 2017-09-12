module.exports = function (opt) {
  opt = opt || {};
  const appName = opt.appName

  var path = require('path')
  var utils = require('./../utils')
  var webpack = require('webpack')
  var merge = require('webpack-merge')

  var ExtractTextPlugin = require('extract-text-webpack-plugin')
  var HtmlWebpackPlugin = require('html-webpack-plugin')

  var config = require('../config')
  const appConfig = require(path.resolve(__dirname, `${config.global.root}/${appName}/config.json`))
  var baseWebpackConfig = require('./base.webpack.conf')(opt)

  var env = process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : config.build.env
  const template = appConfig.template ? '' : path.resolve(__dirname, `../tpl/index.html`)

  var webpackConfig = merge(baseWebpackConfig, {
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
      path: config.build.assetsRoot,
      publicPath: config.build.assetsPublicPath,
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': env
      }),

      new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].[contenthash].css')
      }),

      new HtmlWebpackPlugin({
        filename: process.env.NODE_ENV === 'testing'
          ? 'index.html'
          : config.build.index,
        template,
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, '../node_modules')
            ) === 0
          )
        }
      }),

      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
        chunks: ['vendor']
      })
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

  return webpackConfig
}
