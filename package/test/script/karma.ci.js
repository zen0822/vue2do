const karmaConf = require('./karma.config')

module.exports = function (config) {
  config.set({
    ...karmaConf,
    singleRun: true,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  })
}
