import gql from 'graphql-tag'

const GET_CACHE = gql`
  query GetCache {
    locationPermission @client
    userLatitude @client
    userLongitude @client
    maxDistance @client
  }
`

export default GET_CACHE
