const gqlPort = 5168

module.exports = {
  apiUrl: '//example.com',
  baseUrl: './',
  execute: './main.ts',
  bundleAnalyzer: true, // 打包文件的分析
  favicon: './client/asset/img/favicon.ico',
  gzip: true,
  hotPort: 80,
  htmlName: 'index',
  htmlTitle: 'mock',
  name: 'mock',
  outDir: './dist',
  proxy: {
    '/gql': {
      target: `http://localhost:${gqlPort}`,
      pathRewrite: {
        '^/gql': ''
      }
    },
    '/api/**': `http://localhost:${gqlPort}`,
    '/sw.js': `http://localhost:5169`
  },
  staticDir: 'static',
  tpl: true,
  type: 'spa'
}
