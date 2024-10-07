import GraphQLUpload from "graphql-upload";
import { envFile } from "../config/envFile";
import { client } from "../config/radis_connection";
import { EditUserInput, UserInput } from "../dtos/createUser.dtos";
// import { uploadFile } from "../middleware/authMiddleware";
import userModel from "../models/userModel";
import { findUser, findUserByIdAndUpdate } from "../services/userServices";
import { hashedPassword, matchPassword, sentQueueRabbitMQ, token } from "../utils/commonMethod";
import { uploadFile } from "../middleware/authMiddleware";
import {gql,request} from "graphql-request";
export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    async user(_: any, { ID }: { ID: string }, contextValue: any) {
      try {
        const getUser = await client.get('userById');
        if (getUser) {
          return JSON.parse(getUser);
        } else {
          const userList = await userModel.findById(ID)
          await client.set('userById', JSON.stringify(userList), { 'EX': envFile.RADIS_EXPIRY_TIME });
          return userList
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },
    async getUser(_: any) {
      try {
        let userList;
         userList = await client.get('userList');
        if(userList)
        {
            return JSON.parse(userList);
        } else{
         userList = await userModel.find().sort({ createdAt: -1 })//.limit(amount)
          await client.set('userList', JSON.stringify(userList), {'EX':envFile.RADIS_EXPIRY_TIME});
          // sentQueueRabbitMQ("message_queue_user",userList)
        return userList
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },
    async jobList(_: any) {
      //  return await consumeDataFromRabbitMQ("message_queue_user")
      const query = gql`
        query UserJobList {
          jobList{
            jobId
            jobTitle
            jobDescription
            jobExperience
          }
        }
      `;
      try {
        const data = await request(envFile.ADMIN_API_URL, query);
        return data.jobList;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    }
  },

  Mutation: {
    // Register mutation
    async createUser(_: any, { userInput }: { userInput: UserInput }) {
      try {
        const { userName, email, password, mobile, description } = userInput;
        // Check if user already exists
        if (await findUser({email:email})) {
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
          token: token(newUser._id, newUser.email,newUser.userName)
        };
      } catch (error) {
        throw new Error(`Error:${error}`);
      }
    },

    async login(_: any, { email, password }: { email: string, password: string }) {
      try {
        let user = await findUser({email:email})
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
          token: token(user._id, user.email,user.userName),
        };
      } catch (err) {
        throw new Error(`Error:${err}`);
      }
    },

    async editUser(_: any, { ID, editUserInput }: { ID: string, editUserInput: EditUserInput },context:any) {
      try {
        if (!await findUser({_id:context.id}) || context.id!=ID) {
          throw new Error('User does not exist');
        }
        const imageUrl=await uploadFile(editUserInput.image.file)
        editUserInput.image=imageUrl
       return await findUserByIdAndUpdate({_id:ID},{...editUserInput})
      } catch (error) {
        throw new Error(`Error:${error}`);
      }
    },
  }
}