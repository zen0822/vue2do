/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */
import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import getConfig from '../config'
import WebpackDevServer from 'webpack-dev-server'

type TOpt = {
  projectConfig: any
  projectConfigPath?: string
  onSuccess?: () => void
}

export default async function ({
  projectConfig = {},
  projectConfigPath = ''
}: TOpt): Promise<any> {
  const config = await getConfig({
    projectConfig,
    projectConfigPath
  })

  projectConfig = config.project

  const getWebpackChain = process.env.NODE_ENV === 'testing' ?
    (await import('../config/prod.webpack.conf')).default :
    (await import('../config/dev.webpack.conf')).default

  const webpackChain = getWebpackChain({
    config
  })

  const port = process.env.PORT || config.dev.port
  const webpackConfig = webpackChain.toConfig()
  const compiler: any = webpack(webpackConfig)
  let httpsOpt: boolean | { key: any, cert: any } = false

  if (projectConfig.httpsOpt === undefined) {
    httpsOpt = false
  } else if (typeof projectConfig.httpsOpt === 'boolean') {
    httpsOpt = projectConfig.httpsOpt
  } else {
    httpsOpt = {
      key: fs.readFileSync(path.resolve(config.projectPath, projectConfig.httpsOpt.key)),
      cert: fs.readFileSync(path.resolve(config.projectPath, projectConfig.httpsOpt.cert))
    }
  }

  const httpName = port === 443
    ? 'https'
    : httpsOpt ? 'https' : 'http'

  const server = new WebpackDevServer(compiler, {
    ...webpackConfig.devServer,
    https: httpsOpt
  })

  console.log(`Starting frontend build server listening at ${httpName}://localhost:${port}\n`)

  server.listen(port, function (err: any) {
    if (err) {
      console.log(err)

      return false
    }

    console.log(`Frontend build server listening at ${httpName}://localhost:${port}\n`)
  })
}
