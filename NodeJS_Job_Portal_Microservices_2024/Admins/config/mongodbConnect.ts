import mongoose from 'mongoose';
import { envFile } from './envFile';

export const connectDB=async()=>{
    const conn=await mongoose.connect(envFile.MONGODB_URL);
    console.log(`MongoDB Connected:${conn.connection.host}`)
}