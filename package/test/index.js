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
    console.warn('Param config.path is required when configPath is empty!')

    return process.exit(1)
  }

  return require('./tsDist/script/unit').default({
    projectConfig: config,
    projectConfigPath: configPath
  })
}

exports.unit = unit
