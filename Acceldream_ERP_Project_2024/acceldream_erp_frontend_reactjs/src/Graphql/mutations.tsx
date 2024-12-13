import { gql } from '@apollo/client';
// GraphQL mutation for login

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(loginInput:{email: $email, password: $password}) {
    userName,
    email,
    success
    }
  }
`;
export const REGISTER_USER = gql`
  mutation CreateUser($userName: String!, $firstName:String!,$lastName:String!,$email: String!,$password: String!, $mobile: String!) {
    userRegister(userInput: {userName: $userName,firstName:$firstName,lastName:$lastName,email: $email,password:$password, mobile: $mobile}) {
    userName
    email
    success
    }
  }
`;
export const OTP_VERIFIY=gql`
mutation VerifyOTP($email:String!,$mobile:String!,$otp:String!) {
  verifyOTP(otpVerifyInput: {email:$email,mobile:$mobile,otp:$otp}) {
    userName
    email
    token
    success
  }
}
`;
export const EDIT_PROFILE=gql`
mutation ($file:Upload!){
editUser(ID:$ID,editUserInput:{userName:$userName,email:$email,mobile:$mobile,firstName:$firstName,lastName:$lastName,description:$description,image:$file}){
success,
message
}
}
`
export const RESET_PASSWORD=gql`
mutation resetPassword($currentPassword:String!,$newPassword:String!,$confirmNewPassword:String!){
resetPassword(ID:$ID,resetPasswordInput:{currentPassword:$currentPassword,newPassword:$newPassword,confirmNewPassword:$confirmNewPassword}){
success,
message
}
}
`
