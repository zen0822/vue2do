module.exports = {
  type: 'spa',
  assetRoot: '../../dist/linktokenMall',
  assetPublicPath: './',
  assetSubDirectory: 'static',
  api: '//api-wkmall.lianxiangcloud.com',
  apiProd: '//api-wkmall.lianxiangcloud.com',
  tpl: true,
  hotPort: 443,
  mockPort: 5467,
  proxy: {},
  loaderRule: [{
    test: /protocol-[\w\W]+.html$/,
    use: [
      'extract-loader',
      'html-loader',
      {
        loader: 'file-loader',
        options: {
          name: 'static/[name].[ext]',
          publicPath: './'
        }
      }
    ]
  }],
  https: {
    key: './https/onethingpcs.com.key',
    cert: './https/onethingpcs.com.crt'
  }
}
