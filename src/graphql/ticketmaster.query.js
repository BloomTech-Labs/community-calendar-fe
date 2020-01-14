import gql from 'graphql-tag'

export const GET_TM_EVENTS = gql`
  query ticketMasterEvents(
    $radius: Int
    $unit: String
    $size: Int
    $page: Int
    $keyword: String
    $latlong: String
    $startDateTime: DateTime
    $endDateTime: DateTime
    $city: String
    $countryCode: String
    $stateCode: String
    $postalCode: String
  ) {
    page {
      number
      totalPages
      totalElements
      size
    }
    _embedded {
      events {
        name
        url
        description
        additionalInfo
        info
        dates {
          start {
            localDate
            localTime
            dateTime
          }
          end {
            localDate
            localTime
            dateTime
          }
          timezone
        }
        images {
          ratio
          url
          width
          height
        }
        place {
          area {
            name
          }
          address {
            line1
            line2
          }
          location {
            longitude
            latitude
          }
          postalCode
          city {
            name
          }
          state {
            name
            stateCode
          }
        }
        _embedded {
          venues {
            name
            location {
              longitude
              latitude
            }
            city {
              name
            }
            distance
            units
            address {
              line1
              line2
            }
            city {
              name
            }
            state {
              name
              stateCode
            }
            postalCode
          }
        }
      }
    }
    _links {
      self {
        href
      }
      next {
        href
      }
      prev {
        href
      }
      last {
        href
      }
    }
  }
`
export const GET_TM_EVENTS_ALT = gql`
  query ticketMasterEventsAlt(
    $radius: Int
    $unit: String
    $size: Int
    $page: Int
    $keyword: String
    $latlong: String
    $startDateTime: DateTime
    $endDateTime: DateTime
    $city: String
    $countryCode: String
    $stateCode: String
    $postalCode: String
  ) {
    page {
      number
      totalPages
      totalElements
      size
    }
    events {
      id
      title
      start
      end
      info
      description
      event_images {
        ratio
        url
        width
        height
      }
      urls {
        url
      }
      locations {
        name
        neighborhood
        distance
        city
        street_address
        street_address_2
        state
        zipcode
        latitude
        longitude
      }
    }
  }
`
