const path = require('path')
const config = require('./config.json')
const webpackConf = require('../build/config/base.webpack.conf')(config.appName)

delete webpackConf.entry
module.exports = function (config) {
  process.env.SAUCE_USERNAME = 'zen_n'
  process.env.SAUCE_ACCESS_KEY = 'ab082b18-8c48-4378-be1a-2f85059acc71'

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
    process.exit(1)
  }


  const customLaunchers = {
    sl_chrome_36: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '36'
    },
    sl_chrome_46: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '46'
    },
    sl_chrome_56: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 10',
      version: '56'
    },
    sl_firefox_30: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '30'
    },
    sl_firefox_50: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '50'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 10',
      version: '11'
    },
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8',
      version: '10'
    },
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },
    sl_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.11',
      version: '10.0'
    },
    sl_android: {
      base: 'SauceLabs',
      browserName: 'android',
      platform: 'Linux',
      version: '4.3'
    }
  }

  config.set({
    basePath: '',
    browsers: Object.keys(customLaunchers),
    captureTimeout: 120000,
    colors: true,
    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [
        { type: 'html' },
        { type: 'lcov', subdir: 'lcov' }  // lcov
      ]
    },
    customLaunchers,
    frameworks: ['mocha', 'sinon-chai', 'source-map-support'],
    files: ['./entry.js'],// 这是测试入口文件
    port: 9876,
    preprocessors: {
      './entry.js': ['webpack', 'sourcemap']
    },
    reporters: ['coverage', 'saucelabs'],
    singleRun: true,
    sauceLabs: {
      testName: 'Karma and Sauce Labs demo',
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
      noInfo: true
    }
  })
}