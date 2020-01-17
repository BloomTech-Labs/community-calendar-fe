import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import {ADD_EVENT} from '../../graphql'
import EventForm from './EventForm';

export default function CreateEvent() {

  const [addEvent, {data, error}] = useMutation(ADD_EVENT);

  return (
    <EventForm mutation={addEvent} data={data} error={error} />
  )
}