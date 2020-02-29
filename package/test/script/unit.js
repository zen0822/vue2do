const path = require('path')
const { getConfig } = require('@vue2do/build')

module.exports = function ({
  projectConfig = {},
  projectConfigPath
}) {
  console.log(getConfig({
    config: {
      path: path.dirname(projectConfigPath)
    }
  }).base.toConfig())
}
