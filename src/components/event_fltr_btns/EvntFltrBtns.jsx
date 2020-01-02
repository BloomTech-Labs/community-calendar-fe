import React from 'react'
import PropTypes from 'prop-types'
import {event_filter_buttons} from './EvntFltrBtns.module.scss'

/* Buttons used to quickly filter events by date */
const FilterBtns = () => (
  <div className={event_filter_buttons}>
    <button className='color_chalice is-size-4'>Today</button>
    <button className='color_chalice is-size-4'>Tomorrow</button>
    <button className='color_chalice is-size-4'>This Weekend</button>
    <button className='color_black has-text-weight-bold is-size-4'>
      All Upcoming
    </button>
  </div>
)

export default FilterBtns
