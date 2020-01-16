import gql from 'graphql-tag'

const USER_LOCATION = gql`
  query GetUserLocation {
    locationPermission @client
    userLatitude @client
    userLongitude @client
  }
`

export default USER_LOCATION;