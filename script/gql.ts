import path from 'path'
import gqlFun from './config/index.js'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'

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
    this.config = gqlFun({
      appName: this.appName
    })
  }

  async start() {
    const config = this.config
    const apprcPath = path.resolve(__dirname, '../' + this.appName + '/server/gql/gql.js')

    const gqlFun = await import(apprcPath)

    const {
      typeDefs,
      resolvers
    } = gqlFun.default()

    const server = new GraphQLServer({
      typeDefs,
      resolvers
    })

    server.express.use('/voyager', voyagerMiddleware({ endpointUrl: '/' }))

    server.start({
      port: config.gql.port
    }, () => console.log(`GraphQL playground server is running on http://localhost:${config.gql.port}`))
  }
}

export default function (opt: { appName: string } = { appName: '' }) {
  const gqlServer = new GqlServer(opt.appName)

  return gqlServer.start()
}
