import mongoose from "mongoose";
import { client } from "../config/radis_connection";
import userModel from "../models/userModel";

export const findUser =async(data:any)=>{ 
    console.log("==============>EmailID Token=====>",data)
    return await userModel.findOne(data);
}

export const findUserByIdAndUpdate =async(id:any,updateData:any)=>{ 
    console.log("==============>updateData=====>",updateData,id)
    return await userModel.findByIdAndUpdate(id, updateData, {new: true});
}