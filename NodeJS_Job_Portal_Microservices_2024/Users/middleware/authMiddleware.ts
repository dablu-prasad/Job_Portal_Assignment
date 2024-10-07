import jwt from 'jsonwebtoken';
import { envFile } from '../config/envFile';
import { ExpressContextFunctionArgument } from '@apollo/server/express4'; 
import { AuthenticationError } from 'apollo-server';
import path from "path"
import fs from "fs"
import Upload from 'graphql-upload'
import multer from "multer"
import { findUser } from '../services/userServices';
import {JwtPayload} from 'jsonwebtoken'


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
  // allowing the 'CreateUser' and 'Login' queries to pass without giving the token
  if (
    req.body.operationName === 'CreateUser' ||
    req.body.operationName === 'Login' ||
    req.body.operationName === 'AdminFetchUserList'
  ) {
    return {};
  }
  // get the user token from the headers
  const token = req.headers.authorization || '';
  console.log("token==============>",token)
  // try to retrieve a user with the token
  const user = await getUser(token);
  console.log("user==============>",user)
  if (!user || !await findUser({email:(user as JwtPayload)?.email})) {
    console.error('User is not Authenticated:');
    throw new AuthenticationError('User is not authenticated');
  }
  return req.user=user;
};

export const uploadFile = async (file:any) => {
  let imageUrl = null;
  if (file) {
    const { createReadStream, filename, mimetype, encoding } = await file; // Use `await` here as `file` is a Promise
    const stream = await createReadStream();
    const uploadPath = await path.join('./dist/uploads', filename);
    console.log("uploadPath",uploadPath)
    const out = await fs.createWriteStream(uploadPath);
    // Pipe the stream to the output file
    await stream.pipe(out);
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

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save to 'uploads' folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // Rename file with timestamp
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10000000 }, // 10 MB max file size
});
