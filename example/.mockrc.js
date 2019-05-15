export default {
  api: [{
    name: 'ex',
    path: '/api/ex',
    data: {
      name: /\w{3}/,
      age: /\d{1,2}/
    }
  }]
}
