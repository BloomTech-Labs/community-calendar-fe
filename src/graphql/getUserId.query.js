import gql from 'graphql-tag'

const GET_USER_ID = gql`
  query GetCache {
    userId @client
  }
`

export default GET_USER_ID
