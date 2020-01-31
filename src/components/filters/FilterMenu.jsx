import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useDropdown} from '../../utils'

//Components
import Geocoder from 'geocoder/Geocoder'
import {FilterIcon, MapMarkerCircle, DropdownIcon} from 'icons'
import DateRangePicker from '@wojtekmaj/react-daterange-picker'

//GQL
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_CACHE} from '../../graphql'

// Styles
import {filterWrapper, mobile, picker} from './FilterMenu.module.scss'
import {locationContent} from 'navbar/Navbar.module.scss'
import {DateRange} from 'moment-range'

const FilterMenu = props => {
  const {setLocation, currentLocation, setDateRange, dateRange} = props

  const client = useApolloClient()

  const {data: localCache} = useQuery(GET_CACHE)

  // EVENT LOCATION SEARCH HANDLERS
  const [eventSearchAddress, setEventSearchAddress] = useState('')

  // event location dropdown
  const [locationIsOpen, setLocationIsOpen] = useDropdown(closeLocation, false)

  // close location dropdown if user clicks outside of it
  function closeLocation(e) {
    return
  }

  // used by geocoder to update local cache
  function setUserLocation(changes) {
    if (changes.selectedItem) {
      const place = {...changes.selectedItem}
      // apply filter
      console.log('place', place)
      setEventSearchAddress(place.place_name.replace(/united states$/i, 'US'))
      setLocation({
        userLatitude: place.geometry.coordinates[1],
        userLongitude: place.geometry.coordinates[0],
        radius: currentLocation.radius || 30,
      })
    }
  }

  // DATE RANGE SEARCH HANDLERS
  const [searchDateRange, setSearchDateRange] = useState([
    new Date(),
    new Date(),
  ])
  // date dropdown
  const [dateIsOpen, setDateIsOpen] = useDropdown(closeDate, false)

  // close date dropdown if user clicks outside of it
  function closeDate(e) {
    // if (!/^date-picker/gi.test(e.target.getAttribute('data-id'))) {
    //   setDateIsOpen(false)
    // }
    return
  }

  const dateRangeChange = newDateRange => {
    setSearchDateRange(newDateRange)
    setDateRange(newDateRange)
  }

  return (
    <div className={`${filterWrapper} ${props.mobile ? mobile : ''}`}>
      <p className='is-size-4'>Filters</p>

      {/* Select event location filter dropdown menu */}
      <div
        className={`dropdown is-block navDropdown ${
          locationIsOpen ? 'is-active' : ''
        }`}
        data-id='location-geocoder-wrapper'
      >
        <div
          role='button'
          className='dropdown-trigger level is-clickable '
          aria-haspopup='true'
          aria-controls='dropdown-menu2'
          data-testid='location-geocoder-trigger'
          data-id='location-geocoder-trigger'
          onClick={() => setLocationIsOpen(!locationIsOpen)}
        >
          <span className={` is-size-5 no-outline-focus no-pointer-events`}>
            Event Location
          </span>
          <span
            className={`${locationIsOpen ? 'flip' : ''} no-pointer-events icon`}
            style={{transition: 'transform 0.2s'}}
          >
            <DropdownIcon />
          </span>
        </div>
        <div
          className={` dropdown-menu  drop-center ${
            locationIsOpen ? 'is-active' : ''
          }`}
          id='location-dropdown-menu '
          role='menu'
          style={{
            position: 'relative',
            height: `${locationIsOpen ? 'initial' : 0}`,
            paddingTop: 0,
          }}
        >
          <div
            className='dropdown-content '
            data-id='location-geocoder-dropdown'
            style={{boxShadow: 'none', backgroundColor: '#fff', paddingTop: 0}}
          >
            <div
              className={locationContent}
              data-id='location-geocoder-dropdown-content'
            >
              {eventSearchAddress && (
                <p
                  data-id='location-geocoder-address-box'
                  className='level-left'
                  style={{marginBottom: '8px'}}
                >
                  <span data-id='location-geocoder-icon' className='level'>
                    <MapMarkerCircle />
                  </span>
                  <span
                    data-id='location-geocoder-address'
                    style={{marginLeft: '8px'}}
                  >
                    {eventSearchAddress}
                  </span>
                </p>
              )}
              <Geocoder
                labelText='Find Events Near:'
                onSelectedItemChange={setUserLocation}
                dataIdPrefix='location-geocoder'
                isFilterMenu
              />
            </div>
          </div>
          {/* end dropdown-content*/}
          <p className='is-size-5'>Distance</p>
          <div>
            <div>
              <input
                type='radio'
                name='radius'
                id='2'
                onClick={() => setLocation({...currentLocation, radius: 2})}
              />
              <label htmlFor='2'> Nearby</label>
            </div>
            <div>
              <input
                type='radio'
                name='radius'
                id='5'
                onClick={() => setLocation({...currentLocation, radius: 5})}
              />
              <label htmlFor='5'> 5 mi</label>
            </div>
            <div>
              <input
                type='radio'
                name='radius'
                id='10'
                onClick={() => setLocation({...currentLocation, radius: 10})}
              />
              <label htmlFor='10'> 10 mi</label>
            </div>
            <div>
              <input
                type='radio'
                name='radius'
                id='25'
                onClick={() => setLocation({...currentLocation, radius: 25})}
              />
              <label htmlFor='25'> 25 mi</label>
            </div>
            <div>
              <input
                type='radio'
                name='radius'
                id='50'
                onClick={() => setLocation({...currentLocation, radius: 50})}
              />
              <label htmlFor='50'> 50 mi</label>
            </div>
          </div>
        </div>
        {/* end dropdown-menu*/}
      </div>

      {/* Select event date fiter dropdown menu */}
      <div
        className={`dropdown is-block navDropdown ${
          dateIsOpen ? 'is-active' : ''
        }`}
        data-id='date-picker-wrapper'
      >
        <div
          role='button'
          className='dropdown-trigger level is-clickable '
          aria-haspopup='true'
          aria-controls='dropdown-menu2'
          data-testid='date-picker-trigger'
          data-id='date-picker-trigger'
          onClick={() => setDateIsOpen(!dateIsOpen)}
        >
          <span className={` is-size-5 no-outline-focus no-pointer-events`}>
            Date
          </span>
          <span
            className={`${dateIsOpen ? 'flip' : ''} no-pointer-events icon`}
            style={{transition: 'transform 0.2s'}}
          >
            <DropdownIcon />
          </span>
        </div>
        <div
          className={` dropdown-menu  drop-center ${
            dateIsOpen ? 'is-active' : ''
          }`}
          id='date-dropdown-menu '
          role='menu'
          style={{
            position: 'relative',
            height: `${dateIsOpen ? 'initial' : 0}`,
            paddingTop: 0,
          }}
        >
          <div
            className='dropdown-content '
            data-id='date-picker-dropdown'
            style={{boxShadow: 'none', backgroundColor: '#fff', paddingTop: 0}}
          >
            <div
              className={locationContent}
              data-id='date-picker-dropdown-content'
            >
              <DateRangePicker
                onChange={dateRangeChange}
                value={searchDateRange}
                className={picker}
                calendarIcon={null}
                clearIcon={null}
                minDate={new Date()}
                rangeDivider=' to '
              />
            </div>
          </div>
          {/* end dropdown-content*/}
        </div>
        {/* end dropdown-menu*/}
      </div>
      <p className='is-size-5'>Tags</p>
      <p className='is-size-5'>Price</p>
    </div>
  )
}

export default FilterMenu
