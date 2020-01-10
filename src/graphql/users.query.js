import {gql} from '@apollo/client'

const GET_USERS = gql`
  {
    users {
      id
    }
  }
`

export default GET_USERS
