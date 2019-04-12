/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */

const fs = require('fs')
const url = require('url')
const path = require('path')
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
  const releaseDir = webpackConfig.output.path

  console.log('')
  console.log(`Starting frontend build server listening at ${config.https ? 'http' : 'https'}://localhost:${port}\n`)

  const server = new WebpackDevServer(compiler, {
    compress: true,
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
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
    disableHostCheck: true,
    after: (app) => {
      // 监听文件请求，并查找对应文件进行响应
      app.get('*.*', (req, res) => {
        const urlJson = url.URL(req.url, true)
        const pathname = urlJson['pathname']
        const filePath = path.join(releaseDir, pathname)

        fs.readFile(filePath, (error, fileData) => {
          if (error) {
            return false
          }

          res.end(fileData)
        })
      })
    }
  })

  server.listen(port, function (err) {
    if (err) {
      console.log(err)

      return false
    }
  })
}
