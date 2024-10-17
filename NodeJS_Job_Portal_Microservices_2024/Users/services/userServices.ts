import mongoose from "mongoose";
import { client } from "../config/radis_connection";
import userModel from "../models/userModel";
import { envFile } from "../config/envFile";
import applyJobModel from "../models/applyJobModel";

export const createUser=async(data:any)=>{
    return await new userModel(data).save();
}

export const findDetails=async(key:string,modelName:any,data:any)=>{ 
    console.log("kkkkkkk",key,modelName,data)
    let getUser;  
    let cacheKey=`${key}_${data._id||data.email||data.userId}`
    getUser = await client.get(cacheKey);
        if (getUser) {
          return JSON.parse(getUser);
        } else {
           getUser = await modelName.findOne(data)
          await client.set(cacheKey, JSON.stringify(getUser), { 'EX': envFile.RADIS_EXPIRY_TIME });
          console.log("getUser",getUser)
          return getUser
        }
}
export const findUserByIdAndUpdate =async(id:any,updateData:any)=>{ 
    return await userModel.findByIdAndUpdate(id, updateData, {new: true});
}
export const commonUserList =async(currentPage:number,itemPerPage:number)=>{
    try {
        let userList;
        let cacheKey=`userList_currentPage_${currentPage}_itemPerPage_${itemPerPage}`
        userList = await client.get(cacheKey);
        if (userList) {
          return JSON.parse(userList);
        } else {
            let skip=(currentPage-1)*itemPerPage
          userList = await userModel.find().sort({ createdAt: -1 }).skip(skip).limit(itemPerPage)
          await client.set(cacheKey, JSON.stringify(userList), { 'EX': envFile.RADIS_EXPIRY_TIME });   
          return userList;
          // sentQueueRabbitMQ("message_queue_user",userList)
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
}
export const userApplyForJob=async(data:any)=>{
    return new applyJobModel(data).save()
}