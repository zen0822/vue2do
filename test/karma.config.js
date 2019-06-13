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

module.exports = {
  autoWatch: false,
  basePath: '../',
  browsers: ['Chrome'], // 可以使用模拟 IE\firefox 浏览器的 PhantomJS
  captureTimeout: 120000,
  colors: true,
  coverageIstanbulReporter: {
    reports: ['html', 'lcovonly', 'text-summary'],
    fixWebpackSourcePaths: true,
    dir: path.join(__dirname, 'coverage')
  },
  devtool: 'inline-cheap-module-source-map',
  exclude: ['./tsDist/**'],
  frameworks: ['mocha', 'sinon-chai', 'source-map-support'],
  files: [
    './**/__tests__/*.test.js'
  ],
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  preprocessors: {
    './**/__tests__/*.test.js': ['webpack', 'sourcemap']
  },
  port: 9877,
  reporters: ['spec', 'coverage-istanbul'],
  singleRun: false,
  webpack: webpackConf,
  webpackMiddleware: {
    noInfo: true
  }
}
