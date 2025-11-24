import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import db from './config/database';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/schemas';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
  });

  // Test database connection
  db.raw('SELECT 1')
    .then(() => {
      console.log('✅ Database connected successfully');
    })
    .catch((err) => {
      console.error('❌ Database connection failed:', err.message);
    });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
