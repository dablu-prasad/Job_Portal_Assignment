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
jobId:String
jobTitle:String
jobDescription:String
jobExperience:String
}


type Query {
    user(ID: ID!): UserDetail!
    getUser(amount:Int): [UserDetail]
    adminUserList(value:String): [UserDetail]
    jobList:[JobDetail]
}

type Mutation {
    createUser(userInput: UserInput): User!
    login(email: String!, password: String!): User!
    deleteUser(ID: ID!): Boolean
    editUser(ID: ID!, editUserInput: EditUserInput): UserDetail!
    applyOnJob(ID:ID!): JobDetail
}
`;
