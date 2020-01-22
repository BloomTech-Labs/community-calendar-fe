// pure server GraphQL API queries
import {
  EVENT_DETAIL_DATA,
  ADDRESS_DETAIL_DATA,
  GET_EVENTS,
  GET_EVENTS_WITH_DISTANCE,
  GET_EVENT_BY_ID,
  GET_EVENT_BY_ID_WITH_DISTANCE,
} from './events.query.js'
import USERS from './users.query.js'

// pure server GraphQL API mutations
import {
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  ADD_RSVP,
  REMOVE_RSVP,
} from './events.mutation.js'

// mixed server and client GraphQL API queries

// local state - client GraphQL API typeDefs, resolvers, and queries
import {typeDefs} from './localState'
import USER_LOCATION from './userLocation.query.js'
import GET_CACHE from './getCache.query.js'
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
  // server mutations
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  ADD_RSVP,
  REMOVE_RSVP,
  // mixed server and client

  // pure local state
  typeDefs,
  GET_CACHE,
  GET_USER_ID,
}
