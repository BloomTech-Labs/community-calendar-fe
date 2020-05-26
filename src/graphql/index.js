// pure server GraphQL API queries
import {
  EVENT_DETAIL_DATA,
  ADDRESS_DETAIL_DATA,
  SEARCH_FILTERS,
  PRICE_FILTER,
  LOCATION_FILTER,
  DATE_FILTER,
  GET_EVENTS,
  GET_CALENDAR_EVENTS,
  GET_EVENTS_WITH_DISTANCE,
  GET_EVENT_BY_ID,
  GET_EVENT_BY_ID_WITH_DISTANCE,
  GET_EVENTS_FILTERED,
  GET_FEATURED_EVENTS,
  GET_USER_AND_EVENTS,
  GET_SERIES_BY_ID,
  GET_SERIES,
} from './events.query.js'
import {GET_USER_PICTURE} from './users.query.js'
import {UPDATE_USER} from './users.mutation.js'

// pure server GraphQL API mutations
import {
  ADD_EVENT,
  ADD_EVENT_NEW_SERIES,
  ADD_EVENT_EXISTING_SERIES,
  UPDATE_EVENT,
  DELETE_EVENT,
  SAVE_EVENT,
  RSVP_EVENT,
} from './events.mutation.js'

import {DELETE_SERIES, UPDATE_SERIES} from './series.mutation'

// mixed server and client GraphQL API queries

// local state - client GraphQL API typeDefs, resolvers, and queries
import {typeDefs} from './localState'
import USER_LOCATION from './userLocation.query.js'
import {
  GET_CACHE,
  GET_RECENT_SEARCHES,
  GET_USER_PICTURE_FROM_CACHE,
} from './getCache.query.js'
import GET_USER_ID from './getUserId.query'

// re-export as modules
export {
  // server queries
  EVENT_DETAIL_DATA,
  ADDRESS_DETAIL_DATA,
  GET_EVENTS,
  GET_CALENDAR_EVENTS,
  GET_EVENTS_WITH_DISTANCE,
  GET_EVENT_BY_ID,
  GET_EVENT_BY_ID_WITH_DISTANCE,
  USER_LOCATION,
  GET_USER_PICTURE,
  PRICE_FILTER,
  LOCATION_FILTER,
  DATE_FILTER,
  GET_EVENTS_FILTERED,
  GET_FEATURED_EVENTS,
  GET_USER_AND_EVENTS,
  GET_SERIES_BY_ID,
  GET_SERIES,
  // server mutations
  ADD_EVENT,
  ADD_EVENT_NEW_SERIES,
  ADD_EVENT_EXISTING_SERIES,
  UPDATE_EVENT,
  DELETE_EVENT,
  SAVE_EVENT,
  RSVP_EVENT,
  DELETE_SERIES,
  UPDATE_SERIES,
  // mixed server and client

  //users mutation
  UPDATE_USER,
  // pure local state
  typeDefs,
  GET_CACHE,
  GET_RECENT_SEARCHES,
  GET_USER_ID,
  GET_USER_PICTURE_FROM_CACHE,
}
