import { envFile } from "../config/envFile";
import { client } from "../config/radis_connection";
import { CreateJob } from "../dtos/createUser.dtos";
import adminModel from "../models/adminModel";
import jobModel from "../models/jobModel";
import { createJob, findadmin, findJob } from "../services/adminServices";
import { matchPassword, token } from "../utils/commonMethod";
import { request, gql } from 'graphql-request';

export const resolvers = {
  Query: {
    async admin(_: any, { ID }: { ID: string }) {
      try {
        const getAdmin = await client.get('adminById');
        if (getAdmin) {
          return JSON.parse(getAdmin);
        } else {
          const adminData = await adminModel.findById(ID)
          await client.set('adminById', JSON.stringify(adminData), { 'EX': envFile.RADIS_EXPIRY_TIME });
          return adminData
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },
    async adminList(_: any, { amount }: { amount: number }) {
      try {
        let adminList;
        adminList = await client.get('adminList');
        if (adminList) {
          return JSON.parse(adminList);
        } else {
          adminList = await adminModel.find().sort({ createdAt: -1 }).limit(amount)
          await client.set('adminList', JSON.stringify(adminList), { 'EX': envFile.RADIS_EXPIRY_TIME });
          return adminList
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },
    async jobList(_: any, { amount }: { amount: number }) {
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
        console.error('Error fetching jobList:', error);
        throw error;
      }
    },
    async userList(_: any) {
      //  return await consumeDataFromRabbitMQ("message_queue_user")
      const query = gql`
        query AdminFetchUserList {
          getUser{
            _id
            userName
            email
            mobile
            description
          }
        }
      `;
      try {
        const data = await request(envFile.USER_API_URL, query);
        return data.getUser;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    }
  },

  Mutation: {
    //Admin Login
    async login(_: any, { email, password }: { email: string, password: string }) {
      try {
        let admin = await findadmin({ email: email })
        if (!admin) {
          throw new Error('User does not exist');
        }
        if (!await matchPassword(password, admin.password)) {
          throw new Error('Invalid credentials');
        }
        return {
          id: admin._id,
          adminName: admin.adminName,
          email: admin.email,
          token: token(admin._id, admin.email, admin.adminName),
        };
      } catch (err) {
        throw new Error(`Error:${err}`);
      }
    },

    async createJob(_: any, { createJobInput }: { createJobInput: CreateJob }, context: any) {

      if (await findJob({ jobId: createJobInput.jobId })) {
        throw new Error("Job Id is already Exist")
      }
      createJobInput.adminId = context.id
      return await createJob(createJobInput)
    }
  }
}