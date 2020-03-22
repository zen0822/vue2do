const path = require('path')
const { unit } = require('@vue2do/test')

unit({
  config: {
    singleRun: true,
    customLaunchers: {
      'Chrome_travis_ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    root: path.resolve(__dirname, '../')
  }
})
