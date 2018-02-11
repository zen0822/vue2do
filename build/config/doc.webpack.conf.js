const path = require('path')
const utils = require('./../utils')
const webpack = require('webpack')
const merge = require('webpack-merge')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (opt) {
  opt = opt || {}
  const appName = opt.appName

  const config = require('../config')
  const appConfig = require(path.resolve(__dirname, `${config.global.root}/${appName}/config.json`))
  const baseWebpackConfig = require('./base.webpack.conf')(opt)

  var env = process.env.NODE_ENV === 'testing' ?
    require('../config/test.env') :
    config.doc.env
  const template = appConfig.template ? '' : path.resolve(__dirname, `../tpl/index.html`)

  var webpackConfig = merge(baseWebpackConfig, {
    devtool: config.doc.productionSourceMap ? '#source-map' : false,
    output: {
      path: config.doc.assetsRoot,
      publicPath: config.doc.assetsPublicPath,
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': env
      }),

      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: false,
          output: {
            comments: false,
            beautify: false
          },
          compress: true,
          warnings: false
        }
      }),

      new HtmlWebpackPlugin({
        filename: process.env.NODE_ENV === 'testing' ?
          'index.html' : config.doc.index,
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

  if (config.doc.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${config.doc.productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }

  return webpackConfig
}
