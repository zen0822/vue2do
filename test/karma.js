const karmaConf = require('./karma.config')

module.exports = function (config) {
  config.set({
    ...karmaConf,
    autoWatch: true,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  })
}
