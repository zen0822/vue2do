var path = require ('path')
var config = require ('./config.json')
var testEntryPath = path.resolve(__dirname, `./${config.testFilePath}`)
var testsContext = require.context('./appBackend/configPush', true, /\.test$/)

testsContext.keys().forEach(testsContext)
