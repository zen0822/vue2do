const path = require('path')

module.exports = function ({
  projectConfigPath,
  projectConfig = {}
} = {}) {
  let projectPath = ''
  let projectConfigFromFile = {}

  if (!projectConfigPath && !projectConfig.path) {
    console.warn('If projectConfigPath is empty, Param projectConfig.path is required.')

    return process.exit(1)
  }

  if (projectConfigPath) {
    projectConfigFromFile = require(projectConfigPath)
    projectConfigFromFile = projectConfigFromFile.default || projectConfigFromFile
    projectPath = projectConfigFromFile.path || path.dirname(projectConfigPath)
  }

  // 优先加载 config 的配置参数
  if (projectConfig.path) {
    projectPath = projectConfig.path
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
      path: projectPath
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
