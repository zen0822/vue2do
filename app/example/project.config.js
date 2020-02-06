module.exports = {
  apiUrl: '//example.com',
  baseUrl: './',
  execute: './main.ts',
  bundleAnalyzer: true, // 打包文件的分析
  favicon: './src/asset/favicon.ico',
  gzip: true,
  hotPort: 5167,
  htmlName: 'index',
  htmlTitle: 'ex',
  name: 'example',
  outDir: './dist',
  proxy: {
    '/api/**': `http://localhost:5170`
  },
  staticDir: 'static',
  tpl: true,
  type: 'spa',
  webpack(config) {
    // see https://github.com/neutrinojs/webpack-chain for config.
    config.module
      .rule('protocol')
      .test(/blog-[\w\W]+.html$/)
      .use('extract')
      .loader('extract-loader')
      .end()
      .use('html')
      .loader('html-loader')
      .end()
      .use('file')
      .loader('file-loader')
      .options({
        name: 'static/[name].[ext]',
        publicPath: './'
      })
      .end()

    return config
  }
}
