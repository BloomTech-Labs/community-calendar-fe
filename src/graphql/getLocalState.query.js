import gql from 'graphql-tag'

const GET_LOCAL_STATE = gql`
  query GetLocalState {
    locationPermission @client
    userLatitude @client
    userLongitude @client
    maxDistance @client
  }
`

export default GET_LOCAL_STATE
