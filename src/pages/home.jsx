import React from 'react'
import ReactGA from 'react-ga'

//components
import EventList from '../components/events/EventList'
import FilterBtns from '../components/event_fltr_btns/EvntFltrBtns'
import FeaturedEvents from '../components/featured/FeaturedEvents'

//graphql
import {useQuery} from 'react-apollo'
import {GET_EVENTS} from '../graphql/events.query'

//styles
import styles from './styles/Home.module.scss'

const Home = () => {
  ReactGA.pageview('/')
  const apolloData = useQuery(GET_EVENTS)
  const {data, loading, error} = apolloData

  return (
    <div className='page-wrapper'>
      <FeaturedEvents apolloData={apolloData} />
      <div className='content-divider-x'></div>
      <section className='section'>
        <h3 className='is-family-secondary is-size-2 has-text-black-bis'>
          Events
        </h3>
        <FilterBtns />
        <EventList apolloData={apolloData} />
      </section>
    </div>
  )
}

export default Home
