import config from '../config'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import { ApolloEngine } from 'apollo-engine'

import {
  GraphQLServer
} from 'graphql-yoga'

class GqlServer {
  config: any
  projectConfigPath: string

  constructor(projectConfigPath: string) {
    this.projectConfigPath = projectConfigPath

    this.init()
  }

  init(): void {
    this.config = config({
      projectConfigPath: this.projectConfigPath
    })
  }

  async start(): Promise<any> {
    const config = this.config
    const gqlFun = await import(config.execute)
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

export default function ({ projectConfigPath } = { projectConfigPath: '' }): Promise<any> {
  const gqlServer = new GqlServer(projectConfigPath)

  return gqlServer.start()
}
