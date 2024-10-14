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