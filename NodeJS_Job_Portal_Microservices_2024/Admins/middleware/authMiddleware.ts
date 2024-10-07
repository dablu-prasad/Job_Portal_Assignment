import jwt from 'jsonwebtoken';
import { envFile } from '../config/envFile';
import { ExpressContextFunctionArgument } from '@apollo/server/express4'; 
import { AuthenticationError } from 'apollo-server';
import path from "path"
import fs from "fs"
import Upload from 'graphql-upload'
import multer from "multer"
import { findadmin } from '../services/adminServices';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express' {
    export interface Request {
      user?: any; // Define the type for your 'user' property (change 'any' to a more specific type if possible)
    }
  }
const getUser = async (token:any) => {
  try {
    let user=null
    if (token) {
        try {
            user = jwt.verify(token, envFile.SECRET_KEY); // Replace 'your_secret_key' with your JWT secret
          } catch (err) {
            console.error('Invalid token',err);
          }
    }
    return user;
  } catch (error) {
    return null;
  }
};
export const context = async ( {req,res}:ExpressContextFunctionArgument) => {
  if (req.body.operationName === 'IntrospectionQuery') {
    return {};
  }
  if (
    req.body.operationName === 'CreateUser' ||
    req.body.operationName === 'Login'   ||
    req.body.operationName === "UserJobList"
  ) {
    return {};
  }
  // get the user token from the headers
  const token = req.headers.authorization || '';
  const admin = await getUser(token);
  if (!admin || !await findadmin({email:(admin as JwtPayload)?.email})) {
    console.error('Admin is not Authenticated:');
    throw new AuthenticationError('User is not authenticated');
  }
  return req.admin=admin;
};

export const uploadFile = async (file:any) => {
  let imageUrl = null;
  if (file) {
    const { createReadStream, filename, mimetype, encoding } = await file; // Use `await` here as `file` is a Promise
    const stream = createReadStream();
    const uploadPath = path.join(__dirname, 'uploads', filename);
    const out = fs.createWriteStream(uploadPath);
    // Pipe the stream to the output file
    stream.pipe(out);
    // Wait for the stream to finish writing
    await new Promise((resolve, reject) => {
      out.on('finish', resolve);
      out.on('error', reject);
    });
    // Construct the URL to the uploaded image
    imageUrl = `/uploads/${filename}`;
  }
  return imageUrl; // Return the image URL
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Define the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with a timestamp
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10000000 }, // 10 MB max file size
});
