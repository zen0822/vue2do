const chalk = require('chalk')

/**
 * 启动开发环境
 *
 * configPath {string} - 配置文件路径
 */
function dev({
  config = {},
  configPath
} = {}) {
  if (!configPath && !config.root) {
    console.log(`${chalk.green('@vue2do/build')}: If configPath is empty, Param config.root is required.`)

    return process.exit(1)
  }

  return require('./script/dev')({
    projectConfig: config,
    projectConfigPath: configPath
  })
}

/**
 * 启动产品环境
 *
 * configPath {string} - 配置文件路径
 */
function prod({
  config = {},
  configPath,
  onSuccess
} = {}) {
  if (!configPath && !config.root) {
    console.log(`${chalk.green('@vue2do/build')}: If configPath is empty, Param config.root is required.`)

    return process.exit(1)
  }

  return require('./script/prod')({
    projectConfig: config,
    projectConfigPath: configPath,
    onSuccess
  })
}

/**
 * Get configuration
 *
 * configPath {string} - 配置文件路径
 */
function getConfig({
  config = {},
  configPath
} = {}) {
  if (!configPath && !config.root) {
    console.log(`${chalk.green('@vue2do/build')}: If configPath is empty, Param config.root is required.`)

    return process.exit(1)
  }

  return require('./script/getConfig')({
    projectConfig: config,
    projectConfigPath: configPath
  })
}

exports.dev = dev
exports.prod = prod
exports.getConfig = getConfig
