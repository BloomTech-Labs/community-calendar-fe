import React, {useState, useEffect, useRef} from 'react'
import ReactGA from 'react-ga'
import moment from 'moment'

//components
import EventList from '../components/events/EventList'
import FilterBtns from '../components/event_fltr_btns/EvntFltrBtns'
import FeatCarousel from '../components/featured/FeaturedCarousel'
import {DropdownIcon} from 'icons'
import DistanceDropdown from 'distance-dropdown/DistanceDropdown'
import SelectedRange from '../components/daypicker/selectedRange'

//graphql
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_EVENTS_FILTERED, GET_CACHE} from '../graphql'

/* The first page user's see when opening the app */
const Home = () => {
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false)
  const [eventRange, setEventRange] = useState('ALL')
  const [start, setStart] = useState(undefined)
  const [end, setEnd] = useState(undefined)

  ReactGA.pageview('/')

  // local cache data
  const client = useApolloClient()
  const {data: localCache} = useQuery(GET_CACHE)
  let {userLatitude, userLongitude, maxDistance} = localCache
  const apolloData = useQuery(GET_EVENTS_FILTERED, {
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
      },
    },
  })

  const {data, loading, error, refetch} = apolloData
  // find distance from user and update events with results if user location changes
  useEffect(() => {
    refetch({
      useLocation: !!(userLatitude && userLongitude),
      userLatitude: userLatitude || undefined,
      userLongitude: userLongitude || undefined,
      searchFilters: {
        location:
          userLatitude && userLongitude && maxDistance
            ? {
                userLatitude: userLatitude,
                userLongitude: userLongitude,
                radius: maxDistance,
              }
            : undefined,
      },
    })
  }, [userLatitude, userLongitude, maxDistance])

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
        {/*yes*/}
        <div
          className={`dropdown  navDropdown ${
            datePickerIsOpen ? 'is-active' : ''
          }`}
        >
          <div
            role='button'
            className='dropdown-trigger level is-clickable hover-underline'
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
            className={` dropdown-menu drop-center `}
            id='location-dropdown-menu '
            role='menu'
          ></div>
          {/* end dropdown-menu*/}
        </div>
        {datePickerIsOpen && (
          <SelectedRange
            refetch={refetch}
            setStart={setStart}
            setEnd={setEnd}
            setEventRange={setEventRange}
          />
        )}
        {/*yes*/}
        <EventList apolloData={{data, loading, error}} />
      </section>
    </div>
  )
}

export default Home
