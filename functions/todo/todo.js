const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
const q = faunadb.query

require('dotenv').config()

var client = new faunadb.Client({
  secret: process.env.CLIENT_SECRET,
})

const typeDefs = gql`
  type Query {
    todos: [Todo]!
  }
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }
  type Mutation {
    addTodo(title: String!): Todo
    updateTodoDone(id: ID!): Todo
    undoTodoDone(id: ID! title:String!): Todo
    deleteTodo(id: ID!): Todo
  }
`

const resolvers = {
  Query: {
    todos: async () => {
      try {
        const results = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("alltodos"))),
            q.Lambda(x => q.Get(x))
          )
        )
        return results.data.map(d => ({
          id: d.ref.id,
          title: d.data.title,
          completed: d.data.completed,
        }))
      } catch (err) {
        err.toString()
      }
    },
  },
  Mutation: {
    addTodo: async (_, { title }) => {
      const results = await client.query(
        q.Create(q.Collection("todos"), {
          data: {
            title,
            completed: false,
          }
        })
      )
      return {
        ...results.data,
        id: results.ref.id,
      }
    },
    updateTodoDone: async (_, { id }) => {
      const results = await client.query(
        q.Update(q.Ref(q.Collection("todos"), id), {
          data: {
            completed: true,
          },
        })
      )
      return {
        ...results.data,
        id: results.ref.id,
      }
    },
    deleteTodo: async (_, { id }) => {
      await client.query(q.Delete(q.Ref(q.Collection("todos"), id)))
    },
    undoTodoDone: async (_, { id, title }) => {
      const results = await client.query(
        q.Replace(q.Ref(q.Collection("todos"), id), {
          data: {
            title,
            completed: false,
          },
        })
      )
      return {
        ...results.data,
        id: results.ref.id,
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
