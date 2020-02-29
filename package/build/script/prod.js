/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */

const webpack = require('webpack')
const ora = require('ora')
const spinner = ora('building for production...')

module.exports = function ({
  projectConfig = {},
  projectConfigPath,
  onSuccess
} = {}) {
  const config = require('../config')({
    projectConfig,
    projectConfigPath
  })
  const webpackConfig = require('../config/prod.webpack.conf')({
    config
  })

  console.log(`构建文件将保存到 ${config.prod.outDir} 目录下`)
  spinner.start()

  webpack(webpackConfig.toConfig(), function (err, stats) {
    spinner.stop()

    if (err) {
      console.error(err.stack || err)

      if (err.details) {
        console.error(err.details)
      }

      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }))

    onSuccess && onSuccess()

    return process.exit()
  })
}
