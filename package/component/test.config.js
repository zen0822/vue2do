module.exports = {
  singleRun: true,
  customLaunchers: {
    'Chrome_travis_ci': {
      base: 'Chrome',
      flags: ['--no-sandbox']
    }
  }
}
