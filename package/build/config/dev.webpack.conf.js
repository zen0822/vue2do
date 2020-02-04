const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

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

  const devConf = {
    devtool: '#eval-source-map',
    mode: 'development',
    entry: {
      [appName]: baseEntry.concat([
        'react-hot-loader/patch'
      ])
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

  baseWebpackChain.merge(devConf)

  return baseWebpackChain
}
