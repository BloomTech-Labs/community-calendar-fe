import gql from 'graphql-tag'

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
            where: { id: $locationId }
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

// Register user for an event
export const ADD_RSVP = gql`
  # pass id of event to add_rsvp
  # backend will read token in header to get user id
  mutation AddRsvp($id: ID!) {
    addRsvp(event: {id: $id}) {
      id # id of user added to rsvp list
      rsvps {
        #other events the user has rsvpd for
        id
        title
        tags {
          #tags assciated with events user has rsvp'd to
          title
        }
      }
    }
  }
`
// Cancel registrationfor an event
export const REMOVE_RSVP = gql`
  # pass id of event to remove_rsvp
  # backend will read token in header to get user id
  mutation RemoveRsvp($id: ID!) {
    removeRsvp(event: {id: $id}) {
      id # id of user added to rsvp list
      rsvps {
        #other events the user has rsvpd for
        id
        title
        tags {
          #tags assciated with events user has rsvp'd to
          title
        }
      }
    }
  }
`
