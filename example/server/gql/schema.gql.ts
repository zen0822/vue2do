export default `
  type Query {
    info: String!
    links: [Link!]!,
    link(id: ID!): Link
  }

  type Mutation {
    postLink(url: String!, description: String!): Link!,
    updateLink(id: ID!, url: String, description: String): Link
  }

  type Link {
    id: ID!
    description: String! @deprecated
    desc: String!
    url: String!
  }
`
