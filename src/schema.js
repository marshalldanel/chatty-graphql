
export const typeDefs = `

  type Channel {
    id: ID!
    name: String
  }

  # Entry points into API
  type Query {
    channels: [Channel]
  }
`