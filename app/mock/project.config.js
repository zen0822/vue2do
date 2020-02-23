module.exports = {
  apiUrl: '//example.com',
  baseUrl: './',
  execute: './main.ts',
  bundleAnalyzer: true, // 打包文件的分析
  favicon: './client/asset/img/favicon.ico',
  gzip: true,
  hotPort: 80,
  htmlName: 'index',
  htmlTitle: 'doc',
  name: 'doc',
  outDir: './dist',
  proxy: {
    '/api/**': `http://localhost:5170`
  },
  staticDir: 'static',
  tpl: true,
  type: 'spa'
}
