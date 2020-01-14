import React from 'react'

// components
import LoadingLogo from '../components/loading/LoadingLogo'
import CreateEventForm from 'create-event-form/CreateEventForm'

//graphql
import {useQuery} from '@apollo/react-hooks'

export default function CreateEventPage() {
  return (
    <section className='section'>
      <h3 className='is-family-secondary is-size-2 has-text-black-bis'>
        Event Details
      </h3>
      <CreateEventForm />
    </section>
  )
}
