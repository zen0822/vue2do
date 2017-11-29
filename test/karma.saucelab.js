const path = require('path')
const config = require('./config.json')
const webpackConf = require('../build/config/base.webpack.conf')(config.appName)
const customLaunchers = require('./launcher.sauceLab.json')

delete webpackConf.entry

module.exports = function (config) {
  process.env.SAUCE_USERNAME = 'zen_n'
  process.env.SAUCE_ACCESS_KEY = 'ab082b18-8c48-4378-be1a-2f85059acc71'

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
    process.exit(1)
  }

  config.set({
    basePath: '',
    browsers: Object.keys(customLaunchers),
    captureTimeout: 120000,
    colors: true,
    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [{
          type: 'html'
        },
        {
          type: 'lcov',
          subdir: 'lcov'
        }
      ]
    },
    customLaunchers,
    frameworks: ['mocha', 'sinon-chai', 'source-map-support'],
    files: ['./entry.js'], // 这是测试入口文件
    preprocessors: {
      './entry.js': ['webpack', 'sourcemap', 'coverage']
    },
    reporters: ['spec', 'coverage', 'saucelabs'],
    singleRun: true,
    sauceLabs: {
      testName: 'vue2do test',
      recordScreenshots: false,
      connectOptions: {
        port: 5757,
        logfile: 'sauce_connect.log'
      },
      public: 'public'
    },
    // Increase timeout in case connection in CI is slow
    webpack: webpackConf,
    webpackMiddleware: {
      stats: 'errors-only'
    }
  })
}
