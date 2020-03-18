import fs from 'fs'
import path from 'path'
import WorkboxPlugin from 'workbox-webpack-plugin'

const gqlPort = 5168

export default {
  apiUrl: '//example.com',
  baseUrl: './',
  execute: './main.ts',
  bundleAnalyzer: true, // 打包文件的分析
  favicon: './client/asset/img/favicon.ico',
  gzip: true,
  path: path.resolve(__dirname, '../../../app/mock/'),
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
    '/api/**': {
      target: `http://localhost`
    },
    '/sw.js': `http://localhost:5169`
  },
  staticDir: 'static',
  tpl: true,
  type: 'spa',
  webpack(config: any): any {
    if (process.env.SW_ENV === 'development') {
      console.log('App mock: Min Mock is running')

      const swPath = path.resolve(__dirname, '../../../app/mock/dist/sw/sw.js')

      try {
        fs.accessSync(swPath, fs.constants.F_OK)

        config
          .plugin('workbox')
          .use(WorkboxPlugin.InjectManifest, [{
            swSrc: swPath,
            swDest: 'sw.js',
            maximumFileSizeToCacheInBytes: 20000000
          }])
      } catch (error) {
        console.log(`\n在应用的 dist/sw 未找到 sw.js 文件，需要先运行 npm run mock:sw.prod:M 生成对应文件。\n`)
      }

      config.devServer
        .contentBase([path.resolve(__dirname, '../../../app/mock/dist/sw/')])
        .watchContentBase(true)
    }

    return config
  }
}
