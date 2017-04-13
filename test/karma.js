/**
 * 使用 mocha 测试框架 http://mochajs.org/
 * chai 的 测试断言框架 http://chaijs.com/api/bdd/#method_a
 */

const path = require('path')
var config = require('./config.json')
var webpackConf = require('../build/config/base.webpack.conf')(config.appName)

delete webpackConf.entry

const customLaunchers = {
  // pc
  slChrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7'
  },
  slFirefox: {
    base: 'SauceLabs',
    browserName: 'firefox'
  },
  // ie family
  slIE11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  },
  slIE10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8',
    version: '10'
  },
  slIE9: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '9'
  },
  // mac safari
  slMacSafari: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.10'
  },
  // mobile
  slIosSafari: {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '9.1'
  },
  slAndroid: {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'Linux',
    version: '4.3'
  }
}

var customLaunchers2 = {
  'SL_Chrome': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: '48.0',
    platform: 'Linux'
  },
  'SL_Firefox': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '50.0',
    platform: 'Windows 10'
  },
  'SL_InternetExplorer': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '11.0',
    platform: 'Windows 7'
  },
  'SL_Safari': {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.11',
    version: '10.0'
  }
}

// 要先启动 sauce connect
// if (!process.env.SAUCE_USERNAME) {
//   process.env.SAUCE_USERNAME = 'zen_n'
//   process.env.SAUCE_ACCESS_KEY = 'ab082b18-8c48-4378-be1a-2f85059acc71'
// }

module.exports = function (config) {
  config.set({
    autoWatch: true,
    browsers: Object.keys(customLaunchers2), // 可以使用模拟 IE\firefox 浏览器的 PhantomJS
    captureTimeout: 6000,
    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [
        { type: 'html' },
        { type: 'lcov', subdir: 'lcov' }  // lcov
      ]
    },
    colors: true,
    customLaunchers: customLaunchers2,
    frameworks: ['mocha', 'sinon-chai', 'source-map-support'],
    reporters: ['spec', 'coverage'],
    files: ['./entry.js'],// 这是测试入口文件
    preprocessors: {
      './entry.js': ['webpack', 'sourcemap']
    },
    port: 9876,
    singleRun: false,
    sauceLabs: {
      accessKey: 'ab082b18-8c48-4378-be1a-2f85059acc71',
      build: '0822',
      public: 'public',
      testName: 'Karma and Sauce Labs demo',
      username: 'zen_n'
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    }
    //logLevel: config.LOG_ERROR
  })
}