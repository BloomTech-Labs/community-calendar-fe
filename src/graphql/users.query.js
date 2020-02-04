import gql from 'graphql-tag'

export const GET_USERS = gql`
  {
    users {
      id
    }
  }
`

export const GET_USER_PICTURE = gql`
  query{
    user{
      profileImage
    }
  }
`