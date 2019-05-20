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
  const webpackConfig = require('./config/sw.dev.webpack.conf')({
    appName: appName
  })

  const port = config.sw.hotPort
  const compiler = webpack(webpackConfig)

  console.log('')
  console.log(`Starting frontend build server listening at ${config.https ? 'http' : 'https'}://localhost:${port}\n`)

  const server = new WebpackDevServer(compiler, {
    compress: true,
    hot: false,
    historyApiFallback: true,
    clientLogLevel: 'info',
    watchOptions: {
      aggregateTimeout: 300,
      ignored: [/node_modules/, 'example/client/**']
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
