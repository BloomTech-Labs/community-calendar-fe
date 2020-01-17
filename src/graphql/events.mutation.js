import gql from 'graphql-tag'

export const ADD_EVENT = gql`
    mutation AddEvent(
      $title: String!,
      $description: String!,
      $start: DateTime!
      $end: DateTime!,
      $eventImages: [EventCreateImageInput!],
      $placeName: String!,
      $streetAddress1: String!,
      $streetAddress2: String = null,
      $city: String!,
      $state: String!,
      $zipCode: Int!,
      $latitude: Float = null,
      $longitude: Float = null,
      $tags: [EventCreateTagInput!],
      $ticketType: TicketType!
      $images: [Upload!]
    ){
      addEvent(
        data: {
          title: $title
          description: $description
          start: $start
          end: $end
          eventImages: $eventImages
          locations: {
            create: [
              {
                name: $placeName
                streetAddress: $streetAddress1
                streetAddress2: $streetAddress2
                city: $city
                zipcode: $zipCode
                state: $state
                latitude: $latitude
                longitude: $longitude
              }
            ]
          }
          tags: $tags
          ticketType: $ticketType
        },
        images: $images
      ) {
        id
      }
    }
  `;

export const UPDATE_EVENT = gql`
    mutation UpdateEvent(
      # need ID to update a specific event
      $id: ID!,
      # same variables as AddEvent
      $title: String!,
      $description: String!,
      $start: DateTime!
      $end: DateTime!,
      $eventImages: [EventCreateImageInput!],
      $placeName: String!,
      $streetAddress1: String!,
      $streetAddress2: String = null,
      $city: String!,
      $state: String!,
      $zipCode: Int!,
      $latitude: Float = null,
      $longitude: Float = null,
      $tags: [EventCreateTagInput!],
      $ticketType: TicketType!
      $images: [Upload!]
    ){
      updateEvent(
        where: { id: $id },
        data: {
          title: $title
          description: $description
          start: $start
          end: $end
          eventImages: $eventImages
          locations: {
            create: [
              {
                name: $placeName
                streetAddress: $streetAddress1
                streetAddress2: $streetAddress2
                city: $city
                zipcode: $zipCode
                state: $state
                latitude: $latitude
                longitude: $longitude
              }
            ]
          }
          tags: $tags
          ticketType: $ticketType
        },
        images: $images
      ) {
        id
      }
    }
  `;