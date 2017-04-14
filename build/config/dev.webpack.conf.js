module.exports = function (opt = {}) {
  const path = require('path')
  const webpack = require('webpack')
  const merge = require('webpack-merge')
  const appName = opt.appName

  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const DashboardPlugin = require('webpack-dashboard/plugin');

  const config = require(path.resolve(__dirname, `./index`))
  const appConfig = require(path.resolve(__dirname, `${config.global.root}/${appName}/config.json`))
  const utils = require(path.resolve(__dirname, `./../utils`))
  const port = process.env.PORT || config.dev.port

  const baseWebpackConfig = require('./base.webpack.conf')({
    appName: appName
  })
  const template = appConfig.template ? '' : path.resolve(__dirname, `../tpl/index.html`)

  let baseEntryApp = baseWebpackConfig.entry.app.slice()
  delete baseWebpackConfig.entry

  const devConf = merge(baseWebpackConfig, {
    entry: {
      app: baseEntryApp.concat([
        `webpack-dev-server/client?http://localhost:${port}/`,
        'webpack/hot/dev-server'
      ])
    },

    devtool: '#eval-source-map',

    plugins: [
      new DashboardPlugin(),

      new webpack.LoaderOptionsPlugin({
        debug: true
      }),

      // nodejs 的全局变量混入到 javascript 中
      new webpack.DefinePlugin({
        'process.env': config.dev.env
      }),

      new webpack.HotModuleReplacementPlugin(),

      new webpack.NamedModulesPlugin(),

      new webpack.NoEmitOnErrorsPlugin(),

      new webpack.optimize.OccurrenceOrderPlugin(),

      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),

      new HtmlWebpackPlugin({
        filename: 'index.html',
        template,
        inject: true
      })
    ]
  })

  return devConf
}
