import React from 'react'
import {useParams} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import loadable from '@loadable/component'

// graphql
import {useMutation, useQuery} from '@apollo/react-hooks'
import {GET_EVENT_BY_ID, UPDATE_EVENT, GET_USER_ID} from '../../graphql'

// components
import LoadingLogo from '../loading/LoadingLogo'

const EventForm = loadable(
  () => import(/* webpackChunkName: "eventForm" */ './EventForm'),
  {
    fallback: (
      <div
        className='container level is-flex'
        style={{height: '100vh', width: '100vw'}}
      >
        <LoadingLogo />
      </div>
    ),
  },
)

export default function UpdateEvent({history}) {
  // get event id out of url for query
  const queryParams = useParams()

  // query event information
  const {data, loading, error} = useQuery(GET_EVENT_BY_ID, {
    variables: {id: queryParams.id},
  })

  const {data: userId} = useQuery(GET_USER_ID)

  const [
    updateEvent,
    {loading: mutationLoading, data: mutationData, error: mutationError},
  ] = useMutation(UPDATE_EVENT)

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

  // destructure event details if fetch successful
  const item = data.events[0]

  // create updateEventHandler to pass eventId and loactionId into the mutation
  const updateEventHandler = (data) => {
    const {variables} = data
    updateEvent({
      variables: {
        eventId: item.id,
        locationId: item.locations[0].id,
        ...variables,
      },
    }).then((res) => {
      console.log(res)
    })
  }

  // redirect if user is not the one who created the event
  if (
    userId &&
    data &&
    data.events[0] &&
    userId.userId !== data.events[0].creator.id
  ) {
    return <Redirect to='/'></Redirect>
  }

  // render event form by passing in the event details from state
  return (
    <EventForm
      formType='update'
      item={item}
      mutation={updateEventHandler}
      mutationData={mutationData}
      mutationError={mutationError}
      mutationLoading={mutationLoading}
      history={history}
    />
  )
}
