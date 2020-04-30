import React from 'react'
import {useParams} from 'react-router-dom'
import UpdateEvent from '../components/event_forms/UpdateEvent'
import GoBack from '../components/go_back/GoBack'

// styles
import {
  innerContainer,
  outerContainer,
  banner
} from './styles/EventFormPage.module.scss'

export default function UpdateEventPage({history}) {
  const {id} = useParams();

  return (
    <div className={`${outerContainer}`}>
      <div className={`${innerContainer}`}>
        <GoBack to={`/events/${id}`} color="white" />
        <section className={`section ${banner}`}>
          <h3 className='is-family-secondary is-size-2 has-text-centered'>
            Update Event Details
          </h3>
        </section>
        <UpdateEvent history={history}/>
      </div>
    </div>
  )
}
