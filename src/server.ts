import http from "http";
import express from "express";
import logger from "morgan";
import {
  isProduction,
  port,
  baseUri,
  createApolloServer,
  appendMiddleware,
} from "./utils/envUtils";

(async () => {
  try {
    // Create express app.
    const app = express();

    // Create http server.
    const httpServer = http.createServer(app);

    // Create apollo server.
    const apolloServer = createApolloServer(httpServer);

    // Run apollo server.
    await apolloServer.start();

    // Apply middlewares.
    appendMiddleware(
      { apolloServer, app },
      isProduction ? logger("common") : logger("dev")
    );

    // Run http server.
    await httpServer.listen({ port });

    // Print server starting log.
    console.log(
      `🚀 Server ready at ${baseUri}:${port}${apolloServer.graphqlPath}`
    );
  } catch (e) {
    console.error(e);
  }
})();
