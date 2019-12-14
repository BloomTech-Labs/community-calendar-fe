import gql from 'graphql-tag'

const GET_USERS = gql`
  {
    users {
      id
    }
  }
`

export default GET_USERS
