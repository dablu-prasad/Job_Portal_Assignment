import { ApolloServer, gql } from 'apollo-server-express';

// GraphQL Schema
export const typeDefs = gql`
scalar Upload

type User {
    _id:ID
    userName: String!
    email: String!
    mobile: String!
    token: String
    success: Boolean
    message: String
}

input UserInput {
    userName: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    mobile: String!
    description: String
    image: String
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
    # Example Query
    userDetails: User
}

type Mutation {
    userRegister(userInput: UserInput): User!
    verifyOTP(otpVerifyInput: VerifyOTPInput): User!
    login(loginInput: LoginInput): User!
}
`;
