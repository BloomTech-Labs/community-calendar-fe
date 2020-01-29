import React from 'react'
import {FilterIcon} from 'icons'
import PropTypes from 'prop-types'
import {filterWrapper, mobile} from './FilterMenu.module.scss'
import {useDropdown} from '../../utils'

//graphql
import {useQuery, useApolloClient} from '@apollo/react-hooks'
import {
  GET_EVENTS_FILTERED,
  GET_CACHE,
  GET_RECENT_SEARCHES,
} from '../../graphql'

const FilterMenu = props => {
  // local cache data
  const client = useApolloClient()
  const {
    data: {userLatitude, userLongitude, maxDistance},
  } = useQuery(GET_CACHE)

  const {data: recentSearchesData, refetch: recentSearchesRefetch} = useQuery(
    GET_RECENT_SEARCHES,
  )
  console.log('recentSearchesData', recentSearchesData)
  /*
  const addLocationToCache = (location) => {
    // add lat, long, and maxDistance to cache
    const addASearch = () => {
    client.writeData({
      data: {
        recentSearches: [...recentSearches, {...recentSearchExample}],
      },
    })
  }
  }
*/
  return (
    <div className={`${filterWrapper} ${props.mobile ? mobile : ''}`}>
      <p className='is-size-4'>Filters</p>
      <p className='is-size-5'>Location</p>

      {/* <button onClick={()=> addLocationToCache(location)}>Add Location</button> */}
      <p className='is-size-5'>Distance</p>
      <p className='is-size-5'>Date</p>
      <p className='is-size-5'>Tags</p>
      <p className='is-size-5'>Price</p>
    </div>
  )
}

export default FilterMenu
