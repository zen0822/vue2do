import path from 'path'
import glob from 'glob'
import { Server as KarmaServer } from 'karma'
import karmaConfig from '../config/karma.config'
import { getConfig } from '@vue2do/build'
import chalk from 'chalk'

type TUnit = {
  projectConfig: {
    root?: string
  }
  projectConfigPath: string
}

export default async function ({
  projectConfig = {},
  projectConfigPath
}: TUnit): Promise<void> {
  console.log(`${chalk.green('@vue2do/test')}: starting unit testing server.`)

  let projectConfigDir = projectConfig.root || ''

  if (projectConfigPath) {
    projectConfigDir = path.dirname(projectConfigPath)

    projectConfig = {
      ...require(projectConfigPath),
      ...projectConfig
    }
  }

  const baseWebpackChain = (await getConfig({
    config: {
      root: projectConfigDir
    }
  })).base

  // babel add config
  // env: {
  //   testing: {
  //     plugins: [require.resolve('babel-plugin-istanbul')]
  //   }
  // },

  baseWebpackChain.devtool('#inline-source-map')
  baseWebpackChain.module
    .rule('istanbul_js|jsx')
    .test(/\.js$|\.jsx$/)
    .include
    .add(path.resolve('./unit/'))
    .end()
    .use('istanbul')
    .loader(require.resolve('istanbul-instrumenter-loader'))
    .end()

  const baseWebpackConfig = baseWebpackChain.toConfig()
  delete baseWebpackConfig.entry
  delete baseWebpackConfig.optimization

  const karmaServer = new KarmaServer({
    ...karmaConfig,
    files: glob.sync(path.resolve(projectConfigDir, './**/__tests__/*.test.@(js|ts)'), {
      ignore: '**/node_modules/**',
      nodir: true
    }),
    preprocessors: {
      [path.resolve(projectConfigDir, './**/__tests__/*.test.js')]: ['webpack', 'sourcemap'],
      [path.resolve(projectConfigDir, './**/__tests__/*.test.ts')]: ['webpack', 'sourcemap']
    },
    webpack: baseWebpackConfig,
    webpackMiddleware: {
      stats: 'minimal'
    },
    ...projectConfig
  } as any)

  karmaServer.start()
}
