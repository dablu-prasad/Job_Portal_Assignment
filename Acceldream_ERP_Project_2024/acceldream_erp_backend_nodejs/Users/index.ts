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
const {graphqlUploadExpress} = require('graphql-upload');
interface MyContext {
  token?: string; 
}

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;   // Single file
      user?:any;
      // files?: Multer.File[]; // Multiple files
    }
  }
}
const app = express();
app.use(morgan('dev'));
const httpServer = http.createServer(app);
// Use the graphqlUploadExpress middleware before Apollo Server middleware
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

// Set up the image upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ filePath: req.file.path });
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  csrfPrevention: false,
  // includeStacktraceInErrorResponses: false, //to exclude stackTrace parameter from error messages
  // introspection: true,
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

  const ApolloServerConnection = async () => {
    await server.start();    
    app.use(
      '/graphql',
      cors(),
      express.json(),
      expressMiddleware(server, {
        context: context, // Your context configuration for Apollo Server
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
