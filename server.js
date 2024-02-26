import { graphql, buildSchema } from "graphql"
import express from "express"
import { createHandler } from "graphql-http/lib/use/express"

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    age: Int
  }
`)

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    return "Hello Rokas!"
  },
  age: () => {
    return 25
  },
}

const app = express();
app.all('/graphql', createHandler({ schema, rootValue }));

app.listen(4000);
console.log('Server running on http://localhost:4000/graphql');
