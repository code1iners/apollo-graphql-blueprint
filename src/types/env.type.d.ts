import { Express } from "express";
import { ApolloServer } from "apollo-server-express";

export interface IAppendMiddlewareFirstProps {
  apolloServer: ApolloServer;
  app: Express;
}
