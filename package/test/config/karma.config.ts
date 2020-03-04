import path from 'path'

export default {
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
  files: [],
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  preprocessors: {},
  port: 9877,
  reporters: ['spec', 'coverage-istanbul'],
  singleRun: false
}
