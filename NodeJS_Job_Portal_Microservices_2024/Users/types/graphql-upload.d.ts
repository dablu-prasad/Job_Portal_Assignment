declare module 'graphql-upload' {
    import { RequestHandler } from 'express';
  
    export default function graphqlUploadExpress(options?: {
      maxFileSize?: number;
      maxFiles?: number;
    }): RequestHandler;
  }
  