export const typeDef = /* GraphQL */ `
    type Query {
        user: User
    }

    type User {
        id: Int
        name: String
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

  User: {
    name: (obj) => {
      return obj.name.toUpperCase();
    },
  },
};
