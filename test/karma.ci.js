/**
 * 使用 mocha 测试框架 http://mochajs.org/
 * chai 的 测试断言框架 http://chaijs.com/api/bdd/#method_a
 */

const path = require('path')
const config = require('./config.json')
const webpackConf = require('../build/config/base.webpack.conf')(config.appName)

delete webpackConf.entry

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    captureTimeout: 120000,
    colors: true,
    frameworks: ['mocha', 'sinon-chai', 'source-map-support'],
    files: ['./entry.js'], // 这是测试入口文件
    preprocessors: {
      './entry.js': ['webpack', 'sourcemap', 'coverage']
    },
    port: 9877,
    reporters: ['spec', 'coverage'],
    singleRun: true,
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
