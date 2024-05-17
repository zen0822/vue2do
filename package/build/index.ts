// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./types/index.d.ts' />
import chalk from 'chalk'

type TOpt = {
  config: any
  configPath?: string
  onSuccess?: () => void
}

type TProdOpt = TOpt & {
  clear?: boolean
}

/**
 * 启动开发环境
 *
 * configPath {string} - 配置文件路径
 */
async function dev({
  config = {},
  configPath
}: TOpt): Promise<any> {
  if (!configPath && !config.root) {
    console.log(`${chalk.green('@vue2do/build')}: If configPath is empty, Param config.root is required.`)

    return process.exit(1)
  }

  const startDev = (await import('./script/dev')).default

  return startDev({
    projectConfig: config,
    projectConfigPath: configPath
  })
}

/**
 * 启动产品环境
 *
 * configPath {string} - 配置文件路径
 */
async function prod({
  config = {},
  configPath,
  onSuccess
}: TProdOpt): Promise<any> {
  if (!configPath && !config.root) {
    console.log(`${chalk.green('@vue2do/build')}: If configPath is empty, Param config.root is required.`)

    return process.exit(1)
  }

  const startProd = (await import('./script/prod')).default

  return startProd({
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
async function getConfig({
  config = {},
  configPath
}: TOpt): Promise<any> {
  if (!configPath && !config.root) {
    console.log(`${chalk.green('@vue2do/build')}: If configPath is empty, Param config.root is required.`)

    return process.exit(1)
  }


  const startGetConfig = (await import('./script/getConfig')).default

  return startGetConfig({
    projectConfig: config,
    projectConfigPath: configPath
  })
}

export default getConfig

export {
  dev,
  prod,
  getConfig
}
