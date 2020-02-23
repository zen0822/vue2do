import path = require('path')

export default async function ({
  projectConfigPath
} = { projectConfigPath: '' }): Promise<any> {
  const projectPath = path.dirname(projectConfigPath)
  let projectConfig = await import(projectConfigPath)
  projectConfig = projectConfig.default || projectConfig

  const config = {
    api: projectConfig.api,
    apiProd: projectConfig.apiProd,
    project: {
      ...projectConfig,
      path: projectPath
    },
    sw: {
      hotPort: 5169,
      assetRoot: path.resolve(projectPath, projectConfig.assetRoot, './sw'),
      assetPublicPath: '/',
      assetSubDirectory: projectConfig.staticDir,
      prodSourceMap: false
    },
    gql: {
      ...projectConfig.gql,
      port: projectConfig.gql.port || 8080,
      execute: path.resolve(projectPath, projectConfig.gql.execute, './sw')
    }
  }

  return config
}
