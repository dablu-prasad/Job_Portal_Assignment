import { ApolloServer, gql } from 'apollo-server-express';
// GraphQL Schema
export const typeDefs = gql`
scalar Upload

type User {
    id: ID!
    userName: String!
    email: String!
    token: String
}

type UserDetail {
    _id: String!
    userName: String
    email: String
    mobile: String
    description: String
    image:String
}

input UserInput {
    userName: String!
    email: String!
    password: String!
    mobile: String
    description: String
}

input EditUserInput {
    userName: String!
    email: String!
    mobile: String
    description: String
    image:Upload!
}

type JobDetail{
_id:String
jobId:String
jobTitle:String
jobDescription:String
jobExperience:String
}

type applyJob{
userId:String,
jobId:String
}

input InputJobList{
currentPage:Int,
itemPerPage:Int
}

type Query {
    user(ID: ID!): UserDetail!
    getUser(amount:Int): [UserDetail]
    adminUserList(value:String): [UserDetail]
    jobList(inputJobList:InputJobList):[JobDetail]
}

type Mutation {
    createUser(userInput: UserInput): User!
    login(email: String!, password: String!): User!
    deleteUser(ID: ID!): Boolean
    editUser(ID: ID!, editUserInput: EditUserInput): UserDetail!
    applyOnJob(ID:ID!): applyJob
}
`;
