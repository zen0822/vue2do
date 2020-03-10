import chalk from 'chalk'
import config from '../config'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import { ApolloEngine } from 'apollo-engine'

import {
  GraphQLServer
} from 'graphql-yoga'

class GqlServer {
  config: any;
  projectConfigPath: string

  constructor(projectConfigPath: string) {
    this.projectConfigPath = projectConfigPath
  }

  async getConfig(): Promise<any> {
    try {
      const configOpt = await config({
        projectConfigPath: this.projectConfigPath
      })

      return configOpt
    } catch (error) {
      console.warn(error)
    }
  }

  async start(): Promise<any> {
    try {
      const config = await this.getConfig()
      const gqlFun = await import(config.gql.execute)
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
        }, () => console.log(`${chalk.green('@vue2do/mock')}: GraphQL server with Apollo Engine is running on http://localhost:${config.gql.port}`)
        )
      } else {
        graphQLServer.start({
          port: config.gql.port,
          tracing: {
            mode: 'enabled'
          }
        }, () => console.log(`${chalk.green('@vue2do/mock')}: GraphQL server is running on http://localhost:${config.gql.port}`))
      }
    } catch (error) {
      console.warn(error)
    }
  }
}

export default function ({ projectConfigPath } = { projectConfigPath: '' }): Promise<any> {
  const gqlServer = new GqlServer(projectConfigPath)

  return gqlServer.start()
}
