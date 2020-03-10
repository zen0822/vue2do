import path from 'path'

export default {
  gql: {
    execute: './server/gql/gql.js',
    port: 5168
  },
  sw: {
    port: 5169,
    webpack(config: any): any {
      config
        .entryPoints
        .clear()

      config
        .entry('sw')
        .add(path.resolve(__dirname, '../../../app/mock/client/sw/sw.worker.ts'))

      config
        .devServer
        .stats('normal')

      config
        .output
        .filename('[name].js')
        .globalObject('this')
        .pathinfo(false)
        .publicPath('/')
        .path(path.resolve(__dirname, '../../../app/mock/dist/sw'))

      config.optimization.clear()
      config.plugins.delete('HtmlWebpackPlugin')

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
