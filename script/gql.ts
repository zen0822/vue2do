// const path = require('path')
// const {
//   GraphQLServer
// } = require('graphql-yoga')

// module.exports = function ({
//   appName
// }) {
//   const config = require('./config')({
//     appName
//   })

//   const {
//     typeDefs,
//     resolvers
//   } = require(path.resolve(__dirname, '../' + appName + '/server/gql/gql.js'))()

//   const server = new GraphQLServer({
//     typeDefs,
//     resolvers
//   })

//   server.start({
//     port: config.gql.port
//   }, () => console.log(`GraphQL playground server is running on http://localhost:${config.gql.port}`))
// }

import * as path from 'path'
import {
  GraphQLServer
} from 'graphql-yoga'

class GqlServer {
  config: any
  appName: string

  constructor(appName: string) {
    this.appName = appName
    this.init()
  }

  async init() {
    const configFun = await import('./config')

    this.config = configFun({
      appName: this.appName
    })

    const server = new GraphQLServer({
      typeDefs,
      resolvers
    })

    server.start({
      port: config.gql.port
    }, () => console.log(`GraphQL playground server is running on http://localhost:${config.gql.port}`))
  }

  start() {

  }
}

export default function ({ appName } = { appName: string }) {
  const gqlServer = new GqlServer()

  return gqlServer.start()
}
