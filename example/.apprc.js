module.exports = {
  type: 'spa',
  assetRoot: '../../dist/linktokenMall',
  assetPublicPath: './',
  assetSubDirectory: 'static',
  api: '//api-wkmall.lianxiangcloud.com',
  apiProd: '//api-wkmall.lianxiangcloud.com',
  tpl: true,
  hotPort: 5168,
  mockPort: 3000,
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
