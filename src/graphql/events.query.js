import gql from 'graphql-tag'

export const EVENT_DETAIL_DATA = gql`
  fragment EventDetail on Event {
    id
    title
    description
    start
    end
  }
`;

export const ADDRESS_DETAIL_DATA = gql`
  fragment AddressDetail on Location {
    street_address
    street_address_2
    city
    zipcode
    state
  }
`;

export const GET_EVENTS = gql`
  query {
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
    }
  }
  ${EVENT_DETAIL_DATA}
  ${ADDRESS_DETAIL_DATA}
`;