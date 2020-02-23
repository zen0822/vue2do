import gqlSchema from './schema.gql'
import Subscription from './resolver/Subscription'
import Mutation from './resolver/Mutation'
import { prisma } from '../prisma'

class ServerMain {
  links: Array<Record<string, any>>
  idCount: number
  resolvers: Record<string, any> = {}

  constructor() {
    this.links = [{
      id: 'link-0',
      url: 'www.howtographql.com',
      description: 'Fullstack tutorial for GraphQL'
    }]
    this.idCount = this.links.length

    this.init()
  }

  private init() {
    this.resolvers = {
      Query: {
        info: () => `This is the API of a Hackernews Clone`,
        link: (_parent: Record<string, any>, args: { id: number }) => {
          return this.links.find((item: any) => {
            return item.id === args.id
          })
        },
        links: () => this.links,
        feed: async (_root: any, args: any, context: any, _info: any) => {
          const where = args.filter ? {
            OR: [
              { description_contains: args.filter },
              { url_contains: args.filter }
            ]
          } : {}

          const links = await context.prisma.links({
            where,
            skip: args.skip,
            first: args.first
          })
          return links
        }
      },
      Mutation: {
        ...Mutation,
        postLink: (_parent: Record<string, any>, args: { url: string, description: string }) => {
          const link = {
            id: `link-${this.idCount++}`,
            description: args.description,
            url: args.url
          }

          this.links.push(link)

          return link
        },
        updateLink: (_parent: Record<string, any>, args: { id: string }) => {
          const links = this.links
          const linkIndex = links.findIndex((item: any) => args.id === item.id)

          links[linkIndex] = {
            ...links[linkIndex],
            ...args
          }

          return links[linkIndex]
        }
      },
      User: {
        links: (parent: any, _args: any, context: any) => {
          return context.prisma.user({ id: parent.id }).links()
        }
      },
      Link: {
        id: (parent: { id: string }) => parent.id,
        description: (parent: { description: string }) => parent.description,
        desc: (parent: { description: string }) => `new: ${parent.description}`,
        url: (parent: { url: string }) => parent.url,
        postedBy: (parent: any, _args: any, context: any) => {
          return context.prisma.link({ id: parent.id }).postedBy()
        }
      },
      Subscription
    }
  }

  gql() {
    return {
      typeDefs: gqlSchema,
      resolvers: this.resolvers,
      context: (request: Record<string, any> | Array<any>) => {
        return {
          ...request,
          prisma
        }
      }
    }
  }
}

const serverMain = new ServerMain()

export default function () {
  return serverMain.gql()
}
