import gql from 'graphql-tag'

export const ADD_EVENT_NEW_SERIES = gql`
  mutation AddEvent(
    $title: String!
    $description: String!
    $start: DateTime!
    $end: DateTime!
    $eventImages: [EventCreateImageInput!]
    $placeName: String!
    $streetAddress: String!
    $streetAddress2: String = null
    $city: String!
    $state: String!
    $zipcode: Int!
    $latitude: Float = null
    $longitude: Float = null
    $tags: [EventCreateTagInput!]
    $ticketPrice: Float!
    $images: [Upload!]
    $frequency: FrequencyType
    $seriesEnd: DateTime
  ) {
    addEvent(
      data: {
        series: {create: {frequency: $frequency, series_end: $seriesEnd}}
        title: $title
        description: $description
        start: $start
        end: $end
        eventImages: $eventImages
        locations: {
          create: [
            {
              name: $placeName
              streetAddress: $streetAddress
              streetAddress2: $streetAddress2
              city: $city
              zipcode: $zipcode
              state: $state
              latitude: $latitude
              longitude: $longitude
            }
          ]
        }
        tags: $tags
        ticketPrice: $ticketPrice
      }
      images: $images
    ) {
      id
      series {
        id
      }
    }
  }
`

export const ADD_EVENT_EXISTING_SERIES = gql`
  mutation AddEvent(
    $title: String!
    $description: String!
    $start: DateTime!
    $end: DateTime!
    $eventImages: [EventCreateImageInput!]
    $placeName: String!
    $streetAddress: String!
    $streetAddress2: String = null
    $city: String!
    $state: String!
    $zipcode: Int!
    $latitude: Float = null
    $longitude: Float = null
    $tags: [EventCreateTagInput!]
    $ticketPrice: Float!
    $images: [Upload!]
    $seriesId: ID!
  ) {
    addEvent(
      data: {
        series: {connect: {id: $seriesId}}
        title: $title
        description: $description
        start: $start
        end: $end
        eventImages: $eventImages
        locations: {
          create: [
            {
              name: $placeName
              streetAddress: $streetAddress
              streetAddress2: $streetAddress2
              city: $city
              zipcode: $zipcode
              state: $state
              latitude: $latitude
              longitude: $longitude
            }
          ]
        }
        tags: $tags
        ticketPrice: $ticketPrice
      }
      images: $images
    ) {
      id
      series {
        id
      }
    }
  }
`

export const ADD_EVENT = gql`
  mutation AddEvent(
    $title: String!
    $description: String!
    $start: DateTime!
    $end: DateTime!
    $eventImages: [EventCreateImageInput!]
    $placeName: String!
    $streetAddress: String!
    $streetAddress2: String = null
    $city: String!
    $state: String!
    $zipcode: Int!
    $latitude: Float = null
    $longitude: Float = null
    $tags: [EventCreateTagInput!]
    $ticketPrice: Float!
    $images: [Upload!]
  ) {
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
              streetAddress: $streetAddress
              streetAddress2: $streetAddress2
              city: $city
              zipcode: $zipcode
              state: $state
              latitude: $latitude
              longitude: $longitude
            }
          ]
        }
        tags: $tags
        ticketPrice: $ticketPrice
      }
      images: $images
    ) {
      id
    }
  }
`

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    # need ID to update a specific event
    $eventId: ID!
    $locationId: ID!
    # same variables as AddEvent
    $title: String!
    $description: String!
    $start: DateTime!
    $end: DateTime!
    $eventImages: [EventCreateImageInput!]
    $placeName: String!
    $streetAddress: String!
    $streetAddress2: String = null
    $city: String!
    $state: String!
    $zipcode: Int!
    $latitude: Float = null
    $longitude: Float = null
    $tags: [EventCreateTagInput!]
    $ticketPrice: Float!
    $images: [Upload!]
  ) {
    updateEvent(
      where: {id: $eventId}
      data: {
        title: $title
        description: $description
        start: $start
        end: $end
        eventImages: $eventImages
        locations: {
          update: {
            where: {id: $locationId}
            data: {
              name: $placeName
              streetAddress: $streetAddress
              streetAddress2: $streetAddress2
              city: $city
              zipcode: $zipcode
              state: $state
              latitude: $latitude
              longitude: $longitude
            }
          }
        }
        tags: $tags
        ticketPrice: $ticketPrice
      }
      images: $images
    ) {
      id
    }
  }
`

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(where: {id: $id}) {
      id
    }
  }
`

export const SAVE_EVENT = gql`
  mutation SaveEvent($id: ID!) {
    saveEvent(event: {id: $id})
  }
`

export const RSVP_EVENT = gql`
  mutation RsvpEvent($id: ID!) {
    rsvpEvent(event: {id: $id})
  }
`
