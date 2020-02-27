const path = require('path')
const vue2doBuild = require('@vue2do/build')

vue2doBuild.prod({
  configPath: path.resolve(__dirname, '../project.config.js'),
  onSuccess() {
    console.log('打包成功')
  }
})
