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
  query {
    #events(orderBy: start_DESC) {
    events {
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
    }
  }
  ${EVENT_DETAIL_DATA}
  ${ADDRESS_DETAIL_DATA}
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
