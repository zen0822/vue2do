// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  global: {
    root: '../../',
    appDir: '../../app/'
  },
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../example/dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../../example/dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    productionGzip: true,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 5168,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/**/api/**': 'http://localhost:9999'
    },
    cssSourceMap: false
  },
  sourceMap: false
}
