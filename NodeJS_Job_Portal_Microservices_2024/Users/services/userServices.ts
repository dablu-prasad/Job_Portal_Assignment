import mongoose from "mongoose";
import { client } from "../config/radis_connection";
import userModel from "../models/userModel";
import { envFile } from "../config/envFile";

export const findUser =async(data:any)=>{ 
    return await userModel.findOne(data);
}

export const findUserByIdAndUpdate =async(id:any,updateData:any)=>{ 
    return await userModel.findByIdAndUpdate(id, updateData, {new: true});
}

export const commonUserList =async()=>{
    try {
        let userList;
        userList = await client.get('userList');
        if (userList) {
          return JSON.parse(userList);
        } else {
          userList = await userModel.find().sort({ createdAt: -1 })//.limit(amount)
          await client.set('userList', JSON.stringify(userList), { 'EX': envFile.RADIS_EXPIRY_TIME });
          // sentQueueRabbitMQ("message_queue_user",userList)
          return userList
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
}
