module.exports = {
  apiUrl: '//example.com',
  baseUrl: './',
  execute: './main.ts',
  bundleAnalyzer: true, // 打包文件的分析
  favicon: './client/asset/img/favicon.png',
  gzip: true,
  port: 5167,
  htmlName: 'index',
  htmlTitle: 'doc',
  name: 'doc',
  outDir: './dist',
  proxy: {
    '/api/**': `http://localhost:5170`
  },
  staticDir: 'static',
  tpl: true,
  type: 'spa',
  webpack(config) {
    config.module
      .rule('protocol')
      .test(/blog-[\w\W]+.html$/)
      .use('extract')
      .loader(require.resolve('extract-loader'))
      .end()
      .use('html')
      .loader(require.resolve('html-loader'))
      .end()
      .use('file')
      .loader(require.resolve('file-loader'))
      .options({
        name: 'static/[name].[ext]',
        publicPath: './'
      })
      .end()

    return config
  }
}
