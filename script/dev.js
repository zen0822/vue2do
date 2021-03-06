/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */

const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

module.exports = function ({
  appName = 'example'
} = {}) {
  const config = require('./config')({
    appName: appName
  })

  const webpackConfig = require('./config/dev.webpack.conf')({
    appName: appName
  })

  const port = process.env.PORT || config.dev.hotPort
  const compiler = webpack(webpackConfig)

  console.log('')
  console.log(`Starting frontend build server listening at ${config.https ? 'https' : 'http'}://localhost:${port}\n`)

  const server = new WebpackDevServer(compiler, {
    compress: true,
    hot: true,
    historyApiFallback: true,
    https: config.https,
    proxy: config.dev.proxyTable,
    quiet: true,
    clientLogLevel: 'info',
    watchOptions: {
      aggregateTimeout: 300,
      ignored: [/node_modules/]
    },
    watchContentBase: process.env.SW_ENV === 'development',
    contentBase: [path.resolve(config.prod.assetRoot)],
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
  })
}
