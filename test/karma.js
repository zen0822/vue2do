/**
 * 使用 mocha 测试框架 http://mochajs.org/
 * chai 的 测试断言框架 http://chaijs.com/api/bdd/#method_a
 */

const path = require('path')
const config = require('./config.json')
const webpackConf = require('../build/config/base.webpack.conf')(config.appName)

delete webpackConf.entry

// https://saucelabs.com/platforms 里面有各种浏览器型号
const customLaunchers = {
  // sl_chrome: {
  //   base: 'SauceLabs',
  //   browserName: 'chrome',
  //   platform: 'Windows 7',
  //   version: '35'
  // },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '30'
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  },
  // 'SL_Safari': {
  //   base: 'SauceLabs',
  //   browserName: 'safari',
  //   platform: 'OS X 10.11',
  //   version: '10.0'
  // }
}

if (!process.env.SAUCE_USERNAME) {
  process.env.SAUCE_USERNAME = 'zen_n'
  process.env.SAUCE_ACCESS_KEY = 'ab082b18-8c48-4378-be1a-2f85059acc71'
}

module.exports = function (config) {
  config.set({
    autoWatch: true,
    browsers:  ['Chrome'], // 可以使用模拟 IE\firefox 浏览器的 PhantomJS
    captureTimeout: 120000,
    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [
        { type: 'html' },
        { type: 'lcov', subdir: 'lcov' } // lcov
      ]
    },
    colors: true,
    customLaunchers,
    frameworks: ['mocha', 'sinon-chai', 'source-map-support'],
    files: [
      './entry.js', // 这是测试入口文件
      '../src/component/**/*.js' // 这是需要计算代码覆盖率的文件
    ],
    preprocessors: {
      './entry.js': ['webpack', 'sourcemap'],
      '../src/component/**/*.js' : ['webpack', 'sourcemap', 'coverage']
    },
    port: 9877,
    reporters: ['spec', 'coverage'],
    singleRun: false,
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    }
    // logLevel: config.LOG_ERROR
  })
}