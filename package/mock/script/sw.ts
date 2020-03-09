import { dev as buildDev, prod as buildProd } from '@vue2do/build'
import path from 'path'

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
  const configOpt = await import(projectConfigPath)
  console.log('@vue2do/mock: Starting service worker server.')

  buildDev({
    config: {
      ...projectConfig,
      path: path.dirname(projectConfigPath),
      webpack(config: any): any {
        return configOpt?.sw?.webpack(config)
      }
    }
  })
}

function prod({
  projectConfig = {}
}: TUnit): void {
  console.log('Publish service worker.')

  buildProd({
    config: {
      ...projectConfig,
      webpack(config: any): any {
        return config
      }
    }
  })
}

export {
  dev,
  prod
}
