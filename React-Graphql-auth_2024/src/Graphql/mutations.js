import { gql } from '@apollo/client';
// GraphQL mutation for login

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    userName,
    email,
    token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation CreateUser($userName: String!, $email: String!,$password: String!, $mobile: String!, $description: String!) {
    createUser(userInput: {userName: $userName, email: $email,password:$password, mobile: $mobile, description: $description}) {
    userName
    email
    token
    }
  }
`;
