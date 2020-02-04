// pure server GraphQL API queries
import {
  EVENT_DETAIL_DATA,
  ADDRESS_DETAIL_DATA,
  SEARCH_FILTERS,
  PRICE_FILTER,
  LOCATION_FILTER,
  DATE_FILTER,
  GET_EVENTS,
  GET_EVENTS_WITH_DISTANCE,
  GET_EVENT_BY_ID,
  GET_EVENT_BY_ID_WITH_DISTANCE,
  GET_EVENTS_FILTERED,
  GET_USER_AND_EVENTS
} from './events.query.js'
import {USERS, GET_USER_PICTURE} from './users.query.js'
import {UPDATE_USER} from './users.mutation.js'

// pure server GraphQL API mutations
import {
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  SAVE_EVENT,
  RSVP_EVENT,
} from './events.mutation.js'

// mixed server and client GraphQL API queries

// local state - client GraphQL API typeDefs, resolvers, and queries
import {typeDefs} from './localState'
import USER_LOCATION from './userLocation.query.js'
import {GET_CACHE, GET_RECENT_SEARCHES, GET_USER_PICTURE_FROM_CACHE} from './getCache.query.js'
import GET_USER_ID from './getUserId.query'

// re-export as modules
export {
  // server queries
  EVENT_DETAIL_DATA,
  ADDRESS_DETAIL_DATA,
  GET_EVENTS,
  GET_EVENTS_WITH_DISTANCE,
  GET_EVENT_BY_ID,
  GET_EVENT_BY_ID_WITH_DISTANCE,
  USER_LOCATION,
  USERS,
  GET_USER_PICTURE,
  PRICE_FILTER,
  LOCATION_FILTER,
  DATE_FILTER,
  GET_EVENTS_FILTERED,
  GET_USER_AND_EVENTS,
  // server mutations
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  SAVE_EVENT,
  RSVP_EVENT,
  // mixed server and client

  //users mutation
  UPDATE_USER,

  // pure local state
  typeDefs,
  GET_CACHE,
  GET_RECENT_SEARCHES,
  GET_USER_ID,
  GET_USER_PICTURE_FROM_CACHE
}
