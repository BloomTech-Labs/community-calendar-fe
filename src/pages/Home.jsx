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
      {featuredApolloData.data && featuredApolloData.data.events.length > 0 ? (
        <>
          <FeatCarousel apolloData={featuredApolloData} />
          <div className='content-divider-x'></div>
        </>
      ) : null}

      {/* Events list */}
      <section className='section mobile-section'>
        <div className='is-flex level justify-between is-dark '>
          <h3 className='is-family-secondary is-size-3-mobile is-size-2-tablet has-text-black-bis'>
            Events
          </h3>
          {localCache.userLatitude && localCache.userLongitude && (
            <DistanceDropdown
              client={client}
              userLat={localCache.userLatitude}
              userLong={localCache.userLongitude}
              maxDistance={localCache.maxDistance}
            />
          )}
        </div>
        <FilterBtns
          refetch={refetch}
          eventRange={eventRange}
          setEventRange={setEventRange}
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
          setDatePickerIsOpen={setDatePickerIsOpen}
        />
        <div className='is-flex justify-between'>
          <div
            className={`dropdown  navDropdown ${
              datePickerIsOpen ? 'is-active' : ''
            }`}
          >
            <div
              role='button'
              className='dropdown-trigger level is-clickable hover-underline is-size-7-mobile'
              aria-haspopup='true'
              aria-controls='dropdown-menu2'
              data-testid='location-dropdown-trigger'
              data-id='location-dropdown'
              onClick={() => setDatePickerIsOpen(!datePickerIsOpen)}
            >
              <span
                className={` is-size-5-tablet no-outline-focus no-pointer-events`}
              >
                {start && end
                  ? Math.ceil(
                      moment.duration(moment(end).diff(moment(start))).asDays(),
                    ) === 1
                    ? moment(start).format('ddd, MMM Do YYYY')
                    : `${moment(start).format('ddd, MMM Do YYYY')} - ${moment(
                        end,
                      ).format('ddd, MMM Do YYYY')}`
                  : 'Select a date range'}
              </span>
              <span
                className={`${
                  datePickerIsOpen ? 'flip' : ''
                } no-pointer-events icon`}
                style={{transition: 'transform 0.2s'}}
              >
                <DropdownIcon />
              </span>
            </div>
            <div
              className={` dropdown-menu drop-center has-background-white border-radius`}
              id='location-dropdown-menu '
              role='menu'
              style={{
                border: '1px solid #21242c',
                position: 'absolute',
                top: '32px',
              }}
            >
              <SelectedRange
                refetch={refetch}
                setStart={setStart}
                setEnd={setEnd}
                setEventRange={setEventRange}
              />
            </div>
            {/* end dropdown-menu*/}
          </div>
          <ViewToggle toggleFunc={setShowListView} viewState={useListView} />
        </div>
        <EventList
          apolloData={{data: data && data.events, loading, error}}
          listView={useListView}
          setListType={setShowListView}
        />
      </section>
    </div>
  )
}

export default Home
