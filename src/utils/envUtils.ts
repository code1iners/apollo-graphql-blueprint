import { Express } from "express";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

import { Server } from "http";

import { ExpressContext } from "apollo-server-express";
import { PRODUCTION } from "./constants/constants.env";
import { typeDefs, resolvers } from "../schema";

// Variables start.

export const isProduction: boolean = process.env.NODE_ENV === PRODUCTION;
export const port: string | number = process.env.PORT || 3000;
export const baseUri: string = process.env.BASE_URI || "localhost";

// Variables end.

// Functions start.

/**
 * ### Create apollo server based with http server.
 * @param httpServer
 * @returns Apollo server.
 */
export const createApolloServer = (
  httpServer: Server
): ApolloServer<ExpressContext> => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
};

interface IAppendMiddlewareProps {
  apolloServer: ApolloServer;
  app: Express;
}

export const appendMiddleware = (
  { apolloServer, app }: IAppendMiddlewareProps,
  ...args: any[]
) => {
  args.forEach((arg: any) => app.use(arg));
  apolloServer.applyMiddleware({ app });
};

// Functions end.
