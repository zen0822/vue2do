/**
 * 构建 vue 应用
 *
 * @param projectName - 项目名字，默认是 vue-app
 * @param appName - 应用名字
 * @param appType - 应用类型，spa 单页应用，mpa 多页应用
 */

const shelljs = require('shelljs')
const inquirer = require('inquirer')
const exists = require('fs').existsSync
const path = require('path')
const ora = require('ora')
const logger = require('../lib/js/logger')

const tplPath = 'https://github.com/zen0822/vue-app.git'
const vueAppTmpDir = 'VUE2DO_APP_GIT_REPO_DIR'

const rm = path => shelljs.rm('-rf', path)

console.log()

const initProject = (projectName = 'vue-app') => {
  const projectSavedDir = path.resolve(process.cwd(), `./${projectName}`)
  const projectSavedDirEmpty = !exists(projectSavedDir)

  return new Promise((resolve, reject) => {
    inquirer.prompt([{
      type: 'confirm',
      message: projectSavedDirEmpty ?
        `Create project ${projectName} in current directory?` : `Project ${projectName} exists. Continue?`,
      name: 'ok'
    }]).then(answers => {
      if (answers.ok) {
        if (projectSavedDirEmpty) {
          const spinner = ora('downloading template. ')

          spinner.start()

          if (shelljs.exec(`git clone ${tplPath} ${projectSavedDir}`).code === 0) {
            logger.success(`Successed to download repo ${tplPath}.`)

            rm(`${projectName}/.git`)
          } else {
            logger.fatal(`Failed to download repo ${tplPath}.`)
          }

          spinner.stop()
        }

        resolve()
      }
    }).catch((error) => {
      logger.fatal(error)

      reject(new Error())
    })
  })
}

const buildApp = (projectName = 'vue-app', appName, appType) => {
  const appSavedDir = `app/${appName}`
  const appSavedDirEmpty = !exists(appSavedDir)

  console.log()

  inquirer.prompt([{
    type: 'confirm',
    message: appSavedDirEmpty ? `Create app ${appName} in current directory?` : `App ${appName} exists. Continue?`,
    name: 'ok'
  }]).then(answers => {
    if (answers.ok) {
      if (!appSavedDirEmpty) {
        rm(appSavedDir)
      }

      shelljs.mkdir('-p', appSavedDir)

      if (exists(vueAppTmpDir)) {
        rm(vueAppTmpDir)
      }

      console.log()

      if (shelljs.exec(`git clone ${tplPath} ${vueAppTmpDir}`).code === 0) {
        console.log()

        if (shelljs.cp('-r', `${vueAppTmpDir}/app/${appType}/*`, appSavedDir).code === 0) {
          logger.success(`Successed to create a ${appType} ${appName}.`)
        } else {
          logger.fatal(`Failed to create a ${appType} ${appName}.`)
        }

        rm(vueAppTmpDir)
      }
    }
  }).catch(logger.fatal)
}

module.exports = {
  initProject,
  buildApp
}
