import React from 'react'
import UpdateEvent from '../components/event_forms/UpdateEvent'

// styles
import {
  createEventsContainer,
  outerContainer
} from './styles/EventFormPage.module.scss'

export default function UpdateEventPage() {
  return (
    <div className={`${outerContainer}`}>
    <section className={`section ${createEventsContainer}`}>
      <section className='section'>
        <h3 className='is-family-secondary is-size-2 has-text-black-bis has-text-centered'>
          Event Details
        </h3>
      </section>
      <UpdateEvent />
    </section>
    </div>
  )
}
