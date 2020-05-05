import React, {useState, useEffect} from 'react'
import moment from 'moment'
import loadable from '@loadable/component'

//components
import EventList from '../components/events/EventList'
import FilterBtns from '../components/event_fltr_btns/EvntFltrBtns'
import FeatCarousel from '../components/featured/FeaturedCarousel'
import {DropdownIcon} from '../components/icons/'
import DistanceDropdown from '../components/distance-dropdown/DistanceDropdown'
import LoadingDots from '../components/loading/LoadingDots'
import ViewToggle from '../components/events/ViewToggle'

//graphql
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_EVENTS_FILTERED, GET_FEATURED_EVENTS, GET_CACHE} from '../graphql'

//okta
import {useOktaAuth} from '@okta/okta-react'

const SelectedRange = loadable(
  () =>
    import(
      /* webpackChunkName: "selectedRange" */ '../components/daypicker/selectedRange'
    ),
  {
    fallback: (
      <div className='is-flex justify-center'>
        <LoadingDots />
      </div>
    ),
  },
)

/* The first page user's see when opening the app */
const Home = () => {
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false)
  const [eventRange, setEventRange] = useState('ALL')
  const [start, setStart] = useState(undefined)
  const [end, setEnd] = useState(undefined)

  // local cache data
  const client = useApolloClient()
  const {data: localCache} = useQuery(GET_CACHE)

  // FeaturedCarousel data (returns chronological list with few event fields for carousel)
  const featuredApolloData = useQuery(GET_FEATURED_EVENTS)

  // EventList data (refetches and updates results based on filters and user location)
  const apolloData = useQuery(GET_EVENTS_FILTERED, {
    variables: {
      userLatitude: localCache.userLatitude || undefined,
      userLongitude: localCache.userLongitude || undefined,
      useLocation: !!(localCache.userLatitude && localCache.userLongitude),
      searchFilters: {
        location:
          localCache.userLatitude &&
          localCache.userLongitude &&
          localCache.maxDistance
            ? {
                userLatitude: localCache.userLatitude,
                userLongitude: localCache.userLongitude,
                radius: localCache.maxDistance,
              }
            : undefined,
        dateRange: start && end ? {start, end} : undefined,
      },
    },
  })
  const {data, loading, error, refetch} = apolloData
  // find distance from user and update events with results if user location changes
  useEffect(() => {
    refetch({
      useLocation: !!(localCache.userLatitude && localCache.userLongitude),
      userLatitude: localCache.userLatitude || undefined,
      userLongitude: localCache.userLongitude || undefined,
      searchFilters: {
        location:
          localCache.userLatitude &&
          localCache.userLongitude &&
          localCache.maxDistance
            ? {
                userLatitude: localCache.userLatitude,
                userLongitude: localCache.userLongitude,
                radius: localCache.maxDistance,
              }
            : undefined,
        dateRange: start && end ? {start, end} : undefined,
      },
    })
  }, [
    localCache.userLatitude,
    localCache.userLongitude,
    localCache.maxDistance,
  ])

  // used to set cards to list or grid
  const [useListView, setShowListView] = useState(true)

  return (
    <div className='page-wrapper'>
      {/* Featured Events carousel */}
      <>
        <FeatCarousel apolloData={featuredApolloData} />
        <div className='content-divider-x'></div>
      </>
    </div>
  )
}

export default Home
