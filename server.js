import {graphql, buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt} from "graphql";
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
    id: { type: GraphQLInt },
    name: { type: GraphQLString, resolve: (obj) => {
       console.log("OBJ", obj);
       const name = obj.name.trim().toLowerCase();
       if(obj.isAdmin) {
          return name.toUpperCase() + " (ADMIN)";
       }
       return obj.name;
      }
    },
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
      user: {
        type: User,
        resolve: () => {
          return {
            id: 1,
            name: "John Doe",
            extra: "Extra",
            isAdmin: true,
          }
        }
      }
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
