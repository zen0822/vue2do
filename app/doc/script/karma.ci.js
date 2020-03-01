const path = require('path')
const vue2doTest = require('@vue2do/test')

vue2doTest.unit({
  config: {
    singleRun: true,
    customLaunchers: {
      'Chrome_travis_ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    path: path.resolve(__dirname, '../')
  }
})
