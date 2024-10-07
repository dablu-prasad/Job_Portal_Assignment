import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { connectDB } from './config/mongodbConnect';
import { client } from './config/radis_connection'
import {context, upload} from './middleware/authMiddleware';
import path from "path"
import { envFile } from './config/envFile';
import morgan from "morgan" 
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { graphqlUploadExpress } = require('graphql-upload');

interface MyContext {
  token?: string; 
}
declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;   // Single file
      // files?: Multer.File[]; // Multiple files
    }
  }
}
const app = express();
app.use(morgan('dev'));
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  // Using graphql-upload without CSRF prevention is very insecure.
  csrfPrevention: false,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // includeStacktraceInErrorResponses: false, //to exclude stackTrace parameter from error messages
  // introspection: true,
});
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const corsOptions = {
  origin: '*', // Specify your frontend URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
};
// Middleware for handling file uploads
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
const ApolloServerConnection = async () => {
  await server.start();
  app.use(express.json()); 
  app.use(
    '/graphql',
    cors(corsOptions),
    expressMiddleware(server, {
      context: context
    }),
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: envFile.PORT }, resolve)
  );
  console.log(`User Service running at ${envFile.COMMON_PORT}/v1/api/user/graphql`);
};
connectDB();  // Connect to MongoDB Database
client.connect();  // Connect to Redis
ApolloServerConnection()
