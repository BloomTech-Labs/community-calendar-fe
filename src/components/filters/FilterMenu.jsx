import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useDropdown} from '../../utils'

//Components
import Geocoder from 'geocoder/Geocoder'
import {FilterIcon, MapMarkerCircle, DropdownIcon} from 'icons'

//GQL
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {GET_CACHE} from '../../graphql'

// Styles
import {filterWrapper, mobile} from './FilterMenu.module.scss'
import {locationContent} from 'navbar/Navbar.module.scss'

const FilterMenu = props => {
  const {setLocation, currentLocation} = props

  const [eventSearchAddress, setEventSearchAddress] = useState('')

  const client = useApolloClient()

  const {data: localCache} = useQuery(GET_CACHE)

  // location dropdown
  const [locationIsOpen, setLocationIsOpen] = useDropdown(closeLocation, false)

  // close location dropdown if user clicks outside of it
  function closeLocation(e) {
    // if (!/^location-geocoder/gi.test(e.target.getAttribute('data-id'))) {
    // setLocationIsOpen(false)
    return
    // }
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

  return (
    <div className={`${filterWrapper} ${props.mobile ? mobile : ''}`}>
      <p className='is-size-4'>Filters</p>
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
        </div>
        {/* end dropdown-menu*/}
      </div>
      <p className='is-size-5'>Date</p>
      <p className='is-size-5'>Tags</p>
      <p className='is-size-5'>Price</p>
    </div>
  )
}

export default FilterMenu
