import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

(async () => {
  const PORT = process.env.PORT || 4000;
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
  });

  console.log(`🚀 Server ready at ${url}`);
})();
