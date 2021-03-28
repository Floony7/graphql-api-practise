const { GraphQLServer } = require("graphql-yoga")

/*
1. Set up a "Comment" type with id and text fields. Both non-nullable. 
2. Set up a "comments" array with 4 comments
3. Set up a "coments" query with a resolver that returns all the comments
4. Run the query to get all 4 comments with both id and text fields
*/

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

const posts = [
  {
    id: "12",
    title: "GraphQL 101",
    body: "GraphQL is a nawesome way to develop backend APIs.",
    published: true,
    author: "1",
  },
]

// Type Definitions
const typeDefs = `
  type Query {
    post: Post!
    posts(query: String): [Post!]!
    me: User!
    users: [User!]!
    comment: [Comment!]!
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
    author: User!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
  }
`

const comments = [
  {
    id: "101",
    text: "This is a GraphQL comment.",
    author: "1",
  },
  {
    id: "102",
    text: "I love GraphQL. It's nice.",
    author: "1",
  },
  {
    id: "103",
    text: "GraphQL Yoga is cool too.",
    author: "3",
  },
]

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
    posts: (parent, args, ctx, info) => {
      if (!args.query) {
        return posts
      }
    },
  },
  Post: {
    author: (parent, args, ctx, info) => {
      return users.find((user) => user.id === parent.author)
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
