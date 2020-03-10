const gqlPort = 5168

export default {
  apiUrl: '//example.com',
  baseUrl: './',
  execute: './main.ts',
  bundleAnalyzer: true, // 打包文件的分析
  favicon: './client/asset/img/favicon.ico',
  gzip: true,
  port: 80,
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
  type: 'spa',
  webpack(config: any): any {
    if (process.env.SW_ENV === 'development') {
      console.log('cross-env SW_ENV=development SW_DEBUG=true')
      // try {
      //   fs.accessSync(swPath, fs.constants.F_OK)

      //   devConf.plugins.push(
      //     new WorkboxPlugin.InjectManifest({
      //       swSrc: swPath,
      //       importWorkboxFrom: 'disabled'
      //     })
      //   )
      // } catch (error) {
      //   console.log(`\n在应用的 dist/sw 未找到 sw.js 文件，需要先运行 npm run sw:prod 生成对应文件。\n`)
      // }
    }

    return config
  }
}
