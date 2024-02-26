import {setupDatabase} from "../../mongo/index.js";
import {ObjectId} from "mongodb";

export const typeDef = /* GraphQL */ `
    type Query {
        users: [User!]!
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
        id: ID!
        name: String
        email: String
    }
`;

export const resolvers = {
  Query: {
    users: (obj, args, { mongo }) => {
      return mongo.users.find().limit(20).toArray();
    },

    user: async (obj, { id }, { mongo }) => {
      return mongo.users.findOne({ _id: new ObjectId(id) });
    },
  },


  Mutation: {
    createUser: async (_, { user }, { mongo }) => {
      const movies = await mongo.movies.find().toArray();
      console.log(movies);
      // insert into DB
      return {
        id: 1,
        ...user,
      };
    },
  },

  User: {
    id: ({ id, _id }) => _id || id,
    name: (obj) => {
      return obj.name.trim().toUpperCase();
    },
  },
};
