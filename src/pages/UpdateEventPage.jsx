import React from 'react'
import UpdateEvent from '../components/event_forms/UpdateEvent'

// styles
import {
  innerContainer,
  outerContainer,
  banner
} from './styles/EventFormPage.module.scss'

export default function UpdateEventPage() {
  return (
    <div className={`${outerContainer}`}>
      <div className={`${innerContainer}`}>
        <section className={`section ${banner}`}>
          <h3 className='is-family-secondary is-size-2 has-text-centered'>
            Update Event Details
          </h3>
        </section>
        <UpdateEvent />
      </div>
    </div>
  )
}
