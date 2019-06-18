const path = require('path')
const fs = require('fs')
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
  const globalRoot = config.global.root
  const swPath = path.resolve(__dirname, `${globalRoot}/${appName}/dist/sw/sw.js`)

  const baseWebpackConfig = require('./base.webpack.conf')({
    appName,
    disableExtractScss: true
  })

  const template = config.tpl ?
    path.resolve(__dirname, `${globalRoot}/${appName}/index.html`) :
    path.resolve(__dirname, `../tpl/index.html`)

  let newEntry = {
    ...baseWebpackConfig.entry,
    app: baseWebpackConfig.entry.app.slice().concat([
      `webpack-dev-server/client?http://localhost:${port}/`,
      'webpack/hot/dev-server'
    ])
  }

  delete baseWebpackConfig.entry

  const devConf = merge(baseWebpackConfig, {
    mode: 'development',
    optimization: {
      usedExports: true
    },
    entry: newEntry,
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
        complete: '>',
        incomplete: '-',
        clear: false
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

  try {
    fs.accessSync(swPath, fs.constants.F_OK)

    devConf.plugins.push(
      new WorkboxPlugin.InjectManifest({
        swSrc: swPath,
        importWorkboxFrom: 'disabled'
      })
    )
  } catch (error) {
    console.log(`\n在应用的 dist/sw 未找到 sw.js 文件，需要先运行 npm run mock 生成对应文件。\n`)
  }

  return devConf
}
