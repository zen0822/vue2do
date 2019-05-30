import gqlSchema from './schema.gql'

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
        links: () => this.links
      },
      Mutation: {
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
        }
      },
      Link: {
        id: (parent: { id: string }) => parent.id,
        description: (parent: { description: string }) => parent.description,
        url: (parent: { url: string }) => parent.url
      }
    }

    return
  }

  gql() {
    return {
      typeDefs: gqlSchema,
      resolvers: this.resolvers
    }
  }
}

const serverMain = new ServerMain()

export default function () {
  return serverMain.gql()
}
