import 'core-js'
import '../src/lib/directive/directive.js'
import path from 'path'

var testsContext = require.context('./unit', true, /\.test$/)
// var testsContext = require.context('../', true, /(\/__tests__\/.*|(\\.|\/)(test|spec))\\.(jsx?|tsx?)$/)

testsContext.keys().forEach(testsContext)
