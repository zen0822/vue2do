/**
 * vue2do 主题的相关操作
 *
 * @param varPath - 应用名字
 * @param appType - 应用类型，spa 单页应用，mpa 多页应用
 */

const shelljs = require('shelljs')
const inquirer = require('inquirer')
const exists = require('fs').existsSync
const path = require('path')
const ora = require('ora')
const logger = require('../lib/js/logger')

const rm = path => shelljs.rm('-rf', path)

console.log()

const buildTheme = (operation, varPath) => {
  const appSavedDir = `app/${appName}`
  const appSavedDirEmpty = !exists(appSavedDir)
}

module.exports = {
  buildTheme
}
