const path = require('path')

/**
 * 启动开发环境
 *
 * configPath {string} - 配置文件路径
 */
function dev({
  configPath
} = {}) {
  require('./script/dev')({
    projectConfigPath: configPath
  })
}

/**
 * 启动产品环境
 *
 * configPath {string} - 配置文件路径
 */
function prod({
  configPath,
  onSuccess
} = {}) {
  require('./script/prod')({
    projectConfigPath: configPath,
    onSuccess
  })
}

exports = module.exports = function build() {
  return {
    dev,
    prod
  }
}

exports.dev = dev
exports.prod = prod
