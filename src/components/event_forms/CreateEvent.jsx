import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {ADD_EVENT} from '../../graphql'
import EventForm from './EventForm'

export default function CreateEvent() {
  const [addEvent, {data, error, loading}] = useMutation(ADD_EVENT)

  return (
    <EventForm
      formType='add'
      mutation={addEvent}
      mutationData={data}
      mutationError={error}
      mutationLoading={loading}
    />
  )
}
