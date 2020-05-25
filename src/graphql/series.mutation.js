import gql from 'graphql-tag'

export const DELETE_SERIES = gql`
  mutation DeleteSeries($id: ID!) {
    deleteSeries(where: {id: $id}) {
      id
    }
  }
`
export const UPDATE_SERIES = gql`
mutation UpdateSeries(
    $id: ID!   
    # same variables as AddEvent
    $title: String!
    $description: String!
    $start: DateTime!
    $end: DateTime!   
    $ticketPrice: Float!
) {
    updateSeries(
    where:{ id:$id}
    data:{
        events:{
            updateMany:{
                where:{title:$title}
                data:{
                    title: $title
                    description: $description
                    start: $start
                    end: $end 
                    ticketPrice: $ticketPrice  
                }
             }
            }}){
        id
    }
  }

`
