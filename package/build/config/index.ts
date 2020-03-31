import path from 'path'

type TOpt = {
  projectConfig: any
  projectConfigPath?: string
}

export default async function ({
  projectConfigPath,
  projectConfig = {}
}: TOpt): Promise<Record<string, any>> {
  let projectPath = ''
  let projectConfigFromFile: any = {}

  if (!projectConfigPath && !projectConfig.root) {
    console.warn('If projectConfigPath is empty, Param projectConfig.root is required.')

    return process.exit(1)
  }

  if (projectConfigPath) {
    projectConfigFromFile = await import(projectConfigPath)
    projectConfigFromFile = projectConfigFromFile.default || projectConfigFromFile
    projectPath = projectConfigFromFile.path || path.dirname(projectConfigPath)
  }

  // 优先加载 config 的配置参数
  if (projectConfig.root) {
    projectPath = projectConfig.root
  }

  projectConfig = {
    ...projectConfigFromFile,
    ...projectConfig
  }
  const mockPort = projectConfig.mockPort ? projectConfig.mockPort : 3000

  const config = {
    global: {
      root: path.resolve(__dirname, '../../../')
    },
    project: {
      ...projectConfig,
      path: projectConfigPath,
      pure: projectConfig.pure === undefined ? false : projectConfig.pure,
      root: projectPath
    },
    prod: {
      env: {
        NODE_ENV: '"production"'
      },
      outDir: path.resolve(projectPath, projectConfig.outDir || './dist'),
      assetPublicPath: projectConfig.baseUrl || './',
      staticDir: projectConfig.staticDir || './static',
      sourceMap: projectConfig.sourceMap === undefined ? '#nosources-source-map' : projectConfig.sourceMap,
      gzip: projectConfig.gzip === undefined ? false : projectConfig.gzip,
      gzipExt: ['js', 'css']
    },
    dev: {
      env: {
        NODE_ENV: '"development"'
      },
      mockPort,
      port: projectConfig.port || 80,
      assetPublicPath: '/',
      staticDir: projectConfig.staticDir || './static',
      proxyTable: {
        ...projectConfig.proxy
      },
      cssSourceMap: false
    },
    test: {
      env: {
        NODE_ENV: '"testing"'
      }
    },
    sourceMap: false
  }

  return config
}
