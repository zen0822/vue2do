/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

module.exports = function ({
  projectConfig = {},
  projectConfigPath
} = {}) {
  const config = require('../config')({
    projectConfig,
    projectConfigPath
  })

  projectConfig = config.project

  const WebpackDevServer = require('webpack-dev-server')
  const webpackChain = process.env.NODE_ENV === 'testing' ?
    require('../config/prod.webpack.conf')({
      config
    }) :
    require('../config/dev.webpack.conf')({
      config
    })

  const port = process.env.PORT || config.dev.port
  const webpackConfig = webpackChain.toConfig()
  const compiler = webpack(webpackConfig)
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

  const httpName = port === 443
    ? 'https'
    : httpsOpt ? 'https' : 'http'

  const server = new WebpackDevServer(compiler, {
    ...webpackConfig.devServer,
    https: httpsOpt
  })

  console.log(`Starting frontend build server listening at ${httpName}://localhost:${port}\n`)

  server.listen(port, function (err) {
    if (err) {
      console.log(err)

      return false
    }

    console.log(`Frontend build server listening at ${httpName}://localhost:${port}\n`)
  })
}
