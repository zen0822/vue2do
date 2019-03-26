/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */

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
  console.log(`Starting frontend build server listening at ${config.https ? 'http' : 'https'}://localhost:${port}\n`)

  const server = new WebpackDevServer(compiler, {
    hot: true,
    hotOnly: true,
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
  })
}
