/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */

import webpack from 'webpack'
import ora from 'ora'
import getConfig from '../config'
import getProdConfig from '../config/prod.webpack.conf'

type TOpt = {
  projectConfig: any
  projectConfigPath?: string
  onSuccess?: () => void
}

const spinner = ora('building for production...')

export default async function ({
  projectConfig = {},
  projectConfigPath,
  onSuccess
}: TOpt): Promise<any> {
  const config = await getConfig({
    projectConfig,
    projectConfigPath
  })
  const webpackConfig = await getProdConfig({
    config
  })

  console.log(`构建文件将保存到 ${config.prod.outDir} 目录下`)
  spinner.start()

  webpack(webpackConfig.toConfig(), function (err: any, stats) {
    spinner.stop()

    if (err) {
      console.error(err.stack || err)

      if (err.details) {
        console.error(err.details)
      }

      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }))

    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    onSuccess && onSuccess()

    return process.exit()
  })
}
