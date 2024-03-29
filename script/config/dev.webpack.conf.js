const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = function (opt = {}) {
  const appName = opt.appName

  const config = require(path.resolve(__dirname, `./index`))({
    appName
  })

  const globalRoot = config.global.root
  const swPath = path.resolve(__dirname, `${globalRoot}/${appName}/dist/sw/sw.js`)

  const baseWebpackConfig = require('./base.webpack.conf')({
    appName,
    extractScss: false
  })

  const template = config.tpl ?
    path.resolve(__dirname, `${globalRoot}/${appName}/index.html`) :
    path.resolve(__dirname, `../tpl/index.html`)

  const newEntry = {
    ...baseWebpackConfig.entry,
    app: baseWebpackConfig.entry.app.slice()
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

  if (process.env.SW_ENV === 'development') {
    try {
      fs.accessSync(swPath, fs.constants.F_OK)

      devConf.plugins.push(
        new WorkboxPlugin.InjectManifest({
          swSrc: swPath,
          importWorkboxFrom: 'disabled'
        })
      )
    } catch (error) {
      console.log(`\n在应用的 dist/sw 未找到 sw.js 文件，需要先运行 npm run sw:prod 生成对应文件。\n`)
    }
  }

  return devConf
}
