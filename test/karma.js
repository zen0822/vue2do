/**
 * 使用 mocha 测试框架 http://mochajs.org/
 * chai 的 测试断言框架 http://chaijs.com/api/bdd/#method_a
 */

const path = require('path')
const config = require('./config.json')
const webpackConf = require('../script/config/base.webpack.conf')({
  appName: config.appName
})

delete webpackConf.entry

module.exports = function (config) {
  config.set({
    autoWatch: true,
    browsers: ['Chrome'], // 可以使用模拟 IE\firefox 浏览器的 PhantomJS
    captureTimeout: 120000,
    coverageReporter: {
      dir: path.join(__dirname, 'coverage'),
      reporters: [
        {
          type: 'html'
        },
        {
          type: 'lcov',
          subdir: 'lcov'
        }
      ]
    },
    colors: true,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    frameworks: ['mocha', 'sinon-chai', 'source-map-support'],
    files: ['./entry.js'],
    preprocessors: {
      './entry.js': ['webpack', 'sourcemap', 'coverage']
    },
    port: 9877,
    reporters: ['spec', 'coverage'],
    singleRun: false,
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
