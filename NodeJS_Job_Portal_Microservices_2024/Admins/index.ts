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
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
import { envFile } from './config/envFile';
import morgan from "morgan"
interface MyContext {
  token?: string; 
}

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;   // Single file
      admin?:any;
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
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  // includeStacktraceInErrorResponses: false, //to exclude stackTrace parameter from error messages
  // introspection: true,

});
// Set up the image upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ filePath: req.file.path });
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const ApolloServerConnection = async () => {
  await server.start();
  app.use(
    '/graphql',
    cors({
      origin: '*',
    credentials: true,
    // all headers that client are allowed to use
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
      'multipart/form-data',
      'text/plain'
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
    }),
    express.json(),
    expressMiddleware(server, {
      context: context
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: envFile.PORT }, resolve)
  );
  console.log(`Admin Service running at ${envFile.COMMON_PORT}/v1/api/admin/graphql`);
};
connectDB();  // Connect to MongoDB Database
client.connect();  // Connect to Redis
ApolloServerConnection()
