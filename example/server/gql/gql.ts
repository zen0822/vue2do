import gqlSchema from './schema.gql'
import Subscription from './Subscription'
import { prisma } from '../prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { APP_SECRET, getUserId } from './util'

class ServerMain {
  links: Array<Object>
  idCount: number
  resolvers: Object = {}

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
        link: (_parent: Object, args: { id: number }) => {
          return this.links.find((item: any) => {
            return item.id === args.id
          })
        },
        links: (parent: any, _args: any, context: any) => {
          return context.prisma.user({ id: parent.id }).links()
        },
        feed: (_root: any, _args: any, context: any, _info: any) => {
          return context.prisma.links()
        }
      },
      Mutation: {
        post: (_root: any, args: any, context: any) => {
          const userId = getUserId(context)

          return context.prisma.createLink({
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId } },
          })
        },
        postLink: (_parent: Object, args: { url: string, description: string }) => {
          const link = {
            id: `link-${this.idCount++}`,
            description: args.description,
            url: args.url
          }

          this.links.push(link)

          return link
        },
        updateLink: (_parent: Object, args: { id: string }) => {
          const links = this.links
          const linkIndex = links.findIndex((item: any) => args.id === item.id)

          links[linkIndex] = {
            ...links[linkIndex],
            ...args
          }

          return links[linkIndex]
        },
        signup: async (_parent: any, args: any, context: any, _info: any) => {
          const password = await bcrypt.hash(args.password, 10)
          const user = await context.prisma.createUser({ ...args, password })
          const token = jwt.sign({ userId: user.id }, APP_SECRET)

          return {
            token,
            user
          }
        },
        login: async (_parent: any, args: any, context: any, _info: any) => {
          const user = await context.prisma.user({ email: args.email })
          if (!user) {
            throw new Error('No such user found')
          }

          const valid = await bcrypt.compare(args.password, user.password)
          if (!valid) {
            throw new Error('Invalid password')
          }

          const token = jwt.sign({ userId: user.id }, APP_SECRET)

          return {
            token,
            user
          }
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

    return
  }

  gql() {
    return {
      typeDefs: gqlSchema,
      resolvers: this.resolvers,
      context: (request: Object | Array<any>) => {
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
