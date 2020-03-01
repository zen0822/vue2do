const path = require('path')
const KarmaServer = require('karma').Server
const karmaConfig = require('../config/karma.config')
const { getConfig } = require('@vue2do/build')

module.exports = function ({
  projectConfig = {},
  projectConfigPath
}) {
  if (projectConfigPath) {
    projectConfig = {
      ...require(projectConfigPath),
      ...projectConfig
    }
  }

  const baseWebpackChain = getConfig({
    config: {
      path: path.dirname(projectConfigPath)
    }
  }).base

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
    karmaConfig,
    webpack: baseWebpackConfig,
    ...projectConfig
  }, () => {
    console.log(`@vue2do/test: Unit test is running.`)
  })

  karmaServer.start()
}
