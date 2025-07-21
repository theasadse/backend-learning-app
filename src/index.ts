// src/index.ts
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

(async () => {
  await server.start();

  // ✅ Use JSON body parser BEFORE Apollo middleware
  app.use('/graphql',
    cors(),                // enable CORS
    express.json(),     // or use express.json()
    expressMiddleware(server)
  );

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
})();
