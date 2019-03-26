const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = function (opt = {}) {
  const appName = opt.appName

  const config = require(path.resolve(__dirname, `./index`))({
    appName
  })

  const port = process.env.PORT || config.dev.hotPort

  const baseWebpackConfig = require('./base.webpack.conf')({
    appName,
    disableExtractScss: true
  })

  const template = config.tpl ?
    path.resolve(__dirname, `${config.global.root}/${appName}/index.html`) :
    path.resolve(__dirname, `../tpl/index.html`)

  let baseEntry = {}
  baseEntry = baseWebpackConfig.entry.app.slice()
  delete baseWebpackConfig.entry

  const devConf = merge(baseWebpackConfig, {
    mode: 'development',
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    entry: {
      app: baseEntry.concat([
        `webpack-dev-server/client?http://localhost:${port}/`,
        'webpack/hot/dev-server'
      ])
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
    devtool: '#eval-source-map',
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'webpack-bundle-report.html',
        defaultSizes: 'parsed',
        openAnalyzer: false,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
      }),
      new ProgressBarPlugin({
        format: `build [:bar] ${chalk.green.bold(':percent')}  (:elapsed 秒)`,
        complete: '-',
        clear: false
      }),
      new WorkboxPlugin.InjectManifest({
        swSrc: path.resolve(__dirname, `${config.global.root}/${appName}/server/sw.js`)
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template,
        inject: true
      })
    ]
  })

  return devConf
}
