import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {ADD_EVENT} from '../../graphql'
import loadable from '@loadable/component'
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

export default function CreateEvent({history}) {
  const [addEvent, {data, error, loading}] = useMutation(ADD_EVENT)

  return (
    <EventForm
      formType='add'
      mutation={addEvent}
      mutationData={data}
      mutationError={error}
      mutationLoading={loading}
      history={history}
    />
  )
}
