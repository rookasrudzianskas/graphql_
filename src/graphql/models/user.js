import {setupDatabase} from "../../mongo/index.js";

export const typeDef = /* GraphQL */ `
    type Query {
        user: User
    }

    type Mutation {
        createUser(user: NewUserInput!): User
    }

    input NewUserInput {
        name: String!
        age: Int!
    }

    type User {
        id: Int
        name: String
        age: Int
    }
`;

export const resolvers = {
  Query: {
    user: () => {
      return {
        id: 1,
        name: 'Rokas',
      };
    },
  },

  Mutation: {
    createUser: async (_, {user}, context) => {
      const movies = await context.db.collection('movies').find().toArray();
      console.log(movies);
      return {
        id: 1,
        ...user,
      };
    },
  },

  User: {
    name: (obj) => {
      return obj.name.trim().toUpperCase();
    },
  },
};
