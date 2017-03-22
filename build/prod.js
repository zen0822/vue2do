const shelljs = require('shelljs')
shelljs.env.NODE_ENV = 'production'

const websiteProject = './zen0822.github.io'

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
  shelljs.rm('-rf', assetsPath)
  shelljs.mkdir('-p', assetsPath)

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

    shelljs.rm('-rf', websiteProject)
    if (shelljs.exec('git clone https://github.com/zen0822/zen0822.github.io.git').code === 0) {
      shelljs.echo('Git clone zen0822.github.io Success')

      shelljs.rm('-rf', `${websiteProject}/static`)
      shelljs.cp('-r', `${config.build.assetsRoot}/*`, `${websiteProject}`)
      shelljs.echo(`${assetsPath} successfully copy to ${websiteProject}`)

      shelljs.cd('./zen0822.github.io')

      shelljs.exec('git add -A')
      shelljs.exec('git commit -m "更新网站"')

      shelljs.exec('git push origin master', function (code) {
        code === 0 && console.log('Success: push to zen0822.github.io')
      })

      shelljs.cd('../')
      shelljs.chmod(777, 'zen0822.github.io');
      shelljs.rm('-rf', 'zen0822.github.io')
    } else {
      shelljs.echo('Error: Git clone zen0822.github.io failed')
      exit(1)
    }
  })
}