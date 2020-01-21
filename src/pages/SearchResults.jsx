import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

//graphql
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_EVENTS_WITH_DISTANCE, GET_CACHE} from '../graphql'

// Components
import EventList from 'events/EventList'
import FilterBtns from 'event_fltr_btns/EvntFltrBtns'
import DistanceDropdown from 'distance-dropdown/DistanceDropdown'

import {filterByDistance} from '../utils'

const SearchResults = () => {
  // local cache data
  const client = useApolloClient()
  const {data: localCache} = useQuery(GET_CACHE)
  const {userLatitude, userLongitude, maxDistance} = localCache

  // gql
  const {loading, error, data: apolloData, refetch} = useQuery(
    GET_EVENTS_WITH_DISTANCE,
    {
      variables: {userLatitude: userLatitude, userLongitude: userLongitude},
    },
  )

  // set up filter
  let location = useLocation()
  // get search values from  uri
  const urlQS = new URLSearchParams(location.search)
  //make request using query params
  const data = {...apolloData}
  // create array of search words
  let searchTxtArr = urlQS.get('searchText').split(' ')

  // filter results using searchString
  if (!loading && data.events) {
    const filtered = data.events.filter(event => {
      return searchTxtArr.some(word => {
        word = word.toLowerCase()
        return (
          event.title.toLowerCase().includes(word) ||
          event.description.toLowerCase().includes(word) ||
          event.tags.reduce((result, tag) => {
            return tag.title.toLowerCase() == word ? (result = true) : result
          }, false)
        )
      })
    })
    // apply filtered events to data.events
    data.events = [...filtered]
  }

  // find distance from user and update events with results if user location changes
  useEffect(() => {
    refetch({userLatitude, userLongitude})
  }, [userLatitude, userLongitude])

  return (
    <div className='page-wrapper'>
      <section className='section mobile-section'>
        <div className='is-flex level justify-between is-dark '>
          <h3 className='is-family-secondary is-size-3-mobile is-size-2-tablet has-text-black-bis'>
            Search Results
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
          apolloData={{loading, error, data}}
          maxDistance={maxDistance}
        />
      </section>
    </div>
  )
}

export default SearchResults
