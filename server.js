import { graphql, buildSchema } from "graphql"

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

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: "{ age }",
  rootValue,
}).then(response => {
  console.log(response)
})
