import React from 'react'
import CreateEvent from '../components/event_forms/CreateEvent'

// styles
import {
  innerContainer,
  outerContainer,
  banner
} from './styles/EventFormPage.module.scss'

export default function CreateEventPage() {
  return (
    <div className={`${outerContainer}`}>
      <div className={`${innerContainer}`}>
        <section className={` section ${banner}`}>
          <h3 className='is-family-secondary is-size-2 has-text-centered'>
            Event Details
          </h3>
        </section>
        <CreateEvent />
      </div>
    </div>
  )
}
