/**
 * 启动开发环境
 *
 * configPath {string} - 配置文件路径
 */
async function unit({
  config = {},
  configPath = ''
}: any = {}): Promise<any> {
  if (!configPath && !config.root) {
    console.warn('Param config.root is required when configPath is empty!')

    return process.exit(1)
  }

  const startUnitTest = await import('./script/unit')

  return startUnitTest.default({
    projectConfig: config,
    projectConfigPath: configPath
  })
}

export {
  unit
}
