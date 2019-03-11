module.exports = {
  type: 'spa',
  assetRoot: '../../dist',
  assetPublicPath: './',
  assetSubDirectory: 'static',
  api: '',
  apiProd: '',
  tpl: true,
  hotPort: 5168,
  mockPort: 3000,
  proxy: {},
  loaderRule: [{
    test: /blog-[\w\W]+.html$/,
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
  https: true
}
