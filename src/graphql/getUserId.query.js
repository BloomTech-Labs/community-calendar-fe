import gql from 'graphql-tag'

const GET_USER_ID = gql`
  query GetCache {
    userId @client
  }
`

export const GET_CCID = gql`
  query GetCCID($oktaId: String) {
    user(where: {oktaId: $oktaId}) {
      id
    }
  }
`

export default GET_USER_ID
