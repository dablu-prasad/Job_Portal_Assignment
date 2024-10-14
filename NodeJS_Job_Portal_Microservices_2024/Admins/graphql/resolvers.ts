import { AuthenticationError } from "apollo-server";
import { envFile } from "../config/envFile";
import { client } from "../config/radis_connection";
import { CreateJob } from "../dtos/createUser.dtos";
import adminModel from "../models/adminModel";
import jobModel from "../models/jobModel";
import { commonCodeuserList, createJob, findadmin, findJob } from "../services/adminServices";
import { matchPassword, token } from "../utils/commonMethod";
import { request, gql } from 'graphql-request';
import { USER_LIST_QUERY } from "../utils/commonQuery";
import axios from "axios"

export const resolvers = {
  Query: {
    async admin(_: any, { ID }: { ID: string }, context: any) {
      try {
        if (!context.admin) throw new Error(context.msg)
        const getAdmin = await client.get('adminById');
        if (getAdmin) {
          return JSON.parse(getAdmin);
        } else {
          const adminData = await adminModel.findById(ID)
          await client.set('adminById', JSON.stringify(adminData), { 'EX': envFile.RADIS_EXPIRY_TIME });
          return adminData
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async adminList(_: any, { amount }: { amount: number }, context: any) {
      try {
        if (!context.admin) throw new Error(context.msg)
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
        throw new Error(`${error}`);
      }
    },
    async jobList(_: any, { amount}: { amount: number },context:any) {
      try{
        if (!context.admin) throw new Error(context.msg)
         return await commonCodeuserList(amount)
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async userJobList(_: any, { amount=100,value }: { amount: number,value:string }) {
      try{
        if(value!=envFile.USER_EXCHANGE_CODE) throw new Error("User don't have Authority")
        return await commonCodeuserList(amount)
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async userList(_: any,{},context:any) {
      //  return await consumeDataFromRabbitMQ("message_queue_user")
      try {
        if (!context.admin) throw new Error(context.msg)
        const data = await axios({
          url: envFile.USER_API_URL,
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            query: USER_LIST_QUERY,
            variables: { userData: envFile.ADMIN_EXCHANGE_CODE }
          }
        })
        return data.data.data.adminUserList;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async jobById(_: any, { ID }: { ID: string },context:any) {
      try {

      } catch (error) {
        throw new Error(`${error}`);
      }
    },
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
      } catch (error) {
        throw new Error(`${error}`);
      }
    },

    async createJob(_: any, { createJobInput }: { createJobInput: CreateJob }, context: any) {
      try {
        if (!context.admin) throw new Error(context.msg)
        if (await findJob({ jobId: createJobInput.jobId })) {
          throw new Error("Job Id is already Exist")
        }
        createJobInput.adminId = context.user.id
        return await createJob(createJobInput)
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }
}