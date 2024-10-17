import jwt from 'jsonwebtoken';
import { envFile } from '../config/envFile';
import { ExpressContextFunctionArgument } from '@apollo/server/express4'; 
import path from "path"
import fs from "fs"
import multer from "multer"
import { findDetails } from '../services/userServices';
import {JwtPayload} from 'jsonwebtoken'
import { BaseContext } from '../dtos/createUser.dtos';
import { commonMessage } from '../utils/commonMessage';


declare module 'express' {
    export interface Request {
      user?: any; // Define the type for your 'user' property (change 'any' to a more specific type if possible)
    }
  }

export const context = async ( {req,res}:ExpressContextFunctionArgument):Promise<BaseContext> => {
  let user=null;
 let msg=""
 try{
 const token = req.headers.authorization || '';
 if(!token)
 {
   msg="User token required !!"
   return {res,req,user,msg}
 }
 user = await jwt.verify(token, envFile.SECRET_KEY); 
 if (!user || !await findDetails(commonMessage.commonRadisCacheKey.USER_DETAIL_BY_KEY,commonMessage.commonModelCacheKey.USER_MODEL,{email:(user as JwtPayload)?.email})) {
   msg="Invalid Token !!"
   return {res,req,user,msg}
 }
 return {req,res,user,msg};
} catch(error){
 msg="User is not Authenticated !!"
 return {res,req,user,msg}
}
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
