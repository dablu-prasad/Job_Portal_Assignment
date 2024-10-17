import { envFile } from "../config/envFile";
import { CreateJob } from "../dtos/createUser.dtos";
import adminModel from "../models/adminModel";
import jobModel from "../models/jobModel";
import { client } from "../config/radis_connection";

export const findadmin =async(data:any)=>{ 
    return await adminModel.findOne(data);
}
export const findAllAdminList = async (currentPage: number, itemPerPage: number) => {
    try {
        // Calculate the number of documents to skip
        const skip = (currentPage - 1) * itemPerPage;
        // Fetch the job list from the database with pagination (skip and limit)
        return await adminModel
          .find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(itemPerPage)
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

export const createJob =async(data:CreateJob)=>{ 
    return await new jobModel(data).save()
}

export const findJob=async(data:any)=>{
    return await jobModel.findOne(data)
}

export const commonCodeuserList = async (currentPage: number, itemPerPage: number) => {
    try {
        // Calculate the number of documents to skip
        const skip = (currentPage - 1) * itemPerPage;
        // Fetch the job list from the database with pagination (skip and limit)
        return await jobModel
          .find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(itemPerPage)
    } catch (error) {
      throw new Error(`${error}`);
    }
  };
  
