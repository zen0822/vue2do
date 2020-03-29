const path = require('path')
const vue2doBuild = require('@vue2do/build')

vue2doBuild.dev({
  configPath: path.resolve(__dirname, '../project.config.js')
})
