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
    //       `webpack-dev-server/client?http://0.0.0.0:${config.dev.port}`,
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
      webpackLoaderOptions: {
        plugin: webpack.LoaderOptionsPlugin,
        args: [{
          debug: true
        }]
      },
      webpackHotModuleReplacement: {
        plugin: webpack.HotModuleReplacementPlugin
      },
      webpackNamedModules: {
        plugin: webpack.NamedModulesPlugin
      },
      webpackNoEmitOnErrors: {
        plugin: webpack.NoEmitOnErrorsPlugin
      },
      webpackOptimizeOccurrenceOrder: {
        plugin: webpack.optimize.OccurrenceOrderPlugin
      },
      progressBar: {
        plugin: ProgressBarPlugin,
        args: [{
          format: `build [:bar] ${chalk.green.bold(':percent')}  (:elapsed 秒)`,
          complete: '>',
          incomplete: '-',
          clear: false
        }]
      },
      html: {
        plugin: HtmlWebpackPlugin,
        args: [{
          filename: `${projectConfig.htmlName ? projectConfig.htmlName : 'index'}.html`,
          template,
          title: projectConfig.htmlTitle,
          inject: true,
          favicon: projectConfig.favicon && path.resolve(projectConfig.path, projectConfig.favicon)
        }]
      }
    },
    devServer: {
      clientLogLevel: 'info',
      disableHostCheck: true,
      hot: true,
      historyApiFallback: true,
      headers: {
        'X-Custom-Header': 'yes'
      },
      inline: true,
      proxy: config.dev.proxyTable,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      stats: 'errors-warnings'
    }
  }

  baseWebpackChain.merge(devConf)

  if (typeof projectConfig.webpack === 'function') {
    return projectConfig.webpack(baseWebpackChain)
  }

  return baseWebpackChain
}
