// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

module.exports = function ({ appName }) {
  const path = require('path')
  const config = require('./config')
  const ora = require('ora')
  const webpack = require('webpack')

  const webpackConfig = require('./config/prod.webpack.conf')({
    appName: appName
  })

  var spinner = ora('building for production...')
  spinner.start()

  var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
  rm('-rf', assetsPath)
  mkdir('-p', assetsPath)
  cp('-R', './static/', assetsPath)

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

  if (shell.exec('git push origin master').code !== 0) {
    shell.echo('Error: Git push failed');
    shell.exit(1);
  }
}