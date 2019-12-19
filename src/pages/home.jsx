import React from 'react'
import ReactGA from 'react-ga'

//components
import EventList from '../components/events/EventList'

//styles
import {home} from './home.module'

const Home = () => {
  ReactGA.pageview('/')

  return (
    <>
      <EventList />
    </>
  )
}

export default Home
