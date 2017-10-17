const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

const typeDefs = `

  type Channel {
    id: ID!
    name: String
  }

  # Entry points into API
  type Query {
    channels: [Channel]
  }

  type Mutation {
    addChannel(name: String!): Channel
  }
`

const resolvers = require('./resolvers');
const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;

// const schema = makeExecutableSchema({ typeDefs });
// addMockFunctionsToSchema({ schema });