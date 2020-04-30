import React, {useState} from 'react'
import PropTypes from 'prop-types'

import {DropdownIcon} from '../icons'

import {useDropdown} from '../../utils'

const DistanceDropdown = (client, userLat, userLong, maxDistance) => {
  //apollo client
  const localCache = client.client
  // show/hide distance dropdown
  const [showDistances, setShowDistances] = useDropdown(
    closeDistanceDropdown,
    false,
  )
  //text shown on dropdown
  let [selectedDistance, setSelectedDistance] = useState(null)

  // close the dropdown if the use clicks outside of it
  function closeDistanceDropdown(e) {
    if (!/(dropdown-(trigger|content))/g.test(e.target.className)) {
      setShowDistances(false)
    }
  } // end closeDistanceDropdown

  // set distance filter
  const setMaxDistance = (distance, lc) => {
    if (maxDistance !== distance) {
      lc.writeData({
        data: {
          maxDistance: distance,
        },
      })
    }
  }

  return (
    <div
      className={`dropdown  ccDropdown small-btn ${
        showDistances ? 'is-active' : ''
      }`}
      data-testid='distanceSelectDiv'
      onClick={() => setShowDistances(!showDistances)}
    >
      <div
        className='dropdown-trigger has-text-centered'
        style={{width: '110px'}}
        aria-haspopup='true'
        aria-controls='dropdown-menu2'
        data-id='distance-trigger'
      >
        <span className='no-pointer-events'>
          {selectedDistance ? selectedDistance : 'Distance'}
        </span>
        <span
          className={`icon  no-pointer-events  ${showDistances ? 'flip' : ''}`}
          style={{transition: 'transform 0.2s'}}
          aria-hidden='true'
        >
          <DropdownIcon />
        </span>
      </div>
      <div
        className='dropdown-menu drop-center'
        role='menu'
        style={{width: '90%'}}
      >
        <div className='dropdown-content'>
          <div
            className='dropdown-item has-text-centered'
            onClick={() => {
              setMaxDistance(5, localCache)
              setSelectedDistance('Nearby')
            }}
          >
            Nearby
          </div>
          <div
            className='dropdown-item has-text-centered'
            onClick={() => {
              setMaxDistance(10, localCache)
              setSelectedDistance('10 mi')
            }}
          >
            10 mi
          </div>
          <div
            className='dropdown-item has-text-centered'
            onClick={() => {
              setMaxDistance(20, localCache)
              setSelectedDistance('20 mi')
            }}
          >
            20 mi
          </div>
          <div
            className='dropdown-item has-text-centered'
            onClick={() => {
              setMaxDistance(null, localCache)
              setSelectedDistance('Anywhere')
            }}
          >
            Anywhere
          </div>
        </div>
      </div>
    </div>
  )
}

export default DistanceDropdown

DistanceDropdown.propTypes = {
  client: PropTypes.object,
  userLat: PropTypes.number,
  userLong: PropTypes.number,
  maxDist: PropTypes.number,
}
