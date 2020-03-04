module.exports = {
  gql: {
    execute: '../../tsDist/app/mock/server/gql/gql.js',
    port: 5168
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
