import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

//graphql
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_EVENTS_FILTERED, GET_CACHE, GET_RECENT_SEARCHES} from '../graphql'

// Components
import EventList from 'events/EventList'
import FilterBtns from 'event_fltr_btns/EvntFltrBtns'
import DistanceDropdown from 'distance-dropdown/DistanceDropdown'
import Searchbar from 'searchbar/Searchbar'
import FilterMenu from 'filters/FilterMenu'
import ViewToggle from 'events/ViewToggle'
import {FilterIcon, CloseIconSquare} from 'icons'

//Styles
import {
  filtersEventsWrap,
  pageTitle,
  hiddenMenu,
} from './styles/SearchResults.module.scss'

const SearchResults = () => {
  const [recentSearches, setRecentSearches] = useState([])
  // local cache data
  const client = useApolloClient()
  const {
    data: {userLatitude, userLongitude, maxDistance},
  } = useQuery(GET_CACHE)

  const {data: recentSearchesData, refetch: recentSearchesRefetch} = useQuery(
    GET_RECENT_SEARCHES,
  )
  console.log('recentSearchesData', recentSearchesData)

  // set up filter
  let location = useLocation()
  // create a search params object
  const urlQS = new URLSearchParams(location.search)
  // get searchText from query string and format string for gql query
  let searchTxt = `,${urlQS.get('searchText').replace(/ /g, ',')},`

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

  // used to set cards to list or grid
  const [useListView, setShowListView] = useState(true)

  // toggle the Filters menu open/closed
  const [filtersIsOpen, setFiltersIsOpen] = useState(false)

  const getRecentSearches = () => {
    recentSearchesRefetch().then(({data: {recentSearches}}) => {
      console.log(recentSearches.length)
      setRecentSearches([...recentSearches])
    })
  }

  const addASearch = () => {
    client.writeData({
      data: {
        recentSearches: [
          ...recentSearches,
          {
            index: 'test testy mc testness',
            location: {
              userLatitude: 23.999,
              userLongitude: 24.999,
              radius: 20,
              __typename: 'LocationFilters',
            },
            tags: ['tag1', 'dogs', 'cool', 'beef stew'],
            ticketPrice: [
              {
                maxPrice: 10,
                minPrice: 0,
                __typename: 'PriceFilters',
              },
              {
                maxPrice: 30,
                minPrice: 20,
                __typename: 'PriceFilters',
              },
            ],
            dateRange: {
              start: '2020-01-22T17:00:00.000Z',
              end: '2020-01-24T17:00:00.000Z',
              __typename: 'DateFilters',
            },
            __typename: 'SearchFilters',
          },
        ],
      },
    })
  }

  return (
    <div className='page-wrapper'>
      <section className='section mobile-section'>
        <Searchbar isLarge />
        <button onClick={() => getRecentSearches()}>Get recent searches</button>
        <button onClick={() => addASearch()}>Add a search</button>
        <div className='is-flex level justify-between is-dark '>
          <h3
            className={`is-family-secondary is-size-3-mobile is-size-2-tablet has-text-black-bis ${pageTitle}`}
          >
            Search Results&nbsp;:&nbsp;
            {urlQS.get('searchText').replace(/ /g, ', ')}
          </h3>
          <div className='is-hidden-mobile'>
            <ViewToggle toggleFunc={setShowListView} viewState={useListView} />
          </div>
        </div>
        <div
          className='is-hidden-tablet is-flex level'
          style={{margin: '16px 0'}}
        >
          <div
            className='is-clickable is-flex level'
            onClick={() => setFiltersIsOpen(!filtersIsOpen)}
          >
            {filtersIsOpen ? (
              <CloseIconSquare dimensions={30} />
            ) : (
              <FilterIcon dimensions={30} />
            )}
          </div>
          <ViewToggle toggleFunc={setShowListView} viewState={useListView} />
        </div>
        <div className='is-relative'>
          <div
            className={`${hiddenMenu} is-hidden-tablet ${
              filtersIsOpen ? 'slideInL2R ' : 'willSlideInL2R'
            }`}
          >
            <FilterMenu mobile />
          </div>
        </div>
        <div className={filtersEventsWrap}>
          <div className='is-hidden-mobile'>
            <FilterMenu />
          </div>
          <div>
            <EventList
              apolloData={{loading, error, data}}
              listView={useListView}
              setListType={setShowListView}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default SearchResults
