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
} from './events.query.js'
import USERS from './users.query.js'

// pure server GraphQL API mutations
import {
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  ADD_RSVP,
  REMOVE_RSVP,
  SAVE_EVENT,
} from './events.mutation.js'

// mixed server and client GraphQL API queries

// local state - client GraphQL API typeDefs, resolvers, and queries
import {typeDefs} from './localState'
import USER_LOCATION from './userLocation.query.js'
import {GET_CACHE, GET_RECENT_SEARCHES} from './getCache.query.js'
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
  PRICE_FILTER,
  LOCATION_FILTER,
  DATE_FILTER,
  GET_EVENTS_FILTERED,
  // server mutations
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  ADD_RSVP,
  REMOVE_RSVP,
  SAVE_EVENT,
  // mixed server and client

  // pure local state
  typeDefs,
  GET_CACHE,
  GET_RECENT_SEARCHES,
  GET_USER_ID,
}
