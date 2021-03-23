const { GraphQLServer } = require("graphql-yoga")

const users = [
  {
    id: "1",
    name: "Fred",
    email: "fred@example.com",
    age: 32,
  },
  {
    id: "2",
    name: "Jason",
    email: "jason@example.com",
    age: 37,
  },
  {
    id: "3",
    name: "Anna",
    email: "anna@example.com",
  },
]

// Type Definitions
const typeDefs = `
  type Query {
    post: Post!
    me: User!
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

// Resolvers
const resolvers = {
  Query: {
    users: (parent, args, ctx, info) => users,
    me: () => {
      return {
        id: "93645",
        name: "Fred",
        email: "fred@example.com",
        age: 43,
      }
    },
    post: () => {
      return {
        id: "123",
        title: "New post",
        body: "Get outta town quickly because the crazy chickens are coming.",
        published: true,
      }
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log("Server is now up and running at http://localhost:4000")
})
