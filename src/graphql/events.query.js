import gql from 'graphql-tag'

export const EVENT_DETAIL_DATA = gql`
  fragment EventDetail on Event {
    id
    title
    description
    start
    end
    ticketPrice
  }
`

export const ADDRESS_DETAIL_DATA = gql`
  fragment AddressDetail on Location {
    streetAddress
    streetAddress2
    city
    zipcode
    state
  }
`

export const SEARCH_FILTERS = gql`
  input SearchFilters {
    index: String
    location: LocationFilters
    tags: [String!]
    ticketPrice: [PriceFilters!]
    dateRange: DateFilters
  }
`
export const PRICE_FILTER = gql`
  input PriceFilters {
    minPrice: Int
    maxPrice: Int
  }
`
export const DATE_FILTER = gql`
  input DateFilters {
    start: DateTime!
    end: DateTime!
  }
`

export const LOCATION_FILTER = gql`
  input LocationFilters {
    userLatitude: Float!
    userLongitude: Float!
    radius: Int!
  }
`

export const GET_EVENTS = gql`
  query EventsByRange($start: DateTime, $end: DateTime) {
    events(
      where: {
        OR: [
          {AND: [{start_lte: $start}, {end_gte: $end}]}
          {AND: [{start_gte: $start}, {end_lte: $end}]}
          {
            AND: [
              {AND: [{start_gte: $start}, {start_lte: $end}]}
              {end_gte: $end}
            ]
          }
          {
            AND: [
              {start_lte: $start}
              {AND: [{end_lte: $end}, {end_gte: $start}]}
            ]
          }
        ]
      }
    ) {
      ...EventDetail
      creator {
        id
      }
      locations {
        id
        name
        ...AddressDetail
      }
      eventImages {
        url
      }
      tags {
        title
      }
    }
  }
  ${EVENT_DETAIL_DATA}
  ${ADDRESS_DETAIL_DATA}
`
export const GET_EVENTS_WITH_DISTANCE = gql`
  query EventsByRange(
    $start: DateTime
    $end: DateTime
    $userLatitude: Float
    $userLongitude: Float
  ) {
    events(
      where: {
        OR: [
          {AND: [{start_lte: $start}, {end_gte: $end}]}
          {AND: [{start_gte: $start}, {end_lte: $end}]}
          {
            AND: [
              {AND: [{start_gte: $start}, {start_lte: $end}]}
              {end_gte: $end}
            ]
          }
          {
            AND: [
              {start_lte: $start}
              {AND: [{end_lte: $end}, {end_gte: $start}]}
            ]
          }
        ]
      }
    ) {
      ...EventDetail
      creator {
        id
      }
      locations(userLatitude: $userLatitude, userLongitude: $userLongitude) {
        id
        name
        latitude
        longitude
        distanceFromUser
        distanceUnit
        ...AddressDetail
      }
      eventImages {
        url
      }
      tags {
        title
      }
      rsvps {
        id
        firstName
        lastName
      }
    }
  }
  ${EVENT_DETAIL_DATA}
  ${ADDRESS_DETAIL_DATA}
`

export const GET_ALL_TAGS = gql`
  query {
    tags {
      id
      title
    }
  }
`

export const GET_EVENT_BY_ID = gql`
  query EventById($id: ID) {
    events(where: {id: $id}) {
      ...EventDetail
      creator {
        id
      }
      locations {
        id
        name
        ...AddressDetail
      }
      eventImages {
        url
      }
      tags {
        title
      }
    }
    tags {
      title
    }
  }
  ${EVENT_DETAIL_DATA}
  ${ADDRESS_DETAIL_DATA}
`

export const GET_EVENT_BY_ID_WITH_DISTANCE = gql`
  query EventByIdWithDistance(
    $id: ID
    $userLatitude: Float
    $userLongitude: Float
    $withSaved: Boolean!
    $savedUserId: ID
  ) {
    events(where: {id: $id}) {
      ...EventDetail
      creator {
        id
        firstName
        profileImage
      }
      locations(userLatitude: $userLatitude, userLongitude: $userLongitude) {
        id
        name
        latitude
        longitude
        distanceFromUser
        distanceUnit
        ...AddressDetail
      }
      eventImages {
        url
      }
      tags {
        title
      }
      rsvps {
        id
        firstName
        lastName
      }
      saved(where: {id: $savedUserId}) @include(if: $withSaved) {
        id
        firstName
      }
    }
  }
  ${EVENT_DETAIL_DATA}
  ${ADDRESS_DETAIL_DATA}
`
export const GET_EVENTS_FILTERED = gql`
  query EventsFiltered(
    $id: ID
    $userLatitude: Float
    $userLongitude: Float
    $searchFilters: SearchFilters
    $useLocation: Boolean!
  ) {
    events(where: {id: $id}, searchFilters: $searchFilters) {
      ...EventDetail
      creator {
        id
      }
      locations(userLatitude: $userLatitude, userLongitude: $userLongitude) {
        id
        name
        latitude
        longitude
        distanceFromUser @include(if: $useLocation)
        distanceUnit @include(if: $useLocation)
        ...AddressDetail
      }

      eventImages {
        url
      }
      tags {
        title
      }
      rsvps {
        id
        firstName
        lastName
      }
    }
  }
  ${EVENT_DETAIL_DATA}
  ${ADDRESS_DETAIL_DATA}
`

export const GET_USER_SAVED = gql `
  query GetUserSaved(
    $userLatitude: Float
    $userLongitude: Float
    $useLocation: Boolean!
    ){
    user{
      saved {
        id
        title
        start
        end
        ticketPrice
        eventImages {
          url
        }
        locations(userLatitude: $userLatitude, userLongitude: $userLongitude){
          distanceFromUser @include(if: $useLocation)
          distanceUnit @include(if: $useLocation)
          city
        }

      }
    }
  }
`

export const GET_USER_ATTENDING = gql `
  query GetUserAttending(
    $userLatitude: Float
    $userLongitude: Float
    $useLocation: Boolean!
    ){
    user{
      rsvps {
        id
        title
        start
        end
        ticketPrice
        eventImages {
          url
        }
        locations(userLatitude: $userLatitude, userLongitude: $userLongitude){
          distanceFromUser @include(if: $useLocation)
          distanceUnit @include(if: $useLocation)
          city
        }

      }
    }
  }
`

export const GET_USER_CREATED = gql `
  query GetUserCreated(
    $userLatitude: Float
    $userLongitude: Float
    $useLocation: Boolean!
    ){
    user{
      createdEvents {
        id
        title
        start
        end
        ticketPrice
        eventImages {
          url
        }
        locations(userLatitude: $userLatitude, userLongitude: $userLongitude){
          distanceFromUser @include(if: $useLocation)
          distanceUnit @include(if: $useLocation)
          city
        }
      }
    }
  }
`
