import gql from 'graphql-tag'

export const UPDATE_USER = gql`
  mutation UpdateUser(
      $firstName: String,
      $lastName: String,
      $image: Upload
  ){
      updateUser(data: {
          firstName: $firstName
          lastName: $lastName
      },
      image: $image){
          firstName
          lastName
          profileImage
      }
  }
`
