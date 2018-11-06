// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = function ({
  appName,
  opt = {}
}) {
  const appConfigPath = path.resolve(__dirname, '../../app/' + appName + '/.apprc.js')
  const appConfig = require(appConfigPath)
  const appConfigDir = path.dirname(appConfigPath)
  const mockPort = appConfig.mockPort || 3000
  const assetSubDirectory = appConfig.assetSubDirectory || 'static'

  const config = {
    api: appConfig.api,
    apiProd: appConfig.apiProd,
    build: {
      env: require('./prod.env'),
      assetRoot: path.resolve(appConfigDir, appConfig.assetRoot),
      assetPublicPath: appConfig.assetPublicPath || './',
      assetSubDirectory: assetSubDirectory,
      productionSourceMap: true,
      productionGzip: appConfig.gzip || false,
      productionGzipExtensions: ['js', 'css']
    },
    dev: {
      env: require('./dev.env'),
      mockPort: mockPort || 3000,
      hotPort: appConfig.hotPort || 80,
      assetPublicPath: '/',
      assetSubDirectory: assetSubDirectory,
      proxyTable: {
        '/api/**': `http://localhost:${mockPort}`,
        ...appConfig.proxy
      },
      cssSourceMap: false
    },
    doc: {
      env: require('./prod.env'),
      index: path.resolve(__dirname, '../../example/dist/index.html'),
      assetsRoot: path.resolve(__dirname, '../../example/dist'),
      assetsSubDirectory: 'static',
      assetsPublicPath: './',
      productionSourceMap: true,
      productionGzip: true,
      productionGzipExtensions: ['js', 'css']
    },
    global: {
      root: '../../',
      appDir: '../../app/'
    },
    httpsOpt: appConfig.httpsOpt,
    type: 'spa',
    tpl: appConfig.appTpl,
    sourceMap: false
  }

  return config
}
