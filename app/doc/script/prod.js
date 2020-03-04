const path = require('path')
const shelljs = require('shelljs')
const vue2doBuild = require('@vue2do/build')

vue2doBuild.prod({
  configPath: path.resolve(__dirname, '../project.config.js'),
  onSuccess() {
    const websiteProject = path.resolve(__dirname, '../../../zen0822.github.io')
    const projectDir = path.resolve(__dirname, '../../../')

    console.log('Release:')

    shelljs.rm('-rf', websiteProject)
    shelljs.cd(projectDir)

    if (shelljs.exec('git clone https://github.com/zen0822/zen0822.github.io.git').code === 0) {
      shelljs.echo('Git clone zen0822.github.io success.')

      shelljs.rm('-rf', `${websiteProject}/static`)
      shelljs.cp('-r', path.resolve(__dirname, '../dist/*'), `${websiteProject}`)
      shelljs.echo(`Successfully copy to ${websiteProject}.`)

      // TODO: 准备解析 log 到网站分支
      // let log = shelljs.exec('git log')

      shelljs.cd(websiteProject)

      shelljs.exec('git add -A')
      shelljs.exec('git commit -m "Update vue2do document website."')

      if (shelljs.exec('git push origin master').code === 0) {
        console.log('Success push to zen0822.github.io.')
        shelljs.rm('-rf', websiteProject)
      }
    } else {
      shelljs.echo('Git clone zen0822.github.io failed')
      shelljs.exit(1)
    }
  }
})
