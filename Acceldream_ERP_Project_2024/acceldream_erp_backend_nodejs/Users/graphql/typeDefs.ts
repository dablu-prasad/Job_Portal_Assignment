import { ApolloServer, gql } from 'apollo-server-express';

// GraphQL Schema
export const typeDefs = gql`
scalar Upload

type User {
    _id:ID
    userName: String
    firstName: String
    lastName: String
    email: String
    mobile: String
    user_designation: String
    approval_manager: String
    company_dealer_name: String
    branch: String
    address: String
    state: String
    city: String
    pin: String
    country: String
    module: String
    description: String
    token: String
    image:String
    success: Boolean
    message: String
}

input UserInput {
    userName: String!
    firstName: String!
    lastName: String!
    email: String!
    mobile: String!
    user_designation: String
    approval_manager: String
    company_dealer_name: String
    branch: String
    address: String
    state: String
    city: String
    pin: String
    country: String
    module: String
    description: String
}

input EditUserInput {
    userName: String!
    firstName: String!
    lastName: String!
    email: String!
    mobile: String!
    description: String
    image: Upload!
}
    input ResetPasswordInput{
    currentPassword:String
    newPassword:String
    confirmNewPassword:String
    }

input VerifyOTPInput {
    email: String!
    mobile: String!
    otp: String!
}

input LoginInput {
    email: String!
    password: String!
}

type Query {
    userDetails: User
    users: [User]
}

type Mutation {
    userRegister(userInput: UserInput): User!
    verifyOTP(otpVerifyInput: VerifyOTPInput): User!
    login(loginInput: LoginInput): User!
    editUser(ID: ID!, editUserInput: EditUserInput): User!
    resetPassword(ID:ID!,resetPasswordInput:ResetPasswordInput):User!
}
`;
