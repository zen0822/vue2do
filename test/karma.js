/**
 * 使用 mocha 测试框架 http://mochajs.org/
 * chai 的 测试断言框架 http://chaijs.com/api/bdd/#method_a
 */

var config = require ('./config.json')
var webpackConf = require('../build/webpack.base.conf')(config.appNickName)

delete webpackConf.entry

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'], // 可以使用模拟 IE\firefox 浏览器的 PhantomJS
    frameworks: ['mocha', 'sinon-chai', 'source-map-support'],
    reporters: ['spec', 'coverage'],
    // 这是测试入口文件
    files: ['../test/entry.js'],
    preprocessors: {
      '../test/entry.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: false,
    port: 9876,
    colors: true,
    autoWatch: true,
    captureTimeout: 6000,
    //logLevel: config.LOG_ERROR
  })
}