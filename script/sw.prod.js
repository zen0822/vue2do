const ora = require('ora')
const webpack = require('webpack')

module.exports = function ({
  appName = 'example'
} = {}) {
  const spinner = ora('building production...')
  const webpackConfig = require('./config/sw.prod.webpack.conf')({
    appName: appName
  })

  spinner.start()

  webpack(webpackConfig, function (err, stats) {
    spinner.stop()

    if (err) throw err

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  })
}
