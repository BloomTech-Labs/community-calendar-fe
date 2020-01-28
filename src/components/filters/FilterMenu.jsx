import React from 'react'
import {FilterIcon} from 'icons'
import PropTypes from 'prop-types'
import {filterWrapper, mobile} from './FilterMenu.module.scss'
import {useDropdown} from '../../utils'

const FilterMenu = props => {
  return (
    <div className={`${filterWrapper} ${props.mobile ? mobile : ''}`}>
      <p className='is-size-3'>Filters</p>
      <p className='is-size-4'>Location</p>
      <p className='is-size-4'>Distance</p>
    </div>
  )
}

export default FilterMenu
