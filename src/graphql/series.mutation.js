import gql from 'graphql-tag'

export const DELETE_SERIES = gql`
  mutation DeleteSeries($id: ID!) {
    deleteSeries(where: {id: $id}) {
      id
    }
  }
`