import { gql } from '@apollo/client';
export const USER_QUERY=gql`
query{
 userDetails{
    _id,
    userName,
    firstName,
    lastName,
    email,
    mobile,
    description,
    image
 } 
}
`