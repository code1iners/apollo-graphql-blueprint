import { Resolvers } from "./../types/shared.type.d";

const resolvers: Resolvers = {
  Query: {
    hello: () => "world",
  },
};

export default resolvers;
