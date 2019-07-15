const shelljs = require('shelljs')

const websiteProject = './zen0822.github.io'

module.exports = function ({
  appName = 'example',
  release = false,
  ci = false
} = {}) {
  const path = require('path')
  const config = require('./config')({
    appName: appName
  })
  const ora = require('ora')
  const webpack = require('webpack')

  const webpackConfig = require('./config/doc.webpack.conf')({
    appName: appName,
    release
  })

  const spinner = ora('building for documention website...')
  spinner.start()

  const assetPath = path.join(config.doc.assetRoot, config.doc.assetSubDirectory)
  shelljs.rm('-rf', assetPath)
  shelljs.mkdir('-p', assetPath)

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

    if (release) {
      shelljs.rm('-rf', websiteProject)

      if (shelljs.exec('git clone https://github.com/zen0822/zen0822.github.io.git').code === 0) {
        shelljs.echo('Git clone zen0822.github.io success')

        shelljs.rm('-rf', `${websiteProject}/static`)
        shelljs.cp('-r', `${config.doc.assetRoot}/*`, `${websiteProject}`)
        shelljs.echo(`${assetPath} successfully copy to ${websiteProject}`)

        if (!ci) { // 不在持续集成服务器上
          // TODO: 准备解析 log 到网站分支
          // let log = shelljs.exec('git log')

          shelljs.cd('./zen0822.github.io')

          shelljs.exec('git add -A')
          shelljs.exec('git commit -m "更新文档网站"')

          shelljs.exec('git push origin master', function (code) {
            code === 0 && console.log('Success: push to zen0822.github.io')
            shelljs.cd('../')
            shelljs.rm('-rf', './zen0822.github.io')
          })
        }
      } else {
        shelljs.echo('Git clone zen0822.github.io failed')
        exit(1)
      }
    }
  })
}
