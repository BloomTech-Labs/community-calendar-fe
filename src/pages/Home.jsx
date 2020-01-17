import React, {useState, useEffect, useRef} from 'react'
import ReactGA from 'react-ga'

//components
import EventList from '../components/events/EventList'
import FilterBtns from '../components/event_fltr_btns/EvntFltrBtns'
import FeatCarousel from '../components/featured/FeaturedCarousel'
import {DropdownIcon} from 'icons'

//graphql
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_EVENTS_WITH_DISTANCE, GET_CACHE} from '../graphql'

//styles
import styles from './styles/Home.module.scss'

/* The first page user's see when opening the app */
const Home = () => {
  ReactGA.pageview('/')

  // used for distance select dropdown menu
  const distanceSelect = useRef(null)
  const dropdownArrow = useRef(null)

  // local cache data
  const client = useApolloClient()
  const {data: localCache} = useQuery(GET_CACHE)
  const {userLatitude, userLongitude, maxDistance} = localCache

  const apolloData = useQuery(GET_EVENTS_WITH_DISTANCE, {
    variables: {userLatitude: userLatitude, userLongitude: userLongitude},
  })

  const {data, loading, error, refetch} = apolloData

  // find distance from user and update events with results if user location changes
  useEffect(() => {
    refetch({userLatitude, userLongitude})
  }, [userLatitude, userLongitude])

  //event listener for distance dropdown
  const [showDistances, setShowDistances] = useState(false)
  useEffect(() => {
    /* 
if the dropdown menu is open and the user clicks 
outside of it close the dropdown menu
 */
    const distanceDropdown = e => {
      if (e.target.getAttribute('data-id') === 'distance-trigger') {
        distanceSelect.current.classList.toggle('is-active')
        dropdownArrow.current.classList.toggle('flip')
        // if user clicks outside of dropdown menu close menu
      } else if (!/(dropdown-(trigger|content))/g.test(e.target.className)) {
        distanceSelect.current.classList.remove('is-active')
        dropdownArrow.current.classList.remove('flip')
      }
    } // end wasDropdownClicked

    // add event listener
    window.addEventListener('click', distanceDropdown)

    return () => {
      window.removeEventListener('click', distanceDropdown)
    }
  }, [])

  // set distance filter
  const setMaxDistance = distance => {
    if (maxDistance !== distance) {
      client.writeData({
        data: {
          maxDistance: distance,
        },
      })
    }
  }

  //text shown on dropdown
  let [selectedDistance, setSelectedDistance] = useState(null)

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
            <div
              className={`dropdown is-right ccDropdown small-btn `}
              ref={distanceSelect}
              data-testid='distanceSelectDiv'
            >
              <div
                className='dropdown-trigger has-text-centered'
                style={{width: '100px'}}
                aria-haspopup='true'
                aria-controls='dropdown-menu2'
                data-id='distance-trigger'
              >
                <span className='no-pointer-events'>
                  {selectedDistance ? selectedDistance : 'Distance'}
                </span>
                <span
                  className={`icon  no-pointer-events `}
                  ref={dropdownArrow}
                  aria-hidden='true'
                >
                  <DropdownIcon />
                </span>
              </div>
              <div className='dropdown-menu drop-center' role='menu'>
                <div className='dropdown-content'>
                  <div
                    className='dropdown-item has-text-centered'
                    onClick={() => {
                      setMaxDistance(5)
                      setSelectedDistance('Nearby')
                    }}
                  >
                    Nearby
                  </div>
                  <div
                    className='dropdown-item has-text-centered'
                    onClick={() => {
                      setMaxDistance(10)
                      setSelectedDistance('10 mi')
                    }}
                  >
                    10 mi
                  </div>
                  <div
                    className='dropdown-item has-text-centered'
                    onClick={() => {
                      setMaxDistance(20)
                      setSelectedDistance('20 mi')
                    }}
                  >
                    20 mi
                  </div>
                  <div
                    className='dropdown-item has-text-centered'
                    onClick={() => {
                      setMaxDistance(null)
                      setSelectedDistance('30+ mi')
                    }}
                  >
                    30+ mi
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* end distance dropdown */}
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
