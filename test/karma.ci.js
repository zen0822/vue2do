/**
 * 使用 mocha 测试框架 http://mochajs.org/
 * chai 的 测试断言框架 http://chaijs.com/api/bdd/#method_a
 */

const path = require('path')
const config = require('./config.json')
const merge = require('webpack-merge')
const webpackBaseConf = require('../script/config/base.webpack.conf')({
  appName: config.appName
})

const webpackConf = merge(webpackBaseConf, {
  module: {
    rules: [{
      test: /\.js$|\.jsx$/,
      use: {
        loader: 'istanbul-instrumenter-loader'
      },
      include: path.resolve('./unit/'),
      exclude: /node_modules|\.spec\.js$/
    }]
  }
})

delete webpackConf.entry
delete webpackConf.optimization

module.exports = function (config) {
  config.set({
    basePath: '../',
    browsers: ['Chrome'],
    captureTimeout: 120000,
    colors: true,
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      dir: path.join(__dirname, 'coverage')
    },
    frameworks: ['mocha', 'sinon-chai', 'source-map-support'],
    files: [
      './test/unit/**/*.test.js'
    ],
    preprocessors: {
      './test/unit/**/*.test.js': ['webpack', 'sourcemap']
    },
    port: 9877,
    reporters: ['spec', 'coverage-istanbul'],
    singleRun: true,
    webpack: webpackConf,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
