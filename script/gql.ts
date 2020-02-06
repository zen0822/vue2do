import path from 'path'
import config from './config/index.js'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import { ApolloEngine } from 'apollo-engine'

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
    this.config = config({
      appName: this.appName
    })
  }

  async start() {
    const config = this.config
    const apprcPath = path.resolve(__dirname, '../' + this.appName + '/server/gql/gql.js')
    const gqlFun = await import(apprcPath)
    const gqlConfig = gqlFun.default()
    const graphQLServer = new GraphQLServer(gqlConfig)

    graphQLServer.express.use('/vg', voyagerMiddleware({ endpointUrl: '/' }))

    if (process.env.APOLLO_ENGINE_KEY) {
      const engine = new ApolloEngine({
        apiKey: process.env.APOLLO_ENGINE_KEY
      })

      const httpServer = graphQLServer.createHttpServer({
        tracing: {
          mode: 'enabled'
        },
        cacheControl: true
      })

      engine.listen({
        port: config.gql.port,
        httpServer,
        graphqlPaths: ['/']
      }, () => console.log(`GraphQL server with Apollo Engine is running on http://localhost:${config.gql.port}`)
      )
    } else {
      graphQLServer.start({
        port: config.gql.port,
        tracing: {
          mode: 'enabled'
        }
      }, () => console.log(`GraphQL server is running on http://localhost:${config.gql.port}`))
    }
  }
}

export default function (opt: { appName: string } = { appName: '' }) {
  const gqlServer = new GqlServer(opt.appName)

  return gqlServer.start()
}
