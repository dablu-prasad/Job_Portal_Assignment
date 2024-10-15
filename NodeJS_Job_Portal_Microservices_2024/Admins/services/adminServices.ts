import { envFile } from "../config/envFile";
import { CreateJob } from "../dtos/createUser.dtos";
import adminModel from "../models/adminModel";
import jobModel from "../models/jobModel";
import { client } from "../config/radis_connection";

export const findadmin =async(data:any)=>{ 
    return await adminModel.findOne(data);
}

export const createJob =async(data:CreateJob)=>{ 
    return await new jobModel(data).save()
}

export const findJob=async(data:any)=>{
    return await jobModel.findOne(data)
}

export const commonCodeuserList=async(amount:number)=>{
    try {
        let jobList;
      jobList = await client.get('jobList');
      if (jobList) {
        return JSON.parse(jobList);
      } else {
        jobList = await jobModel.find().sort({ createdAt: -1 }).limit(amount)
        await client.set('jobList', JSON.stringify(jobList), { 'EX': envFile.RADIS_EXPIRY_TIME });
        return jobList
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
