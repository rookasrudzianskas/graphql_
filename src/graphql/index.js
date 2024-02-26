import { createSchema } from 'graphql-yoga';
import { typeDef as User, resolvers as userResolvers } from './models/user.js';
// import {
//   typeDef as Comment,
//   resolvers as commentResolvers,
// } from './models/comments.js';

import _ from 'lodash';

export const schema = createSchema({
  typeDefs: `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello world!',
    },
  },
});
