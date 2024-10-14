import { gql } from "graphql-request";

export const USER_LIST_QUERY = gql`
        query AdminFetchUserList($userData:String) {
          adminUserList(value:$userData){
            _id
            userName
            email
            mobile
            description
          }
        }
      `;