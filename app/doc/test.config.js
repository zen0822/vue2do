module.exports = {
  autoWatch: true,
  customLaunchers: {
    'Chrome_travis_ci': {
      base: 'Chrome',
      flags: ['--no-sandbox']
    }
  }
}
