import gql from 'graphql-tag'

export const EVENT_DETAIL_DATA = gql`
  fragment EventDetail on Event {
    id
    title
    description
    start
    end
  }
`

export const ADDRESS_DETAIL_DATA = gql`
  fragment AddressDetail on Location {
    street_address
    street_address_2
    city
    zipcode
    state
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
      event_images {
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

export const GET_ALL_TAGS = gql`
  query {
    tags {
      title
    }
  }
`

export const GET_EVENT_BY_ID = id => {
  const QUERY = gql`
    query{
      events(where: {id: "${id}"}){
      ...EventDetail
      creator {
        id
      }
      locations {
        id
        name
        ...AddressDetail
      }
      event_images {
        url
      }
      tags{
        title
      }
    }

    }
    ${EVENT_DETAIL_DATA}
    ${ADDRESS_DETAIL_DATA}
  `
  return QUERY
}

// export const GET_EVENT_BY_DAYS = (start, end) => {
//   return gql`
//     query{
//       events(where: {id: ${id}}){
//         ...EventDetail
//         event_images{
//           url
//         }
//       }
//     }
//     ${EVENT_DETAIL_DATA}
//   `
// }
