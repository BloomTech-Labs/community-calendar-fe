import React from 'react'

// components
import LoadingLogo from '../components/loading/LoadingLogo'
import CreateEvent from '../components/event_forms/CreateEvent'

import {
  createEventsContainer,
  outerContainer
} from './styles/CreateEventPage.module.scss'

//graphql
import {useQuery} from '@apollo/react-hooks'

export default function CreateEventPage() {
  return (
    <div className={`${outerContainer}`}>
    <section className={`section ${createEventsContainer}`}>
      <section className='section'>
        <h3 className='is-family-secondary is-size-2 has-text-black-bis has-text-centered'>
          Event Details
        </h3>
      </section>
      <CreateEvent />
    </section>
    </div>
  )
}
