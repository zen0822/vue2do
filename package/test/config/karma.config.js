const path = require('path')

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
    './src/**/__tests__/*.test.js',
    './example/**/__tests__/*.test.js'
  ],
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  preprocessors: {
    './src/**/__tests__/*.test.js': ['webpack', 'sourcemap'],
    './example/**/__tests__/*.test.js': ['webpack', 'sourcemap']
  },
  port: 9877,
  reporters: ['spec', 'coverage-istanbul'],
  singleRun: false,
  webpackMiddleware: {
    noInfo: true
  }
}
