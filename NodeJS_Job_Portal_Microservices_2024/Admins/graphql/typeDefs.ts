
// GraphQL Schema
export const typeDefs = `#graphql
type Admin {
    id: ID!
    adminName: String!
    email: String!
    token: String
}

type AdminDetail {
    _id: String!
    adminName: String
    email: String
    mobile: String
    description: String
}

type UserDetail {
    _id: String!
    userName: String
    email: String
    mobile: String
    description: String
}

input AdminInput {
    adminName: String!
    email: String!
    password: String!
    mobile: String
    description: String
}


input EditAdminInput {
    adminName: String!
    email: String!
    mobile: String
    description: String
}

type CreateJobResDetail{
jobId:String!
jobTitle:String!
jobExperience:String!
jobDescription:String!
adminId:String!
}

input CreateJobInput{
jobId:String!
jobTitle:String!
jobExperience:String!
jobDescription:String!
}

type Query {
    admin(ID: ID!): AdminDetail!
    adminList(amount: Int): [AdminDetail]
    userList: [UserDetail]
    jobList:[CreateJobResDetail]
}

type Mutation {
    login(email: String!, password: String!): Admin!
    createJob(createJobInput:CreateJobInput!):CreateJobResDetail!
}
`;
