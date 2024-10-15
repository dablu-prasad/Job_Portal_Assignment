import GraphQLUpload from "graphql-upload";
import { envFile } from "../config/envFile";
import { client } from "../config/radis_connection";
import { EditUserInput, UserInput } from "../dtos/createUser.dtos";
// import { uploadFile } from "../middleware/authMiddleware";
import userModel from "../models/userModel";
import { commonUserList, findUser, findUserByIdAndUpdate, userApplyForJob } from "../services/userServices";
import { hashedPassword, matchPassword, sentQueueRabbitMQ, token } from "../utils/commonMethod";
import { uploadFile } from "../middleware/authMiddleware";
import axios from "axios";
import { JOB_BY_ID_QUERY, JOB_LIST_QUERY } from "../utils/commonQuery";
export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    async user(_: any, { ID }: { ID: string }, context: any) {
      try {
        if (!context.user) throw new Error(context.msg)
        const getUser = await client.get('userById');
        if (getUser) {
          return JSON.parse(getUser);
        } else {
          const userList = await userModel.findById(ID)
          await client.set('userById', JSON.stringify(userList), { 'EX': envFile.RADIS_EXPIRY_TIME });
          return userList
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    async getUser(_: any, { }, context: any) {
      try {
        if (!context.user) throw new Error(context.msg)
         return await  commonUserList()
        }
       catch (error) {
        throw new Error(`${error}`);
      }
    },
    async adminUserList(_: any, {value}:{value:string}, context: any) {
      try {
        if(value!=envFile.ADMIN_EXCHANGE_CODE) throw new Error("Admin don't have Authority")
         return await  commonUserList()
        }
       catch (error) {
        throw new Error(`${error}`);
      }
    },
    async jobList(_: any, { }, context: any) {
      //  return await consumeDataFromRabbitMQ("message_queue_user")
      if (!context.user) throw new Error(context.msg)
      try {
        const data = await axios({
          url: envFile.ADMIN_API_URL,
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            query: JOB_LIST_QUERY,
            variables: { jobList: envFile.USER_EXCHANGE_CODE }
          }
        })
        return data.data.data.userJobList;
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  },

  Mutation: {
    // Register mutation
    async createUser(_: any, { userInput }: { userInput: UserInput }) {
      try {
        const { userName, email, password, mobile, description } = userInput;
        // Check if user already exists
        if (await findUser({ email: email })) {
          throw new Error('User already exists');
        }
        // Create new user
        const newUser = await new userModel({
          userName,
          email,
          password: await hashedPassword(password), // Hash Password
          mobile,
          description
        }).save();
        return {
          id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          token: token(newUser._id, newUser.email, newUser.userName)
        };
      } catch (error) {
        throw new Error(`Error:${error}`);
      }
    },

    async login(_: any, { email, password }: { email: string, password: string }) {
      try {
        let user = await findUser({ email: email })
        if (!user) {
          throw new Error('User does not exist');
        }
        let match = await matchPassword(password, user.password);
        if (!match) {
          throw new Error('Invalid credentials');
        }
        // Return the user data without using _doc
        return {
          id: user._id,
          userName: user.userName,
          email: user.email,
          token: token(user._id, user.email, user.userName),
        };
      } catch (err) {
        throw new Error(`Error:${err}`);
      }
    },

    async editUser(_: any, { ID, editUserInput }: { ID: string, editUserInput: EditUserInput }, context: any) {
      try {
        if (!context.user) throw new Error(context.msg)
        if (!await findUser({ _id: context.user.id }) || context.user.id.toString() != ID.toString()) {
          throw new Error('User does not exist');
        }
        const imageUrl = await uploadFile(editUserInput.image.file)
        editUserInput.image = imageUrl
        return await findUserByIdAndUpdate({ _id: ID }, { ...editUserInput })
      } catch (error) {
        throw new Error(`${error}`);
      }
    },

    async applyOnJob(_: any, { ID }: { ID: string }, context: any) {
      try {
        if (!context.user) throw new Error(context.msg)
          const data = await axios({
            url: envFile.ADMIN_API_URL,
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              query: JOB_BY_ID_QUERY,
              variables: { inputJobById:{ID:ID,value: envFile.USER_EXCHANGE_CODE} }
            }
          })
          if(!data.data.data.jobDetailById)
          {
            throw new Error("Job Detail not available")
          }
          return await userApplyForJob({userId:context.user.id,jobId:ID})
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }
}