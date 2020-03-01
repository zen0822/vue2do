/**
 * 启动开发环境
 *
 * configPath {string} - 配置文件路径
 */
function unit({
  config = {},
  configPath
} = {}) {
  if (!configPath && !config.path) {
    console.warn('If configPath is empty, Param config.path is required.')

    return process.exit(1)
  }

  return require('./script/unit')({
    projectConfig: config,
    projectConfigPath: configPath
  })
}

exports.unit = unit
