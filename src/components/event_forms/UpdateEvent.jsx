import React from 'react'
import {useParams} from 'react-router-dom'

// graphql
import {useMutation, useQuery} from '@apollo/react-hooks';
import {GET_EVENT_BY_ID, UPDATE_EVENT} from '../../graphql'

// components
import EventForm from './EventForm';
import LoadingLogo from '../loading/LoadingLogo'


export default function UpdateEvent() {
  // get event id out of url for query
  const queryParams = useParams()

  // query event information
  const {data, loading, error} = useQuery(GET_EVENT_BY_ID, {
    variables: {id: queryParams.id},
  })

  const [updateEvent, {data: mutationData, error: mutationError}] = useMutation(UPDATE_EVENT);

  const updateEventHandler = (data) => {
    const {variables} = data
    updateEvent({variables: { id: queryParams.id, ...variables}})

  }

  // render loading spinner or error message if fetch fails
  if (loading)
    return (
      <div
        className='container level is-flex'
        style={{height: '100vh', width: '100vw'}}
      >
        <LoadingLogo />
      </div>
    )
  if (error) return <p>Error</p>

  // destructure and render event form with initial values if fetch successful
  const item = data.events[0]

  return (
    <EventForm 
      formType="update"
      item={item}
      mutation={updateEventHandler} 
      mutationData={mutationData} 
      mutationError={mutationError} />
  )
}