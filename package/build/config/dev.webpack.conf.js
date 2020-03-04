const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const chalk = require('chalk')
const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = function ({
  config
} = {}) {
  const appName = config.project.name
  const projectConfig = config.project
  const baseWebpackChain = require('./base.webpack.conf')({
    config,
    extractScss: false,
    purgeCss: false
  })

  const template = projectConfig.tpl ?
    path.resolve(projectConfig.path, `./index.html`) :
    path.resolve(__dirname, `../tpl/index.html`)

  let baseEntry = {}

  if (projectConfig.type === 'spa') {
    baseEntry = baseWebpackChain.entryPoints.get(appName).values()
  } else {
    // Object.keys(baseWebpackConfig.entry).forEach((entryName) => {
    //   Object.assign(baseEntry, {
    //     [entryName]: baseWebpackConfig.entry[entryName].concat([
    //       `webpack-dev-server/client?http://0.0.0.0:${config.dev.hotPort}`,
    //       'webpack/hot/dev-server',
    //       'react-hot-loader/patch'
    //     ])
    //   })
    // })
  }

  const commonRule = {
    include: [
      projectConfig.path,
      path.resolve(__dirname, '../util'),
      path.resolve(__dirname, '../../component')
    ]
  }

  const devConf = {
    devtool: '#eval-source-map',
    mode: 'development',
    entry: {
      [appName]: baseEntry
    },
    module: {
      rules: {
        less: {
          ...commonRule,
          test: /(grid|util)\.scss$/,
          use: {
            style: {
              loader: 'style-loader'
            },
            css: {
              loader: 'css-loader'
            },
            postcss: {
              loader: 'postcss-loader'
            },
            sass: {
              loader: 'less-loader'
            }
          }
        }
      }
    },
    output: {
      publicPath: config.dev.assetPublicPath
    },
    optimization: {
      usedExports: true
    },
    plugin: {
      dashboard: {
        plugin: DashboardPlugin
      },
      loaderOptions: {
        plugin: webpack.LoaderOptionsPlugin,
        args: [{
          debug: true
        }]
      },
      HotModuleReplacement: {
        plugin: webpack.HotModuleReplacementPlugin
      },
      NamedModules: {
        plugin: webpack.NamedModulesPlugin
      },
      NoEmitOnErrors: {
        plugin: webpack.NoEmitOnErrorsPlugin
      },
      OccurrenceOrder: {
        plugin: webpack.optimize.OccurrenceOrderPlugin
      },
      BundleAnalyzerPlugin: {
        plugin: BundleAnalyzerPlugin,
        args: [{
          analyzerMode: 'static',
          reportFilename: 'webpack-bundle-report.html',
          defaultSizes: 'parsed',
          openAnalyzer: false,
          generateStatsFile: false,
          statsFilename: 'stats.json',
          statsOptions: null,
          logLevel: 'info'
        }]
      },
      ProgressBar: {
        plugin: ProgressBarPlugin,
        args: [{
          format: `build [:bar] ${chalk.green.bold(':percent')}  (:elapsed 秒)`,
          complete: '>',
          incomplete: '-',
          clear: false
        }]
      },
      HtmlWebpack: {
        plugin: HtmlWebpackPlugin,
        args: [{
          filename: `${projectConfig.htmlName ? projectConfig.htmlName : 'index'}.html`,
          template,
          title: projectConfig.htmlTitle,
          inject: true,
          favicon: projectConfig.favicon && path.resolve(projectConfig.path, projectConfig.favicon)
        }]
      }
    }
  }

  // if (process.env.SW_ENV === 'development') {
  //   try {
  //     fs.accessSync(swPath, fs.constants.F_OK)

  //     baseWebpackChain
  //       .plugin('WorkboxPlugin.InjectManifest')
  //       .use(WorkboxPlugin.InjectManifest, [{
  //         swSrc: swPath,
  //         importWorkboxFrom: 'disabled'
  //       }])
  //   } catch (error) {
  //     console.log(`\n在应用的 dist/sw 未找到 sw.js 文件，需要先运行 npm run sw:prod 生成对应文件。\n`)
  //   }
  // }

  baseWebpackChain.merge(devConf)

  return baseWebpackChain
}
