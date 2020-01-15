import gql from 'graphql-tag'

export const typeDefs = gql`
  extend type Query {
    maxDistance: Int
    locationPermission: Boolean!
    userLatitude: Float
    userLongitude: Float
  }
`
