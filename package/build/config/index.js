const path = require('path')

module.exports = function ({
  projectConfigPath,
  projectConfig = {}
} = {}) {
  let projectPath = ''
  let projectConfigFromFile = {}

  if (projectConfigPath) {
    projectPath = path.dirname(projectConfigPath)
    projectConfigFromFile = require(projectConfigPath)
    projectConfigFromFile = projectConfigFromFile.default || projectConfigFromFile
  } else if (projectConfig.path) {
    projectPath = projectConfig.path
  } else {
    console.warn('If projectConfigPath is empty, Param projectConfig.path is required.')

    return process.exit(1)
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
      hotPort: projectConfig.hotPort || 80,
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
