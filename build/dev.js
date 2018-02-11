/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./config')
const proxyMiddleware = require('http-proxy-middleware')
const WebpackDevServer = require('webpack-dev-server')

module.exports = function ({
  appName = 'example'
} = {}) {
  const webpackConfig = process.env.NODE_ENV === 'testing' ?
    require('./config/prod.webpack.conf')({
      appName: appName
    }) :
    require('./config/dev.webpack.conf')({
      appName: appName
    })

  const port = process.env.PORT || config.dev.port
  const proxyTable = config.dev.proxyTable
  const compiler = webpack(webpackConfig)

  const server = new WebpackDevServer(compiler, {
    hot: true,

    historyApiFallback: true,

    proxy: config.dev.proxyTable,

    clientLogLevel: 'info',

    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },

    publicPath: webpackConfig.output.publicPath,

    headers: {
      'X-Custom-Header': 'yes'
    },

    stats: {
      colors: true
    },

    inline: true,

    disableHostCheck: true
  })

  server.listen(port, function (err) {
    if (err) {
      console.log(err)

      return false
    }
    console.log(`Listening at http://localhost:${port}\n`)
  })
}
