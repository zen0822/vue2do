const path = require('path')

module.exports = function ({
  appName
}) {
  const appConfigPath = path.resolve(__dirname, '../../' + appName + '/app.config.js')
  const appConfig = require(appConfigPath)
  const appConfigDir = path.dirname(appConfigPath)
  const mockPort = appConfig.mockPort || 3000
  const gqlMock = appConfig.gqlMock || mockPort
  const assetSubDirectory = appConfig.assetSubDirectory || 'static'

  const config = {
    ...appConfig,
    api: appConfig.api,
    apiProd: appConfig.apiProd,
    prod: {
      assetRoot: path.resolve(__dirname, '../../dist'),
      assetPublicPath: './',
      assetSubDirectory: assetSubDirectory,
      sourceMap: false,
      gzip: appConfig.gzip || false,
      gzipExt: ['js', 'css']
    },
    dev: {
      mockPort: mockPort || 3000,
      hotPort: appConfig.hotPort || 80,
      assetPublicPath: '/',
      assetSubDirectory: assetSubDirectory,
      proxyTable: {
        '/gql': {
          target: `http://localhost:${gqlMock}`,
          pathRewrite: {
            '^/gql': ''
          }
        },
        '/api/**': `http://localhost:${mockPort}`,
        '/sw.js': `http://localhost:5169`,
        ...appConfig.proxy
      },
      cssSourceMap: false
    },
    doc: {
      htmlName: path.resolve(__dirname, '../../example/dist/index.html'),
      assetRoot: path.resolve(appConfigDir, appConfig.assetRoot),
      assetSubDirectory: 'static',
      assetPublicPath: './',
      sourceMap: true,
      gzip: true,
      gzipExt: ['js', 'css']
    },
    sw: {
      hotPort: 5169,
      assetRoot: path.resolve(appConfigDir, appConfig.assetRoot, './sw'),
      assetPublicPath: '/',
      assetSubDirectory: assetSubDirectory,
      prodSourceMap: false
    },
    gql: {
      port: gqlMock
    },
    global: {
      root: '../../',
      appDir: '../../app/'
    },
    https: appConfig.https,
    htmlName: appConfig.htmlName,
    type: 'spa',
    tpl: appConfig.tpl
  }

  return config
}
