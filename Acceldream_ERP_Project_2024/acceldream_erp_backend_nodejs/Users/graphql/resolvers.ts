import GraphQLUpload from "graphql-upload";
import { envFile } from "../config/envFile";
import { client } from "../config/radis_connection";
import { EditUserInput, InputAdminJobList, InputJobList, OtpVerifyInput, UserInput } from "../dtos/createUser.dtos";
// import { uploadFile } from "../middleware/authMiddleware";
import userModel from "../models/userModel";
import { generateOTP, hashedPassword, matchPassword, sendEmail, sentQueueRabbitMQ, token } from "../utils/commonMethod";
import { uploadFile } from "../middleware/authMiddleware";
import axios from "axios";
import { JOB_BY_ID_QUERY, JOB_LIST_QUERY } from "../utils/commonQuery";
import { commonMessage } from "../utils/commonMessage";
import { createModel, find, findByIdAndUpdate, findOneAndDelete } from "../services/userServices";
export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    // async user(_: any, { ID }: { ID: string }, context: any) {
    //   try {
    //     if (!context.user) throw new Error(context.msg)
    //     return await findDetails(commonMessage.commonRadisCacheKey.USER_DETAIL_BY_KEY, commonMessage.commonModelCacheKey.USER_MODEL, { _id: ID })
    //   } catch (error) {
    //     throw new Error(`${error}`);
    //   }
    // },
    // async getUser(_: any, { currentPage, itemPerPage }: { currentPage: number, itemPerPage: number }, context: any) {
    //   try {
    //     if (!context.user) throw new Error(context.msg)
    //     return await commonUserList(currentPage, itemPerPage)
    //   }
    //   catch (error) {
    //     throw new Error(`${error}`);
    //   }
    // },
    // async adminUserList(_: any, { inputAdminUserList }: { inputAdminUserList: InputAdminJobList }, context: any) {
    //   try {
    //     if (inputAdminUserList.value != envFile.ADMIN_EXCHANGE_CODE) throw new Error("Admin don't have Authority")
    //     return await commonUserList(inputAdminUserList.currentPage, inputAdminUserList.itemPerPage)
    //   }
    //   catch (error) {
    //     throw new Error(`${error}`);
    //   }
    // },
    // async jobList(_: any, { inputJobList }: { inputJobList: InputJobList }, context: any) {
    //   //  return await consumeDataFromRabbitMQ("message_queue_user")
    //   if (!context.user) throw new Error(context.msg)
    //   try {
    //     const data = await axios({
    //       url: envFile.ADMIN_API_URL,
    //       method: 'post',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       data: {
    //         query: JOB_LIST_QUERY,
    //         variables: { inputUserJobList: { currentPage: inputJobList.currentPage, itemPerPage: inputJobList.itemPerPage, value: envFile.USER_EXCHANGE_CODE } }
    //       }
    //     })
    //     return data.data.data.userJobList;
    //   } catch (error) {
    //     throw new Error(`${error}`);
    //   }
    // },
    // async userAplliedJobList(_: any, { userId }: { userId: String }, context: any) {
    //   try {
    //     if (!context.user) throw new Error(context.msg)
    //     return await findDetails(commonMessage.commonRadisCacheKey.JOB_DETAIL_BY_KEY, commonMessage.commonModelCacheKey.JOB_MODEL, { userId: userId })
    //   } catch (error) {
    //     throw new Error(`${error}`)
    //   }
    // }
  },

  Mutation: {
    // Register mutation
    async userRegister(_: any, { userInput }: { userInput: UserInput }) {
      try {
        const { userName, firstName, lastName, email, password, mobile, description } = userInput;
        if (await find(commonMessage.commonRadisCacheKey.USER_DETAIL_BY_KEY, commonMessage.commonModelCacheKey.USER_MODEL, { mobile: mobile })) {
          throw new Error('User already exists');
        }
        const otp = generateOTP(); // Generate a 6-digit OTP
        const newUser = await createModel(commonMessage.commonModelCacheKey.USER_MODEL,
          {
            userName,
            firstName,
            lastName,
            email,
            password: await hashedPassword(password), // Hash Password
            mobile,
            description,
            otp
          })
        // Send OTP via email
        await sendEmail({
          to: email,
          subject: 'Your OTP',
          message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        });
        return {
          id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
        };
      } catch (error) {
        throw new Error(`Error:${error}`);
      }
    },

    async login(_: any, { email, password }: { email: string, password: string }) {
      try {
        let user = await find(commonMessage.commonRadisCacheKey.USER_DETAIL_BY_KEY, commonMessage.commonModelCacheKey.USER_MODEL, { email: email })
        if (!user) {
          throw new Error('User does not exist');
        }
        let match = await matchPassword(password, user.password);
        const otp = generateOTP(); // Generate a 6-digit OTP
        if (!match) {
          throw new Error('Invalid credentials');
        }
        await findByIdAndUpdate(commonMessage.commonModelCacheKey.USER_MODEL,user._id,{otp:otp})
       // Send OTP via email
       await sendEmail({
        to: email,
        subject: 'Your OTP',
        message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
      });
      return {
        id: user._id,
        userName: user.userName,
        email: user.email,
      };
      } catch (err) {
        throw new Error(`Error:${err}`);
      }
    },


    async verifyOTP(_: any, { otpVerifyInput }: { otpVerifyInput: OtpVerifyInput }) {
      try {
        const { email, mobile, otp } = otpVerifyInput;
        const existingOTP = await find(commonMessage.commonRadisCacheKey.USER_DETAIL_BY_KEY, commonMessage.commonModelCacheKey.USER_MODEL, { email: email, mobile: mobile, otp: otp })
        console.log("existingOTP", existingOTP)
        if (existingOTP) {
          return {
            success: true,
            message: 'OTP verification successful',
            id: existingOTP._id,
            userName: existingOTP.userName,
            email: existingOTP.email,
            token: token(existingOTP._id, existingOTP.email, existingOTP.userName)
          };
        } else {
          // OTP is invalid
          throw new Error('Invalid OTP');
        }
      } catch (error) {
        throw new Error(`Error:${error}`);
      }
    },


    // async editUser(_: any, { ID, editUserInput }: { ID: string, editUserInput: EditUserInput }, context: any) {
    //   try {
    //     if (!context.user) throw new Error(context.msg)
    //     const userData = await findDetails(commonMessage.commonRadisCacheKey.USER_DETAIL_BY_KEY, commonMessage.commonModelCacheKey.USER_MODEL, { _id: context.user.id })
    //     if (!userData || context.user.id.toString() != ID.toString()) {
    //       throw new Error('User does not exist');
    //     }
    //     let imageUrl = userData.image != null ? userData.image : await uploadFile(editUserInput.image.file)
    //     editUserInput.image = imageUrl
    //     return await findUserByIdAndUpdate({ _id: ID }, { ...editUserInput })
    //   } catch (error) {
    //     throw new Error(`${error}`);
    //   }
    // },

    // async applyOnJob(_: any, { ID }: { ID: string }, context: any) {
    //   try {
    //     if (!context.user) throw new Error(context.msg)
    //     const data = await axios({
    //       url: envFile.ADMIN_API_URL,
    //       method: 'post',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       data: {
    //         query: JOB_BY_ID_QUERY,
    //         variables: { inputJobById: { ID: ID, value: envFile.USER_EXCHANGE_CODE } }
    //       }
    //     })
    //     if (!data.data.data.jobDetailById) {
    //       throw new Error("Job Detail not available")
    //     }
    //     return await userApplyForJob({ userId: context.user.id, jobId: ID })
    //   } catch (error) {
    //     throw new Error(`${error}`);
    //   }
    // }
  }
}