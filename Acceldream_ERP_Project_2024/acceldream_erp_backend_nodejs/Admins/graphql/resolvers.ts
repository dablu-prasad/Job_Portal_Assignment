
import { envFile } from "../config/envFile";
import { CreateJob, InputJobById, InputUserJobList } from "../dtos/createUser.dtos";
import { commonCodeJobList, createJob, findadmin, findAllAdminList, findJob } from "../services/adminServices";
import { matchPassword, token } from "../utils/commonMethod";
import { USER_LIST_QUERY } from "../utils/commonQuery";
import axios from "axios"

export const resolvers = {
  Query: {
    async admin(_: any, { ID }: { ID: string }, context: any) {
      try {
        if (!context.admin) throw new Error(context.msg)
        return  await findadmin({_id:ID})
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async adminList(_: any, { currentPage,itemPerPage }: { currentPage: number,itemPerPage:number }, context: any) {
      try {
        if (!context.admin) throw new Error(context.msg)
          return await findAllAdminList(currentPage,itemPerPage)
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async jobList(_: any, { currentPage,itemPerPage}: { currentPage: number,itemPerPage:number },context:any) {
      try{
        if (!context.admin) throw new Error(context.msg)
         return await commonCodeJobList(currentPage,itemPerPage)
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async userJobList(_: any, { inputUserJobList }: { inputUserJobList:InputUserJobList }) {
      try{
        if(inputUserJobList.value!=envFile.USER_EXCHANGE_CODE) throw new Error("User don't have Authority")
        return await commonCodeJobList(inputUserJobList.currentPage,inputUserJobList.itemPerPage)
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async userList(_: any,{currentPage,itemPerPage}:{currentPage:number,itemPerPage:number},context:any) {
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
            variables: { inputAdminUserList:{currentPage:currentPage,itemPerPage:itemPerPage,value: envFile.ADMIN_EXCHANGE_CODE }}
          }
        })
        return data.data.data.adminUserList;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async jobDetailById(_: any, { inputJobById }:{inputJobById:InputJobById}) {
      try {
        if(inputJobById.value!=envFile.USER_EXCHANGE_CODE) throw new Error("User don't have Authority")
          return await findJob({_id:inputJobById.ID})
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
    },
  
  }
}