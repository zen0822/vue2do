import path from 'path'
import FileToDistWebpackPlugin from '@vue2do/file-to-dist-webpack-plugin'

export default {
  gql: {
    execute: './server/gql/gql.js',
    port: 5168
  },
  sw: {
    port: 5169,
    webpack(config: any): any {
      const swAssetDir = path.resolve(__dirname, '../../../app/mock/dist/sw')

      config
        .entryPoints
        .clear()

      config
        .entry('sw')
        .add(path.resolve(__dirname, '../../../app/mock/server/sw/sw.worker.ts'))

      config
        .output
        .filename('[name].js')
        .globalObject('self')
        .pathinfo(false)
        .publicPath('/')
        .path(swAssetDir)

      config.optimization.clear()
      config.plugins.delete('html')

      config
        .node
        .set('fs', 'empty')

      config
        .plugin('fileToDist')
        .use(FileToDistWebpackPlugin, [{
          dir: swAssetDir
        }])

      config.devServer
        .watchOptions({
          aggregateTimeout: 300,
          ignored: [/node_modules/, path.resolve(__dirname, '../../../app/mock/client/')]
        })

      return config
    }
  },
  api: [{
    key: 'zen',
    url: '/api/zen',
    data: [{
      key: 'name',
      content: 'zen'
    }]
  }, {
    key: 'ex',
    url: '/api/ex',
    total: 5,
    data: [{
      key: 'name',
      type: 'name',
      children: [{
        key: 'firstName',
        type: 'first',
        tpl: '@first'
      }, {
        key: 'lastName',
        type: 'last',
        tpl: '@last'
      }]
    }, {
      key: 'age',
      type: 'natural',
      tpl: '@natural(0, 100)'
    }, {
      key: 'famliy',
      type: 'cname',
      children: [{
        key: 'mother',
        type: 'cname',
        tpl: '@cname',
        children: [{
          key: 'sistar',
          type: 'cname',
          tpl: '@cname'
        }]
      }]
    }]
  }]
}
