import gql from 'graphql-tag'

const schema = gql`
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

  type Subscription {
    newLink: Link
  }
`

export default schema
