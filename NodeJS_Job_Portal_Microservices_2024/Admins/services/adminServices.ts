import { envFile } from "../config/envFile";
import { CreateJob } from "../dtos/createUser.dtos";
import adminModel from "../models/adminModel";
import jobModel from "../models/jobModel";
import { client } from "../config/radis_connection";

export const findadmin = async (data: any) => {
    let getAdmin
    let cacheKey=`adminById_${data._id||data.email}`
     getAdmin = await client.get(cacheKey);
    if (getAdmin) {
      return JSON.parse(getAdmin);
    } else {
        getAdmin = await adminModel.findOne(data);
      await client.set(cacheKey, JSON.stringify(getAdmin), { 'EX': envFile.RADIS_EXPIRY_TIME });
      return getAdmin
    }
}
export const findAllAdminList = async (currentPage: number, itemPerPage: number) => {
    try {
        let adminList;
        let cacheKey = `adminList_currentPage_${currentPage}_itemPerPage_${itemPerPage}`
        adminList = await client.get(cacheKey)
        if (adminList) {
            return JSON.parse(adminList)
        } else {
            // Calculate the number of documents to skip
            const skip = (currentPage - 1) * itemPerPage;
            // Fetch the job list from the database with pagination (skip and limit)
            adminList = await adminModel
                .find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(itemPerPage)
            await client.set(cacheKey, JSON.stringify(adminList), { EX: envFile.RADIS_EXPIRY_TIME })
            return adminList;
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
};
export const createJob = async (data: CreateJob) => {
    return await new jobModel(data).save()
}
export const findJob = async (data: any) => {
    return await jobModel.findOne(data)
}
export const commonCodeJobList = async (currentPage: number, itemPerPage: number) => {
    try {
        let jobList;
        const cacheKey = `jobList_currentPage_${currentPage}_itemPerPage_${itemPerPage}`;
        // Check if data exists in cache
        jobList = await client.get(cacheKey);
        if (jobList) {
            return JSON.parse(jobList);
        } else {
            // Calculate the number of documents to skip
            const skip = (currentPage - 1) * itemPerPage;
            // Fetch the job list from the database with pagination (skip and limit)
            jobList = await jobModel
                .find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(itemPerPage)

            await client.set(cacheKey, JSON.stringify(jobList), {
                EX: envFile.RADIS_EXPIRY_TIME,
            });

            return jobList;
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
};

