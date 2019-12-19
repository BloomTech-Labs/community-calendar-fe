import React from 'react'
import ReactGA from 'react-ga';

//components
import EventList from '../components/events/EventList'

const Events = () => {
  ReactGA.pageview('/events');

  return (
    <>
      <EventList />
    </>
  )
}

export default Events
