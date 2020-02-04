const path = require('path')

module.exports = function ({
  projectConfigPath
} = {}) {
  const projectPath = path.dirname(projectConfigPath)
  let projectConfig = require(projectConfigPath)
  projectConfig = projectConfig.default || projectConfig

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
      outDir: path.resolve(projectPath, projectConfig.outDir),
      assetPublicPath: projectConfig.baseUrl,
      staticDir: projectConfig.staticDir,
      sourceMap: projectConfig.sourceMap === undefined ? '#nosources-source-map' : projectConfig.sourceMap,
      gzip: projectConfig.gzip,
      gzipExt: ['js', 'css']
    },
    dev: {
      env: {
        NODE_ENV: '"development"'
      },
      mockPort,
      hotPort: projectConfig.hotPort,
      assetPublicPath: '/',
      staticDir: projectConfig.staticDir,
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
