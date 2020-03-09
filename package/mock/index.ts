/**
 * Start GraphQL server
 *
 * configPath {string} - 配置文件路径
 */
async function gql({
  configPath = ''
} = {}): Promise<void> {
  const startGQL = await import('./script/gql')

  return startGQL.default({
    projectConfigPath: configPath
  })
}

/**
 * Start service worker server
 *
 * configPath {string} - 配置文件路径
 */
async function sw({
  config = {},
  configPath = ''
}: any = {}): Promise<void> {
  if (!configPath && !config.path) {
    console.warn('@vue2do/mock: If configPath is empty, Param config.path is required.')

    return process.exit(1)
  }

  const { dev: swDev } = await import('./script/sw')

  return swDev({
    projectConfig: config
  })
}

export {
  gql,
  sw
}
