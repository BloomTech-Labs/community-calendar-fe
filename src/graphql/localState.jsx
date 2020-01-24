import gql from 'graphql-tag'

export const typeDefs = gql`
  input TicketPrice {
    ticketPrice: Float!
  }

  input EventCreateTagInput {
    title: String!
  }

  input EventCreateImageInput {
    url: String!
  }

  extend type Query {
    maxDistance: Int
    locationPermission: Boolean!
    userLatitude: Float
    userLongitude: Float
    userAddress: String
    userId: String
  }
`
