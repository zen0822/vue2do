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
      // http://vuejs.github.io/vue-loader/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': env
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].[contenthash].css')
      }),
      // generate dist index.html with correct asset hash for caching.
      // you can customize output by editing /index.html
      // see https://github.com/ampedandwired/html-webpack-plugin
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
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
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
