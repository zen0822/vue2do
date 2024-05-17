import { dev as buildDev, prod as buildProd } from '@vue2do/build'
import path from 'path'
import chalk from 'chalk'

type TUnit = {
  projectConfig: {
    path?: string
  }
  projectConfigPath?: string
}

async function dev({
  projectConfig = {},
  projectConfigPath = ''
}: TUnit): Promise<void> {
  console.log(`${chalk.green('@vue2do/mock')}: Starting service worker server.`)

  const configFile = await import(projectConfigPath)
  const configOpt = configFile.default ?? configFile
  const swConfig = configOpt.sw ?? {}

  buildDev({
    config: {
      ...projectConfig,
      ...swConfig,
      pure: true,
      port: swConfig.port,
      root: projectConfig.path === undefined
        ? path.dirname(projectConfigPath)
        : projectConfig.path,
      webpack(config: any): any {
        return swConfig?.webpack(config)
      }
    }
  })
}

async function prod({
  projectConfig = {},
  projectConfigPath = ''
}: TUnit): Promise<void> {
  console.log(`${chalk.green('@vue2do/mock')}: Publish service worker.`)

  const configFile = await import(projectConfigPath)
  const configOpt = configFile.default ?? configFile
  const swConfig = configOpt.sw ?? {}

  buildProd({
    config: {
      ...projectConfig,
      ...swConfig,
      pure: true,
      port: swConfig.port,
      root: projectConfig.path === undefined
        ? path.dirname(projectConfigPath)
        : projectConfig.path,
      webpack(config: any): any {
        return swConfig?.webpack(config)
      }
    }
  })
}

export {
  dev,
  prod
}
