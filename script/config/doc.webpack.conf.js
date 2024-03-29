const path = require('path')
const merge = require('webpack-merge')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function ({
  appName,
  release
}) {
  const config = require(path.resolve(__dirname, `./index`))({
    appName
  })

  const utils = require('./../utils')({
    appName
  })

  const baseWebpackConfig = require('./base.webpack.conf')({
    appName,
    extractScss: true
  })

  const template = config.tpl ?
    path.resolve(__dirname, `${config.global.root}/${appName}/index.html`) :
    path.resolve(__dirname, `../tpl/index.html`)

  var webpackConfig = merge(baseWebpackConfig, {
    devtool: config.doc.sourceMap ? '#source-map' : false,
    output: {
      path: config.doc.assetRoot,
      publicPath: release ? '/' : config.doc.assetPublicPath,
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    module: {
      rules: [{
        test: /(grid|util)\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: true,
            cache: true,
            ie8: false,
            parallel: true,
            output: {
              comments: false,
              beautify: false
            },
            sourceMap: config.doc.sourceMap || false,
            warnings: false
          }
        })
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: config.doc.htmlName || 'index.html',
        template,
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    ]
  })

  if (config.doc.gzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${config.doc.gzipExt.join('|')})$`)
      })
    )
  }

  return webpackConfig
}
