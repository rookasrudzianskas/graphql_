import {graphql, buildSchema, GraphQLSchema, GraphQLObjectType} from "graphql";
import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello(name: String!): String
//     age: Int
//     weight: Float!
//     isOver18: Boolean
//     hobbies: [String!]!
//     user: User
//   }
//
//   type User {
//       id: Int
//       name: String
//       posts: [Posts]
//   }
// `)

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: "String",
        args: {
          name: {
            type: "String",
            required: true
          }
        },
        resolve: (_source, { name }) => `Hello ${name}!`
      },
      age: {
        type: "Int",
        resolve: () => 25
      },
      weight: {
        type: "Float",
        resolve: () => 75.5
      },
      isOver18: {
        type: "Boolean",
        resolve: () => true
      },
      hobbies: {
        type: "[String]",
        resolve: () => ["Coding", "Gaming", "Reading"]
      },
      user: {
        type: "User",
        resolve: () => ({
          id: 1,
          name: "John Doe"
        })
      },
      post: {
        type: "Post",
        resolve: () => ({
          id: 1,
          title: "Hello World"
        })
      }
    }
  })
})

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: ({ name }) => {
    return `Hello ${name}!`
  },
  age: () => {
    return 25
  },
  weight: () => {
    return 75.5
  },
  isOver18: () => {
    return true
  },
  hobbies: () => {
    return ["Coding", "Gaming", "Reading"]
  },
  user: () => {
    return {
      id: 1,
      name: "John Doe"
    }
  },
  post: () => {
    return {
      id: 1,
      title: "Hello World"
    }
  }
}

const app = express();
app.all('/graphql', createHandler({ schema, rootValue }));

app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
});

app.listen(4000);
console.log('Server running on http://localhost:4000/graphql');
