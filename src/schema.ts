import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { DocumentNode } from "graphql";

const loadedTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.{ts,js}`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.{ts,js}`);

export const typeDefs = mergeTypeDefs(loadedTypeDefs);
export const resolvers = mergeResolvers(loadedResolvers);

export const schema = buildSubgraphSchema({
  typeDefs: typeDefs as DocumentNode,
  resolvers: resolvers as any,
});
