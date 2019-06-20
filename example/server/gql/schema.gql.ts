import gql from 'graphql-tag'

const schema = gql`
  type Query {
    info: String!
    links: [Link!]!
    link(id: ID!): Link
    feed: [Link!]!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
    postLink(url: String!, description: String!): Link!
    updateLink(id: ID!, url: String, description: String): Link
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  type Link {
    id: ID!
    description: String! @deprecated
    desc: String!
    url: String!
    postedBy: User
  }

  type Subscription {
    newLink: Link
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    links: [Link!]!
  }
`

export default schema
