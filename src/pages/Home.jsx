import React, { useEffect } from 'react'
import ReactGA from 'react-ga'

//components
import EventList from '../components/events/EventList'
import FilterBtns from '../components/event_fltr_btns/EvntFltrBtns'
import FeatCarousel from '../components/featured/FeaturedCarousel'

//graphql
import {useQuery} from '@apollo/react-hooks'
import {GET_EVENTS, GET_EVENTS_WITH_DISTANCE} from '../graphql/events.query'
// import { GET_EVENTS } from '../graphql/events.query'
import  USER_LOCATION  from '../graphql/userLocation.query';

//styles
import styles from './styles/Home.module.scss'

/* The first page user's see when opening the app */
const Home = () => {
  ReactGA.pageview('/')

  const locationData = useQuery(USER_LOCATION);
  const { userLatitude, userLongitude } = locationData.data;
  console.log("userLatitude, userLongitude", userLatitude, userLongitude)

  // const  apolloData = useQuery(GET_EVENTS)
  const  apolloData = useQuery(GET_EVENTS_WITH_DISTANCE, { variables: {userLatitude: userLatitude, userLongitude: userLongitude}})
  const {data, loading, error, refetch} = apolloData
  console.log('apolloData before useEffect', apolloData)
  useEffect(() => {
    refetch({userLatitude, userLongitude}) 
  }, [userLatitude, userLongitude]);

  return (
    <div className='page-wrapper'>
      {/* Featured Events carousel */}
      {data && data.events.length > 0 ? (
        <>
          <FeatCarousel apolloData={apolloData} />
          <div className='content-divider-x'></div>
        </>
      ) : null}

      {/* Events list */}
      <section className='section'>
        <h3 className='is-family-secondary is-size-2 has-text-black-bis'>
          Events
        </h3>
        <FilterBtns refetch={refetch} />
        <EventList apolloData={apolloData} />
      </section>
    </div>
    )
}

export default Home
