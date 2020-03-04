import path from 'path'
import glob from 'glob'
import { Server as KarmaServer } from 'karma'
import karmaConfig from '../config/karma.config'
import { getConfig } from '@vue2do/build'

type TUnit = {
  projectConfig: {
    path?: string
  }
  projectConfigPath: string
}

export default function ({
  projectConfig = {},
  projectConfigPath
}: TUnit): void {
  console.log('Starting test server.')
  let projectConfigDir = projectConfig.path || ''

  if (projectConfigPath) {
    projectConfigDir = path.dirname(projectConfigPath)

    projectConfig = {
      ...require(projectConfigPath),
      ...projectConfig
    }
  }

  const baseWebpackChain = getConfig({
    config: {
      path: projectConfigDir
    }
  }).base

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
    .loader('istanbul-instrumenter-loader')
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
      // '**/*.@(js|jsx|ts|tsx)': ['webpack', 'sourcemap'],
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
