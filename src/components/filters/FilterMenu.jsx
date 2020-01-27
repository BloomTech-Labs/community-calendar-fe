import React from 'react'
import {FilterIcon} from 'icons'
import PropTypes from 'prop-types'
import {filterWrapper} from './FilterMenu.module.scss'

const FilterMenu = () => {
  return (
    <div className={filterWrapper}>
      <p className='is-size-3'>Filters</p>
      <p className='is-size-4'>Location</p>
      <p className='is-size-4'>Distance</p>
    </div>
  )
}

export default FilterMenu
