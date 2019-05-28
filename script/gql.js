const { GraphQLServer } = require('graphql-yoga')

module.exports = function ({ appName }) {
  const config = require('./config')({
    appName
  })

  const typeDefs = `
    type Query {
      info: String!
    }
  `

  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`
    }
  }

  const server = new GraphQLServer({
    typeDefs,
    resolvers
  })

  server.start({
    port: config.gql.port
  }, () => console.log(`Server is running on http://localhost:${config.gql.port}`))
}
