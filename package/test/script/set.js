var fs = require('fs')
var path = require('path')
var optimist = require('optimist')
var argv = optimist.argv
var testFilePath = argv.test
var appNickName = argv.app

var testConfigPath = path.resolve(__dirname, './config.json')
var testConfig = require(testConfigPath)

Object.assign(testConfig, {
  testFilePath: typeof testFilePath === 'undefined' ? testConfig.testFilePath : testFilePath,
  appNickName: typeof appNickName === 'undefined' ? testConfig.appNickName : appNickName
})

var testConfigContent = JSON.stringify(testConfig, null, 2)

fs.writeFile(testConfigPath, testConfigContent, function (err) {
  console.log(testConfigContent)
  if (err) {
    return console.error(err)
  }
})
