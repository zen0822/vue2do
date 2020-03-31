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
    name: 'ex',
    path: '/api/ex',
    data: [{
      name: 'name',
      type: 'english',
      length: {
        max: 1,
        min: 2
      },
      children: [{
        name: 'firstName',
        type: 'english',
        length: {
          max: 1,
          min: 2
        }
      }, {
        name: 'lastName',
        type: 'english',
        length: {
          max: 1,
          min: 2
        }
      }]
    }, {
      name: 'age',
      type: 'number',
      length: {
        min: 2
      }
    }, {
      name: 'famliy',
      type: 'chinese',
      length: {
        min: 2
      },
      children: [{
        name: 'mother',
        type: 'chinese',
        length: {
          min: 2
        },
        children: [{
          name: 'mother',
          type: 'chinese',
          length: {
            min: 2
          }
        }]
      }]
    }]
  }]
}
