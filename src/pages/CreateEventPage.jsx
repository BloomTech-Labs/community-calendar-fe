import React from 'react'
import CreateEvent from '../components/event_forms/CreateEvent'
import GoBack from '../components/go_back/GoBack'

// styles
import {
  innerContainer,
  outerContainer,
  banner
} from './styles/EventFormPage.module.scss'

export default function CreateEventPage({history}) {
  return (
    <div className={`${outerContainer}`}>
      <div className={`${innerContainer}`}>
        <GoBack color="white" />
        <section className={` section ${banner}`}>
          <h3 className='is-family-secondary is-size-2 has-text-centered'>
            Event Details
          </h3>
        </section>
        <CreateEvent history={history}/>
      </div>
    </div>
  )
}
