import '../src/lib/directive/directive.js'
import path from 'path'

var config = require('./config.json')
var testEntryPath = path.resolve(__dirname, `./${config.testFilePath}`)
var testsContext = require.context('./unit/component', true, /\.test$/)

testsContext.keys().forEach(testsContext)
