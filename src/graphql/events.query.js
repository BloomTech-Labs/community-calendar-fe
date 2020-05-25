import gql from 'graphql-tag'

// fragment for use in events queries
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

// fragment for use in location queries
export const ADDRESS_DETAIL_DATA = gql`
  fragment AddressDetail on Location {
    streetAddress
    streetAddress2
    city
    zipcode
    state
  }
`

// query for building the tag dropdown on the create/update event form
export const GET_ALL_TAGS = gql`
  query {
    tags(orderBy: title_ASC) {
      id
      title
    }
  }
`

// queries for `../pages/SearchResults.jsx` for filtering results
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

export const GET_CALENDAR_EVENTS = gql`
  query {
    events {
      start
      end
      title
      locations {
        streetAddress
        city
      }
    }
  }
`
// query used by `../pages/Home.jsx` for EventList
export const GET_EVENTS_FILTERED = gql`
  query EventsFiltered(
    $id: ID
    $userLatitude: Float
    $userLongitude: Float
    $searchFilters: SearchFilters
    $useLocation: Boolean!
  ) {
    events(
      where: {id: $id}
      orderBy: start_ASC
      searchFilters: $searchFilters
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

// query used by `../pages/Home.jsx` for FeaturedCarousel
// no filters and no location, returns events in chronological order
export const GET_FEATURED_EVENTS = gql`
  query {
    events(orderBy: start_ASC) {
      ...EventDetail
      locations {
        id
        name
        latitude
        longitude
        ...AddressDetail
      }

      eventImages {
        url
      }
    }
  }
  ${EVENT_DETAIL_DATA}
  ${ADDRESS_DETAIL_DATA}
`

// query used by `../components/user_profile/UserProfile.jsx` for dashboard
export const GET_USER_AND_EVENTS = gql`
  query GetUserAttending(
    $userLatitude: Float
    $userLongitude: Float
    $useLocation: Boolean!
    $userId: ID
  ) {
    user(where: {id: $userId}) {
      firstName
      lastName
      rsvps {
        ...EventDetail
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
      saved {
        ...EventDetail
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
      createdEvents {
        ...EventDetail
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
  }
  ${EVENT_DETAIL_DATA}
  ${ADDRESS_DETAIL_DATA}
`

// query used in `../pages/EventView.jsx` for viewing single event
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

// not used in app -- replaced by `GET_EVENTS_FILTERED`
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
      orderBy: start_ASC
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

// not used in app -- replaced by GET_EVENTS_WITH_DISTANCE
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
      orderBy: start_ASC
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
export const GET_SERIES = gql`
  query SeriesByEventID($id: ID) {
    events(where: {id: $id}) {
      series {
        id
      }
    }
  }
`
//GET_SERIES_BY_ID
export const GET_SERIES_BY_ID = gql`
  query SeriesByID($id: ID) {
    series(where: {id: $id}) {
      frequency
      series_end
      events {
        title
        description
        start
        end
        creator {
          firstName
          lastName
        }
        ticketPrice
        rsvps {
          firstName
          lastName
        }
        admins {
          firstName
        }
      }
    }
  }
`

// not used in app -- replaced by GET_EVENT_BY_ID_WITH_DISTANCE
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
