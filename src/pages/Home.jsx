import React, {useState, useEffect, useRef} from 'react'
import ReactGA from 'react-ga'

//components
import EventList from '../components/events/EventList'
import FilterBtns from '../components/event_fltr_btns/EvntFltrBtns'
import FeatCarousel from '../components/featured/FeaturedCarousel'
import {DropdownIcon} from 'icons'
import DistanceDropdown from 'distance-dropdown/DistanceDropdown'

//graphql
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_EVENTS_WITH_DISTANCE, GET_CACHE} from '../graphql'

/* The first page user's see when opening the app */
const Home = () => {
  ReactGA.pageview('/')

  // local cache data
  const client = useApolloClient()
  console.log('client', client)
  const {data: localCache} = useQuery(GET_CACHE)
  const {userLatitude, userLongitude, maxDistance} = localCache

  const apolloData = useQuery(GET_EVENTS_WITH_DISTANCE, {
    variables: {userLatitude: userLatitude, userLongitude: userLongitude},
  })

  const {data, loading, error, refetch} = apolloData
  console.log('events data', data)

  // find distance from user and update events with results if user location changes
  useEffect(() => {
    refetch({userLatitude, userLongitude})
  }, [userLatitude, userLongitude])

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
      <section className='section mobile-section'>
        <div className='is-flex level justify-between is-dark '>
          <h3 className='is-family-secondary is-size-3-mobile is-size-2-tablet has-text-black-bis'>
            Events
          </h3>
          {userLatitude && userLongitude && (
            <DistanceDropdown
              client={client}
              userLat={userLatitude}
              userLong={userLongitude}
              maxDistance={maxDistance}
            />
          )}
        </div>
        <FilterBtns refetch={refetch} />
        <EventList
          apolloData={{data, loading, error}}
          maxDistance={maxDistance}
        />
      </section>
    </div>
  )
}

export default Home
