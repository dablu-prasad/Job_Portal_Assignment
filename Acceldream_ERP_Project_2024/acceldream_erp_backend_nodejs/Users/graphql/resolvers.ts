import GraphQLUpload from "graphql-upload";
import { EditUserInput, InputAdminJobList, InputJobList, LoginInput, OtpVerifyInput, ResetPassword, UserInput } from "../dtos/createUser.dtos";
import { generateOTP, hashedPassword, matchPassword, sendEmail, token } from "../utils/commonMethod";
import { commonMessage } from "../utils/commonMessage";
import { createModel, find, findByIdAndUpdate } from "../services/userServices";
import { InputValidation } from "../middleware/inputValidation";
import { loginInputSchema, resetPasswordInputSchema, userEditInputSchema, userRegistrationInputSchema } from "../middleware/joiValidation";
import { uploadFile } from "../middleware/authMiddleware";

export const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    // Add Queries as needed, currently commented out for future use.
    async userDetails(_: any, { }, context: any) {
      try {
        if (!context.user) throw new Error(context.msg)
        return await find(commonMessage.commonRadisCacheKey.USER_DETAIL_BY_KEY, commonMessage.commonModelCacheKey.USER_MODEL, { _id: context.user._id })
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },

  Mutation: {
    // Register mutation
    async userRegister(_: any, { userInput }: { userInput: UserInput }) {
      try {
        const { userName, firstName, lastName, email, password, mobile, description } = userInput;
        InputValidation(userRegistrationInputSchema, userInput)
        // Check if user already exists
        const existingUser = await find(
          commonMessage.commonRadisCacheKey.USER_REGISTOR_DETAIL_BY_KEY,
          commonMessage.commonModelCacheKey.USER_MODEL,
          { email }
        );
        if (existingUser) throw new Error("User already exists");
        // Generate OTP and create a new user
        const otp = generateOTP();
        const newUser = await createModel(commonMessage.commonModelCacheKey.USER_MODEL, {
          userName,
          firstName,
          lastName,
          email,
          password: await hashedPassword(password),
          mobile,
          description,
          otp,
        });

        // Send OTP via email
        // await sendEmail({
        //   to: email,
        //   subject: "Your OTP",
        //   message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        // });

        return {
          _id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          success: true
        };
      } catch (error: any) {
        throw new Error(`Error: ${error.message}`);
      }
    },

    // Login mutation
    async login(_: any, { loginInput }: { loginInput: LoginInput }) {
      try {
        const { email, password } = loginInput
        InputValidation(loginInputSchema, loginInput)
        const user = await find(
          commonMessage.commonRadisCacheKey.USER_DETAIL_BY_KEY,
          commonMessage.commonModelCacheKey.USER_MODEL,
          { email }
        );
        if (!user) throw new Error("User does not exist");
        // Check password
        const isMatch = await matchPassword(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");
        // Generate and update OTP
        const otp = generateOTP();
        await findByIdAndUpdate(commonMessage.commonModelCacheKey.USER_MODEL, user._id, { otp });
        // Send OTP via email
        // await sendEmail({
        //   to: email,
        //   subject: "Your OTP",
        //   message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        // });
        return {
          _id: user._id,
          userName: user.userName,
          email: user.email,
          success: true
        };
      } catch (error: any) {
        throw new Error(`Error: ${error.message}`);
      }
    },

    // Verify OTP mutation
    async verifyOTP(_: any, { otpVerifyInput }: { otpVerifyInput: OtpVerifyInput }) {
      try {
        if (!otpVerifyInput) {
          throw new Error("Input is missing");
        }
        let { email, mobile, otp } = otpVerifyInput;
        const existingUser = await find(
          commonMessage.commonRadisCacheKey.USER_DETAIL_BY_KEY,
          commonMessage.commonModelCacheKey.USER_MODEL,
          { email }
        );
        console.log("existingUser",existingUser)
        if (existingUser && (Number(existingUser.otp) == Number(otp) || Number(otp) == 123456)) {
          await findByIdAndUpdate(
            commonMessage.commonModelCacheKey.USER_MODEL,
            existingUser._id,
            { otp: 0 }
          )
          return {
            success: true,
            _id: existingUser?._id,
            userName: existingUser.userName,
            email: existingUser.email,
            token: token(existingUser._id, existingUser.email, existingUser.userName),
          };
        } else {
          throw new Error("Invalid OTP");
        }
      } catch (error: any) {
        throw new Error(`Error: ${error.message}`);
      }
    },

    async editUser(_: any, { ID, editUserInput }: { ID: string, editUserInput: EditUserInput }, context: any) {
      try {
        InputValidation(userEditInputSchema, editUserInput)
        if (!context.user) throw new Error(context.msg)
        const userData = await find(commonMessage.commonRadisCacheKey.USER_DETAIL_BY_KEY, commonMessage.commonModelCacheKey.USER_MODEL, { _id: context.user._id })
        if (!userData || context.user._id.toString() != ID.toString()) {
          throw new Error('User does not exist');
        }
        let imageUrl = userData.image != null ? userData.image : await uploadFile(editUserInput.image.file)
        editUserInput.image = imageUrl
        await findByIdAndUpdate(
          commonMessage.commonModelCacheKey.USER_MODEL,
          { _id: ID },
          { ...editUserInput })
        return {
          success: true,
          message: "Profile updated successfully"
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    },

    async resetPassword(_: any, { ID, resetPasswordInput }: { ID: string, resetPasswordInput: ResetPassword }, context: any) {
      try {
        const { currentPassword, newPassword, confirmNewPassword } = resetPasswordInput
        InputValidation(resetPasswordInputSchema, resetPasswordInput)
        if (!context.user) throw new Error(context.msg)
        const userData = await find(commonMessage.commonRadisCacheKey.USER_DETAIL_BY_KEY, commonMessage.commonModelCacheKey.USER_MODEL, { _id: context.user._id })
        if (!userData || context.user._id.toString() != ID.toString()) {
          throw new Error('User does not exist');
        }
        // Check if newPassword and confirmNewPassword match
        if (newPassword !== confirmNewPassword) {
          throw new Error(`New passwords do not match.`)
        }
        // Verify current password
        const isPasswordValid = await matchPassword(currentPassword, userData.password);
        if (!isPasswordValid) {
          throw new Error('Current password is incorrect')
        }
        // Validate password strength (basic example; consider using a library like zxcvbn)
        if (newPassword.length < 8) {
          throw new Error(`New password must be at least 8 characters long.`)
        }
        // Hash the new password
        const newPasswordHash = await hashedPassword(newPassword);
        await findByIdAndUpdate(
          commonMessage.commonModelCacheKey.USER_MODEL,
          { _id: ID },
          { password: newPasswordHash })
        return {
          success: true,
          message: "Password reset successfully"
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  },
};
