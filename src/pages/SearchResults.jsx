import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

//graphql
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_EVENTS_FILTERED, GET_CACHE} from '../graphql'

// Components
import EventList from 'events/EventList'
import FilterBtns from 'event_fltr_btns/EvntFltrBtns'
import DistanceDropdown from 'distance-dropdown/DistanceDropdown'
import Searchbar from 'searchbar/Searchbar'
import GoBack from 'go_back/GoBack'

const SearchResults = () => {
  // local cache data
  const client = useApolloClient()
  const {
    data: {userLatitude, userLongitude, maxDistance},
  } = useQuery(GET_CACHE)

  // set up filter
  let location = useLocation()
  // create a search params object
  const urlQS = new URLSearchParams(location.search)
  // get searchText from query string and format string for gql query
  let searchTxt = `,${urlQS.get('searchText').replace(' ', ',')},`

  // gql
  const {loading, error, data, refetch} = useQuery(GET_EVENTS_FILTERED, {
    variables: {
      userLatitude: userLatitude || undefined,
      userLongitude: userLongitude || undefined,
      useLocation: !!(userLatitude && userLongitude),
      searchFilters: {
        location:
          userLatitude && userLongitude && maxDistance
            ? {
                userLatitude: userLatitude,
                userLongitude: userLongitude,
                radius: maxDistance,
              }
            : undefined,
        index: searchTxt ? searchTxt : undefined,
      },
    },
  })

  return (
    <div className='page-wrapper'>
      <GoBack />
      <section className='section mobile-section'>
        <Searchbar isLarge />
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
