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

import path from 'path'

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
    const configFun = await import('./config/index.js')

    this.config = configFun.default({
      appName: this.appName
    })
  }

  async start() {
    const config = this.config
    const gqlFun = await import(path.resolve(__dirname, '../' + this.appName + '/server/gql/gql.js'))

    const {
      typeDefs,
      resolvers
    } = gqlFun()

    const server = new GraphQLServer({
      typeDefs,
      resolvers
    })

    server.start({
      port: config.gql.port
    }, () => console.log(`GraphQL playground server is running on http://localhost:${config.gql.port}`))
  }
}

export default function ({ appName }: { appName: string }) {
  const gqlServer = new GqlServer(appName)

  return gqlServer.start()
}
