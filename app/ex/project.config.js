module.exports = {
  apiUrl: '//example.com',
  baseUrl: './',
  execute: './main.ts',
  bundleAnalyzer: true, // 打包文件的分析
  gzip: true,
  port: 5167,
  htmlName: 'index',
  htmlTitle: 'ex',
  name: 'example',
  outDir: './dist',
  proxy: {
    '/api/**': `http://localhost:5170`
  },
  staticDir: 'static',
  type: 'spa',
  webpack(config) {
    // see https://github.com/neutrinojs/webpack-chain for config.
    return config
  }
}
