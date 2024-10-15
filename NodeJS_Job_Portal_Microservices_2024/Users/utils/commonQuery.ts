import { gql } from "graphql-request";
import { envFile } from "../config/envFile";

export const JOB_LIST_QUERY = gql`
query UserJobList($jobList:String){
  userJobList(value:$jobList){
    jobId
    jobTitle
    jobDescription
    jobExperience
  }
}
`;

export const JOB_BY_ID_QUERY=gql`
query JobDetailById($inputJobById:InputJobById){
  jobDetailById (inputJobById:$inputJobById) {
    _id
    jobId
    jobTitle
    jobExperience
    jobDescription
    # adminId (uncomment if needed in your schema)
  }
}
`