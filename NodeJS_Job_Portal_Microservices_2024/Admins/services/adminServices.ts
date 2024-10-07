import { CreateJob } from "../dtos/createUser.dtos";
import adminModel from "../models/adminModel";
import jobModel from "../models/jobModel";

export const findadmin =async(data:any)=>{ 
    return await adminModel.findOne(data);
}

export const createJob =async(data:CreateJob)=>{ 
    return await new jobModel(data).save()
}

export const findJob=async(data:any)=>{
    return await jobModel.findOne(data)
}