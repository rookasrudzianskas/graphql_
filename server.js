import express from 'express';
import { ruruHTML } from 'ruru/server';

import {createSchema, createYoga} from 'graphql-yoga';
// import { schema } from './src/graphql/index.js';
// import { setupDatabase } from './src/mongo/index.js';

const yoga = createYoga({
  schema: createSchema({
    typeDefs:`
      type Query {
        hello: String
      }
    `,
    resolvers:{
      Query:{
        hello:()=> 'Hello From Yoga!'
      }
    }
  }),
});

const app = express();

app.all('/graphql', yoga);

// Serve the GraphiQL IDE.
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(4000);
console.log(`
  Api running on: http://localhost:4000
  Test: http://localhost:4000/graphql?query={hello,age}
`);
