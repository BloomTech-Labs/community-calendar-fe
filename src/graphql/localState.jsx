import gql from "graphql-tag";

export const typeDefs = gql`
  extend type Query {
    locationPermission: Boolean!
    userLatitude: Float
    userLongitude: Float
  }

  # extend type Launch {
  #   isInCart: Boolean!
  # }

  # extend type Mutation {
  #   addOrRemoveFromCart(id: ID!): [ID!]!
  # }
`;

// export const resolvers = {};