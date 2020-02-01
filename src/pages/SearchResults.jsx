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
import FilterMenu from 'filters/FilterMenu'
import ViewToggle from 'events/ViewToggle'
import {FilterIcon, CloseIconSquare} from 'icons'
import RecentSearches from 'recent-searches/RecentSearches'

//Styles
import {
  filtersEventsWrap,
  pageTitle,
  hiddenMenu,
  gobackpadding,
} from './styles/SearchResults.module.scss'

import GoBack from 'go_back/GoBack'

//utilities
import {useObjFromQS} from '../utils'

const SearchResults = ({history}) => {
  const qsFilters = useObjFromQS()
  console.log('qsFilters', qsFilters)
  let qsLocation = qsFilters.location || {}

  const [recentSearches, setRecentSearches] = useState([qsFilters])

  //filter component states  START
  const [lastSearchFilter, setLastSearchFilter] = useState({})

  // location filter
  const [location, setLocation] = useState({})

  // date range filter
  const [dateRange, setDateRange] = useState({})
  // tags filter
  const [tags, setTags] = useState([])

  // price filter
  const [price010, setPrice010] = useState(false)
  const [price1020, setPrice1020] = useState(false)
  const [price2040, setPrice2040] = useState(false)
  const [price4080, setPrice4080] = useState(false)
  const [price80, setPrice80] = useState(false)

  //filter component states  END

  // local cache data
  const {
    data: {userLatitude, userLongitude, maxDistance},
  } = useQuery(GET_CACHE)

  // gql
  const {loading, error, data, refetch} = useQuery(GET_EVENTS_FILTERED, {
    variables: {
      userLatitude: userLatitude || undefined,
      userLongitude: userLongitude || undefined,
      useLocation: !!(userLatitude && userLongitude),
      searchFilters: qsFilters || {
        location:
          userLatitude && userLongitude && maxDistance
            ? {
                userLatitude: userLatitude,
                userLongitude: userLongitude,
                radius: maxDistance,
              }
            : undefined,
        index: qsFilters.index,
      },
    },
  })

  // used to set cards to list or grid
  const [useListView, setShowListView] = useState(true)

  // toggle the Filters menu open/closed
  const [filtersIsOpen, setFiltersIsOpen] = useState(false)

  useEffect(() => {
    const searchFilters = {index: qsFilters.index}
    const ticketPrice = []

    if (price010) {
      ticketPrice.push({minPrice: 0, maxPrice: 10})
    }
    if (price1020) {
      ticketPrice.push({minPrice: 10, maxPrice: 20})
    }
    if (price2040) {
      ticketPrice.push({minPrice: 20, maxPrice: 40})
    }
    if (price4080) {
      ticketPrice.push({minPrice: 40, maxPrice: 80})
    }

    if (price010 || price1020 || price2040 || price4080) {
      searchFilters['ticketPrice'] = ticketPrice
    }

    if (tags.length) {
      searchFilters['tags'] = tags
    }

    if (dateRange && dateRange.start && dateRange.end) {
      searchFilters['dateRange'] = {
        start: dateRange.start,
        end: dateRange.end,
      }
    }

    if (
      location &&
      location.userLatitude &&
      location.userLongitude &&
      location.radius
    ) {
      searchFilters['location'] = {
        userLatitude: location.userLatitude,
        userLongitude: location.userLongitude,
        radius: location.radius,
      }
    }

    if (Object.keys(searchFilters).length) {
      refetch({
        userLatitude: userLatitude || undefined,
        userLongitude: userLongitude || undefined,
        useLocation: !!(userLatitude && userLongitude),
        searchFilters: searchFilters,
      })
    }
    setLastSearchFilter(searchFilters)
  }, [price010, price1020, price2040, price4080, tags, dateRange, location])

  return (
    <div className='page-wrapper'>
      <GoBack />
      <section className='section mobile-section'>
        <Searchbar
          isLarge
          filters={lastSearchFilter}
          setRecentSearches={setRecentSearches}
          recentSearches={recentSearches}
          initialText={qsFilters.index}
        />
        {recentSearches[0] && (
          <RecentSearches recentSearches={recentSearches} />
        )}
        <div className='is-flex level justify-between is-dark '>
          <h3
            className={`is-family-secondary is-size-3-mobile is-size-2-tablet has-text-black-bis ${pageTitle}`}
          >
            Search Results&nbsp;:&nbsp;
            {qsFilters.index.replace(/ /g, ', ')}
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
            style={{zIndex: 1, width: '280px'}}
          >
            <FilterMenu
              mobile
              setLocation={setLocation}
              currentLocation={location}
              setPrice010={setPrice010}
              price010={price010}
              setPrice1020={setPrice1020}
              price1020={price1020}
              setPrice2040={setPrice2040}
              price2040={price2040}
              setPrice4080={setPrice4080}
              price4080={price4080}
              setPrice80={setPrice80}
              price80={price80}
              setTags={setTags}
              currentTags={tags}
              setDate={setDateRange}
              currentDate={dateRange}
              refetch={refetch}
            />
          </div>
        </div>
        <div className={filtersEventsWrap}>
          <div className='is-hidden-mobile'>
            <FilterMenu
              setLocation={setLocation}
              currentLocation={location}
              setPrice010={setPrice010}
              price010={price010}
              setPrice1020={setPrice1020}
              price1020={price1020}
              setPrice2040={setPrice2040}
              price2040={price2040}
              setPrice4080={setPrice4080}
              price4080={price4080}
              setPrice80={setPrice80}
              price80={price80}
              setTags={setTags}
              currentTags={tags}
              setDate={setDateRange}
              currentDate={dateRange}
              refetch={refetch}
            />
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
