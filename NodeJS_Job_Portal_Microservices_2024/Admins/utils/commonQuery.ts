import { gql } from "graphql-request";

export const USER_LIST_QUERY = gql`
        query($inputAdminUserList:InputAdminUserList) {
          adminUserList(inputAdminUserList:$inputAdminUserList){
            _id
            userName
            email
            mobile
            description
          }
        }
      `;