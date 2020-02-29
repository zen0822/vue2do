/**
 * Get configuration
 */
module.exports = function ({
  projectConfig = {},
  projectConfigPath
} = {}) {
  const config = require('../config')({
    projectConfig,
    projectConfigPath
  })
  const baseWebpackChain = require('../config/base.webpack.conf')({
    config
  })
  const devWebpackChain = require('../config/dev.webpack.conf')({
    config
  })
  const prodWebpackChain = require('../config/prod.webpack.conf')({
    config
  })

  return {
    base: baseWebpackChain,
    dev: devWebpackChain,
    prod: prodWebpackChain
  }
}
