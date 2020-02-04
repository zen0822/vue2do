/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

module.exports = function ({
  projectConfigPath
}) {
  const config = require('../config')({
    projectConfigPath
  })
  const projectConfig = config.project

  const WebpackDevServer = require('webpack-dev-server')
  const webpackConfig = process.env.NODE_ENV === 'testing' ?
    require('../config/prod.webpack.conf')({
      config
    }) :
    require('../config/dev.webpack.conf')({
      config
    })

  const port = process.env.PORT || config.dev.hotPort
  const compiler = webpack(webpackConfig.toConfig())
  let httpsOpt = false

  if (projectConfig.httpsOpt === undefined) {
    httpsOpt = false
  } else if (typeof projectConfig.httpsOpt === 'boolean') {
    httpsOpt = projectConfig.httpsOpt
  } else {
    httpsOpt = {
      key: fs.readFileSync(path.resolve(config.projectPath, projectConfig.httpsOpt.key)),
      cert: fs.readFileSync(path.resolve(config.projectPath, projectConfig.httpsOpt.cert))
    }
  }

  const server = new WebpackDevServer(compiler, {
    https: httpsOpt,
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
  })

  console.log(`Starting frontend build server listening at ${httpsOpt ? 'http' : 'https'}://localhost:${port}\n`)

  server.listen(port, function (err) {
    if (err) {
      console.log(err)

      return false
    }

    console.log(`Frontend build server listening at http://localhost:${port}\n`)
  })
}
