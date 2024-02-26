import {graphql, buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString} from "graphql";
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

const User = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => {
          return "Hello World"
        },
      },
    }
  })
})

// The rootValue provides a resolver function for each API endpoint
var rootValue = {

}

const app = express();
app.all('/graphql', createHandler({ schema }));

app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
});

app.listen(4000);
console.log('Server running on http://localhost:4000/graphql');
